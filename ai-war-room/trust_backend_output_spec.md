# PETTODO Trust Backend Output Spec

Esta especificacion define donde y como guardar cada output de la wave trust-sensitive backend.

## Convencion general
- Formato principal: Markdown (.md)
- Formato crudo opcional: JSON (.json) cuando se use call_vertex_review.py
- Timestamp: yyyymmdd_hhmmss
- Prefijo: trust_backend_

## Tabla de outputs

| Nombre sugerido | Proposito | Carpeta de salida | Formato esperado | Cuando se produce |
| --- | --- | --- | --- | --- |
| trust_backend_contract_freeze_<ts>.md | Congelar contrato real por endpoint | outputs/05_trust_contracts | Markdown con matriz de contrato | Primera ejecucion de la wave |
| trust_backend_contract_freeze_<ts>.json | Respuesta REST cruda para trazabilidad | outputs/05_trust_contracts | JSON estructurado | Junto al contract freeze si se usa caller REST |
| trust_backend_adversarial_<ts>.md | Hallazgos adversariales y tests derivados | outputs/06_trust_adversarial | Markdown con findings priorizados | Despues de contract freeze |
| trust_backend_adversarial_<ts>.json | Payload crudo de adversarial review | outputs/06_trust_adversarial | JSON estructurado | Junto al adversarial review |
| trust_backend_test_authoring_<ts>.md | Draft(s) completos de archivos de tests | outputs/07_trust_tests | Markdown con bloques de codigo TS | Despues de adversarial review |
| trust_backend_self_critique_<ts>.md | Critica estructurada de los drafts | outputs/07_trust_tests | Markdown con issues y fixes | Inmediatamente tras test authoring |
| trust_backend_failure_repair_<ts>.md | Triage de fallos reales tras correr tests | outputs/07_trust_tests | Markdown con clasificacion de causa raiz | Solo cuando hay test failures reales |
| trust_backend_release_gate_<ts>.md | Decision de gate (GO/CONDITIONAL_GO/NO_GO) | outputs/08_trust_release | Markdown con blockers y riesgos residuales | Antes de pasar a implementacion/cierre |
| trust_backend_diff_review_<ts>.md | Verificacion del diff implementado y drift | outputs/08_trust_release | Markdown con matriz de cumplimiento | Despues de implementar cambios |

## Minimo de metadatos por archivo
Agregar al inicio del markdown:
- wave: trust_backend
- surface: trust-sensitive backend boundary
- generated_at_utc
- model
- prompt_template
- bundle_source

## Reglas de trazabilidad
- Cada output debe citar los inputs usados.
- Si hubo placeholders no resueltos, marcarlo explicitamente.
- No sobreescribir outputs previos: siempre nuevo timestamp.

## Checklist rapido de cierre
1. Estan todos los .md esperados para la etapa actual.
2. Existen .json crudos cuando la ejecucion fue por REST caller.
3. Los archivos estan en la carpeta correcta segun etapa.
4. La decision de release gate esta registrada antes de implementar.
5. Existe diff review posterior a implementacion.