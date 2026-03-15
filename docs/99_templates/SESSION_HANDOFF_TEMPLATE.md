# SESSION_HANDOFF_TEMPLATE

Purpose:
Provide the official handoff format for PETTODO work sessions so ChatGPT, Replit, Lovable, Antigravity, and future collaborators can continue work without losing context, reopening settled decisions, or drifting from approved documentation and current implementation truth.

What belongs here:
- session objective
- scope of work completed
- source-of-truth references used
- current truth after the session
- what became real vs what remains partial or simulated
- key decisions preserved
- outputs produced
- validation performed
- open issues
- blockers and risks touched
- documentation impact
- next recommended step
- exact instructions for the next operator or agent

Update rule:
Update when the handoff workflow, required handoff fields, or cross-tool collaboration process changes materially.

---

## 1. Why this template exists

This template exists to stop context loss between sessions.

It should be used whenever work passes from:
- one ChatGPT session to another
- ChatGPT to Replit
- Replit to ChatGPT
- ChatGPT to Lovable
- Lovable to ChatGPT
- ChatGPT to Antigravity
- one operator to another
- one review cycle to the next

The goal is simple:
the next person or agent should be able to continue the work fast, safely, and without re-deciding things that are already clear.

---

## 2. Core handoff rule

A handoff is not a full project summary.

A handoff should only capture:
- the relevant current task context
- what was actually done
- what is now approved
- what is now true
- what remains unresolved
- what is still partial or simulated
- what the next session should do

If a detail already lives well in a stable source-of-truth doc, do not duplicate it excessively here.
Reference it clearly instead.

---

## 3. Primary handoff principles

Every handoff must:

- preserve current truth
- separate confirmed vs ambiguous vs pending
- separate real vs partial vs still simulated
- avoid feature invention
- avoid rewriting project history
- preserve approved wording when wording is already intentional
- state clearly what should not be changed next
- make the next step obvious
- remain honest about validation level

A handoff should reduce ambiguity, not create more of it.

---

## 4. Documents that should ground a handoff

At minimum, the operator preparing the handoff should check:

- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- the workstream-specific document
- latest relevant review doc if one exists

Depending on the workstream, this may also include:
- `PRD_MVP_WEBAPP.md`
- `ARCHITECTURE.md`
- `PUBLIC_DATA_POLICY.md`
- `TRUST_AND_SAFETY.md`
- `WEBAPP_REPLIT.md`
- `QA_CURRENT.md`
- `RELEASE_CRITERIA.md`
- `DATA_MODEL.md`
- `SCREEN_ROUTE_MAP.md`
- `ENVIRONMENTS_PUBLIC.md`
- `BACKLOG.md`
- `RISKS_BLOCKERS.md`

For landing-related handoffs, this usually includes:
- `LANDING_LOVABLE.md`
- `LOVABLE_PROMPT_TEMPLATE.md`
- `REVIEW_DIFF_TEMPLATE.md`

Important:
If the handoff contradicts stable docs, the stable docs win.

---

## 5. When to create a handoff

Create a handoff when:

- a meaningful work session ends
- a Replit implementation wave finishes
- a review cycle finishes
- a landing version was generated
- a document was created or substantially revised
- a correction cycle finished
- the next session depends on decisions made now
- work will continue later or with another tool or operator

Do not skip handoffs after meaningful progress.
Short handoffs are better than no handoff.

---

## 6. Handoff quality rules

A good handoff must be:

- honest
- concrete
- current
- compact enough to use
- detailed enough to continue work without guessing

A handoff must not:

- pretend prototype behavior is real if it is not
- hide unresolved issues
- replace current-state truth with optimism
- omit source docs when they matter
- say done when the result is only UI-complete
- confuse what a tool claimed with what was actually confirmed

---

## 7. Session type labels

Use one or more of these labels.

- Documentation
- Replit implementation
- Technical review
- QA validation
- Architecture update
- Product clarification
- Prompt preparation
- Prompt correction
- Release readiness review
- Trust and safety review
- Cross-tool handoff
- Handoff only

---

## 8. Recommended file naming rule

For saved handoffs, use a filename like:

`YYYY-MM-DD_short-topic_handoff.md`

Examples:
- `2026-03-13_auth-foundation_handoff.md`
- `2026-03-13_qr-public-profile_review_handoff.md`
- `2026-03-13_replit-wave1_handoff.md`

Use short, operational names.
Do not use vague names like:
- `notes.md`
- `session.md`
- `updates.md`

---

## 9. Full handoff template

Use the full structure below for important sessions.

---

# SESSION_HANDOFF

Purpose:
Capture the current truth of a PETTODO work session so the next session can continue without losing implementation reality, documentation continuity, or blocker awareness.

