# RELEASE_CRITERIA

**Last updated:** 2026-03-15 13:45 UTC-4
Purpose:
Define the official release decision criteria for PETTODO’s first real web beta so the team can distinguish clearly between a strong prototype and a real pilot-usable product ready for controlled release.

What belongs here:
- release target definition
- go / no-go rule
- must-pass release conditions
- non-blocking items for first beta
- evidence expectations for release review
- release status labels
- blockers that prevent beta
- relationship between QA, PRD, trust/safety, and release decisions

Update rule:
Update when the MVP release target, trust/safety baseline, required production capabilities, or release decision standard changes materially.

---

## 1. Why this document exists

PETTODO already has a strong frontend prototype and broad product expression.

That is not the same as a real beta-ready product.

This document exists to prevent confusion between:
- “the prototype looks strong”
- “many screens already exist”
- “the product direction is clear”
- and “the product is actually ready for real pilot users”

`RELEASE_CRITERIA.md` defines the cut line for the first real web beta.

---

## 2. Scope

This document applies to the first real PETTODO web beta for pilot-style testing.

It is used to answer:
- Is PETTODO ready for a real beta release?
- What is still blocking release?
- Which missing items are critical?
- Which missing items are acceptable for later phases?

This document does not define:
- long-term product vision
- full roadmap
- future native app release rules
- full legal/compliance package
- final scale-up criteria for nationwide deployment

---

## 3. Certainty rule

Use PETTODO certainty tags consistently:

- **[confirmed]** = directly supported by current source-of-truth docs
- **[probable]** = strong operational interpretation but not yet fully locked
- **[unknown]** = still not fully defined

Do not mark a release condition as passed without evidence.

---

## 4. Source-of-truth relationship

This document should be interpreted together with:

- `PRD_MVP_WEBAPP.md`
- `CURRENT_STATE.md`
- `QA_CURRENT.md`
- `PUBLIC_DATA_POLICY.md`
- `TRUST_AND_SAFETY.md`

Interpretation rule:
- `PRD_MVP_WEBAPP.md` defines what the MVP must be.
- `CURRENT_STATE.md` defines what is still not real today.
- `QA_CURRENT.md` defines what has actually been validated so far.
- `PUBLIC_DATA_POLICY.md` and `TRUST_AND_SAFETY.md` define the minimum acceptable risk posture for release.

If these documents conflict, real implementation truth and explicit approved scope win.

---

## 5. Release target for this phase

### Official release target
**[confirmed]**

The current release target is:

**a real PETTODO web app usable for pilot-style testing in Cochabamba**

This release target is not:
- a concept-only demo
- a landing-only milestone
- a nationwide launch
- a native mobile release
- a fully mature ecosystem launch

### Release meaning
**[confirmed]**

For this phase, “release-ready” means:
- real users can use the web app for meaningful pilot activity
- core identity, case, QR, and trust-sensitive flows are real enough to test
- the system is not just local/demo logic in critical paths
- there is enough trust/safety to avoid obviously unsafe pilot use

---

## 6. Core go / no-go rule

### Beta go rule
**[confirmed]**

PETTODO is ready for first real beta only if all critical release conditions are materially true.

### Beta no-go rule
**[confirmed]**

If one or more critical release conditions remain unimplemented, simulated, contradictory, or unsafe, PETTODO is **not** ready for first real beta.

### Important principle
**[confirmed]**

A strong prototype is not enough.
A broad UI is not enough.
A working landing is not enough.

Critical product flows must be real.

---

## 7. Release status labels

Use these release statuses:

### 7.1 Not release-ready
Core blockers still exist in critical product, trust, or infrastructure areas.

### 7.2 Conditional / near-beta
A large part of the release target is already real, but one or more critical blockers still prevent honest beta release.

### 7.3 Beta-ready
All critical release criteria are satisfied well enough for controlled pilot launch.

### 7.4 Released to beta
The product has passed release review and is actively being used in a controlled beta context.

---

## 8. Critical release criteria

All sections below are **must-pass** unless explicitly marked otherwise.

---

## 8.1 Real account and access baseline

### Required
**[confirmed]**
- real sign-in exists
- account/session handling is real
- account-required sensitive workflows are enforced
- low-risk public access and account-required access are clearly separated

### Must not be true at release
**[confirmed]**
- core sensitive workflows still depend on fake login
- critical account logic is only simulated
- protected workflows are accessible as if all users were anonymous

### Release result
If these are not real, release is blocked.

---

## 8.2 Real persistence and system state baseline

