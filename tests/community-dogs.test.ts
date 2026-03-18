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

const FAKE_CREATOR = { uid: 'user-creator', email: 'creator@example.com' };
const FAKE_USER = { uid: 'user-regular', email: 'user@example.com' };

const makeDog = (overrides: Partial<any> = {}) => ({
  id: 'cd_1',
  nickname: 'Boby',
  breed: 'Mixed',
  size: 'medium',
  colors: ['brown'],
  marks: 'white spot on chest',
  approximate_area: 'Plaza de Armas',
  approx_lat: -33.437,
  approx_lng: -70.65,
  health_notes: 'Seems healthy',
  is_sterilized: false,
  is_vaccinated: false,
  review_state: 'pending_review',
  created_by: FAKE_CREATOR.uid,
  created_at: Date.now(),
  updated_at: Date.now(),
  ...overrides,
});

function authHeader(tokenUser = FAKE_CREATOR) {
  mockVerifyIdToken.mockResolvedValue(tokenUser);
  return { Authorization: 'Bearer valid-token' };
}

describe('Community Dogs API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockVerifyIdToken.mockResolvedValue(FAKE_CREATOR);
  });

  describe('POST /community-dogs', () => {
    it('returns 401 if not authenticated', async () => {
      const res = await request(app).post('/api/community-dogs').send({});

      expect(res.status).toBe(401);
    });

    it('returns 400 if nickname is missing', async () => {
      const res = await request(app)
        .post('/api/community-dogs')
        .set(authHeader())
        .send({ breed: 'Poodle' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('nickname is required');
    });

    it('creates a new dog with pending_review state and returns 201', async () => {
      const dog = makeDog({ id: 'cd_123' });
      mockQuery
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [dog] });

      const res = await request(app)
        .post('/api/community-dogs')
        .set(authHeader())
        .send({ nickname: 'Boby' });

      expect(res.status).toBe(201);
      expect(res.body.id).toMatch(/^cd_/);
      expect(res.body.reviewState).toBe('pending_review');
      expect(res.body.createdBy).toBe(FAKE_CREATOR.uid);
      expect(mockWriteAuditLog).toHaveBeenCalledWith(
        expect.objectContaining({
          actionType: 'community_dog_submitted',
          actorUid: FAKE_CREATOR.uid,
        })
      );
    });
  });

  describe('GET /community-dogs', () => {
    it('returns public-safe approved dogs only', async () => {
      const approvedDog = makeDog({ id: 'cd_approved', review_state: 'approved' });
      mockQuery.mockResolvedValueOnce({ rows: [approvedDog] });

      const res = await request(app).get('/api/community-dogs');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].id).toBe('cd_approved');
      expect(res.body[0]).not.toHaveProperty('reviewState');
      expect(res.body[0]).not.toHaveProperty('approxLat');
      expect(res.body[0]).not.toHaveProperty('approxLng');
      expect(res.body[0].approximateArea).toBe('Plaza de Armas');
    });
  });

  describe('GET /community-dogs/:id', () => {
    it('returns 404 for pending_review dogs in public detail', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [makeDog()] });

      const res = await request(app).get('/api/community-dogs/cd_1');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('not_found');
    });

    it('returns public-safe detail for approved dogs', async () => {
      const approvedDog = makeDog({ review_state: 'approved' });
      mockQuery.mockResolvedValueOnce({ rows: [approvedDog] });

      const res = await request(app).get('/api/community-dogs/cd_1');

      expect(res.status).toBe(200);
      expect(res.body.id).toBe('cd_1');
      expect(res.body).not.toHaveProperty('reviewState');
      expect(res.body).not.toHaveProperty('createdBy');
      expect(res.body).not.toHaveProperty('approxLat');
      expect(res.body).not.toHaveProperty('approxLng');
    });
  });

  describe('GET /my-community-dogs/:id', () => {
    it('returns internal view for the creator', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [makeDog()] });

      const res = await request(app)
        .get('/api/my-community-dogs/cd_1')
        .set(authHeader(FAKE_CREATOR));

      expect(res.status).toBe(200);
      expect(res.body.reviewState).toBe('pending_review');
      expect(res.body.createdBy).toBe(FAKE_CREATOR.uid);
      expect(res.body.approxLat).toBeCloseTo(-33.437);
      expect(res.body.approxLng).toBeCloseTo(-70.65);
    });
  });

  describe('GET /community-dogs/:id/sightings', () => {
    it('returns public sightings without reporter or exact coordinates', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ id: 'cd_1', review_state: 'approved' }] })
        .mockResolvedValueOnce({
          rows: [
            {
              id: 'cds_1',
              location_label: 'Parque',
              condition_notes: 'Healthy',
              notes: 'Seen near trees',
              created_at: 123456,
              reported_by: FAKE_USER.uid,
              approx_lat: -33.45,
              approx_lng: -70.66,
            },
          ],
        });

      const res = await request(app).get('/api/community-dogs/cd_1/sightings');

      expect(res.status).toBe(200);
      expect(res.body[0]).toEqual({
        id: 'cds_1',
        locationLabel: 'Parque',
        conditionNotes: 'Healthy',
        notes: 'Seen near trees',
        createdAt: 123456,
      });
      expect(res.body[0]).not.toHaveProperty('reportedBy');
      expect(res.body[0]).not.toHaveProperty('approxLat');
      expect(res.body[0]).not.toHaveProperty('approxLng');
    });
  });

  describe('GET /community-dogs/:id/actions', () => {
    it('returns public actions without reporter info', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ id: 'cd_1', review_state: 'approved' }] })
        .mockResolvedValueOnce({
          rows: [
            {
              id: 'cda_1',
              action_type: 'feeding',
              notes: 'Food and water',
              created_at: 123456,
              reported_by: FAKE_USER.uid,
            },
          ],
        });

      const res = await request(app).get('/api/community-dogs/cd_1/actions');

      expect(res.status).toBe(200);
      expect(res.body[0]).toEqual({
        id: 'cda_1',
        actionType: 'feeding',
        notes: 'Food and water',
        createdAt: 123456,
      });
      expect(res.body[0]).not.toHaveProperty('reportedBy');
    });
  });

  describe('POST /community-dogs/:id/sightings', () => {
    it('returns 401 if not authenticated', async () => {
      const res = await request(app)
        .post('/api/community-dogs/cd_1/sightings')
        .send({ locationLabel: 'Park' });

      expect(res.status).toBe(401);
    });

    it('returns 404 if dog is not approved', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [{ id: 'cd_1', review_state: 'pending_review' }] });

      const res = await request(app)
        .post('/api/community-dogs/cd_1/sightings')
        .set(authHeader())
        .send({ locationLabel: 'Park' });

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('not_found');
    });

    it('creates a sighting for an approved dog', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ id: 'cd_1', review_state: 'approved' }] })
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .post('/api/community-dogs/cd_1/sightings')
        .set(authHeader())
        .send({ locationLabel: 'Park', lat: -33.456, lng: -70.667, notes: 'Seen running' });

      expect(res.status).toBe(201);
      expect(res.body.communityDogId).toBe('cd_1');
      expect(res.body.reportedBy).toBe(FAKE_CREATOR.uid);
      expect(res.body.locationLabel).toBe('Park');
    });
  });

  describe('POST /community-dogs/:id/actions', () => {
    it('returns 400 for invalid actionType', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [{ id: 'cd_1', review_state: 'approved' }] });

      const res = await request(app)
        .post('/api/community-dogs/cd_1/actions')
        .set(authHeader())
        .send({ actionType: 'invalid' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('bad_request');
    });

    it('creates an action for an approved dog', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ id: 'cd_1', review_state: 'approved' }] })
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .post('/api/community-dogs/cd_1/actions')
        .set(authHeader())
        .send({ actionType: 'feeding', notes: 'Food provided' });

      expect(res.status).toBe(201);
      expect(res.body.communityDogId).toBe('cd_1');
      expect(res.body.reportedBy).toBe(FAKE_CREATOR.uid);
      expect(res.body.actionType).toBe('feeding');
    });
  });
});
