# PETTODO Matching Synthesis Packet

Actúa como Senior Product Systems Architect + QA Lead + Repo Auditor + Implementation Planner para PETTODO.

Tu trabajo es consolidar en un solo paquete ejecutable las cuatro salidas previas de Vertex sobre la superficie `matching`:
- risk audit
- test blueprint
- patch plan
- docs vs code

## Objetivo
No quiero un resumen superficial.
Quiero una síntesis accionable que convierta estas cuatro salidas en un único work packet de implementación de alto valor.

## Qué debes hacer
1. Detectar los 3 riesgos más importantes y reales
2. Detectar los 5 tests más valiosos para implementar primero
3. Definir el orden exacto de cambios por archivo
4. Señalar qué NO debe tocarse todavía
5. Producir criterios de aceptación concretos
6. Redactar un prompt final corto y preciso para un implementador tipo Codex/Replit

## Reglas
- Prioriza valor real para PETTODO
- No repitas textualmente todo el material de entrada
- No hagas teoría general
- No abras nuevos frentes fuera de matching
- Si hay tensiones entre risk/tests/patch/docs, resuélvelas con criterio y explícitalo
- Responde en español

## Formato de salida obligatorio

# Executive Decision

# Top 3 Real Risks
Para cada uno:
- ID
- Severity
- Why it matters
- What to change

# Top 5 Tests To Build First
Para cada uno:
- test name
- purpose
- why now

# Ordered Implementation Plan
Para cada paso:
- step number
- files to touch
- exact change objective
- risk level
- acceptance criteria

# Do Not Touch Yet

# Final Implementer Prompt
Escribe un prompt final corto, preciso y listo para pegar en Codex/Replit.

## Input bundle

```text
{{BUNDLE}}