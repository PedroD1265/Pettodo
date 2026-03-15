# REPLIT_PROMPT_TEMPLATE

Purpose:
Define the official prompt template and operating format for meaningful PETTODO implementation work in Replit, so build sessions stay aligned with product truth, architecture, trust/safety rules, beta priorities, and documentation discipline.

What belongs here:
- standard Replit prompt structure
- mandatory sections every meaningful Replit prompt should include
- task-type prompt variants
- context-bundle guidance for Replit work
- anti-drift and anti-overclaim rules
- output expectations after each Replit session
- review and follow-up prompt guidance
- operator usage notes

Update rule:
Update when PETTODO’s Replit workflow, MVP build priorities, context protocol, or implementation-reporting expectations materially change.

---

## 1. Why this document exists

PETTODO already has a strong Replit-built product base.

The main challenge now is not inventing more UI.
The main challenge is using Replit in a disciplined way to turn prototype depth into real product truth.

This document exists to make sure Replit prompts:

- start from approved documentation
- stay inside the right scope
- do not reopen settled product decisions
- do not drift into fake-smart or demo-only expansion
- produce useful implementation output
- leave enough information for review, QA, and handoff

This is the official prompt-construction template for Replit work in the current phase.

It is not the PRD.
It is not the backlog.
It is not the review result.
It is not the session handoff.

---

## 2. What this document is and is not

## This document is

- the official template for writing meaningful Replit prompts
- an execution bridge between approved docs and build tasks
- a way to standardize scope, constraints, and acceptance criteria
- a way to reduce drift and vague implementation asks

## This document is not

- a substitute for reading the right docs
- a guarantee that Replit will implement perfectly
- a replacement for technical review
- a release approval document
- permission to skip QA or handoff discipline

---

## 3. Core rule

A good Replit prompt for PETTODO is not a casual request.

It is a constrained implementation brief.

That means every meaningful Replit prompt should make clear:

- what the task is
- what the goal is
- what is in scope
- what is out of scope
- what must not be changed
- which docs are the source of truth
- how success will be evaluated
- what Replit must report back

If the prompt is vague, the output will drift.

---

## 4. Mandatory prompt-building rules

Every meaningful Replit prompt should:

- be written as an implementation brief, not as brainstorming
- assume core product decisions are already made
- tell Replit to build within approved constraints
- use the minimum correct context bundle
- explicitly forbid product drift and fake behavior expansion
- distinguish real implementation from prototype-only logic
- include acceptance criteria
- require a structured report of what changed
- require honesty about what remains simulated or partial

Do not send vague prompts like:

- "make this better"
- "finish the app"
- "make the backend real"
- "connect everything"
- "improve the UX"
- "add AI"

Those prompts create drift, hidden assumptions, and messy reviews.

---

## 5. Standard operating flow for Replit work

Use this sequence whenever possible.

### Step 1
Identify the task type.

Examples:
- auth
- persistence
- profile
- QR/public profile
- case flow
- image/media
- matching
- protected contact
- Community Dogs
- moderation/admin
- deployment/integration
- refactor/fix

### Step 2
Load the minimum correct context bundle.

Always start from:
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `ARCHITECTURE.md`

Then add only the relevant workstream docs for the task.

### Step 3
Write a mini-spec before the prompt.

The mini-spec should define:
- objective
- scope
- out of scope
- protected rules
- dependencies
- acceptance criteria

### Step 4
Send the structured implementation prompt to Replit.

### Step 5
Review Replit’s result.

Check:
- what became real
- what remains simulated
- what files changed
- what broke
- what needs follow-up
- what docs may need updating

### Step 6
Prepare either:
- a correction prompt
- a hardening prompt
- a cleanup/refactor prompt
- a documentation update set
- a handoff

---

## 6. Context bundle rule

Do not give Replit the full docs tree by default.

Use the minimum correct context bundle.

### Always include
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `ARCHITECTURE.md`
- `WEBAPP_REPLIT.md`

