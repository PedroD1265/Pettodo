# REVIEW_DIFF_TEMPLATE

Purpose:
Provide the official review template for PETTODO so implementation diffs, document revisions, and cross-tool outputs can be reviewed consistently against source-of-truth docs, current MVP priorities, trust/safety constraints, and real-vs-simulated honesty.

What belongs here:
- standard review structure for implementation diffs and revision outputs
- review rules for scope, truthfulness, and drift detection
- required checks for product, architecture, trust/safety, and readiness
- review output format
- pass/partial/fail logic
- follow-up recommendation structure
- operator guidance for reviewing Replit, Lovable, Antigravity, and documentation changes

Update rule:
Update when PETTODO’s review workflow, execution process, risk posture, or documentation discipline changes materially.

---

## 1. Why this template exists

PETTODO now has enough documentation, implementation planning, and cross-tool work that reviewing changes informally is no longer enough.

This template exists to make sure reviews answer the questions that actually matter:

- did the change stay inside scope
- did it reduce a real blocker
- did it break any settled product truth
- did it introduce trust/privacy risk
- what became materially real
- what remains partial or simulated
- what docs now need updating
- what the next correction or hardening step should be

This template is not a bug list.
It is not a task packet.
It is not a handoff.
It is the official review structure for diffs and meaningful changes.

---

## 2. Core review rule

A PETTODO review is not about whether the output looks impressive.

It is about whether the change is:

- aligned
- honest
- bounded
- trust-safe
- technically sound enough for the current phase
- materially useful to MVP progress

If a review ignores real-vs-simulated truth, it is incomplete.

If a review ignores scope drift, it is incomplete.

If a review ignores trust/private exposure issues, it is incomplete.

---

## 3. When to use this template

Use this template when reviewing:

- Replit implementation output
- Replit correction output
- Antigravity-assisted code review results
- meaningful document revisions
- Lovable landing revisions
- trust-sensitive flow changes
- route or environment changes
- changes that may affect release readiness
- any task packet result that needs pass/partial/fail judgment

Do not use this full template for tiny wording nits or minor cosmetic changes unless they affect product truth or readiness.

---

## 4. Relationship to other documents

Use this template together with:

- `BACKLOG.md` to understand what the task was supposed to reduce
- `RISKS_BLOCKERS.md` to know what risks or blockers matter most
- `TASK_PACKET_TEMPLATE.md` to understand the intended scope
- `REPLIT_PROMPT_TEMPLATE.md` if the change came from a Replit execution prompt
- `SESSION_HANDOFF_TEMPLATE.md` to transfer the review result forward
- `CURRENT_STATE.md` when the review may change implementation truth
- `QA_CURRENT.md` when the review affects validation truth
- `DECISION_LOG.md` to avoid reopening settled decisions
- workstream-specific docs such as:
  - `ARCHITECTURE.md`
  - `DATA_MODEL.md`
  - `SCREEN_ROUTE_MAP.md`
  - `ENVIRONMENTS_PUBLIC.md`
  - `PUBLIC_DATA_POLICY.md`
  - `TRUST_AND_SAFETY.md`
  - `LANDING_LOVABLE.md`
  - `BRAND_SYSTEM.md`
  - `COMMUNITY_DOGS.md` when available
  - `AI_MATCHING.md` when available

The review template does not replace those docs.
It checks whether the reviewed change stayed aligned with them.

---

## 5. Review quality rules

A good review must be:

- specific
- evidence-based
- grounded in approved docs
- clear about what was actually checked
- honest about what was not checked
- direct about risk or misalignment
- useful for the next action

A review must not:

- confuse assumptions with confirmed behavior
- approve based only on visual polish
- ignore out-of-scope changes
- hide unsafe exposure or drift
- say something is real if it was not confirmed
- fail to separate “reported by tool” from “confirmed by review”

---

## 6. Standard review statuses

Use these statuses consistently.

### Pass
The reviewed change is materially aligned with scope and source docs for the current phase.

### Pass with notes
The change is broadly acceptable, but a few limited issues should be tracked or cleaned up.

### Partial
Meaningful progress exists, but the result is not complete or still has important unresolved issues.

### Fail
The result is materially misaligned, unsafe, misleading, or incomplete enough that it should not be treated as accepted work.

### Blocked review
The review could not be completed meaningfully because required context, access, evidence, or artifacts were missing.

