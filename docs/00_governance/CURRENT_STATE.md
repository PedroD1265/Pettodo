# CURRENT_STATE

**Last updated:** 2026-03-16 00:45 UTC-4
Purpose:
Brutally clear snapshot of what PETTODO is today: what is implemented, what is simulated, what is decided, and what is still missing.

What belongs here:
- Current real implementation status
- Current confirmed strengths
- Current confirmed gaps
- Current strategic decisions already taken
- Known inconsistencies and risks

Update rule:
Update whenever the real implementation state changes, especially after meaningful product, infra, auth, AI, or deployment progress.

---

## 1. Current classification

**[confirmed]** PETTODO is an application with a **real Phase 1 infrastructure foundation (Auth, API, PostgreSQL)** and substantial frontend breadth, but it is not yet an honestly beta-ready production system due to critical operational blockers.

It expresses strong product structure and relies on a real backend. The core pet management integration (Create, Read, Update, Delete) is fully server-authoritative. Trust-sensitive Block 1 (schema + API) and Block 2 (Frontend wiring) are now implemented. Real wiring exists for Community Dogs (list/create/detail/evidence) and Protected Contact (relay chat). Beta readiness is still awaiting real image pipelines (production), AI matching, and full resolution of minor integration gaps.

---

## 2. What is real today

### Product/UI coverage
**[confirmed]**
- broad route coverage and modular structure
- approximately 100 screens
- approximately 10 major flows
- Daily / Emergency product logic
- QR flows
- Daily pet management screens
- Emergency lost / found / sighted flows
- Community Dogs module presence
- services / walkers / play dates / profile / notifications modules

### Frontend behavior already present
**[confirmed]**
- many working interactions across the app
- “zero dead buttons” quality rule was adopted
- local persistence behavior exists
- QR generation exists
- Leaflet / OSM maps exist
- deterministic or heuristic matching exists
- flyer/share UI exists
- scripting or demo chat exists
- privacy and safety language already exists in the UI

### Real infrastructure already present
**[confirmed]**
- Replit web app as current runtime
- Firebase Auth integration
- Azure PostgreSQL persistence
- Express API backend (running with correct proxy and schema integrations)
- Import flow from demo to DB
- Full Pet CRUD (Create, Read, Update, Delete) end-to-end to Azure PostgreSQL in integration mode
- Case creation real (POST /cases) for lost/found/sighted flows, owner-scoped
- Public route (QR) data isolation without owner PII; returns relay-first contact entry point
- Owner scoping for protected routes
- Trust-Sensitive Block 1 backend: 12 new tables, 17 new API routes, role middleware, audit utility (see Block 1 section in §3)
- Minimal automated backend test baseline (Vitest + Supertest, mocked infra)
- Minimal GitHub Actions CI (build + test)
- Real image upload/storage baseline for pet and case flows (Azure Blob + PostgreSQL references)
- Trust-Sensitive Block 2 frontend: Real wiring for Community Dogs (CMT_01, 02, 07) and Protected Contact (QRP_01, 02, 04)

### Product thinking already present
**[confirmed]**
- PETTODO already contains a strong emergency concept
- Community Dogs already exist as a meaningful product concept
- QR identity already exists as a meaningful concept
- map-based visibility is already part of the product logic
- trust-sensitive language is already present

---

## 3. What is still simulated or not real

**[confirmed]**
The following are not yet real production capabilities:

- real image upload/storage pipeline in production
- real AI identity / matching pipeline
- production-grade PDF / PNG flyer generation
- full UI/regression automated tests (only minimal backend baseline exists)
- CD deployment pipeline (only minimal CI exists)
- stable production routing / deploy fallback behavior

### What is now real at the backend level (Block 1, 2026-03-16)
**[confirmed]**
- `user_roles` table: role assignments (user | moderator | operator), enforced via requireRole middleware
- `community_dogs` + `community_dog_sightings` + `community_dog_actions` tables: controlled creation starts as pending_review; only approved dogs are visible on public GET
- `protected_contact_threads` + `protected_contact_messages` + `protected_contact_events` tables: relay-first contact; reveal decision is owner-only
- `change_requests` + `evidence_items` + `review_decisions` tables: pending_review by default; structured evidence without file upload
- `abuse_flags` + `audit_logs` tables: audit trail for all sensitive actions
- API routes: 17 new authenticated endpoints covering all the above domains
- `requireRole` middleware: checks user_roles table at request time; operator satisfies any lower-tier requirement
- `writeAuditLog` utility: non-throwing, covers contact_initiated, message_sent, reveal_requested/granted/revoked, community_dog_submitted, sensitive_change_requested, evidence_submitted, review_approved/rejected, abuse_flag_created
- Public pet route updated: returns `protectedContactEnabled: true` + `contactEntryPoint`; never exposes phone/email/owner_uid/exact coords
- Frontend API clients: communityDogApi, protectedContactApi, changeRequestApi, evidenceApi, reviewApi, abuseFlagApi added to api.ts

### Current known demo/local limitations & blockers
**[confirmed]**
- QRP_03 (Report sight/found from QR) still uses demo addSighting — not yet connected to real case/evidence API
- QRP_04 (Relay Chat) lacks thread management — creates new thread on every mount (duplication risk)
- CMT_03 (Dog Detail) history (sightings/actions) not fetched from API on mount
- app data fallback depends heavily on localStorage if integration mode fails
- OTP has been simulated
- matching has been heuristic, not a real advanced identity system
- no formal schema migration system yet (uses runMigrations with IF NOT EXISTS)

