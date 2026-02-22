# PETTODO — Interaction Audit (Iteration 10)

**Date:** February 20, 2026  
**Method:** Code review of all screen files + contextual trace of every onClick/onChange/toggle.

---

## Priority 1 — Safety / Anti-Scraping / Privacy

| # | Screen | Route | Control | Type | Expected | Current | Fixed in IT10 |
|---|---|---|---|---|---|---|---|
| S1 | QRH_03 | `/qr/anti-scraping` | "Captcha verification" toggle | Switch | Toggle state, persist to settings | Hardcoded ON, no state | ✅ Wired to `store.settings.captchaEnabled` |
| S2 | QRH_03 | `/qr/anti-scraping` | "Tap to preview rate limit state" | Button | Show rate-limit exceeded UI | Already works (local state) | ✅ Confirmed working |
| S3 | QRP_02 | `/public/qr-captcha` | "Verify" button | Button | Check real rate-limit counter; if exceeded show rate_limit UI | Ignores rate limit entirely | ✅ Wired to localStorage rate-limit counter (5/hour) |
| S4 | PRF_03 | `/profile/privacy` | "Show phone on QR page" toggle | Switch | Toggle state, persist | Hardcoded value, no state | ✅ Wired to `store.settings.showPhone` |
| S5 | PRF_03 | `/profile/privacy` | "Allow chat from case followers" toggle | Switch | Toggle state, persist | Hardcoded value, no state | ✅ Wired to `store.settings.allowChat` |
| S6 | PRF_03 | `/profile/privacy` | "Show email to verified users" toggle | Switch | Toggle state, persist | Hardcoded value, no state | ✅ Wired to `store.settings.showEmail` |
| S7 | PRF_03 | `/profile/privacy` | RadiusSelector | Selector | Save default radius, persist | Local state only, lost on refresh | ✅ Persisted to `store.settings.defaultRadius` |

---

## Priority 2 — Learn / Education

| # | Screen | Route | Control | Type | Expected | Current | Fixed in IT10 |
|---|---|---|---|---|---|---|---|
| E1 | EDU_01 | `/education/library` | Article list items | Navigation | Navigate to `/education/article/:id` with unique article | All navigate to `/education/article` (same hardcoded article) | ✅ Now navigate to `/education/article/:id` |
| E2 | EDU_02 | `/education/article` | Article content | Display | Show article matching URL `:id` param | Always shows `ARTICLES[0]` regardless of id | ✅ Reads `:id` param, shows correct article |
| E3 | EDU_02 | `/education/article/:id` | "Source" link | Link | Open source URL in new tab | Only shows `<span>` text, not a real link | ✅ Real `<a target="_blank">` with unique URL |
| E4 | EDU_01 | `/education/library` | Category filter buttons | Filter | Filter article list by selected category | No state — selection visual only, list unchanged | ✅ Filters `EDUCATION_ARTICLES` by category |
| E5 | EDU_01 | `/education/library` | Article content | Display | Show 6+ articles with unique content | Only 4 articles, all with generic minimal data | ✅ 6 rich articles created in `education.ts` |
| E6 | EDU_02 | `/education/article/:id` | Not-found state | Error | Show polite 404 with back button if id unknown | Crashes / shows wrong article | ✅ Shows "Article not found" with back button |

---

## Priority 3 — Profile / Notifications

| # | Screen | Route | Control | Type | Expected | Current | Fixed in IT10 |
|---|---|---|---|---|---|---|---|
| N1 | PRF_04 | `/profile/notifications` | "New sightings near me" toggle | Switch | Toggle + persist | Hardcoded, no state | ✅ Persisted to `store.settings.notif.*` |
| N2 | PRF_04 | `/profile/notifications` | "AI match found" toggle | Switch | Toggle + persist | Hardcoded, no state | ✅ Persisted |
| N3 | PRF_04 | `/profile/notifications` | "Case updates" toggle | Switch | Toggle + persist | Hardcoded, no state | ✅ Persisted |
| N4 | PRF_04 | `/profile/notifications` | "Chat messages" toggle | Switch | Toggle + persist | Hardcoded, no state | ✅ Persisted |
| N5 | PRF_04 | `/profile/notifications` | "Vaccine reminders" toggle | Switch | Toggle + persist | Hardcoded, no state | ✅ Persisted |
| N6 | PRF_04 | `/profile/notifications` | "Feeding reminders" toggle | Switch | Toggle + persist | Hardcoded, no state | ✅ Persisted |
| N7 | PRF_04 | `/profile/notifications` | "Community posts" toggle | Switch | Toggle + persist | Hardcoded, no state | ✅ Persisted |
| N8 | PRF_04 | `/profile/notifications` | "Event updates" toggle | Switch | Toggle + persist | Hardcoded, no state | ✅ Persisted |
| N9 | PRF_04 | `/profile/notifications` | "Play date invitations" toggle | Switch | Toggle + persist | Hardcoded, no state | ✅ Persisted |