What belongs here:
- what the session tried to do
- what actually changed
- what is now true
- what remains incomplete, partial, or simulated
- what the next session should do

Update rule:
Create a new handoff for each meaningful session or major phase change. Do not overwrite older handoffs if they represent a real historical checkpoint.

---

## HANDOFF HEADER

**Handoff ID:**  
[example: HANDOFF_2026-03-13_REPLIT_AUTH_V01]

**Date:**  
[YYYY-MM-DD]

**Workstream:**  
[webapp / landing / architecture / public-data / QA / prompting / review / trust-safety / etc.]

**Prepared by:**  
[name / role / AI / operator]

**Session type:**  
[build / review / correction / planning / documentation / cross-tool handoff]

**Primary artifact(s):**  
[list the main files, pages, prompts, versions, or flows touched]

**Status at end of session:**  
[in progress / ready for review / approved with fixes / blocked / ready for next build step]

---

## 1. Session objective

State the actual purpose of the session.

Examples:
- create first reusable Replit prompt for auth foundation
- review landing v02 against PETTODO source-of-truth docs
- define public data rules for owned pets vs Community Dogs
- prepare next iteration instructions for Antigravity
- validate QR public profile against real persisted animal data

**Session objective:**  
[Write here]

---

## 2. Source-of-truth references used

Mark only what was actually used in the session.

### References checked
- [ ] `MASTER_CONTEXT.md`
- [ ] `CURRENT_STATE.md`
- [ ] `PRD_MVP_WEBAPP.md`
- [ ] `ARCHITECTURE.md`
- [ ] `PUBLIC_DATA_POLICY.md`
- [ ] `TRUST_AND_SAFETY.md`
- [ ] `WEBAPP_REPLIT.md`
- [ ] `QA_CURRENT.md`
- [ ] `RELEASE_CRITERIA.md`
- [ ] `DATA_MODEL.md`
- [ ] `SCREEN_ROUTE_MAP.md`
- [ ] `ENVIRONMENTS_PUBLIC.md`
- [ ] `BACKLOG.md`
- [ ] `RISKS_BLOCKERS.md`
- [ ] `BRAND_SYSTEM.md`
- [ ] `LANDING_LOVABLE.md`
- [ ] `LOVABLE_PROMPT_TEMPLATE.md`
- [ ] `REVIEW_DIFF_TEMPLATE.md`
- [ ] previous handoff
- [ ] other:
  - [document name]

**Reference note:**  
[Write here if needed]

---

## 3. What was completed in this session

List concrete outputs only.

Examples:
- drafted `REPLIT_PROMPT_TEMPLATE.md`
- reviewed auth flow and logged 5 issues
- implemented real route protection in Replit
- clarified that protected contact remains default for owned pets
- updated environment rules for preview/dev

**Completed work:**
- [item]
- [item]
- [item]

---

## 4. Current truth after this session

This is one of the most important sections.

State what is materially true after the session.

Examples:
- what became real
- what remained simulated
- what is partially implemented
- what changed in routing, data, auth, storage, or public/private behavior
- what product truth is now clearer

**Current truth after this session:**  
[Write here]

Rule:
Be direct.
Do not confuse visual completeness with real implementation truth.

---

## 5. What is now confirmed

Use this section for decisions that should be treated as stable for the next step.

Only include decisions that were already grounded in docs or explicitly validated in the session.

### Confirmed
- [confirmed item]
- [confirmed item]
- [confirmed item]

Rule:
Do not use this section for guesses.

---

## 6. What remains ambiguous

Use this only for real unresolved items that could affect next work.

### Ambiguous / not fully locked
- [item]
- [item]

Rule:
Do not fill this section with fake uncertainty.
If something is clear, keep it out of here.

---

## 7. What is still missing or pending

Use this for work that clearly still needs to happen.

### Pending
- [item]
- [item]
- [item]

Examples:
- connect preview/dev to non-production storage
- formalize exact moderation thresholds
- prepare next Replit correction prompt
- validate protected contact with real account flow

---

## 8. Important constraints for the next session

This is one of the most important sections.

Use it to stop the next session from breaking approved work.

### Do not change
- [protected element]
- [protected element]
- [protected element]

Examples:
- do not turn PETTODO into only a lost-pet app
- do not collapse animal profile, case, and match into one model
- do not expose owner data by default
- do not make Community Dogs unrestricted public-edit records
- do not invent metrics, partners, or testimonials

---

## 9. Validation or review performed

Describe what was actually checked.

Examples:
- manual review only
- route inspection
- code diff review
- local test
- preview/dev validation
- screenshot review
- QA pass
- no validation yet

