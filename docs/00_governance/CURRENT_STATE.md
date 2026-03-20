# CURRENT_STATE

Last updated: 2026-03-19 20:05 -04:00
Timezone: America/Santiago (Windows: Pacific SA Standard Time)
Audit basis: repo audit on branch `docs/state-audit-sync`, commit `920ae86c13dd508aa7071879f889f5f92dbca9ae`
Detailed audit: `docs/03_delivery/APP_STATE_AUDIT_CURRENT.md`

---

## 1. Current classification

[confirmed by code]
PETTODO is now a hybrid but materially real web app:

- real Firebase sign-in path exists for integration mode
- real Express API and PostgreSQL-backed persistence exist for core entities
- real trust-sensitive backend surfaces exist for moderation, protected contact, Community Dogs, evidence, change requests, abuse flags, and matching
- real visible product continuity exists for lost-case creation, public pet page, relay chat, moderation, matching, and share/flyer generation

[confirmed by code + local verification]
PETTODO is not yet an honest beta-ready release. `npm test` passed with 14 files / 122 tests and `npm run build` passed locally, but verification is still backend-heavy and mocked. Core visible flows still have partial areas.

---

## 2. What is real today

[confirmed by code]
Core real surfaces currently present in the repo:

- Auth baseline: Firebase popup sign-in, token propagation to `/api`, guarded app routes, moderator-only route guard
- Pets baseline: authenticated pet CRUD, import from local store, pet image upload/list/delete
- Cases baseline: authenticated case create/list/get for lost, found, and sighted reports
- Public QR/profile baseline: `/api/public/pet/:petId` plus `QRP_01` landing fed from real data and public-safe serialization
- Protected contact baseline: thread creation, thread read, relay messages, reveal-request endpoint, reveal-decision endpoint
- Community Dogs baseline: controlled create, public approved list/detail, creator-only internal view, public sightings/actions history, authenticated sighting/action writes
- Moderation baseline: `/admin/review` queue with real approve/reject actions for community dogs, change requests, and evidence items
- Matching v1 baseline: backend heuristic ranking plus frontend integration in `EMG_16` and `EMG_17`
- Share/flyer baseline: `EMG_07` and `FlyerShareKit` generate PNG/PDF/text/link outputs from real case/pet/image data
- Image storage baseline: Azure Blob SAS upload flow plus DB-backed pet/case image references
- Minimal CI baseline: `.github/workflows/ci.yml` runs build + test

---

## 3. What is only partial today

[confirmed by code]
Important partial or baseline-only areas:

- Lost flow is real, but only the final publish step persists the case; earlier steps do not yet persist photos/location/time as separate real records
- Found flow publishes a real case, but `EMG_10` currently sends only `{ type: 'found' }`; photos, privacy radius, and QR outcome are not persisted
- Sighted flow publishes a real case, but `EMG_12` uses a hardcoded location and does not persist photo/time data
- Public report continuity is usable, but `QRP_03` opens a protected-contact thread with a structured message; it does not create a real case or evidence item
- Protected-contact reveal endpoints exist in backend, but there is no owner-side frontend to request/grant/revoke reveal
- `QRP_02` human check and reveal rate limit are client-side only (`localStorage`), not backend-enforced
- Community Dog sightings/actions are real writes, but they are not yet evidence-backed and do not currently write audit logs
- Change requests, evidence items, and abuse flags exist in backend, but frontend coverage is still narrow; evidence UI is basically limited to `CMT_07`
- Case detail screens `EMG_18` to `EMG_20` remain mostly demo/static
- Many non-core modules remain local-first or demo-first

---

## 4. Main current blockers

[confirmed by code]
- visible evidence/review outcomes are not yet integrated into user-facing product flows
- found/sighted emergency flows are still incomplete as real data flows
- protected-contact owner controls are backend-only
- moderation-adjacent surfaces exist, but change-request and abuse UX are still thin

[confirmed by local verification]
- automated verification is still mostly mocked backend coverage; no real browser or real-infra E2E baseline
- production build still emits a large bundle warning (`dist/assets/index-B6a_BYos.js` about 1.54 MB minified)

---

## 5. Current strategic read

[confirmed by audit]
The repo is past the old "post-moderation visible product" baseline in one important sense: real matching, real share/flyer, and real public landing/relay continuity are already present.

[confirmed by audit]
The next best step is no longer "make share/flyer real." The highest-value gap is to finish the visible evidence/review loop so that:

- reported actions become more trustworthy
- moderation outcomes affect visible product state
- public/emergency continuity stops depending on thin placeholders in found/sighted/report flows

See `docs/03_delivery/APP_STATE_AUDIT_CURRENT.md` and `docs/03_delivery/BACKLOG.md` for the updated recommendation.

---

## 6. MVP reality / current phase target

[confirmed by audit]
The current phase target remains a real pilot-usable web app, not a breadth expansion wave.

[confirmed by code]
For the current phase, PETTODO can already support meaningful slices of:

- sign-in and account-gated core flows
- pet management and pet image storage
- lost/found/sighted case creation in uneven but real form
- public pet page and protected relay entry
- moderation-aware Community Dog records
- real matching suggestions
- real share/flyer generation

[confirmed by audit]
What still separates the repo from an honest phase target close-out is not "missing concept." It is the remaining gap between backend trust primitives and visible product continuity.

---

## 7. Design / brand state

[confirmed by code]
The repo still presents PETTODO as one product with Daily + Emergency, public safety framing, and a serious trust-oriented tone.

[confirmed by audit]
The design/brand layer is directionally stable enough for the current phase:

- PETTODO remains the final product name
- Daily + Emergency remains part of the product logic
- public and emergency surfaces already carry trust/safety language consistently

[pending / not confirmed]
Final brand system decisions are still not locked:

- final logo system
- final palette and visual polish direction
- final intensity of emergency visual framing

---

## 8. Public-data direction

[confirmed by code]
Current repo behavior already aligns with a controlled public-data stance:

- public pet payload is minimal and owner-safe
- owner PII is not exposed on public pet routes
- contact is relay-first
- Community Dog public visibility is approval-gated

[confirmed by audit]
The current direction remains:

- owned-pet public data should stay minimal and controlled
- Community Dog public data can be broader, but only inside moderated/shared-record rules
- approximate area is acceptable; exact private coordination should stay in protected flows

---

## 9. AI direction

[confirmed by code]
The repo now treats matching as a real heuristic product layer, not just a concept, but still frames it with caution rather than certainty.

[confirmed by audit]
The current AI direction remains healthy for this phase:

- use AI/heuristics to rank, assist, and guide
- do not treat AI as final authority for trust-sensitive identity decisions
- keep caution framing visible in matching-related surfaces

[pending / not confirmed]
Advanced AI identity, moderation, or evidence pipelines are still not real production capabilities in this repo state.

---

## 10. Known structural risks

[confirmed by audit]
The most important structural risks right now are:

- visible product trust can lag behind backend trust if review outcomes stay invisible
- hybrid real/demo coexistence can still confuse users and future implementation waves
- found/sighted flows can overstate maturity unless their current limits stay explicit
- lack of UI/E2E and real-infra validation can hide regressions in the now-real surfaces
- bundle size and release hardening still need attention before broader pilot exposure
