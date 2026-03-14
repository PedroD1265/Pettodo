import { Router, type Response } from 'express';
import { verifyToken, type AuthenticatedRequest } from '../middleware/verifyToken.js';
import { query } from '../db.js';

const router = Router();

function petRowToJson(row: any) {
  return {
    id: row.id,
    name: row.name,
    breed: row.breed,
    size: row.size,
    colors: row.colors ?? [],
    marks: row.marks ?? '',
    collar: row.collar ?? '',
    temperament: row.temperament ?? '',
    age: row.age ?? '',
    weight: row.weight ?? '',
    microchip: row.microchip ?? '',
    vaccines: row.vaccines ?? '',
    lastVaccine: row.last_vaccine ?? '',
    nextVaccine: row.next_vaccine ?? '',
    createdAt: Number(row.created_at),
  };
}

router.get('/pets', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const result = await query(
      'SELECT * FROM pets WHERE owner_uid = $1 ORDER BY created_at DESC',
      [uid]
    );
    res.json(result.rows.map(petRowToJson));
  } catch (err: any) {
    console.error('[pets] list error:', err.message);
    res.status(500).json({ error: 'db_error' });
  }
});

router.get('/pets/:id', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const result = await query(
      'SELECT * FROM pets WHERE id = $1 AND owner_uid = $2',
      [req.params.id, uid]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'not_found' });
      return;
    }
    res.json(petRowToJson(result.rows[0]));
  } catch (err: any) {
    console.error('[pets] get error:', err.message);
    res.status(500).json({ error: 'db_error' });
  }
});

router.post('/pets', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const { id, name, breed, size, colors, marks, collar, temperament, age, weight, microchip, vaccines, lastVaccine, nextVaccine, createdAt } = req.body;

    if (!name || typeof name !== 'string') {
      res.status(400).json({ error: 'validation', message: 'name is required' });
      return;
    }

    const petId = id || `pet-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const now = createdAt || Date.now();

    await query(
      `INSERT INTO pets (id, owner_uid, name, breed, size, colors, marks, collar, temperament, age, weight, microchip, vaccines, last_vaccine, next_vaccine, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
      [petId, uid, name, breed ?? '', size ?? 'Medium', colors ?? [], marks ?? '', collar ?? '', temperament ?? '', age ?? '', weight ?? '', microchip ?? '', vaccines ?? '', lastVaccine ?? '', nextVaccine ?? '', now]
    );

    const result = await query('SELECT * FROM pets WHERE id = $1', [petId]);
    res.status(201).json(petRowToJson(result.rows[0]));
  } catch (err: any) {
    console.error('[pets] create error:', err.message);
    res.status(500).json({ error: 'db_error' });
  }
});

router.put('/pets/:id', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const petId = req.params.id;

    const existing = await query('SELECT id FROM pets WHERE id = $1 AND owner_uid = $2', [petId, uid]);
    if (existing.rows.length === 0) {
      res.status(404).json({ error: 'not_found' });
      return;
    }

    const { name, breed, size, colors, marks, collar, temperament, age, weight, microchip, vaccines, lastVaccine, nextVaccine } = req.body;

    await query(
      `UPDATE pets SET
        name = COALESCE($1, name),
        breed = COALESCE($2, breed),
        size = COALESCE($3, size),
        colors = COALESCE($4, colors),
        marks = COALESCE($5, marks),
        collar = COALESCE($6, collar),
        temperament = COALESCE($7, temperament),
        age = COALESCE($8, age),
        weight = COALESCE($9, weight),
        microchip = COALESCE($10, microchip),
        vaccines = COALESCE($11, vaccines),
        last_vaccine = COALESCE($12, last_vaccine),
        next_vaccine = COALESCE($13, next_vaccine)
       WHERE id = $14 AND owner_uid = $15`,
      [name, breed, size, colors, marks, collar, temperament, age, weight, microchip, vaccines, lastVaccine, nextVaccine, petId, uid]
    );

    const result = await query('SELECT * FROM pets WHERE id = $1', [petId]);
    res.json(petRowToJson(result.rows[0]));
  } catch (err: any) {
    console.error('[pets] update error:', err.message);
    res.status(500).json({ error: 'db_error' });
  }
});

router.delete('/pets/:id', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const result = await query(
      'DELETE FROM pets WHERE id = $1 AND owner_uid = $2 RETURNING id',
      [req.params.id, uid]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'not_found' });
      return;
    }
    res.json({ deleted: true });
  } catch (err: any) {
    console.error('[pets] delete error:', err.message);
    res.status(500).json({ error: 'db_error' });
  }
});

export default router;