### Required
**[confirmed]**
- persistence is real
- core product records are not only localStorage-based
- integration mode UI flows are strictly server-authoritative
- there are no silent persistence failures (UI must reflect actual DB outcome)
- there is no fake success before backend confirmation

### Must not be true at release
**[confirmed]**
- core records are still local-only
- the app cannot function as a real shared system

### Release result
If these are not real, release is blocked.

---

## 8.3 Real animal profile and digital identity baseline

### Required
**[confirmed]**
- users can create animal profiles
- owned-pet profile creation is real
- digital identity fields are meaningfully stored
- QR/public profile logic connects to real animal records
- public profile behavior follows current trust/public-data direction

### Must not be true at release
**[confirmed]**
- profile creation is only demo-local
- QR/profile flows are only visual placeholders
- public profile logic contradicts public-data or trust rules

### Release result
If these are not real, release is blocked.

---

## 8.4 Real QR and public profile baseline

### Required
**[confirmed]**
- QR generation is real enough for pilot use
- QR-linked public access is real
- public animal profile is real
- public profile shows current visible status and safe next actions
- if the animal is currently lost, the QR/public flow supports reporting a sighting

### Must not be true at release
**[confirmed]**
- QR is only decorative
- public QR routes are not backed by real data
- QR/public flow breaks trust/privacy rules

### Release result
If these are not real, release is blocked.

---

## 8.5 Real case creation baseline

### Required
**[confirmed]**
- users can create LOST cases
- users can create FOUND cases
- users can create SIGHTED cases
- case records persist
- case/public visibility follows approximate-location rules
- case logic is meaningfully connected to animal identity when appropriate

### Must not be true at release
**[confirmed]**
- case creation is still only a prototype simulation
- public case behavior exposes exact location carelessly
- case logic confuses animal identity, case type, and match result

### Release result
If these are not real, release is blocked.

---

## 8.6 Real image pipeline baseline

### Required
**[confirmed]**
- image upload is real
- image storage is real
- images are usable in profile/case/match contexts
- image flow is stable enough for real pilot users

### Must not be true at release
**[confirmed]**
- images are only simulated or fake-persisted
- core image flows break under normal use
- public/profile/matching image usage is not actually connected to real stored data

### Release result
If these are not real, release is blocked.

---

## 8.7 Real matching baseline

### Required
**[confirmed]**
- users can receive possible matches
- match output includes score + reasons + caution framing + next action
- matching does not claim universal identity certainty
- match behavior is real enough to support pilot testing

### Important release rule
**[confirmed]**
Matching does not need to be perfect.
It does need to be real, usable, and truthfully framed.

### Must not be true at release
**[confirmed]**
- matching is still only cosmetic
- the system presents AI output as identity certainty
- match UX exists but real match behavior does not

### Release result
If these are not real, release is blocked.

---

## 8.8 Protected contact baseline

### Required
**[confirmed]**
- protected contact flow is real
- owner data is not exposed by default
- optional direct reveal only happens where allowed by the flow
- trust/safety framing is real, not only decorative copy

### Must not be true at release
**[confirmed]**
- contact flow is still simulated
- direct owner data is effectively public by default
- contact behavior contradicts trust/public-data rules

### Release result
If these are not real, release is blocked.

---

## 8.9 Public-data consistency baseline

### Required
**[confirmed]**
- public location remains approximate
- exact address is not publicly shown
- exact coordinates are not publicly shown
- public data is minimized
- owned-pet and Community Dog visibility are not treated as identical
- public behavior is consistent across profile, case, and QR surfaces

### Must not be true at release
**[confirmed]**
- public-data behavior contradicts approved policy
- exact location leaks publicly
- owner data is exposed carelessly
- shared/public records behave like unrestricted public-edit pages

### Release result
If these are not true, release is blocked.

---

## 8.10 Community Dog minimum governance baseline

### Required
**[confirmed]**
- Community Dogs are handled in a controlled way
- likely matches are shown before allowing new creation where required
- creation follows the constrained MVP direction
- sensitive changes are not freely editable
- some form of controlled review/change-request logic exists for sensitive shared-record changes

### Must not be true at release
**[confirmed]**
- any user can freely create or rewrite sensitive Community Dog records without checks
- Community Dog logic behaves like an uncontrolled open wiki
- Community Dog handling ignores review/governance requirements already defined in MVP scope

### Release result
If these are not true, release is blocked.

---

## 8.11 Evidence and trust-sensitive action baseline

### Required
**[confirmed]**
- relevant actions can support evidence attachment in the MVP direction
- stronger claims can receive stronger review than lightweight actions
- trust-sensitive updates are not treated like casual low-risk notes

### Must not be true at release
**[confirmed]**
- evidence-aware actions are completely absent where they are core to MVP direction
- trust-sensitive public/shared changes bypass all meaningful control

