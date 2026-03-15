import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

const mockVerifyIdToken = vi.hoisted(() => vi.fn());

const mockClient = vi.hoisted(() => ({
  query: vi.fn(),
  release: vi.fn(),
}));

const mockPool = vi.hoisted(() => ({
  query: vi.fn(),
  connect: vi.fn(),
  on: vi.fn(),
}));

vi.mock('../server/db.js', () => ({
  query: vi.fn(),
  pool: mockPool,
}));

vi.mock('../server/firebaseAdmin.js', () => ({
  adminAuth: { verifyIdToken: mockVerifyIdToken },
}));

import app from '../server/app.js';

const FAKE_USER = {
  uid: 'user-import',
  email: 'importer@example.com',
  name: 'Importer',
  picture: null,
  email_verified: true,
};

function authHeader() {
  return { Authorization: 'Bearer valid-token' };
}

describe('Import API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockVerifyIdToken.mockResolvedValue(FAKE_USER);
    mockPool.connect.mockResolvedValue(mockClient);
    mockClient.release.mockResolvedValue(undefined);
  });

  describe('GET /api/import/status', () => {
    it('returns { imported: false } when nothing has been imported', async () => {
      mockPool.query.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .get('/api/import/status')
        .set(authHeader());

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ imported: false });
    });

    it('returns import metadata when import exists', async () => {
      mockPool.query.mockResolvedValueOnce({
        rows: [{ pet_count: 3, imported_at: 1700000000000 }],
      });

      const res = await request(app)
        .get('/api/import/status')
        .set(authHeader());

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ imported: true, petCount: 3 });
    });
  });

  describe('POST /api/import/pets', () => {
    it('returns 400 when pets array is missing', async () => {
      mockClient.query
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .post('/api/import/pets')
        .set(authHeader())
        .send({});

      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({ error: 'validation' });
    });

    it('returns 400 when pets array is empty', async () => {
      mockClient.query
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .post('/api/import/pets')
        .set(authHeader())
        .send({ pets: [] });

      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({ error: 'validation' });
    });

    it('returns 409 when user has already imported', async () => {
      mockClient.query
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [{ id: 'imp-existing' }] })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .post('/api/import/pets')
        .set(authHeader())
        .send({ pets: [{ name: 'Buddy' }] });

      expect(res.status).toBe(409);
      expect(res.body).toMatchObject({ error: 'already_imported' });
    });

    it('returns success on valid import payload', async () => {
      mockClient.query.mockResolvedValue({ rows: [] });

      const res = await request(app)
        .post('/api/import/pets')
        .set(authHeader())
        .send({
          pets: [
            { name: 'Buddy', breed: 'Labrador', size: 'Large' },
            { name: 'Luna', breed: 'Mixed', size: 'Medium' },
          ],
        });

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ imported: 2, total: 2 });
    });

    it('skips pets without a name but still succeeds', async () => {
      mockClient.query.mockResolvedValue({ rows: [] });

      const res = await request(app)
        .post('/api/import/pets')
        .set(authHeader())
        .send({
          pets: [
            { name: 'Buddy' },
            { breed: 'Unknown' },
          ],
        });

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ imported: 1, total: 2 });
    });
  });
});
