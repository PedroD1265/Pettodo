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

Se construyó una base de datos de artículos educativos con 6 artículos con contenido real extenso (sin lorem ipsum), estructurados con párrafos y referencias a fuentes externas verificadas.

**Interfaz real implementada (verificada en código):**

```ts
// src/app/data/education.ts
export interface Article {
  id: string;
  title: string;
  category: 'Emergency' | 'Health' | 'Behavior' | 'Social';
  date: string;
  sourceName: string;
  sourceUrl: string;
  summary: string;
  body: string[];   // array de párrafos de texto plano
}
export const EDUCATION_ARTICLES: Article[]
```

**Artículos implementados (IDs verificados en código):**

| ID | Título | Categoría | Fuente |
|---|---|---|---|
| `first-hour` | What to do in the first hour after losing your dog | Emergency | ASPCA |
| `body-language` | Understanding canine body language | Behavior | American Kennel Club |
| `vaccine-schedule` | Vaccination schedule guide for puppies and adult dogs | Health | VCA Animal Hospitals |
| `play-date-intro` | How to safely introduce dogs at a play date | Social | PetMD |
| `anti-scam` | Protecting yourself from lost-pet scams | Emergency | Better Business Bureau |
| `microchip-guide` | Microchipping your dog: what it is and why it matters | Health | AVMA |

Cada artículo incluye: resumen ejecutivo de 1 frase, `date` de publicación demo, 6–7 párrafos de `body[]` con contenido factual real, crédito de fuente con URL a sitio externo oficial.

**Routing dinámico:**

Se añadió la ruta `/education/article/:id` en `src/app/routes.tsx` para servir artículos individuales. `EDU_ArticleDetail` usa `useParams()` para obtener el `id` y busca el artículo en `EDUCATION_ARTICLES`. Si el ID no existe, renderiza una pantalla de error 404 con botón de retorno a `/education`. Los artículos se abren desde `EDU_01` al hacer tap en cualquier card de la lista.

**Botón "Send" del AI Chat (EDU_03):**
Wired con toast "Demo only — AI Q&A coming soon." Añadido `import { toast } from 'sonner'` a `EDU_screens.tsx`.

---

#### C. Sistema de ajustes de usuario persistentes (`src/app/data/storage.ts` + `AppContext`)

Se añadió el campo `settings` al tipo `EntityStore`, persistido automáticamente en `localStorage` mediante `saveEntityStore()`.

**Tipos reales implementados (verificados en código):**

```ts
// src/app/data/storage.ts

export interface NotifSettings {
  sightingsNearMe: boolean;     // defecto: true
  aiMatch: boolean;             // defecto: true
  caseUpdates: boolean;         // defecto: true
  chatMessages: boolean;        // defecto: true
  vaccineReminders: boolean;    // defecto: true
  feedingReminders: boolean;    // defecto: false
  communityPosts: boolean;      // defecto: true
  eventUpdates: boolean;        // defecto: true
  playdateInvitations: boolean; // defecto: true
}

export interface Settings {
  defaultRadius: number;    // metros, defecto: 300
  showPhone: boolean;       // defecto: false
  allowChat: boolean;       // defecto: true
  showEmail: boolean;       // defecto: false
  captchaEnabled: boolean;  // defecto: true
  notif: NotifSettings;
}
// Nota: los campos de privacidad (showPhone, allowChat, showEmail) son campos
// directos en Settings, NO están anidados en un sub-objeto "privacy".
```

**Función `updateSettings(partial)`:**
Añadida al `AppContext`. Realiza deep merge sobre `notif` para no sobreescribir campos hermanos al actualizar uno solo.

```ts
updateSettings: (partial: Partial<Settings>) => void
```

**Uso en pantallas:**
- `PRF_03` (Privacy Settings): toggles `showPhone`, `allowChat`, `showEmail` llaman `updateSettings({ campo: value })`
- `PRF_04` (Notification Settings): 9 toggles llaman `updateSettings({ notif: { campo: value } })`
- `QRH_03` (Anti-scraping): toggle de captcha llama `updateSettings({ captchaEnabled: value })`

Los toggles leen el estado inicial de `store.settings`, sobreviviendo recargas de página.

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
- **`allowIndexing` (PRF_03):** El toggle está guardado en settings pero no afecta meta tags reales; el campo existe en el store pero no fue añadido a la interfaz `Settings` del código final (no tiene efecto funcional actualmente)

