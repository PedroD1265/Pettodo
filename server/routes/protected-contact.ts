/**
 * Protected Contact Routes
 *
 * All write operations require authentication.
 * Owner-only: reveal-decision endpoint.
 * Public output rule: no phone/email/address exposed to non-participants.
 *
 * Audited actions:
 *   contact_initiated, message_sent, reveal_requested, reveal_granted, reveal_revoked
 */

import { Router, type Response } from 'express';
import { verifyToken, type AuthenticatedRequest } from '../middleware/verifyToken.js';
import { query } from '../db.js';
import { writeAuditLog } from '../utils/audit.js';

const router = Router();

function newId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function threadToJson(row: any, includeContact = false) {
  const base: Record<string, unknown> = {
    id: row.id,
    petId: row.pet_id ?? null,
    caseId: row.case_id ?? null,
    initiatorUid: row.initiator_uid,
    ownerUid: row.owner_uid ?? null,
    threadStatus: row.thread_status,
    revealState: row.reveal_state,
    initiatorMessage: row.initiator_message ?? '',
    createdAt: Number(row.created_at),
    updatedAt: Number(row.updated_at),
  };
  if (includeContact && row.reveal_state === 'revealed') {
    base.initiatorPhone = row.initiator_phone ?? '';
  }
  return base;
}

// ─── POST /protected-contact/threads ────────────────────────────────────────
// Create a new contact thread. Caller is the initiator (finder/helper).
router.post('/protected-contact/threads', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const initiatorUid = req.user!.uid;
    const { petId, caseId, initiatorPhone, initiatorMessage } = req.body;

    if (!petId && !caseId) {
      res.status(400).json({ error: 'bad_request', message: 'petId or caseId is required' });
      return;
    }

    // Resolve owner_uid from pet if petId provided
    let ownerUid: string | null = null;
    if (petId) {
      const petResult = await query('SELECT owner_uid FROM pets WHERE id = $1', [petId]);
      if (petResult.rows.length > 0) {
        ownerUid = petResult.rows[0].owner_uid;
      }
    }

    // Prevent owner from contacting themselves
    if (ownerUid && ownerUid === initiatorUid) {
      res.status(400).json({ error: 'bad_request', message: 'Cannot open a contact thread for your own pet' });
      return;
    }

    // Idempotency: return existing open thread for same (petId/caseId, initiatorUid)
    // Prevents duplicate threads when QRP_04 remounts or user navigates back.
    if (petId) {
      const existing = await query(
        `SELECT * FROM protected_contact_threads
         WHERE pet_id = $1 AND initiator_uid = $2 AND thread_status = 'open'
         ORDER BY created_at DESC LIMIT 1`,
        [petId, initiatorUid]
      );
      if (existing.rows.length > 0) {
        const existingRow = existing.rows[0];
        const existingMessages = await query(
          'SELECT * FROM protected_contact_messages WHERE thread_id = $1 ORDER BY created_at ASC',
          [existingRow.id]
        );
        res.status(200).json({
          ...threadToJson(existingRow),
          messages: existingMessages.rows.map((m: any) => ({
            id: m.id,
            senderUid: m.sender_uid,
            message: m.message,
            isSystem: m.is_system,
            createdAt: Number(m.created_at),
          })),
        });
        return;
      }
    }

    const id = newId('pct');
    const now = Date.now();

    await query(
      `INSERT INTO protected_contact_threads
         (id, pet_id, case_id, initiator_uid, owner_uid,
          thread_status, reveal_state,
          initiator_phone, initiator_message,
          created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,'open','not_revealed',$6,$7,$8,$8)`,
      [id, petId ?? null, caseId ?? null, initiatorUid, ownerUid,
       initiatorPhone ?? '', initiatorMessage ?? '', now]
    );

    await writeAuditLog({
      actionType: 'contact_initiated',
      actorUid: initiatorUid,
      targetEntityType: 'protected_contact_thread',
      targetEntityId: id,
      metadata: { petId: petId ?? null, caseId: caseId ?? null },
    });

    const result = await query('SELECT * FROM protected_contact_threads WHERE id = $1', [id]);
    res.status(201).json({ ...threadToJson(result.rows[0]), messages: [] });
  } catch (err: any) {
    console.error('[protected-contact] POST /threads error:', err.message);
    res.status(500).json({ error: 'create_failed' });
  }
});

// ─── GET /protected-contact/threads/:id ─────────────────────────────────────
// Retrieve a thread. Only initiator or owner may view it.
router.get('/protected-contact/threads/:id', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const result = await query(
      'SELECT * FROM protected_contact_threads WHERE id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'not_found' });
      return;
    }
    const row = result.rows[0];

    const isParticipant = row.initiator_uid === uid || row.owner_uid === uid;
    if (!isParticipant) {
      res.status(403).json({ error: 'forbidden' });
      return;
    }

    // Owner sees initiator phone only if reveal_state = 'revealed'
    const showPhone = row.owner_uid === uid;

    const messages = await query(
      'SELECT * FROM protected_contact_messages WHERE thread_id = $1 ORDER BY created_at ASC',
      [req.params.id]
    );

    res.json({
      ...threadToJson(row, showPhone),
      messages: messages.rows.map((m: any) => ({
        id: m.id,
        senderUid: m.sender_uid,
        message: m.message,
        isSystem: m.is_system,
        createdAt: Number(m.created_at),
      })),
    });
  } catch (err: any) {
    console.error('[protected-contact] GET /threads/:id error:', err.message);
    res.status(500).json({ error: 'fetch_failed' });
  }
});