### Release result
If these are not true, release is blocked.

---

## 8.12 Moderation and review minimum baseline

### Required
**[confirmed]**
- there is basic review capability
- there is minimum dispute-handling readiness
- there is minimum abuse/suspicion handling readiness
- sensitive public/shared changes can be controlled rather than blindly accepted

### Must not be true at release
**[confirmed]**
- there is no way to review or control sensitive public/shared changes
- there is no path for basic abuse/suspicion response
- the product relies entirely on uncontrolled public trust

### Release result
If these are not true, release is blocked.

---

## 8.13 QA and regression baseline

### Required
**[confirmed / operational interpretation]**
- the product has passed meaningful manual QA on the real current build
- core release flows have been tested in their real implemented state
- there is no major known contradiction between QA truth and release claims

### Strongly expected
**[confirmed / operational interpretation]**
- regression discipline exists at least at a practical manual level
- critical issues are known and tracked honestly

### Important note
**[confirmed]**
Automated tests now cover a minimal backend baseline, but this document should not pretend they cover UI flows or simulated cloud infrastructure. Full manual regression discipline must remain honest.

### Release result
If core real flows are not actually tested, release should be blocked.

---

## 8.14 Deployment and environment baseline

### Required
**[probable / operational interpretation]**
- the web app can be accessed reliably enough by pilot users
- deployment/routing is stable enough for the beta context
- the release environment does not collapse basic product entry/use

### Must not be true at release
**[confirmed / aligned with current state risks]**
- deploy/routing behavior is still too unstable for normal pilot access
- release depends on fragile demo-only assumptions
- environment confusion makes real-user pilot use unrealistic

### Release result
If the app cannot be accessed and used reliably enough, release is blocked.

---

## 8.15 Product honesty baseline

### Required
**[confirmed]**
- PETTODO is described honestly as what it is at release time
- release communication does not pretend the product is more mature than it really is
- beta users are not misled about critical capabilities

### Must not be true at release
**[confirmed]**
- release communication still implies a fully mature system
- landing/product claims contradict actual implementation
- prototype-only capabilities are described as fully real

### Release result
If product communication materially misrepresents reality, release should be blocked.

---

## 9. Non-blocking items for first real beta

The following may exist in PETTODO vision, but are not required to pass first real beta release:

- fully mature walkers marketplace
- fully mature play dates system
- fully mature social communities system
- sponsor rewards / points economy maturity
- advanced partner donation ecosystems
- native Android/iOS main release
- full reputation engine maturity
- advanced AI planning maturity
- full long-term ecosystem completeness

These may remain incomplete without blocking the first real beta, as long as they are not falsely presented as already mature.

---

## 10. Release evidence rule

A criterion should only be marked as passed when there is real supporting evidence.

Acceptable evidence may include:
- implemented working flow in current build
- QA confirmation on real implemented flow
- reviewed production-like behavior
- release review notes
- architecture/implementation confirmation when relevant

Not acceptable:
- screen exists, therefore feature is real
- copy implies capability, therefore capability is real
- prototype behavior is assumed to equal production behavior

---

## 11. Release review format

Every real beta release decision should produce a short release review record containing:

- release candidate identifier
- date
- reviewer
- criteria passed
- criteria failed
- open blockers
- go / no-go verdict
- scope notes
- risks accepted explicitly, if any

This review may later be formalized in a separate release-review template if needed.

---

## 12. Current release truth relative to these criteria

### Current state
**[confirmed]**
PETTODO is not yet first-real-beta ready today if critical flows still remain simulated or not real.

### Why
**[confirmed]**
While Phase 1 infrastructure and core pet persistence are now real, current known critical beta blockers still include:
- real protected contact
- real image pipeline
- real moderation/review capability
- real evidence workflow
- automated tests
- CI/CD
- stable production routing/deploy fallback behavior

### Meaning
**[confirmed]**
The product direction is strong.
The current prototype depth is strong.
The base infrastructure is real.
The beta cut line still requires full UI integration.

---

## 13. What this document is not

This file is not:
- the full backlog
- the full architecture spec
- the bug tracker
- the landing brief
- proof that release is already approved

This file only defines the release decision standard.

---

## 14. Suggested next related documents

After this file, the most useful next documents are:

- `ARCHITECTURE.md`
- optional release review template
- optional bug/regression log
- optional environment/deployment public note if release becomes near-term

---

## 15. Final rule

PETTODO should only be released to real beta when the core system is real enough to support pilot users honestly, safely, and consistently.

A powerful prototype is an asset.

It is not the same thing as a release.
