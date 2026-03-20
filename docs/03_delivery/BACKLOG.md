# BACKLOG

Last updated: 2026-03-19 20:05 -04:00
Timezone: America/Santiago (Windows: Pacific SA Standard Time)
Grounding: synced to `docs/03_delivery/APP_STATE_AUDIT_CURRENT.md`

Purpose:
Keep the active implementation backlog aligned with the repo as it exists now, while preserving older backlog context in archived backlog snapshots.

Update rule:
Update when a major block changes phase status, a new primary recommendation is chosen, or repo-grounded audit findings materially change priorities.

Interpretation note:
This file is the active execution backlog for the current phase. Historical backlog structure and older execution context are preserved in archived backlog snapshots.

Historical archive note:
The pre-state-audit backlog was intentionally archived at `docs/03_delivery/archive/BACKLOG_PRE_STATE_AUDIT_2026-03-19.md`. This file remains the active backlog and should not be read as a full rollback to the older structure.

---

## 1. Status labels

- Done for current phase: materially real and no longer the main next-step target
- Partially real: implemented enough to exist, but still incomplete for the intended user-facing outcome
- Ready next: clear next block that can be taken into a focused agent wave
- Deferred: valid, but not a current driver

---

## 2. Done for current phase

These areas are materially real in the current repo:

- BL-001 Auth/session baseline
  Status: Done for current phase
  Notes: Firebase sign-in, token propagation, guarded routes, sign-out, moderation route guard

- BL-002 Persistence/system-of-record foundation
  Status: Done for current phase
  Notes: pets, cases, reviews, evidence/change-request records, Community Dogs, protected contact

- BL-003 Owned-pet profile baseline
  Status: Done for current phase
  Notes: pet CRUD plus real pet image upload/list/delete

- BL-004 Public QR/public pet baseline
  Status: Done for current phase
  Notes: real public pet route plus `QRP_01` landing and public-safe serialization

- BL-006 Image upload/storage baseline
  Status: Done for current phase
  Notes: Azure Blob SAS upload + DB-backed image references for pets and cases

- BL-010 Minimum moderation/review capability
  Status: Done for current phase
  Notes: `/admin/review`, moderation guard, approve/reject queue, backend review routes

- BL-011 Matching v1
  Status: Done for current phase
  Notes: backend heuristic ranking plus frontend integration in `EMG_16` and `EMG_17`

- BL-012 Share/flyer outputs from real data
  Status: Done for current phase
  Notes: `EMG_07` + `FlyerShareKit` generate PNG/PDF/text/link/QR from real case/pet/image data

- BL-014 Automated backend regression baseline
  Status: Done for current phase
  Notes: 14 test files / 122 tests currently pass locally; minimal GitHub Actions build+test workflow exists

---

## 3. Partially real

- BL-005 Emergency case baseline
  Status: Partially real
  Notes: case create/list/get are real; lost flow is strongest; found flow persists almost no payload; sighted flow uses hardcoded location and placeholder media/time behavior; case detail/update/resolve remain incomplete

- BL-008 Protected contact v1
  Status: Partially real
  Notes: thread creation, relay chat, reveal-request endpoint, and reveal-decision endpoint exist; owner-side reveal UX and stronger public entry controls do not

- BL-009 Controlled Community Dog contribution baseline
  Status: Partially real
  Notes: create/list/detail/sighting/action flows exist; sightings/actions are not evidence-backed and do not currently write audit logs

- BL-015 Evidence-backed actions baseline
  Status: Partially real
  Notes: evidence submission exists for disputes and backend moderation queue exists, but approved evidence/change requests do not yet drive visible product state and most action UIs still lack evidence attachment

---

## 4. Ready next

### BL-021 - Visible evidence/review outcome integration

Status: Ready next
Priority: P0
Recommendation: Primary next step

Goal:
Finish the visible post-moderation loop that is still missing between backend truth and user-facing product continuity.

Scope:
- make evidence-backed actions visible where they matter first
- connect approved review outcomes to visible Community Dog or case state
- replace thin placeholder continuity in key found/sighted/report paths with real persisted records where feasible
- add any missing audit logging required by that visible flow

Why now:
- moderation and evidence primitives already exist
- share/flyer and matching are already real enough to stop being the main next block
- this is the clearest gap between "backend trust foundation exists" and "product visibly behaves like a trust-aware system"

---

### BL-022 - Protected contact owner controls and public relay hardening

Status: Ready next
Priority: P0

Goal:
Finish the missing user-visible controls around protected contact.

Scope:
- owner-side reveal grant/revoke UI
- initiator-side reveal request UI if still needed
- move QR relay human-check/rate-limit logic off local-only enforcement
- tighten duplicate-thread behavior for non-pet entry paths if product keeps those paths

Why now:
- backend capability already exists
- current public continuity is usable but still thin and partly client-side

---

### BL-023 - UI/E2E and release hardening for real surfaces

Status: Ready next
Priority: P1

Goal:
Raise confidence around the now-real surfaces before broader pilot exposure.

Scope:
- browser-path smoke/E2E coverage for auth, moderation, matching, share/flyer, and public QR relay continuity
- one controlled real-infra verification path
- bundle splitting/performance work for the current Vite warning

Why now:
- the repo already has enough real surfaces to justify end-to-end validation
- build currently passes but still warns on large chunk size

---

## 5. Deferred

Status: Deferred

These remain outside the current main cut line:

- fully mature walkers marketplace
- fully mature play dates system
- broader community/events ecosystem maturity
- advanced notification/observability work beyond what the next real block needs
- native mobile track
- Older backlog items not in the current execution cut remain preserved in archived backlog snapshots.

---

## 6. Current execution order

Recommended order after this audit:

1. BL-021 Visible evidence/review outcome integration
2. BL-022 Protected contact owner controls and public relay hardening
3. BL-023 UI/E2E and release hardening for real surfaces

Rule:
Do not reopen already-real share/flyer or matching baseline work unless a repo-grounded bug is found.
