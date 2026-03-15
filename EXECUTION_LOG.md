# RISKS_BLOCKERS

Purpose:
Define the current implementation risks, release blockers, and operational concerns that could prevent PETTODO from becoming a real pilot-usable web app, so product, Replit execution, QA, and release decisions remain honest and focused.

What belongs here:
- current blockers to first real beta
- major implementation and operational risks
- blocker vs risk distinction
- severity and impact framing
- mitigation direction for current phase
- non-blocking concerns worth monitoring
- rules for updating this file as implementation reality changes

Update rule:
Update whenever a blocker is materially reduced, a new major risk appears, a release-critical assumption changes, or implementation reality changes enough to affect beta-readiness.

---

## 1. Why this document exists

PETTODO already has strong prototype depth, broad route coverage, and meaningful product clarity.

That is not the same as being safe, stable, or honest enough for real pilot use.

This document exists to make sure the team can answer clearly:

- what is still blocking first real beta
- what is risky but not yet a hard blocker
- what could derail Replit execution if ignored
- what should be monitored even if not solved immediately
- what should not be falsely treated as “basically done”

This document is not a bug tracker.
It is the official risk and blocker view for the current MVP phase.

---

## 2. Interpretation rule

This document should be interpreted together with:

- MASTER_CONTEXT.md
- CURRENT_STATE.md
- PRD_MVP_WEBAPP.md
- ARCHITECTURE.md
- PUBLIC_DATA_POLICY.md
- TRUST_AND_SAFETY.md
- WEBAPP_REPLIT.md
- QA_CURRENT.md
- RELEASE_CRITERIA.md
- DATA_MODEL.md
- SCREEN_ROUTE_MAP.md
- ENVIRONMENTS_PUBLIC.md
- BACKLOG.md

Interpretation rule:

- CURRENT_STATE defines what is still simulated or not real
- PRD_MVP_WEBAPP defines what the MVP must become
- ARCHITECTURE defines the recommended implementation direction
- PUBLIC_DATA_POLICY and TRUST_AND_SAFETY define unacceptable exposure and trust failures
- QA_CURRENT defines what is actually validated today
- RELEASE_CRITERIA defines what blocks first real beta
- BACKLOG defines the intended implementation order

If these documents conflict, real implementation truth and approved product direction win.

---

## 3. Current overall risk posture

PETTODO is currently in a strong-but-fragile stage.

What is strong:
- product direction
- prototype depth
- route coverage
- documentation maturity
- trust/safety awareness
- QR, case, and Community Dog product logic

What is fragile:
- real backend truth
- real auth
- real persistence
- real media pipeline
- real moderation and review operations
- deploy and environment discipline
- test and regression discipline

### Plain-language summary

The project is not at risk because the idea is weak.

The project is at risk if strong prototype breadth is mistaken for real-system readiness and if Replit work keeps expanding surface faster than it makes the core system real.

---

## 4. Risk and blocker labels

Use these labels consistently.

### Blocker
A condition that directly prevents honest first real beta.

### Critical risk
A risk that could easily become a blocker or could seriously damage trust, release readiness, or implementation quality if mishandled.

### Major risk
A serious risk that does not automatically block current work, but can create large downstream cost, delay, or trust issues.

### Watch risk
A real concern worth monitoring, but not a current top-priority execution constraint.

### Resolved for current phase
No longer a meaningful active blocker or major risk for the current MVP phase.

---

## 5. Blocker rule

A blocker should remain listed as active until one or more of these become materially true:

- the capability is implemented in real form
- the capability is validated enough to support pilot-style use
- the risk is reduced enough that release is no longer blocked by it
- the issue is explicitly removed from the first-beta cut line by approved scope change

A blocker is not resolved just because:

- the screen exists
- the flow works in local demo mode
- the UI copy implies the feature
- the prototype looked convincing in review

---

## 6. Current active blockers to first real beta

## RB-001 — No real auth and access control baseline yet

Type:
Blocker

Severity:
Critical

Current reality:
Core sensitive workflows still cannot depend on a fully real account and session baseline.

Why this blocks beta:
PETTODO includes trust-sensitive flows such as owned-pet management, protected contact, Community Dog contributions, and moderation-aware actions.
These cannot be treated as real pilot behavior if auth is still simulated or incomplete.

What must become true:
- real sign-in exists
- session handling is real
- account-required routes are enforced
- public vs authenticated boundaries are real

Primary mitigation direction:
Implement real auth and route protection first, not later.

Related backlog:
BL-001

---

## RB-002 — No real persistence and shared system-of-record baseline yet

Type:
Blocker

Severity:
Critical

