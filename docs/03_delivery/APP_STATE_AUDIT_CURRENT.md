# PETTODO App State Audit (Current)

Timestamp: 2026-03-19 18:41 -04:00
Timezone: America/Santiago (Windows: Pacific SA Standard Time)
Branch inspected: `docs/state-audit-sync`
Commit inspected: `920ae86c13dd508aa7071879f889f5f92dbca9ae`
Worktree status before doc edits: clean

---

## Executive summary

PETTODO is no longer just a broad prototype with trust-sensitive backend groundwork. The repo now contains a real hybrid web app with meaningful live surfaces across auth, pets, cases, public pet pages, protected relay chat, moderation, Community Dogs, matching, image storage, and share/flyer generation.

The repo is also not yet at an honest "first beta" cut. The biggest remaining gaps are not the old ones. The most important gap now is that evidence/review primitives exist in backend, but the visible product still does not close that loop cleanly in user-facing flows. Found/sighted/report continuity also remains partial.

---

## Evidence legend

- Confirmed by code: directly visible in current repo files
- Confirmed by tests/build: backed by `npm test`, `npm run build`, or specific test files
- Inferred: strong repo-based reading, but not directly executed end-to-end in this audit
- Pending / not confirmed: still missing, still thin, or not verified enough

---

## What was audited

Code areas inspected:

- `server/app.ts`
- `server/routes/*.ts`
- `server/middleware/*.ts`
- `src/app/routes.tsx`
- `src/app/context/*.tsx`
- `src/app/services/*.ts`
- `src/app/screens/admin/MOD_01.tsx`
- `src/app/screens/community-dogs/CMT_screens.tsx`
- `src/app/screens/emergency/EMG_05.tsx`
- `src/app/screens/emergency/EMG_07.tsx`
- `src/app/screens/emergency/EMG_08_to_13.tsx`
- `src/app/screens/emergency/EMG_14_to_20.tsx`
- `src/app/screens/emergency/EMG_SELECT_PET.tsx`
- `src/app/screens/emergency/EMG_CASES_LIST.tsx`
- `src/app/screens/qr-public/QRP_screens.tsx`
- `src/app/components/pettodo/FlyerShareKit.tsx`
- `src/app/components/pettodo/PetImageSection.tsx`
- `.github/workflows/ci.yml`
- `tests/*.test.ts`

Local verification executed:

- `npm test`
- `npm run build`

---

## State by surface

### 1. Backend trust-sensitive surfaces

Confirmed by code:

- `server/app.ts` mounts real routes for auth, pets, import, public, cases, images, protected contact, Community Dogs, change requests, evidence, reviews, abuse, and matching
- `verifyToken` enforces Firebase token auth for protected routes
- `requireRole` checks `user_roles` and allows operator to satisfy moderator requirements
- `protected-contact.ts` implements create/get/message/reveal-request/reveal-decision
- `community-dogs.ts` implements controlled creation, public approved-only reads, creator-only authenticated reads, and contribution endpoints
- `change-requests.ts`, `evidence.ts`, `reviews.ts`, and `abuse.ts` are real backend surfaces with validation and audit hooks
- `public.ts` is public-safe and redacts owner identity/contact information

Confirmed by tests/build:

- route-level backend coverage exists in `tests/protected-contact.test.ts`, `tests/community-dogs.test.ts`, `tests/reviews.test.ts`, `tests/abuse.test.ts`, `tests/change-requests.test.ts`, `tests/evidence.test.ts`, `tests/public.test.ts`, `tests/cases.test.ts`, and `tests/matching.test.ts`

Inferred:

- for the current phase, the trust-sensitive backend foundation is materially stronger than the visible product layer on top of it

Pending / not confirmed:

- `community-dogs.ts` still does not write audit logs for sighting/action writes even though the docs/comments imply a stronger audit posture
- protected-contact duplicate-thread idempotency exists only for `petId` thread creation, not a general case-based path
- `protected_contact_events` exists in schema but is not used by the current routes
- approved change requests/evidence items are reviewed, but the repo does not show a visible apply/integration flow after approval

Confidence: High

---

### 2. Moderation / operator workflow

Confirmed by code:

- `/admin/review` exists in `src/app/routes.tsx`
- `ModerationGuard` blocks access unless user auth + moderation access are present
- `MOD_01.tsx` loads the pending queue from `reviewApi.getPending()` and supports approve/reject with notes
- moderation access can come from token claims or from a probe against the review API

