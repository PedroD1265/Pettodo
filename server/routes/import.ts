import { Router, type Response } from 'express';
import { verifyToken, type AuthenticatedRequest } from '../middleware/verifyToken.js';
import { pool } from '../db.js';

const router = Router();

interface ImportPet {
  id?: string;
  name: string;
  breed?: string;
  size?: string;
  colors?: string[];
  marks?: string;
  collar?: string;
  temperament?: string;
  age?: string;
  weight?: string;
  microchip?: string;
  vaccines?: string;
  lastVaccine?: string;
  nextVaccine?: string;
  createdAt?: number;
}

router.post('/import/pets', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  const client = await pool.connect();
  try {
    const uid = req.user!.uid;

    await client.query('BEGIN');

    const existing = await client.query('SELECT id FROM imports WHERE owner_uid = $1', [uid]);
    if (existing.rows.length > 0) {
      await client.query('ROLLBACK');
      res.status(409).json({ error: 'already_imported' });
      return;
    }

    const { pets } = req.body as { pets?: ImportPet[] };
    if (!Array.isArray(pets) || pets.length === 0) {
      await client.query('ROLLBACK');
      res.status(400).json({ error: 'validation', message: 'pets array is required and must not be empty' });
      return;
    }

    if (pets.length > 100) {
      await client.query('ROLLBACK');
      res.status(400).json({ error: 'validation', message: 'Maximum 100 pets per import' });
      return;
    }

    let importedCount = 0;

    for (const pet of pets) {
      if (!pet.name || typeof pet.name !== 'string') continue;

      const petId = pet.id || `pet-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const now = pet.createdAt || Date.now();

      const dupCheck = await client.query('SELECT id FROM pets WHERE id = $1', [petId]);
      if (dupCheck.rows.length > 0) continue;

      await client.query(
        `INSERT INTO pets (id, owner_uid, name, breed, size, colors, marks, collar, temperament, age, weight, microchip, vaccines, last_vaccine, next_vaccine, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
        [petId, uid, pet.name, pet.breed ?? '', pet.size ?? 'Medium', pet.colors ?? [], pet.marks ?? '', pet.collar ?? '', pet.temperament ?? '', pet.age ?? '', pet.weight ?? '', pet.microchip ?? '', pet.vaccines ?? '', pet.lastVaccine ?? '', pet.nextVaccine ?? '', now]
      );
      importedCount++;
    }

    const importId = `imp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    await client.query(
      'INSERT INTO imports (id, owner_uid, pet_count, imported_at) VALUES ($1, $2, $3, $4)',
      [importId, uid, importedCount, Date.now()]
    );

    await client.query('COMMIT');
    res.json({ imported: importedCount, total: pets.length });
  } catch (err: any) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('[import] error:', err.message);
    res.status(500).json({ error: 'db_error' });
  } finally {
    client.release();
  }
});

router.get('/import/status', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const result = await pool.query('SELECT * FROM imports WHERE owner_uid = $1', [uid]);
    if (result.rows.length === 0) {
      res.json({ imported: false });
      return;
    }
    const row = result.rows[0];
    res.json({
      imported: true,
      petCount: row.pet_count,
      importedAt: Number(row.imported_at),
    });
  } catch (err: any) {
    console.error('[import] status error:', err.message);
    res.status(500).json({ error: 'db_error' });
  }
});

export default router;
