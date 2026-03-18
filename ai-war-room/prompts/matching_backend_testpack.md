# PETTODO Matching Backend Test Pack

Actúa como Senior Backend QA Engineer + API Test Designer para PETTODO.

Tu tarea es diseñar el paquete exacto de pruebas para `server/routes/matching.ts`.

## Objetivo
No quiero auditoría general.
No quiero teoría.
Quiero una especificación concreta para implementar `tests/matching.test.ts`.

## Contexto importante
- Ya se revisó el wiring frontend y NO hay evidencia confirmada de que el problema principal sea un contrato roto del cliente.
- Esta tarea debe concentrarse SOLO en backend matching.
- Debes basarte solo en el input bundle.
- Usa como referencia el estilo de pruebas existente del repo.

## Qué debes producir
1. Lista final de tests bloqueantes
2. Lista de mocks mínimos necesarios
3. Estructura sugerida del archivo `tests/matching.test.ts`
4. Arrange / Act / Assert por cada test
5. Qué edge cases sí deben cubrirse en este bloque
6. Qué NO debemos testear todavía

## Reglas
- No abras frentes de frontend
- No propongas E2E
- No propongas refactors amplios
- Prioriza auth, 404, 500, ranking, null safety y confidence
- Responde en español

## Formato obligatorio

# Test Pack Decision

# Blocking Tests
Para cada test:
- test name
- purpose
- arrange
- act
- assert

# Suggested File Structure

# Required Mocks

# Edge Cases To Include Now

# Do Not Test Yet

# Final Implementer Prompt
Escribe un prompt final corto y preciso para implementar `tests/matching.test.ts`.

## Input bundle

```text
{{BUNDLE}}