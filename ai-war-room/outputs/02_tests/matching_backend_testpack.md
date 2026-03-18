# Test Pack Decision

# Blocking Tests

Aquí está la lista de tests bloqueantes y de alta confianza para el endpoint `GET /api/matching/cases/:id`. Cada test está diseñado para ser atómico y verificar una pieza crítica de la lógica del backend.

---

1.  **test name**: `should return 401 Unauthorized if no token is provided`
    *   **purpose**: Verificar que el middleware `verifyToken` protege correctamente la ruta.
    *   **arrange**: Ningún mock es necesario. El middleware se encargará del rechazo.
    *   **act**: Realizar una petición `GET` a `/api/matching/cases/some-case-id` sin el header `Authorization`.
    *   **assert**:
        *   La respuesta debe tener un status `401`.
        *   El cuerpo de la respuesta debe contener un error relacionado con la autenticación.

2.  **test name**: `should return 404 Not Found if origin case does not exist`
    *   **purpose**: Validar el manejo de un ID de caso de origen que no se encuentra en la base de datos.
    *   **arrange**:
        *   `mockVerifyIdToken`: Simula un usuario autenticado.
        *   `mockQuery`: Para la primera consulta (búsqueda del caso de origen), debe resolver a `{ rows: [] }`.
    *   **act**: Realizar una petición `GET` a `/api/matching/cases/non-existent-id` con un token de autenticación válido.
    *   **assert**:
        *   La respuesta debe tener un status `404`.
        *   El cuerpo de la respuesta debe ser `{ error: 'case_not_found' }`.
        *   `mockQuery` debe haber sido llamado solo una vez.

3.  **test name**: `should return 500 Internal Server Error if database query fails`
    *   **purpose**: Asegurar que los errores inesperados de la base de datos son capturados y manejados, evitando que el servidor se caiga.
    *   **arrange**:
        *   `mockVerifyIdToken`: Simula un usuario autenticado.
        *   `mockQuery`: Debe ser configurado para lanzar un error (`.mockRejectedValueOnce(new Error('DB connection lost'))`).
    *   **act**: Realizar una petición `GET` a `/api/matching/cases/any-id` con un token de autenticación válido.
    *   **assert**:
        *   La respuesta debe tener un status `500`.
        *   El cuerpo de la respuesta debe ser `{ error: 'matching_failed', message: 'DB connection lost' }`.

4.  **test name**: `should return an empty array if no potential candidates are found`
    *   **purpose**: Verificar el comportamiento cuando existen casos del tipo opuesto, pero ninguno está `active`.
    *   **arrange**:
        *   `mockVerifyIdToken`: Simula un usuario autenticado.
        *   `mockQuery` (primera llamada): Resuelve con un caso de origen válido (ej. `type: 'lost'`).
        *   `mockQuery` (segunda llamada): Resuelve con `{ rows: [] }` para simular que no se encontraron candidatos activos.
    *   **act**: Realizar una petición `GET` al ID del caso de origen.
    *   **assert**:
        *   La respuesta debe tener un status `200`.
        *   El cuerpo de la respuesta debe ser un array vacío `[]`.

5.  **test name**: `should return correctly ranked matches based on confidence score`
    *   **purpose**: Confirmar que el algoritmo de ranking funciona y los resultados se ordenan de mayor a menor confianza.
    *   **arrange**:
        *   `mockVerifyIdToken`: Simula un usuario autenticado.
        *   `vi.spyOn(Date, 'now')`: Mockear `Date.now()` a un valor fijo para que los scores de `recency` sean predecibles.
        *   `mockQuery` (primera llamada): Resuelve con un caso de origen `lost`.
        *   `mockQuery` (segunda llamada): Resuelve con tres candidatos `found`:
            1.  Candidato A: Coincidencia perfecta (muy cerca, muy reciente, mismo tamaño, colores, etc.). Score alto.
            2.  Candidato B: Coincidencia media (lejos, algo reciente, sin coincidencia de tamaño). Score medio.
            3.  Candidato C: Coincidencia baja (muy lejos, antiguo, diferente tamaño). Score bajo pero > 15.
    *   **act**: Realizar una petición `GET` al ID del caso de origen.
    *   **assert**:
        *   La respuesta debe tener un status `200`.
        *   El cuerpo debe ser un array de 3 elementos.
        *   El orden debe ser `[candidato_A, candidato_B, candidato_C]`.
        *   `res.body[0].caseId` debe ser el ID del candidato A.
        *   `res.body[0].confidence` debe ser mayor que `res.body[1].confidence`.
        *   `res.body[1].confidence` debe ser mayor que `res.body[2].confidence`.