### Add depending on task type

#### Auth / route protection
- `PRD_MVP_WEBAPP.md`
- `SCREEN_ROUTE_MAP.md`
- `TRUST_AND_SAFETY.md`
- `RELEASE_CRITERIA.md`

#### Persistence / backend / DB
- `PRD_MVP_WEBAPP.md`
- `DATA_MODEL.md`
- `RELEASE_CRITERIA.md`
- `ENVIRONMENTS_PUBLIC.md`

#### QR / public profile / public case / map
- `PRD_MVP_WEBAPP.md`
- `SCREEN_ROUTE_MAP.md`
- `PUBLIC_DATA_POLICY.md`
- `TRUST_AND_SAFETY.md`
- `DATA_MODEL.md`

#### Community Dogs
- `PRD_MVP_WEBAPP.md`
- `DATA_MODEL.md`
- `PUBLIC_DATA_POLICY.md`
- `TRUST_AND_SAFETY.md`
- `SCREEN_ROUTE_MAP.md`
- `COMMUNITY_DOGS.md` when available

#### Matching / AI
- `PRD_MVP_WEBAPP.md`
- `DATA_MODEL.md`
- `TRUST_AND_SAFETY.md`
- `AI_MATCHING.md` when available

#### Moderation / review / protected workflows
- `PUBLIC_DATA_POLICY.md`
- `TRUST_AND_SAFETY.md`
- `DATA_MODEL.md`
- `SCREEN_ROUTE_MAP.md`

#### Deploy / environment / integration
- `ENVIRONMENTS_PUBLIC.md`
- `RELEASE_CRITERIA.md`
- `QA_CURRENT.md`

### Continuity
Only include the latest relevant handoff if continuity matters for the task.

---

## 7. Information every meaningful Replit prompt should contain

Before sending a meaningful Replit prompt, define:

- task type
- exact objective
- exact scope
- out of scope
- product truths that must not be broken
- trust/privacy rules that must remain intact
- technical constraints
- docs used as source of truth
- acceptance criteria
- required output report format

If one of these is missing, fill it before sending.

---

## 8. Prompt variables that the operator should fill

Before sending a prompt to Replit, define:

- **Task type**
- **Main objective**
- **Exact scope**
- **Out of scope**
- **Why this matters now**
- **Protected elements**
- **Constraints**
- **Source-of-truth docs**
- **Routes/modules likely affected**
- **Data model or route implications**
- **Environment/integration assumptions**
- **Acceptance criteria**
- **Required report format**
- **Docs that may need updating after implementation**

---

## 9. Prompt customization checklist

Before sending a Replit prompt, make sure the following are filled:

- [ ] exact task type
- [ ] exact implementation objective
- [ ] scope is narrow enough to review
- [ ] out of scope is explicitly stated
- [ ] relevant docs are listed
- [ ] product truths that must not change are listed
- [ ] trust/privacy constraints are listed
- [ ] real-vs-demo honesty rule is included
- [ ] acceptance criteria are testable
- [ ] report-back format is included
- [ ] likely files/routes/modules are named when known
- [ ] environment assumptions are named when relevant
- [ ] docs potentially affected after implementation are named

---

## 10. Fast-fill variables

Use this small block when preparing a specific prompt.

### Prompt variables
- Task type:
- Main objective:
- Scope:
- Out of scope:
- Why now:
- Protected rules:
- Source-of-truth docs:
- Likely areas affected:
- Dependencies:
- Acceptance criteria:
- Report-back requirements:
- Docs to review/update after completion:

---

## 11. Allowed asks inside Replit prompts

It is valid to ask Replit for:

- real auth implementation
- real persistence integration
- route protection
- backend-backed profile and case flows
- QR/public profile implementation
- image upload/storage integration
- matching pipeline integration
- protected contact baseline
- Community Dog controlled contribution logic
- moderation/review baseline
- environment/config integration
- tests for critical flows
- cleanup/refactor tied to MVP blockers
- removing misleading demo-only behavior
- clearly marking what remains partial

