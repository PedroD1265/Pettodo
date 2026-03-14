import { Router, type Request, type Response } from 'express';
import { query } from '../db.js';

const router = Router();

router.get('/public/pet/:petId', async (req: Request, res: Response) => {
  try {
    const { petId } = req.params;
    const result = await query('SELECT * FROM pets WHERE id = $1', [petId]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'not_found' });
      return;
    }

    const row = result.rows[0];
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
    });
  } catch (err: any) {
    console.error('[public] pet read error:', err.message);
    res.status(500).json({ error: 'db_error' });
  }
});

export default router;
