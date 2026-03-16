import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

const mockVerifyIdToken = vi.hoisted(() => vi.fn());
const mockQuery = vi.hoisted(() => vi.fn());
const mockIsStorageConfigured = vi.hoisted(() => vi.fn());
const mockGenerateUploadSasUrl = vi.hoisted(() => vi.fn());
const mockGenerateReadSasUrl = vi.hoisted(() => vi.fn());
const mockDeleteBlob = vi.hoisted(() => vi.fn());

vi.mock('../server/db.js', () => ({
  query: mockQuery,
  pool: { query: vi.fn(), connect: vi.fn(), on: vi.fn() },
}));

vi.mock('../server/firebaseAdmin.js', () => ({
  adminAuth: { verifyIdToken: mockVerifyIdToken },
}));

vi.mock('../server/blobStorage.js', () => ({
  isStorageConfigured: mockIsStorageConfigured,
  generateUploadSasUrl: mockGenerateUploadSasUrl,
  generateReadSasUrl: mockGenerateReadSasUrl,
  deleteBlob: mockDeleteBlob,
  ensureContainer: vi.fn().mockResolvedValue(undefined),
}));

import app from '../server/app.js';

const FAKE_USER = {
  uid: 'user-abc',
  email: 'owner@example.com',
  name: 'Owner',
  picture: null,
  email_verified: true,
};

function authHeader() {
  return { Authorization: 'Bearer valid-token' };
}

describe('Storage API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockVerifyIdToken.mockResolvedValue(FAKE_USER);
  });

  describe('POST /api/storage/upload-url', () => {
    it('returns 503 when storage is not configured', async () => {
      mockIsStorageConfigured.mockReturnValue(false);

      const res = await request(app)
        .post('/api/storage/upload-url')
        .set(authHeader())
        .send({ filename: 'photo.jpg', mimeType: 'image/jpeg' });

      expect(res.status).toBe(503);
      expect(res.body).toMatchObject({ error: 'storage_not_configured' });
    });

    it('returns 400 when filename is missing', async () => {
      mockIsStorageConfigured.mockReturnValue(true);

      const res = await request(app)
        .post('/api/storage/upload-url')
        .set(authHeader())
        .send({ mimeType: 'image/jpeg' });

      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({ error: 'validation' });
    });

    it('returns upload and read URLs when configured and no entity provided', async () => {
      mockIsStorageConfigured.mockReturnValue(true);
      mockGenerateUploadSasUrl.mockReturnValue('https://blob.example.com/upload?sas=...');
      mockGenerateReadSasUrl.mockReturnValue('https://blob.example.com/read?sas=...');

      const res = await request(app)
        .post('/api/storage/upload-url')
        .set(authHeader())
        .send({ filename: 'photo.jpg', mimeType: 'image/jpeg' });

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        uploadUrl: expect.stringContaining('https://'),
        readUrl: expect.stringContaining('https://'),
        blobPath: expect.stringContaining('temp/user-abc/'),
      });
    });

    it('validates pet ownership when entityType=pet is provided', async () => {
      mockIsStorageConfigured.mockReturnValue(true);
      mockQuery.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .post('/api/storage/upload-url')
        .set(authHeader())
        .send({ filename: 'photo.jpg', mimeType: 'image/jpeg', entityType: 'pet', entityId: 'not-my-pet' });

      expect(res.status).toBe(404);
      expect(res.body).toMatchObject({ error: 'not_found' });
    });

    it('returns URLs for owned pet entity', async () => {
      mockIsStorageConfigured.mockReturnValue(true);
      mockQuery.mockResolvedValueOnce({ rows: [{ id: 'pet-001' }] });
      mockGenerateUploadSasUrl.mockReturnValue('https://blob.example.com/upload?sas=...');
      mockGenerateReadSasUrl.mockReturnValue('https://blob.example.com/read?sas=...');

      const res = await request(app)
        .post('/api/storage/upload-url')
        .set(authHeader())
        .send({ filename: 'dog.jpg', mimeType: 'image/jpeg', entityType: 'pet', entityId: 'pet-001' });

      expect(res.status).toBe(200);
      expect(res.body.blobPath).toContain('pets/pet-001/');
    });

    it('returns 401 when auth token is missing', async () => {
      const res = await request(app)
        .post('/api/storage/upload-url')
        .send({ filename: 'photo.jpg' });

      expect(res.status).toBe(401);
    });
  });
});

