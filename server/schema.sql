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
