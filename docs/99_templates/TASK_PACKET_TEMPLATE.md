# TASK_PACKET_TEMPLATE

Purpose:
Provide the official task packet format for PETTODO so meaningful work can move from backlog to execution in a controlled, reviewable, and documentation-aligned way across ChatGPT, Replit, Antigravity, QA, and future collaborators.

What belongs here:
- standard task packet structure
- required fields for implementation-ready tasks
- task packet rules for scope, constraints, and acceptance criteria
- task packet variants for Replit, review, QA, and documentation work
- rules for linking backlog, risks, prompts, handoffs, and docs
- operator instructions for preparing and using task packets

Update rule:
Update when PETTODO’s execution workflow, task readiness standard, review discipline, or cross-tool collaboration process changes materially.

---

## 1. Why this template exists

PETTODO already has:

- a defined product direction
- a strong documentation base
- a prioritized backlog
- a Replit execution workflow
- a session handoff workflow

What is still needed is the operational bridge between:

- a backlog item
- a specific implementation or review task
- the correct source-of-truth docs
- the exact prompt or instruction to execute
- the follow-up review and documentation updates

This template exists to create that bridge.

A task packet should make it possible to answer, before work begins:

- what exactly is being done
- why it is being done now
- what is and is not in scope
- what the task must not break
- what docs control the task
- how success will be judged
- what must happen after the task is finished

This file is not the backlog.
It is not the prompt template.
It is not the handoff.
It is the execution packet that connects them.

---

## 2. Core rule

A task packet is the smallest serious unit of controlled work.

A good task packet should let an operator or tool start the task without guessing:

- the objective
- the boundaries
- the constraints
- the expected output
- the review standard
- the documentation impact

If the next operator still has to infer the real scope, the packet is not good enough.

---

## 3. When to create a task packet

Create a task packet when:

- a backlog item is ready to become real work
- a Replit implementation task is about to begin
- a review/correction cycle needs a sharply defined scope
- a QA validation task needs clear boundaries
- a documentation task affects execution or truth
- a task will pass between tools or operators
- the work is important enough that vague prompting would create drift

Do not create a full task packet for every tiny micro-step.
Use it for meaningful, reviewable units of work.

---

## 4. What a task packet should accomplish

A good task packet should:

- reduce ambiguity
- prevent scope drift
- preserve settled project decisions
- protect trust/privacy constraints
- identify the correct source docs
- make follow-up review easier
- make the next prompt easier to write
- make documentation updates easier after the task finishes

A task packet should not:

- redefine the product
- reopen settled decisions casually
- mix multiple large workstreams without control
- hide missing dependencies
- pretend a task is ready when it is not

---

## 5. Relationship to other documents

Use this template together with:

- `BACKLOG.md` to know what should be worked on now
- `RISKS_BLOCKERS.md` to know what the task is reducing or must avoid worsening
- `REPLIT_PROMPT_TEMPLATE.md` to turn the packet into a build prompt
- `SESSION_HANDOFF_TEMPLATE.md` to record what happened after execution
- `CURRENT_STATE.md` to stay honest about what is real now
- `QA_CURRENT.md` to align review and validation with actual testing truth
- `DECISION_LOG.md` to avoid reopening settled decisions
- workstream-specific docs such as:
  - `DATA_MODEL.md`
  - `SCREEN_ROUTE_MAP.md`
  - `ENVIRONMENTS_PUBLIC.md`
  - `PUBLIC_DATA_POLICY.md`
  - `TRUST_AND_SAFETY.md`
  - `COMMUNITY_DOGS.md` when available
  - `AI_MATCHING.md` when available

Important:
A task packet does not replace those docs.
It points to them and operationalizes them.

---

## 6. Task packet quality rules

A task packet should be:

- specific
- bounded
- grounded in approved docs
- small enough to review
- large enough to matter
- honest about readiness
- clear about dependencies
- clear about what must not change

A task packet should fail review if:

- the objective is vague
- scope is too broad
- source-of-truth docs are missing
- acceptance criteria are not testable
- trust/privacy constraints are omitted where relevant
- the task mixes unrelated workstreams carelessly
- the operator cannot tell what “done” means

---

## 7. Readiness states for a task packet

Use these states consistently.

### Draft
The task exists, but still needs clarification.

### Needs clarification
A real task is present, but one or more blocking ambiguities remain.

### Ready
The task is clear enough to execute.

### In execution
The task has started in Replit, review, QA, or documentation work.

### In review
Execution is finished enough for inspection and verification.

### Partially completed
Some meaningful progress happened, but the task is not complete.

### Completed for current phase
The task is sufficiently complete for the current MVP phase.

### Blocked
Execution cannot continue because of a dependency, contradiction, or missing decision.