---

## 4. What is strong right now

**[confirmed]**
PETTODO already has unusual strength for a project at this stage in these areas:

- product breadth
- product narrative
- route coverage
- UX framing
- emergency flow thinking
- trust/safety framing
- Community Dogs concept
- QR identity concept
- map-based search concept
- documentation history
- visual prototype quality

This means PETTODO is not starting from zero.
The main gap is not “idea.”
The main gap is turning demo/frontend depth into a real usable system.

---

## 5. What is officially decided now

**[confirmed]**
- Replit is the main product build track
- Lovable is mainly for the landing page / public site
- GitHub and `pettodo-docs` are part of the documentation and execution system
- AI Studio is no longer the center of execution
- the next major milestone is a real usable web app
- the next testing target is real pilot-style web testing, not just demo recording
- Cochabamba is the pilot city
- Android/iOS are later stages after web validation

### Product-direction decisions now confirmed
**[confirmed]**
- PETTODO is not only a lost-pet app
- PETTODO’s primary loop is management + identity + preparedness
- Community Dogs are part of the MVP, but in a controlled form
- not every dog seen in the street is automatically a Community Dog
- PETTODO separates:
  - animal profile
  - case
  - match result
- protected contact is the default for owned pets
- public location must remain approximate
- public exposure should remain minimal and controlled
- AI is part of the product direction, but not all trust-sensitive actions can be delegated fully to it

---

## 6. MVP reality for the current phase

### Core release target now
**[confirmed]**
The current release target is a real web app where users can:
- register pets
- build digital identity for animals
- use QR/public profile flows
- create lost / found / sighted cases
- upload images
- receive match suggestions
- use protected contact flows
- share flyer/link outputs
- create controlled Community Dog records
- contribute evidence-backed actions in controlled ways
- use the system on the web for real pilot testing

### Account and access stance
**[confirmed]**
The system is not fully public for all actions.

Expected direction:
- public browsing and low-risk access may exist without account
- creation, editing, contribution, and sensitive flows require account
- some higher-risk flows may require additional verification

### Not yet the first release priority
**[confirmed]**
- fully mature walkers marketplace
- fully mature events/community trust system
- fully mature play dates system
- full reputation economy maturity
- sponsor reward ecosystems
- full mobile-native launch
- full long-term ecosystem completeness

---

## 7. Current design / brand state

**[confirmed]**
- PETTODO remains the final product name
- Daily / Emergency remains a real product capability
- the Daily / Emergency switch should become less visually dominant than in the current prototype
- the product should not feel like two separate brands
- the brand should feel serious, human, community-oriented, and useful

**[probable]**
- the current red-emergency framing may be softened or shifted toward a more action-oriented tone later

**[unknown]**
- final logo
- final brand palette
- final landing visual direction

---

## 8. Current public-data direction

**[confirmed]**
There is already a meaningful product distinction between:
- owned pets
- Community Dogs
- Stray Dogs
- Unknown Animals
- no exact match / probable match situations

### Owned pet direction
**[confirmed]**
Public scan / public lookup should reveal only useful, controlled information:
- animal identity basics
- public-facing animal status
- safe contact path
- approximate location only
- no unnecessary owner-data exposure

### Community Dog direction
**[confirmed]**
Community Dog records are intended to be public but controlled.
They may show broader public-operational information than owned pets, such as:
- approximate area
- sightings
- evidence-backed actions
- care-related public context
- visible status

### Data-control direction
**[confirmed]**
Owned-pet owners should retain strong control over their own published data.
Shared/public animal records should be more controlled and not directly editable without checks.

### Still pending formalization
**[confirmed]**
These rules still need to be formalized in:
- `PUBLIC_DATA_POLICY.md`
- `TRUST_AND_SAFETY.md`

---

## 9. Current AI direction

**[confirmed]**
The product direction expects AI to be used across multiple parts of PETTODO, including:
- image analysis
- quality checks
- similarity / match workflows
- evidence review
- moderation assistance

**[confirmed]**
AI should not be presented as the universal final authority across all trust-sensitive actions.

**[probable]**
The product may rely more heavily on AI in bounded operational tasks such as match ranking and photo quality classification than in socially sensitive record changes.

---

## 10. Known structural risks

**[confirmed]**
- frontend complexity is ahead of infrastructure maturity
- documentation and product scope can drift if not curated
- old demo assumptions can conflict with the real-product direction
- multi-cloud ambition can create fragmentation if not disciplined
- the app still needs a clear “real beta” cut line
- Community Dogs can create moderation and trust complexity if not constrained
- public data and evidence workflows are not yet formally codified
- the product can still be misunderstood as “just a lost-pet app” if not framed correctly

---

## 11. What this file is not

This is not:
- the full product vision
- the full backlog
- the full architecture spec
- the historical execution log

This file exists only to tell the truth about where PETTODO stands today.

---

## 12. Certainty reminders

Use:
- **[confirmed]** when directly backed by repo evidence or explicit current decisions
- **[probable]** when strongly inferred but not fully fixed
- **[unknown]** when still undecided

Avoid mixing these levels.