---

### Iteration 11 — Documentation Verification & Accuracy Pass

**Run Date:** February 20, 2026

**Objetivo:** Verificación formal de que la documentación de Iteration 10 (EXECUTION_LOG, QA_SELFCHECK, INTERACTION_AUDIT) refleja con exactitud el código implementado. Sin cambios de código — correcciones de documentación solamente.

---

#### Hallazgos de la verificación (código vs. docs)

Se ejecutó una lectura cruzada de los tres archivos de docs contra el código fuente real. Se encontraron y corrigieron las siguientes discrepancias:

**1. Tipo `Settings` (en `storage.ts`):**
- **Doc anterior decía:** `interface UserSettings` con sub-objeto `privacy: { showPhone, showEmail, showLocation, allowIndexing }`
- **Código real tiene:** `interface Settings` (sin prefijo "User") con campos de privacidad directos (`showPhone`, `allowChat`, `showEmail`) en la raíz — sin sub-objeto `privacy`. Los campos `showLocation` y `allowIndexing` listados en el log anterior NO existen en el código real
- **Corrección aplicada:** Sección C de EXECUTION_LOG.md y sección C de QA_SELFCHECK.md actualizadas con los tipos reales

**2. Interfaz `Article` (en `education.ts`):**
- **Doc anterior decía:** `body: { heading: string; content: string }[]` (array de objetos con heading)
- **Código real tiene:** `body: string[]` (array de párrafos de texto plano) + campo adicional `date: string`
- **Corrección aplicada:** Sección B de EXECUTION_LOG.md y sección B de QA_SELFCHECK.md corregidas

**3. IDs de artículos educativos:**
- **Doc anterior listaba:** `emergency-response`, `reading-body-language`, `preventive-health`, `socialization-101`, `nutrition-guide`, `community-safety`
- **Código real tiene:** `first-hour`, `body-language`, `vaccine-schedule`, `play-date-intro`, `anti-scam`, `microchip-guide`
- **Corrección aplicada:** Tabla de artículos en EXECUTION_LOG.md y listado en QA_SELFCHECK.md corregidos con IDs y títulos reales

**4. Comportamiento de QRP_03 cards (INTERACTION_AUDIT.md):**
- **Doc anterior decía:** Q1/Q2 "Toast + navigate to `/emg/found-photos`" y "Toast + navigate to `/emg/sighted-report`"
- **Código real hace:** Las cards son selectores visuales (toggle de estado local `reportType`), NO navegación. Toast contextual al seleccionar, luego "Submit Report" llama `addSighting()`
- **Corrección aplicada:** Filas Q1 y Q2 de INTERACTION_AUDIT.md corregidas

**5. NotifSettings — 9 campos (no 7):**
- **Doc anterior decía:** 7 sub-campos en notif (push, email, sms, caseUpdates, matches, community, marketing)
- **Código real tiene:** 9 campos: sightingsNearMe, aiMatch, caseUpdates, chatMessages, vaccineReminders, feedingReminders, communityPosts, eventUpdates, playdateInvitations
- **Corrección aplicada:** Sección C de EXECUTION_LOG.md y QA_SELFCHECK.md actualizadas

---

#### Quality Gate — Iteration 11

**Dev server:** Corriendo sin errores en http://localhost:5000 (Vite v6.3.5)  
**HMR:** Todos los módulos actualizados correctamente vía hot-reload  
**Browser console:** Sin errores de runtime  
**LSP diagnostics:** 3 diagnostics de editor (pre-existentes, nivel advertencia de TypeScript):
- `CMT_screens.tsx`: spread de `key` en CommunityDogCard (no afecta runtime — Vite/esbuild compila correctamente)
- `EMG_08_to_13.tsx`: spread de `key` en MatchCard (mismo patrón)
- `Cards.tsx`: `key` en MatchReasonTag (mismo patrón)

Estos 3 son una quirk de TypeScript strict mode con `key` como prop especial de React. El build de Vite/esbuild ignora correctamente esta verificación de tipos y compila sin errores.

**Cambios de código en Iteration 11:** Ninguno. Solo correcciones de documentación.

---

#### Archivos modificados en Iteration 11

| Archivo | Tipo de cambio |
|---|---|
| `docs/EXECUTION_LOG.md` | Corrección de tipos, IDs de artículos, y comportamiento de QRP_03; adición de sección IT11 |
| `docs/QA_SELFCHECK.md` | Corrección de IDs de artículos, campos de Settings, y sub-campos de NotifSettings |
| `docs/INTERACTION_AUDIT.md` | Corrección de filas Q1/Q2 (comportamiento real de selection cards vs navegación) |

