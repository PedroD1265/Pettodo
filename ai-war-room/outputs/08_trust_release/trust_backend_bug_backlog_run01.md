# PETTODO Trust Backend Bug Backlog

Fecha: 2026-03-18
Estado de evidencia: 6 files passed / 60 tests passed

Nota:
- Este backlog consolida solo bugs/riesgos reales ya visibles en código y/o capturados por la ola trust-sensitive.
- `ai-war-room/outputs/05_trust_contracts/trust_backend_contract_freeze_run01.md` ya existe, pero quedó parcial/truncado en la `Endpoint Matrix`, así que no alcanza como fuente única de verdad para el backlog.
- La evidencia operativa real para este backlog viene de:
  - tests trust-sensitive implementados
  - contract freeze parcial usable solo como apoyo inicial de endpoints
  - `ai-war-room/outputs/06_trust_adversarial/trust_backend_adversarial_review_run03A.md`
  - `ai-war-room/outputs/06_trust_adversarial/trust_backend_adversarial_review_run03B.md`
  - implementación observada en `server/routes/*.ts`

## TB-REV-01

- archivo/ruta afectada: `server/routes/reviews.ts`
- resumen del problema: el módulo de review interpola nombres de tabla/columna en SQL (`ENTITY_MAP` -> template strings). Hoy el mapa es constante, pero el patrón es inseguro y deja un riesgo latente de SQL injection si el origen del mapa cambia.
- severidad: Critical
- evidencia:
  - adversarial review `REV-01`
  - `SELECT id, ${entityDef.stateCol} FROM ${entityDef.table} WHERE id = $1`
  - `UPDATE ${entityDef.table} SET ${updateCol} = ...`
  - cobertura actual: `tests/reviews.test.ts` valida comportamiento funcional, pero no elimina este patrón
- blocker: yes
- fix direction mínima: reemplazar interpolación dinámica por ramas explícitas por `entityType` con SQL fijo por entidad

## TB-REV-02

- archivo/ruta afectada: `server/routes/reviews.ts`
- resumen del problema: approve/reject hace check y update en operaciones separadas, no atómicas; dos revisores pueden decidir sobre el mismo item y dejar estado/auditoría inconsistentes.
- severidad: High
- evidencia:
  - adversarial review `REV-02`
  - primero hace `SELECT ... review_state`
  - después hace `UPDATE ...`
  - luego inserta `review_decisions` y `audit_log`
- blocker: yes
- fix direction mínima: convertir a operación atómica (`UPDATE ... WHERE review_state = 'pending_review'` + validación de filas afectadas, o transacción con lock)

## TB-SYS-01

- archivo/ruta afectada: `server/routes/abuse.ts`, `server/routes/change-requests.ts`, `server/routes/evidence.ts`
- resumen del problema: los tres endpoints aceptan `targetEntityId` sintácticamente válido sin verificar existencia real de la entidad objetivo, permitiendo registros huérfanos.
- severidad: Medium
- evidencia:
  - adversarial review `SYS-01`
  - tests actuales confirman aceptación de IDs falsos:
    - `tests/abuse.test.ts`
    - `tests/change-requests.test.ts`
    - `tests/evidence.test.ts`
  - en código no hay `SELECT` previo de existencia por entidad antes del `INSERT`
- blocker: no
- fix direction mínima: agregar lookup por `targetEntityType` antes del `INSERT` y responder `404 not_found` si la entidad no existe

## TB-AF-01

- archivo/ruta afectada: `server/routes/abuse.ts`
- resumen del problema: `POST /abuse-flags` no tiene rate limiting, idempotencia ni control de duplicados abiertos por usuario/entidad; permite flooding de reportes.
- severidad: High
- evidencia:
  - adversarial review `AF-01`
  - `tests/abuse.test.ts` confirma que múltiples reportes idénticos consecutivos devuelven `201`
  - implementación actual inserta siempre un nuevo `abuse_flag`
- blocker: yes
- fix direction mínima: agregar límite por UID y/o unicidad lógica `(reported_by, target_entity_type, target_entity_id, status='open')`

## TB-CR-01

- archivo/ruta afectada: `server/routes/change-requests.ts`
- resumen del problema: `proposedChanges` solo se valida como objeto; acepta claves internas o protegidas como `review_state`, `created_by`, etc.
- severidad: High
- evidencia:
  - adversarial review `CR-01`
  - `tests/change-requests.test.ts` confirma aceptación de payload malicioso con campos internos
  - implementación actual persiste `JSON.stringify(proposedChanges)` sin whitelist por entidad
- blocker: yes
- fix direction mínima: validar `proposedChanges` contra whitelist/schema por `targetEntityType` y rechazar claves protegidas con `400`

## TB-EV-01

- archivo/ruta afectada: `server/routes/evidence.ts`
- resumen del problema: `description` no tiene límite de tamaño a nivel endpoint; hoy solo queda acotado por `express.json({ limit: "1mb" })`, que sigue siendo demasiado amplio para este campo.
- severidad: Medium
- evidencia:
  - adversarial review `EV-01`
  - `tests/evidence.test.ts` confirma que el endpoint acepta descripciones muy largas
  - implementación actual solo exige string no vacío y luego persiste `description.trim()`
- blocker: no
- fix direction mínima: definir límite explícito de longitud para `description` y rechazar payloads sobredimensionados con `400`

## TB-CD-01

- archivo/ruta afectada: `server/routes/community-dogs.ts`
- resumen del problema: crear sightings y actions sobre Community Dogs no genera audit log, aunque son acciones trust-sensitive sobre un registro compartido.
- severidad: Medium
- evidencia:
  - resumen ejecutivo del adversarial review `run03A` menciona omisión de auditoría en acciones sensibles
  - en código hay `writeAuditLog` solo para `community_dog_submitted`
  - `POST /community-dogs/:id/sightings` y `POST /community-dogs/:id/actions` no llaman `writeAuditLog`
- blocker: no
- fix direction mínima: agregar eventos de auditoría mínimos para sighting/action create con actor, target y metadata básica

## TB-PC-01

- archivo/ruta afectada: `server/routes/protected-contact.ts`
- resumen del problema: la lógica de idempotencia para creación de threads solo corre cuando llega `petId`; los flujos basados solo en `caseId` pueden crear threads duplicados.
- severidad: Medium
- evidencia:
  - resumen ejecutivo del adversarial review `run03A` menciona creación de hilos duplicados
  - en código el bloque `existing open thread` está envuelto en `if (petId)`
  - no existe chequeo equivalente para `caseId`
- blocker: no
- fix direction mínima: extender idempotencia a `caseId` y/o imponer unicidad lógica por `(case_id, initiator_uid, thread_status='open')`

## Priorización Sugerida

1. `TB-REV-01`
2. `TB-REV-02`
3. `TB-CR-01`
4. `TB-AF-01`
5. `TB-SYS-01`
6. `TB-EV-01`
7. `TB-CD-01`
8. `TB-PC-01`