### Deferred
The task is valid, but intentionally not prioritized right now.

---

## 8. Recommended packet types

Use one of these packet types.

- Replit implementation
- Replit correction
- Replit hardening
- Technical review
- QA validation
- Documentation
- Architecture clarification
- Prompt preparation
- Cross-tool handoff
- Release readiness check

Each packet should have one primary type.

---

## 9. Required fields in every serious task packet

Every meaningful task packet should define:

- task ID
- packet type
- title
- status
- priority
- related backlog item(s)
- related blocker(s) or risk(s)
- objective
- why now
- exact scope
- out of scope
- source-of-truth docs
- dependencies
- constraints and protected rules
- affected routes/modules/docs when known
- acceptance criteria
- expected output
- documentation update expectations
- next-step rule after execution

If one of these is missing, the packet is probably not ready.

---

## 10. Recommended task sizing rule

The best task packets for PETTODO usually:

- reduce one meaningful blocker or sub-blocker
- stay within one main workstream
- affect a limited set of routes/modules/entities
- produce a result that can be reviewed in one pass
- do not require hidden product invention

Examples of good scope:
- real auth route protection baseline
- persistent owned-pet profile creation
- QR public profile route backed by real data
- protected contact v1 relay structure
- preview/dev storage integration for profile and case images

Examples of bad scope:
- finish the whole app
- make everything production ready
- implement auth, DB, matching, moderation, and mobile polish at once
- improve all UX and AI features

---

## 11. Standard full task packet template

Use this structure for important implementation, review, QA, or documentation work.

---

# TASK_PACKET

Purpose:
Define one controlled PETTODO task so execution can proceed with clear scope, source-of-truth constraints, and review expectations.

What belongs here:
- exact task objective
- scope boundaries
- dependencies
- constraints
- acceptance criteria
- output expectations
- documentation follow-up requirements

Update rule:
Update when the task status changes materially, the scope changes materially, or the packet is blocked by new information.

---

## Task metadata

- Task ID:
- Packet type:
- Title:
- Status:
- Priority:
- Owner / operator:
- Date created:
- Target environment or branch:
- Related backlog item(s):
- Related blocker(s) or risk(s):
- Related handoff(s):
- Related prompt(s):

---

## 1. Objective

State the exact goal of the task.

Good examples:
- replace simulated auth on account-required routes with real session-aware route protection
- connect owned-pet profile creation to real persistence
- validate QR public profile rendering from real stored records in preview/dev

**Objective:**  
[Write here]

---

## 2. Why now

Explain why this task should happen now instead of later.

Examples:
- this is a P0 beta blocker
- this unblocks several downstream tasks
- current prototype behavior is misleading without this becoming real
- this is required before QA can validate the flow honestly

**Why now:**  
[Write here]

---

## 3. Exact scope

Define exactly what is included.

Examples:
- routes included
- flows included
- entities included
- integrations included
- docs included
- tests included

**Scope:**
- [item]
- [item]
- [item]

Rule:
Be explicit.
Do not leave scope implied.

---

## 4. Out of scope

State what this task must not expand into.

Examples:
- do not add unrelated settings work
- do not redesign the profile UI beyond what is needed
- do not implement full moderation suite
- do not change landing copy
- do not add new AI features

**Out of scope:**
- [item]
- [item]
- [item]

This section is mandatory for implementation tasks.

---

## 5. Source-of-truth documents

List only the documents that actually control this task.

Examples:
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `PRD_MVP_WEBAPP.md`
- `ARCHITECTURE.md`
- `WEBAPP_REPLIT.md`
- `DATA_MODEL.md`
- `SCREEN_ROUTE_MAP.md`
- `ENVIRONMENTS_PUBLIC.md`
- `PUBLIC_DATA_POLICY.md`
- `TRUST_AND_SAFETY.md`
- `BACKLOG.md`
- `RISKS_BLOCKERS.md`

**Source-of-truth docs:**
- [doc]
- [doc]
- [doc]

Important:
If the packet conflicts with these docs, the docs win.

---

## 6. Dependencies

List the things this task depends on.

Examples:
- environment variables exist
- Firebase auth configuration exists
- DB connection exists
- routes already exist in prototype form
- data model is already formalized
- prior task completed first

**Dependencies:**
- [dependency]
- [dependency]

If dependency status is uncertain, say so directly.

---

## 7. Constraints and protected rules

Use this section to protect settled PETTODO truths and trust-sensitive constraints.

Examples:
- PETTODO is not only a lost-pet app
- do not collapse profile, case, and match into one model
- protected contact remains default for owned pets
- public location must remain approximate
- do not expose owner data by default
- do not present simulated behavior as real
- do not invent new features outside the defined scope

**Protected rules:**
- [rule]
- [rule]
- [rule]

