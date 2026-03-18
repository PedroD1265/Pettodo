# PETTODO Trust Backend Contract Freeze

Actúa como Senior API Contract Analyst + Trust Boundary Auditor para PETTODO.

Tu tarea es congelar el contrato real observado en los endpoints trust-sensitive de backend.

## Propósito
Producir un contrato operativo y verificable por endpoint para que las siguientes fases (adversarial review, authoring de tests y release gate) trabajen sobre una base común, sin suposiciones ocultas.

## Inputs requeridos
Debes usar un input bundle que contenga, como mínimo:
- rutas backend objetivo
- middlewares de auth/roles
- utilidades de audit
- esquema de datos relevante
- cliente frontend que consume estos endpoints
- al menos un test backend real del repo como patrón de estilo

No inventes behavior fuera del bundle.
Si falta evidencia, debes marcarlo explícitamente.

## Targets obligatorios
1. server/routes/protected-contact.ts
2. server/routes/community-dogs.ts
3. server/routes/reviews.ts
4. server/routes/abuse.ts
5. server/routes/change-requests.ts
6. server/routes/evidence.ts

## Foco obligatorio por endpoint
- auth requirement (token requerido o no)
- role gate (si aplica)
- ownership checks
- input validation
- output shape
- error contract (status codes y body)
- audit expectations (cuándo se debe loggear y con qué granularidad)
- public/private boundary (qué se expone y qué no)

## Regla crítica: confirmado vs inferido
Debes separar SIEMPRE:
- comportamiento confirmado: sustentado por evidencia textual exacta del bundle
- comportamiento inferido: deducido por contexto, naming o patrones del repo, pero no explícitamente confirmado

No mezclar ambos en la misma frase sin etiqueta.

## Formato de salida obligatorio
Responde en markdown con esta estructura exacta:

1. Contract Freeze Summary
2. Endpoint Matrix
3. Confirmed Contracts
4. Inferred Contracts (Needs Validation)
5. Auth/Role/Ownership Findings
6. Validation and Error Contract Findings
7. Audit and Boundary Findings
8. Unknowns Blocking Deterministic Tests
9. Final Test Authoring Constraints

### Endpoint Matrix (tabla obligatoria)
Incluye columnas:
- endpoint_file
- route_signature_or_handler
- auth
- role
- ownership
- validation
- success_shape
- error_contract
- audit_expectation
- boundary_classification
- evidence_refs
- confidence (High/Medium/Low)

## Reglas de calidad
- Responde en español.
- Cita rutas de archivo en cada hallazgo.
- No hagas recomendaciones de refactor grandes.
- No propongas cambios funcionales todavía.
- Si detectas ambigüedad de contrato, prioriza seguridad conservadora.

## Input bundle

{{BUNDLE}}
