/**
 * Community Dogs Routes
 *
 * Creation requires auth. New records start as pending_review.
 * Public GET only returns approved dogs (pending/rejected are internal only).
 * Exact coordinates are never exposed publicly — only approximate_area (name).
 * Sightings and actions require auth.
 *
 * Audited actions:
 *   community_dog_submitted
 */

import { Router, type Request, type Response } from 'express';
import { verifyToken, type AuthenticatedRequest } from '../middleware/verifyToken.js';
import { query } from '../db.js';
import { writeAuditLog } from '../utils/audit.js';

const router = Router();

function newId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function approx(coord: number | undefined | null): number | null {
  if (coord == null || isNaN(coord)) return null;
  return Math.round(coord * 100) / 100;
}

/** Public-safe view — no exact coords, no internal review metadata */
function dogToPublicJson(row: any) {
  return {
    id: row.id,
    nickname: row.nickname ?? '',
    breed: row.breed ?? '',
    size: row.size ?? '',
    colors: row.colors ?? [],
    marks: row.marks ?? '',
    approximateArea: row.approximate_area ?? '',
    healthNotes: row.health_notes ?? '',
    isSterilized: row.is_sterilized ?? false,
    isVaccinated: row.is_vaccinated ?? false,
    createdAt: Number(row.created_at),
    updatedAt: Number(row.updated_at),
  };
}

/** Full internal view — includes review_state and coords (moderator/owner use) */
function dogToInternalJson(row: any) {
  return {
    ...dogToPublicJson(row),
    reviewState: row.review_state,
    approxLat: row.approx_lat != null ? parseFloat(row.approx_lat) : null,
    approxLng: row.approx_lng != null ? parseFloat(row.approx_lng) : null,
    createdBy: row.created_by,
  };
}

// ─── POST /community-dogs ────────────────────────────────────────────────────
// Create a new Community Dog record. Starts as pending_review.
router.post('/community-dogs', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const {
      nickname,
      breed,
      size,
      colors,
      marks,
      approximateArea,
      lat,
      lng,
      healthNotes,
      isSterilized,
      isVaccinated,
    } = req.body;

    if (!nickname || !nickname.trim()) {
      res.status(400).json({ error: 'bad_request', message: 'nickname is required' });
      return;
    }

    const id = newId('cd');
    const now = Date.now();

    await query(
      `INSERT INTO community_dogs
         (id, nickname, breed, size, colors, marks,
          approximate_area, approx_lat, approx_lng,
          health_notes, is_sterilized, is_vaccinated,
          review_state, created_by, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'pending_review',$13,$14,$14)`,
      [
        id,
        nickname.trim(),
        breed ?? '',
        size ?? '',
        colors && Array.isArray(colors) ? colors : [],
        marks ?? '',
        approximateArea ?? '',
        approx(lat),
        approx(lng),
        healthNotes ?? '',
        isSterilized === true,
        isVaccinated === true,
        uid,
        now,
      ]
    );

    await writeAuditLog({
      actionType: 'community_dog_submitted',
      actorUid: uid,
      targetEntityType: 'community_dog',
      targetEntityId: id,
      metadata: { nickname: nickname.trim() },
    });

    const result = await query('SELECT * FROM community_dogs WHERE id = $1', [id]);
    res.status(201).json(dogToInternalJson(result.rows[0]));
  } catch (err: any) {
    console.error('[community-dogs] POST error:', err.message);
    res.status(500).json({ error: 'create_failed' });
  }
});

// ─── GET /community-dogs ─────────────────────────────────────────────────────
// Public list — only approved dogs, public-safe fields only.
router.get('/community-dogs', async (_req: Request, res: Response) => {
  try {
    const result = await query(
      `SELECT * FROM community_dogs
       WHERE review_state = 'approved'
       ORDER BY updated_at DESC
       LIMIT 100`,
      []
    );
    res.json(result.rows.map(dogToPublicJson));
  } catch (err: any) {
    console.error('[community-dogs] GET list error:', err.message);
    res.status(500).json({ error: 'fetch_failed' });
  }
});

// ─── GET /community-dogs/:id ─────────────────────────────────────────────────
// Public: returns approved dogs (public-safe).
// Creator sees their own pending record (internal view).
router.get('/community-dogs/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM community_dogs WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'not_found' });
      return;
    }
    const row = result.rows[0];

    // Attempt to extract caller UID from auth header (optional for this route)
    let callerUid: string | null = null;
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      // We don't verify here (it's a public route), but we do allow the creator
      // to see their own pending record if they pass their UID via header.
      // Actual token verification happens in the dedicated auth middleware.
      // For simplicity, just check review_state and created_by via query param if needed.
    }

    if (row.review_state !== 'approved') {
      // Only the creator or moderators should see pending/rejected records.
      // Since this is a public route, return 404 to prevent leaking status.
      res.status(404).json({ error: 'not_found' });
      return;
    }

    res.json(dogToPublicJson(row));
  } catch (err: any) {
    console.error('[community-dogs] GET /:id error:', err.message);
    res.status(500).json({ error: 'fetch_failed' });
  }
});

