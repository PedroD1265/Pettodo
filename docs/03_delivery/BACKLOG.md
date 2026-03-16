# BACKLOG

Purpose:
Define the official prioritized implementation backlog for PETTODO’s current MVP phase so product, Replit execution, QA, and handoff work all follow the same sequence toward a real pilot-usable web app.

What belongs here:
- current MVP implementation priorities
- beta-critical workstreams
- recommended execution order
- backlog structure for Replit-oriented work packets
- dependencies between major work areas
- what is in scope now vs later
- rules for updating backlog status

Update rule:
Update whenever a backlog item materially changes status, a major dependency changes, a new blocker appears, or the MVP beta cut line changes.

---

## 1. Why this document exists

PETTODO already has strong product shape, strong route coverage, strong prototype depth, and meaningful documentation.

What is still missing is a disciplined implementation queue that turns all of that into a real system.

This document exists to define:

- what should be built first
- what should not distract the workstream
- which items are true beta blockers
- how to group implementation work into meaningful packets
- how to connect Replit execution to QA, docs, and release progress

This is the official MVP implementation backlog.

It is not the full product vision.
It is not the bug tracker.
It is not the release checklist.
It is not the issue-by-issue engineering board.

---

## 2. Backlog interpretation rule

This backlog should be interpreted together with:

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

Interpretation rule:

- MASTER_CONTEXT defines stable product truth
- CURRENT_STATE defines what is still simulated or not real
- PRD_MVP_WEBAPP defines what the MVP must become
- ARCHITECTURE defines the recommended implementation direction
- WEBAPP_REPLIT defines how the main build track should operate
- QA_CURRENT and RELEASE_CRITERIA define what still blocks real beta
- DATA_MODEL, SCREEN_ROUTE_MAP, and ENVIRONMENTS_PUBLIC define the current implementation structure

If these sources conflict, real implementation truth and approved product direction win.

---

## 3. Current backlog objective

The current objective is not to expand PETTODO’s breadth.

The current objective is to turn the strongest core prototype areas into real, backend-backed, trust-safe, pilot-usable capabilities.

For this phase, the backlog should optimize for:

- real sign-in and access control
- real persistence
- real animal identity records
- real QR/public profile behavior
- real case creation and case state
- real image upload/storage
- real protected contact
- controlled Community Dog creation and contribution
- minimum moderation and review operations
- practical matching and AI-assisted workflows
- testing, deployment sanity, and release discipline

---

## 4. Backlog status labels

Use these statuses consistently.

### Proposed
The item is identified but not yet accepted into the active implementation queue.

### Ready
The item is clear enough to be turned into a Replit work packet.

### In progress
The item is actively being implemented or refined.

### Blocked
The item cannot progress meaningfully because of a dependency, contradiction, or missing decision.

### Partially real
The item exists beyond pure prototype level, but still does not meet the intended MVP truth.

### Done for current phase
The item is materially complete enough for the current MVP phase.

### Deferred
The item is valid, but intentionally not prioritized for the current beta cut line.

---

## 5. Backlog prioritization model

Use these priority levels.

### P0 — Beta-critical foundation
If this is not real, first real beta is blocked.

### P1 — High-value near-core
Strongly needed for a serious MVP, but can follow immediately after the most critical foundation items.

### P2 — Supporting maturity
Useful for product quality, operational clarity, and polish after the core beta line becomes real.

### P3 — Later / out of first-beta priority
Valid product work, but should not distract the current implementation sequence.

---

## 6. Backlog unit of work

The preferred execution unit for this backlog is a **work packet**.

A good work packet should define:

- objective
- scope
- out of scope
- dependencies
- source-of-truth docs
- acceptance criteria
- expected routes or modules affected
- what docs may need updating after implementation

This keeps backlog items usable in Replit, review, QA, and handoffs.

---

## 7. Current MVP backlog by priority

## 7.1 P0 — Beta-critical foundation

### BL-001 — Real auth and session baseline
Status:
Ready

Priority:
P0

Goal:
Replace simulated login/session logic with real authentication, real session handling, and meaningful route protection.

Scope:
- real sign-in
- session persistence
- public vs authenticated route separation
- role-aware access groundwork
- protection for sensitive actions

Includes:
- owned-pet management routes
- case creation routes
- protected contact entry
- Community Dog contribution routes
- moderator/operator route gating groundwork

Does not include:
- full advanced verification system
- full enterprise admin IAM complexity

Why it matters:
Without real auth, the app cannot honestly function as a trust-sensitive shared system.

Dependencies:
- environment configuration
- auth provider integration
- route protection plan

