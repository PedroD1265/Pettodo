# QA_CURRENT

Last updated: 2026-03-19 20:05 -04:00
Timezone: America/Santiago (Windows: Pacific SA Standard Time)
Audit basis: repo audit on branch `docs/state-audit-sync`, commit `920ae86c13dd508aa7071879f889f5f92dbca9ae`
Detailed audit: `docs/03_delivery/APP_STATE_AUDIT_CURRENT.md`

---

## 1. Current QA snapshot

[confirmed by local verification]
Latest local verification run during this audit:

- `npm test` -> PASS
- result: 14 files passed / 122 tests passed
- `npm run build` -> PASS
- persistent warning: Vite chunk-size warning for the main JS bundle

[confirmed by tests/build]
The current automated baseline is meaningful but limited:

- backend route coverage exists for health, auth, pets, cases, public pet, import, images, matching, protected contact, Community Dogs, reviews, abuse, change requests, and evidence
- tests mock Firebase Admin and PostgreSQL
- there is still no real browser E2E suite and no real-infra validation suite
- current confidence is still backend-heavy rather than true full-stack release confidence

---

## 2. What is validated enough to treat as real baseline

[confirmed by code + tests/build]
- Auth/API guard baseline exists and is exercised by tests
- Pet CRUD and case create/list/get backend routes are real
- Public pet route is public-safe and tested for owner-data redaction
- Matching backend ranking is real and tested
- Protected-contact backend thread/message/reveal endpoints are real and tested
- Community Dogs create/list/detail/sighting/action backend routes are real and tested
- Moderation queue backend approve/reject flows are real and tested
- Abuse, change-request, and evidence backend routes are real and tested
- Frontend route guards for auth and moderation are real in code
- Frontend share/flyer generation from real records builds successfully

---

## 3. What is only partially validated

[confirmed by code]
- Lost flow has real case creation, but full multi-step persistence is not end-to-end
- Found flow creates a real case, but the UI does not yet send the real payload gathered in prior steps
- Sighted flow creates a real case, but uses hardcoded location and placeholder photo behavior
- Public QR/report/relay continuity is real enough to use, but report submission opens a relay thread instead of creating a case/evidence record
- Protected contact reveal logic exists in backend, but owner-side reveal UX is not implemented
- Community Dog sightings/actions are real writes, but not evidence-backed and not audit-logged
- Change-request and abuse APIs have little or no corresponding visible product flow
- Case detail surfaces `EMG_18` to `EMG_20` remain mostly demo/static

[confirmed by code + local verification]
- Share/flyer output is real in code and included in the passing build, but there is no automated browser validation for PNG/PDF output

---

## 4. Persistent warnings and non-blocking caveats

[confirmed by local verification]
- Vite build still warns about the large main application chunk

[confirmed by audit]
- this warning is important, but it is not the main reason PETTODO is not release-ready
- the larger release-truth issue is still the gap in visible full-stack continuity and the lack of browser/E2E coverage
- current green build/test results should be read as "good regression signal for backend-heavy work," not as proof of release maturity

---

## 5. What is not yet validated as release-ready

[confirmed by audit]
- no browser E2E suite
- no real Firebase/PostgreSQL integration suite in CI
- no multi-user concurrency validation for moderation or protected contact
- no backend-enforced public captcha/rate-limit control for the QR relay entry flow
- no evidence that approved evidence/change requests change visible product state
- no confirmed stable release bundle/performance target

---

## 6. Current QA verdict

[confirmed by code + tests/build]
PETTODO currently qualifies as:

- a real backend-backed MVP foundation for core trust-sensitive routes
- a frontend with several real pilot-style surfaces
- a backend-heavy regression baseline with green local build/test signals

[confirmed by audit]
PETTODO does not yet qualify as:

- fully validated end-to-end beta QA
- fully real emergency continuity across lost/found/sighted/public-report flows
- a trust-sensitive web app with materially improved production readiness for the current phase

[confirmed by audit]
The main QA honesty rule still holds:

- green backend tests do not mean the visible product is fully validated
- green build does not mean the app is ready for release
- several visible surfaces are real, but still partial

---

## 7. Highest-value QA priorities now

[confirmed by audit]
Priority 1:
- validate the next visible evidence/review integration block with route-level tests and browser-path smoke coverage

Priority 2:
- add browser-path coverage for public QR -> report/relay -> thread continuity, matching -> compare -> share, and moderation queue decisions

Priority 3:
- add at least one real-infra verification path for Firebase token + API + database + storage in a controlled non-CI environment

Priority 4:
- address bundle-size and route-splitting warnings before broader pilot exposure
