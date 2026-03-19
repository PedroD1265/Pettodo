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

const FAKE_MODERATOR = {
  uid: 'user-moderator',
  email: 'moderator@example.com',
};

const FAKE_OPERATOR = {
  uid: 'user-operator',
  email: 'operator@example.com',
};

const FAKE_USER = {
  uid: 'user-regular',
  email: 'user@example.com',
};

function authHeader(user = FAKE_MODERATOR) {
  mockVerifyIdToken.mockResolvedValue(user);
  return { Authorization: 'Bearer valid-token' };
}

describe('Reviews API', () => {
  beforeEach(() => {
    mockQuery.mockReset();
    mockVerifyIdToken.mockReset();
    mockWriteAuditLog.mockReset();
    mockVerifyIdToken.mockResolvedValue(FAKE_MODERATOR);
  });

  describe('GET /api/reviews/pending', () => {
    it('returns 401 when auth token is missing', async () => {
      const res = await request(app).get('/api/reviews/pending');

      expect(res.status).toBe(401);
      expect(res.body).toEqual({ error: 'unauthorized' });
    });

    it('returns 403 for a regular user without moderator/operator role', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [{ role: 'user' }] });

      const res = await request(app)
        .get('/api/reviews/pending')
        .set(authHeader(FAKE_USER));

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('forbidden');
    });

    it('returns all pending items for a moderator', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ role: 'moderator' }] })
        .mockResolvedValueOnce({
          rows: [
            {
              id: 'cd_1',
              nickname: 'Boby',
              size: 'medium',
              breed: 'Mixed',
              colors: ['brown'],
              approximate_area: 'Plaza',
              review_state: 'pending_review',
              created_by: 'user-creator',
              created_at: 1000,
            },
          ],
          rowCount: 1,
        })
        .mockResolvedValueOnce({
          rows: [
            {
              id: 'cr_1',
              target_entity_type: 'community_dog',
              target_entity_id: 'cd_1',
              requested_by: 'user-editor',
              proposed_changes: { nickname: 'Boby 2' },
              reason: 'Typo',
              review_state: 'pending_review',
              created_at: 1001,
            },
          ],
          rowCount: 1,
        })
        .mockResolvedValueOnce({
          rows: [
            {
              id: 'ei_1',
              target_entity_type: 'case',
              target_entity_id: 'case_1',
              submitted_by: 'user-witness',
              evidence_type: 'sighting',
              description: 'Seen nearby',
              review_state: 'pending_review',
              created_at: 1002,
            },
          ],
          rowCount: 1,
        });

      const res = await request(app)
        .get('/api/reviews/pending')
        .set(authHeader(FAKE_MODERATOR));

      expect(res.status).toBe(200);
      expect(res.body.totalPending).toBe(3);
      expect(res.body.communityDogs).toHaveLength(1);
      expect(res.body.changeRequests).toHaveLength(1);
      expect(res.body.evidenceItems).toHaveLength(1);
    });

    it('allows operator role as well', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ role: 'operator' }] })
        .mockResolvedValueOnce({ rows: [], rowCount: 0 })
        .mockResolvedValueOnce({ rows: [], rowCount: 0 })
        .mockResolvedValueOnce({ rows: [], rowCount: 0 });

      const res = await request(app)
        .get('/api/reviews/pending')
        .set(authHeader(FAKE_OPERATOR));

      expect(res.status).toBe(200);
      expect(res.body.totalPending).toBe(0);
    });
  });

  describe('POST /api/reviews/:entityType/:entityId/approve', () => {
    it('returns 400 for an invalid entityType', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [{ role: 'moderator' }] });

      const res = await request(app)
        .post('/api/reviews/not-real/entity_1/approve')
        .set(authHeader())
        .send({ notes: 'looks good' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('bad_request');
    });

    it('returns 404 when the target entity does not exist', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ role: 'moderator' }] })
        .mockResolvedValueOnce({ rows: [], rowCount: 0 })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .post('/api/reviews/community_dog/cd_missing/approve')
        .set(authHeader())
        .send({ notes: 'looks good' });

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'not_found' });
    });

    it('returns 400 when the entity is not pending_review', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ role: 'moderator' }] })
        .mockResolvedValueOnce({
          rows: [],
          rowCount: 0,
        })
        .mockResolvedValueOnce({
          rows: [{ review_state: 'approved' }],
        });

      const res = await request(app)
        .post('/api/reviews/community_dog/cd_1/approve')
        .set(authHeader())
        .send({ notes: 'looks good' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('not_pending');
      expect(res.body.currentState).toBe('approved');
    });

    it('approves a pending community dog and writes audit log', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ role: 'moderator' }] })
        .mockResolvedValueOnce({
          rows: [{ id: 'cd_1', review_state: 'approved' }],
          rowCount: 1,
        })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .post('/api/reviews/community_dog/cd_1/approve')
        .set(authHeader(FAKE_MODERATOR))
        .send({ notes: 'approved by moderation' });

      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.entityType).toBe('community_dog');
      expect(res.body.entityId).toBe('cd_1');
      expect(res.body.decision).toBe('approved');
      expect(res.body.reviewDecisionId).toMatch(/^rd_/);
      expect(mockQuery.mock.calls[1][0]).toContain('UPDATE community_dogs');
      expect(mockQuery.mock.calls[1][0]).toContain("WHERE id = $2 AND review_state = 'pending_review'");
      expect(mockQuery.mock.calls[1][1][0]).toBe('approved');
      expect(mockWriteAuditLog).toHaveBeenCalledWith({
        actionType: 'review_approved',
        actorUid: FAKE_MODERATOR.uid,
        targetEntityType: 'community_dog',
        targetEntityId: 'cd_1',
        metadata: { decision: 'approved', notes: 'approved by moderation' },
      });
    });
  });

  describe('POST /api/reviews/:entityType/:entityId/reject', () => {
    it('rejects a pending evidence item and records the decision', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ role: 'operator' }] })
        .mockResolvedValueOnce({
          rows: [{ id: 'ei_1', review_state: 'rejected' }],
          rowCount: 1,
        })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .post('/api/reviews/evidence_item/ei_1/reject')
        .set(authHeader(FAKE_OPERATOR))
        .send({ notes: 'insufficient evidence' });

      expect(res.status).toBe(200);
      expect(res.body.decision).toBe('rejected');
      expect(mockQuery.mock.calls[1][0]).toContain('UPDATE evidence_items');
      expect(mockQuery.mock.calls[1][0]).toContain("WHERE id = $2 AND review_state = 'pending_review'");
      expect(mockQuery.mock.calls[1][1]).toEqual(['rejected', 'ei_1']);
      expect(mockWriteAuditLog).toHaveBeenCalledWith({
        actionType: 'review_rejected',
        actorUid: FAKE_OPERATOR.uid,
        targetEntityType: 'evidence_item',
        targetEntityId: 'ei_1',
        metadata: { decision: 'rejected', notes: 'insufficient evidence' },
      });
    });
  });
});
