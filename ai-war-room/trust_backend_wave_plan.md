# PETTODO Trust Backend Wave Plan

## Por que existe esta wave
La wave previa de matching ya tiene cobertura suficiente para el estado actual del repo.
La auditoria repo-grounded mas reciente identifico el mayor valor incremental en trust-sensitive backend:
- 6 modulos sin tests
- 19 endpoints en scope
- ~1,132 lineas sin cobertura

Esta wave existe para reducir riesgo de seguridad, integridad y regresion en fronteras publicas/privadas antes de nuevos cambios funcionales.

## Que incluye
Incluye exclusivamente el paquete trust-sensitive backend para:
1. contract freeze
2. adversarial review
3. test authoring
4. self critique
5. failure repair
6. release gate
7. diff review post-implementacion

Targets principales:
- server/routes/protected-contact.ts
- server/routes/community-dogs.ts
- server/routes/reviews.ts
- server/routes/abuse.ts
- server/routes/change-requests.ts
- server/routes/evidence.ts

Contexto de apoyo obligatorio:
- tests/matching.test.ts
- server/middleware/verifyToken.ts
- server/middleware/requireRole.ts
- server/utils/audit.ts
- server/schema.sql
- src/app/services/api.ts

## Que NO incluye
- no repetir matching
- no cambios de frontend
- no refactors amplios
- no E2E
- no implementacion de tests en este paso
- no cambios funcionales de app

## Orden de ejecucion recomendado
1. Construir bundle trust-sensitive (usar helper de scripts o bundle manual)
2. Ejecutar prompt: trust_backend_contract_freeze.md
3. Ejecutar prompt: trust_backend_adversarial_review.md
4. Ejecutar prompt: trust_backend_test_authoring.md
5. Ejecutar prompt: trust_backend_self_critique.md
6. Si ya hubo corrida de tests, ejecutar trust_backend_failure_repair.md
7. Ejecutar trust_backend_release_gate.md
8. Despues de implementar, ejecutar trust_backend_diff_review.md

## Cuando pasar de Vertex a Codex
Pasar a Codex solo cuando se cumpla:
- contract freeze completado
- adversarial review con blockers claros
- test authoring revisado por self critique
- release gate en GO o CONDITIONAL_GO con acciones concretas

No pasar a implementacion si la decision es NO_GO.

## Como medir valor
Metricas recomendadas:
- cantidad de riesgos Critical/High convertidos en tests bloqueantes
- reduccion de endpoints trust-sensitive sin cobertura
- porcentaje de findings con evidencia confirmada vs inferida
- cantidad de drift de contrato detectado antes de merge
- tasa de fallos de test por mocks/supuestos vs bugs reales

## Outputs que se deben guardar
- contract freeze en outputs/05_trust_contracts/
- adversarial review en outputs/06_trust_adversarial/
- test authoring, self critique y failure repair en outputs/07_trust_tests/
- release gate y diff review en outputs/08_trust_release/

## Convencion de nombres sugerida
Usar prefijo trust_backend_<artifact>_<yyyymmdd_hhmmss>.md y par .json cuando aplique caller REST.

Ejemplos:
- trust_backend_contract_freeze_20260318_101530.md
- trust_backend_adversarial_20260318_102015.md
- trust_backend_release_gate_20260318_104500.md