Done for current phase when:
- account-required routes truly require login
- session state is real
- fake OTP or fake auth is removed from core paths
- public and private route behavior are clearly separated

---

### BL-002 — Real persistence and system-of-record foundation
Status:
Ready

Priority:
P0

Goal:
Replace local-only core state with real persistence for MVP-critical records.

Scope:
- backend-backed persistence for core records
- real animal records
- real case records
- basic user-linked record ownership
- stable read/write behavior across re-entry

Includes:
- animals
- cases
- core linked state needed for QR/public profile
- minimum migration away from localStorage dependence in core paths

Does not include:
- every non-core module
- full analytics or reporting warehouse

Why it matters:
Without real persistence, PETTODO remains a demo-functional prototype, not a real web product.

Dependencies:
- auth baseline
- database integration
- data model alignment

Done for current phase when:
- critical records survive normal user return
- animals and cases are no longer local-only truth
- core product state is meaningfully server-backed

---

### BL-003 — Real animal identity and owned-pet profile baseline
Status:
Ready

Priority:
P0

Goal:
Make owned-pet identity real and persistently usable.

Scope:
- create animal profile
- edit animal profile
- store digital identity fields
- persist profile media references
- preserve visibility-aware profile structure

Includes:
- owned-pet profile creation
- basic edit/update
- profile detail rendering from real records
- profile state consistent with public-data and trust rules

Does not include:
- all future profile enrichments
- advanced social/community profile layers

Why it matters:
Animal identity is one of the central product truths of PETTODO.

Dependencies:
- auth
- persistence
- data model

Done for current phase when:
- users can create and manage owned-pet profiles using real storage
- profile fields are not only visual placeholders
- profile logic aligns with QR and case workflows

---

### BL-004 — Real QR and public animal profile flow
Status:
Ready

Priority:
P0

Goal:
Turn QR identity and public profile flow into a real pilot-usable capability.

Scope:
- QR generation/linkage backed by real records
- public animal profile rendering
- current visible status display
- safe next-action display
- report-sighting entry when relevant

Includes:
- QR-linked public route
- public profile route
- visible status logic
- public-safe profile content
- route continuity for QR access

Does not include:
- advanced QR lifecycle features beyond MVP necessity

Why it matters:
QR is a core PETTODO identity and recovery mechanism, not a decorative asset.

Dependencies:
- animal identity persistence
- public-data rules
- route map alignment
- environment/public routing sanity

Done for current phase when:
- QR resolves to real data
- public profile is real
- public output respects visibility and trust rules
- lost-animal QR flow supports report sighting

---

### BL-005 — Real lost / found / sighted case baseline
Status:
Ready

Priority:
P0

Goal:
Make case creation and case lifecycle real while preserving profile vs case separation.

Scope:
- create LOST case
- create FOUND case
- create SIGHTED case
- update case status
- resolve case
- connect case to animal where appropriate

Includes:
- persistent case records
- case detail view from real data
- basic case lifecycle state
- public-safe case behavior where applicable

Does not include:
- full mature dispute engine
- advanced long-tail case automation

Why it matters:
Emergency recovery is one of PETTODO’s defining operational layers.

Dependencies:
- auth
- persistence
- animal identity
- route map
- approximate-location rules

Done for current phase when:
- case creation is real
- cases persist
- case state is not confused with animal identity
- public behavior respects approximate-location rules

---

### BL-006 — Real image upload and storage baseline
Status:
Done for current phase

Priority:
P0

Goal:
Make image handling real for profile, case, and matching workflows.

Scope:
- upload flow
- external storage integration
- media linkage to animals and cases
- durable retrieval
- basic derived media handling where needed

Includes:
- upload for core profile/case use
- image display from real stored assets
- stable storage references
- foundation for image-based matching and evidence

Does not include:
- full advanced media studio
- unnecessary media complexity outside MVP

Why it matters:
Image handling is core to identity, cases, matching, and trust.

Dependencies:
- storage integration
- persistence
- environments
- media model alignment

Done for current phase when:
- images are truly uploaded and stored
- images remain available after normal re-entry
- media is linked to real records instead of fake/local state

---

### BL-007 — Real public/private boundary enforcement
Status:
Ready

Priority:
P0

Goal:
Ensure public, authenticated, and sensitive flows behave according to policy and trust rules.

Scope:
- public-safe serializers/responses
- profile visibility boundaries
- case visibility boundaries
- account-required actions enforcement
- public minimal exposure behavior

Includes:
- public location approximation
- owner data protection by default
- safe profile/public case rendering
- route-level and behavior-level distinction between public and private access

Does not include:
- every future privacy preference edge case