Current reality:
Core product truth still depends too heavily on local-only or demo-oriented behavior.

Why this blocks beta:
A pilot-usable product cannot depend on localStorage or demo-seeded state for core identity, case, and trust-sensitive flows.

What must become true:
- animals persist as real records
- cases persist as real records
- user-linked product state survives return and re-entry
- core flows stop depending on local-only truth

Primary mitigation direction:
Establish real persistence and real system-of-record behavior early.

Related backlog:
BL-002

---

## RB-003 — Real animal identity is not yet fully backend-backed

Type:
Blocker

Severity:
Critical

Current reality:
Animal identity is strongly represented in the prototype, but still not sufficiently real as persistent backend truth.

Why this blocks beta:
PETTODO’s main loop depends on digital identity for the animal.
If identity is not real, QR, public profile, cases, media, and matching cannot become trustworthy enough.

What must become true:
- owned-pet profile creation is real
- profile updates are real
- stored fields are meaningful and durable
- profile logic can support QR, cases, and visibility rules

Primary mitigation direction:
Make animal identity one of the earliest real persistent domains.

Related backlog:
BL-003

---

## RB-004 — QR and public animal profile flow are not yet real enough

Type:
Blocker

Severity:
Critical

Current reality:
QR and public profile UX are strong in prototype form, but not yet validated as fully real backend-backed behavior.

Why this blocks beta:
QR is one of PETTODO’s most important identity and recovery mechanisms.
If it is only visual or partially real, the product will overpromise one of its most important capabilities.

What must become true:
- QR resolves to real data
- public animal profile is real
- visible status is real
- report-sighting path works where required
- public output respects trust and public-data rules

Primary mitigation direction:
Make QR/public profile real as part of the early core implementation wave.

Related backlog:
BL-004

---

## RB-005 — Lost / found / sighted case workflows are not yet real enough

Type:
Blocker

Severity:
Critical

Current reality:
Case UX exists strongly, but case creation and lifecycle are not yet sufficiently real and persistent.

Why this blocks beta:
Emergency recovery is one of PETTODO’s defining value layers.
A product cannot claim pilot-ready recovery support if case truth is still mostly prototype-only.

What must become true:
- users can create real lost cases
- users can create real found cases
- users can create real sighted cases
- cases persist
- case state is separate from animal identity
- public case behavior remains trust-safe

Primary mitigation direction:
Make case creation and lifecycle real soon after auth and persistence foundations.

Related backlog:
BL-005

---

## RB-006 — Image upload and storage pipeline is not yet real

Type:
Blocker

Severity:
Critical

Current reality:
Media behavior remains insufficiently real for production-style identity, recovery, evidence, and matching workflows.

Why this blocks beta:
PETTODO relies heavily on images for identification, matching, reporting, and evidence.
Without real upload/storage, many core flows remain visually persuasive but operationally incomplete.

What must become true:
- core image upload works
- image storage is durable
- media links to real records
- public/private behavior around media is controlled

Primary mitigation direction:
Implement storage integration and real media flow early.

Related backlog:
BL-006

---

## RB-007 — Public/private boundary enforcement is not yet strong enough

Type:
Blocker

Severity:
Critical

Current reality:
The product language is trust-aware, but policy-safe behavior is not yet fully guaranteed in real system terms.

Why this blocks beta:
PETTODO cannot move into real pilot use if public routes, profile exposure, case visibility, and contact behavior are still governed mostly by UI promises.

What must become true:
- public output is constrained meaningfully
- owner data is not exposed by default
- exact location is not exposed publicly
- account-required and protected workflows are enforced

Primary mitigation direction:
Treat public/private enforcement as a core system task, not a later polish pass.

Related backlog:
BL-007

---

## RB-008 — Protected contact is not yet real

Type:
Blocker

Severity:
Critical

Current reality:
Protected contact exists as concept and UI representation, but not yet as fully real protected behavior.

Why this blocks beta:
Owned-pet recovery is not trust-safe if contact depends on unsafe direct exposure or fake relay behavior.

What must become true:
- protected contact can be initiated for real
- coordination flows are real enough to use
- owner data is not exposed by default
- minimum auditability exists

Primary mitigation direction:
Build protected contact as a true first-class trust feature.

Related backlog:
BL-008

---

## RB-009 — Community Dogs are not yet operationally controlled in real form

Type:
Blocker

Severity:
Critical

Current reality:
Community Dogs exist clearly in product logic, but real governance, review, and evidence-aware contribution are not yet sufficiently real.

Why this blocks beta:
Community Dogs are included from the beginning, but they must not become uncontrolled shared records or fake-governed UI.

