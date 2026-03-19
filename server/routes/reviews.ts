/**
 * Review / Moderation Routes
 *
 * All routes require auth + (moderator OR operator) role.
 * Pending items are internal only — never exposed to public routes.
 *
 * Supported reviewable entity types:
 *   community_dog | change_request | evidence_item
 *
 * Audited actions:
 *   review_approved, review_rejected
 */

import { Router, type Response } from 'express';
import { verifyToken, type AuthenticatedRequest } from '../middleware/verifyToken.js';
import { requireRole } from '../middleware/requireRole.js';
import { query } from '../db.js';
import { writeAuditLog } from '../utils/audit.js';

const router = Router();
const REVIEWABLE_ENTITY_TYPES = ['community_dog', 'change_request', 'evidence_item'] as const;
type ReviewableEntityType = (typeof REVIEWABLE_ENTITY_TYPES)[number];

function newId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// Fixed per-entity helpers keep SQL static and review-state transitions explicit.
function isReviewableEntityType(value: string): value is ReviewableEntityType {
  return REVIEWABLE_ENTITY_TYPES.includes(value as ReviewableEntityType);
}

async function updatePendingEntityState(
  entityType: ReviewableEntityType,
  entityId: string,
  decision: 'approved' | 'rejected',
  now: number
) {
  switch (entityType) {
    case 'community_dog':
      return query(
        `UPDATE community_dogs
         SET review_state = $1, updated_at = $3
         WHERE id = $2 AND review_state = 'pending_review'
         RETURNING id, review_state`,
        [decision, entityId, now]
      );
    case 'change_request':
      return query(
        `UPDATE change_requests
         SET review_state = $1, updated_at = $3
         WHERE id = $2 AND review_state = 'pending_review'
         RETURNING id, review_state`,
        [decision, entityId, now]
      );
    case 'evidence_item':
      return query(
        `UPDATE evidence_items
         SET review_state = $1
         WHERE id = $2 AND review_state = 'pending_review'
         RETURNING id, review_state`,
        [decision, entityId]
      );
  }
}

async function fetchEntityReviewState(entityType: ReviewableEntityType, entityId: string) {
  switch (entityType) {
    case 'community_dog':
      return query(`SELECT review_state FROM community_dogs WHERE id = $1`, [entityId]);
    case 'change_request':
      return query(`SELECT review_state FROM change_requests WHERE id = $1`, [entityId]);
    case 'evidence_item':
      return query(`SELECT review_state FROM evidence_items WHERE id = $1`, [entityId]);
  }
}

// ─── GET /reviews/pending ────────────────────────────────────────────────────
// Returns all items pending review across reviewable entity types.
// Moderator/operator only. Internal metadata not leaked to public routes.
router.get(
  '/reviews/pending',
  verifyToken,
  requireRole('moderator', 'operator'),
  async (_req: AuthenticatedRequest, res: Response) => {
    try {
      const [dogs, changeReqs, evidence] = await Promise.all([
        query(
          `SELECT id, nickname, size, breed, colors, approximate_area,
                  review_state, created_by, created_at
           FROM community_dogs WHERE review_state = 'pending_review'
           ORDER BY created_at ASC`
        ),
        query(
          `SELECT id, target_entity_type, target_entity_id, requested_by,
                  proposed_changes, reason, review_state, created_at
           FROM change_requests WHERE review_state = 'pending_review'
           ORDER BY created_at ASC`
        ),
        query(
          `SELECT id, target_entity_type, target_entity_id, submitted_by,
                  evidence_type, description, review_state, created_at
           FROM evidence_items WHERE review_state = 'pending_review'
           ORDER BY created_at ASC`
        ),
      ]);

      res.json({
        communityDogs: dogs.rows,
        changeRequests: changeReqs.rows,
        evidenceItems: evidence.rows,
        totalPending: dogs.rowCount + changeReqs.rowCount + evidence.rowCount,
      });
    } catch (err: any) {
      console.error('[reviews] GET /pending error:', err.message);
      res.status(500).json({ error: 'fetch_failed' });
    }
  }
);

// ─── POST /reviews/:entityType/:entityId/approve ─────────────────────────────
router.post(
  '/reviews/:entityType/:entityId/approve',
  verifyToken,
  requireRole('moderator', 'operator'),
  async (req: AuthenticatedRequest, res: Response) => {
    await applyDecision(req, res, 'approved');
  }
);

// ─── POST /reviews/:entityType/:entityId/reject ──────────────────────────────
router.post(
  '/reviews/:entityType/:entityId/reject',
  verifyToken,
  requireRole('moderator', 'operator'),
  async (req: AuthenticatedRequest, res: Response) => {
    await applyDecision(req, res, 'rejected');
  }
);

async function applyDecision(
  req: AuthenticatedRequest,
  res: Response,
  decision: 'approved' | 'rejected'
): Promise<void> {
  try {
    const { entityType, entityId } = req.params;
    const reviewerUid = req.user!.uid;
    const { notes } = req.body;

    if (!isReviewableEntityType(entityType)) {
      res.status(400).json({
        error: 'bad_request',
        message: `entityType must be one of: ${REVIEWABLE_ENTITY_TYPES.join(', ')}`,
      });
      return;
    }

    const now = Date.now();

    const updateResult = await updatePendingEntityState(entityType, entityId, decision, now);
    if (updateResult.rowCount === 0) {
      const stateResult = await fetchEntityReviewState(entityType, entityId);
      if (stateResult.rows.length === 0) {
        res.status(404).json({ error: 'not_found' });
        return;
      }

      res.status(400).json({
        error: 'not_pending',
        message: 'Entity is not in pending_review state',
        currentState: stateResult.rows[0].review_state,
      });
      return;
    }

    // Record the review decision
    const rdId = newId('rd');
    await query(
      `INSERT INTO review_decisions
         (id, target_entity_type, target_entity_id, reviewer_uid, decision, notes, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [rdId, entityType, entityId, reviewerUid, decision, notes ?? '', now]
    );

    await writeAuditLog({
      actionType: decision === 'approved' ? 'review_approved' : 'review_rejected',
      actorUid: reviewerUid,
      targetEntityType: entityType,
      targetEntityId: entityId,
      metadata: { decision, notes: notes ?? '' },
    });

    res.status(200).json({
      ok: true,
      entityType,
      entityId,
      decision,
      reviewDecisionId: rdId,
    });
  } catch (err: any) {
    console.error('[reviews] decision error:', err.message);
    res.status(500).json({ error: 'decision_failed' });
  }
}

export default router;
