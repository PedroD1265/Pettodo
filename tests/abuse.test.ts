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
  uid: 'user-abuse-tester',
  email: 'abuse@example.com',
};

function authHeader() {
  return { Authorization: 'Bearer valid-token' };
}

describe('Abuse Flags API', () => {
  beforeEach(() => {
    mockQuery.mockReset();
    mockVerifyIdToken.mockReset();
    mockWriteAuditLog.mockReset();
    mockVerifyIdToken.mockResolvedValue(FAKE_USER);
    mockQuery.mockResolvedValue({ rows: [], rowCount: 0 });
  });

  describe('POST /api/abuse-flags', () => {
    const validPayload = {
      targetEntityType: 'pet',
      targetEntityId: 'pet_123',
      reason: 'spam',
      details: 'This is a spammy pet profile.',
    };

    it('returns 401 when auth token is missing', async () => {
      const res = await request(app).post('/api/abuse-flags').send(validPayload);

      expect(res.status).toBe(401);
    });

    it('returns 400 if targetEntityType is invalid', async () => {
      const res = await request(app)
        .post('/api/abuse-flags')
        .set(authHeader())
        .send({ ...validPayload, targetEntityType: 'invalid_type' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('bad_request');
    });

    it('returns 400 if targetEntityId is missing', async () => {
      const res = await request(app)
        .post('/api/abuse-flags')
        .set(authHeader())
        .send({ ...validPayload, targetEntityId: '' });

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('targetEntityId is required');
    });

    it('returns 400 if reason is missing or empty', async () => {
      const res = await request(app)
        .post('/api/abuse-flags')
        .set(authHeader())
        .send({ ...validPayload, reason: ' ' });

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('reason is required');
    });

    it('creates an abuse flag successfully on valid input (201)', async () => {
      const res = await request(app)
        .post('/api/abuse-flags')
        .set(authHeader())
        .send(validPayload);

      expect(res.status).toBe(201);
      expect(res.body.ok).toBe(true);
      expect(res.body.id).toMatch(/^af_/);

      expect(mockQuery).toHaveBeenCalledTimes(2);
      const insertQuery = mockQuery.mock.calls[1][0];
      const insertParams = mockQuery.mock.calls[1][1];
      expect(insertQuery).toContain('INSERT INTO abuse_flags');
      expect(insertParams).toEqual([
        expect.stringMatching(/^af_/),
        'pet',
        'pet_123',
        FAKE_USER.uid,
        'spam',
        'This is a spammy pet profile.',
        expect.any(Number),
      ]);
    });

    it('calls writeAuditLog with correct parameters on success', async () => {
      await request(app)
        .post('/api/abuse-flags')
        .set(authHeader())
        .send(validPayload);

      expect(mockWriteAuditLog).toHaveBeenCalledOnce();
      expect(mockWriteAuditLog).toHaveBeenCalledWith({
        actionType: 'abuse_flag_created',
        actorUid: FAKE_USER.uid,
        targetEntityType: 'pet',
        targetEntityId: 'pet_123',
        metadata: {
          abuseFlagId: expect.stringMatching(/^af_/),
          reason: 'spam',
        },
      });
    });

    it('creates a flag even if targetEntityId does not exist (SYS-01 regression)', async () => {
      const payloadWithFakeId = {
        ...validPayload,
        targetEntityId: 'pet_this_does_not_exist',
      };

      const res = await request(app)
        .post('/api/abuse-flags')
        .set(authHeader())
        .send(payloadWithFakeId);

      expect(res.status).toBe(201);
      expect(mockQuery).toHaveBeenCalledTimes(2);
      const insertParams = mockQuery.mock.calls[1][1];
      expect(insertParams[2]).toBe('pet_this_does_not_exist');
    });

    it('allows multiple identical flags from the same user (AF-01 regression)', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [], rowCount: 0 })
        .mockResolvedValueOnce({ rows: [], rowCount: 1 })
        .mockResolvedValueOnce({
          rows: [{ id: 'af_existing', created_at: 12345 }],
          rowCount: 1,
        });

      const res1 = await request(app)
        .post('/api/abuse-flags')
        .set(authHeader())
        .send(validPayload);
      expect(res1.status).toBe(201);

      const res2 = await request(app)
        .post('/api/abuse-flags')
        .set(authHeader())
        .send(validPayload);
      expect(res2.status).toBe(200);
      expect(res2.body).toEqual({
        ok: true,
        id: 'af_existing',
        createdAt: 12345,
        status: 'open',
        duplicate: true,
      });

      expect(mockQuery).toHaveBeenCalledTimes(3);
      expect(mockWriteAuditLog).toHaveBeenCalledTimes(1);
    });
  });
});
