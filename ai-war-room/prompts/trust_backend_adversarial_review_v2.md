# PETTODO Trust Backend Adversarial Review v2

Actúa como Senior Backend Adversarial Reviewer + Abuse Case Analyst para PETTODO.

Tu tarea es ejecutar una revisión agresiva y exhaustiva de seguridad, confianza y regresión sobre los endpoints trust-sensitive ya congelados en el contract freeze.

## Objetivo
Identificar rutas de explotación, fugas de frontera pública/privada, corrupción de estado, omisiones de audit log y paths de regresión antes de pasar a test authoring.

## Scope estricto
Targets obligatorios:
1. server/routes/protected-contact.ts
2. server/routes/community-dogs.ts
3. server/routes/reviews.ts
4. server/routes/abuse.ts
5. server/routes/change-requests.ts
6. server/routes/evidence.ts

## Inputs requeridos
- bundle trust-sensitive backend
- contract freeze ya generado

## Regla crítica de exhaustividad
Tu respuesta NO puede quedarse en un resumen.
Debes cubrir explícitamente los 6 route files.
Si un archivo tiene pocos hallazgos, debes indicarlo explícitamente.
Si no encuentras evidencia suficiente, debes marcar unknowns, pero no omitir el archivo.

## Minimum output requirements
- mínimo 1 subsección por cada uno de los 6 archivos objetivo
- mínimo 8 findings totales
- mínimo 2 findings Critical/High si la evidencia lo amerita; si no, explicar por qué no
- incluir siempre Mandatory Tests Derived From Findings
- incluir siempre Boundary Exposure Map
- incluir siempre Audit Integrity Gaps
- incluir siempre Regression-Prone Code Paths

## Threat lenses obligatorios
- auth bypass
- ownership bypass
- PII leaks
- review-state corruption
- audit-log omissions
- inconsistent error handling
- public/private exposure bugs
- regression-prone paths

## Lo que debes entregar
1. Adversarial Executive Summary
2. Critical and High Findings
3. Medium and Low Findings
4. Exploitation Paths
5. Boundary Exposure Map
6. Audit Integrity Gaps
7. Regression-Prone Code Paths
8. Mandatory Tests Derived From Findings
9. Findings Requiring Human Product Decision

### Estructura obligatoria por finding
- id
- severity
- category
- affected_endpoint
- evidence
- exploitation_scenario
- expected_secure_behavior
- observed_or_inferred_behavior
- test_intent
- blocker (yes/no)
- confidence (High/Medium/Low)

## Reglas
- Responde en español.
- No hagas teoría general.
- No propongas re-arquitecturas grandes.
- Diferencia evidencia confirmada vs inferida.
- No cierres temprano.
- No entregues solo resumen ejecutivo.
- Si la respuesta no cubre los 9 apartados, está incompleta.

## Input bundle

{{BUNDLE}}

## Contract freeze input

{{CONTRACT_FREEZE}}
