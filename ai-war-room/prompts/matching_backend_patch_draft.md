# PETTODO Matching Backend Patch Draft

Actúa como Senior Backend Engineer + API Hardening Specialist para PETTODO.

Tu tarea es producir un borrador casi completo del parche de:
`server/routes/matching.ts`

## Objetivo
No quiero solo recomendaciones.
Quiero un draft de código lo más cercano posible a una implementación real y segura.

## Contexto
- El wiring frontend real ya usa `matchingRealAdapter`.
- No hay evidencia confirmada de que el problema principal sea el contrato del frontend.
- El foco debe ser SOLO backend matching.
- El draft debe mantener el shape general de respuesta actual.
- No debes exponer `err.message` al cliente.
- Debes corregir el cálculo de confidence.
- Debes endurecer null safety y traits matching.

## Cambios que debes cubrir
1. introducir una constante `MAX_SCORE` correcta según la lógica actual
2. corregir `confidence`
3. evitar `NaN` con coords, created_at, colors, traits
4. endurecer matching de traits usando comparación exacta case-insensitive como baseline mínima segura
5. mantener logs internos
6. responder 500 con error genérico, sin filtrar detalles internos al cliente
7. no abrir nuevos frentes ni refactors amplios

## Qué debes devolver
1. una nota breve de supuestos
2. el archivo `server/routes/matching.ts` casi completo, en un solo bloque de código
3. una lista breve de puntos donde el implementador debe revisar compatibilidad con el repo real

## Reglas
- No hagas teoría
- No toques frontend
- No propongas E2E
- No cambies docs
- Responde en español, pero el código debe ir en TypeScript

## Input bundle

```text
{{BUNDLE}}