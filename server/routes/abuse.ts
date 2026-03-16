/**
 * Abuse Flags Routes
 *
 * Auth required. Any authenticated user may submit an abuse flag.
 * Flags are internal — status/metadata never exposed to public routes.
 *
 * Audited actions:
 *   abuse_flag_created
 */

import { Router, type Response } from 'express';
import { verifyToken, type AuthenticatedRequest } from '../middleware/verifyToken.js';
import { query } from '../db.js';
import { writeAuditLog } from '../utils/audit.js';

const router = Router();

function newId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

const ALLOWED_ENTITY_TYPES = ['community_dog', 'case', 'pet', 'protected_contact_thread', 'evidence_item'];

// ─── POST /abuse-flags ───────────────────────────────────────────────────────
router.post('/abuse-flags', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const { targetEntityType, targetEntityId, reason, details } = req.body;

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
    if (!reason || typeof reason !== 'string' || !reason.trim()) {
      res.status(400).json({ error: 'bad_request', message: 'reason is required' });
      return;
    }

    const id = newId('af');
    const now = Date.now();

    await query(
      `INSERT INTO abuse_flags
         (id, target_entity_type, target_entity_id, reported_by,
          reason, details, status, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,'open',$7)`,
      [id, targetEntityType, targetEntityId, uid, reason.trim(), details ?? '', now]
    );

    await writeAuditLog({
      actionType: 'abuse_flag_created',
      actorUid: uid,
      targetEntityType,
      targetEntityId,
      metadata: { abuseFlagId: id, reason: reason.trim() },
    });

    res.status(201).json({ ok: true, id, createdAt: now });
  } catch (err: any) {
    console.error('[abuse] POST error:', err.message);
    res.status(500).json({ error: 'create_failed' });
  }
});

export default router;