What must become true:
- creation is controlled
- contribution is controlled
- sensitive changes do not behave like free edits
- review-aware state exists

Primary mitigation direction:
Implement a controlled baseline, not an unrestricted wiki model.

Related backlog:
BL-009

---

## RB-010 — Moderation and review minimum is not yet real

Type:
Blocker

Severity:
Critical

Current reality:
Minimum moderator/operator capabilities are not yet sufficiently real for trust-sensitive flows.

Why this blocks beta:
Protected contact, Community Dog governance, suspicious activity handling, and sensitive record changes require some real review capability.

What must become true:
- minimum review path exists
- operator-only areas are protected
- approve/reject behavior exists for key review states
- sensitive trust actions do not remain unmanaged

Primary mitigation direction:
Keep moderation minimal but real.

Related backlog:
BL-010

---

## RB-011 — Matching and AI-assisted workflows are not yet real enough

Type:
Blocker

Severity:
Critical

Current reality:
Matching UX and AI framing exist, but the real pipeline is still not sufficiently implemented and validated.

Why this blocks beta:
PETTODO should not pretend it has real operational matching if it still depends mainly on heuristic or demo behavior.

What must become true:
- real matching invocation exists
- candidate results are real enough to test
- caution framing remains honest
- no false certainty is implied

Primary mitigation direction:
Implement a bounded practical matching v1, not an overclaimed intelligence layer.

Related backlog:
BL-011

---

## RB-012 — Share and flyer generation are not yet real enough

Type:
Blocker

Severity:
Major blocker

Current reality:
Share/flyer UX exists, but production-grade real output from real records is not yet sufficiently validated.

Why this blocks beta:
Recovery flows benefit heavily from sharing.
If this remains fake or brittle, a practical recovery channel stays weaker than the UI suggests.

What must become true:
- outputs derive from real records
- public-safe shaping is enforced
- links are coherent and stable enough

Primary mitigation direction:
Convert share outputs after real records and public routes are stable enough.

Related backlog:
BL-012

---

## RB-013 — Environment sanity and deploy/routing stability are not yet reliable enough

Type:
Blocker

Severity:
Critical

Current reality:
Environment confusion, deploy fragility, or route instability still threaten normal pilot-style usage.

Why this blocks beta:
Even good core flows cannot support real pilot access if the app cannot be reached reliably enough, or if public/preview/production behavior is too confusing.

What must become true:
- environments are clear
- public routes are stable enough
- app vs landing is coherent
- deploy/routing behavior is not fragile enough to undermine normal use

Primary mitigation direction:
Treat environment sanity and routing stability as real product readiness work.

Related backlog:
BL-013

---

## RB-014 — Automated tests and regression discipline are still missing

Type:
Blocker

Severity:
Critical

Current reality:
There is strong prototype review evidence, but no meaningful automated regression baseline for the real-beta cut line.

Why this blocks beta:
As real integrations begin, regressions become harder to detect by memory and manual checking alone.

What must become true:
- meaningful core automated tests exist
- critical regressions are easier to detect
- test evidence supports release review

Primary mitigation direction:
Create a practical test baseline centered on the critical path, not a perfectionist suite.

Related backlog:
BL-014

---

## 7. Current critical risks that are not yet fully separate blockers

## CR-001 — Scope drift toward breadth instead of reality

Type:
Critical risk

Current reality:
PETTODO already has strong breadth.
The risk is continuing to add more surfaces instead of making the core system real.

Why it matters:
This can burn Replit cycles without reducing the beta gap.

Mitigation direction:
Use BACKLOG.md and WEBAPP_REPLIT.md as the execution filter.
Question any task that adds surface but does not reduce a core blocker.

---

## CR-002 — Prototype honesty drift

Type:
Critical risk

Current reality:
The product looks advanced.
That creates a strong risk of describing prototype representation as if it were already real capability.

Why it matters:
This can damage trust with testers, collaborators, and future partners.

Mitigation direction:
Keep CURRENT_STATE, QA_CURRENT, CHANGELOG_SUMMARY, and release communication brutally honest.

---

## CR-003 — Architecture drift during Replit implementation

Type:
Critical risk

Current reality:
As implementation accelerates, there is a risk that short-term convenience decisions will contradict architecture principles.

Examples:
- hidden local-only core logic
- provider-coupled AI behavior
- trust-sensitive behavior enforced only in UI
- environment shortcuts that create future cleanup debt

Why it matters:
This can make later hardening harder and more expensive.

Mitigation direction:
Use ARCHITECTURE.md, DATA_MODEL.md, SCREEN_ROUTE_MAP.md, and ENVIRONMENTS_PUBLIC.md before meaningful Replit work.

---