**Validation performed:**  
[Write here]

Rule:
Do not imply validation happened if it did not.

---

## 10. Known issues or blockers

Use this section for real friction, not minor preferences.

### Current issues / blockers
- [issue]
- [issue]

Examples:
- auth UI exists but real auth still not connected
- public route is visually correct but still not backed by real data
- tests are missing
- docs are now out of sync with implementation

---

## 11. Blockers and risks touched

State which blockers or risks were reduced, unchanged, newly discovered, or worsened.

Recommended references:
- `BACKLOG.md`
- `RISKS_BLOCKERS.md`
- `RELEASE_CRITERIA.md`

### Blockers / risks touched
- [item] — [reduced / unchanged / newly discovered / worsened]
- [item] — [reduced / unchanged / newly discovered / worsened]

---

## 12. Outputs created or updated

List the concrete artifacts produced in the session.

### Outputs
- `DOCUMENT_NAME.md` — [created / updated / reviewed]
- prompt version — [created / updated]
- landing version — [reviewed / approved / rejected]
- flow implementation — [implemented / partially implemented / reviewed]
- notes — [optional]

---

## 13. Documentation impact

State which docs should now be reviewed or updated.

### Docs impacted
- `CURRENT_STATE.md` — [updated already / should be updated next / no update needed]
- `QA_CURRENT.md` — [updated already / should be updated next / no update needed]
- `CHANGELOG_SUMMARY.md` — [updated already / should be updated next / no update needed]
- `DECISION_LOG.md` — [updated already / should be updated next / no update needed]
- `ARCHITECTURE.md` — [updated already / should be updated next / no update needed]
- `DATA_MODEL.md` — [updated already / should be updated next / no update needed]
- `SCREEN_ROUTE_MAP.md` — [updated already / should be updated next / no update needed]
- `ENVIRONMENTS_PUBLIC.md` — [updated already / should be updated next / no update needed]
- other — [document + status]

---

## 14. Review or approval state

Use this section when the session produced something that may be approved, partially approved, or still needs work.

### Approval state
- [ ] fully approved
- [ ] approved with fixes
- [ ] needs revision
- [ ] blocked
- [ ] not reviewed yet

**Approval note:**  
[Write here]

---

## 15. Recommended next step

State the single best next action.

Examples:
- create correction prompt for Replit focused on removing fake auth fallback
- validate QR public route against real persisted animal data
- update `CURRENT_STATE.md` and `QA_CURRENT.md` to reflect real media upload progress
- prepare task packet for protected contact v1

**Recommended next step:**  
[Write here]

---

## 16. Exact next-task brief

This section should be actionable enough that the next operator can start immediately.

### Next-task brief
[Write a direct instruction block here]

Example:
“Use the approved auth scope and revise only route protection and session persistence. Do not expand into profile settings or notification work.”

---

## 17. Optional next prompt draft

Use when the next session will likely begin with Replit, ChatGPT, Lovable, or Antigravity.

### Next prompt draft
[Paste here]

Rule:
This should be close enough to use immediately.

---

## 18. Fast context summary for next operator

Keep this short.
This is the quickest read-this-first block.

### Fast summary
- PETTODO is [brief grounded summary]
- This session completed [brief]
- What is now true is [brief]
- The main remaining gap is [brief]
- The next session should [brief]
- Avoid changing [brief]

---

## 19. Evidence, links, or references

Use when helpful.

### Evidence
- landing URL:
- preview/dev URL:
- production URL:
- prompt version:
- review ID:
- screenshot set:
- branch / repo note:
- diff summary:
- test evidence:
- other reference:

---

## 20. Final one-line truth

Write one direct sentence describing the real state after the session.

Examples:
- Auth UI was refined, but real auth is still not implemented.
- QR public profile became materially real in preview/dev, but protected contact still remains partial.
- The docs are now aligned on the environment model, but implementation has not yet caught up.

**Final one-line truth:**  
[Write here]

---

## 10. Replit-specific handoff variant

Use this expanded version when the session involved implementation in Replit.

---

# SESSION_HANDOFF

Purpose:
Capture the current truth of a PETTODO Replit session so implementation, review, QA, and documentation can continue from the same reality.

What belongs here:
- Replit task summary
- prompt summary
- implementation result
- what became real vs partial
- review notes
- next correction or hardening step

Update rule:
Create after every meaningful Replit implementation wave, correction cycle, or review cycle.

---

## Session metadata

- Date:
- Session type: Replit implementation
- Main topic:
- Branch or environment:
- Prompt used:
- Related backlog item:
- Related blocker or risk:
- Source-of-truth docs used:

---

## 1. Objective of this Replit session