---

## 7. Review types

Use one main review type.

- Replit implementation review
- Replit correction review
- Technical diff review
- Documentation review
- Landing review
- QA evidence review
- Trust and safety review
- Architecture alignment review
- Release readiness review

---

## 8. Main review questions

Most meaningful PETTODO reviews should answer these questions.

### Scope and alignment
- Did the result stay inside the intended scope?
- Did it avoid inventing extra features or product logic?
- Did it stay aligned with the source-of-truth docs?

### Real vs simulated
- What became materially real?
- What is still partial or simulated?
- Does the result overclaim maturity?

### Product truth
- Did the result preserve PETTODO’s core logic?
- Did it avoid turning PETTODO into only a lost-pet app?
- Did it preserve profile vs case vs match separation?

### Trust and privacy
- Did it preserve protected contact logic where needed?
- Did it avoid exposing owner data by default?
- Did it keep public location approximate?
- Did it respect public/private route boundaries?

### Architecture and implementation quality
- Did it align with the current architecture direction?
- Did it avoid local-only or UI-only shortcuts in core flows?
- Did it introduce future cleanup debt?

### Readiness and testing
- What was validated?
- What still lacks proof?
- Did it reduce a real blocker or just change the surface?

### Follow-up
- What should happen next?
- Which docs must now be updated?

---

## 9. Standard full review template

Use this structure for important reviews.

---

# REVIEW_DIFF

Purpose:
Review one meaningful PETTODO change so the team can decide whether it is aligned, honest, and useful for the current phase.

What belongs here:
- review target
- source-of-truth docs used
- findings
- pass/partial/fail judgment
- follow-up actions
- documentation impact

Update rule:
Create a new review artifact for each meaningful reviewed change or revision. Do not overwrite older reviews that represent real checkpoints.

---

## Review metadata

- Review ID:
- Date:
- Review type:
- Reviewer:
- Related task packet:
- Related prompt:
- Related handoff:
- Review target:
- Branch or environment:
- Status of review: [pass / pass with notes / partial / fail / blocked review]

---

## 1. Review objective

State exactly what this review was meant to judge.

Examples:
- review whether Replit auth implementation actually replaced fake route protection
- review whether QR public profile now reads from real persisted data
- review whether a landing revision stayed aligned with approved messaging
- review whether a data-model update drifted from PRD truth

**Review objective:**  
[Write here]

---

## 2. Source-of-truth documents used

List only the docs actually used to review.

**Documents used:**
- [doc]
- [doc]
- [doc]

If one critical source doc was not checked, say so directly.

---

## 3. Review target summary

Describe what was reviewed.

Examples:
- code diff
- changed routes
- new flow implementation
- updated document
- landing revision
- Replit output summary
- screenshots
- QA evidence

**Review target summary:**  
[Write here]

---

## 4. What was actually checked

State what evidence was actually reviewed.

Examples:
- file diff review
- route walkthrough
- preview/dev test
- screenshot comparison
- output text review
- document comparison
- no runtime validation yet

**Checked in this review:**
- [item]
- [item]
- [item]

Rule:
Do not imply runtime confirmation if only static review happened.

---

## 5. What appears materially improved

List the meaningful improvements found.

Examples:
- route protection now exists on account-required paths
- owned-pet profile now persists beyond local session
- public profile now hides unsafe fields
- document now clarifies environment boundaries

**Material improvements:**
- [item]
- [item]
- [item]

If no meaningful improvement is confirmed, say so directly.

---

## 6. What is still partial, unclear, or simulated

This section is mandatory for meaningful reviews.

Examples:
- auth UI exists but backend session truth is still unclear
- profile reads real data but write path is incomplete
- public route is visually right but data safety is unconfirmed
- moderation state exists in UI but review logic is not real yet

**Still partial / unclear / simulated:**
- [item]
- [item]
- [item]

---

## 7. Scope drift check

State whether the reviewed result stayed inside scope.

### Scope judgment
- [ ] stayed inside scope
- [ ] minor drift, acceptable
- [ ] meaningful drift
- [ ] unclear because source scope was incomplete

**Scope note:**  
[Write here]

Examples of drift:
- unrelated new features added
- unapproved behavior changes
- widened task without review
- product logic rewritten without source-doc grounding

---

## 8. Product-truth alignment check

Review alignment against PETTODO’s core truths.

