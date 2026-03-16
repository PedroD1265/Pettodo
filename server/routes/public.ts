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
import { query } from '../db.js';

const router = Router();

// ─── GET /public/pet/:petId ──────────────────────────────────────────────────
// Public QR-linked pet profile.
// Returns public-safe fields only. Owner PII (phone, email, address) is never included.
// Contact must go through the protected contact relay — not direct owner exposure.
router.get('/public/pet/:petId', async (req: Request, res: Response) => {
  try {
    const { petId } = req.params;
    const result = await query('SELECT * FROM pets WHERE id = $1', [petId]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'not_found' });
      return;
    }

    const row = result.rows[0];

    // Public-safe output. owner_uid and any contact info is deliberately excluded.
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
      // Relay-first contact signal. Frontend should create a protected contact thread
      // rather than showing owner phone/email directly.
      protectedContactEnabled: true,
      contactEntryPoint: `/api/protected-contact/threads`,
    });
  } catch (err: any) {
    console.error('[public] pet read error:', err.message);
    res.status(500).json({ error: 'db_error' });
  }
});

export default router;
