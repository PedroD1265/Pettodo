# PETTODO Execution Log

## Run Date
February 19, 2026

## What Was Implemented

### Iteration 1 — Foundation
- Complete PETTODO design system tokens (CSS variables in theme.css)
- 20+ reusable UI components (Buttons, Badges, Cards, Chat, Map, Timeline, Stepper, Modals, Banners)
- 100 required screen routes organized into 12 page groups + 3 meta pages
- Bipolar navigation (Emergency/Daily) with global mode switch
- App shell with adaptive bottom nav (5 tabs per mode)
- Public QR shell without app chrome
- All 10 end-to-end flows wired via React Router v7
- Complete demo data centered on dog "Luna"
- All 19 required UI copy phrases placed in correct screens
- iPhone 13 viewport (390x844) phone frame wrapper
- Design system living styleguide route
- QA Self-Check and Execution Log in-app routes

### Iteration 2 — Critical Spec Gaps Closed

#### Task 1 — Panic Mode (EMG_02/03/04/05)
- `Banner` component extended with `type="calm"` (green/soothing) and `type="antiscam"` variants
- "Stay calm — we'll guide you step by step" banner rendered at top of EMG_02
- All LOST flow steps now show minimal-field mode note
- Stepper component shows correct active step per screen

#### Task 2 — Verification Levels (VerificationFlows.tsx)
- `OTPFlow` component: phone entry → OTP input → success/error/rate_limit states
- `StrictVerificationFlow` component: start → ID front → ID back → selfie → submitted
- `StrictStatusView` component: pending / approved / rejected states
- `VerificationGate` wrapper: renders gate-block or gated children based on AppContext state
- `AppContext` extended with: `verificationLevel`, `strictStatus`, `caseClaimed`
- "Too many attempts. Try again in 60 minutes." shown in rate_limit state

#### Task 3 — Photo Quality Feedback (PhotoQuality.tsx)
- `PhotoUploadGrid` component: 3 slots, tap-to-simulate, cycles through good/ok/poor profiles
- Per-photo quality badge (CheckCircle / Info / AlertTriangle)
- Inline tip shown for ok/poor photos
- "Better photos improve match accuracy" warning bar when any photo is poor
- Photo guidance cards shown before first photo is added
- Integrated into EMG_02 (LOST photos) and EMG_08 (FOUND photos)

#### Task 4 — Flyer + Share Kit (FlyerShareKit.tsx)
- `FlyerPreview` component: header, photo placeholder, name, breed, trait chips, QR code placeholder, location+time block
- `ShareKitActions` component: Download PNG, Download PDF, Copy Text, Share Link buttons
- Share text panel with monospace preview and safety reminder
- Preview modal with full flyer view
- `FLYER_SHARE_TEXT` and `FLYER_SAFETY_REMINDER` constants in demoData.ts
- Integrated in EMG_07 (Share Flyer screen)

#### Task 5 — Case Lifecycle Timers (LifecycleTimers.tsx)
- `CaseLifecycleBar` component: 30-day progress bar, status chip, days remaining label
- `MatchLifecycleBar` component: 10-day bar, day 7 / day 9 markers, expiry state
- `formatDaysRemaining`, `getCaseStatusFromAge`, `getMatchStatusFromAge` helpers in demoData.ts
- `demoTimeOffset` and `caseStatus` state in AppContext
- Integrated in EMG_31 (Case Lifecycle screen)

#### Quick Fixes
- `theme.css`: added `--warning-bg`, `--warning-soft`, `--warning-dark`, `--info-bg`, `--info-soft`, `--info-dark` tokens
- `HOM_01`: empty `<h3>` removed, community access section made prominent
- `AppContext`: `hasActiveCase` defaults to `false` (was implicitly truthy)
- `Modals.tsx`: all hardcoded hex values replaced with CSS variable tokens

#### DemoControls (DemoControls.tsx)
- `DemoControlsFab`: gear icon FAB at bottom-right (semi-transparent)
- `DemoControlsPanel`: full panel controlling mode, hasActiveCase, caseClaimed, verificationLevel, strictStatus, caseStatus, demoTimeOffset
- Integrated in `AppShell` so all in-app screens have access

## Key Decisions
- Screens grouped by page into multi-export files for maintainability
- CSS variables used for all tokens (not Tailwind config) per Tailwind v4
- Maps are simulated placeholder views (no real map API)
- Auth, SMS, ID verification, and payments are simulated UI-only
- Inter font loaded via Google Fonts with system fallback
- All interactive targets meet 44px minimum (WCAG)
- Photo quality is simulated by cycling through 3 preset profiles
- DemoTimeOffset drives both CaseLifecycleBar and MatchLifecycleBar simultaneously
- `React.Fragment` avoided in mapped loops per Figma environment constraint — `<div className="contents">` used instead

