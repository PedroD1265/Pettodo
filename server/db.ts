import pg from 'pg';

const { Pool } = pg;

function buildConnectionConfig(): pg.PoolConfig {
  // DATABASE_URL takes priority — points to the real system-of-record (e.g. Azure PostgreSQL).
  // PG* vars are Replit-injected for its local managed PostgreSQL and are used only as fallback.
  const DATABASE_URL = process.env.DATABASE_URL;
  if (DATABASE_URL) {
    // Log the host portion only (no credentials) for verification.
    let hostHint = '(unknown host)';
    try {
      hostHint = new URL(DATABASE_URL).hostname;
    } catch {}
    console.log(`[db] Using DATABASE_URL → host: ${hostHint}`);
    return {
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    };
  }

  if (process.env.PGHOST && process.env.PGUSER && process.env.PGDATABASE) {
    console.log(`[db] DATABASE_URL not set — falling back to PG* vars (host: ${process.env.PGHOST}, db: ${process.env.PGDATABASE})`);
    return {
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT || '5432', 10),
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD || '',
      database: process.env.PGDATABASE,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    };
  }

  console.error('[db] FATAL: No database configuration found. Set DATABASE_URL or PG* env vars.');
  process.exit(1);
}

export const pool = new Pool(buildConnectionConfig());

pool.on('error', (err) => {
  console.error('[db] Unexpected pool error:', err.message);
});

export async function testConnection(): Promise<void> {
  try {
    const res = await pool.query('SELECT NOW() AS now');
    console.log('[db] Connected to PostgreSQL at', res.rows[0].now);
  } catch (err: any) {
    console.error('[db] FATAL: Cannot connect to PostgreSQL:', err.message);
    process.exit(1);
  }
}

export async function query(text: string, params?: any[]) {
  return pool.query(text, params);
}
