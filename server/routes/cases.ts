import { Router, type Response } from 'express';
import { verifyToken, type AuthenticatedRequest } from '../middleware/verifyToken.js';
import { query } from '../db.js';

const router = Router();

function caseRowToJson(row: any) {
  return {
    id: row.id,
    type: row.type,
    status: row.status,
    petId: row.pet_id ?? null,
    location: row.location ?? '',
    lat: row.approx_lat != null ? parseFloat(row.approx_lat) : null,
    lng: row.approx_lng != null ? parseFloat(row.approx_lng) : null,
    privacyRadius: 300,
    timeLabel: row.time_label ?? '',
    time: row.time_label ?? '',
    description: row.description ?? '',
    size: row.size ?? '',
    colors: row.colors ?? [],
    traits: row.traits ?? [],
    direction: row.direction ?? '',
    createdAt: Number(row.created_at),
    updatedAt: Number(row.updated_at),
  };
}

function approx(coord: number | undefined | null): number | null {
  if (coord == null || isNaN(coord)) return null;
  return Math.round(coord * 100) / 100;
}

router.post('/cases', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const {
      id,
      type,
      petId,
      location,
      lat,
      lng,
      timeLabel,
      description,
      size,
      colors,
      traits,
      direction,
      createdAt,
    } = req.body;

    if (!type || !['lost', 'found', 'sighted'].includes(type)) {
      res.status(400).json({ error: 'invalid_type', message: 'type must be lost, found, or sighted' });
      return;
    }

    const now = Date.now();
    const caseId = id || `case_${now}_${Math.random().toString(36).slice(2, 8)}`;

    await query(
      `INSERT INTO cases
        (id, type, status, created_by, pet_id, location, approx_lat, approx_lng,
         time_label, description, size, colors, traits, direction, created_at, updated_at)
       VALUES ($1, $2, 'active', $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
      [
        caseId,
        type,
        uid,
        petId || null,
        location || '',
        approx(lat),
        approx(lng),
        timeLabel || '',
        description || '',
        size || '',
        colors && Array.isArray(colors) ? colors : [],
        traits && Array.isArray(traits) ? traits : [],
        direction || '',
        createdAt || now,
        now,
      ]
    );

    const result = await query('SELECT * FROM cases WHERE id = $1', [caseId]);
    res.status(201).json(caseRowToJson(result.rows[0]));
  } catch (err: any) {
    console.error('[cases] POST error:', err.message);
    res.status(500).json({ error: 'create_failed', message: err.message });
  }
});

router.get('/cases', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const result = await query(
      'SELECT * FROM cases WHERE created_by = $1 ORDER BY created_at DESC',
      [uid]
    );
    res.json(result.rows.map(caseRowToJson));
  } catch (err: any) {
    console.error('[cases] GET list error:', err.message);
    res.status(500).json({ error: 'fetch_failed' });
  }
});

router.get('/cases/:id', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const result = await query(
      'SELECT * FROM cases WHERE id = $1 AND created_by = $2',
      [req.params.id, uid]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'not_found' });
      return;
    }
    res.json(caseRowToJson(result.rows[0]));
  } catch (err: any) {
    console.error('[cases] GET /:id error:', err.message);
    res.status(500).json({ error: 'fetch_failed' });
  }
});

export default router;
