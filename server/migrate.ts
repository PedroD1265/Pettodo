import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query } from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function runMigrations(): Promise<void> {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf-8');
  try {
    await query(sql);
    console.log('[migrate] Schema applied successfully');
  } catch (err: any) {
    console.error('[migrate] FATAL: Failed to apply schema:', err.message);
    process.exit(1);
  }
}