// ─── GET /community-dogs/:id (authenticated view for creators) ───────────────
// Separate authenticated route so creators can view their own pending records.
router.get('/my-community-dogs/:id', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const result = await query(
      'SELECT * FROM community_dogs WHERE id = $1 AND created_by = $2',
      [req.params.id, uid]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'not_found' });
      return;
    }
    res.json(dogToInternalJson(result.rows[0]));
  } catch (err: any) {
    console.error('[community-dogs] GET /my-community-dogs/:id error:', err.message);
    res.status(500).json({ error: 'fetch_failed' });
  }
});

// ─── GET /my-community-dogs ──────────────────────────────────────────────────
// Creator's own dogs (all review states).
router.get('/my-community-dogs', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const result = await query(
      'SELECT * FROM community_dogs WHERE created_by = $1 ORDER BY created_at DESC',
      [uid]
    );
    res.json(result.rows.map(dogToInternalJson));
  } catch (err: any) {
    console.error('[community-dogs] GET /my-community-dogs error:', err.message);
    res.status(500).json({ error: 'fetch_failed' });
  }
});

// ─── POST /community-dogs/:id/sightings ─────────────────────────────────────
// Add a sighting for an approved Community Dog. Auth required.
router.post('/community-dogs/:id/sightings', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const dogResult = await query('SELECT id, review_state FROM community_dogs WHERE id = $1', [req.params.id]);
    if (dogResult.rows.length === 0) {
      res.status(404).json({ error: 'not_found' });
      return;
    }
    if (dogResult.rows[0].review_state !== 'approved') {
      res.status(404).json({ error: 'not_found' });
      return;
    }

    const { locationLabel, lat, lng, conditionNotes, notes } = req.body;
    const id = newId('cds');
    const now = Date.now();

    await query(
      `INSERT INTO community_dog_sightings
         (id, community_dog_id, reported_by, location_label, approx_lat, approx_lng,
          condition_notes, notes, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [id, req.params.id, uid, locationLabel ?? '', approx(lat), approx(lng),
       conditionNotes ?? '', notes ?? '', now]
    );

    await query(
      'UPDATE community_dogs SET updated_at = $1 WHERE id = $2',
      [now, req.params.id]
    );

    res.status(201).json({
      id,
      communityDogId: req.params.id,
      reportedBy: uid,
      locationLabel: locationLabel ?? '',
      conditionNotes: conditionNotes ?? '',
      notes: notes ?? '',
      createdAt: now,
    });
  } catch (err: any) {
    console.error('[community-dogs] POST /sightings error:', err.message);
    res.status(500).json({ error: 'create_failed' });
  }
});

// ─── POST /community-dogs/:id/actions ───────────────────────────────────────
// Add a care action (feeding, medical, rescue, other). Auth required.
router.post('/community-dogs/:id/actions', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const dogResult = await query('SELECT id, review_state FROM community_dogs WHERE id = $1', [req.params.id]);
    if (dogResult.rows.length === 0) {
      res.status(404).json({ error: 'not_found' });
      return;
    }
    if (dogResult.rows[0].review_state !== 'approved') {
      res.status(404).json({ error: 'not_found' });
      return;
    }

    const { actionType, notes } = req.body;
    const validTypes = ['feeding', 'medical', 'rescue', 'other'];
    if (!actionType || !validTypes.includes(actionType)) {
      res.status(400).json({ error: 'bad_request', message: `actionType must be one of: ${validTypes.join(', ')}` });
      return;
    }

    const id = newId('cda');
    const now = Date.now();

    await query(
      `INSERT INTO community_dog_actions
         (id, community_dog_id, reported_by, action_type, notes, created_at)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [id, req.params.id, uid, actionType, notes ?? '', now]
    );

    await query(
      'UPDATE community_dogs SET updated_at = $1 WHERE id = $2',
      [now, req.params.id]
    );

    res.status(201).json({
      id,
      communityDogId: req.params.id,
      reportedBy: uid,
      actionType,
      notes: notes ?? '',
      createdAt: now,
    });
  } catch (err: any) {
    console.error('[community-dogs] POST /actions error:', err.message);
    res.status(500).json({ error: 'create_failed' });
  }
});

export default router;
