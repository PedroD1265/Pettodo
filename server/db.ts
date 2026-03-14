import pg from 'pg';

const { Pool } = pg;

function buildConnectionConfig(): pg.PoolConfig {
  if (process.env.PGHOST && process.env.PGUSER && process.env.PGDATABASE) {
    console.log('[db] Using PG* environment variables (Replit-managed PostgreSQL)');
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

  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error('[db] FATAL: No database configuration found. Set DATABASE_URL or PG* env vars.');
    process.exit(1);
  }

  console.log('[db] Using DATABASE_URL');
  return {
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  };
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
