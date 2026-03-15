CREATE TABLE IF NOT EXISTS pets (
  id TEXT PRIMARY KEY,
  owner_uid TEXT NOT NULL,
  name TEXT NOT NULL,
  breed TEXT NOT NULL DEFAULT '',
  size TEXT NOT NULL DEFAULT 'Medium',
  colors TEXT[] DEFAULT '{}',
  marks TEXT DEFAULT '',
  collar TEXT DEFAULT '',
  temperament TEXT DEFAULT '',
  age TEXT DEFAULT '',
  weight TEXT DEFAULT '',
  microchip TEXT DEFAULT '',
  vaccines TEXT DEFAULT '',
  last_vaccine TEXT DEFAULT '',
  next_vaccine TEXT DEFAULT '',
  created_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_pets_owner ON pets (owner_uid);

CREATE TABLE IF NOT EXISTS imports (
  id TEXT PRIMARY KEY,
  owner_uid TEXT NOT NULL UNIQUE,
  pet_count INTEGER NOT NULL DEFAULT 0,
  imported_at BIGINT NOT NULL
);

-- Migrations: Ensure newer columns exist independently of table creation
ALTER TABLE pets ADD COLUMN IF NOT EXISTS weight TEXT DEFAULT '';
ALTER TABLE pets ADD COLUMN IF NOT EXISTS microchip TEXT DEFAULT '';
ALTER TABLE pets ADD COLUMN IF NOT EXISTS vaccines TEXT DEFAULT '';
ALTER TABLE pets ADD COLUMN IF NOT EXISTS last_vaccine TEXT DEFAULT '';
ALTER TABLE pets ADD COLUMN IF NOT EXISTS next_vaccine TEXT DEFAULT '';

CREATE TABLE IF NOT EXISTS cases (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_by TEXT NOT NULL,
  pet_id TEXT,
  location TEXT NOT NULL DEFAULT '',
  approx_lat DOUBLE PRECISION,
  approx_lng DOUBLE PRECISION,
  time_label TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  size TEXT NOT NULL DEFAULT '',
  colors TEXT[] DEFAULT '{}',
  traits TEXT[] DEFAULT '{}',
  direction TEXT NOT NULL DEFAULT '',
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_cases_creator ON cases (created_by);
CREATE INDEX IF NOT EXISTS idx_cases_type_status ON cases (type, status);
