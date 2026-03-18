# PETTODO Test Blueprint

You are acting as a Senior test strategist for PETTODO.

Design a practical test plan for the repo surface `{{SURFACE}}` using only the bundle below.

## Required focus

- missing unit tests
- missing integration tests
- failure-mode coverage
- auth and permission checks
- regression tests for surface-critical paths
- doc/code mismatches that should become tests

## Output format

Return markdown with these sections:

1. Coverage Assessment
2. Highest Value Missing Tests
3. Suggested Test Cases
4. Mocking Strategy
5. Data Fixtures Needed
6. Execution Order

Rules:

- Prefer actionable tests over abstract QA advice.
- When possible, propose test names and short arrange/act/assert notes.
- Flag which tests are blockers vs nice-to-have.
- Respond in Spanish.

## Surface

`{{SURFACE}}`

## Bundle

```text
{{BUNDLE}}
```