Why it matters:
PETTODO cannot safely move toward real pilot use if exposure boundaries remain decorative.

Dependencies:
- auth
- persistence
- route map
- public-data policy
- trust and safety

Done for current phase when:
- public outputs are meaningfully constrained
- protected flows are not accessible like open public flows
- owner data is not exposed by default

---

### BL-008 — Real protected contact v1
Status:
Ready

Priority:
P0

Goal:
Turn protected contact from prototype representation into real coordinated behavior.

Scope:
- contact initiation
- relay-first structure
- controlled message or structured exchange
- owner-safe handling
- basic auditability

Includes:
- protected contact entry from relevant public/private flows
- thread or structured relay container
- minimal event logging
- optional future-facing reveal state groundwork

Does not include:
- advanced full chat platform maturity
- high-complexity communication stack beyond MVP need

Why it matters:
Owned-pet recovery must not depend on unsafe direct exposure.

Dependencies:
- auth
- public/private boundary enforcement
- persistence
- data model
- trust and safety

Done for current phase when:
- contact can be initiated through a real protected path
- owner data is not exposed by default
- the flow is usable enough for pilot testing

---

### BL-009 — Controlled Community Dog creation and contribution baseline
Status:
Ready

Priority:
P0

Goal:
Make Community Dogs real in constrained MVP form, not unrestricted public editing.

Scope:
- controlled creation flow
- likely-duplicate or likely-match check
- contribution flow for sightings/actions
- review-aware states
- change-request pattern for sensitive updates

Includes:
- creation proposal or provisional creation model
- controlled contribution entry
- shared-record review state
- minimum governance behavior

Does not include:
- fully mature community governance engine
- unrestricted editing of shared records

Why it matters:
Community Dogs are part of the MVP, but only in a controlled and trust-safe form.

Dependencies:
- persistence
- auth
- data model
- trust and safety
- moderation minimum
- matching support

Done for current phase when:
- Community Dog records can be created in the approved controlled form
- sensitive modifications do not behave like free edits
- basic review-aware contribution logic exists

---

### BL-010 — Minimum moderation and review capability
Status:
Ready

Priority:
P0

Goal:
Provide the minimum internal moderation/review surface required for trust-sensitive MVP behavior.

Scope:
- review queue or equivalent
- shared-record review
- suspicious/abuse signal handling minimum
- operator-only route protection
- basic decision recording

Includes:
- moderator/operator access
- minimum review decision handling
- visibility into pending sensitive actions
- ability to approve/reject core review-requiring items

Does not include:
- large enterprise moderation suite
- advanced policy automation beyond MVP need

Why it matters:
Protected contact, Community Dogs, and trust-sensitive record changes need minimum operational control.

Dependencies:
- auth roles
- persistence
- data model
- trust and safety

Done for current phase when:
- there is a real internal path to review key sensitive items
- operator-only surfaces are protected
- approval/rejection of core review states is possible

---

### BL-011 — Real matching v1
Status:
Ready

Priority:
P0

Goal:
Make match suggestions real enough to support pilot testing without false certainty.

Scope:
- practical matching execution path
- candidate ranking
- score + reasons + caution framing
- useful next action

Includes:
- real match invocation
- result storage or retrieval
- candidate presentation
- no-claim certainty framing

Does not include:
- perfect identity resolution
- mature long-term model optimization

Why it matters:
Matching is one of the app’s most distinctive high-value flows.

Dependencies:
- image pipeline
- persistence
- AI/provider integration
- data model
- trust framing

Done for current phase when:
- users can receive real possible matches
- reasons and caution are shown
- the product does not claim identity certainty

---

### BL-012 — Share and flyer outputs from real data
Status:
Ready

Priority:
P0

Goal:
Generate share outputs from actual records instead of prototype-only placeholders.

Scope:
- flyer/share generation based on real profile/case data
- public-safe share content
- route continuity from shared artifact to public-safe page

Includes:
- flyer/share output from real case or animal records
- stable link association
- current-safe public info only

Does not include:
- full creative asset studio
- advanced design automation beyond MVP need

Why it matters:
Sharing is part of the practical recovery flow.

Dependencies:
- real profile/case data
- public-safe data shaping
- routing stability
- media/storage support

Done for current phase when:
- share outputs are generated from real records
- outputs do not expose unsafe data
- links remain coherent

---

### BL-013 — Environment sanity, deploy stability, and core release engineering
Status:
Ready

Priority:
P0

Goal:
Make the product testable and deployable as a real web system rather than a fragile demo runtime.

Scope:
- environment correctness
- preview/dev sanity
- production configuration sanity
- routing/deploy fallback stability
- release-oriented setup improvements