Check as relevant:
- [ ] PETTODO is still not framed as only a lost-pet app
- [ ] profile, case, and match remain distinct
- [ ] daily + emergency logic remain coherent
- [ ] Community Dogs did not become uncontrolled shared records
- [ ] protected contact logic was preserved where required

**Product-truth note:**  
[Write here]

---

## 9. Trust, privacy, and public exposure check

Review trust-sensitive implications.

Check as relevant:
- [ ] owner data is not exposed by default
- [ ] public location remains approximate
- [ ] public/private route boundaries remain clear
- [ ] protected contact was not weakened
- [ ] unsafe public output was not introduced
- [ ] shared-record risk was not increased carelessly

**Trust/privacy note:**  
[Write here]

If not applicable, say why.

---

## 10. Architecture and implementation alignment check

Review whether the result stayed consistent with the implementation direction.

Check as relevant:
- [ ] architecture direction remains intact
- [ ] no major local-only core shortcut was introduced
- [ ] system-of-record direction is preserved
- [ ] environment assumptions remain sane
- [ ] provider logic was not coupled irresponsibly
- [ ] implementation does not hide serious future debt

**Architecture note:**  
[Write here]

---

## 11. Validation and evidence strength

Judge how strong the evidence is behind the review.

### Evidence strength
- [ ] static review only
- [ ] partial runtime validation
- [ ] meaningful runtime validation
- [ ] QA-backed
- [ ] insufficient evidence

**Validation note:**  
[Write here]

Examples:
- reviewed diff only
- manual route test performed
- preview/dev behavior confirmed
- no confirmation of persistence yet
- screenshots only

---

## 12. Main issues found

List the most important issues.

Examples:
- blocker still unresolved
- unsafe field still exposed
- simulation still presented as real
- task incomplete
- docs now out of sync
- environment logic unclear
- tests missing for a critical flow

**Main issues:**
- [issue]
- [issue]
- [issue]

If no major issues were found, say so directly.

---

## 13. Review verdict

Choose one:

- [ ] Pass
- [ ] Pass with notes
- [ ] Partial
- [ ] Fail
- [ ] Blocked review

**Verdict explanation:**  
[Write here]

This should be direct and operational.

---

## 14. Why this verdict was given

Summarize the main reason for the verdict.

Examples:
- accepted because the task stayed in scope and materially reduced a blocker
- partial because meaningful progress exists but core backend truth remains incomplete
- failed because the change weakened protected-contact safety
- blocked because the actual diff or validation evidence was missing

**Reason:**  
[Write here]

---

## 15. Recommended next action

State the single best next move.

Examples:
- create a correction prompt focused only on persistence write-path completion
- update `CURRENT_STATE.md` and `QA_CURRENT.md`
- harden public/private serialization before accepting
- request better validation evidence before approval

**Recommended next action:**  
[Write here]

---

## 16. Exact follow-up brief

This should be actionable enough for the next operator or next tool.

### Follow-up brief
[Write a direct instruction block here]

Example:
“Keep the auth integration work, but remove the fallback fake session path and validate account-required routes in preview/dev. Do not expand into settings or notification logic.”

---

## 17. Documentation impact

State which docs should be reviewed or updated based on this result.

**Docs impacted:**
- `CURRENT_STATE.md` — [update needed / no update / only if accepted]
- `QA_CURRENT.md` — [update needed / no update / only if validated]
- `CHANGELOG_SUMMARY.md` — [update needed / no update]
- `DECISION_LOG.md` — [update needed / no update]
- `ARCHITECTURE.md` — [update needed / no update]
- `DATA_MODEL.md` — [update needed / no update]
- `SCREEN_ROUTE_MAP.md` — [update needed / no update]
- `ENVIRONMENTS_PUBLIC.md` — [update needed / no update]
- other — [document + status]

---

## 18. Final one-line truth

Write one direct sentence describing the real review outcome.

Examples:
- The QR flow looks correct, but it is still not proven to be backed by stable real persisted data.
- The auth task made real progress, but route protection is still not trustworthy enough for acceptance.
- The documentation revision is aligned and can be treated as approved for the current phase.

**Final one-line truth:**  
[Write here]

---

## 10. Replit-specific review variant

Use this when reviewing Replit output.

---

# REVIEW_DIFF

Purpose:
Review a PETTODO Replit result so the team can separate what Replit reported from what is actually confirmed and decide the exact next correction, hardening, or acceptance step.

