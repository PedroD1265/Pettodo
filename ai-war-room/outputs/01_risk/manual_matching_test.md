Claro, aquí tienes la auditoría de riesgos para la superficie `matching` de PETTODO, presentada en español como se solicitó.

***

# Auditoría de Riesgos de PETTODO

Estás actuando como un Ingeniero Senior de Herramientas de Python, Constructor de Automatización de Repositorios y revisor de riesgos de software.

Audita la superficie de PETTODO llamada `matching`.

Usa únicamente el paquete de archivos a continuación. No inventes archivos, comportamientos o dependencias que no sean visibles en el paquete.

## Enfoque requerido

- Corrección y riesgo de errores (bugs)
- Autenticación y límites de confianza
- Manejo y validación de datos
- Manejo de almacenamiento y medios cuando sea relevante
- Fragilidad operacional
- Manejo de errores
- Deriva arquitectónica
- Suposiciones de alto riesgo ocultas en pruebas o documentos

## Formato de salida

Devuelve un markdown con estas secciones:

1.  Resumen Ejecutivo
2.  Riesgos Principales
3.  Evidencia del Paquete
4.  Mitigaciones Sugeridas
5.  Victorias Rápidas
6.  Preguntas Abiertas

Reglas:

- Sé concreto y consciente del repositorio.
- Prioriza riesgos reales sobre comentarios de estilo.
- Indica la severidad como Crítica, Alta, Media o Baja.
- Haz referencia a las rutas de los archivos cuando sea posible.
- Si el paquete de archivos está incompleto, dilo explícitamente.
- Responde en español.

## Superficie

`matching`

## Paquete

(Se omite el paquete de texto original para mayor brevedad, ya que fue proporcionado en la solicitud).

***

## 1. Resumen Ejecutivo

La superficie `matching` presenta riesgos significativos que requieren atención inmediata. El riesgo más **crítico** es una severa **deriva arquitectónica** entre el sistema de emparejamiento documentado y el que está implementado. El documento `AI_MATCHING.md` describe un sofisticado pipeline de IA de varias etapas, mientras que la implementación real en `server/routes/matching.ts` es un sistema de puntuación heurístico simple que carece de las capacidades documentadas (como la validación de calidad de imagen o el uso de embeddings).

Otro riesgo **crítico** es la **duplicación y divergencia de la lógica de puntuación** entre el backend y el frontend (`src/app/utils/matching.ts`). Estas dos implementaciones utilizan pesos y lógica diferentes, lo que podría llevar a resultados de coincidencias inconsistentes, creando confusión en el usuario y una pesadilla de mantenimiento.

Adicionalmente, se identificó un riesgo **alto** de seguridad: el endpoint de matching carece de una verificación de autorización a nivel de recurso. Cualquier usuario autenticado puede ejecutar el proceso de matching para cualquier ID de caso, lo que podría filtrar información sensible de casos que no le pertenecen.

Aunque el sistema actual funciona a un nivel básico, su fragilidad, la brecha con la documentación y la vulnerabilidad de autorización lo exponen a errores, abuso y desconfianza por parte de los stakeholders y usuarios.

## 2. Riesgos Principales

1.  **Deriva Arquitectónica entre Documentación e Implementación (Severidad: Crítica)**
    El código implementado es un sistema de puntuación heurístico simple, lo cual contradice directamente la documentación canónica (`docs/02_build/AI_MATCHING.md`) que promete un pipeline de IA avanzado con compuertas de calidad, embeddings y múltiples etapas. Esto crea expectativas falsas, puede llevar a decisiones de producto incorrectas y representa una deuda técnica masiva.

2.  **Duplicación y Divergencia de la Lógica de Negocio (Severidad: Crítica)**
    Existe una implementación de la lógica de puntuación de coincidencias tanto en el backend (`server/routes/matching.ts`) como en el frontend (`src/app/utils/matching.ts`). Estas implementaciones no están sincronizadas: usan pesos diferentes para los mismos atributos (p. ej., colores, rasgos) y manejan valores nulos de forma distinta. Esto viola el principio de "Single Source of Truth" (Única Fuente de Verdad) y garantiza resultados inconsistentes si la lógica del frontend llegara a ser utilizada.

