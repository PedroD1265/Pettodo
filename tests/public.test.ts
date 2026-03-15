import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

const mockQuery = vi.hoisted(() => vi.fn());

vi.mock('../server/db.js', () => ({
  query: mockQuery,
  pool: { query: vi.fn(), connect: vi.fn(), on: vi.fn() },
}));

vi.mock('../server/firebaseAdmin.js', () => ({
  adminAuth: null,
}));

import app from '../server/app.js';

const FAKE_PET_ROW = {
  id: 'pet-public-001',
  name: 'Luna',
  breed: 'Mixed',
  size: 'Medium',
  colors: ['black', 'white'],
  marks: 'white chest',
  collar: 'red collar',
  temperament: 'gentle',
  age: '2',
  weight: '15kg',
  microchip: 'MC12345',
  vaccines: 'Rabies',
  last_vaccine: '2025-01-01',
  next_vaccine: '2026-01-01',
  created_at: 1700000000000,
  owner_uid: 'owner-secret-uid',
  owner_email: 'owner@example.com',
  owner_phone: '+15551234567',
};

describe('GET /api/public/pet/:petId', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 404 when pet does not exist', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });

    const res = await request(app).get('/api/public/pet/no-such-pet');

    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ error: 'not_found' });
  });

  it('returns 200 with pet data when pet exists', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [FAKE_PET_ROW] });

    const res = await request(app).get('/api/public/pet/pet-public-001');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: 'pet-public-001',
      name: 'Luna',
    });
  });

  it('does not expose owner_uid in public response', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [FAKE_PET_ROW] });

    const res = await request(app).get('/api/public/pet/pet-public-001');

    expect(res.body).not.toHaveProperty('owner_uid');
    expect(res.body).not.toHaveProperty('owner_email');
    expect(res.body).not.toHaveProperty('owner_phone');
  });

  it('includes hasOwner field but no owner identity fields', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [FAKE_PET_ROW] });

    const res = await request(app).get('/api/public/pet/pet-public-001');

    expect(res.body).toHaveProperty('hasOwner', true);
    expect(res.body).not.toHaveProperty('owner_uid');
  });

  it('microchip is redacted to Yes/empty string not the real value', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [FAKE_PET_ROW] });

    const res = await request(app).get('/api/public/pet/pet-public-001');

    expect(res.body.microchip).not.toBe('MC12345');
    expect(['Yes', '']).toContain(res.body.microchip);
  });
});
