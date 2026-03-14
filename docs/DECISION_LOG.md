# DECISION_LOG

Purpose:
Capture the current approved PETTODO decisions as a stable baseline so future work does not reopen already settled product, architecture, trust/safety, landing, or execution choices without a real reason.

What belongs here:
- current approved decisions from the present documentation baseline
- decision status and scope
- short rationale for each decision
- implementation and documentation implications
- rules for when a decision may be reopened, superseded, or clarified

Update rule:
Update when a real project decision is newly made, materially changed, superseded, or explicitly retired. This log starts from the current approved state and does not attempt to reconstruct full historical decision history before this baseline.

---

## 1. Why this document exists

PETTODO now has enough product depth, architecture direction, trust-sensitive rules, and execution structure that re-discussing old decisions creates drag and inconsistency.

This document exists to stop that.

It should help the team answer:

- what is already decided
- what should not be reopened casually
- what is still only recommended vs fully fixed
- what changed from this point forward
- what future sessions must preserve

This file is not a full project history.
It is the official decision baseline from the current approved documentation state.

---

## 2. Scope of this log

This log records decisions that are stable enough to guide:

- product definition
- MVP scope
- trust/safety behavior
- architecture direction
- landing direction
- Replit execution
- release/readiness behavior
- documentation workflow

This log does not try to record:

- every small implementation detail
- every temporary experiment
- every prompt variation
- every design exploration that did not become the chosen direction
- every bugfix or session-level change

Those belong in other documents such as:
- `CHANGELOG_SUMMARY.md`
- session handoffs
- QA notes
- code history
- review docs

---

## 3. Important baseline rule

This decision log starts from the **current approved project state**.

That means:

- it does not try to reconstruct the full early history of PETTODO
- it records the decisions that are currently true and operational
- older reasoning matters only if it still affects the current approved direction

If future work changes one of these decisions, do not delete the old one.
Mark it as superseded and add the new decision.

---

## 4. Decision status labels

Use these labels consistently.

### Active
The current approved decision.

### Superseded
A previously active decision that was later replaced.

### Clarified
The core decision remains the same, but its meaning became more precise.

### Rejected
An option that was considered and explicitly not adopted.

### Pending
A real decision area exists, but the final decision is not yet locked.

---

## 5. Decision entry format

Each decision entry should include:

- decision ID
- current status
- area
- decision
- rationale
- practical implications
- source-of-truth documents
- reopen rule

Use this same structure for future additions.

---

## 6. Current active decisions baseline

## D-001 — Replit is the main build track for the PETTODO web app

**Status:** Active  
**Area:** Build / execution

**Decision:**  
Replit is the main current build track for the PETTODO web app.

**Rationale:**  
PETTODO already has a strong Replit-based product base, and the current objective is to turn that advanced prototype into a real pilot-usable web app rather than restart from scratch elsewhere.

**Practical implications:**  
- Replit is the primary implementation path for the app
- Replit should focus on making core flows real, not expanding surface for its own sake
- support tools may assist, but they do not replace Replit as the main build track in this phase

**Source-of-truth documents:**  
- `CURRENT_STATE.md`
- `WEBAPP_REPLIT.md`
- `ARCHITECTURE.md`

**Reopen only if:**  
Replit stops being the best speed/quality tradeoff for the current phase or the team formally changes the main build track.

---

## D-002 — Lovable is for landing and marketing only, not the app core

**Status:** Active  
**Area:** Experience / landing

**Decision:**  
Lovable is used for the landing and public marketing site only, not for the main PETTODO product app.

**Rationale:**  
This keeps the landing workstream separate from the core app build and avoids mixing marketing-site iteration with trust-sensitive product implementation.

**Practical implications:**  
- landing work belongs in Lovable
- app-core work belongs in Replit
- landing should route users into the web app, not replace it

**Source-of-truth documents:**  
- `CURRENT_STATE.md`
- `ARCHITECTURE.md`
- `LANDING_LOVABLE.md`

**Reopen only if:**  
The team formally changes the landing/app delivery model.

---

## D-003 — GitHub and pettodo-docs are part of the official execution system

**Status:** Active  
**Area:** Documentation / coordination

**Decision:**  
GitHub and `pettodo-docs` are part of the official documentation and execution system.