---



---

## Iteration 12 — Integration-Ready Architecture

**Date:** 2026-02-20  
**Focus:** DEMO/INTEGRATION config switch, services layer with 6 typed adapters, Demo Simulator panel, 3 real local-first flows, real EMG_23 chat, INTEGRATIONS.md.

### A. App Config Module

- Created `src/app/config/appConfig.ts`: reads 7 `VITE_*` env vars (APP_MODE, STORAGE_PROVIDER, SMS_PROVIDER, CHAT_PROVIDER, PUSH_PROVIDER, GEO_PROVIDER, AI_PROVIDER) with safe defaults (all → "demo")
- Created `.env.example` with all 7 vars + safe placeholder values and inline comments
- AppBar updated: "DEMO" gray pill or "INTEG" blue pill badge right of title; bell icon with unread count badge; navigates to `/home-notifications`

### B. Services Layer

| Interface | Demo Adapter | Integration Stub |
|---|---|---|
| `IStorageService` | object URL, 500 KB cap | Azure Blob Storage (SAS token) |
| `ISmsService` | OTP always "123456" | Twilio Verify V2 |
| `IChatService` | EntityStore + scripted auto-reply (1.2s) | Ably Realtime |
| `IPushService` | addNotification + toast | Firebase Cloud Messaging |
| `IGeoService` | 10-location NYC lookup table | Google Maps Platform |
| `IAiAssistantService` | keyword-search Education articles + disclaimer | Gemini API (via backend proxy) |

- `src/app/services/interfaces.ts`: 7 TypeScript interfaces
- `src/app/services/demo/`: 6 functional adapters
- `src/app/services/integration/`: 6 TODO stub files
- `src/app/services/index.ts`: `getServices()` + `useServices()` hook (singleton, mode-aware)
- EntityStore extended: `AppNotification[]`, `ChatMessage[]`, `DemoDocument[]`, `Provider[]`, `BookingRequest[]`
- AppContext extended: `addNotification`, `markNotificationRead`, `addChatMessage`, `addDocument`, `addPet`, `resetStore`

### C. Demo Simulator Panel

5 live simulator buttons added to DemoControlsPanel (only active in DEMO mode):
1. Simulate Sighting → `addSighting()` + `addNotification()`
2. Simulate AI Match → notification linking to `/emg/matching-top10`
3. Simulate Chat Message → inbound ChatMessage to `thread-luna-001` + notification
4. Simulate Push Alert → random alert + toast
5. Reset Demo → `resetStore()` + `resetRateLimit()` + clear notifications

### D. Real Local-First Actions

| Screen | Before | After |
|---|---|---|
| DLY_02 Add Pet | `toast("Demo only")` | Modal form (name, breed, size, age, colors) → `addPet()` → appears in list |
| DLY_04 Document Upload | `toast("Demo only")` | `<input type="file">` → `storageDemo.uploadDocument()` → `addDocument()` → appears in list |
| DLY_04 Seed Docs | Hardcoded only | Hardcoded seed + uploaded docs with distinct styling |

### E. Real Chat — EMG_23

- Seeded 2 messages in `DEFAULTS.chatMessages` for `thread-luna-001`
- Replaced placeholder `<div>` with real `<input>` (controlled, Enter to send)
- Send → `addChatMessage()` → 1.2s → scripted auto-reply from `chatDemo.ts`
- Messages rendered from `store.chatMessages` filtered by threadId
- Auto-scroll to bottom on new message
- Integration mode: top banner "Realtime chat integration pending"

### F. INTEGRATIONS.md

- Created `docs/INTEGRATIONS.md` covering all 6 providers with rationale, env var names, code locations, security rules, migration checklist

### Files Modified in Iteration 12

