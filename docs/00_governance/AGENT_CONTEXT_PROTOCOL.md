# AGENT_CONTEXT_PROTOCOL

Purpose:
Define the official context-reading and context-usage protocol for any agent, operator, or session working on PETTODO, so work can continue consistently without reopening settled decisions, overloading context unnecessarily, or drifting away from approved project documents.

What belongs here:
- official reading order for PETTODO docs
- required context bundles by task type
- stable-docs vs handoff usage rules
- anti-drift rules
- certainty and evidence usage rules
- archive/legacy usage rules
- context-minimization rules
- session-start and session-close protocol

Update rule:
Update when the PETTODO documentation structure, source-of-truth hierarchy, workstream model, or session workflow changes materially.

---

## 1. Why this document exists

PETTODO already has enough documentation and product depth that careless context usage can slow work down, fragment decisions, or reintroduce confusion.

This document exists to make sure that any agent or operator working on PETTODO:

- starts from the right source of truth
- reads only the minimum necessary context
- does not reopen decisions that are already stable
- does not confuse future vision with implemented reality
- does not treat handoffs as stronger than stable docs
- can move from planning to execution to handoff with less friction

This is a governance document for working correctly inside PETTODO.

It is not a product, build, or legal specification.

---

## 2. Core rule

Every PETTODO task should begin with the **minimum correct context bundle**, not with “read everything.”

The goal is:
- enough context to work correctly
- not so much context that the session becomes slow, noisy, or confused

More context is not automatically better.

Correct context is better.

---

## 3. Source-of-truth hierarchy

When working on PETTODO, treat documents in this order of authority:

### Level 1 — Stable project truth
These are the strongest documents:
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`

### Level 2 — Stable workstream truth
These are the documents that define the current truth for a specific domain:
- `PRD_MVP_WEBAPP.md`
- `PUBLIC_DATA_POLICY.md`
- `TRUST_AND_SAFETY.md`
- `BRAND_SYSTEM.md`
- `ARCHITECTURE.md`
- `QA_CURRENT.md`
- `RELEASE_CRITERIA.md`
- other approved workstream docs

### Level 3 — Session continuity documents
These are continuity tools, not stronger truth:
- latest relevant handoff
- latest relevant review notes
- latest relevant task packet
- latest relevant diff/review record

### Level 4 — Archive / legacy materials
These may help with background, but they do not override current approved docs:
- legacy notes
- old audits
- old iteration logs
- old research conversations
- archived self-checks or execution logs

### Conflict rule
If a handoff, archive note, or older conversation conflicts with a stable approved doc, the stable approved doc wins.

---

## 4. Mandatory reading order

Unless the task is extremely small and purely local, the standard reading order is:

1. `MASTER_CONTEXT.md`
2. `CURRENT_STATE.md`
3. the specific workstream document for the task
4. the latest relevant handoff

If the task is technical implementation, the next technical source of truth is usually:
- `ARCHITECTURE.md`

If the task is landing/marketing, the next workstream sources are usually:
- `LANDING_LOVABLE.md`
- `LOVABLE_PROMPT_TEMPLATE.md`
- `REVIEW_DIFF_TEMPLATE.md`

If the task is trust-sensitive, the next workstream sources are usually:
- `PUBLIC_DATA_POLICY.md`
- `TRUST_AND_SAFETY.md`

---

## 5. Base context every agent should assume

Unless explicitly contradicted by approved docs, every agent should begin with these stable assumptions:

- PETTODO is a community network for managing and recovering pets
- PETTODO is not only a lost-pet app
- PETTODO is currently a very advanced frontend prototype / demo-functional web app, not yet a fully real multi-user production system
- PETTODO is being built with a real pilot mindset for Cochabamba
- protected contact is the default for owned pets
- public exposure should be minimal and trust-sensitive
- AI is part of the product direction, but AI does not replace all human/community validation
- future vision must not be treated as current implementation reality

These assumptions come from stable project truth and should not be re-debated by default.

---

## 6. Context minimization rule

Agents should **not** read the full documentation tree by default.

Instead, they should read:

- the mandatory base docs
- the workstream-specific docs actually needed for the task
- the latest relevant handoff only if continuity is needed

Do not read unrelated docs just because they exist.

Examples:
- a landing copy task does not need full build architecture
- a PostgreSQL schema task does not need landing prompt templates
- a trust-policy task does not need detailed UI route maps unless the UI behavior is the issue

---

## 7. Task-specific context bundles

Use the following bundles as the default.

---

## 7.1 Product / scope task

Read:
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `PRD_MVP_WEBAPP.md`
- latest relevant handoff

Use when:
- clarifying scope
- checking MVP boundaries
- reviewing product direction
- resolving product ambiguity

---

## 7.2 Replit / webapp implementation task

Read:
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `ARCHITECTURE.md`
- `WEBAPP_REPLIT.md` when available
- `SCREEN_ROUTE_MAP.md` when available
- `DATA_MODEL.md` when available
- latest relevant handoff

Use when:
- implementing frontend/backend flows
- connecting auth, DB, storage, cases, QR, or matching
- making structural app changes
- planning execution in Replit

---

## 7.3 Architecture / infra task

Read:
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `ARCHITECTURE.md`
- `RELEASE_CRITERIA.md`
- latest relevant handoff

Add if relevant:
- `PUBLIC_DATA_POLICY.md`
- `TRUST_AND_SAFETY.md`

Use when:
- refining stack decisions
- infra planning
- auth/storage/AI architecture
- deployment/environment decisions
- migration planning beyond Replit

---

## 7.4 Trust / public-data / moderation task

Read:
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `PUBLIC_DATA_POLICY.md`
- `TRUST_AND_SAFETY.md`
- `ARCHITECTURE.md` if implementation matters
- latest relevant handoff

Use when:
- deciding public/private behavior
- protected contact logic
- Community Dog governance
- moderation/review states
- abuse/safety flows

---

## 7.5 QA / release task

Read:
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `QA_CURRENT.md`
- `RELEASE_CRITERIA.md`
- latest relevant handoff

Add if relevant:
- `ARCHITECTURE.md`
- workstream-specific doc for the flow being tested

Use when:
- evaluating readiness
- checking blockers
- distinguishing prototype validation vs real beta readiness
- reviewing implementation truth

---

## 7.6 Landing / Lovable task

Read:
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `BRAND_SYSTEM.md`
- `LANDING_LOVABLE.md`
- `LOVABLE_PROMPT_TEMPLATE.md`
- latest relevant handoff
- `REVIEW_DIFF_TEMPLATE.md` if iterating or reviewing

Use when:
- generating landing prompts
- reviewing landing output
- correcting landing drift
- preserving brand/message/CTA consistency

---

## 7.7 Data / model / backend task

Read:
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `ARCHITECTURE.md`
- `DATA_MODEL.md` when available
- `PUBLIC_DATA_POLICY.md` if visibility rules matter
- `TRUST_AND_SAFETY.md` if moderation/review logic matters
- latest relevant handoff

Use when:
- designing tables/entities
- implementing persistence
- separating animal profile / case / match result
- storing review/moderation states
- designing media/matching records

---

## 8. Stable docs vs handoffs

### 8.1 Stable docs
Stable docs define the current approved truth of the project.

Examples:
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `PRD_MVP_WEBAPP.md`
- `ARCHITECTURE.md`

### 8.2 Handoffs
Handoffs exist to preserve session continuity.

They should capture:
- what was done
- what changed
- what remains open
- what the next session should do

### 8.3 Important rule
A handoff is not a stronger source of truth than a stable doc.

If a handoff contradicts a stable doc:
- the stable doc wins
- the contradiction should be corrected in the next work cycle

### 8.4 Duplication rule
Handoffs should not duplicate entire stable docs.
They should point to them.

---

## 9. Archive / legacy usage rule

Archive and legacy materials may be used:
- for background
- for rationale history
- for recovering earlier thinking
- for tracing why something changed

They must not be used:
- as stronger truth than current approved docs
- as permission to reopen decisions already closed
- as evidence that an old path is still active

If legacy material contradicts current approved docs, current approved docs win.

---

## 10. Anti-drift rules

Agents working on PETTODO must not:

- treat future vision as current implementation reality
- reopen settled product decisions without a real contradiction
- invent features not supported by current docs or explicit user decisions
- overread unrelated docs just because they exist
- use handoffs as if they were the master source of truth
- confuse product truth with hackathon, grant, or pitch framing unless the task explicitly requires that
- mix owned-pet logic and Community Dog logic carelessly
- present AI as universal certainty
- assume the prototype is already a fully real production system

---

## 11. Certainty rule

When documenting or reasoning about PETTODO, agents must use the certainty policy consistently:

- **[confirmed]** = directly supported by current approved docs or explicit current user decisions
- **[probable]** = strong interpretation, but not fully locked
- **[unknown]** = not yet decided or not yet evidenced clearly enough

Do not invent certainty.

Do not present “recommended” as “already implemented.”

---

## 12. Session start protocol

At the start of a meaningful session, the agent should do this:

### Step 1
Identify the task type:
- product
- build/Replit
- architecture
- landing
- policy/trust
- QA/release
- data/backend
- other

### Step 2
Read the mandatory base docs:
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`