What belongs here:
- Replit task summary
- claimed changes
- confirmed changes
- unresolved gaps
- pass/partial/fail judgment
- follow-up prompt direction

Update rule:
Create after each meaningful Replit implementation or correction cycle that needs real review.

---

## Review metadata

- Review ID:
- Date:
- Review type: Replit implementation review
- Reviewer:
- Related task packet:
- Prompt used:
- Related handoff:
- Branch or environment:
- Status of review:

---

## 1. Intended task

What was Replit supposed to do?

---

## 2. What Replit claimed to change

Summarize Replit’s reported implementation.

---

## 3. What was actually confirmed

State what the review confirmed.

Separate clearly:
- confirmed working
- partially confirmed
- unconfirmed

---

## 4. What remains partial, simulated, or risky

List the main remaining gaps.

---

## 5. Scope drift or hidden changes

State whether Replit stayed in scope or changed unrelated behavior.

---

## 6. Trust/privacy check

State whether any unsafe exposure or trust weakening appeared.

---

## 7. Technical alignment check

State whether the result still follows architecture, data-model, and environment rules.

---

## 8. Tests and validation evidence

List what was actually tested or reviewed.

---

## 9. Review verdict

Pass / Pass with notes / Partial / Fail / Blocked review

---

## 10. Recommended next prompt focus

State the exact next correction or hardening focus.

---

## 11. Docs impacted

List the docs that now need update or review.

---

## 12. Final one-line truth

Write the brutally clear version of the result.

---

## 11. Documentation review variant

Use this when reviewing a document instead of implementation code.

---

# REVIEW_DIFF

Purpose:
Review one PETTODO document revision so the team can confirm that it is operationally useful, aligned with source docs, and ready to act as stable project truth.

What belongs here:
- document target
- source docs checked
- structural review
- alignment review
- ambiguity check
- verdict
- next revision instruction if needed

Update rule:
Create after meaningful documentation review cycles.

---

## Review metadata

- Review ID:
- Date:
- Review type: Documentation review
- Reviewer:
- Document reviewed:
- Related docs:
- Status of review:

---

## 1. Review objective

What was the doc supposed to achieve?

---

## 2. Alignment with source docs

Did it stay aligned with approved materials?

---

## 3. Operational usefulness

Is it useful for real execution, not just academically well written?

---

## 4. Ambiguities or contradictions found

List only real ones.

---

## 5. Verdict

Pass / Pass with notes / Partial / Fail / Blocked review

---

## 6. Exact revision brief if needed

Write the next correction instruction.

---

## 7. Final one-line truth

Write the direct result.

---

## 12. Compact review version

Use this lighter version for smaller reviews.

---

### QUICK REVIEW

**Review target:**  
[target]

**Scope checked:**  
[write here]

**Main improvements confirmed:**  
- [item]
- [item]

**Still partial / unclear:**  
- [item]
- [item]

**Main issue(s):**  
- [item]
- [item]

**Verdict:**  
[pass / pass with notes / partial / fail / blocked review]

**Next step:**  
[item]

**Docs impacted:**  
[item]

**Final one-line truth:**  
[write here]

---

## 13. Fast reviewer checklist

Before closing a meaningful review, confirm:

- [ ] I checked the actual source-of-truth docs
- [ ] I separated what was claimed from what was confirmed
- [ ] I stated what remains partial or simulated
- [ ] I checked trust/privacy implications if relevant
- [ ] I checked product-truth alignment
- [ ] I checked scope drift
- [ ] I gave a clear verdict
- [ ] I gave a usable next step
- [ ] I identified docs impacted if reality changed

If several boxes are unchecked, the review is probably too weak.

---

## 14. Practical usage flow

A practical PETTODO review flow is:

1. identify the reviewed artifact
2. load the correct source docs
3. check the scope and claimed changes
4. inspect what actually changed
5. judge real-vs-simulated truth
6. check trust/privacy and product alignment
7. assign a verdict
8. define the next correction, hardening, or documentation step
9. update handoff/docs if the result changes project truth

---

## 15. Final rule

A PETTODO review should not reward surface polish over system truth.

If a change looks good but remains misleading, unsafe, or misaligned, the review should say so directly.

If a change is small but materially moves the app toward real, safe, reviewable MVP behavior, the review should recognize that clearly.
