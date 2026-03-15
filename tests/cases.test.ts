import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

const mockVerifyIdToken = vi.hoisted(() => vi.fn());
const mockQuery = vi.hoisted(() => vi.fn());

vi.mock('../server/db.js', () => ({
  query: mockQuery,
  pool: { query: vi.fn(), connect: vi.fn(), on: vi.fn() },
}));

vi.mock('../server/firebaseAdmin.js', () => ({
  adminAuth: { verifyIdToken: mockVerifyIdToken },
}));

import app from '../server/app.js';

const FAKE_USER = {
  uid: 'user-abc',
  email: 'reporter@example.com',
  name: 'Reporter',
  picture: null,
  email_verified: true,
};

const FAKE_CASE_ROW = {
  id: 'case_001',
  type: 'lost',
  status: 'active',
  pet_id: null,
  location: 'Central Park',
  approx_lat: 40.78,
  approx_lng: -73.97,
  time_label: 'this morning',
  description: 'Small dog, brown collar',
  size: 'Small',
  colors: ['brown'],
  traits: ['friendly'],
  direction: 'north',
  created_at: 1700000000000,
  updated_at: 1700000000000,
};

function authHeader() {
  return { Authorization: 'Bearer valid-token' };
}

describe('Cases API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockVerifyIdToken.mockResolvedValue(FAKE_USER);
  });

  describe('POST /api/cases', () => {
    it('returns 400 for invalid type', async () => {
      const res = await request(app)
        .post('/api/cases')
        .set(authHeader())
        .send({ type: 'invalid' });

      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({ error: 'invalid_type' });
    });

    it('returns 201 on valid lost case', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [FAKE_CASE_ROW] });

      const res = await request(app)
        .post('/api/cases')
        .set(authHeader())
        .send({
          type: 'lost',
          location: 'Central Park',
          description: 'Small dog, brown collar',
          size: 'Small',
        });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ type: 'lost', status: 'active' });
    });

    it('returns 201 on valid found case', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [{ ...FAKE_CASE_ROW, type: 'found' }] });

      const res = await request(app)
        .post('/api/cases')
        .set(authHeader())
        .send({ type: 'found', location: 'Main Street' });

      expect(res.status).toBe(201);
    });
  });

  describe('GET /api/cases', () => {
    it('returns an array of cases', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [FAKE_CASE_ROW] });

      const res = await request(app)
        .get('/api/cases')
        .set(authHeader());

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toMatchObject({ id: 'case_001', type: 'lost' });
    });

    it('returns empty array when no cases exist', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .get('/api/cases')
        .set(authHeader());

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('GET /api/cases/:id', () => {
    it('returns 200 for an existing case', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [FAKE_CASE_ROW] });

      const res = await request(app)
        .get('/api/cases/case_001')
        .set(authHeader());

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ id: 'case_001', type: 'lost' });
    });

    it('returns 404 for a missing case', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .get('/api/cases/missing-case')
        .set(authHeader());

      expect(res.status).toBe(404);
      expect(res.body).toMatchObject({ error: 'not_found' });
    });
  });
});
