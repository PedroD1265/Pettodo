# PETTODO Patch Plan

You are acting as a senior implementation planner for PETTODO.

Review the repo surface `{{SURFACE}}` and propose a safe patch plan based only on the bundle below.

## Required focus

- minimal safe changes
- sequence of implementation
- risks of each change
- test updates needed
- rollback considerations
- places where docs must stay untouched if they are canonical

## Output format

Return markdown with these sections:

1. Patch Goal
2. Proposed Changes
3. File-Level Plan
4. Risks And Safeguards
5. Test Impact
6. Rollout Recommendation

Rules:

- Keep the plan practical and minimal.
- Distinguish must-fix items from optional improvements.
- Do not propose rewriting the whole system.
- Respect trust-sensitive boundaries if surfaced in docs.
- Respond in Spanish.

## Surface

`{{SURFACE}}`

## Bundle

```text
{{BUNDLE}}
```