---

## 12. Disallowed asks inside Replit prompts

Do not ask Replit to:

- invent product decisions not backed by docs
- silently redefine MVP scope
- present simulated behavior as real
- expose owner private data by default
- expose exact public location casually
- collapse profile, case, and match into one object
- turn Community Dogs into unrestricted public-edit records
- hardwire architecture-breaking shortcuts into the app
- overbuild non-core ecosystem areas before core blockers
- prioritize visual surface expansion over system reality
- claim production readiness without evidence
- rewrite major product logic without explicit doc grounding

---

## 13. Anti-drift rules

A Replit prompt for PETTODO must never drift into:

- generic “make the app more complete”
- UI-first expansion without real implementation value
- fake backend behavior disguised as real
- trust-sensitive shortcuts presented as harmless
- public/private boundary weakening
- architecture-breaking convenience hacks
- provider lock-in hidden inside UI logic
- “AI can do everything” framing
- marketplace-first or social-first expansion before the beta core is real

If the prompt allows too much ambiguity, rewrite it before sending.

---

## 14. Mandatory protection block to include in most prompts

Use a version of this block in most meaningful prompts.

### Protected rules
- Do not break PETTODO’s core truth that it is not only a lost-pet app.
- Do not collapse animal profile, case, and match result into one model.
- Protected contact remains the default for owned pets.
- Public location must remain approximate, not exact.
- Do not expose owner private data by default.
- Do not present simulated behavior as real.
- Do not weaken trust/safety language or public/private boundaries.
- Do not add unrelated new features outside the defined scope.

---

## 15. Required output format from Replit

Every meaningful Replit prompt should ask for a structured response containing:

- what was implemented
- what was partially implemented
- what remains simulated
- files changed
- routes/components/modules affected
- external services integrated or changed
- tests run
- known issues
- follow-up recommendations
- docs that may now need updating

If this is missing, review becomes harder and handoff quality drops.

---

## 16. Reusable master prompt template for meaningful Replit work

Use this when preparing a serious implementation prompt.

---

### TEMPLATE — MEANINGFUL REPLIT IMPLEMENTATION TASK

Act as the implementation agent for PETTODO’s Replit webapp workstream.

You are not redefining the product.
You are implementing a constrained task inside the approved PETTODO documentation.

## Task type
[fill here]

## Objective
[fill here]

## Why this matters now
[fill here]

## Scope
[fill here]

## Out of scope
[fill here]

## Source-of-truth documents
Use these as the authoritative source of truth for this task:
- [doc 1]
- [doc 2]
- [doc 3]
- [doc 4]

## Important product and trust constraints
- PETTODO is not only a lost-pet app.
- Do not collapse animal profile, case, and match into the same thing.
- Protected contact is the default for owned pets.
- Public location must remain approximate.
- Do not expose owner personal data by default.
- Do not invent features or product behavior not supported by the docs.
- Do not present simulated behavior as real if it remains partial.
- Do not weaken public/private boundaries or trust-safe language.

## Technical constraints
[fill here]

## Likely areas affected
[fill here]

## Acceptance criteria
[fill here]

## Implementation instruction
Implement this task inside the current Replit codebase in the most direct, clean, and reviewable way possible.
Prefer real progress on core MVP truth over surface-level expansion.
Avoid architecture drift and avoid unnecessary complexity.

## Required report back
When finished, respond with:
1. what you implemented
2. what is only partially implemented
3. what remains simulated or not real
4. files changed
5. routes/components/modules affected
6. tests run
7. known issues or risks
8. recommended next step
9. which docs may need updating based on the new implementation reality

---

## 17. Task-type prompt add-ons

Use these add-ons depending on the task.

### 17.1 Auth task add-on
Add:
- enforce real session handling
- protect account-required routes
- separate public vs authenticated behavior clearly
- do not leave fake auth fallbacks in core paths unless explicitly marked

