# PETTODO Trust Backend Bundle Manifest

Este manifiesto define el input bundle minimo recomendado para la wave trust-sensitive backend.

## Reglas de inclusion
- Prioridad P0: sin estos archivos no se congela contrato de forma fiable.
- Prioridad P1: necesarios para cubrir auth, roles, audit y frontera publico/privado.
- Prioridad P2: apoyo para contexto de wiring y patrones.

## Bundle minimo (exacto)

| Ruta | Rol del archivo | Por que entra | Prioridad |
| --- | --- | --- | --- |
| server/routes/protected-contact.ts | Route target trust-sensitive | Endpoint principal de contacto protegido y control de acceso | P0 |
| server/routes/community-dogs.ts | Route target trust-sensitive | Exposicion comunitaria con riesgo de boundary y leaks | P0 |
| server/routes/reviews.ts | Route target trust-sensitive | Flujo de reviews y riesgo de corrupcion de estado | P0 |
| server/routes/abuse.ts | Route target trust-sensitive | Reportes de abuso, datos sensibles y auditabilidad | P0 |
| server/routes/change-requests.ts | Route target trust-sensitive | Cambios de estado/ownership con riesgo de bypass | P0 |
| server/routes/evidence.ts | Route target trust-sensitive | Evidencia y posibles fugas de metadata/PII | P0 |
| server/middleware/verifyToken.ts | Auth middleware | Fuente canonica de autenticacion requerida por rutas | P1 |
| server/middleware/requireRole.ts | Role middleware | Fuente canonica de autorizacion por rol | P1 |
| server/utils/audit.ts | Audit utilities | Define expectativas de logging y trazabilidad | P1 |
| server/schema.sql | Data contract baseline | Ayuda a validar ownership, estados y campos sensibles | P1 |
| src/app/services/api.ts | Cliente frontend API boundary | Contrastar contrato backend vs consumo cliente publico/privado | P1 |
| server/app.ts | Route mounting map | Confirmar wiring real y prefijos de rutas | P2 |
| tests/matching.test.ts | Patron de estilo de tests | Estandar repo para estructura, mocks y assertions | P2 |

## Bundle extendido recomendado (opcional)
Agregar solo si existe evidencia de dependencia directa:
- tipos/validadores compartidos usados por las rutas objetivo
- helpers de ownership o serializers usados por los handlers
- tests existentes adyacentes que cubran middleware compartido

## Politica de truncado sugerida
- rutas y middlewares: sin truncado si es posible
- schema.sql y api.ts: truncado alto (>= 22000 chars)
- tests de referencia: truncado medio-alto (>= 16000 chars)

## Resultado esperado
Un solo bundle de texto trust-sensitive, suficiente para ejecutar todos los prompts de esta wave sin depender de contexto implicito.