This section is mandatory for trust-sensitive or implementation tasks.

---

## 8. Affected areas

List the most likely areas touched.

Examples:
- routes
- components
- data entities
- storage integration
- auth logic
- review/admin surfaces
- docs likely impacted

**Likely affected areas:**
- [area]
- [area]
- [area]

If exact file names are unknown, describe the area clearly.

---

## 9. Acceptance criteria

Define how the task will be judged.

Good acceptance criteria are testable.

Examples:
- account-required routes redirect or block correctly when unauthenticated
- a created animal profile persists after refresh and re-entry
- QR route resolves to a real stored animal record
- public output respects visibility rules
- protected contact entry no longer exposes owner data directly

**Acceptance criteria:**
- [criterion]
- [criterion]
- [criterion]

Rule:
If it cannot be checked, it is not a good acceptance criterion.

---

## 10. Expected output from execution

State what the execution tool or operator must provide back.

Examples:
- what was implemented
- what remains partial
- files changed
- tests run
- known issues
- docs impacted
- next recommendation

**Expected output:**
- [output item]
- [output item]
- [output item]

---

## 11. Validation plan

State how the result should be reviewed or tested.

Examples:
- manual route check
- auth flow validation
- preview/dev verification
- code diff review
- regression test run
- screenshot validation
- QA pass on defined routes

**Validation plan:**
- [item]
- [item]

If validation is deferred, say so clearly.

---

## 12. Documentation impact

List which docs may need updates if the task succeeds or changes reality.

Examples:
- `CURRENT_STATE.md`
- `QA_CURRENT.md`
- `CHANGELOG_SUMMARY.md`
- `DECISION_LOG.md`
- `ARCHITECTURE.md`
- `DATA_MODEL.md`
- `SCREEN_ROUTE_MAP.md`
- `ENVIRONMENTS_PUBLIC.md`

**Docs to review/update after task:**
- [doc]
- [doc]
- [doc]

---

## 13. Completion rule

State what must be true before this packet can be marked complete for the current phase.

Examples:
- real behavior exists, not only UI
- validation confirms core criteria
- no protected rule was broken
- current-state truth can be updated honestly

**Completion rule:**  
[Write here]

---

## 14. Next-step rule if incomplete

State what should happen if the task is only partially completed.

Examples:
- create correction packet focused only on route protection edge cases
- create hardening packet for public/private boundary enforcement
- update handoff and keep packet in partially completed status
- do not open follow-up work until persistence is confirmed

**If incomplete, next step should be:**  
[Write here]

---

## 15. Notes

Use this section for compact, relevant operator notes only.

**Notes:**  
[Write here]

---

## 12. Replit implementation packet variant

Use this when the task will be executed in Replit.

---

# TASK_PACKET

Purpose:
Define one controlled PETTODO Replit implementation task so the build session stays aligned with approved scope, trust-safe constraints, and review expectations.

What belongs here:
- implementation objective
- scope and non-scope
- required docs
- protected rules
- acceptance criteria
- required report-back structure

Update rule:
Update when the packet scope changes materially, the task becomes blocked, or the implementation result changes the expected next step.

---

## Task metadata

- Task ID:
- Packet type: Replit implementation
- Title:
- Status:
- Priority:
- Branch or environment:
- Related backlog item:
- Related blocker or risk:
- Prompt status: [not written / draft / ready / used]
- Related handoff:

---

## 1. Replit task objective

State the exact implementation goal.

---

## 2. Why this task matters now

Link it to blocker reduction, MVP truth, or sequence dependency.

---

## 3. Exact implementation scope

List only what Replit should touch.

---

## 4. Explicitly out of scope

List what Replit must not expand into.

---

## 5. Required source-of-truth docs

List the exact docs Replit must follow.

---

## 6. Protected rules

Include the task-specific version of PETTODO’s protected product and trust rules.

---

## 7. Likely routes, modules, entities, or systems affected

List the important areas.

---

## 8. Acceptance criteria

Define what counts as success.

---

## 9. Required report back from Replit

Require:
- what was implemented
- what was partial
- what remains simulated
- files changed
- routes/modules affected
- tests run
- known issues
- next recommendation
- docs impacted

---

## 10. Review plan after Replit output

Examples:
- inspect diff
- validate route behavior
- check persistence
- confirm public/private boundaries
- prepare correction prompt if needed

---

## 11. Completion rule

Define what must be true before the packet is marked complete for the current phase.

---

## 13. Technical review packet variant

Use this when the work is mostly review, not build.

---

# TASK_PACKET

Purpose:
Define one controlled PETTODO technical review task so the operator can assess implementation quality, truthfulness, and alignment with source docs.

What belongs here:
- review target
- review questions
- source-of-truth docs
- failure conditions
- review output expectations