6.  **test name**: `should filter out candidates with confidence score below 15`
    *   **purpose**: Verificar que la lógica `if (confidence < 15) continue;` funciona correctamente.
    *   **arrange**:
        *   `mockVerifyIdToken`: Simula un usuario autenticado.
        *   `vi.spyOn(Date, 'now')`: Mockear `Date.now()` a un valor fijo.
        *   `mockQuery` (primera llamada): Resuelve con un caso de origen.
        *   `mockQuery` (segunda llamada): Resuelve con dos candidatos:
            1.  Candidato A: Score medio (ej. confianza ~40).
            2.  Candidato B: Score muy bajo (ej. confianza ~10), sin coincidencias significativas.
    *   **act**: Realizar una petición `GET` al ID del caso de origen.
    *   **assert**:
        *   La respuesta debe tener un status `200`.
        *   El cuerpo debe ser un array con 1 solo elemento (Candidato A).
        *   El array de resultados no debe contener al Candidato B.

7.  **test name**: `should handle null values in location, size, colors, and traits gracefully`
    *   **purpose**: Testear la robustez (null safety) del algoritmo de scoring. El código no debe fallar si los campos opcionales son nulos.
    *   **arrange**:
        *   `mockVerifyIdToken`: Simula un usuario autenticado.
        *   `vi.spyOn(Date, 'now')`: Mockear `Date.now()`.
        *   `mockQuery` (primera llamada): Resuelve con un caso de origen con `approx_lat`, `size`, `colors`, `traits` todos nulos.
        *   `mockQuery` (segunda llamada): Resuelve con un candidato que sí tiene todos los datos.
    *   **act**: Realizar una petición `GET` al ID del caso de origen nulo.
    *   **assert**:
        *   La respuesta debe tener un status `200`.
        *   El endpoint no debe lanzar un error 500.
        *   Se debe devolver un resultado (el candidato), pero su score de confianza se basará solo en `recency` (ya que los demás scores no se podrán calcular).
        *   `res.body[0].reasons` no debe contener razones de distancia, tamaño, color o rasgos.

8.  **test name**: `should match a 'lost' case with 'found' and 'sighted' candidates only`
    *   **purpose**: Validar que la lógica de `candidateTypes` se aplica correctamente en la consulta a la base de datos para un caso 'lost'.
    *   **arrange**:
        *   `mockVerifyIdToken`: Simula un usuario autenticado.
        *   `mockQuery` (primera llamada): Resuelve con un caso de origen con `type: 'lost'`.
    *   **act**: Realizar una petición `GET` al ID del caso de origen.
    *   **assert**:
        *   Verificar que la segunda llamada a `mockQuery` fue hecha con los parámetros correctos. Específicamente, el primer argumento de la query (`$1`) debe ser `['found', 'sighted']`.

9.  **test name**: `should match a 'found' case with 'lost' candidates only`
    *   **purpose**: Validar la lógica de `candidateTypes` para un caso 'found'.
    *   **arrange**:
        *   `mockVerifyIdToken`: Simula un usuario autenticado.
        *   `mockQuery` (primera llamada): Resuelve con un caso de origen con `type: 'found'`.
    *   **act**: Realizar una petición `GET` al ID del caso de origen.
    *   **assert**:
        *   Verificar que la segunda llamada a `mockQuery` fue hecha con el primer argumento (`$1`) igual a `['lost']`.