### Step 3
Read the specific workstream docs needed for that task.

### Step 4
Read the latest relevant handoff only if the task depends on prior session continuity.

### Step 5
State or infer:
- what is already confirmed
- what remains open
- what should not be changed casually

### Step 6
Proceed with the task using the minimum sufficient context.

---

## 13. Session close protocol

At the end of a meaningful session, the agent should decide:

### A. Did a stable project truth change?
If yes:
- update the relevant stable doc

### B. Did only the session state change?
If yes:
- create or update a handoff
- do not rewrite stable docs unnecessarily

### C. Did the task reveal a contradiction?
If yes:
- state it clearly
- identify which doc should be corrected
- do not silently patch around it

### D. Did the task produce an actionable next step?
If yes:
- leave it in the handoff

---

## 14. Doc update rule

Update a stable doc only when:
- a real decision changed
- real implementation truth changed
- the approved strategy changed
- the prior document became materially incomplete or contradictory

Do not update stable docs just because:
- a session happened
- a prompt was tried
- a thought was discussed
- a possible future idea appeared

Stable docs should change less often than handoffs.

---

## 15. Workstream document rule

Each meaningful task should identify its workstream document.

Examples:
- landing task → `LANDING_LOVABLE.md`
- Replit build task → `WEBAPP_REPLIT.md`
- architecture task → `ARCHITECTURE.md`
- trust task → `TRUST_AND_SAFETY.md`
- public visibility task → `PUBLIC_DATA_POLICY.md`
- QA task → `QA_CURRENT.md`
- release task → `RELEASE_CRITERIA.md`

If the relevant workstream doc does not exist yet:
- use the nearest approved source of truth
- do not invent a shadow document implicitly
- recommend creating the missing doc if it is becoming a blocker

---

## 16. Rule for Replit workflow

For work executed through Replit, the context protocol should be especially strict.

Minimum expected flow:

1. read `MASTER_CONTEXT.md`
2. read `CURRENT_STATE.md`
3. read `ARCHITECTURE.md`
4. read the relevant build doc(s), such as:
   - `WEBAPP_REPLIT.md`
   - `SCREEN_ROUTE_MAP.md`
   - `DATA_MODEL.md`
   - `ENVIRONMENTS_PUBLIC.md`
5. read latest relevant handoff
6. define mini-spec
7. execute
8. review result
9. update stable doc only if project truth changed
10. leave handoff

This prevents Replit work from drifting into undocumented local improvisation.

---

## 17. Fast decision rule

When an agent is unsure whether to read more context, ask:

1. Is this document required to avoid making a wrong decision?
2. Is this document directly relevant to the task type?
3. Does the latest handoff explicitly point to it?
4. Will skipping it create a high chance of contradiction?

If the answer is mostly no, do not load more context.

---

## 18. Final rule

PETTODO should be worked on through disciplined context use, not through maximum context accumulation.

The right goal is not:
“read everything.”

The right goal is:
“read the right things, in the right order, for the right task.”
