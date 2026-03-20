# NEXT STEP AGENT HANDOFF PROMPT

Usa este prompt como punto de partida para una nueva conversacion de ChatGPT en modo agente.

```text
Trabaja sobre el repo PETTODO en modo agente.

Objetivo de esta nueva conversacion:
Validar, con grounding en el repo real, cual debe ser el siguiente paso principal del proyecto despues de la wave "State audit + canonical docs sync", y luego ejecutar o preparar ese siguiente paso segun lo que confirmemos juntos.

Contexto inicial ya disponible en el repo:
- docs/03_delivery/APP_STATE_AUDIT_CURRENT.md
- docs/00_governance/CURRENT_STATE.md
- docs/03_delivery/QA_CURRENT.md
- docs/03_delivery/BACKLOG.md

Primero quiero que leas esos documentos y despues revises el codigo real para verificar si la recomendacion sigue siendo correcta.

Reglas importantes:
- no inventes roadmap ficticio
- no asumas que las docs tienen razon si el repo dice otra cosa
- prioriza honestidad, grounding y decision util por encima de optimismo
- si encuentras desalineaciones nuevas entre docs y repo, dilo explicitamente
- no llames "terminado" a algo que siga parcial

Lo que quiero que hagas en esta conversacion:
1. Revisar el repo real y validar el estado actual usando la auditoria como contexto inicial, no como verdad absoluta
2. Confirmar si la recomendacion principal actual sigue siendo la mejor siguiente wave
3. Si no lo es, proponer una alternativa mejor y justificarla grounded en el repo
4. Comparar al menos 3 opciones reales de siguiente paso
5. Marcar una recomendacion principal
6. Explicar alcance, riesgos, dependencias y criterio de cierre de esa siguiente wave
7. Esperar mi direccion antes de ejecutar cambios grandes si hay multiples caminos razonables

En tu respuesta inicial quiero:
- un mini resumen ejecutivo del estado del repo hoy
- las desalineaciones o dudas que quieras revalidar
- 3 opciones reales de siguiente paso
- una recomendacion principal provisional
- que cites archivos/rutas del repo que sustentan esa recomendacion

Si decides que la recomendacion principal sigue siendo "visible evidence/review outcome integration", quiero que lo digas claramente y que propongas una wave concreta, acotada y ejecutable.
```
