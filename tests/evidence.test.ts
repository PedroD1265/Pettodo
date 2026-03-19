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
  uid: 'user-evidence-tester',
  email: 'evidence@example.com',
};

function authHeader() {
  return { Authorization: 'Bearer valid-token' };
}

describe('Evidence Items API', () => {
  beforeEach(() => {
    mockQuery.mockReset();
    mockVerifyIdToken.mockReset();
    mockWriteAuditLog.mockReset();
    mockVerifyIdToken.mockResolvedValue(FAKE_USER);
    mockQuery.mockResolvedValue({ rows: [{ id: 'case_xyz' }], rowCount: 1 });
  });

  describe('POST /api/evidence-items', () => {
    const validPayload = {
      targetEntityType: 'case',
      targetEntityId: 'case_xyz',
      evidenceType: 'sighting',
      description: 'Saw the dog near the park.',
      metadata: { witnessName: 'John Doe' },
    };

    it('returns 401 when auth token is missing', async () => {
      const res = await request(app).post('/api/evidence-items').send(validPayload);

      expect(res.status).toBe(401);
    });

    it('returns 400 if evidenceType is invalid', async () => {
      const res = await request(app)
        .post('/api/evidence-items')
        .set(authHeader())
        .send({ ...validPayload, evidenceType: 'gossip' });

      expect(res.status).toBe(400);
    });

    it('returns 400 if description is missing', async () => {
      const res = await request(app)
        .post('/api/evidence-items')
        .set(authHeader())
        .send({ ...validPayload, description: '' });

      expect(res.status).toBe(400);
    });

    it('creates an evidence item successfully on valid input (201)', async () => {
      const res = await request(app)
        .post('/api/evidence-items')
        .set(authHeader())
        .send(validPayload);

      expect(res.status).toBe(201);
      expect(res.body.id).toMatch(/^ei_/);
      expect(res.body.reviewState).toBe('pending_review');
      expect(res.body.description).toBe(validPayload.description);

      expect(mockQuery).toHaveBeenCalledTimes(2);
      const insertParams = mockQuery.mock.calls[1][1];
      expect(insertParams).toEqual([
        expect.stringMatching(/^ei_/),
        'case',
        'case_xyz',
        FAKE_USER.uid,
        'sighting',
        'Saw the dog near the park.',
        JSON.stringify({ witnessName: 'John Doe' }),
        expect.any(Number),
      ]);
    });

    it('calls writeAuditLog with correct parameters on success', async () => {
      await request(app)
        .post('/api/evidence-items')
        .set(authHeader())
        .send(validPayload);

      expect(mockWriteAuditLog).toHaveBeenCalledOnce();
      expect(mockWriteAuditLog).toHaveBeenCalledWith({
        actionType: 'evidence_submitted',
        actorUid: FAKE_USER.uid,
        targetEntityType: 'case',
        targetEntityId: 'case_xyz',
        metadata: {
          evidenceItemId: expect.stringMatching(/^ei_/),
          evidenceType: 'sighting',
        },
      });
    });

    it('creates an item even if targetEntityId does not exist (SYS-01 regression)', async () => {
      const payloadWithFakeId = {
        ...validPayload,
        targetEntityId: 'case_is_not_real',
      };

      mockQuery.mockResolvedValueOnce({ rows: [], rowCount: 0 });

      const res = await request(app)
        .post('/api/evidence-items')
        .set(authHeader())
        .send(payloadWithFakeId);

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'not_found' });
      expect(mockQuery).toHaveBeenCalledOnce();
      expect(mockWriteAuditLog).not.toHaveBeenCalled();
    });

    it('returns 400 when description is too long (EV-01 regression)', async () => {
      const longDescription = 'a'.repeat(10000);
      const payloadWithLongDesc = {
        ...validPayload,
        description: longDescription,
      };

      const res = await request(app)
        .post('/api/evidence-items')
        .set(authHeader())
        .send(payloadWithLongDesc);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('bad_request');
      expect(res.body.message).toContain('1000');
      expect(mockQuery).not.toHaveBeenCalled();
      expect(mockWriteAuditLog).not.toHaveBeenCalled();
    });
  });
});