Confirmed by tests/build:

- `tests/reviews.test.ts` covers 401/403, pending queue retrieval, approve/reject paths, and review-state transition boundaries

Inferred:

- moderator/operator queue is usable enough for a baseline internal workflow

Pending / not confirmed:

- there is no broader operator UI beyond the queue itself
- change requests and abuse reporting do not have equally mature visible operator workflows outside the queue

Confidence: High

---

### 3. Matching

Confirmed by code:

- `server/routes/matching.ts` implements heuristic ranking using distance, recency, size, color overlap, and trait overlap
- `matchingRealAdapter` is active in integration mode
- `EMG_16` loads a real case and calls `matching.rankMatches(selectedCase.id)`
- `EMG_17` renders real candidate comparison data when entered with state or query case id

Confirmed by tests/build:

- `tests/matching.test.ts` covers candidate-type selection, scoring behavior, ranking order, filtering, safety against malformed input, and result limit

Inferred:

- matching is good enough for a cautious pilot baseline and is no longer just a stubbed concept

Pending / not confirmed:

- matching remains heuristic, not a production-grade identity pipeline
- `EMG_17` is still weaker when reached without the expected state payload
- `EMG_11` still shows copy that says AI matching is not yet available, which is now stale relative to repo reality

Confidence: High

---

### 4. Share / flyer

Confirmed by code:

- `EMG_07.tsx` loads a real case, related pet data, and case/pet images
- `FlyerShareKit.tsx` can download PNG and PDF, copy share text, copy link, and render QR from real case-derived data
- share links point to `/public/qr-landing/:petId` when the case has a pet

Confirmed by tests/build:

- no dedicated flyer tests exist, but the build passes with these surfaces included

Inferred:

- the repo has already crossed the baseline where share/flyer is "prototype only"

Pending / not confirmed:

- no browser automation validates flyer PNG/PDF rendering
- usefulness still depends on case completeness; found/sighted cases remain weaker than lost cases

Confidence: Medium-High

---

### 5. Public QR / report / relay continuity

Confirmed by code:

- `QRP_01` loads the real public pet payload from `publicApi.getPet`
- the public payload includes the active emergency case when present and avoids owner PII
- `QRP_03` creates a real protected-contact thread in integration mode and forwards the user into the relay flow
- `QRP_04` loads a real thread, polls messages, and sends real relay messages

Confirmed by tests/build:

- `tests/public.test.ts` validates public pet redaction
- `tests/protected-contact.test.ts` validates thread creation, retrieval, messaging, and reveal decision backend behavior

Inferred:

- public landing to relay continuity is genuinely usable today for the authenticated relay path

Pending / not confirmed:

- `QRP_02` human check and rate limit are client-side only (`localStorage`)
- `QRP_03` does not create a real case or evidence item; it creates a relay thread with a structured message
- no owner-side UI exists to request/grant/revoke reveal even though backend endpoints exist

Confidence: Medium-High

---

### 6. Auth / access relevant to these surfaces

Confirmed by code:

- `AuthContext` wires Firebase auth into API token usage
- `AuthGuard` redirects unauthenticated users to `/auth/sign-in` in integration mode
- `SignIn.tsx` uses Google popup auth via Firebase
- moderation access is explicitly checked before entering `/admin/review`

Confirmed by tests/build:

- auth-related backend coverage exists in `tests/auth.test.ts`
- review tests also exercise role gating

Inferred:

- account-required sensitive flows are materially more real than earlier docs suggested

Pending / not confirmed:

- there is no deeper verification layer beyond account auth and moderation roles
- some non-core surfaces still behave demo-first even under the authenticated shell

Confidence: High

---

### 7. App integration and continuity

Confirmed by code:

- app route map is broad and structured through `src/app/routes.tsx`
- integration mode switches real auth and real matching adapters on
- `AppContext` persists many non-core entities locally while using real API for pets/cases in integration mode
- `EMG_SELECT_PET` and `EMG_CASES_LIST` now use real API data

Confirmed by tests/build:

- backend routes for the core integration path pass local tests

Inferred:

- PETTODO is currently a mixed system: core trust-sensitive surfaces are real, while many adjacent modules remain demo/local-first

Pending / not confirmed:

- `EMG_18` to `EMG_20` case detail screens are still mostly static/demo
- found and sighted flows do not yet preserve the same data richness as the lost flow
- change requests and abuse flags are backend-ready but not app-integrated as first-class user flows

Confidence: High

---

## Build / tests status

Confirmed by tests/build:

- `npm test` passed locally
- result: 14 files / 122 tests passed
- coverage is route-heavy and mocked
- `npm run build` passed locally

Persistent warning:

- Vite warns that the main application chunk is larger than 500 kB after minification
- current reported main chunk: about 1.54 MB minified (`dist/assets/index-B6a_BYos.js`)

Confidence: High

---

## Residual risks / known debt

Confirmed by code:

- found flow persists almost no structured payload
- sighted flow uses a hardcoded location and placeholder photo handling
- public human-check / rate-limit control is client-side only
- protected-contact owner controls are backend-only
- Community Dog contribution writes are not audit-logged
- evidence/change-request review exists but visible product outcomes are still thin
- abuse/change-request UI is mostly absent

Confirmed by tests/build:

- no browser E2E coverage
- no real-infra regression suite in CI

Inferred:

- visible product trust can lag behind backend trust if the next wave does not connect review outcomes to what users actually see

Confidence: High

---

## Docs vs repo misalignments found during this audit

The docs before this sync were out of date in these ways:

- they still treated share/flyer real outputs as the next large block, but the repo already contains a real share/flyer baseline
- they did not clearly separate "backend evidence/review primitives exist" from "visible evidence-backed actions are still incomplete"
- they understated that case create/list/get, matching, and public landing/relay continuity are already materially real
- they did not explicitly call out the still-client-side QR human check/rate limit
- they did not clearly call out that found/sighted case flows remain much thinner than the lost flow

Confidence: High

---

## General current state of PETTODO

Confirmed by audit:

PETTODO is now best described as a hybrid real MVP foundation with several real visible surfaces, not just a frontend prototype plus backend intent. The repo already supports a meaningful trust-sensitive baseline:

- users can sign in
- manage pets and pet images
- create and list cases
- expose a public-safe pet page
- start protected relay threads
- submit Community Dog records and community contributions
- run moderation decisions
- receive ranked match suggestions
- generate real share/flyer outputs

Pending / not confirmed:

The repo still needs one more product-facing integration wave before "where are we?" becomes simple. Right now the truth is uneven: strong backend primitives, some real visible flows, and several remaining thin bridges between them.

Confidence: High

---

## 3 possible next steps

### Option 1 - Visible evidence/review outcome integration

Why it fits the repo:

- backend evidence, reviews, change requests, and Community Dog actions already exist
- the visible product still does not show a complete reviewed-action loop
- this is the clearest mismatch between current backend maturity and current product continuity

Likely scope:

- make reviewed evidence/actions materially visible in Community Dog and case surfaces
- ensure moderation outcomes affect visible product state
- close the most obvious placeholder continuity in found/sighted/report paths

### Option 2 - Protected contact owner controls and public relay hardening

Why it fits the repo:

- protected relay already works, but reveal remains backend-only
- QR relay entry still depends on client-side human check/rate limit logic

Likely scope:

- owner-side reveal request/grant/revoke UI
- stronger server-side relay-entry controls
- cleanup of non-pet duplicate-thread behavior if needed

### Option 3 - UI/E2E and release hardening for real surfaces

Why it fits the repo:

- enough real surfaces now exist to justify browser-path validation
- build is green, but the bundle warning is a real release-quality signal

Likely scope:

- browser smoke/E2E for auth, moderation, matching, share/flyer, and public QR relay
- one controlled real-infra verification path
- bundle splitting/perf hardening

---

## Recommendation

Primary recommendation: Option 1 - Visible evidence/review outcome integration

Why this is the best next step now:

- it is the most repo-grounded gap left after moderation, matching, and share/flyer moved into a real baseline
- it converts backend trust capability into visible product trust
- it improves honesty and usefulness at the same time
- it creates a better foundation for later QA/E2E hardening than jumping straight into release polish while key visible flows are still thin

---

## Confidence by section

| Section | Confidence |
|---|---|
| Backend trust-sensitive | High |
| Moderation/operator workflow | High |
| Matching | High |
| Share/flyer | Medium-High |
| Public QR/report/relay | Medium-High |
| Auth/access | High |
| Build/tests status | High |
| Strategic next-step recommendation | Medium-High |