---

## Priority 4 — QR Public Flow

| # | Screen | Route | Control | Type | Expected | Current | Fixed in IT10 |
|---|---|---|---|---|---|---|---|
| Q1 | QRP_03 | `/public/qr-report` | "I have this dog" card | Select | Seleccionar tipo de reporte (estado visual: borde verde + fondo) + toast contextual | Dead (no onClick) | ✅ Selecciona tipo `found`, toast "Great — you have the dog!" |
| Q2 | QRP_03 | `/public/qr-report` | "I spotted this dog" card | Select | Seleccionar tipo de reporte (estado visual: borde naranja + fondo) + toast contextual | Dead (no onClick) | ✅ Selecciona tipo `sighted`, toast "Thanks for the sighting!" |
| Q3 | QRP_03 | `/public/qr-report` | "Submit Report" button | Action | Validar selección + `addSighting()` + pantalla de confirmación + redirect | Solo navega, sin store update | ✅ Valida tipo seleccionado, llama `addSighting()`, muestra confirmación, redirige a `/public/qr-landing` |

---

## Priority 5 — Daily Module

| # | Screen | Route | Control | Type | Expected | Current | Fixed in IT10 |
|---|---|---|---|---|---|---|---|
| D1 | DLY_02 | `/daily/pet-list` | "Add Pet" button | Action | Navigate to add-pet form or open modal | Dead (no onClick on Btn) | ✅ Toast "Demo only — pet form coming soon" + navigate to daily home |
| D2 | DLY_04 | `/daily/documents` | Document list items | Action | Download/view file | Dead (no onClick) | ✅ Toast "Demo only — document viewer coming soon" |
| D3 | DLY_03 | `/daily/pet-profile` | "Report Luna as Lost" button | Navigate | Navigate to lost flow | Already works → `/daily/report-lost` | ✅ Already working |

---

## Items Confirmed Already Working (no fix needed)

| Screen | Control | Status |
|---|---|---|
| HOM_02 | Emergency/Daily mode switch | Working — AppContext |
| PRF_02 | Verify Phone → OTP flow | Working — local state |
| PRF_02 | Start Strict Verification | Working — local state |
| QRH_04 | Copy Share Text | Working — clipboard + toast |
| QRH_04 | Share/Download buttons | Working — toast feedback |
| QRP_02 | Rate limit "Demo: Show rate-limit exceeded state" | Working — local step state |
| EMG_16 | Match ranking | Working — deterministic algorithm |
| CMT_03 | "I saw this dog today" sighting | Working — store update |
| SRV_02 | Walker availability toggles | Working — AppContext |
| WalkerAvailability | Day/time multi-select | Working |
| EVT_02 | Add to Calendar modal | Working |
| PD_05 | Add to Calendar modal | Working |

---

## Universal Rule Adopted (IT10)

Every interactive element now does ONE of:
- **A)** Real local-first action (update store/context + persist)
- **B)** Navigate to an existing route
- **C)** Open an existing modal
- **D)** Show `toast("Demo only — not available yet")` for future backend features

Toast implementation: `sonner` library (already installed). Import `{ toast } from 'sonner'` in any screen.

---

## IT12 Addendum — New Real Interactions

