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

-- ─────────────────────────────────────────────────────────────────────────────
-- Block 1: Trust-Sensitive Core
-- ─────────────────────────────────────────────────────────────────────────────

-- Role assignments. roles: user | moderator | operator
CREATE TABLE IF NOT EXISTS user_roles (
  id TEXT PRIMARY KEY,
  user_uid TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'moderator', 'operator')),
  granted_by TEXT,
  granted_at BIGINT NOT NULL,
  UNIQUE (user_uid, role)
);

CREATE INDEX IF NOT EXISTS idx_user_roles_uid ON user_roles (user_uid);

-- Community Dog canonical records.
-- review_state: pending_review | approved | rejected
-- Community Dogs are NOT published until review_state = 'approved'.
CREATE TABLE IF NOT EXISTS community_dogs (
  id TEXT PRIMARY KEY,
  nickname TEXT NOT NULL DEFAULT '',
  breed TEXT NOT NULL DEFAULT '',
  size TEXT NOT NULL DEFAULT '',
  colors TEXT[] DEFAULT '{}',
  marks TEXT DEFAULT '',
  approximate_area TEXT DEFAULT '',
  approx_lat DOUBLE PRECISION,
  approx_lng DOUBLE PRECISION,
  health_notes TEXT DEFAULT '',
  is_sterilized BOOLEAN NOT NULL DEFAULT FALSE,
  is_vaccinated BOOLEAN NOT NULL DEFAULT FALSE,
  review_state TEXT NOT NULL DEFAULT 'pending_review'
    CHECK (review_state IN ('pending_review', 'approved', 'rejected')),
  created_by TEXT NOT NULL,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_community_dogs_review ON community_dogs (review_state);
CREATE INDEX IF NOT EXISTS idx_community_dogs_creator ON community_dogs (created_by);

-- Community Dog sightings.
CREATE TABLE IF NOT EXISTS community_dog_sightings (
  id TEXT PRIMARY KEY,
  community_dog_id TEXT NOT NULL REFERENCES community_dogs(id) ON DELETE CASCADE,
  reported_by TEXT NOT NULL,
  location_label TEXT DEFAULT '',
  approx_lat DOUBLE PRECISION,
  approx_lng DOUBLE PRECISION,
  condition_notes TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_cds_dog ON community_dog_sightings (community_dog_id);

-- Community Dog care actions (feeding, medical, rescue, other).
CREATE TABLE IF NOT EXISTS community_dog_actions (
  id TEXT PRIMARY KEY,
  community_dog_id TEXT NOT NULL REFERENCES community_dogs(id) ON DELETE CASCADE,
  reported_by TEXT NOT NULL,
  action_type TEXT NOT NULL CHECK (action_type IN ('feeding', 'medical', 'rescue', 'other')),
  notes TEXT DEFAULT '',
  created_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_cda_dog ON community_dog_actions (community_dog_id);

-- Protected contact threads.
-- thread_status: open | closed | blocked
-- reveal_state: not_revealed | revealed | revoked
CREATE TABLE IF NOT EXISTS protected_contact_threads (
  id TEXT PRIMARY KEY,
  pet_id TEXT,
  case_id TEXT,
  initiator_uid TEXT NOT NULL,
  owner_uid TEXT,
  thread_status TEXT NOT NULL DEFAULT 'open'
    CHECK (thread_status IN ('open', 'closed', 'blocked')),
  reveal_state TEXT NOT NULL DEFAULT 'not_revealed'
    CHECK (reveal_state IN ('not_revealed', 'revealed', 'revoked')),
  initiator_phone TEXT NOT NULL DEFAULT '',
  initiator_message TEXT NOT NULL DEFAULT '',
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_pct_initiator ON protected_contact_threads (initiator_uid);
CREATE INDEX IF NOT EXISTS idx_pct_owner ON protected_contact_threads (owner_uid);
CREATE INDEX IF NOT EXISTS idx_pct_pet ON protected_contact_threads (pet_id);

-- Messages inside a protected contact thread.
CREATE TABLE IF NOT EXISTS protected_contact_messages (
  id TEXT PRIMARY KEY,
  thread_id TEXT NOT NULL REFERENCES protected_contact_threads(id) ON DELETE CASCADE,
  sender_uid TEXT NOT NULL,
  message TEXT NOT NULL,
  is_system BOOLEAN NOT NULL DEFAULT FALSE,
  created_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_pcm_thread ON protected_contact_messages (thread_id);

-- Audit events scoped to a thread (separate from audit_logs for thread-level queries).
CREATE TABLE IF NOT EXISTS protected_contact_events (
  id TEXT PRIMARY KEY,
  thread_id TEXT NOT NULL REFERENCES protected_contact_threads(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  actor_uid TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_pce_thread ON protected_contact_events (thread_id);

-- Change requests for sensitive shared records.
CREATE TABLE IF NOT EXISTS change_requests (
  id TEXT PRIMARY KEY,
  target_entity_type TEXT NOT NULL,
  target_entity_id TEXT NOT NULL,
  requested_by TEXT NOT NULL,
  proposed_changes JSONB NOT NULL DEFAULT '{}',
  reason TEXT NOT NULL DEFAULT '',
  review_state TEXT NOT NULL DEFAULT 'pending_review'
    CHECK (review_state IN ('pending_review', 'approved', 'rejected')),
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_cr_entity ON change_requests (target_entity_type, target_entity_id);
CREATE INDEX IF NOT EXISTS idx_cr_review ON change_requests (review_state);

-- Structured evidence records (no file upload pipeline yet).
CREATE TABLE IF NOT EXISTS evidence_items (
  id TEXT PRIMARY KEY,
  target_entity_type TEXT NOT NULL,
  target_entity_id TEXT NOT NULL,
  submitted_by TEXT NOT NULL,
  evidence_type TEXT NOT NULL
    CHECK (evidence_type IN ('sighting', 'photo_description', 'veterinary_record', 'witness', 'other')),
  description TEXT NOT NULL DEFAULT '',
  metadata JSONB NOT NULL DEFAULT '{}',
  review_state TEXT NOT NULL DEFAULT 'pending_review'
    CHECK (review_state IN ('pending_review', 'approved', 'rejected')),
  created_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ei_entity ON evidence_items (target_entity_type, target_entity_id);
CREATE INDEX IF NOT EXISTS idx_ei_review ON evidence_items (review_state);

-- Review decisions made by moderators/operators.
CREATE TABLE IF NOT EXISTS review_decisions (
  id TEXT PRIMARY KEY,
  target_entity_type TEXT NOT NULL,
  target_entity_id TEXT NOT NULL,
  reviewer_uid TEXT NOT NULL,
  decision TEXT NOT NULL CHECK (decision IN ('approved', 'rejected')),
  notes TEXT NOT NULL DEFAULT '',
  created_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rd_entity ON review_decisions (target_entity_type, target_entity_id);

-- Abuse flags submitted by users.
CREATE TABLE IF NOT EXISTS abuse_flags (
  id TEXT PRIMARY KEY,
  target_entity_type TEXT NOT NULL,
  target_entity_id TEXT NOT NULL,
  reported_by TEXT NOT NULL,
  reason TEXT NOT NULL DEFAULT '',
  details TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'reviewed', 'dismissed', 'escalated')),
  created_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_af_entity ON abuse_flags (target_entity_type, target_entity_id);
CREATE INDEX IF NOT EXISTS idx_af_status ON abuse_flags (status);

-- Audit trail for sensitive actions across all domains.
CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  action_type TEXT NOT NULL,
  actor_uid TEXT NOT NULL,
  target_entity_type TEXT,
  target_entity_id TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_al_actor ON audit_logs (actor_uid);
CREATE INDEX IF NOT EXISTS idx_al_entity ON audit_logs (target_entity_type, target_entity_id);
CREATE INDEX IF NOT EXISTS idx_al_action ON audit_logs (action_type);

-- Image reference tables (blobs live in Azure; we only store paths + metadata)

CREATE TABLE IF NOT EXISTS pet_images (
  id TEXT PRIMARY KEY,
  pet_id TEXT NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  owner_uid TEXT NOT NULL,
  blob_path TEXT NOT NULL,
  mime_type TEXT NOT NULL DEFAULT 'image/jpeg',
  original_filename TEXT NOT NULL DEFAULT '',
  size_bytes INTEGER NOT NULL DEFAULT 0,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_pet_images_pet ON pet_images (pet_id);

CREATE TABLE IF NOT EXISTS case_images (
  id TEXT PRIMARY KEY,
  case_id TEXT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  owner_uid TEXT NOT NULL,
  blob_path TEXT NOT NULL,
  mime_type TEXT NOT NULL DEFAULT 'image/jpeg',
  original_filename TEXT NOT NULL DEFAULT '',
  size_bytes INTEGER NOT NULL DEFAULT 0,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_case_images_case ON case_images (case_id);