describe('Pet Images API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockVerifyIdToken.mockResolvedValue(FAKE_USER);
    mockIsStorageConfigured.mockReturnValue(true);
    mockGenerateReadSasUrl.mockReturnValue('https://blob.example.com/pets/pet-001/img.jpg?sas=...');
    mockDeleteBlob.mockResolvedValue(undefined);
  });

  describe('POST /api/pets/:id/images', () => {
    it('returns 404 when pet is not owned by caller', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .post('/api/pets/foreign-pet/images')
        .set(authHeader())
        .send({ blobPath: 'pets/foreign-pet/img.jpg', mimeType: 'image/jpeg', originalFilename: 'img.jpg', sizeBytes: 100 });

      expect(res.status).toBe(404);
    });

    it('returns 400 when blobPath is missing', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [{ id: 'pet-001' }] });

      const res = await request(app)
        .post('/api/pets/pet-001/images')
        .set(authHeader())
        .send({ mimeType: 'image/jpeg', originalFilename: 'img.jpg', sizeBytes: 100 });

      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({ error: 'validation' });
    });

    it('returns 201 with image reference on success', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ id: 'pet-001' }] })
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [{ next: 0 }] })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .post('/api/pets/pet-001/images')
        .set(authHeader())
        .send({ blobPath: 'pets/pet-001/img.jpg', mimeType: 'image/jpeg', originalFilename: 'img.jpg', sizeBytes: 50000, isPrimary: true });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        blobPath: 'pets/pet-001/img.jpg',
        isPrimary: true,
        url: expect.stringContaining('https://'),
      });
    });
  });

  describe('GET /api/pets/:id/images', () => {
    it('returns 404 when pet is not owned', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .get('/api/pets/foreign-pet/images')
        .set(authHeader());

      expect(res.status).toBe(404);
    });

    it('returns image list with read URLs', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ id: 'pet-001' }] })
        .mockResolvedValueOnce({
          rows: [{
            id: 'pimg-001',
            blob_path: 'pets/pet-001/img.jpg',
            mime_type: 'image/jpeg',
            original_filename: 'img.jpg',
            size_bytes: 50000,
            is_primary: true,
            sort_order: 0,
            created_at: 1700000000000,
          }],
        });

      const res = await request(app)
        .get('/api/pets/pet-001/images')
        .set(authHeader());

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toMatchObject({
        id: 'pimg-001',
        blobPath: 'pets/pet-001/img.jpg',
        isPrimary: true,
        url: expect.stringContaining('https://'),
      });
    });
  });

  describe('DELETE /api/pets/:id/images/:imageId', () => {
    it('returns 404 when image does not belong to caller', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .delete('/api/pets/pet-001/images/foreign-img')
        .set(authHeader());

      expect(res.status).toBe(404);
    });

    it('deletes image and returns deleted:true', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ id: 'pimg-001', blob_path: 'pets/pet-001/img.jpg' }] })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .delete('/api/pets/pet-001/images/pimg-001')
        .set(authHeader());

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ deleted: true });
      expect(mockDeleteBlob).toHaveBeenCalledWith('pets/pet-001/img.jpg');
    });
  });
});

describe('Case Images API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockVerifyIdToken.mockResolvedValue(FAKE_USER);
    mockIsStorageConfigured.mockReturnValue(true);
    mockGenerateReadSasUrl.mockReturnValue('https://blob.example.com/cases/case-001/img.jpg?sas=...');
    mockDeleteBlob.mockResolvedValue(undefined);
  });

  describe('POST /api/cases/:id/images', () => {
    it('returns 404 when case is not owned', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .post('/api/cases/foreign-case/images')
        .set(authHeader())
        .send({ blobPath: 'cases/foreign-case/img.jpg', mimeType: 'image/jpeg', originalFilename: 'img.jpg', sizeBytes: 100 });

      expect(res.status).toBe(404);
    });

    it('returns 201 on success', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ id: 'case-001' }] })
        .mockResolvedValueOnce({ rows: [{ next: 0 }] })
        .mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .post('/api/cases/case-001/images')
        .set(authHeader())
        .send({ blobPath: 'cases/case-001/img.jpg', mimeType: 'image/jpeg', originalFilename: 'img.jpg', sizeBytes: 80000 });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ blobPath: 'cases/case-001/img.jpg' });
    });
  });

  describe('GET /api/cases/:id/images', () => {
    it('returns image list for owned case', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ id: 'case-001' }] })
        .mockResolvedValueOnce({
          rows: [{
            id: 'cimg-001',
            blob_path: 'cases/case-001/img.jpg',
            mime_type: 'image/jpeg',
            original_filename: 'img.jpg',
            size_bytes: 80000,
            is_primary: true,
            sort_order: 0,
            created_at: 1700000000000,
          }],
        });

      const res = await request(app)
        .get('/api/cases/case-001/images')
        .set(authHeader());

      expect(res.status).toBe(200);
      expect(res.body[0]).toMatchObject({ id: 'cimg-001', isPrimary: true });
    });
  });
});
