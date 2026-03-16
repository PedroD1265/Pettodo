import { Router, type Response } from 'express';
import { verifyToken, type AuthenticatedRequest } from '../middleware/verifyToken.js';
import {
  isStorageConfigured,
  generateUploadSasUrl,
  generateReadSasUrl,
  deleteBlob,
} from '../blobStorage.js';
import { query } from '../db.js';

const router = Router();

function storageMissingResponse(res: Response) {
  res.status(503).json({
    error: 'storage_not_configured',
    message:
      'Azure Blob Storage credentials are not configured. Set AZURE_STORAGE_ACCOUNT_NAME, AZURE_STORAGE_ACCOUNT_KEY and AZURE_STORAGE_CONTAINER_NAME.',
  });
}

function safeName(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80);
}

function blobExt(filename: string, mime: string): string {
  const fromName = filename.split('.').pop()?.toLowerCase();
  if (fromName && /^[a-z0-9]{2,5}$/.test(fromName)) return fromName;
  if (mime.includes('jpeg') || mime.includes('jpg')) return 'jpg';
  if (mime.includes('png')) return 'png';
  if (mime.includes('webp')) return 'webp';
  if (mime.includes('pdf')) return 'pdf';
  return 'bin';
}

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// ─── POST /api/storage/upload-url ────────────────────────────────────────────
// Returns a SAS write URL + a SAS read URL for a blob that is about to be
// uploaded directly from the browser.
// entityType/entityId are optional; when provided ownership is verified.
router.post('/storage/upload-url', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  if (!isStorageConfigured()) { storageMissingResponse(res); return; }

  const uid = req.user!.uid;
  const { filename, mimeType, entityType, entityId } = req.body as {
    filename?: string;
    mimeType?: string;
    entityType?: 'pet' | 'case';
    entityId?: string;
  };

  if (!filename) {
    res.status(400).json({ error: 'validation', message: 'filename is required' });
    return;
  }

  if (entityType && entityId) {
    try {
      if (entityType === 'pet') {
        const r = await query('SELECT id FROM pets WHERE id = $1 AND owner_uid = $2', [entityId, uid]);
        if (r.rows.length === 0) { res.status(404).json({ error: 'not_found' }); return; }
      } else if (entityType === 'case') {
        const r = await query('SELECT id FROM cases WHERE id = $1 AND created_by = $2', [entityId, uid]);
        if (r.rows.length === 0) { res.status(404).json({ error: 'not_found' }); return; }
      }
    } catch {
      res.status(500).json({ error: 'db_error' }); return;
    }
  }

  const ext = blobExt(filename, mimeType ?? '');
  const ts = Date.now();
  const rand = Math.random().toString(36).slice(2, 7);
  const prefix = entityType && entityId
    ? `${entityType}s/${entityId}`
    : `temp/${uid}`;
  const blobPath = `${prefix}/${ts}-${rand}.${ext}`;

  try {
    const uploadUrl = generateUploadSasUrl(blobPath, 15);
    const readUrl = generateReadSasUrl(blobPath, 60);
    res.json({ uploadUrl, blobPath, readUrl });
  } catch (err: any) {
    res.status(500).json({ error: 'sas_error', message: err.message });
  }
});

// ─── Pet image references ─────────────────────────────────────────────────────

