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

async function findTargetEntity(
  targetEntityType: string,
  targetEntityId: string
) {
  switch (targetEntityType) {
    case 'community_dog':
      return query('SELECT id FROM community_dogs WHERE id = $1', [targetEntityId]);
    case 'case':
      return query('SELECT id FROM cases WHERE id = $1', [targetEntityId]);
    case 'pet':
      return query('SELECT id FROM pets WHERE id = $1', [targetEntityId]);
    case 'protected_contact_thread':
      return query('SELECT id FROM protected_contact_threads WHERE id = $1', [targetEntityId]);
    case 'evidence_item':
      return query('SELECT id FROM evidence_items WHERE id = $1', [targetEntityId]);
    default:
      return { rows: [], rowCount: 0 };
  }
}

async function findOpenAbuseFlag(
  reportedBy: string,
  targetEntityType: string,
  targetEntityId: string
) {
  return query(
    `SELECT id, created_at
       FROM abuse_flags
      WHERE reported_by = $1
        AND target_entity_type = $2
        AND target_entity_id = $3
        AND status = 'open'
      ORDER BY created_at DESC
      LIMIT 1`,
    [reportedBy, targetEntityType, targetEntityId]
  );
}

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

    const targetEntityResult = await findTargetEntity(targetEntityType, targetEntityId);
    if (targetEntityResult.rows.length === 0) {
      res.status(404).json({ error: 'not_found' });
      return;
    }

    const existingFlagResult = await findOpenAbuseFlag(uid, targetEntityType, targetEntityId);
    if (existingFlagResult.rows.length > 0) {
      const existingFlag = existingFlagResult.rows[0];
      res.status(200).json({
        ok: true,
        id: existingFlag.id,
        createdAt: existingFlag.created_at,
        status: 'open',
        duplicate: true,
      });
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
