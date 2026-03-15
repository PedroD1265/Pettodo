import { config } from 'dotenv';
config({ path: '.env.local' });

import app from './app.js';
import { testConnection } from './db.js';
import { runMigrations } from './migrate.js';

const PORT = parseInt(process.env.API_PORT || '3001', 10);

console.log('[api] Allowed origins: configured in app.ts');

async function start() {
  await testConnection();
  await runMigrations();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[api] PETTODO API server running on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('[api] Failed to start:', err.message);
  process.exit(1);
});
