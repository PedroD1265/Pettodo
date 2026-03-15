import { config } from 'dotenv';
config({ path: '.env.local' });

import express from 'express';
import cors from 'cors';
import { testConnection } from './db.js';
import { runMigrations } from './migrate.js';
import authRoutes from './routes/auth.js';
import petRoutes from './routes/pets.js';
import importRoutes from './routes/import.js';
import publicRoutes from './routes/public.js';

const app = express();
const PORT = parseInt(process.env.API_PORT || '3001', 10);

// Build the allowed origins list:
// 1. Always allow localhost dev server
// 2. Add any explicit ALLOWED_ORIGINS from env (comma-separated)
// 3. Auto-allow the Replit preview domain when REPLIT_DEV_DOMAIN is set
const allowedOrigins: string[] = ['http://localhost:5000', 'http://localhost:3000'];
if (process.env.ALLOWED_ORIGINS) {
  allowedOrigins.push(...process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()).filter(Boolean));
}
if (process.env.REPLIT_DEV_DOMAIN) {
  allowedOrigins.push(`https://${process.env.REPLIT_DEV_DOMAIN}`);
}
console.log('[api] Allowed origins:', allowedOrigins);

app.use(cors({
  origin: (origin, callback) => {
    // No origin = server-to-server (e.g. Vite proxy, curl) — allow
    if (!origin) {
      callback(null, true);
      return;
    }
    // Allow any *.replit.dev subdomain in development
    if (origin.endsWith('.replit.dev') || origin.endsWith('.repl.co')) {
      callback(null, true);
      return;
    }
    // Check explicit allowlist
    if (allowedOrigins.some(o => origin === o || origin.startsWith(o))) {
      callback(null, true);
      return;
    }
    console.warn(`[api] CORS blocked origin: ${origin}`);
    callback(new Error('CORS not allowed'));
  },
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));

app.use('/api', authRoutes);
app.use('/api', petRoutes);
app.use('/api', importRoutes);
app.use('/api', publicRoutes);

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
