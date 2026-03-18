import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';

const mockVerifyIdToken = vi.hoisted(() => vi.fn());
const mockQuery = vi.hoisted(() => vi.fn());
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

const FAKE_USER = {
  uid: 'user-change-tester',
  email: 'changer@example.com',
};

function authHeader() {
  return { Authorization: 'Bearer valid-token' };
}

describe('Change Requests API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockVerifyIdToken.mockResolvedValue(FAKE_USER);
    mockQuery.mockResolvedValue({ rows: [], rowCount: 1 });
  });

  describe('POST /api/change-requests', () => {
    const validPayload = {
      targetEntityType: 'community_dog',
      targetEntityId: 'cd_abc',
      proposedChanges: { nickname: 'New Nickname' },
      reason: 'The dog has a new name.',
    };

    it('returns 401 when auth token is missing', async () => {
      const res = await request(app).post('/api/change-requests').send(validPayload);

      expect(res.status).toBe(401);
    });

    it('returns 400 if targetEntityType is invalid', async () => {
      const res = await request(app)
        .post('/api/change-requests')
        .set(authHeader())
        .send({ ...validPayload, targetEntityType: 'user_profile' });

      expect(res.status).toBe(400);
    });

    it('returns 400 if proposedChanges is not an object', async () => {
      const res = await request(app)
        .post('/api/change-requests')
        .set(authHeader())
        .send({ ...validPayload, proposedChanges: 'just a string' });

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('proposedChanges must be an object');
    });

    it('creates a change request successfully on valid input (201)', async () => {
      const res = await request(app)
        .post('/api/change-requests')
        .set(authHeader())
        .send(validPayload);

      expect(res.status).toBe(201);
      expect(res.body.id).toMatch(/^cr_/);
      expect(res.body.reviewState).toBe('pending_review');

      expect(mockQuery).toHaveBeenCalledOnce();
      const insertParams = mockQuery.mock.calls[0][1];
      expect(insertParams).toEqual([
        expect.stringMatching(/^cr_/),
        'community_dog',
        'cd_abc',
        FAKE_USER.uid,
        JSON.stringify({ nickname: 'New Nickname' }),
        'The dog has a new name.',
        expect.any(Number),
      ]);
    });

    it('calls writeAuditLog with correct parameters on success', async () => {
      await request(app)
        .post('/api/change-requests')
        .set(authHeader())
        .send(validPayload);

      expect(mockWriteAuditLog).toHaveBeenCalledOnce();
      expect(mockWriteAuditLog).toHaveBeenCalledWith({
        actionType: 'sensitive_change_requested',
        actorUid: FAKE_USER.uid,
        targetEntityType: 'community_dog',
        targetEntityId: 'cd_abc',
        metadata: {
          changeRequestId: expect.stringMatching(/^cr_/),
        },
      });
    });

    it('creates a request even if targetEntityId does not exist (SYS-01 regression)', async () => {
      const payloadWithFakeId = {
        ...validPayload,
        targetEntityId: 'cd_this_is_fake',
      };

      const res = await request(app)
        .post('/api/change-requests')
        .set(authHeader())
        .send(payloadWithFakeId);

      expect(res.status).toBe(201);
      expect(mockQuery).toHaveBeenCalledOnce();
      const insertParams = mockQuery.mock.calls[0][1];
      expect(insertParams[2]).toBe('cd_this_is_fake');
    });

    it('accepts proposedChanges with internal fields like review_state (CR-01 regression)', async () => {
      const maliciousPayload = {
        ...validPayload,
        proposedChanges: {
          nickname: 'Malicious Dog',
          review_state: 'approved',
          created_by: 'attacker_uid',
        },
      };

      const res = await request(app)
        .post('/api/change-requests')
        .set(authHeader())
        .send(maliciousPayload);

      expect(res.status).toBe(201);

      expect(mockQuery).toHaveBeenCalledOnce();
      const insertParams = mockQuery.mock.calls[0][1];
      expect(insertParams[4]).toBe(JSON.stringify(maliciousPayload.proposedChanges));
    });
  });
});
