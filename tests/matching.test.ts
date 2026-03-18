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
import { colorOverlap, distanceScore, recencyScore } from '../server/routes/matching.js';

const FAKE_USER = {
  uid: 'user-matching',
  email: 'matching@example.com',
  name: 'Matcher',
  picture: null,
  email_verified: true,
};

function authHeader() {
  return { Authorization: 'Bearer valid-token' };
}

function makeOrigin(
  overrides: Record<string, unknown> = {}
): Record<string, unknown> {
  return {
    id: 'case-origin',
    type: 'lost',
    status: 'active',
    approx_lat: '-33.45',
    approx_lng: '-70.66',
    size: 'medium',
    colors: ['black', 'white'],
    traits: ['scar'],
    created_at: Date.now() - 60 * 60 * 1000,
    ...overrides,
  };
}

function makeCandidate(
  id: string,
  overrides: Record<string, unknown> = {}
): Record<string, unknown> {
  return {
    id,
    type: 'found',
    status: 'active',
    approx_lat: '-33.4501',
    approx_lng: '-70.6601',
    created_at: Date.now() - 60 * 60 * 1000,
    size: 'medium',
    colors: ['black'],
    traits: ['scar'],
    location: 'Santiago',
    time_label: 'recent',
    description: 'candidate',
    ...overrides,
  };
}

describe('Matching API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockVerifyIdToken.mockResolvedValue(FAKE_USER);
  });

  describe('GET /api/matching/cases/:id', () => {
    it('returns 401 when auth token is missing', async () => {
      const res = await request(app).get('/api/matching/cases/case-origin');
      expect(res.status).toBe(401);
    });

    it('returns 404 when origin case does not exist', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .get('/api/matching/cases/case-origin')
        .set(authHeader());

      expect(res.status).toBe(404);
      expect(res.body).toMatchObject({ error: 'case_not_found' });
    });

    it('returns 500 with generic error when query fails', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [makeOrigin()] })
        .mockRejectedValueOnce(new Error('db exploded'));

      const res = await request(app)
        .get('/api/matching/cases/case-origin')
        .set(authHeader());

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'matching_failed' });
      expect(res.body).not.toHaveProperty('message');
    });

    it('returns 200 with empty array when no candidates are available', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [makeOrigin()] })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .get('/api/matching/cases/case-origin')
        .set(authHeader());

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('uses found/sighted candidates when origin case is lost', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [makeOrigin({ type: 'lost' })] })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .get('/api/matching/cases/case-origin')
        .set(authHeader());

      expect(res.status).toBe(200);
      expect(mockQuery).toHaveBeenCalledTimes(2);
      expect(mockQuery.mock.calls[1][1][0]).toEqual(['found', 'sighted']);
    });

    it('uses lost candidates when origin case is found', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [makeOrigin({ type: 'found' })] })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .get('/api/matching/cases/case-origin')
        .set(authHeader());

      expect(res.status).toBe(200);
      expect(mockQuery).toHaveBeenCalledTimes(2);
      expect(mockQuery.mock.calls[1][1][0]).toEqual(['lost']);
    });

    it('returns sorted ranking by confidence descending', async () => {
      const now = Date.now();
      const high = makeCandidate('high', {
        approx_lat: '-33.4500',
        approx_lng: '-70.6600',
        created_at: now - 30 * 60 * 1000,
        colors: ['black', 'white'],
        traits: ['scar'],
      });
      const medium = makeCandidate('medium', {
        approx_lat: '-33.5300',
        approx_lng: '-70.7600',
        created_at: now - 20 * 60 * 60 * 1000,
        colors: ['black'],
        traits: [],
        size: 'large',
      });

      mockQuery
        .mockResolvedValueOnce({ rows: [makeOrigin()] })
        .mockResolvedValueOnce({ rows: [medium, high] });

      const res = await request(app)
        .get('/api/matching/cases/case-origin')
        .set(authHeader());

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
      expect(res.body[0].caseId).toBe('high');
      expect(res.body[0].confidence).toBeGreaterThan(res.body[1].confidence);
    });

    it('filters out candidates with confidence below 15', async () => {
      const weak = makeCandidate('weak', {
        approx_lat: '-34.2000',
        approx_lng: '-71.9000',
        created_at: Date.now() - 200 * 60 * 60 * 1000,
        size: '',
        colors: [],
        traits: [],
      });

      mockQuery
        .mockResolvedValueOnce({ rows: [makeOrigin()] })
        .mockResolvedValueOnce({ rows: [weak] });

      const res = await request(app)
        .get('/api/matching/cases/case-origin')
        .set(authHeader());

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('handles null or invalid coords/colors/traits without crashing', async () => {
      const origin = makeOrigin({
        approx_lat: null,
        approx_lng: 'not-a-number',
        colors: null,
        traits: 'not-an-array',
      });
      const candidate = makeCandidate('safe', {
        approx_lat: {},
        approx_lng: undefined,
        colors: { bad: true },
        traits: 12345,
        size: 'medium',
        created_at: Date.now() - 60 * 60 * 1000,
      });

      mockQuery
        .mockResolvedValueOnce({ rows: [origin] })
        .mockResolvedValueOnce({ rows: [candidate] });

      const res = await request(app)
        .get('/api/matching/cases/case-origin')
        .set(authHeader());

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(typeof res.body[0].confidence).toBe('number');
      expect(Number.isNaN(res.body[0].confidence)).toBe(false);
      expect(res.body[0].colors).toEqual([]);
    });

    it('returns at most 20 results', async () => {
      const candidates = Array.from({ length: 30 }, (_, idx) =>
        makeCandidate(`case-${idx}`, {
          created_at: Date.now() - (idx + 1) * 60 * 1000,
        })
      );

      mockQuery
        .mockResolvedValueOnce({ rows: [makeOrigin()] })
        .mockResolvedValueOnce({ rows: candidates });

      const res = await request(app)
        .get('/api/matching/cases/case-origin')
        .set(authHeader());

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(20);
    });
  });
});

describe('Matching scoring helpers', () => {
  it('recencyScore handles recent and null timestamps', () => {
    const veryRecent = recencyScore(Date.now() - 10 * 60 * 1000);
    const missing = recencyScore(null);

    expect(veryRecent.score).toBe(30);
    expect(missing.score).toBe(0);
  });

  it('distanceScore handles near and invalid distances', () => {
    expect(distanceScore(0.4).score).toBe(30);
    expect(distanceScore(10).score).toBe(2);
    expect(distanceScore(null).score).toBe(0);
  });

  it('colorOverlap is case-insensitive and type-safe', () => {
    expect(colorOverlap(['Black', 'White'], ['black', 'BROWN'])).toBe(1);
    expect(colorOverlap(null, ['black'])).toBe(0);
    expect(colorOverlap(['black'], { bad: true })).toBe(0);
  });
});
