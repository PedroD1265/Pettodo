# PETTODO

## Overview
PETTODO is a React-based pet management app built with Vite, Tailwind CSS v4, and various UI libraries (Radix UI, MUI). It displays in a mobile phone frame (iPhone 13 viewport) and provides features for pet owners including pet profiles, QR IDs, vaccine tracking, community features, and services.

## Project Architecture
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4 + custom CSS theme variables
- **UI Libraries**: Radix UI, MUI, Lucide icons
- **Routing**: React Router v7
- **Structure**:
  - `src/app/` - Main app component, routes, screens, components, layout, context, data
  - `src/styles/` - Global CSS, theme, fonts, Tailwind config
  - `index.html` - Entry HTML
  - `vite.config.ts` - Vite configuration

## Recent Changes
- 2026-02-20: Iteration 12 — Integration-Ready Architecture
  - `src/app/config/appConfig.ts`: reads 7 VITE_* env vars; DEMO/INTEGRATION mode switch
  - `.env.example`: 7 safe placeholder vars with inline comments
  - `src/app/services/interfaces.ts`: 7 TypeScript interfaces (IStorageService, ISmsService, IChatService, IPushService, IGeoService, IAiAssistantService, IMatchingService)
  - `src/app/services/demo/`: 6 functional demo adapters (storage, sms, chat, push, geo, ai)
  - `src/app/services/integration/`: 6 integration stubs (Azure Blob, Twilio, Ably, FCM, Google Maps, Gemini)
  - `src/app/services/index.ts`: `getServices()` + `useServices()` hook (singleton, mode-aware)
  - `src/app/data/storage.ts`: AppNotification, ChatMessage, DemoDocument, Provider, BookingRequest types; SEED_NOTIFICATIONS + SEED_PROVIDERS; EntityStore extended
  - `src/app/context/AppContext.tsx`: addNotification, markNotificationRead, addChatMessage, addDocument, addPet, resetStore methods
  - `AppBar.tsx`: DEMO/INTEG mode badge (9px pill) + bell with live unread count badge
  - `DemoControls.tsx`: 5 simulator buttons (Sighting, AI Match, Chat, Push, Reset Demo) — DEMO mode only
  - `HOM_01.tsx`: 4-category services grid (Walkers, Grooming, Daycare, Training) with icons
  - `HOM_04.tsx`: real notifications from store with filter tabs (All/Emergency/Daily) + read/unread states
  - `DLY_screens.tsx`: DLY_02 Add Pet modal form (real); DLY_04 file upload → storageDemo → addDocument
  - `EMG_21_to_25.tsx`: EMG_23 real chat with controlled input, send, 1.2s auto-reply, scroll-to-bottom
  - `SRV_screens.tsx`: SRV_01 category tabs (Walkers/Grooming/Daycare/Training) filtering store.providers; SRV_02-09 fully dynamic — provider lookup via ?id= param, category-aware forms/labels/rules/incidents, providerId propagation through location state chain
  - `docs/INTEGRATIONS.md`: 6 providers, security rules, migration checklist
- 2026-02-20: Iteration 9 — Local-first Functionality
  - `src/app/data/storage.ts`: typed entity store (Pet, Case, Sighting, CareLog) with localStorage persistence + seed demo data
  - `src/app/utils/matching.ts`: deterministic match ranking (Haversine distance + recency + size/color/traits)
  - `src/app/components/pettodo/MapComponents.tsx`: real Leaflet/OSM map (`PettodoMap`), backward-compatible `MapPlaceholder` wrapper
  - `src/app/components/pettodo/FlyerShareKit.tsx`: real QR code in flyer (qrcode.react)
  - `src/app/screens/qr-hub/QRH_screens.tsx`: real QR codes in QRH_01 and QRH_04
  - `src/app/screens/emergency/EMG_14_to_20.tsx`: EMG_16 wired to deterministic matching from store
  - `AppContext` extended with full entity store API
  - Packages added: `react-leaflet@4.2.1`, `leaflet@1.9.4`, `qrcode.react@4.2.0`
  - react/react-dom moved from peerDependencies to dependencies
- 2026-02-20: Iteration 8 and earlier — 100 screens, design system, localStorage state, flyer download, calendar integration
- 2026-02-20: Initial Replit setup - configured Vite dev server on port 5000 with all hosts allowed, added .gitignore, configured static deployment

## User Preferences
- Minimal dependencies, minimal scope changes
- Small commit-ready changes preferred
- No heavy libraries unless strictly necessary