10. **test name**: `should return a maximum of 20 results, even if more candidates match`
    *   **purpose**: Verificar que la paginación final (`.slice(0, 20)`) funciona.
    *   **arrange**:
        *   `mockVerifyIdToken`: Simula un usuario autenticado.
        *   `vi.spyOn(Date, 'now')`: Mockear `Date.now()`.
        *   `mockQuery` (primera llamada): Resuelve con un caso de origen.
        *   `mockQuery` (segunda llamada): Resuelve con 25 candidatos, todos con datos que generarían un score de confianza > 15.
    *   **act**: Realizar una petición `GET` al ID del caso de origen.
    *   **assert**:
        *   La respuesta debe tener un status `200`.
        *   El cuerpo de la respuesta (`res.body`) debe ser un array con una longitud de exactamente `20`.

# Suggested File Structure

```typescript
// tests/matching.test.ts

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import request from 'supertest';

// 1. Mocks (hoisted)
const mockVerifyIdToken = vi.hoisted(() => vi.fn());
const mockQuery = vi.hoisted(() => vi.fn());

vi.mock('../server/db.js', () => ({
  query: mockQuery,
}));

vi.mock('../server/middleware/verifyToken.js', () => ({
  // Mockeamos el middleware completo para simplificar la prueba de autorización
  verifyToken: (req, res, next) => {
    // Replicamos el comportamiento del mock de firebase para otros tests
    mockVerifyIdToken()
      .then(user => {
        req.user = user;
        next();
      })
      .catch(() => {
        res.status(401).json({ error: 'unauthorized' });
      });
  }
}));

import app from '../server/app.js'; // Importar app después de los mocks

// 2. Constantes y Helpers de Test
const FAKE_USER = { uid: 'test-user-id', email: 'test@example.com' };

const NOW = 1700000000000; // Un timestamp fijo para controlar el score de recencia

const ORIGIN_CASE_LOST = {
  id: 'case-lost-1',
  type: 'lost',
  status: 'active',
  approx_lat: '40.7128',
  approx_lng: '-74.0060', // NYC
  size: 'Medium',
  colors: ['brown', 'white'],
  traits: ['friendly', 'scared'],
  created_at: String(NOW - 3600 * 1000 * 3), // 3 hours ago
};

const PERFECT_MATCH_CANDIDATE = {
  id: 'case-found-1',
  type: 'found',
  status: 'active',
  approx_lat: '40.7130', // Muy cerca
  approx_lng: '-74.0058',
  size: 'Medium',
  colors: ['BROWN'], // Case-insensitive check
  traits: ['very friendly dog'],
  created_at: String(NOW - 3600 * 1000 * 1), // 1 hour ago (muy reciente)
  // ...otros campos para el response
};

const LOW_SCORE_CANDIDATE = {
  id: 'case-found-2',
  type: 'found',
  status: 'active',
  approx_lat: '34.0522', // Muy lejos (LA)
  approx_lng: '-118.2437',
  size: 'Large', // Diferente
  colors: ['black'],
  traits: ['aggressive'],
  created_at: String(NOW - 3600 * 1000 * 100), // Muy antiguo
};

function authHeader() {
  return { Authorization: 'Bearer valid-token' };
}

// 3. Suite de Pruebas
describe('GET /api/matching/cases/:id', () => {

  let dateSpy;

  beforeEach(() => {
    vi.clearAllMocks();
    // Siempre autenticar por defecto, las pruebas de no-auth lo sobreescribirán
    mockVerifyIdToken.mockResolvedValue(FAKE_USER);
    // Mockear la fecha para resultados consistentes
    dateSpy = vi.spyOn(Date, 'now').mockReturnValue(NOW);
  });

  afterEach(() => {
    dateSpy.mockRestore();
  });

  // 4. Casos de prueba (it blocks)
  it('should return 401 Unauthorized if no token is provided', async () => {
    // ...
  });

  it('should return 404 Not Found if origin case does not exist', async () => {
    // ...
  });
  
  // ... más tests
});
```

# Required Mocks