| File | Change |
|---|---|
| `src/app/config/appConfig.ts` | Created — mode config module |
| `.env.example` | Created — 7 safe placeholder vars |
| `src/app/services/interfaces.ts` | Created — 7 typed interfaces |
| `src/app/services/demo/*.ts` (6) | Created — functional demo adapters |
| `src/app/services/integration/*.ts` (6) | Created — integration stubs |
| `src/app/services/index.ts` | Created — `getServices()` + `useServices()` |
| `src/app/data/storage.ts` | Extended — AppNotification, ChatMessage, DemoDocument, Provider, BookingRequest; DEFAULTS + SEED_PROVIDERS |
| `src/app/context/AppContext.tsx` | Extended — addNotification, markNotificationRead, addChatMessage, addDocument, addPet, resetStore |
| `src/app/components/pettodo/AppBar.tsx` | DEMO/INTEG badge + bell with unread count |
| `src/app/components/pettodo/DemoControls.tsx` | 5 simulator buttons + DEMO-mode guard |
| `src/app/screens/home/HOM_01.tsx` | 4-category services grid (Walkers, Grooming, Daycare, Training) |
| `src/app/screens/home/HOM_04.tsx` | Real notifications from store + filter tabs + read/unread states |
| `src/app/screens/daily/DLY_screens.tsx` | DLY_02 Add Pet modal; DLY_04 real file upload |
| `src/app/screens/emergency/EMG_21_to_25.tsx` | EMG_23 real chat with input + send + auto-reply |
| `src/app/screens/walkers/SRV_screens.tsx` | SRV_01 category tabs + real providers from store |
| `docs/INTEGRATIONS.md` | Created |

### Known Limits (IT12)

- Storage demo: 500 KB cap (data URL in localStorage); larger files get placeholder URL
- SMS demo: OTP always "123456", never sends network request
- Chat auto-reply: 5 scripted messages (cycle repeats)
- Geo demo: 10-location NYC lookup, no external geocoding
- AI demo: keyword-search over Education articles only, no LLM
- Integration stubs: never activated in DEMO mode; require `VITE_APP_MODE=integration` + respective `VITE_*_PROVIDER` env vars

---

### Iteration 13 — Critical Fixes + Home Cleanup

**Date:** February 22, 2026

#### P0-1: Fix Notification Deep Link
- `src/app/data/storage.ts`: Changed `notif-001.linkTo` from `/emg/matches` to `/emg/matching-top10`
- Previously navigated to non-existent route; now lands on the AI matching results screen

#### P0-2: Fix resetStore() Persistence Bug
- `src/app/context/AppContext.tsx`: Changed `resetStore()` to call `resetEntityStore()` instead of `loadEntityStore()`
- Previously, reset only re-read localStorage (which still had stale data); now clears localStorage and returns fresh seed data

#### P0-3: EMG_02 Photo Upload Gate
- `src/app/screens/emergency/EMG_02.tsx`: Added `disabled={!hasPhotos}` to "Next: Location" button
- Error text changed to red with clearer wording: "Add at least 1 photo before continuing"
- Prevents advancing in the lost-dog report flow without at least 1 photo

#### P1-1: QRP_03 Conditional Validation
- `src/app/screens/qr-public/QRP_screens.tsx`: Added form validation to public QR report
- "Found" reports require both location and phone number
- "Sighted" reports require location only
- Inline error messages with red borders; summary toast on validation failure
- Labels dynamically update to show "(required)" vs "(optional)" based on report type
- Errors clear when user types in the respective field

#### P1-2: HOM_01 Quick Tiles Cleanup
- `src/app/screens/home/HOM_01.tsx`: Removed redundant 4-tile quick actions row (My Pets / QR ID / Vaccines / Learn)
- These features are accessible via Pet Profile, QR Hub, and other dedicated screens
- Cleaned up unused icon imports (PawPrint, QrCode, Syringe, BookOpen)

#### Files Modified (IT13)

| File | Change |
|---|---|
| `src/app/data/storage.ts` | Fixed notif-001 linkTo route |
| `src/app/context/AppContext.tsx` | resetStore() now calls resetEntityStore() |
| `src/app/screens/emergency/EMG_02.tsx` | Photo gate: disabled button + red warning |
| `src/app/screens/qr-public/QRP_screens.tsx` | Conditional validation with inline errors |
| `src/app/screens/home/HOM_01.tsx` | Removed redundant quick tiles row |

#### Not Completed (IT13 — Budget Constraint)

- Pet Profile upgrades (Health + Feeding sections in DLY_03) — deferred
- QR certificate import (camera + photo scanning) — deferred
- Feeding advisor feature — deferred
- See `docs/ITERATION_13_PROGRESS.md` for detailed resume checklist


# Iteration 14 — Pet Profile Health + Feeding + QR Certificates

## Date: 2026-02-22