| Screen | Element | Before (IT11) | After (IT12) | Type |
|---|---|---|---|---|
| DLY_02 | "Add Pet" button | `toast("Demo only — pet registration coming soon.")` | Opens Modal form (name, breed, size, age, colors) → `addPet()` → pet appears in list | **Real local-first** |
| DLY_02 | Add Pet modal — Save | n/a | Validates required fields; calls `addPet()`; closes modal; toast.success | **Real local-first** |
| DLY_02 | Pet list | Hardcoded 2 pets | Rendered from `store.pets` (Luna always present, plus any added pets) | **Real local-first** |
| DLY_04 | "Upload Document" | `toast("Demo only — document upload coming soon.")` | Opens `<input type="file">` → `storageDemo.uploadDocument()` → `addDocument()` → green card appears | **Real local-first** |
| DLY_04 | Uploaded doc card | n/a | Shows filename, KB size, "Uploaded" label; tapping opens file URL | **Real local-first** |
| EMG_23 | Chat input | Placeholder `<div>` (not typeable) | Real `<input>` (controlled state) — Enter key or send button triggers send | **Real local-first** |
| EMG_23 | Send button | Grayed out, no action | Active when input non-empty; calls `addChatMessage()` | **Real local-first** |
| EMG_23 | Auto-reply | None | 1.2s after user send → `getNextScriptedReply()` → `addChatMessage()` + `addNotification()` | **Real local-first** |
| EMG_23 | Messages | CHAT_MESSAGES static array (demo data) | `store.chatMessages` filtered by `thread-luna-001` (persisted) | **Real local-first** |
| HOM_04 | Notification item tap | n/a | `markNotificationRead(id)` → navigates to `n.linkTo` | **Real local-first** |
| HOM_04 | Filter tabs | n/a | "All / Emergency / Daily" — filters by notification type; unread count in "All" tab | **Real local-first** |
| AppBar | Bell icon | Static icon (navigate to notifications) | Bell icon with live unread count badge from `store.notifications` | **Real local-first** |
| AppBar | Mode badge | None | "DEMO" / "INTEG" pill — reflects `appConfig.mode` at build time | **Config-driven display** |
| SRV_01 | Category tabs | Single "Dog Walkers" title | 4 tabs (Walkers/Grooming/Daycare/Training) — each filters `store.providers` | **Real local-first** |
| DemoControls | Simulate Sighting | None | `addSighting()` near Luna's case + `addNotification()` + toast | **Simulator (demo only)** |
| DemoControls | Simulate AI Match | None | `addNotification()` with high-confidence match + toast | **Simulator (demo only)** |
| DemoControls | Simulate Chat Msg | None | `addChatMessage()` inbound to `thread-luna-001` + notification | **Simulator (demo only)** |
| DemoControls | Simulate Push Alert | None | `addNotification()` + toast with random body | **Simulator (demo only)** |
| DemoControls | Reset Demo | None | `resetStore()` + `resetRateLimit()` + closes panel | **Simulator (demo only)** |

### Simulator Guard Rule (IT12)

All 5 simulator buttons check `appConfig.mode === 'demo'` before activating. In `integration` mode, buttons render as disabled/grayed to prevent accidental simulation of events that would be real in production.

### Services Mode Matrix (IT12)

| Service | DEMO | INTEGRATION |
|---|---|---|
| Storage | object URL (localStorage) | Azure Blob (SAS token via backend) |
| SMS | OTP "123456" (no network) | Twilio Verify V2 |
| Chat | EntityStore + scripted reply | Ably Realtime channels |
| Push | addNotification + toast | Firebase Cloud Messaging |
| Geo | NYC lookup table | Google Maps Platform |
| AI | keyword Education search | Gemini API (backend proxy) |

---

## Iteration 13 — Guarded Interactions & Fixes

### Fixed Interactions

| # | Screen | Route | Control | Issue | Fix |
|---|---|---|---|---|---|
| F1 | HOM_04 | `/home-notifications` | notif-001 tap | Navigated to `/emg/matches` (invalid route) | Changed `linkTo` to `/emg/matching-top10` |
| F2 | DemoControls | (panel) | Reset Demo button | `resetStore()` called `loadEntityStore()` — re-read stale localStorage | Now calls `resetEntityStore()` — clears storage + returns DEFAULTS |
| F3 | EMG_02 | `/emg/lost-photos` | "Next: Location" button | Could advance without any photos | Added `disabled={!hasPhotos}` gate + red warning text |

### New Guarded Interactions (IT13)

| # | Screen | Route | Control | Guard | Behavior |
|---|---|---|---|---|---|
| G1 | QRP_03 | `/public/qr-report` | Submit Report button | Requires location (always) + phone (if "found") | Inline errors + summary toast; blocks submit |
| G2 | QRP_03 | `/public/qr-report` | Location input | Shows "(required)" label when report type selected | Red border + error text when empty on submit |
| G3 | QRP_03 | `/public/qr-report` | Phone input | Shows "(required)" only for "found" type | Red border + error text when empty for "found" reports |
| G4 | EMG_02 | `/emg/lost-photos` | "Next: Location" button | `disabled` when `qualities.length === 0` | Grayed out + red warning text below |

### Removed UI (IT13)

| Screen | Route | Element | Reason |
|---|---|---|---|
| HOM_01 | `/home-daily` | Quick tiles row (My Pets / QR ID / Vaccines / Learn) | Redundant — features accessible via other navigation paths |

