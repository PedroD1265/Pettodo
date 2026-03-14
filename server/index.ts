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

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5000'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
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