State the exact implementation goal.

---

## 2. What Replit was asked to do

Summarize the intended scope.

Recommended format:
- what was asked
- what was explicitly in scope
- what was explicitly out of scope

---

## 3. What Replit reported as changed

Summarize what Replit claimed to implement.

Examples:
- auth integration
- DB persistence
- route protection
- public profile rendering
- image upload flow
- contact flow changes
- review/admin logic
- tests added

Do not treat this as confirmed truth yet.

---

## 4. What was independently confirmed

State what was actually verified after review.

Examples:
- confirmed working
- partially confirmed
- not yet confirmed
- contradicted by review

This section is critical.
It separates build output from actual project truth.

---

## 5. What is still partial or simulated

State clearly what still remains incomplete.

Examples:
- fake fallback remains
- backend write path incomplete
- public route not truly safe yet
- storage integration partial
- auth only works visually
- tests missing or narrow

---

## 6. Files, modules, routes, or systems affected

List the important areas touched.

Examples:
- auth routes
- case creation pages
- profile storage logic
- image service integration
- protected contact components
- review/admin surfaces

If exact filenames are available, include them.

---

## 7. Validation performed

Examples:
- manual login test
- route protection check
- create profile test
- create case test
- QR route resolution test
- image upload test
- review of code diffs
- no full end-to-end validation yet

Include failures if they occurred.

---

## 8. Known issues and concerns

Examples:
- regression risk
- partial migration
- mismatched docs
- weak public/private boundary
- unstable environment behavior
- incomplete tests
- implementation drift from architecture

---

## 9. Docs impacted

State which docs now need update or review.

Examples:
- `CURRENT_STATE.md`
- `QA_CURRENT.md`
- `CHANGELOG_SUMMARY.md`
- `DECISION_LOG.md`
- `ARCHITECTURE.md`
- `DATA_MODEL.md`
- `SCREEN_ROUTE_MAP.md`
- `ENVIRONMENTS_PUBLIC.md`

---

## 10. Recommended next prompt or next task

State the exact next move.

Good examples:
- correction prompt focused on removing fake auth fallback
- hardening prompt for public/private boundary enforcement
- follow-up prompt to connect image upload to real storage
- test prompt for regression coverage on core routes

---

## 11. Final one-line truth

Write one direct sentence describing the real outcome.

Examples:
- Replit added most of the auth scaffolding, but route protection is still not trustworthy enough.
- Case persistence became partially real, but profile and case boundaries still need cleanup.
- Public profile now reads from real data, but QR flow is still not fully stable.

---

## 11. Compact handoff version

Use this lighter version for smaller sessions.

---

### QUICK HANDOFF

**Workstream:**  
[workstream]

**Session goal:**  
[goal]

**Done:**  
- [item]
- [item]

**Current truth now:**  
- [item]
- [item]

**Confirmed:**  
- [item]
- [item]

**Pending:**  
- [item]
- [item]

**Do not change:**  
- [item]
- [item]

**Validation:**  
[write here]

**Docs impacted:**  
[write here]

**Next step:**  
[item]

**Next prompt / brief:**  
[write here]

**Final one-line truth:**  
[write here]

---

## 12. Usage notes by workstream

### For Replit work
Always capture:
- prompt used
- what Replit claimed
- what was confirmed
- what remains partial
- tests run
- next correction or hardening focus

### For landing work
Always capture:
- CTA state
- approved section order
- message drift risks
- current reviewed version
- exact next correction focus

### For architecture work
Always capture:
- approved constraints
- unresolved technical decisions
- what is conceptual vs implementation-ready
- dependencies on policy/docs

### For policy or trust work
Always capture:
- what is already confirmed in source docs
- what still needs formalization
- what must not be contradicted in product or UI

### For QA or release work
Always capture:
- what was tested
- what passed
- what failed
- what blocks release readiness

---

## 13. Relationship to other documents

Use this template together with:

- `BACKLOG.md` to know what the session was trying to advance
- `RISKS_BLOCKERS.md` to note which risks changed
- `REPLIT_PROMPT_TEMPLATE.md` when the session involved build execution
- `CURRENT_STATE.md` when implementation truth materially changed
- `QA_CURRENT.md` when validation truth materially changed
- `CHANGELOG_SUMMARY.md` when there is a stable historical change worth recording
- `DECISION_LOG.md` when the session created or confirmed a real decision

This template supports continuity.
It does not replace those documents.

---

## 14. Final rule

A good handoff should let the next session begin with confidence in less than five minutes.

If the next operator still has to guess:
- what was decided
- what changed
- what is now true
- what remains partial
- what remains open
- or what must not be touched

then the handoff is not good enough.
