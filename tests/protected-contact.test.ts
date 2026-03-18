import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';

const mockQuery = vi.hoisted(() => vi.fn());
const mockVerifyIdToken = vi.hoisted(() => vi.fn());
const mockWriteAuditLog = vi.hoisted(() => vi.fn());

vi.mock('../server/db.js', () => ({
  query: mockQuery,
  pool: { query: vi.fn(), connect: vi.fn(), on: vi.fn() },
}));

vi.mock('../server/firebaseAdmin.js', () => ({
  adminAuth: { verifyIdToken: mockVerifyIdToken },
}));

vi.mock('../server/utils/audit.js', () => ({
  writeAuditLog: mockWriteAuditLog,
}));

import app from '../server/app.js';

const FAKE_INITIATOR = { uid: 'user-initiator', email: 'initiator@example.com' };
const FAKE_OWNER = { uid: 'user-owner', email: 'owner@example.com' };
const FAKE_OTHER_USER = { uid: 'user-other', email: 'other@example.com' };

const makePet = (ownerUid: string) => ({ id: 'pet-1', owner_uid: ownerUid });

const makeThread = (overrides: Partial<any> = {}) => ({
  id: 'pct_1',
  pet_id: 'pet-1',
  case_id: null,
  initiator_uid: FAKE_INITIATOR.uid,
  owner_uid: FAKE_OWNER.uid,
  thread_status: 'open',
  reveal_state: 'not_revealed',
  initiator_phone: '555-1234',
  initiator_message: 'Found your dog!',
  created_at: Date.now(),
  updated_at: Date.now(),
  ...overrides,
});