// POST /api/pets/:id/images
router.post('/pets/:id/images', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  const uid = req.user!.uid;
  const petId = req.params.id;

  try {
    const pet = await query('SELECT id FROM pets WHERE id = $1 AND owner_uid = $2', [petId, uid]);
    if (pet.rows.length === 0) { res.status(404).json({ error: 'not_found' }); return; }
  } catch { res.status(500).json({ error: 'db_error' }); return; }

  const { blobPath, mimeType, originalFilename, sizeBytes, isPrimary } = req.body as {
    blobPath?: string;
    mimeType?: string;
    originalFilename?: string;
    sizeBytes?: number;
    isPrimary?: boolean;
  };

  if (!blobPath) {
    res.status(400).json({ error: 'validation', message: 'blobPath is required' });
    return;
  }

  const id = generateId('pimg');
  const now = Date.now();

  try {
    if (isPrimary) {
      await query('UPDATE pet_images SET is_primary = FALSE WHERE pet_id = $1', [petId]);
    }
    const sortRes = await query('SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM pet_images WHERE pet_id = $1', [petId]);
    const sortOrder = sortRes.rows[0].next ?? 0;

    await query(
      `INSERT INTO pet_images (id, pet_id, owner_uid, blob_path, mime_type, original_filename, size_bytes, is_primary, sort_order, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [id, petId, uid, blobPath, mimeType ?? 'image/jpeg', originalFilename ?? safeName(blobPath), sizeBytes ?? 0, isPrimary ?? false, sortOrder, now],
    );

    const url = isStorageConfigured() ? generateReadSasUrl(blobPath, 60) : '';
    res.status(201).json({ id, petId, blobPath, url, isPrimary: isPrimary ?? false, sortOrder, createdAt: now });
  } catch (err: any) {
    res.status(500).json({ error: 'db_error', message: err.message });
  }
});

// GET /api/pets/:id/images
router.get('/pets/:id/images', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  const uid = req.user!.uid;
  const petId = req.params.id;

  try {
    const pet = await query('SELECT id FROM pets WHERE id = $1 AND owner_uid = $2', [petId, uid]);
    if (pet.rows.length === 0) { res.status(404).json({ error: 'not_found' }); return; }

    const imgs = await query(
      'SELECT id, blob_path, mime_type, original_filename, size_bytes, is_primary, sort_order, created_at FROM pet_images WHERE pet_id = $1 ORDER BY sort_order ASC, created_at ASC',
      [petId],
    );

    const rows = imgs.rows.map((r: any) => ({
      id: r.id,
      blobPath: r.blob_path,
      mimeType: r.mime_type,
      originalFilename: r.original_filename,
      sizeBytes: r.size_bytes,
      isPrimary: r.is_primary,
      sortOrder: r.sort_order,
      createdAt: r.created_at,
      url: isStorageConfigured() ? generateReadSasUrl(r.blob_path, 60) : '',
    }));

    res.json(rows);
  } catch { res.status(500).json({ error: 'db_error' }); }
});

// DELETE /api/pets/:id/images/:imageId
router.delete('/pets/:id/images/:imageId', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  const uid = req.user!.uid;
  const { id: petId, imageId } = req.params;

  try {
    const row = await query(
      'SELECT id, blob_path FROM pet_images WHERE id = $1 AND pet_id = $2 AND owner_uid = $3',
      [imageId, petId, uid],
    );
    if (row.rows.length === 0) { res.status(404).json({ error: 'not_found' }); return; }

    const { blob_path } = row.rows[0];
    await query('DELETE FROM pet_images WHERE id = $1', [imageId]);

    if (isStorageConfigured()) {
      await deleteBlob(blob_path).catch(() => {});
    }

    res.json({ deleted: true });
  } catch { res.status(500).json({ error: 'db_error' }); }
});

// ─── Case image references ────────────────────────────────────────────────────

// POST /api/cases/:id/images
router.post('/cases/:id/images', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  const uid = req.user!.uid;
  const caseId = req.params.id;

  try {
    const c = await query('SELECT id FROM cases WHERE id = $1 AND created_by = $2', [caseId, uid]);
    if (c.rows.length === 0) { res.status(404).json({ error: 'not_found' }); return; }
  } catch { res.status(500).json({ error: 'db_error' }); return; }

  const { blobPath, mimeType, originalFilename, sizeBytes, isPrimary } = req.body as {
    blobPath?: string;
    mimeType?: string;
    originalFilename?: string;
    sizeBytes?: number;
    isPrimary?: boolean;
  };

  if (!blobPath) {
    res.status(400).json({ error: 'validation', message: 'blobPath is required' });
    return;
  }

  const id = generateId('cimg');
  const now = Date.now();

  try {
    if (isPrimary) {
      await query('UPDATE case_images SET is_primary = FALSE WHERE case_id = $1', [caseId]);
    }
    const sortRes = await query('SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM case_images WHERE case_id = $1', [caseId]);
    const sortOrder = sortRes.rows[0].next ?? 0;

    await query(
      `INSERT INTO case_images (id, case_id, owner_uid, blob_path, mime_type, original_filename, size_bytes, is_primary, sort_order, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [id, caseId, uid, blobPath, mimeType ?? 'image/jpeg', originalFilename ?? safeName(blobPath), sizeBytes ?? 0, isPrimary ?? false, sortOrder, now],
    );

    const url = isStorageConfigured() ? generateReadSasUrl(blobPath, 60) : '';
    res.status(201).json({ id, caseId, blobPath, url, isPrimary: isPrimary ?? false, sortOrder, createdAt: now });
  } catch (err: any) {
    res.status(500).json({ error: 'db_error', message: err.message });
  }
});

// GET /api/cases/:id/images
router.get('/cases/:id/images', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  const uid = req.user!.uid;
  const caseId = req.params.id;

  try {
    const c = await query('SELECT id FROM cases WHERE id = $1 AND created_by = $2', [caseId, uid]);
    if (c.rows.length === 0) { res.status(404).json({ error: 'not_found' }); return; }

    const imgs = await query(
      'SELECT id, blob_path, mime_type, original_filename, size_bytes, is_primary, sort_order, created_at FROM case_images WHERE case_id = $1 ORDER BY sort_order ASC, created_at ASC',
      [caseId],
    );

    const rows = imgs.rows.map((r: any) => ({
      id: r.id,
      blobPath: r.blob_path,
      mimeType: r.mime_type,
      originalFilename: r.original_filename,
      sizeBytes: r.size_bytes,
      isPrimary: r.is_primary,
      sortOrder: r.sort_order,
      createdAt: r.created_at,
      url: isStorageConfigured() ? generateReadSasUrl(r.blob_path, 60) : '',
    }));

    res.json(rows);
  } catch { res.status(500).json({ error: 'db_error' }); }
});

// DELETE /api/cases/:id/images/:imageId
router.delete('/cases/:id/images/:imageId', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  const uid = req.user!.uid;
  const { id: caseId, imageId } = req.params;

  try {
    const row = await query(
      'SELECT id, blob_path FROM case_images WHERE id = $1 AND case_id = $2 AND owner_uid = $3',
      [imageId, caseId, uid],
    );
    if (row.rows.length === 0) { res.status(404).json({ error: 'not_found' }); return; }

    const { blob_path } = row.rows[0];
    await query('DELETE FROM case_images WHERE id = $1', [imageId]);

    if (isStorageConfigured()) {
      await deleteBlob(blob_path).catch(() => {});
    }

    res.json({ deleted: true });
  } catch { res.status(500).json({ error: 'db_error' }); }
});

export default router;