Update rule:
Update when the review target or scope changes materially.

---

## Task metadata

- Task ID:
- Packet type: Technical review
- Title:
- Status:
- Related implementation:
- Related handoff:
- Reviewer:
- Date:

---

## 1. Review objective

What exactly should be inspected?

---

## 2. Review target

Examples:
- a Replit implementation result
- a changed route group
- a new auth flow
- a public/private serializer behavior
- a documentation revision

---

## 3. Source-of-truth docs

List the docs the review must use.

---

## 4. Main review questions

Examples:
- did the implementation stay inside scope?
- what became real?
- what remains partial?
- did it break protected rules?
- is the architecture direction still intact?
- does UI overstate reality?
- what docs need updating?

---

## 5. Failure conditions

Examples:
- simulated behavior presented as real
- profile/case/match collapse
- unsafe public exposure
- architecture-breaking shortcut
- hidden scope drift
- no useful test evidence

---

## 6. Expected review output

Examples:
- pass / partial / fail
- issues list
- correction recommendations
- exact next prompt focus
- docs impacted

---

## 14. QA validation packet variant

Use this when the task is primarily validation.

---

# TASK_PACKET

Purpose:
Define one PETTODO QA validation task so testing stays focused on a specific flow, environment, and readiness question.

What belongs here:
- validation target
- test scope
- expected environment
- pass/fail criteria
- known limitations
- output expectations

Update rule:
Update when the validation target, environment, or expected pass criteria change materially.

---

## Task metadata

- Task ID:
- Packet type: QA validation
- Title:
- Status:
- Target environment:
- Related backlog item:
- Related blocker:
- Related handoff:

---

## 1. Validation objective

What is being validated and why?

---

## 2. Test scope

Which routes, flows, or behaviors are included?

---

## 3. Out of scope

What should not be tested in this packet?

---

## 4. Source-of-truth docs

Which docs define expected behavior?

---

## 5. Pass criteria

What must succeed?

---

## 6. Fail criteria

What would count as a meaningful failure?

---

## 7. Output expected from QA

Examples:
- passed checks
- failed checks
- blocked checks
- environment notes
- screenshots or evidence
- recommended next step

---

## 15. Documentation packet variant

Use this when the work is mainly creating or updating docs that affect execution or truth.

---

# TASK_PACKET

Purpose:
Define one PETTODO documentation task so the created or updated document is grounded, useful, and aligned with the rest of the repo.

What belongs here:
- exact document objective
- source docs to synthesize
- unresolved items if any
- required structure
- output requirements

Update rule:
Update when the documentation scope or grounding changes materially.

---

## Task metadata

- Task ID:
- Packet type: Documentation
- Title:
- Status:
- Document target:
- Related workstream:
- Related docs:

---

## 1. Documentation objective

What exact document or update is needed?

---

## 2. Why this document matters now

Why should it be created or updated now?

---

## 3. Source-of-truth docs

Which docs must ground the work?

---

## 4. Required structure

What format or structure must the document follow?

---

## 5. Open questions

If questions still exist, list only the ones that truly block clean drafting.

---

## 6. Output expected

Examples:
- markdown-ready document
- gap note if needed
- recommended next doc after completion

---

## 16. Fast-fill operator checklist

Before marking a packet as ready, confirm:

- [ ] the task has one clear primary objective
- [ ] the scope is bounded
- [ ] out of scope is explicit
- [ ] the source docs are listed
- [ ] dependencies are visible
- [ ] protected rules are listed when relevant
- [ ] acceptance criteria are testable
- [ ] expected output is defined
- [ ] validation plan exists
- [ ] docs impacted after completion are identified

If several boxes remain unchecked, the packet is not ready.

---

## 17. Recommended packet naming rule

Use a short, operational naming style.

Examples:
- `TASK_2026-03-13_AUTH_BASELINE_V01`
- `TASK_2026-03-13_QR_PUBLIC_PROFILE_V01`
- `TASK_2026-03-13_REVIEW_AUTH_DIFF_V01`
- `TASK_2026-03-13_DOC_COMMUNITY_DOGS_V01`

Do not use vague names like:
- `task1`
- `new task`
- `important packet`

---

## 18. Practical usage flow

A practical PETTODO workflow using this template is:

1. choose the next backlog item
2. create the task packet
3. write the execution prompt from the packet
4. run the task in Replit or the relevant tool
5. review the result
6. update the handoff
7. update stable docs if reality changed
8. move the packet status accordingly

This keeps execution disciplined and reviewable.

---

## 19. Final rule

A task packet should turn “we should work on this” into “we can execute this safely now.”

If the packet still leaves too much room for guessing, invention, or drift, it is not ready.

If it makes the next step obvious, constrained, and reviewable, it is doing its job.
