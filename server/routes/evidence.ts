/**
 * Evidence Items Routes
 *
 * Auth required. Evidence is structured — no file upload pipeline in this block.
 * Evidence starts as pending_review.
 *
 * Audited actions:
 *   evidence_submitted
 */

import { Router, type Response } from 'express';
import { verifyToken, type AuthenticatedRequest } from '../middleware/verifyToken.js';
import { query } from '../db.js';
import { writeAuditLog } from '../utils/audit.js';

const router = Router();

function newId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

const VALID_EVIDENCE_TYPES = ['sighting', 'photo_description', 'veterinary_record', 'witness', 'other'];
const ALLOWED_ENTITY_TYPES = ['community_dog', 'case', 'pet'];

// ─── POST /evidence-items ────────────────────────────────────────────────────
router.post('/evidence-items', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const { targetEntityType, targetEntityId, evidenceType, description, metadata } = req.body;

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
    if (!VALID_EVIDENCE_TYPES.includes(evidenceType)) {
      res.status(400).json({
        error: 'bad_request',
        message: `evidenceType must be one of: ${VALID_EVIDENCE_TYPES.join(', ')}`,
      });
      return;
    }
    if (!description || typeof description !== 'string' || !description.trim()) {
      res.status(400).json({ error: 'bad_request', message: 'description is required' });
      return;
    }

    const id = newId('ei');
    const now = Date.now();

    await query(
      `INSERT INTO evidence_items
         (id, target_entity_type, target_entity_id, submitted_by,
          evidence_type, description, metadata, review_state, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,'pending_review',$8)`,
      [
        id,
        targetEntityType,
        targetEntityId,
        uid,
        evidenceType,
        description.trim(),
        JSON.stringify(metadata && typeof metadata === 'object' ? metadata : {}),
        now,
      ]
    );

    await writeAuditLog({
      actionType: 'evidence_submitted',
      actorUid: uid,
      targetEntityType,
      targetEntityId,
      metadata: { evidenceItemId: id, evidenceType },
    });

    res.status(201).json({
      id,
      targetEntityType,
      targetEntityId,
      evidenceType,
      description: description.trim(),
      reviewState: 'pending_review',
      createdAt: now,
    });
  } catch (err: any) {
    console.error('[evidence] POST error:', err.message);
    res.status(500).json({ error: 'create_failed' });
  }
});

export default router;