## CR-004 — Trust and privacy failure through partial implementation

Type:
Critical risk

Current reality:
The app deals with identity, owner information, public profiles, shared animal records, and location-sensitive flows.

Why it matters:
A partially implemented trust-sensitive system can be worse than a simpler system if it exposes too much, too early.

Mitigation direction:
Prioritize safe defaults.
Treat public exposure, contact behavior, and Community Dog edits as high-risk by default.

---

## CR-005 — Replit session shadow truth

Type:
Critical risk

Current reality:
Meaningful implementation decisions can happen inside build sessions faster than docs are updated.

Why it matters:
If documentation lags too far behind, project truth becomes fragmented and harder to govern.

Mitigation direction:
After every meaningful Replit session, update the right stable docs and leave a clean handoff.

---

## 8. Major risks worth monitoring closely

## MR-001 — Community Dog governance complexity may be underestimated

Type:
Major risk

Why it matters:
Even a controlled MVP version can become messy if contribution, evidence, review, and profile classification are not handled carefully.

Mitigation direction:
Keep the first version narrow and explicit.
Do not over-open editing rights.

---

## MR-002 — Matching expectations may exceed real v1 capability

Type:
Major risk

Why it matters:
Users may assume “AI matching” means near-certain identification.
That expectation can exceed what a practical v1 can safely do.

Mitigation direction:
Keep caution framing strong.
Treat matching as suggestion, not proof.

---

## MR-003 — Bolivia pilot realities may create communication and operational edge cases

Type:
Major risk

Why it matters:
Communication methods, operational verification, and user behavior in the pilot context may not behave like default startup assumptions.

Mitigation direction:
Keep flows simple.
Avoid overcommitting to communication features not yet operationally grounded.

---

## MR-004 — Media, evidence, and moderation load may grow faster than expected

Type:
Major risk

Why it matters:
Once real usage begins, images, reports, and shared-record actions can create more operational burden than prototype review suggests.

Mitigation direction:
Keep MVP moderation scope focused.
Use minimum viable review tooling and clear queue discipline.

---

## MR-005 — Route and information architecture can become harder to stabilize as real logic is added

Type:
Major risk

Why it matters:
A strong screen prototype can still hide route complexity, role complexity, and public/private state complexity.

Mitigation direction:
Keep SCREEN_ROUTE_MAP.md authoritative and avoid route sprawl during implementation.

---

## 9. Watch risks

## WR-001 — Non-core ecosystem modules may distract the core build
Examples:
- walkers maturity
- play dates maturity
- advanced communities/events
- rewards and sponsor systems

Mitigation direction:
Keep them out of the first-beta critical path.

---

## WR-002 — Over-documentation without execution
Why it matters:
Documentation helps only if it drives implementation and truth maintenance.

Mitigation direction:
Tie docs directly to Replit work packets, reviews, and updates.

---

## WR-003 — Premature infra complexity
Why it matters:
Trying to look “production-grade” too early can slow the real MVP.

Mitigation direction:
Keep infra serious where necessary, but avoid unnecessary platform theater.

---

## 10. Current non-blocking items

The following may remain incomplete without blocking first real beta, as long as they are not falsely presented as already mature:

- fully mature walkers marketplace
- fully mature play dates system
- fully mature broad community/social layer
- sponsor rewards and points economy maturity
- full reputation engine maturity
- native mobile release
- broader ecosystem completeness beyond the core web beta

These are product-valid but out of the current cut line.

---

## 11. Recommended risk review rhythm

Risk review should happen:

- when a P0 backlog item changes materially
- before opening a new major Replit wave
- before any serious preview/dev exposure to testers
- before any production or pilot-style release decision
- after any incident, contradiction, or trust/privacy concern

This file should not stay static while implementation reality changes.

---

## 12. Relationship to Replit work

Before a meaningful Replit task, the operator should know:

- which blocker the task is reducing
- which risks the task could worsen if done poorly
- which source-of-truth docs constrain the task
- whether the task affects release truth
- whether the task requires follow-up documentation updates

If a task does not clearly reduce a blocker, strengthen a critical path, or reduce a meaningful risk, it should be questioned before execution.

---

## 13. Relationship to release decisions

This document does not decide release by itself.

But if one or more active blockers remain materially unresolved, PETTODO should still be treated as not ready for first real beta.

A risk can be tolerated temporarily.
A blocker cannot be ignored just because the prototype looks strong.

---

## 14. Final rule

PETTODO’s biggest current danger is not lack of imagination.

The biggest danger is confusing a strong prototype with a real, safe, stable pilot-ready system.

This document should keep the team focused on what can still break the path to honest beta and what must become real before that beta is deserved.
