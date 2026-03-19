/**
 * Public Routes
 *
 * These routes are unauthenticated and must be public-safe.
 * Rules enforced here:
 *   - No phone / email / address exposed
 *   - No exact coordinates
 *   - protectedContactEnabled flag signals relay-first contact model
 *   - Community Dog records only visible if review_state = 'approved'
 */

import { Router, type Request, type Response } from 'express';
import { generateReadSasUrl, isStorageConfigured } from '../blobStorage.js';
import { query } from '../db.js';

const router = Router();

function toPublicEmergencyCase(row: any) {
  return {
    id: row.id,
    type: row.type,
    status: row.status,
    location: row.location ?? '',
    timeLabel: row.time_label ?? '',
    description: row.description ?? '',
    colors: row.colors ?? [],
    traits: row.traits ?? [],
    direction: row.direction ?? '',
    createdAt: Number(row.created_at),
  };
}

async function getPrimaryImageUrl(
  table: 'case_images' | 'pet_images',
  idColumn: 'case_id' | 'pet_id',
  entityId: string,
): Promise<string | null> {
  const imageResult = await Promise.resolve(query(
    `SELECT blob_path
       FROM ${table}
      WHERE ${idColumn} = $1
      ORDER BY is_primary DESC, sort_order ASC, created_at ASC
      LIMIT 1`,
    [entityId],
  )).catch(() => null);

  if (!imageResult?.rows?.length) return null;
  if (!isStorageConfigured()) return null;
  return generateReadSasUrl(imageResult.rows[0].blob_path, 60);
}

// Public QR-linked pet profile.
// Returns public-safe fields only. Owner PII (phone, email, address) is never included.
// Contact must go through the protected contact relay, not direct owner exposure.
router.get('/public/pet/:petId', async (req: Request, res: Response) => {
  try {
    const { petId } = req.params;
    const petResult = await query('SELECT * FROM pets WHERE id = $1', [petId]);

    if (petResult.rows.length === 0) {
      res.status(404).json({ error: 'not_found' });
      return;
    }

    const row = petResult.rows[0];
    const activeCaseResult = await Promise.resolve(query(
      `SELECT *
         FROM cases
        WHERE pet_id = $1 AND status = 'active'
        ORDER BY created_at DESC
        LIMIT 1`,
      [petId],
    )).catch(() => null);
    const activeCase = activeCaseResult?.rows?.[0] ?? null;

    let photoUrl: string | null = null;
    if (activeCase) {
      photoUrl = await getPrimaryImageUrl('case_images', 'case_id', activeCase.id);
    }
    if (!photoUrl) {
      photoUrl = await getPrimaryImageUrl('pet_images', 'pet_id', petId);
    }

    res.json({
      id: row.id,
      name: row.name,
      breed: row.breed,
      size: row.size,
      colors: row.colors ?? [],
      marks: row.marks ?? '',
      collar: row.collar ?? '',
      temperament: row.temperament ?? '',
      age: row.age ?? '',
      microchip: row.microchip ? 'Yes' : '',
      vaccines: row.vaccines ?? '',
      hasOwner: true,
      protectedContactEnabled: true,
      contactEntryPoint: '/api/protected-contact/threads',
      photoUrl,
      emergencyCase: activeCase ? toPublicEmergencyCase(activeCase) : null,
    });
  } catch (err: any) {
    console.error('[public] pet read error:', err.message);
    res.status(500).json({ error: 'db_error' });
  }
});

export default router;