3.  **Falta de Autorización a Nivel de Recurso (Severidad: Alta)**
    El endpoint `GET /api/matching/cases/:id` solo verifica si el usuario está autenticado (`verifyToken`), pero no comprueba si el usuario solicitante es el propietario o tiene permiso para acceder al caso con el `:id` proporcionado. Esto permite a cualquier usuario autenticado ejecutar el matching para cualquier caso en el sistema, exponiendo potencialmente detalles de casos ajenos a través de los resultados de las coincidencias.

4.  **Validación de Datos Insuficiente y Manejo de Errores (Severidad: Media)**
    El código realiza conversiones de tipo (`parseFloat`, `Number`) en datos provenientes de la base de datos (`approx_lat`, `created_at`) sin una validación robusta. Si estos campos contienen valores no numéricos, las funciones de puntuación recibirán `NaN`, lo que podría llevar a puntuaciones y confianzas incorrectas o a comportamientos inesperados que no se manejan explícitamente.

5.  **Fragilidad Operacional y Escalabilidad (Severidad: Media)**
    El endpoint recupera hasta 300 casos candidatos (`LIMIT 300`) de la base de datos y luego los procesa en memoria en un bucle de JavaScript. Aunque el límite previene una carga masiva, este enfoque no es escalable. A medida que la base de datos crezca, realizar cálculos como la distancia Haversine en la capa de aplicación para cada solicitud será ineficiente y podría convertirse en un cuello de botella.

## 3. Evidencia del Paquete

1.  **Deriva Arquitectónica:**
    -   **Documentación:** `docs/02_build/AI_MATCHING.md` describe un pipeline detallado con etapas como "Stage B — Cheap quality gate", "Stage E — Feature and embedding generation", y "Stage G — Ranking".
    -   **Implementación:** `server/routes/matching.ts` muestra un enfoque mucho más simple: una consulta a la base de datos seguida de un bucle `for` que aplica sumas heurísticas basadas en distancia, antigüedad, tamaño y colores. No hay mención ni uso de embeddings, análisis de calidad de imagen o un pipeline de IA.

    ```typescript
    // server/routes/matching.ts
    const candidatesRes = await query(
      `SELECT * FROM cases ... LIMIT 300`, ...
    );
    // ...
    for (const c of candidatesRes.rows) {
      let score = 0;
      // ... cálculos simples de puntuación ...
      score += d.score; // distance
      score += r.score; // recency
      // etc.
    }
    ```

2.  **Duplicación y Divergencia de Lógica:**
    -   **Backend (`server/routes/matching.ts`):** Limita la puntuación de colores y rasgos.
        ```typescript
        // Colors
        if (colorMatches > 0) {
          score += Math.min(colorMatches * 10, 20); // Max 20 puntos
          reasons.push('similar color');
        }
        // Traits
        if (sharedTraits.length > 0) {
          score += Math.min(sharedTraits.length * 5, 15); // Max 15 puntos
          reasons.push('matching trait');
        }
        ```
    -   **Frontend (`src/app/utils/matching.ts`):** No limita la puntuación de colores ni rasgos.
        ```typescript
        // Colors
        if (colorMatches > 0) {
          score += colorMatches * 10; // Sin límite
          reasons.push('similar color');
        }
        // Traits
        if (sharedTraits.length > 0) {
          score += sharedTraits.length * 5; // Sin límite
          reasons.push('matching feature');
        }
        ```
    Esto significa que las mismas dos mascotas podrían obtener puntuaciones de confianza diferentes dependiendo de dónde se ejecute el cálculo.

3.  **Falta de Autorización:**
    -   En `server/routes/matching.ts`, la ruta se define para cualquier usuario autenticado:
        ```typescript
        router.get('/matching/cases/:id', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
        ```
    -   La consulta para obtener el caso de origen no incluye una cláusula `WHERE` para verificar la propiedad del usuario (`uid`):
        ```typescript
        const originRes = await query('SELECT * FROM cases WHERE id = $1', [id]);
        if (originRes.rows.length === 0) {
          res.status(404).json({ error: 'case_not_found' });
          return;
        }
        ```
    El `AuthenticatedRequest` podría contener un `uid` del usuario, pero no se utiliza para autorizar el acceso al caso.

