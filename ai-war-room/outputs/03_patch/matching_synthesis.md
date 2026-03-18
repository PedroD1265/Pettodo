# Executive Decision

Este paquete sintetiza cuatro análisis previos (`risk`, `tests`, `patch`, `docs`) sobre la superficie `matching` de PETTODO en un plan de implementación unificado y accionable. La directiva es clara: estabilizar la funcionalidad existente antes de abordar la visión de IA a largo plazo.

La implementación actual es un MVP heurístico que sufre de tres problemas críticos: un error fundamental en el cálculo de la confianza, lógica de negocio duplicada e inconsistente entre el backend y el frontend, y un contrato de API roto que impide que el cliente consuma los datos correctamente.

Este plan de trabajo prioriza la corrección, la consistencia y la eliminación de deuda técnica inmediata. Se centra en arreglar el sistema existente para que sea fiable, mantenible y sirva como una base estable para futuras mejoras. Las tareas están ordenadas para minimizar el riesgo y maximizar el valor, asegurando que el sistema de `matching` funcione como se espera *ahora*. La implementación de la visión de IA descrita en `AI_MATCHING.md` se aplaza explícitamente hasta que esta estabilización esté completa.

# Top 3 Real Risks

| ID | Severity | Why it matters | What to change |
| :--- | :--- | :--- | :--- |
| **R-01** | **High** | **Flawed Confidence Score:** El cálculo de `confidence` usa un denominador incorrecto (95 en vez de 115), inflando artificialmente la puntuación y haciendo que la métrica principal de la funcionalidad sea fundamentalmente errónea y poco fiable. | Corregir la fórmula de `confidence` en `server/routes/matching.ts` para que use el denominador correcto (`115`), reflejando la puntuación máxima posible. |
| **R-02** | **Critical** | **Duplicated and Divergent Business Logic:** Existe una reimplementación de la lógica de matching en el frontend (`src/app/utils/matching.ts`) que es inconsistente con el backend. Esto garantiza bugs, crea una pesadilla de mantenimiento y confunde sobre cuál es la fuente de verdad. | Eliminar por completo el archivo `src/app/utils/matching.ts` y refactorizar cualquier posible uso para que dependa exclusivamente de la API del backend, que debe ser la única fuente de verdad. |
| **R-03** | **Critical** | **Broken API Contract:** El frontend espera una estructura de datos (`MatchResult` con un objeto `case` anidado) que no coincide con la respuesta plana que la API del backend realmente devuelve (`caseId`, etc.). Esto rompe el flujo de datos y causa errores en tiempo de ejecución, impidiendo que los resultados se muestren. | Modificar la interfaz `MatchResult` en el código del cliente para que refleje la estructura de datos plana que la API del backend produce. |

# Top 5 Tests To Build First

| test name | purpose | why now |
| :--- | :--- | :--- |
| **T-01: `test_api_unauthenticated_access_is_rejected`** | Asegurar que el endpoint `matching` rechaza peticiones sin un token de autenticación válido con un código `401`. | Es la primera línea de defensa de seguridad y debe estar garantizada antes de probar cualquier lógica de negocio. |
| **T-02: `test_unit_scoring_helpers_are_correct`** | Validar que las funciones puras de puntuación (`recencyScore`, `distanceScore`, etc.) en `server/routes/matching.ts` devuelven los valores esperados para entradas conocidas. | El núcleo del algoritmo de matching reside en estas funciones. Asegurar su corrección es vital, especialmente al corregir la fórmula de `confidence` (R-01). |
| **T-03: `test_integration_perfect_match_returns_correct_top_result`** | Probar el flujo completo de la API (con una DB mockeada) para un caso de origen y un candidato "perfecto", verificando que el resultado tiene la `confidence` correcta (usando el nuevo cálculo) y la estructura de respuesta adecuada. | Valida que la solución a los riesgos R-01 (cálculo) y R-03 (contrato) funciona correctamente de forma integrada. |
| **T-04: `test_integration_low_confidence_matches_are_filtered`** | Verificar que los candidatos cuya puntuación final resulta en una `confidence` por debajo del umbral de negocio (actualmente 15) son excluidos de la respuesta final. | Confirma que el filtro de calidad de resultados funciona como se espera, lo cual es aún más importante después de corregir el cálculo de `confidence` que afectará a todas las puntuaciones. |
| **T-05: `test_integration_nonexistent_case_returns_404`** | Comprobar que si se solicita matching para un `caseId` que no existe en la base de datos, la API responde con un `404 Not Found`. | Asegura el manejo de errores básico y previene fallos inesperados en un escenario de uso común. |

# Ordered Implementation Plan