// ─── POST /protected-contact/threads/:id/messages ───────────────────────────
// Send a message inside a thread. Auth required; caller must be a participant.
router.post('/protected-contact/threads/:id/messages', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const threadResult = await query(
      'SELECT * FROM protected_contact_threads WHERE id = $1',
      [req.params.id]
    );
    if (threadResult.rows.length === 0) {
      res.status(404).json({ error: 'not_found' });
      return;
    }
    const thread = threadResult.rows[0];

    if (thread.thread_status !== 'open') {
      res.status(400).json({ error: 'thread_not_open', message: 'Thread is not open' });
      return;
    }

    const isParticipant = thread.initiator_uid === uid || thread.owner_uid === uid;
    if (!isParticipant) {
      res.status(403).json({ error: 'forbidden' });
      return;
    }

    const { message } = req.body;
    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ error: 'bad_request', message: 'message is required' });
      return;
    }

    const id = newId('pcm');
    const now = Date.now();

    await query(
      `INSERT INTO protected_contact_messages
         (id, thread_id, sender_uid, message, is_system, created_at)
       VALUES ($1,$2,$3,$4,false,$5)`,
      [id, req.params.id, uid, message.trim(), now]
    );

    await query(
      'UPDATE protected_contact_threads SET updated_at = $1 WHERE id = $2',
      [now, req.params.id]
    );

    await writeAuditLog({
      actionType: 'message_sent',
      actorUid: uid,
      targetEntityType: 'protected_contact_thread',
      targetEntityId: req.params.id,
    });

    res.status(201).json({ id, threadId: req.params.id, senderUid: uid, message: message.trim(), isSystem: false, createdAt: now });
  } catch (err: any) {
    console.error('[protected-contact] POST /messages error:', err.message);
    res.status(500).json({ error: 'send_failed' });
  }
});

// ─── POST /protected-contact/threads/:id/reveal-request ─────────────────────
// Initiator requests that the owner reveals their contact info.
router.post('/protected-contact/threads/:id/reveal-request', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const result = await query(
      'SELECT * FROM protected_contact_threads WHERE id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'not_found' });
      return;
    }
    const thread = result.rows[0];

    if (thread.initiator_uid !== uid) {
      res.status(403).json({ error: 'forbidden', message: 'Only the initiator may request reveal' });
      return;
    }
    if (thread.thread_status !== 'open') {
      res.status(400).json({ error: 'thread_not_open' });
      return;
    }
    if (thread.reveal_state === 'revealed') {
      res.status(400).json({ error: 'already_revealed' });
      return;
    }

    await writeAuditLog({
      actionType: 'reveal_requested',
      actorUid: uid,
      targetEntityType: 'protected_contact_thread',
      targetEntityId: req.params.id,
    });

    res.status(200).json({ ok: true, message: 'Reveal request recorded. Awaiting owner decision.' });
  } catch (err: any) {
    console.error('[protected-contact] POST /reveal-request error:', err.message);
    res.status(500).json({ error: 'request_failed' });
  }
});

// ─── POST /protected-contact/threads/:id/reveal-decision ────────────────────
// Owner decides to grant or revoke the reveal.
router.post('/protected-contact/threads/:id/reveal-decision', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const result = await query(
      'SELECT * FROM protected_contact_threads WHERE id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'not_found' });
      return;
    }
    const thread = result.rows[0];

    if (thread.owner_uid !== uid) {
      res.status(403).json({ error: 'forbidden', message: 'Only the owner may make a reveal decision' });
      return;
    }

    const { decision } = req.body;
    if (!['grant', 'revoke'].includes(decision)) {
      res.status(400).json({ error: 'bad_request', message: 'decision must be grant or revoke' });
      return;
    }

    const newRevealState = decision === 'grant' ? 'revealed' : 'revoked';
    const now = Date.now();

    await query(
      'UPDATE protected_contact_threads SET reveal_state = $1, updated_at = $2 WHERE id = $3',
      [newRevealState, now, req.params.id]
    );

    await writeAuditLog({
      actionType: decision === 'grant' ? 'reveal_granted' : 'reveal_revoked',
      actorUid: uid,
      targetEntityType: 'protected_contact_thread',
      targetEntityId: req.params.id,
    });

    res.status(200).json({ ok: true, revealState: newRevealState });
  } catch (err: any) {
    console.error('[protected-contact] POST /reveal-decision error:', err.message);
    res.status(500).json({ error: 'decision_failed' });
  }
});

export default router;