describe('Protected Contact API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockVerifyIdToken.mockResolvedValue(FAKE_INITIATOR);
  });

  const authHeader = (tokenUser = FAKE_INITIATOR) => {
    mockVerifyIdToken.mockResolvedValue(tokenUser);
    return { Authorization: 'Bearer valid-token' };
  };

  describe('POST /protected-contact/threads', () => {
    it('returns 401 if not authenticated', async () => {
      const res = await request(app).post('/api/protected-contact/threads').send({});

      expect(res.status).toBe(401);
    });

    it('returns 400 if petId and caseId are missing', async () => {
      const res = await request(app)
        .post('/api/protected-contact/threads')
        .set(authHeader())
        .send({ initiatorMessage: 'Hello' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('bad_request');
    });

    it('returns 400 if owner tries to contact themselves', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [makePet(FAKE_OWNER.uid)] });

      const res = await request(app)
        .post('/api/protected-contact/threads')
        .set(authHeader(FAKE_OWNER))
        .send({ petId: 'pet-1' });

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('Cannot open a contact thread for your own pet');
    });

    it('creates a new thread and returns 201', async () => {
      const pet = makePet(FAKE_OWNER.uid);
      const thread = makeThread();

      mockQuery
        .mockResolvedValueOnce({ rows: [pet] })
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [thread] });

      const res = await request(app)
        .post('/api/protected-contact/threads')
        .set(authHeader(FAKE_INITIATOR))
        .send({
          petId: pet.id,
          initiatorMessage: 'Found your dog!',
          initiatorPhone: '555-1234',
        });

      expect(res.status).toBe(201);
      expect(res.body.id).toMatch(/^pct_/);
      expect(res.body.initiatorUid).toBe(FAKE_INITIATOR.uid);
      expect(res.body.ownerUid).toBe(FAKE_OWNER.uid);
      expect(mockWriteAuditLog).toHaveBeenCalledWith(
        expect.objectContaining({
          actionType: 'contact_initiated',
          actorUid: FAKE_INITIATOR.uid,
          targetEntityId: expect.any(String),
        })
      );
    });
  });

  describe('GET /protected-contact/threads/:id', () => {
    it('returns 403 for a non-participant', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [makeThread()] });

      const res = await request(app)
        .get('/api/protected-contact/threads/pct-1')
        .set(authHeader(FAKE_OTHER_USER));

      expect(res.status).toBe(403);
    });

    it('returns 404 if thread not found', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .get('/api/protected-contact/threads/pct-dne')
        .set(authHeader());

      expect(res.status).toBe(404);
    });

    it('returns thread for initiator without owner contact info', async () => {
      const thread = makeThread();

      mockQuery
        .mockResolvedValueOnce({ rows: [thread] })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .get('/api/protected-contact/threads/pct-1')
        .set(authHeader(FAKE_INITIATOR));

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(thread.id);
      expect(res.body).not.toHaveProperty('initiatorPhone');
    });

    it('returns thread for owner, but hides initiator phone if not revealed', async () => {
      const thread = makeThread({ reveal_state: 'not_revealed' });

      mockQuery
        .mockResolvedValueOnce({ rows: [thread] })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .get('/api/protected-contact/threads/pct-1')
        .set(authHeader(FAKE_OWNER));

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(thread.id);
      expect(res.body).not.toHaveProperty('initiatorPhone');
    });

    it('returns thread for owner and reveals initiator phone if state is "revealed"', async () => {
      const thread = makeThread({ reveal_state: 'revealed' });

      mockQuery
        .mockResolvedValueOnce({ rows: [thread] })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .get('/api/protected-contact/threads/pct-1')
        .set(authHeader(FAKE_OWNER));

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(thread.id);
      expect(res.body.initiatorPhone).toBe('555-1234');
    });
  });

  describe('POST /protected-contact/threads/:id/messages', () => {
    it('returns 403 for a non-participant', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [makeThread()] });

      const res = await request(app)
        .post('/api/protected-contact/threads/pct-1/messages')
        .set(authHeader(FAKE_OTHER_USER))
        .send({ message: 'I should not be able to post here' });

      expect(res.status).toBe(403);
    });

    it('returns 400 if thread is not open', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [makeThread({ thread_status: 'closed' })] });

      const res = await request(app)
        .post('/api/protected-contact/threads/pct-1/messages')
        .set(authHeader(FAKE_INITIATOR))
        .send({ message: 'Is anyone there?' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('thread_not_open');
    });

    it('creates a message and returns 201', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [makeThread()] })
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .post('/api/protected-contact/threads/pct-1/messages')
        .set(authHeader(FAKE_OWNER))
        .send({ message: 'Thank you for finding him!' });

      expect(res.status).toBe(201);
      expect(res.body.senderUid).toBe(FAKE_OWNER.uid);
      expect(res.body.message).toBe('Thank you for finding him!');
      expect(mockWriteAuditLog).toHaveBeenCalledWith(
        expect.objectContaining({
          actionType: 'message_sent',
          actorUid: FAKE_OWNER.uid,
          targetEntityId: 'pct-1',
        })
      );
    });
  });

  describe('POST /protected-contact/threads/:id/reveal-decision', () => {
    it('returns 403 if not the owner', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [makeThread()] });

      const res = await request(app)
        .post('/api/protected-contact/threads/pct-1/reveal-decision')
        .set(authHeader(FAKE_INITIATOR))
        .send({ decision: 'grant' });

      expect(res.status).toBe(403);
    });

    it('returns 400 for an invalid decision', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [makeThread()] });

      const res = await request(app)
        .post('/api/protected-contact/threads/pct-1/reveal-decision')
        .set(authHeader(FAKE_OWNER))
        .send({ decision: 'maybe' });

      expect(res.status).toBe(400);
    });

    it('updates state to "revealed" on grant', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [makeThread()] })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .post('/api/protected-contact/threads/pct-1/reveal-decision')
        .set(authHeader(FAKE_OWNER))
        .send({ decision: 'grant' });

      expect(res.status).toBe(200);
      expect(res.body.revealState).toBe('revealed');
      expect(mockQuery.mock.calls[1][0]).toContain(
        'UPDATE protected_contact_threads SET reveal_state = $1'
      );
      expect(mockQuery.mock.calls[1][1][0]).toBe('revealed');
      expect(mockWriteAuditLog).toHaveBeenCalledWith(
        expect.objectContaining({
          actionType: 'reveal_granted',
          actorUid: FAKE_OWNER.uid,
        })
      );
    });
  });
});
