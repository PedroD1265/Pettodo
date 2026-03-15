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
  email: 'owner@example.com',
  name: 'Owner',
  picture: null,
  email_verified: true,
};

const FAKE_PET_ROW = {
  id: 'pet-001',
  name: 'Buddy',
  breed: 'Labrador',
  size: 'Large',
  colors: ['brown'],
  marks: '',
  collar: '',
  temperament: 'friendly',
  age: '3',
  weight: '30kg',
  microchip: '',
  vaccines: '',
  last_vaccine: '',
  next_vaccine: '',
  created_at: 1700000000000,
};

function authHeader() {
  return { Authorization: 'Bearer valid-token' };
}

describe('Pets API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockVerifyIdToken.mockResolvedValue(FAKE_USER);
  });

  describe('GET /api/pets', () => {
    it('returns an array of pets', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [FAKE_PET_ROW] });

      const res = await request(app)
        .get('/api/pets')
        .set(authHeader());

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toMatchObject({ id: 'pet-001', name: 'Buddy' });
    });

    it('returns empty array when no pets exist', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .get('/api/pets')
        .set(authHeader());

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('POST /api/pets', () => {
    it('returns 400 when name is missing', async () => {
      const res = await request(app)
        .post('/api/pets')
        .set(authHeader())
        .send({ breed: 'Poodle' });

      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({ error: 'validation' });
    });

    it('returns 201 with created pet on valid payload', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [FAKE_PET_ROW] });

      const res = await request(app)
        .post('/api/pets')
        .set(authHeader())
        .send({ name: 'Buddy', breed: 'Labrador', size: 'Large' });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ name: 'Buddy' });
    });
  });

  describe('PUT /api/pets/:id', () => {
    it('returns 200 when updating an existing pet', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ id: 'pet-001' }] })
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [{ ...FAKE_PET_ROW, name: 'Buddy Updated' }] });

      const res = await request(app)
        .put('/api/pets/pet-001')
        .set(authHeader())
        .send({ name: 'Buddy Updated' });

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ name: 'Buddy Updated' });
    });

    it('returns 404 when pet does not exist', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .put('/api/pets/missing-pet')
        .set(authHeader())
        .send({ name: 'Ghost' });

      expect(res.status).toBe(404);
      expect(res.body).toMatchObject({ error: 'not_found' });
    });
  });

  describe('DELETE /api/pets/:id', () => {
    it('returns 200 when deleting an existing pet', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [{ id: 'pet-001' }] });

      const res = await request(app)
        .delete('/api/pets/pet-001')
        .set(authHeader());

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ deleted: true });
    });

    it('returns 404 when pet does not exist', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .delete('/api/pets/missing-pet')
        .set(authHeader());

      expect(res.status).toBe(404);
      expect(res.body).toMatchObject({ error: 'not_found' });
    });
  });
});