4.  **Validación de Datos Insuficiente:**
    -   El código en `server/routes/matching.ts` confía ciegamente en que los valores de la base de datos son numéricos o cadenas que se pueden convertir a números.
        ```typescript
        const originLat = origin.approx_lat != null ? parseFloat(origin.approx_lat) : null;
        const originLng = origin.approx_lng != null ? parseFloat(origin.approx_lng) : null;
        // ...
        const r = recencyScore(Number(c.created_at));
        ```
    Si `origin.approx_lat` fuera `"invalid"`, `parseFloat` devolvería `NaN`, y el cálculo de la distancia fallaría silenciosamente, resultando en una puntuación de 0 para la distancia.

## 4. Mitigaciones Sugeridas

1.  **Reconciliar Documentación e Implementación:** Decidir sobre una única dirección.
    -   **Opción A (Realista):** Actualizar `AI_MATCHING.md` para reflejar la implementación heurística actual, describiéndola como una "Fase 1" y moviendo el pipeline de IA a una sección de "Hoja de Ruta Futura".
    -   **Opción B (Ambiciosa):** Planificar y ejecutar el trabajo para implementar el pipeline de IA descrito en la documentación, reemplazando el motor heurístico actual.

2.  **Centralizar la Lógica de Negocio:**
    -   Eliminar el archivo `src/app/utils/matching.ts` por completo.
    -   Asegurarse de que toda la lógica de matching se invoque a través del `matchingRealAdapter` que llama al endpoint de la API del backend. Esto convierte al backend en la única fuente de verdad para la puntuación de coincidencias.

3.  **Implementar Autorización a Nivel de Recurso:**
    -   Modificar el endpoint en `server/routes/matching.ts` para verificar que el `uid` del usuario (del `AuthenticatedRequest`) coincida con el `user_id` asociado al caso de origen.
    -   La consulta inicial debería ser algo como: `SELECT * FROM cases WHERE id = $1 AND user_id = $2`, pasando el `req.user.uid` como segundo parámetro.

4.  **Añadir Validación de Datos Robusta:**
    -   Antes de usar `parseFloat` o `Number`, validar que los datos son realmente numéricos. Utilizar bibliotecas como `zod` para validar los datos recuperados de la base de datos podría estandarizar y robustecer este proceso.
    -   Si un valor no es válido, se debe registrar un error y el campo debe ser omitido del cálculo de la puntuación de forma explícita, en lugar de permitir que `NaN` se propague.

5.  **Optimizar para Escalabilidad:**
    -   A largo plazo, mover los cálculos intensivos a la base de datos. Si se usa PostgreSQL, la extensión `PostGIS` puede realizar cálculos de distancia geodésica de manera mucho más eficiente que en la capa de aplicación. La consulta podría devolver directamente la distancia en `km` para cada candidato.

## 5. Victorias Rápidas

1.  **Eliminar Código Frontend Duplicado:** Borrar el archivo `src/app/utils/matching.ts` es una acción inmediata, de bajo riesgo, que elimina una fuente importante de confusión y deuda técnica.
2.  **Añadir Verificación de Propietario:** Implementar la comprobación de `user_id` en el endpoint `GET /api/matching/cases/:id` es un cambio relativamente pequeño que cierra una brecha de seguridad de alta severidad.
3.  **Validar Parámetro de Ruta:** Añadir una validación simple para el `id` en la ruta (p. ej., que sea un UUID válido) para evitar que consultas malformadas lleguen a la base de datos. Esto previene una clase de errores 500.

## 6. Preguntas Abiertas

1.  ¿Cuál es el propósito original del archivo `src/app/utils/matching.ts`? ¿Es código heredado obsoleto, o se usa en algún flujo que no está cubierto en el paquete, como un modo offline?
2.  ¿Son los stakeholders (producto, dirección) conscientes de la brecha entre la documentación (`AI_MATCHING.md`) y la implementación actual? ¿Cuál es la hoja de ruta para cerrar esta brecha?
3.  ¿Existen límites de tasa (rate limiting) para el endpoint `/api/matching/cases/:id`? Sin ellos, un usuario podría abusar del servicio llamándolo repetidamente para diferentes IDs de casos, causando una carga innecesaria en el servidor.
4.  ¿Qué garantías existen a nivel de base de datos de que los campos `approx_lat`, `approx_lng` y `created_at` siempre contendrán formatos válidos que puedan ser convertidos a números sin error?