**Rationale:**  
Stable project truth must live in controlled documents, not only inside tool sessions or memory.

**Practical implications:**  
- stable docs guide execution
- Replit, Lovable, reviews, and handoffs must stay aligned with docs
- documentation updates are part of real progress, not optional cleanup

**Source-of-truth documents:**  
- `CURRENT_STATE.md`
- `ARCHITECTURE.md`
- `AGENT_CONTEXT_PROTOCOL.md`

**Reopen only if:**  
The project formally changes its documentation/control system.

---

## D-004 — The next major milestone is a real usable web app for pilot-style testing

**Status:** Active  
**Area:** Product / delivery

**Decision:**  
The next major milestone is a real usable web app for pilot-style testing, not more demo recording or concept-only refinement.

**Rationale:**  
The project already has strong prototype depth. The main gap is now real system implementation.

**Practical implications:**  
- prioritize auth, persistence, image pipeline, QR/public profile, cases, protected contact, Community Dogs governance, moderation minimum, and tests
- avoid work that only makes the product look busier without making it more real

**Source-of-truth documents:**  
- `CURRENT_STATE.md`
- `WEBAPP_REPLIT.md`
- `RELEASE_CRITERIA.md`
- `BACKLOG.md`

**Reopen only if:**  
The project intentionally changes its near-term milestone.

---

## D-005 — Web comes before Android/iOS packaging

**Status:** Active  
**Area:** Platform strategy

**Decision:**  
PETTODO should be validated first as a real mobile-first web app. Android/iOS packaging comes later.

**Rationale:**  
The current stage needs speed, validation, and core product truth more than platform expansion.

**Practical implications:**  
- do not prioritize native release work before the web beta is real enough
- keep the product mobile-first on the web
- packaging can come after beta hardening

**Source-of-truth documents:**  
- `CURRENT_STATE.md`
- `MASTER_CONTEXT.md`
- `ARCHITECTURE.md`

**Reopen only if:**  
The beta cut line is met and there is a clear strategic reason to push native packaging earlier.

---

## D-006 — Cochabamba is the pilot city

**Status:** Active  
**Area:** Pilot / rollout

**Decision:**  
Cochabamba is the current pilot city.

**Rationale:**  
The product should be built with a real local pilot mindset while remaining structurally scalable to other cities later.

**Practical implications:**  
- pilot assumptions should be grounded in Cochabamba reality
- rollout messaging should not overstate scale
- operations and testing should stay local-first where relevant

