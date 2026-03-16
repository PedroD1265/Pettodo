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

function newId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// Map entity type → table name and state column
const ENTITY_MAP: Record<string, { table: string; stateCol: string }> = {
  community_dog: { table: 'community_dogs', stateCol: 'review_state' },
  change_request: { table: 'change_requests', stateCol: 'review_state' },
  evidence_item: { table: 'evidence_items', stateCol: 'review_state' },
};

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

    const entityDef = ENTITY_MAP[entityType];
    if (!entityDef) {
      res.status(400).json({
        error: 'bad_request',
        message: `entityType must be one of: ${Object.keys(ENTITY_MAP).join(', ')}`,
      });
      return;
    }

    // Verify the entity exists and is pending
    const checkResult = await query(
      `SELECT id, ${entityDef.stateCol} FROM ${entityDef.table} WHERE id = $1`,
      [entityId]
    );
    if (checkResult.rows.length === 0) {
      res.status(404).json({ error: 'not_found' });
      return;
    }
    if (checkResult.rows[0][entityDef.stateCol] !== 'pending_review') {
      res.status(400).json({
        error: 'not_pending',
        message: 'Entity is not in pending_review state',
        currentState: checkResult.rows[0][entityDef.stateCol],
      });
      return;
    }

    const now = Date.now();

    // Apply the decision to the entity
    const updateCol = entityDef.stateCol;
    await query(
      `UPDATE ${entityDef.table}
       SET ${updateCol} = $1${entityDef.table === 'community_dogs' || entityDef.table === 'change_requests' ? ', updated_at = $3' : ''}
       WHERE id = $2`,
      entityDef.table === 'community_dogs' || entityDef.table === 'change_requests'
        ? [decision, entityId, now]
        : [decision, entityId]
    );

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