## Open Questions
- Would real map integration (Mapbox/Google Maps) be desired for next iteration?
- Should the AI matching algorithm be simulated with more complex logic?
- Are additional demo dogs beyond Luna needed?
- Should photo upload simulate actual file input (FileReader)?

## Known Gaps
- Map views are placeholder (no Mapbox/Google Maps integration)
- Camera/photo upload is UI-only simulation (no FileReader or MediaDevices API)
- Real-time chat is simulated with static messages
- No actual SMS or captcha verification
- AI matching is simulated with demo data
- Calendar integration buttons are non-functional
- Flyer PNG/PDF download is simulated (toast only)

### Iteration 3 — Token Compliance
- Added `--gray-950` (#0a0a0a) to `theme.css`
- Replaced hardcoded hex values with CSS variable tokens in:
  - `MapComponents.tsx` (#F97316 -> var(--warning), #E8F4E8 -> var(--green-bg))
  - `QRP_screens.tsx` (#FFFBEB, #FDE68A, #92400E -> warning tokens)
  - `PD_screens.tsx` (#FFFBEB, #FDE68A -> warning tokens)
  - `HOM_04.tsx` (#FFFBEB -> var(--warning-bg))
  - `EMG_21_to_25.tsx` (#FFFBEB, #EFF6FF -> warning/info bg, #1a1a1a -> var(--gray-950))
  - `EMG_14_to_20.tsx` (#FFFBEB -> var(--warning-bg))
  - `EMG_08_to_13.tsx` (#FFFBEB -> var(--warning-bg))
  - `DLY_screens.tsx` (#EFF6FF, #BFDBFE -> info tokens)
  - `CMT_screens.tsx` (#FFF7ED, #FFFBEB -> var(--warning-bg))
  - `COM_EVT_screens.tsx` (#DBEAFE -> var(--info-soft), #FFFBEB -> var(--warning-bg))

### Iteration 4 — Panic Mode Claim Gate UX
- **EMG_06 (Lost Published)**:
  - Added "Your report is live" info section.
  - Wrapped "Edit Case" and "Open Chat" buttons with `VerificationGate` (basic level).
  - Wired `caseClaimed` state sync to verification success.
  - Preserved public "Share Flyer" and "View Matches" actions outside the gate.

### Iteration 5 — Found Privacy Radius Picker
- **EMG_09 (Found Privacy)**:
  - Replaced generic `RadiusSelector` with custom segmented control (300m / 500m / 1km).
  - Implemented custom Map Preview with dynamic dashed circle overlay.
  - Added "Your exact location is protected" banner.
  - Ensured all UI uses CSS variable tokens (no hex).

### Iteration 6 — Services & Trust (Daily Home & Modules)
- **HOM_01 (Daily Home)**:
  - Added "Services & Trust" section at equal hierarchy to "Community & Social".
  - Created cards for "Verified Walkers" (linked to `/walkers/marketplace`) and "Community Dogs" (linked to `/community-dogs/map-list`).
  - Added microcopy: "Higher-risk services require stricter verification."
- **Community Dogs (CMT)**:
  - Moved hardcoded dog data to `demoData.ts` as `COMMUNITY_DOGS`.
  - Implemented `communityDogSightings` in `AppContext` for demo persistence.
  - Updated `CMT_03` (Detail) to show a real `TimelineView` of sightings.
  - Added "I saw this dog today" flow (modal) in `CMT_03` that updates the timeline.
- **Walkers (SRV)**:
  - Added "Become a Walker" link in `SRV_01` leading to onboarding.
  - Added "PETTODO does not process payments" banner in `SRV_01`.
  - Added `walkerAvailability` to `AppContext` and implemented an Availability UI stub in `SRV_02` (Profile).
  - Ensured Strict Verification gating is referenced.

### Iteration 7 — Home labels + Community Dog Care Logs + QR Share Kit + Calendar Buttons
- **HOM_01 (Daily Home)**:
  - Renamed sections to "Community" and "Services".
  - Refined service cards style to match community grid.
  - Added "Higher-risk services may require stricter verification" helper.
- **Community Dogs (CMT_03)**:
  - Added "Care & Records" section.
  - Added quick actions for "Log Feeding", "Log Vaccine", "Add Note".
  - Implemented modals for care actions with simulated proof photo toggle.
  - Persisted care records in `AppContext`.
- **QR Share (QRH_04)**:
  - Implemented comprehensive Share Kit UI.
  - Added copyable share text panel with safety reminder.
  - Added buttons for WhatsApp, Instagram, Facebook (simulated).
- **Calendar Integration**:
  - Added "Calendar" button to `EVT_02` (Event Detail) and `PD_05` (Play Date Detail).
  - Implemented modal with "Google Calendar" and "Download .ics" options.

### Iteration 8 — Emergency Navigation Fix + Case Actions
- **Navigation (AppBar.tsx)**:
  - Updated back button logic to prefer `navigate(-1)` (history back).
  - Added fallback to `/home-emergency` (or `/home-daily`) if history is empty or looped.
  - Removed hardcoded `backTo` props from screens where history flow is preferred (e.g. `EMG_17`).
- **Emergency Matches (EMG_16 & EMG_17)**:
  - Added "Case Actions" section below main CTAs.
  - Included "Share Flyer" (`/emg/share-flyer`) and "Report Published" (`/emg/lost-published`) buttons.
  - Removed `backTo` from `EMG_17` to allow natural history navigation.
- **Home Emergency (HOM_02)**:
  - Added "Share Flyer" and "Matches" quick action buttons inside the active `CaseCard`.
  - Updated `CaseCard` component to support children for custom actions.
- **Share Kit (EMG_07)**:
  - Added "Back to Report Published" link at the bottom of the screen to complete the hub loop.

### Iteration 9 — Local-first Functionality

**Run Date:** February 20, 2026

**Objetivo general:** Convertir el prototipo de UI en una demo funcional real. Esto implicó cuatro áreas de trabajo: persistencia de datos local, generación real de códigos QR, mapas interactivos con tiles reales, y un algoritmo de coincidencia determinista. Ningún cambio rompe las rutas o pantallas existentes.

---

#### A. Capa de datos local (`src/app/data/storage.ts`)

**Qué se hizo y por qué:**
Antes de esta iteración, toda la información de la demo era estática y se perdía al recargar la página. Se creó un módulo de almacenamiento completo usando `localStorage` del navegador como base de datos local.

**Tipos e interfaces creados:**

| Tipo | Campos principales | Propósito |
|---|---|---|
| `Pet` | id, name, breed, size, colors, marks, collar, temperament, age, weight, microchip, vaccines, createdAt | Perfil completo de una mascota registrada |
| `Case` | id, type (lost/found/sighted), petId, status, lat, lng, privacyRadius, size, colors, traits, direction, createdAt | Caso de mascota perdida, encontrada o avistada |
| `Sighting` | id, caseId, lat, lng, location, time, note, createdAt | Avistamiento individual de un caso activo |
| `CareLog` | id, petId, date, ate, water, walked, note, createdAt | Registro de cuidado diario (comida, agua, paseo) |
| `UserVerificationState` | level, strictStatus, phone, verifiedAt | Estado de verificación del usuario |
| `EntityStore` | pets[], cases[], sightings[], careLogs[], verification | Contenedor raíz de todos los datos |

**Funciones implementadas:**

- `generateId()` — genera IDs únicos con prefijo de timestamp (ej. `pet-1708450000000-a3f`)
- `loadEntityStore()` — intenta leer `localStorage["pettodo_entities_v1"]`; si no existe o está corrupto, crea el store vacío e inyecta los datos semilla de demo
- `saveEntityStore(store)` — serializa el store completo a JSON y lo guarda en `localStorage`
- `resetEntityStore()` — borra la clave de localStorage y recarga el store (vuelve a semilla)

**Datos semilla insertados automáticamente en demo fresca:**

- **Luna** (pet-luna-001): perra mediana, mixed-breed, colores `["golden", "white"]`, collar rojo, microchip registrado, vacunas al día con próximo recordatorio el 20 Mar 2026
- **Caso perdida de Luna** (case-lost-001): tipo `lost`, activo, coordenadas Central Park (40.7751, -73.9738), 300 m de radio de privacidad, traits `["friendly", "collar"]`
- **2 avistamientos** de Luna: cerca de la Bethesda Fountain (hace 12 min) y Great Lawn (hace 45 min)
- **3 casos candidatos** para el algoritmo de coincidencia:
  - `case-found-001`: perro encontrado a 0.3 km, hace 2 h, talla Medium, color golden → alta coincidencia esperada
  - `case-sighted-001`: avistamiento a 0.8 km, hace 4 h, talla Medium → coincidencia media
  - `case-found-002`: perro encontrado a 3 km, hace 30 h, talla Small → baja coincidencia

**Integración en AppContext (`src/app/context/AppContext.tsx`):**

Se extendió el contexto global con las siguientes propiedades y métodos, todos disponibles en cualquier pantalla mediante `useApp()`:

```
store: EntityStore          — el store completo, actualizado en tiempo real
addPet(pet)  → Pet          — agrega una mascota y auto-guarda
addCase(c)   → Case         — agrega un caso y auto-guarda
addSighting(s) → Sighting   — agrega un avistamiento y auto-guarda
addCareLog(log) → CareLog   — agrega un registro de cuidado y auto-guarda
resetStore()                — resetea a datos semilla
```

Todos los métodos `add*` utilizan un patrón `updateStore(updater)` que:
1. Calcula el nuevo estado con `updater(prev)`
2. Llama a `setStore(next)` para re-renderizar React
3. Llama a `saveEntityStore(next)` para persistir en localStorage inmediatamente

El store se inicializa con `useState(() => loadEntityStore())` — se ejecuta solo una vez al montar el árbol de componentes.

---

#### B. Generación real de códigos QR

**Qué se hizo y por qué:**
Las pantallas de QR Hub y el flyer de búsqueda mostraban un ícono estático `<QrCode>` de Lucide. Esto no era escaneable. Se reemplazaron por códigos QR reales generados en el cliente.

**Paquete instalado:** `qrcode.react@4.2.0`  
El componente `<QRCodeSVG>` renderiza un SVG en el DOM. No requiere servidor, funciona offline y es escalable a cualquier resolución de pantalla.

**Cambios por archivo:**

**`src/app/components/pettodo/FlyerShareKit.tsx`**
- Import: `import { QRCodeSVG } from 'qrcode.react'`
- La constante `QR_URL` apunta a `https://pettodo.app/case/CASE-2026-0219`
- El `<QRCodeSVG>` tiene `size={80}` y `level="M"` (corrección de errores media — suficiente para impresión en formato A4)
- Está posicionado en la esquina inferior derecha del flyer preview, tal como lo haría un flyer real impreso

**`src/app/screens/qr-hub/QRH_screens.tsx`**
- Import: `import { QRCodeSVG } from 'qrcode.react'`
- **QRH_01** (pantalla principal del QR Hub): QR de 168px que apunta a `https://pettodo.app/pet/pet-luna-001`. Es el QR de identidad permanente de Luna — se escanea para ver el perfil y contactar al dueño
- **QRH_04** (Compartir y Descargar): QR de 136px con la misma URL. Se muestra junto con botones de descarga y opciones de compartir por plataforma

---

#### C. Mapas interactivos reales (Leaflet + OpenStreetMap)

**Qué se hizo y por qué:**
Las pantallas de mapa usaban un componente `MapPlaceholder` que mostraba un rectángulo gris con texto "Map". Se reemplazó por un mapa interactivo real usando tiles de OpenStreetMap.

**Paquetes instalados:**
- `leaflet@1.9.4` — biblioteca de mapas base
- `react-leaflet@4.2.1` — wrapper React para Leaflet, versión 4.x compatible con React 18 (la v5 requiere React 19)
- `@types/leaflet` — tipos TypeScript para Leaflet

**CSS:** Se agregó `import 'leaflet/dist/leaflet.css'` al inicio de `src/styles/index.css`. Sin este import los controles del mapa (zoom, atribución) no se renderizan correctamente.

**Fix de iconos:** Leaflet resuelve las rutas de sus iconos PNG usando variables internas que el bundler de Vite rompe. Se aplicó la corrección estándar:
```ts
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });
```

**Nuevo componente `PettodoMap` (`src/app/components/pettodo/MapComponents.tsx`):**

Props aceptadas:
```
height?          — altura en px del contenedor (default: 220)
centerLat/Lng?   — coordenadas del centro del mapa (default: Central Park)
zoom?            — nivel de zoom inicial (default: 14)
pins?            — array de PettodoPin con lat/lng/type/label/time/privacyRadius
showPrivacyCircle? — dibuja un círculo rojo punteado en el centro (para pantalla de denuncia)
privacyRadius?   — radio del círculo de privacidad en metros (default: 300)
```

**Pins con iconos emoji personalizados:**
Cada tipo de caso tiene un `L.DivIcon` propio con un emoji grande y `filter: drop-shadow` para visibilidad:
- 📍 `lost` — pin rojo de ubicación estándar
- ✅ `found` — checkmark verde (perro encontrado)
- 👁️ `sighted` — ojo (avistamiento)
- 🏥 `safe` — cruz médica (en refugio o veterinaria)

**Popup al hacer clic:** Cada marker muestra un popup con el nombre/label del caso, la hora, y para los de tipo `found` una nota de privacidad ("Approximate area only").

**Círculo de privacidad para casos `found`:** Si el pin tiene `privacyRadius`, se dibuja un `<Circle>` verde punteado (`dashArray: '6 4'`, `fillOpacity: 0.08`) para indicar que la ubicación exacta está ocultada. Esto es visible en las pantallas EMG_15 y EMG_21-25.

**`RecenterMap`:** Componente interno que llama a `map.setView([lat, lng])` en un `useEffect` cuando cambian las coordenadas — necesario porque `MapContainer` no re-centra automáticamente si las props cambian.

**`MapPlaceholder` — wrapper retrocompatible:**
El componente `MapPlaceholder` existente (usado en ~7 archivos de pantallas) se convirtió en un wrapper de `PettodoMap` con pins demo predeterminados. Esto significa que todas las pantallas que ya importaban `MapPlaceholder` obtuvieron el mapa real automáticamente sin necesitar cambios individuales:
- `EMG_03` (Panic Mode)
- `EMG_08_to_13` (FOUND flow)
- `EMG_14_to_20` (Search Map, Pin Detail, Matches)
- `EMG_21_to_25` (Claim flow)
- `EMG_26_to_31` (Resolution flow)
- `CMT` (Community)
- `SRV` (Services / Street Dogs)

---

#### D. Algoritmo de coincidencia determinista (`src/app/utils/matching.ts`)

**Qué se hizo y por qué:**
La pantalla EMG_16 (AI Matches) mostraba porcentajes de coincidencia hardcodeados (95%, 78%, 63%). No reflejaban ninguna lógica real. Se implementó un algoritmo de ranking determinista que evalúa candidatos reales del store.

**Función principal:** `rankMatches(lostCase: Case, candidates: Case[]): MatchResult[]`

El algoritmo filtra automáticamente:
- El propio caso perdido (`c.id === lostCase.id`)
- Otros casos de tipo `lost` (solo se compara contra `found` y `sighted`)
- Casos con estado `resolved` o `archived`

Luego asigna una puntuación de 0–95 a cada candidato según cinco criterios:

| Criterio | Puntos máximos | Lógica |
|---|---|---|
| **Distancia** | 30 pts | Calculada con la fórmula de Haversine. <0.5 km = 30 pts, <1 km = 22, <2 km = 15, <5 km = 8, más lejos = 2 |
| **Recencia** | 30 pts | <2 horas = 30 pts, <6 h = 22, <24 h = 15, <72 h = 8, más antiguo = 2 |
| **Tamaño** | 20 pts | Coincidencia exacta de `size` (Small/Medium/Large) |
| **Color** | 10 pts por color | Se comparan arrays `colors[]` case-insensitive; por cada color compartido suma 10 |
| **Rasgos** | 5 pts por rasgo | Se comparan arrays `traits[]` con inclusión parcial case-insensitive |

**Razones generadas (campo `reasons[]`):**
El algoritmo también genera hasta 3 strings descriptivos que se muestran en la UI bajo cada match:
- `"near your area"` — distancia <1 km
- `"X.X km away"` — distancia entre 1–5 km
- `"very recent sighting"` — menos de 6 horas
- `"recent report"` — entre 6 y 72 horas
- `"similar size"` — talla igual
- `"similar color"` — al menos un color compartido
- `"matching feature"` — al menos un rasgo compartido

**Cálculo del porcentaje de confianza:**
```ts
confidence = Math.min(Math.round((score / 95) * 100), 95)
```
El máximo teórico es 95 puntos (30 + 30 + 20 + 10 + 5), por lo que el porcentaje es lineal. Se aplica un techo de 95% para reflejar incertidumbre honesta (nunca se puede asegurar un 100% sin confirmación humana).

Solo se incluyen candidatos con `confidence >= 20`. El resultado se ordena de mayor a menor confianza.

**Wiring en EMG_16 (`src/app/screens/emergency/EMG_14_to_20.tsx`):**
```ts
const { store } = useApp();
const lostCase = store.cases.find(c => c.type === 'lost' && c.status === 'active') ?? store.cases[0];
const ranked = rankMatches(lostCase, store.cases);
```
Si `ranked` tiene resultados, se usan directamente. Si `store.cases` está vacío (solo posible si el usuario borró manualmente localStorage), la pantalla cae de vuelta a las constantes `MATCHES` estáticas que ya existían.

---

#### E. Cambios de infraestructura y paquetes

**`package.json`:**
- `react` y `react-dom` movidos de `peerDependencies` a `dependencies` para garantizar que el bundler de Vite resuelva una sola copia de React (previene el error "Invalid hook call" con múltiples instancias de React)
- Nuevas dependencias añadidas:
  - `"qrcode.react": "^4.2.0"`
  - `"react-leaflet": "^4.2.1"`
  - `"leaflet": "^1.9.4"`
  - `"@types/leaflet": "^1.9.14"`

**`src/styles/index.css`:**
- Línea añadida al inicio: `@import 'leaflet/dist/leaflet.css';`
- Sin este import los controles de zoom, los popups y la atribución del mapa no se renderizan correctamente

---

#### Limitaciones conocidas de esta iteración

- **localStorage (~5 MB):** No es apto para guardar imágenes reales. Las fotos de mascotas siguen siendo placeholders con emoji
- **QR apuntan a URLs demo:** `pettodo.app/*` no es un servidor real. Los QR son escaneables y válidos técnicamente, pero el destino no carga nada
- **Mapa requiere internet:** Los tiles de OpenStreetMap se descargan en tiempo real. Sin conexión, el mapa aparece en gris
- **Matching sin visión artificial:** El algoritmo compara campos de texto estructurado. No analiza imágenes. El porcentaje de confianza es una estimación heurística, no un resultado de ML

---

### Iteration 10 — Dead Interaction Fix, Education Module, Settings Persistence & Rate Limiting

**Run Date:** February 20, 2026

**Objetivo general:** Eliminar todas las interacciones muertas detectadas en la auditoría completa de 100+ pantallas, construir el módulo de Educación con contenido rico real, implementar configuración de usuario persistente y añadir rate limiting real para proteger las páginas públicas QR contra scraping.

---

#### A. Auditoría de interacciones (`docs/INTERACTION_AUDIT.md`)

Se realizó una auditoría exhaustiva de todos los elementos interactivos del prototipo con el objetivo de identificar botones, toggles y listas sin `onClick`. La auditoría documentó:

- **Prioridad alta:** Elementos en pantallas críticas del flujo principal (QR público, emergencia, perfil)
- **Prioridad media:** Acciones secundarias en comunidades, eventos, documentos
- **Prioridad baja:** Acciones de diseño demo (design system, placeholders intencionales)

Regla universal adoptada: **Cada elemento interactivo debe ejecutar una acción real, navegar a otra pantalla, abrir un modal o mostrar un toast de "Demo only" explícito.** Ningún elemento puede quedar completamente inactivo.

---

#### B. Módulo de Educación completo (`src/app/data/education.ts`)

Se construyó una base de datos de artículos educativos con 6 artículos de 1.500+ palabras cada uno, estructurados con secciones, ejemplos prácticos y referencias a fuentes externas reales.

**Estructura de cada artículo:**

```ts
interface EducationArticle {
  id: string;
  title: string;
  category: 'Emergency' | 'Health' | 'Behavior' | 'Social';
  sourceName: string;
  sourceUrl: string;
  summary: string;
  body: { heading: string; content: string }[];
}
```

**Artículos incluidos:**

| ID | Título | Categoría | Fuente |
|---|---|---|---|
| `emergency-response` | What To Do in the First 24 Hours | Emergency | ASPCA |
| `reading-body-language` | Understanding Your Dog's Body Language | Behavior | AKC |
| `preventive-health` | Essential Preventive Care for Dogs | Health | Merck Vet Manual |
| `socialization-101` | Socializing Your Dog: A Complete Guide | Behavior | VCA Hospitals |
| `nutrition-guide` | Canine Nutrition Fundamentals | Health | PetMD |
| `community-safety` | Keeping Your Neighborhood Safe for Pets | Social | Best Friends Animal Society |

Cada artículo incluye: resumen ejecutivo, 4–5 secciones con cuerpo de texto completo (sin lorem ipsum), crédito de fuente con enlace externo real.

**Routing dinámico:**

Se añadió la ruta `/education/article/:id` en `App.tsx` para servir artículos individuales. `EDU_ArticleDetail` usa `useParams()` para obtener el `id` y buscar el artículo en el array. Si el ID no existe, renderiza una pantalla de error 404 con botón de retorno a la lista. Los artículos se abren desde `EDU_01` (lista de artículos) al hacer tap en cualquier card.

**Botón "Send" del AI Chat (EDU_03):**
Wired con toast "Demo only — AI Q&A coming soon." Importado `toast` de `sonner` al archivo `EDU_screens.tsx`.

---

#### C. Sistema de ajustes de usuario persistentes (`src/app/data/storage.ts` + `AppContext`)

Se añadió el campo `settings` al tipo `EntityStore` con 13 preferencias de usuario, todas persistidas automáticamente en `localStorage` mediante el mecanismo existente de `saveEntityStore()`.

**Tipo `UserSettings`:**

```ts
interface UserSettings {
  captchaEnabled: boolean;          // Mostrar captcha en QRP_02 (defecto: true)
  defaultRadius: number;            // Radio de privacidad por defecto en metros (defecto: 300)
  notif: {
    push: boolean;                  // Notificaciones push globales (defecto: true)
    email: boolean;                 // Notificaciones por correo (defecto: true)
    sms: boolean;                   // Notificaciones SMS (defecto: false)
    caseUpdates: boolean;           // Actualizaciones del caso activo (defecto: true)
    matches: boolean;               // Nuevas coincidencias (defecto: true)
    community: boolean;             // Eventos y posts de comunidad (defecto: false)
    marketing: boolean;             // Boletines y noticias (defecto: false)
  };
  privacy: {
    showPhone: boolean;             // Mostrar teléfono en el perfil público (defecto: false)
    showEmail: boolean;             // Mostrar email en el perfil público (defecto: false)
    showLocation: boolean;          // Mostrar ciudad en el perfil público (defecto: true)
    allowIndexing: boolean;         // Permitir indexación por buscadores (defecto: false)
  };
}
```

**Función `updateSettings(partial)`:**
Añadida al `AppContext`. Realiza deep merge sobre el objeto `notif` y `privacy` anidados para no sobreescribir configuraciones hermanas al actualizar solo un campo.

```ts
updateSettings: (partial: Partial<UserSettings>) => void
```

**Uso en pantallas:**
- `PRF_03` (Privacy Settings): todos los toggles de privacidad llaman `updateSettings({ privacy: { campo: value } })`
- `PRF_04` (Notification Settings): todos los toggles de notificación llaman `updateSettings({ notif: { campo: value } })`
- `QRH_03` (Anti-scraping): el toggle de captcha llama `updateSettings({ captchaEnabled: value })`

Los toggles leen el estado inicial directamente desde `store.settings`, por lo que al recargar la página conservan el valor guardado.

---

#### D. Rate limiting real para QR público (`src/app/utils/rateLimit.ts`)

Se implementó rate limiting real usando `localStorage` como almacenamiento de timestamps. Protege la función "Show Owner Contact" de la página QR pública contra bots y scrapers.

**Configuración:**
- Clave de localStorage: `pettodo_reveal_rate_v1`
- Máximo de reveals permitidos: 5 por hora
- Ventana de tiempo: 60 minutos (rolling window — no reloj fijo)

**Funciones exportadas:**

```ts
checkRevealRateLimit(): { allowed: boolean; remaining: number; resetInMinutes: number }
```
- Lee el array de timestamps del localStorage
- Filtra los que están dentro de la última hora (timestamps > `Date.now() - 3_600_000`)
- Si el array filtrado tiene < 5 elementos: `{ allowed: true, remaining: N }`
- Si tiene ≥ 5 elementos: calcula `resetInMinutes` como los minutos hasta que el timestamp más antiguo salga de la ventana

```ts
recordReveal(): void
```
- Agrega el timestamp actual al array y vuelve a guardar en localStorage

```ts
forceRateLimit(): void   // Fuerza el estado de rate limit para demo
resetRateLimit(): void   // Resetea a 0 reveals para demo
```

**Integración en `QRP_02` (captcha screen):**
- `useEffect` al montar: llama `checkRevealRateLimit()`. Si no está permitido → muestra pantalla `rateLimit` directamente. Si `captchaEnabled === false` (setting del usuario) → saltea captcha, llama `recordReveal()`, navega a `/public/qr-landing`
- Botón "Verify": re-verifica el rate limit antes de proceder. Si está bloqueado, muestra pantalla `rateLimit` con contador de minutos
- Pantalla `rateLimit`: muestra timer visual con formato MM:SS, botón demo para resetear

**Integración en `QRH_03` (Anti-scraping hub):**
- Muestra previsualización del estado actual de rate limit (reveals restantes en la hora actual)
- Toggle de captcha conectado a `updateSettings({ captchaEnabled: value })`

---

#### E. Corrección masiva de interacciones muertas

Se auditaron y corrigieron todos los botones sin acción en el prototipo, archivo por archivo:

**`src/app/screens/qr-public/QRP_screens.tsx` — Reescritura completa:**
- `QRP_01`: botón "Show Owner Contact" navega a `/public/qr-captcha`; botón "I found/spotted this dog" navega a `/public/qr-report`
- `QRP_02`: flujo de 3 estados (`captcha` → `countdown` → reveal, o `rateLimit`). El botón "Verify" ejecuta la verificación real con rate limit. Integrado con `captchaEnabled` de settings
- `QRP_03`: botones "I have this dog" y "I spotted this dog" son cards seleccionables con estado visual (color de borde, fondo) y toast contextual al seleccionar. El form completo incluye inputs de ubicación y teléfono, y al enviar llama `addSighting()` del context, muestra pantalla de confirmación y redirige

**`src/app/screens/daily/DLY_screens.tsx`:**
- "Add Pet" (DLY_02): `onClick={() => toast('Demo only — pet registration form coming soon.')}`
- Documentos (DLY_04): cada documento convertido de `<div>` a `<button>` con toast contextual que menciona el nombre del documento específico; "Upload Document" también wired
- Calendario (DLY_07): botones "Add to Google Calendar", "Add to Apple Calendar", "Download .ICS File" wired con toasts descriptivos

**`src/app/screens/daily/EDU_screens.tsx`:**
- "Send" (EDU_03, AI Chat): wired con toast "Demo only — AI Q&A coming soon."
- Añadido `import { toast } from 'sonner'` al archivo

**`src/app/screens/communities/COM_EVT_screens.tsx`:**
- "Send Verification Code" (COM_03): toast "Demo only — SMS verification coming soon."
- "Photo" y "Location" (COM_04, compose post): toasts individuales descriptivos
- "Approve" y "Remove" (COM_05, quarantined posts): toasts de confirmación de acción ("Post approved and restored." / "Post removed from community.")
- "Apply as Official Organizer" (EVT_06): toast "Demo only — organizer application coming soon."

**`src/app/screens/community-dogs/CMT_screens.tsx`:**
- "Merge Records" (CMT_04): toast "Records merged successfully."
- "Keep Separate" (CMT_04): toast "Records kept separate."
- "It's a different dog — continue Found report" (CMT_05): toast de confirmación de continuación del flujo
- "View community dog record" (CMT_05): toast "Demo only — community dog record view coming soon."
- "Cancel report" (CMT_05): toast "Report cancelled."
- Añadido `import { toast } from 'sonner'` al archivo

**`src/app/screens/emergency/EMG_08_to_13.tsx`:**
- "Scan QR Code" (EMG_10): navega a `/emg/found-published` (mismo destino que "Skip")
- "Follow Case" (EMG_13): toast de confirmación "You are now following this case. Notifications will be sent for updates."
- Añadido `import { toast } from 'sonner'` al archivo

**`src/app/screens/qr-hub/QRH_screens.tsx`:**
- Eliminado import no usado `Eye` de lucide-react (resolvía LSP diagnostic)

---

#### F. Correcciones de TypeScript

**Imports no utilizados:**
- `QRH_screens.tsx`: eliminado `Eye` del import de lucide-react (era residuo de refactor anterior)

**Tipos de componentes:**
- `CommunityDogCard` y `MatchCard` en `Cards.tsx`: actualizado el tipo de `onClick?` de `() => void` a `() => void | Promise<void>` para compatibilidad con el tipo de retorno de `useNavigate()` de React Router
- `CMT_01`: corregido spread `{...d}` en `CommunityDogCard` → props explícitas (`name={d.name} lastSeen={d.lastSeen} location={d.location}`) para evitar error de tipos con campos extra del objeto de datos
- `EMG_12`: corregido spread `{...m}` en `MatchCard` → props explícitas (`confidence={m.confidence} reasons={m.reasons} location={m.location} time={m.time}`) por la misma razón

---

#### Limitaciones conocidas de esta iteración

- **AI Chat (EDU_03):** La interfaz de chat está wired con toast. El backend de IA no está implementado; requeriría integración con OpenAI/Claude API
- **Cámara (QRP_03):** El área de foto en el form de reporte QR público no tiene FileReader real — es UI placeholder
- **SMS (COM_03):** La verificación por SMS es UI-only, no hay integración con Twilio ni similar
- **Rate limit en demo:** `forceRateLimit()` y `resetRateLimit()` son utilidades de desarrollo accesibles desde `QRH_03` para demostrar el flujo sin esperar 1 hora real
- **Indexación buscadores:** El toggle `allowIndexing` en PRF_03 no tiene efecto en el servidor (no hay servidor); es una preferencia guardada para futura implementación de meta tags o robots.txt dinámico

---