| step number | files to touch | exact change objective | risk level | acceptance criteria |
| :--- | :--- | :--- | :--- | :--- |
| **1** | `server/routes/matching.ts` | **Corregir cálculo de confianza.** Introducir una constante `MAX_SCORE = 115` y actualizar la fórmula de `confidence` para usar `(score / MAX_SCORE)`. | **Low** | - Una nueva constante `MAX_SCORE` con valor `115` es definida.<br>- La fórmula de `confidence` es actualizada a `Math.min(Math.round((score / MAX_SCORE) * 100), 95)`.<br>- Una prueba unitaria que simula `score = 115` debe dar como resultado `confidence = 95`.<br>- Una prueba que simula `score = 95` debe dar como resultado `confidence = 83`. |
| **2** | `src/app/services/api.ts`<br>(o donde se defina `MatchResult`) | **Sincronizar el contrato de API del cliente.** Modificar la interfaz `MatchResult` para que sea una estructura plana que coincida con la respuesta del backend (e.g., `caseId: string` en lugar de `case: Case`). | **Medium** | - La interfaz `MatchResult` es actualizada para ser plana, conteniendo campos como `caseId`, `reasons`, `location`, `time`, `caution`, etc.<br>- El proyecto de frontend falla al compilar debido a errores de tipo en los componentes que usan la antigua interfaz. Esto es esperado e indica que el paso fue exitoso. |
| **3** | `src/app/utils/matching.ts` | **Eliminar lógica de matching duplicada.** Borrar el archivo `src/app/utils/matching.ts` y eliminar todas sus importaciones en el resto del codebase. | **Medium** | - El archivo `src/app/utils/matching.ts` ya no existe en el repositorio.<br>- Una búsqueda global por `import` que referencie a `app/utils/matching` no devuelve resultados.<br>- El proyecto compila (después del paso 4). |
| **4** | `src/app/**/*.tsx`<br>(y otros archivos de componentes) | **Refactorizar componentes de UI.** Actualizar todos los componentes que consumían `MatchResult` o usaban `rankMatches` para que ahora utilicen la nueva interfaz plana y obtengan sus datos exclusivamente a través del `matchingRealAdapter`. | **High** | - El proyecto de frontend compila sin errores de tipo relacionados con `MatchResult`.<br>- La página de resultados de matching se renderiza correctamente, mostrando todos los datos (motivos, descripción, etc.) desde la nueva estructura de datos plana (e.g., `result.caseId` en lugar de `result.case.id`).<br>- No hay regresiones visuales o funcionales en la UI de matching. |

# Do Not Touch Yet

-   **`docs/02_build/AI_MATCHING.md`:** No modificar este documento. Representa la visión a largo plazo. Modificarlo ahora para que coincida con el MVP actual crearía confusión estratégica. El trabajo de este paquete es arreglar la implementación, no rebajar la visión.
-   **Optimización de Rendimiento de la Base de Datos:** No implementar optimizaciones de consulta (e.g., `SELECT` selectivo de columnas, mover cálculos de distancia a PostGIS). La prioridad es la corrección funcional. El rendimiento es un problema secundario que debe abordarse en un paquete de trabajo separado.
-   **Ajuste Fino de Umbrales:** No cambiar el umbral de filtrado (`confidence < 15`) ni el tope de confianza (`95`). Aunque la corrección del cálculo afectará los valores, debemos desplegar el arreglo primero y luego, si es necesario, ajustar estos umbrales basándonos en datos de producción, no en suposiciones.
-   **Implementación de Bandas de Confianza ("Strong/Probable Match"):** No implementar la lógica para mapear la `confidence` numérica a las etiquetas de texto ("Strong Match", etc.). Esta es una tarea de UI/Producto que debe construirse sobre la base de una puntuación de confianza ya corregida y estable.

# Final Implementer Prompt

```markdown
# Tarea: Estabilizar el servicio de `matching` de PETTODO

Actúa como un desarrollador full-stack senior. Aplica los siguientes cambios de forma secuencial para corregir bugs críticos y eliminar código duplicado en la superficie `matching`.

1.  **Backend (`server/routes/matching.ts`):**
    -   Define una constante `const MAX_SCORE = 115;`.
    -   Actualiza la línea de cálculo de `confidence` para que use `(score / MAX_SCORE)`.

2.  **Frontend (API Contract):**
    -   Localiza la interfaz `MatchResult` (probablemente en `src/app/services/api.ts` o `interfaces.ts`).
    -   Reemplázala con una estructura plana que coincida con la respuesta real de la API: `caseId: string`, `confidence: number`, `reasons: string[]`, `location: string`, `time: string`, `timeLabel: string`, `description: string`, `size: string`, `colors: string[]`, `candidateType: 'lost' | 'found' | 'sighted'`, `caution: string`, `nextAction: string`.

3.  **Frontend (Cleanup):**
    -   Elimina el archivo `src/app/utils/matching.ts` por completo.
    -   Busca en todo el proyecto y elimina cualquier importación rota que apunte a ese archivo.

4.  **Frontend (UI Refactor):**
    -   Corrige todos los errores de compilación de TypeScript causados por los pasos anteriores.
    -   Refactoriza los componentes de la UI para que consuman la nueva interfaz `MatchResult` plana. Asegúrate de que el acceso a los datos sea correcto (e.g., `result.caseId` en lugar de `result.case.id`). El flujo de datos debe provenir exclusivamente del servicio que llama a la API.
```