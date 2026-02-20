# PETTODO QA Self-Check

## Pages Checklist (14 route groups)
- [x] 00_Sitemap (/sitemap, /sitemap/bipolar, /sitemap/flows)
- [x] 01_Design_System (/design-system)
- [x] 02_Home_Bipolar (/home-daily, /home-emergency, /home-mode-switch, /home-notifications)
- [x] 03_Emergency_Search (31 screens: /emg/*)
- [x] 04_QR_Identification (5 screens: /qr/*)
- [x] 05_Daily_PetManager_Education (12 screens: /daily/*, /education/*)
- [x] 06_Communities_Events (11 screens: /communities/*, /events/*)
- [x] 07_Community_Dogs (8 screens: /community-dogs/*)
- [x] 08_Services_Walkers (10 screens: /walkers/*)
- [x] 09_PlayDates (8 screens: /playdates/*)
- [x] 10_Profile_Verification_Privacy (5 screens: /profile/*)
- [x] 11_QR_Public_Landing (3 screens: /public/*)
- [x] 98_Execution_Log (/execution-log)
- [x] 99_QA_SelfCheck (/qa-selfcheck)

## 100 Screens Checklist
### Sitemap (3)
- [x] SMP_01_FlowMapGeneral
- [x] SMP_02_BipolarNavigationDiagram
- [x] SMP_03_PrototypeLinksLegend

### Home (4)
- [x] HOM_01_Home_Daily_NoActiveCase
- [x] HOM_02_Home_Emergency_WithActiveCase
- [x] HOM_03_ModeSwitch_Explicit
- [x] HOM_04_ModeAware_Notifications

### Emergency (31)
- [x] EMG_01 through EMG_31

### QR Hub (5)
- [x] QRH_01 through QRH_05

### Daily (8) + Education (4)
- [x] DLY_01 through DLY_08
- [x] EDU_01 through EDU_04

### Communities (5) + Events (6)
- [x] COM_01 through COM_05
- [x] EVT_01 through EVT_06

### Community Dogs (8)
- [x] CMT_01 through CMT_08

### Walkers (10)
- [x] SRV_01 through SRV_10

### Play Dates (8)
- [x] PD_01 through PD_08

### Profile (5)
- [x] PRF_01 through PRF_05

### Public QR (3)
- [x] QRP_01 through QRP_03

### Meta (3)
- [x] 01_Design_System
- [x] 98_Execution_Log
- [x] 99_QA_SelfCheck

**Total: 100 screens**

## 10 Flows Checklist
- [x] 1. Home Daily ↔ Mode Switch ↔ Home Emergency
- [x] 2. LOST flow (EMG_01→02→03→04→05→06→07→16→17→23→24→25→26→27→28→29→30)
- [x] 3. FOUND flow (EMG_01→08→09→10→11→16→23→26→30)
- [x] 4. SIGHTED flow (EMG_01→12→13→20)
- [x] 5. MAP flow (EMG_14↔15↔18/19/20↔16↔23)
- [x] 6. Daily→Emergency Prefilled (DLY_03→DLY_08→EMG_05)
- [x] 7. Communities→Events (COM_01→COM_03→EVT_01→EVT_02→EVT_04→EVT_05)
- [x] 8. Walkers (SRV_01→02→03→04→05→07→08→09)
- [x] 9. Play Dates (PD_01→03→04→05→06→07)
- [x] 10. Public QR (QRP_01→02→01, QRP_01→03)

## Required Phrases Checklist
| Phrase | Screen(s) |
|--------|-----------|
| "Possible match (AI doesn't confirm)" | EMG_11, EMG_16, EMG_17 |
| "Stay calm — we'll guide you step by step" | EMG_02 |
| "Your exact location is protected" | EMG_03, EMG_09, PRF_03 |
| "Do not share your address" | EMG_23, PRF_03 |
| "Handoff only at a safe point" | EMG_26, EMG_28, PRF_05 |
| "Reward only after the handoff" | EMG_28, PRF_05 |
| "No upfront payments or deposits" | EMG_28, PRF_05, SRV_05 |
| "Request proof of life" | EMG_23, EMG_24 |
| "Event source" | EVT_01, EVT_02 |
| "AI Verified" | EVT_02, EVT_04 |
| "Community Verified (weighted)" | EVT_02, EVT_05 |
| "PETTODO does not process payments" | EMG_28, SRV_03, SRV_05, PRF_05 |
| "Better photos improve match accuracy" | EMG_02, EMG_08 |
| "This dog has an owner. Help them get home." | QRP_01, CMT_05 |
| "Report suspicious behavior" | EMG_23, SRV_05, PD_06 |
| "Approximate area only — exact address is hidden." | EMG_15, EMG_19, QRP_03 |
| "This action requires Strict verification (ID + Selfie)." | EVT_06, SRV_10, PD_08 |
| "Too many attempts. Try again in 60 minutes." | QRP_02, QRH_03, VerificationFlows (rate_limit) |
| "Last updated 12 min ago" | EMG_15, EMG_18, EMG_21 |

## Components Checklist (Iteration 2)
- [x] OTPFlow (phone → OTP → success/error/rate_limit)
- [x] StrictVerificationFlow (start → ID front → ID back → selfie → submitted)
- [x] VerificationGate (basic / strict gating wrapper)
- [x] PhotoUploadGrid (3-slot grid, quality scoring, tips)
- [x] FlyerPreview (LOST/FOUND flyer with QR placeholder)
- [x] ShareKitActions (download PNG/PDF, copy text, share link, safety reminder)
- [x] CaseLifecycleBar (30-day progress, status chip, days remaining)
- [x] MatchLifecycleBar (10-day bar, day 7 / day 9 markers)
- [x] DemoControlsFab (gear icon FAB)
- [x] DemoControlsPanel (full state control: mode, case, verification, time offset)

## Accessibility Checklist
- [x] All interactive targets >= 44x44 px
- [x] Light mode only
- [x] English only — no lorem ipsum
- [x] Public QR screens: no app chrome
- [x] System font fallback configured
- [x] Semantic color usage (red=emergency, green=daily, blue=info, amber=warning)
- [x] CSS variable tokens only — no hardcoded hex values in components
- [x] React.Fragment avoided in mapped loops — div.contents used instead

## Token Coverage Checklist
- [x] --red-primary, --red-dark, --red-soft, --red-bg
- [x] --green-primary, --green-dark, --green-soft, --green-bg
- [x] --info, --info-bg, --info-soft, --info-dark
- [x] --warning, --warning-bg, --warning-soft, --warning-dark
- [x] --gray-100 through --gray-900, --white
- [x] --sp-1 through --sp-8 (spacing)
- [x] --r-sm through --r-xl (radius)
- [x] --shadow-sm, --shadow-md, --shadow-lg (elevation)

## Iteration 4 & 5 Checks
- [x] Panic Mode claim gate is explicitly represented in EMG_06 and triggers OTP when unverified (Iteration 4)
- [x] Found privacy radius picker exists in EMG_09 with 300m/500m/1km options (Iteration 5)

## Iteration 6 Checks
- [x] HOM_01 shows "Services & Trust" section (Walkers + Community Dogs)
- [x] Walkers module (SRV_01) shows "PETTODO does not process payments"
- [x] Community Dog Detail (CMT_03) shows "Sightings Timeline"
- [x] "I saw this dog today" action updates the timeline in CMT_03
- [x] Walker Profile (SRV_02) has persistent Availability UI stub
- [x] "Become a Walker" link exists and references strict verification

## Iteration 7 Checks
- [x] HOM_01 section labels updated to "Community" and "Services"
- [x] CMT_03 includes Care & Records with 3 actions and demo persistence
- [x] QRH_04 includes share text + platform buttons that copy text
- [x] Events (EVT_02) + Play Dates (PD_05) include Add to Calendar modal

## Iteration 8 Checks
- [x] EMG_17 can return to EMG_07 via "Share Flyer"
- [x] EMG_17 can return to EMG_06 via "Report Published"
- [x] Back chevron uses navigate(-1) and falls back to /home-emergency
- [x] HOM_02 has Quick actions to EMG_07 and EMG_16
- [x] EMG_07 has "Back to Report Published" link

## Iteration 9 Checks — Local-first Functionality
- [x] App refresh keeps mode, verificationLevel, hasActiveCase, caseClaimed (existing persistence)
- [x] Entity store (pets/cases/sightings/careLogs) loads from localStorage on mount
- [x] Entity store auto-saves on every add operation
- [x] QRH_01 (QR Hub) shows a real scannable QR code (not a placeholder icon)
- [x] FlyerShareKit (EMG_07) flyer preview shows real QR code
- [x] QRH_04 (Share & Download) shows real QR code
- [x] EMG_14 (Search Map) renders real Leaflet/OpenStreetMap tiles with emoji pins
- [x] EMG_15 (Pin Detail) renders real Leaflet map
- [x] All MapPlaceholder usages automatically upgraded to real Leaflet maps
- [x] EMG_16 (AI Matches) uses deterministic ranking (distance + recency + size + color + traits)
- [x] Match confidence scores are calculated from real store data (not hardcoded)
- [x] Emergency/Daily mode switch still works
- [x] All pre-existing routes remain functional

## Iteration 10 Checks — Dead Interactions, Education, Settings & Rate Limiting

### A. Interacciones universales (regla "cero botones muertos")
- [x] Cada `<Btn>` y `<button>` en el prototipo tiene un `onClick` definido: navegación, acción real, o toast "Demo only"
- [x] Ningún elemento interactivo queda completamente inactivo al ser pulsado
- [x] Los toasts "Demo only" incluyen el nombre concreto de la función pendiente (no son genéricos)

### B. Módulo de Educación
- [x] `EDU_01` (lista) muestra 6 artículos con categorías (Emergency / Health / Behavior / Social)
- [x] `EDU_01` permite filtrar por categoría mediante chips (All, Emergency, Health, Behavior, Social)
- [x] Tap en cualquier artículo navega a `/education/article/:id`
- [x] `EDU_ArticleDetail` carga el artículo por `id` desde `useParams()`
- [x] Los artículos muestran: título, categoría, resumen, secciones con heading + cuerpo completo
- [x] Cada artículo muestra enlace a fuente externa real (ASPCA, AKC, Merck, etc.) con `ExternalLink` icon
- [x] URL no reconocida muestra pantalla 404 con botón de retorno a `/education`
- [x] `EDU_03` (AI Chat): botón "Send" dispara toast descriptivo
- [x] 6 artículos en total: emergency-response, reading-body-language, preventive-health, socialization-101, nutrition-guide, community-safety

### C. Configuración de usuario persistente
- [x] `EntityStore.settings` contiene `captchaEnabled`, `defaultRadius`, `notif{}` (7 sub-campos), `privacy{}` (4 sub-campos)
- [x] `updateSettings(partial)` disponible en `useApp()` en cualquier pantalla
- [x] `updateSettings` hace deep merge en `notif` y `privacy` (no sobreescribe campos hermanos)
- [x] `PRF_03` (Privacy Settings): toggles showPhone, showEmail, showLocation, allowIndexing persisten en store
- [x] `PRF_04` (Notification Settings): toggles push, email, sms, caseUpdates, matches, community, marketing persisten en store
- [x] Los toggles leen el estado inicial de `store.settings` (sobreviven recarga de página)
- [x] `QRH_03` (Anti-scraping): toggle de captcha llama `updateSettings({ captchaEnabled: value })`

### D. Rate limiting real (QR público)
- [x] `checkRevealRateLimit()` lee timestamps de `localStorage["pettodo_reveal_rate_v1"]`
- [x] Ventana de 60 minutos (rolling window), máximo 5 reveals por hora
- [x] `recordReveal()` añade timestamp al array y persiste
- [x] `QRP_02`: al montar, verifica el rate limit y muestra estado `rateLimit` si está bloqueado
- [x] `QRP_02`: si `captchaEnabled === false`, saltea captcha y revela contacto directamente (con rate limit igualmente activo)
- [x] `QRP_02`: si captcha está activo, el botón "Verify" re-verifica el rate limit antes de proceder
- [x] Pantalla `rateLimit` muestra tiempo restante en formato MM:SS
- [x] `QRH_03` preview muestra reveals restantes en la hora actual
- [x] `forceRateLimit()` y `resetRateLimit()` disponibles para demo desde `QRH_03`

### E. Correcciones específicas por pantalla
- [x] `DLY_02`: "Add Pet" button → toast "Demo only — pet registration form coming soon."
- [x] `DLY_04`: cada documento en la lista es un `<button>` que dispara toast con nombre del documento
- [x] `DLY_04`: "Upload Document" → toast "Demo only — document upload coming soon."
- [x] `DLY_07`: "Add to Google Calendar" → toast descriptivo
- [x] `DLY_07`: "Add to Apple Calendar" → toast descriptivo
- [x] `DLY_07`: "Download .ICS File" → toast descriptivo
- [x] `COM_03`: "Send Verification Code" → toast "Demo only — SMS verification coming soon."
- [x] `COM_04`: "Photo" attachment → toast descriptivo
- [x] `COM_04`: "Location" attachment → toast descriptivo
- [x] `COM_05`: "Approve" (quarantine) → toast "Post approved and restored."
- [x] `COM_05`: "Remove" (quarantine) → toast "Post removed from community."
- [x] `EVT_06`: "Apply as Official Organizer" → toast "Demo only — organizer application coming soon."
- [x] `CMT_04`: "Merge Records" → toast "Records merged successfully."
- [x] `CMT_04`: "Keep Separate" → toast "Records kept separate."
- [x] `CMT_05`: "It's a different dog" → toast de confirmación de continuación del flujo
- [x] `CMT_05`: "View community dog record" → toast "Demo only — community dog record view coming soon."
- [x] `CMT_05`: "Cancel report" → toast "Report cancelled."
- [x] `EMG_10`: "Scan QR Code" → navega a `/emg/found-published`
- [x] `EMG_13`: "Follow Case" → toast de confirmación con mención de notificaciones
- [x] `QRP_01`: "Show Owner Contact" → navega a `/public/qr-captcha`
- [x] `QRP_01`: "I found/spotted this dog" → navega a `/public/qr-report`
- [x] `QRP_03`: cards "I have this dog" y "I spotted this dog" son seleccionables con estado visual (borde + fondo coloreado según selección)
- [x] `QRP_03`: al enviar, llama `addSighting()`, muestra pantalla de confirmación y redirige a `/public/qr-landing`

### F. TypeScript / LSP
- [x] `QRH_screens.tsx`: import `Eye` eliminado (era residuo no utilizado)
- [x] `CMT_screens.tsx`: spread `{...d}` en `CommunityDogCard` reemplazado por props explícitas
- [x] `EMG_08_to_13.tsx`: spread `{...m}` en `MatchCard` reemplazado por props explícitas
- [x] `Cards.tsx`: `onClick?` en `CommunityDogCard` y `MatchCard` actualizado a `() => void | Promise<void>`
- [x] Cero errores de compilación en Vite (el build y hot-reload funcionan sin advertencias)

