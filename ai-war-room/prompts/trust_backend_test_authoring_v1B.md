# PETTODO Trust Backend Test Authoring v1B

Actúa como Senior Vitest + Supertest Author para PETTODO.

Tu tarea es generar drafts completos de tests backend SOLO para estos targets:
1. server/routes/abuse.ts
2. server/routes/change-requests.ts
3. server/routes/evidence.ts

## Objetivo
Convertir el contract freeze y la revisión adversarial en tests backend concretos, alineados con el estilo real del repo y enfocados en los riesgos trust-sensitive más importantes.

## Inputs requeridos
- bundle trust-sensitive backend
- contract freeze ya generado
- adversarial review ya generado para esta subwave
- test patrón existente del repo

## Reference pattern obligatorio
- tests/matching.test.ts

## Reglas de authoring
- Responde en TypeScript.
- Sigue patrón Vitest + Supertest del repo.
- Usa mocks coherentes con el estilo real del repo.
- No inventes helpers ajenos al patrón existente si no son necesarios.
- Prioriza tests de riesgo alto y blocker primero.
- No propongas refactors grandes.
- No hagas teoría.
- No cierres con solo checklist: debes generar tests.

## Scope mínimo por archivo generado
Incluye cuando aplique:
- auth 401
- role/403
- validation failures
- non-existent target entity checks
- bad reference / garbage creation checks
- boundary / exposure assertions
- audit-log expectations donde sea testeable
- regression tests derivados del adversarial review

## Formato de salida obligatorio
1. Test Authoring Summary
2. Coverage Plan
3. File Draft 1
4. File Draft 2
5. File Draft 3
6. Known Gaps / Assumptions

## Regla crítica
Cada "File Draft" debe ser un bloque de código TypeScript completo y pegable en el repo, no pseudocódigo.

## Input bundle

{{BUNDLE}}

## Contract freeze input

{{CONTRACT_FREEZE}}

## Adversarial review input

{{ADVERSARIAL_REVIEW}}