1.  **`db.query`**: Es el mock más crítico. Debe ser flexible para simular diferentes respuestas de la base de datos en secuencia, utilizando `.mockResolvedValueOnce({ rows: [...] })`.
    *   Primera llamada: Para obtener el caso de origen.
    *   Segunda llamada: Para obtener la lista de candidatos.
    *   También debe poder simular un fallo con `.mockRejectedValueOnce()`.

2.  **`middleware/verifyToken.js`** (o su dependencia `firebaseAdmin.js`): Para controlar el flujo de autenticación.
    *   Para pruebas exitosas: `mockVerifyIdToken.mockResolvedValue(FAKE_USER)`.
    *   Para pruebas de fallo de auth: `mockVerifyIdToken.mockRejectedValue(new Error('Invalid token'))`.

3.  **`Date.now`**: Indispensable para tener un control determinista sobre el `recencyScore`. Sin esto, los tests de ranking y confianza serían inestables. Se debe mockear con `vi.spyOn(Date, 'now').mockReturnValue(FIXED_TIMESTAMP)`.

# Edge Cases To Include Now

-   **Valores nulos/ausentes**: Probar un caso de origen y/o candidato donde `approx_lat`, `approx_lng`, `size`, `colors`, `traits` son `null`. El sistema debe degradarse elegantemente sin crashear.
-   **Arrays vacíos**: Probar con `colors: []` y `traits: []`. El score de esos apartados debería ser 0.
-   **Case-insensitivity**: Asegurar que la coincidencia de `colors` y `traits` no es sensible a mayúsculas/minúsculas (ej. "Brown" vs "brown").
-   **El candidato es el mismo que el origen**: La query `id != $2` ya lo previene, pero un test puede verificar que si la DB (por error) devolviera el mismo caso, este no aparezca en los resultados. (Este es de menor prioridad pero bueno tenerlo en cuenta).
-   **Máximo de `reasons`**: El código usa `reasons.slice(0, 3)`. Un test con un candidato que coincida en más de 3 categorías (ej. distancia, recencia, tamaño, color) debería afirmar que el array `reasons` tiene una longitud máxima de 3.
-   **Confidence cap**: El cálculo es `Math.min(..., 95)`. Un test con una coincidencia "perfecta" que superaría el 95% de confianza debe afirmar que la confianza devuelta es exactamente `95`.

# Do Not Test Yet

-   **Precisión matemática de `haversineKm`**: No necesitamos tests unitarios para la fórmula de Haversine. Confiamos en que es correcta y solo probamos su efecto a través del `distanceScore`.
-   **Todas las variaciones de `formatTimeAgo`**: No testear "1 min ago", "2 min ago", "1 hour ago", "2 hours ago", "1 day ago", etc. Un solo test que verifique que el campo `time` existe y tiene un formato de string no vacío es suficiente por ahora.
-   **El "magic number" `95` en el cálculo de confianza**: No debemos cuestionar por qué es 95 y no 100 o 115 (la suma máxima teórica de scores). Simplemente testeamos que el cálculo se realiza según la fórmula escrita.
-   **Rendimiento con 300+ candidatos**: La query tiene un `LIMIT 300`. No necesitamos testear el rendimiento del bucle de scoring con miles de registros. Eso sería un test de carga/performance, no de unidad/integración.
-   **Validación de datos en la DB**: No vamos a testear si un `created_at` es un timestamp inválido o si `approx_lat` no es un número. Asumimos que los datos en la DB tienen la integridad básica necesaria.

# Final Implementer Prompt

Implementa el archivo de test `tests/matching.test.ts` usando `vitest` y `supertest` de acuerdo a la especificación detallada. Enfócate en mockear `db.query` y `Date.now` para crear escenarios de prueba predecibles y reproducibles. Cubre de forma prioritaria los casos de autenticación (401), recurso no encontrado (404), error de servidor (500), el ranking correcto por `confidence`, el filtrado de scores bajos y el manejo robusto de valores nulos en los datos de los casos. Sigue la estructura de archivo y las constantes sugeridas para mantener la consistencia con el resto del proyecto.