### Phase C1 — Data Model Extensions
- Added 7 new interfaces: VaccineRecord, MedicationRecord, HealthCondition, PetHealthDocument, FeedingPreset, FeedingLog, FeedingReminder
- Extended EntityStore with 7 new array fields
- Added seed data: 3 vaccine records (Rabies, Distemper booster, Bordetella), 1 medication (Heartguard Plus), 1 feeding preset (Premium Adult Kibble, 350 kcal/100g), 2 feeding logs, 2 reminders (08:00, 18:00)
- Updated loadEntityStore() with backward-compatible fallbacks for all new fields
- resetEntityStore() correctly clears and reseeds new fields

### Phase C2 — AppContext Methods
- Added 8 CRUD methods: addVaccineRecord, addMedicationRecord, addHealthCondition, addHealthDocument, upsertFeedingPreset, addFeedingLog, addFeedingReminder, updateFeedingReminder
- All follow existing updateStore/saveEntityStore patterns

### Phase C3 — Pet Profile UI (DLY_03)
- Created HealthSection.tsx component with: vaccines list + status chips, medications list, conditions list, certificates/documents list, add modals for each
- Created FeedingSection.tsx component with: preset management, log feeding, recent logs (last 5), reminders with on/off toggle
- Inserted both sections into DLY_03 before "Report Lost" button
- No new routes added

### Phase C4 — QR Scanning Utility
- Created src/app/utils/qrDecode.ts with parseQrPayload(), decodeQrFromImage(), createQrScanner()
- Integrated into HealthSection: camera scan + scan from photo
- QR Preview modal shows decoded content with security notice, NEVER auto-opens URLs
- Save creates PetHealthDocument with kind:'qr', qrRaw, qrParsed

### Phase C5 — Feeding Advisor
- Integrated into FeedingSection as a card
- RER = 70 * (weightKg ^ 0.75), DailyCalories = RER * factor
- Activity level dropdown: Weight loss (1.0x), Typical adult (1.6x), Active (2.0x)
- Alerts: "Likely over target today" if >110%, "Low intake today" if <60% after 4 PM
- Disclaimer: "Estimate only. Consult a vet for medical concerns."
- Shows "Add weight to get estimates" if weight missing

### Build Result
- npm run build: exit 0
- Package added: qr-scanner

## Iteration 15 — CRUD Extensions, Weight Advisor, Feeding Gauge, UX Polish

### Date: 2026-02-23

### What shipped (validated against code)
- **Health CRUD extensions**
  - Added condition edit flow (`updateHealthCondition`) and delete flow (`deleteHealthCondition`) with shared confirmation modal.
  - Added delete flows for vaccines, medications, and health documents with confirmation modal.
  - On health document delete, blob URLs are revoked (`URL.revokeObjectURL`) when `doc.url` starts with `blob:`.
- **Weight Advisor**
  - Added `WeightLog` entity and `weightLogs` collection in `EntityStore`.
  - Seeded 3 Luna weight logs.
  - Added `addWeightLog` action and Weight Advisor UI in `HealthSection` with mini bar chart and simple trend indicator (up/down/stable from last 3 logs).
- **Feeding Advisor redesign**
  - Replaced formula-heavy block with gauge/progress view showing `today grams / target grams`, status label, and recommendation.
  - Target still derived from RER × activity factor and kcal/100g preset.
- **Pet Profile collapsibles + deep-link expand**
  - In `DLY_03`, Feeding section is first and Health second.
  - Both sections are collapsed by default unless query param `expandFeeding=1` is present.
  - Chevron rotates on expansion state.
- **Daily Home next-feeding reminder card**
  - Added next-feeding card in `HOM_01` using enabled reminders only.
  - Card deep-links to `/daily/pet-profile?expandFeeding=1` to auto-expand Feeding.
  - If no enabled reminders exist, card is hidden.
- **Safe back navigation guard**
  - `AppBar` now tracks recent pathnames in `sessionStorage` and uses loop detection + shallow-history detection.
  - If a loop/shallow case is detected, app navigates to mode/path fallback instead of `navigate(-1)`.

### Build and validation snapshot
- `npm run build` passed (Vite build success).
- Bundle-size warning remains (existing optimization debt).

### Known limitations / not implemented exactly as spec wording
- Deep-link key is implemented as `expandFeeding=1` (not `expand=feeding`).
- Safe-back loop detector is heuristic (3-step A/B/A pattern), not a full navigation graph.