**Source-of-truth documents:**  
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`

**Reopen only if:**  
The pilot geography is formally expanded or changed.

---

## D-007 — PETTODO is not only a lost-pet app

**Status:** Active  
**Area:** Product positioning

**Decision:**  
PETTODO must not be defined, built, or marketed as only a lost-pet app.

**Rationale:**  
The product’s core value includes daily care, identity, organization, preparedness, and controlled community-animal support in addition to recovery.

**Practical implications:**  
- product flows must support daily usefulness
- landing, app copy, and feature prioritization must reflect more than emergencies
- implementation should preserve both Daily and Emergency logic

**Source-of-truth documents:**  
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `PRD_MVP_WEBAPP.md`
- `LANDING_LOVABLE.md`
- `SCREEN_ROUTE_MAP.md`

**Reopen only if:**  
The overall product strategy is intentionally narrowed, which would be a major strategic change.

---

## D-008 — PETTODO’s primary loop is management + identity + preparedness

**Status:** Active  
**Area:** Product loop

**Decision:**  
PETTODO’s primary loop is management + animal identity + preparedness, with recovery as a critical but not exclusive value layer.

**Rationale:**  
Owners need a strong reason to use the system before emergencies happen.

**Practical implications:**  
- animal profiles matter as first-class product objects
- QR and identity matter before a pet is lost
- daily usefulness is part of MVP truth, not later decoration

**Source-of-truth documents:**  
- `CURRENT_STATE.md`
- `PRD_MVP_WEBAPP.md`
- `MASTER_CONTEXT.md`

**Reopen only if:**  
A formal product strategy change replaces the primary loop.

---

## D-009 — Community Dogs are part of the MVP, but only in controlled form

**Status:** Active  
**Area:** Product / trust and safety

**Decision:**  
Community Dogs are part of the MVP, but they must be implemented in a controlled, review-aware, trust-sensitive form.

**Rationale:**  
Community Dogs are a meaningful part of the product, but uncontrolled shared animal records create privacy, abuse, and data-quality risk.

**Practical implications:**  
- Community Dogs must not be treated as unrestricted public-edit records
- controlled creation, contribution, and review are required
- Community Dogs should be strong in product scope without dominating overall product identity

**Source-of-truth documents:**  
- `CURRENT_STATE.md`
- `PRD_MVP_WEBAPP.md`
- `MASTER_CONTEXT.md`
- `PUBLIC_DATA_POLICY.md`
- `TRUST_AND_SAFETY.md`

**Reopen only if:**  
The governance model for Community Dogs is intentionally changed with explicit trust/safety review.

---

## D-010 — Not every dog seen in the street is automatically a Community Dog

**Status:** Active  
**Area:** Classification / product logic

**Decision:**  
Not every street-visible dog automatically becomes a Community Dog.

**Rationale:**  
PETTODO must preserve explicit classification and avoid confusing sightings, stray visibility, community animals, and owned-pet identity.

**Practical implications:**  
- profile classification must be explicit
- found/sighted flows should not auto-convert animals into Community Dogs
- duplicate and misclassification risk must be handled carefully

**Source-of-truth documents:**  
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `PUBLIC_DATA_POLICY.md`
- `DATA_MODEL.md`

**Reopen only if:**  
The classification model changes formally.

---

## D-011 — Animal profile, case, and match result must remain separate

**Status:** Active  
**Area:** Product model / data model

**Decision:**  
PETTODO must preserve the distinction between animal profile, case, and match result.

**Rationale:**  
These are different truths with different lifecycles and trust implications.

**Practical implications:**  
- do not collapse these into one object or one screen conceptually
- data model, routes, and UI must preserve separation
- implementation shortcuts that blur these layers are incorrect

**Source-of-truth documents:**  
- `CURRENT_STATE.md`
- `PRD_MVP_WEBAPP.md`
- `DATA_MODEL.md`
- `SCREEN_ROUTE_MAP.md`

**Reopen only if:**  
A major product-model redesign is explicitly approved.

---

## D-012 — Protected contact is the default for owned pets

**Status:** Active  
**Area:** Trust and safety / contact

**Decision:**  
Protected contact is the default for owned pets.

**Rationale:**  
Owner privacy and safe coordination matter more than maximum openness.

**Practical implications:**  
- public flows should prefer protected contact
- direct owner contact must not be the default public state
- protected contact must become a real first-class capability before honest beta

**Source-of-truth documents:**  
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `PRD_MVP_WEBAPP.md`
- `PUBLIC_DATA_POLICY.md`
- `TRUST_AND_SAFETY.md`

**Reopen only if:**  
A formal trust/safety decision changes the contact model.

---

## D-013 — Public location must remain approximate, not exact

**Status:** Active  
**Area:** Public data / trust and safety

**Decision:**  
Public location must remain approximate, not exact.

**Rationale:**  
Exact public location creates privacy, fraud, and unsafe-contact risk.

**Practical implications:**  
- map and case visibility must use approximate public area only
- exact coordination data must stay inside protected flows where appropriate
- public rendering and serializers must enforce this consistently

**Source-of-truth documents:**  
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `PRD_MVP_WEBAPP.md`
- `PUBLIC_DATA_POLICY.md`
- `TRUST_AND_SAFETY.md`
- `DATA_MODEL.md`

**Reopen only if:**  
A formal public-data policy change is approved, which should be treated as high risk.

---

## D-014 — Public exposure should remain minimal and controlled

**Status:** Active  
**Area:** Public data / privacy

**Decision:**  
PETTODO should expose only the minimum public information necessary to identify, recover, or safely support an animal.

**Rationale:**  
The product is privacy-first and trust-sensitive.

**Practical implications:**  
- owner private data is not public by default
- public views differ by profile type and workflow risk
- shared/public records still require control, evidence, and review where needed

**Source-of-truth documents:**  
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `PUBLIC_DATA_POLICY.md`
- `TRUST_AND_SAFETY.md`

**Reopen only if:**  
A major privacy/trust model change is explicitly approved.

---

## D-015 — AI is part of the product direction, but not the sole authority in trust-sensitive actions

**Status:** Active  
**Area:** AI / trust and safety

**Decision:**  
AI is part of PETTODO’s product direction, but sensitive trust-based actions cannot be delegated fully to AI.

**Rationale:**  
AI is useful for photo analysis, matching, extraction, and bounded assistance, but not all trust-sensitive outcomes should be automated.

**Practical implications:**  
- AI should support matching, image analysis, quality checks, and bounded assistance
- sensitive shared-record and trust actions may require human, moderator, or community confirmation
- the product must avoid false certainty claims

**Source-of-truth documents:**  
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `PRD_MVP_WEBAPP.md`
- `TRUST_AND_SAFETY.md`
- `ARCHITECTURE.md`

**Reopen only if:**  
The AI authority model changes formally after strong evidence and trust review.

---

## D-016 — Azure must carry serious operational weight in v1

**Status:** Active  
**Area:** Architecture / infrastructure

**Decision:**  
Azure should carry meaningful operational responsibilities in v1.

**Rationale:**  
Azure should not be decorative. It is part of the serious operational architecture for PETTODO.

**Practical implications:**  
- Azure Blob Storage for media/assets
- Azure Database for PostgreSQL as primary transactional system of record
- Azure Functions for async/background work
- Azure Key Vault for secrets source of truth
- possible later Azure Communication Services when actually needed

**Source-of-truth documents:**  
- `ARCHITECTURE.md`
- `ENVIRONMENTS_PUBLIC.md`

**Reopen only if:**  
The architecture direction is formally revised.

---

## D-017 — Google must carry real identity and AI weight in v1

**Status:** Active  
**Area:** Architecture / identity / AI

**Decision:**  
Google services should carry real identity and AI responsibilities in v1.

**Rationale:**  
They provide low-friction onboarding and credible multimodal/AI capability without making AI the whole product.

**Practical implications:**  
- Firebase Auth as the primary auth system direction
- Vertex AI / Gemini as the current AI provider path
- implementation should preserve internal contracts so provider switching remains possible later

**Source-of-truth documents:**  
- `ARCHITECTURE.md`
- `ENVIRONMENTS_PUBLIC.md`

**Reopen only if:**  
The identity or AI provider strategy changes formally.

---

## D-018 — Core product state must live outside Replit-local storage

**Status:** Active  
**Area:** Architecture / persistence

**Decision:**  
Replit remains the current delivery environment, but the real product state must not depend on Replit-local storage or local-only browser truth.

**Rationale:**  
A real multi-user pilot system needs an external system of record.

**Practical implications:**  
- localStorage and local-first behavior must be replaced in critical paths
- PostgreSQL is the direction for serious transactional state
- real persistence is a core beta blocker

**Source-of-truth documents:**  
- `CURRENT_STATE.md`
- `ARCHITECTURE.md`
- `WEBAPP_REPLIT.md`
- `BACKLOG.md`

**Reopen only if:**  
The system-of-record strategy changes formally.

---

## D-019 — Landing must present PETTODO as a real web app ready for first users

**Status:** Active  
**Area:** Landing / messaging

**Decision:**  
The landing should present PETTODO as a real web app ready for first users.

**Rationale:**  
The product is beyond “just an idea,” but it should not be overclaimed as a fully mature nationwide platform.

**Practical implications:**  
- do not frame PETTODO as only a pilot concept or unfinished mockup
- do not overpromise scale or maturity
- keep messaging aligned with current implementation truth

**Source-of-truth documents:**  
- `LANDING_LOVABLE.md`
- `LOVABLE_PROMPT_TEMPLATE.md`
- `RELEASE_CRITERIA.md`

**Reopen only if:**  
The public positioning strategy changes materially.

---

## D-020 — Primary landing CTA is “Prueba PETTODO ahora”

**Status:** Active  
**Area:** Landing / CTA

**Decision:**  
The primary landing CTA is `Prueba PETTODO ahora`, and it should direct users to the PETTODO web app.

**Rationale:**  
The CTA must reinforce that PETTODO is a real product users can start trying now.

**Practical implications:**  
- keep CTA in the hero and near the end of the landing
- do not swap this casually for softer or vaguer CTA logic
- landing iterations should preserve CTA discipline unless explicitly changed

**Source-of-truth documents:**  
- `LANDING_LOVABLE.md`
- `LOVABLE_PROMPT_TEMPLATE.md`

**Reopen only if:**  
The landing conversion strategy is formally changed.

---

## D-021 — Current brand direction is blue + green, trustworthy-first, with the approved logo artwork as source of truth

**Status:** Active  
**Area:** Brand

**Decision:**  
The current approved brand direction uses blue + green, with a slightly trust-first tone and the approved logo artwork as the visual source of truth.

**Rationale:**  
The brand must feel trustworthy, useful, modern, and calm rather than childish, alarmist, or generic.

**Practical implications:**  
- trust blue + care green remain the brand direction
- red is alert/status only, not the primary brand color
- current logo artwork is the visual truth until final production extraction is done
- landing and app work should follow this direction

**Source-of-truth documents:**  
- `BRAND_SYSTEM.md`
- `LANDING_LOVABLE.md`
- `LOVABLE_PROMPT_TEMPLATE.md`

**Reopen only if:**  
There is a formal brand revision.

---

## D-022 — Release honesty matters as much as release functionality

**Status:** Active  
**Area:** Release / communication

**Decision:**  
PETTODO must be described honestly at release time and must not imply that prototype-only capabilities are already fully real.

**Rationale:**  
A strong prototype can still mislead if communication overstates maturity.

**Practical implications:**  
- release claims must match actual implementation
- landing and product copy must not overstate readiness
- a screen existing is not proof of a real capability

**Source-of-truth documents:**  
- `RELEASE_CRITERIA.md`
- `CURRENT_STATE.md`
- `WEBAPP_REPLIT.md`

**Reopen only if:**  
The release-communication standard changes formally, which is unlikely and not recommended.

---

## 7. Pending decision areas not yet fully locked

These areas are real, but not fully finalized enough to be logged as active final decisions yet.

### PD-001 — Exact moderation thresholds
**Status:** Pending  
**Area:** Trust and safety

The project has strong moderation and review direction, but not all exact thresholds are fixed.

### PD-002 — Exact evidence thresholds by action type
**Status:** Pending  
**Area:** Trust and safety / Community Dogs

Evidence-backed logic is clearly required, but exact thresholds remain open.

### PD-003 — Final production hex extraction from approved logo artwork
**Status:** Pending  
**Area:** Brand system

The brand direction is approved, but exact final production hex values still need extraction from the master artwork.

### PD-004 — Exact future split between preview and dev if needed later
**Status:** Pending  
**Area:** Environments / ops

Current working model uses `preview/dev` together for this phase.

### PD-005 — Exact future provider-switch migration details
**Status:** Pending  
**Area:** AI / architecture

Provider-agnostic direction is active, but specific future migration mechanics remain implementation detail.

---

## 8. How to add future decisions

When adding a new entry, use this structure:

### D-XXX — Decision title

**Status:** Active / Superseded / Clarified / Rejected / Pending  
**Area:**  
[product / architecture / trust-safety / brand / landing / release / build / etc.]

**Decision:**  
[Write the actual decision]

**Rationale:**  
[Why this decision was made]

**Practical implications:**  
- [implication]
- [implication]

**Source-of-truth documents:**  
- `DOCUMENT.md`
- `DOCUMENT.md`

**Reopen only if:**  
[What would justify revisiting this decision]

---

## 9. Update rules for future use

When a decision changes:

- do not silently overwrite the old one
- mark the old entry as superseded
- add the new entry
- update the affected stable docs
- reflect the change in `CHANGELOG_SUMMARY.md`
- mention it in the relevant handoff if the change happened during a session

When a decision becomes clearer but does not fundamentally change:

- keep the original entry active
- mark the update as a clarification if needed

---

## 10. Final rule

This log exists to reduce wasteful re-decision.

If a future session wants to revisit something already listed here, it should do so only because:
- implementation reality exposed a contradiction
- trust/safety requires a better answer
- product strategy truly changed
- a formal new decision replaced the old one

Not because the project forgot what it had already decided.