### 17.2 Persistence / DB task add-on
Add:
- move core truth away from local-only state
- keep canonical entities aligned with DATA_MODEL.md
- avoid schema shortcuts that collapse profile/case/match separation

### 17.3 QR / public profile add-on
Add:
- public output must remain minimal and safe
- QR must resolve to real record-backed output
- report-sighting entry must remain available when applicable

### 17.4 Case-flow add-on
Add:
- keep case state separate from animal identity
- support lost / found / sighted distinctions correctly
- do not overwrite animal truth with case truth

### 17.5 Image/media add-on
Add:
- connect media to real records
- avoid local-only fake persistence
- keep public/private media behavior controlled

### 17.6 Matching add-on
Add:
- present matches as suggestions, not proof
- keep caution framing strong
- include reason/ranking explanation where possible
- do not imply guaranteed identity

### 17.7 Protected contact add-on
Add:
- keep owner identity protected by default
- prefer relay-first behavior
- include basic auditability if the task touches contact flow

### 17.8 Community Dogs add-on
Add:
- do not implement unrestricted public editing
- use controlled creation/contribution behavior
- sensitive changes should support review-aware states

### 17.9 Moderation/admin add-on
Add:
- keep moderator/operator routes protected
- keep the scope minimal and functional
- focus on review and approval capability, not enterprise admin breadth

### 17.10 Deploy/environment add-on
Add:
- respect ENVIRONMENTS_PUBLIC.md
- avoid mixing production and non-production assumptions
- make environment usage explicit where relevant

### 17.11 Refactor/fix add-on
Add:
- do not change product behavior unless necessary
- explain what was behavior-preserving vs behavior-changing
- identify any hidden contradictions found during cleanup

---

## 18. Review checklist after each Replit iteration

After each iteration, review the result with these questions.

### Product truth
- Did the change stay aligned with approved docs?
- Did it avoid redefining scope or product logic?

### Real vs simulated
- What became materially real?
- What still remains partial or simulated?
- Is the result honest about that?

### Trust and privacy
- Were public/private boundaries preserved?
- Was any unsafe data exposure introduced?
- Was protected contact logic weakened?

### Architecture
- Did the change align with the architecture direction?
- Did it create local-only shortcuts that will cause future debt?

### Quality
- Is the flow stable enough to test?
- Did the change reduce a real blocker?
- Did it avoid demo-only expansion?

### Reporting
- Did Replit clearly report files changed, tests run, and remaining gaps?
- Is the result reviewable enough for follow-up?

---

## 19. Corrective follow-up prompt rule

After a Replit iteration, the next prompt should usually be one of these:

- correction prompt
- hardening prompt
- cleanup/refactor prompt
- integration completion prompt
- test coverage prompt
- documentation-alignment prompt

Do not default to “continue improving everything.”
That causes drift.

The next prompt should target the exact remaining gap.

---

## 20. Handoff note after Replit output

After a meaningful Replit session, the result should be converted into a short handoff including:

- task attempted
- prompt used
- what changed
- what became real
- what remains partial
- files or areas touched
- unresolved issues
- next recommended step
- stable docs that may need updates

This helps prevent Replit sessions from becoming shadow truth.

---

## 21. Output rule for operators

When using Replit, save or document:

- the prompt used
- what version/branch/build it affected
- what Replit said it changed
- what you confirmed independently
- what still failed review
- what the next correction prompt should focus on

This is especially important once core integrations become real.

---

## 22. Practical usage note

This file is not the implementation strategy by itself.

Use:
- `BACKLOG.md` to decide what should be worked on now
- `WEBAPP_REPLIT.md` to understand how Replit should be used
- `REPLIT_PROMPT_TEMPLATE.md` to write the actual execution prompt
- review/handoff docs to inspect the result and preserve continuity

---

## 23. Final rule

A PETTODO Replit prompt should not ask for more noise.

It should ask for controlled, reviewable progress on real MVP truth.

If a prompt makes the app look busier without making the system more real, safer, or more testable, it is the wrong prompt.
