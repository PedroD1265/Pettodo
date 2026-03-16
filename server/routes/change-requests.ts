/**
 * Change Requests Routes
 *
 * Auth required for all operations.
 * Change requests start as pending_review — never auto-applied.
 *
 * Audited actions:
 *   sensitive_change_requested
 */

import { Router, type Response } from 'express';
import { verifyToken, type AuthenticatedRequest } from '../middleware/verifyToken.js';
import { query } from '../db.js';
import { writeAuditLog } from '../utils/audit.js';

const router = Router();

function newId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

const ALLOWED_ENTITY_TYPES = ['community_dog', 'case', 'pet'];

// ─── POST /change-requests ───────────────────────────────────────────────────
router.post('/change-requests', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const { targetEntityType, targetEntityId, proposedChanges, reason } = req.body;

    if (!ALLOWED_ENTITY_TYPES.includes(targetEntityType)) {
      res.status(400).json({
        error: 'bad_request',
        message: `targetEntityType must be one of: ${ALLOWED_ENTITY_TYPES.join(', ')}`,
      });
      return;
    }
    if (!targetEntityId || typeof targetEntityId !== 'string') {
      res.status(400).json({ error: 'bad_request', message: 'targetEntityId is required' });
      return;
    }
    if (!proposedChanges || typeof proposedChanges !== 'object') {
      res.status(400).json({ error: 'bad_request', message: 'proposedChanges must be an object' });
      return;
    }

    const id = newId('cr');
    const now = Date.now();

    await query(
      `INSERT INTO change_requests
         (id, target_entity_type, target_entity_id, requested_by,
          proposed_changes, reason, review_state, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,'pending_review',$7,$7)`,
      [id, targetEntityType, targetEntityId, uid,
       JSON.stringify(proposedChanges), reason ?? '', now]
    );

    await writeAuditLog({
      actionType: 'sensitive_change_requested',
      actorUid: uid,
      targetEntityType,
      targetEntityId,
      metadata: { changeRequestId: id },
    });

    res.status(201).json({
      id,
      targetEntityType,
      targetEntityId,
      reviewState: 'pending_review',
      createdAt: now,
    });
  } catch (err: any) {
    console.error('[change-requests] POST error:', err.message);
    res.status(500).json({ error: 'create_failed' });
  }
});

export default router;