Includes:
- environment-aware configuration use
- basic deployment sanity
- public route stability
- app vs landing clarity
- operational readiness for controlled pilot testing

Does not include:
- overbuilt enterprise DevOps
- unnecessary infra expansion outside current phase

Why it matters:
Even strong core features cannot support real pilot use if environment and deploy truth remain fragile.

Dependencies:
- environments document
- auth/storage/db integration
- route map
- release criteria

Done for current phase when:
- core public/private routes are stable enough to test
- environment confusion is materially reduced
- deploy/routing instability is not blocking normal pilot-style access

---

### BL-014 — Automated test baseline and regression discipline
Status:
Partially real (Backend baseline complete and audited)

Priority:
P0

Goal:
Create the minimum test and regression baseline needed for honest iteration.

Scope:
- practical automated tests for core flows
- regression discipline for critical routes
- test coverage centered on beta blockers

Includes:
- core auth tests
- core persistence tests
- QR/public route checks
- core case flow checks
- protected contact baseline checks where feasible

Does not include:
- exhaustive test suite for every non-core module
- perfectionist over-testing before core reality exists

Why it matters:
Without tests and regression discipline, implementation progress becomes fragile and hard to trust.

Dependencies:
- enough real features to test
- environment sanity
- stable routes/components for core flows

Done for current phase when:
- a meaningful core automated test baseline exists
- regressions in the critical path are easier to detect
- test evidence can support release review

---

## 7.2 P1 — High-value near-core work

### BL-015 — Evidence-backed actions baseline
Status:
Ready

Priority:
P1

Goal:
Support relevant action records with attached evidence in a real controlled form.

Scope:
- action creation
- evidence attachment
- visibility-aware action history
- stronger review where trust-sensitive

Includes:
- vaccine
- sterilization
- sighting
- feeding
- care updates

Why it matters:
This is important for identity-over-time, Community Dogs, and shared-record trust.

Dependencies:
- persistence
- media pipeline
- data model
- moderation/review minimum

Done for current phase when:
- relevant actions can persist with evidence
- sensitive action types can support stronger review where needed

---

### BL-016 — Settings, privacy controls, and visibility controls baseline
Status:
Ready

Priority:
P1

Goal:
Provide the minimum personal controls needed for a trust-sensitive MVP.

Scope:
- visibility settings
- basic notification preferences
- profile/privacy settings relevant to owned-pet and contact behavior

Why it matters:
Some trust behaviors should be operationalized, not only described in copy.

Dependencies:
- auth
- persistence
- public/private boundary logic

Done for current phase when:
- key user-level visibility and privacy controls exist in real form

---

### BL-017 — Notification and operational feedback baseline
Status:
Proposed

Priority:
P1

Goal:
Provide enough feedback to help users understand what happened in core workflows.

Scope:
- important status confirmations
- case/report updates
- review-state feedback where appropriate
- protected-flow feedback

Why it matters:
Trust-sensitive workflows become confusing without feedback.

Dependencies:
- core flows becoming real first

Done for current phase when:
- users receive meaningful feedback in the most important MVP flows

---

### BL-018 — Pilot instrumentation and operational observability minimum
Status:
Proposed

Priority:
P1

Goal:
Gain enough operational visibility to support pilot learning and issue detection.

Scope:
- core event logging
- error visibility
- basic operational insight on critical flows

Why it matters:
A pilot without observability becomes hard to improve honestly.

Dependencies:
- core real flows
- environment stability

Done for current phase when:
- the team can inspect meaningful signals from real core usage

---

## 7.3 P2 — Supporting maturity

### BL-019 — Documentation and handoff hardening
Status:
Ready

Priority:
P2

Goal:
Make each real implementation cycle leave cleaner documentation, not more hidden knowledge.

Scope:
- session handoffs
- changelog summaries
- decision logging
- current-state updates after meaningful implementation changes

Why it matters:
PETTODO should not accumulate shadow truth in tool sessions only.

Dependencies:
- implementation work producing real change

Done for current phase when:
- major work sessions consistently update the right docs

---

### BL-020 — Cleanup of demo drift in non-core surfaces
Status:
Proposed

Priority:
P2

Goal:
Reduce contradictions in screens that still imply more maturity than current implementation truth.

Scope:
- UI honesty cleanup
- removal of fake-smart behavior where misleading
- lower-risk polish aligned with current system truth

Why it matters:
Product honesty matters before broader exposure.

Dependencies:
- core path progress
- release communication discipline

Done for current phase when:
- misleading prototype signals are materially reduced

---

## 7.4 P3 — Later / out of first-beta priority

