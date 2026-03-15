import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';

vi.mock('../server/db.js', () => ({
  query: vi.fn(),
  pool: { query: vi.fn(), connect: vi.fn(), on: vi.fn() },
}));

vi.mock('../server/firebaseAdmin.js', () => ({
  adminAuth: null,
}));

import app from '../server/app.js';

describe('GET /api/health', () => {
  it('returns 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
  });

  it('body is { ok: true }', async () => {
    const res = await request(app).get('/api/health');
    expect(res.body).toEqual({ ok: true });
  });
});