These are valid parts of the broader PETTODO ecosystem, but should not consume core implementation energy before the beta cut line is met.

### Deferred areas
- fully mature walkers marketplace
- fully mature play dates system
- fully mature social/community ecosystem
- advanced rewards or points economy
- advanced sponsorship systems
- full reputation engine maturity
- advanced AI planning maturity
- native Android/iOS release track
- broader partner and legal workflow maturity
- non-core visual expansion that does not improve real-system readiness

Status:
Deferred

Priority:
P3

Rule:
These areas may remain present in prototype or concept form, but they are not current implementation drivers.

---

## 8. Recommended execution order

The recommended current execution sequence is:

### Wave 1 — System foundation
- BL-001 Real auth and session baseline
- BL-002 Real persistence and system-of-record foundation
- BL-013 Environment sanity, deploy stability, and core release engineering

### Wave 2 — Real identity and public flow baseline
- BL-003 Real animal identity and owned-pet profile baseline
- BL-004 Real QR and public animal profile flow
- BL-007 Real public/private boundary enforcement
- BL-006 Real image upload and storage baseline

### Wave 3 — Recovery and trust-sensitive core
- BL-005 Real case baseline
- BL-008 Real protected contact v1
- BL-010 Minimum moderation and review capability
- BL-009 Controlled Community Dog creation and contribution baseline

### Wave 4 — Intelligence and practical pilot utility
- BL-011 Real matching v1
- BL-012 Share and flyer outputs from real data
- BL-015 Evidence-backed actions baseline

### Wave 5 — Hardening
- BL-014 Automated test baseline and regression discipline
- BL-016 Settings, privacy controls, and visibility controls baseline
- BL-017 Notification and operational feedback baseline
- BL-018 Pilot instrumentation and operational observability minimum
- BL-019 Documentation and handoff hardening
- BL-020 Cleanup of demo drift in non-core surfaces

This sequence may be adjusted if implementation realities require it, but drift should be explicit, not accidental.

---

## 9. Dependencies that must remain explicit

The following dependency truths should remain clear:

- auth and session logic depend on environment and access model clarity
- persistence depends on data-model clarity and database integration
- QR/public profile depends on real animal identity records
- case flow depends on profile/case separation remaining intact
- matching depends on image pipeline and provider integration
- protected contact depends on auth, trust rules, and public/private boundaries
- Community Dogs depend on persistence, review states, and moderation minimum
- flyer/share outputs depend on real records and public-safe shaping
- tests become valuable only when critical flows are materially real
- release confidence depends on environment sanity, deploy stability, and QA evidence

---

## 10. Ready-for-Replit rule

A backlog item should normally be considered ready for a meaningful Replit session only when:

- the objective is clear
- the item has defined scope
- key constraints are known
- source-of-truth docs are identified
- dependencies are visible
- acceptance criteria are concrete enough to test
- the item helps the beta cut line rather than distracting from it

If a task only expands surface without increasing system reality, it should be questioned before execution.

---

## 11. Done rule for this backlog

A backlog item is not done just because:

- the screen exists
- the path works locally
- the prototype looks convincing
- the UI implies the capability

A backlog item is done for this phase only when:

- the core behavior is materially real
- the implementation aligns with approved docs
- trust/privacy rules are not weakened
- the flow is stable enough to test
- current docs can honestly describe what is real
- QA has enough evidence to treat it as more than pure prototype behavior

---

## 12. Documentation update rule after backlog progress

After any meaningful backlog item moves forward, update the relevant docs if reality changed materially.

Typical documents to update:

- CURRENT_STATE.md
- QA_CURRENT.md
- CHANGELOG_SUMMARY.md
- latest handoff
- DECISION_LOG.md if a real decision changed
- ARCHITECTURE.md if runtime responsibilities changed
- DATA_MODEL.md if canonical entity structure changed
- SCREEN_ROUTE_MAP.md if official route structure changed
- ENVIRONMENTS_PUBLIC.md if environment/public behavior changed

---

## 13. What this document is not

This document is not:

- the full sprint board
- the bug list
- the exact issue tracker
- the final engineering decomposition into tickets
- a substitute for task packets
- proof that any item is already complete

It is the official MVP implementation backlog direction.

---

## 14. Final rule

PETTODO should use this backlog to turn a strong prototype into a real, testable, trust-sensitive, pilot-usable system.

If the backlog starts rewarding breadth over reality, or decoration over beta readiness, it is being used incorrectly.

If the backlog keeps the team focused on real auth, real persistence, real identity, real recovery flows, real public/private boundaries, and real operational discipline, it is aligned with PETTODO’s current phase.
