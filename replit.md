# PETTODO

## Overview
PETTODO is a React-based pet management app built with Vite, Tailwind CSS v4, and various UI libraries (Radix UI, MUI). It displays in a mobile phone frame (iPhone 13 viewport) and provides features for pet owners including pet profiles, QR IDs, vaccine tracking, community features, and services.

## Project Architecture
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4 + custom CSS theme variables
- **UI Libraries**: Radix UI, MUI, Lucide icons
- **Routing**: React Router v7
- **Auth**: Firebase Auth (Google Sign-In) — demo mode fallback when VITE_APP_MODE=demo
- **Backend**: Express API server on port 3001, proxied through Vite on /api/*
- **Structure**:
  - `src/app/` - Main app component, routes, screens, components, layout, context, data
  - `src/styles/` - Global CSS, theme, fonts, Tailwind config
  - `src/firebase.ts` - Firebase client SDK (lazy initialization)
  - `server/` - Express API backend (firebaseAdmin, middleware, routes)
  - `index.html` - Entry HTML
  - `vite.config.ts` - Vite configuration (includes /api proxy to port 3001)

## Auth Architecture
- **AuthContext** (`src/app/context/AuthContext.tsx`): Provides user, authReady, isDemo, signInWithGoogle, signOut, getIdToken, hasPendingImport
- **AuthGuard** (`src/app/components/pettodo/AuthGuard.tsx`): Wraps AppShell routes. In demo mode: passes through immediately. In integration mode: redirects to /auth/sign-in if not authenticated.
- **Sign-in screen** (`src/app/screens/auth/SignIn.tsx`): Standalone route /auth/sign-in (no AppShell, no AuthGuard). Google Sign-In via popup.
- **Service adapters**: `authDemo.ts` (returns synthetic demo user) and `authFirebase.ts` (real Firebase Auth)
- **Backend token verification**: `server/middleware/verifyToken.ts` validates Firebase ID tokens via Admin SDK
- **Public routes NOT guarded**: /public/*, /auth/sign-in, /sitemap/*, /design-system, /execution-log, /qa-selfcheck

## Database
- **PostgreSQL**: Azure PostgreSQL at `pettodo-pg-prod.postgres.database.azure.com` (connected via DATABASE_URL secret)
- **Connection**: `server/db.ts` — uses DATABASE_URL first, then PG* env vars as fallback
- **Schema**: `server/schema.sql` — `pets` table (owner_uid indexed), `imports` table, `cases` table (type/status/created_by indexed)
- **Migrations**: `server/migrate.ts` — runs schema.sql on server startup (idempotent CREATE IF NOT EXISTS)

## API Endpoints
- `GET /api/health` — unprotected, returns `{ ok: true }`
- `GET /api/auth/me` — protected (Bearer token), returns `{ uid, email, displayName, photoURL }`
- `GET /api/pets` — protected, lists authenticated user's pets
- `GET /api/pets/:id` — protected, get a specific pet owned by the user
- `POST /api/pets` — protected, create a new pet
- `PUT /api/pets/:id` — protected, update a pet
- `DELETE /api/pets/:id` — protected, delete a pet
- `POST /api/import/pets` — protected, one-time import of local pets (rejects if already imported)
- `GET /api/import/status` — protected, check if import has been done
- `GET /api/public/pet/:petId` — unprotected, returns safe public pet data (no owner PII)
- `POST /api/cases` — protected, create a case (lost/found/sighted); stores approx coords (privacy-safe)
- `GET /api/cases` — protected, lists authenticated user's cases (most recent first)
- `GET /api/cases/:id` — protected, get a specific case owned by the user

## Workflows
- **Start application**: `npm run dev` (Vite dev server, port 5000)
- **API server**: `npm run api` (Express server, port 3001)

## Environment Variables
### Frontend (VITE_*)
- VITE_APP_MODE: "demo" | "integration" (default: demo)
- VITE_AUTH_PROVIDER: "demo" | "firebase" (default: demo)
- VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_APP_ID, VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_STORAGE_PROVIDER, VITE_SMS_PROVIDER, VITE_CHAT_PROVIDER, VITE_PUSH_PROVIDER, VITE_MAP_PROVIDER, VITE_AI_PROVIDER
- VITE_API_BASE_URL

### Backend
- FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY (for Admin SDK token verification)
- DATABASE_URL (PostgreSQL connection string — fallback if PG* vars are absent)
- PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE (Replit-managed PostgreSQL, preferred)

## Recent Changes
- 2026-03-15: Pet CRUD Reliability Fix (Integration Mode)
  - Root cause: addPet/updatePet/deletePet used fire-and-forget API calls with optimistic local updates; success shown before backend confirmed
  - Fix: In integration mode, all three operations now await the API response before updating local state
  - Server response is the authoritative source of pet data in integration mode
  - If API call fails, no ghost state remains; user sees a clear error toast
  - Demo mode unchanged — still uses local-only updates
  - Form submit handler (DLY_02) is now async with loading state and error handling
  - loadPetsFromApi now uses updateStore (saves to localStorage) for session consistency
  - Firebase Admin SDK initialization made graceful — server starts without credentials in demo/dev scenarios
  - verifyToken middleware returns 503 when Firebase is not configured instead of crashing
- 2026-03-15: Cases Persistence Baseline
  - Added `cases` table to schema (id, type, status, created_by, pet_id, location, approx_lat/lng, time_label, description, size, colors, traits, direction, created/updated_at)
  - Coordinates stored rounded to 2 decimal places (~1km) per public data policy (no exact location exposure)
  - New server route `server/routes/cases.ts`: POST /api/cases (create), GET /api/cases (list my cases), GET /api/cases/:id — all require Firebase auth
  - Frontend `caseApi` in `src/app/services/api.ts`: create/list/get with typed CasePayload and CaseRecord interfaces
  - AppContext: added async `createCase(data)` — server-authoritative in integration mode (no local success until DB confirms), local-only in demo mode
  - EMG_05 (LOST Traits): traits fields (size, colors, marks, collar, temperament) are now controlled state, not hardcoded LUNA display. "Publish Report" calls createCase with real selected values and shows loading state. No navigation to success until API responds.
  - EMG_06 (LOST Published): shows real Case ID badge when caseId is in router state
  - EMG_10 (FOUND QR step): both "Skip" and "Scan QR" buttons now call createCase({ type: 'found' }) before navigating to success
  - EMG_12 (SIGHTED): description textarea now controlled; "Submit Sighting" calls createCase with type/location/description
  - All three flows: loading state on submit button, error toast on failure, navigation only on confirmed API success
  - Demo mode: uses local case creation (localStorage) unchanged
- 2026-03-14: PostgreSQL Persistence Phase
  - PostgreSQL connection via Replit-managed DB (PG* env vars) with DATABASE_URL fallback
  - Schema: `pets` table (id, owner_uid, name, breed, size, colors, marks, collar, temperament, age, weight, microchip, vaccines, last_vaccine, next_vaccine, created_at) + `imports` table
  - Server routes: full pet CRUD (GET/POST/PUT/DELETE /api/pets), one-time import (POST /api/import/pets), import status (GET /api/import/status), public pet read (GET /api/public/pet/:petId)
  - Frontend API client (`src/app/services/api.ts`): petApi, importApi, publicApi with auth token management
  - AppContext: In integration mode, pet add/update/delete syncs to API; `loadPetsFromApi()` fetches pets from DB; `updatePet()` and `deletePet()` added
  - AuthContext: `importLocalData()` method for one-time localStorage→DB import; clears localStorage and hasPendingImport after import
  - QRP screens: Support `:petId` URL param for DB-backed public QR reads; fallback to LUNA demo data when no petId
  - Public pet read: No owner PII exposed; microchip shows Yes/empty; hasOwner flag only
  - Packages added: pg, @types/pg
- 2026-03-14: Auth + Backend Foundation
  - Firebase Auth with Google Sign-In (frontend client SDK, lazy init)
  - Express API server on port 3001 with health and auth/me endpoints
  - Firebase Admin SDK token verification middleware
  - AuthContext, AuthGuard, IAuthService interface + demo/firebase adapters
  - Sign-in screen at /auth/sign-in (standalone route, no AppShell)
  - Route guards: AppShell routes wrapped with AuthGuard; public/standalone routes remain unguarded
  - Demo mode unchanged — AuthGuard passes through, synthetic demo user, no Firebase calls
  - Vite proxy config: /api/* → localhost:3001
  - hasPendingImport flag in AuthContext for future local-to-account data migration
  - Packages added: firebase, firebase-admin, express, cors, tsx, typescript, @types/express, @types/cors
- 2026-03-14: Wave 1 Redesign — Brand Theme + Shell + Nav + Home
  - `theme.css`: Added Trust Blue (#2A6BB8) and Care Green (#A9E5CC) token families; brand aliases (--brand-primary, --brand-secondary, etc.); --primary remapped to blue; red demoted to alert-only; --gray-50 added
  - `ModeSwitch.tsx`: Compact pill toggle (32px height) with white elevated active state; Daily=blue, Emergency=red text; no more giant colored pills
  - `AppBar.tsx`: Logo (img from /brand/pettodo-logo-primary.png) on home; mode switch inline on home only; sub-pages show back+title without mode switch; white bg with bottom border; brand blue back chevron
  - `BottomNav.tsx`: Unified single tab set (Home, Pets, QR, Community, Profile) for both modes; brand blue active state; mode-aware home path routing
  - `AppShell.tsx`: Background changed to --brand-primary-bg for subtle brand contrast
  - `HOM_01.tsx`: Brand tokens for all cards (reminder=care-green, feeding=brand-blue); services use brand-primary icons; section headers use --brand-primary-dark
  - `Cards.tsx`: PetCard avatar bg=brand-secondary-soft; QR badge=brand-primary; vaccine badge=brand-secondary-dark; CardShell brand hover; SafePointCard/PlayDateCard use brand tokens
- 2026-03-09: Demo Recording Polish
- 2026-03-09: Demo Hub — Demo launcher screen at /demo route
- 2026-02-23: Iteration 15 — CRUD Extensions, Weight Advisor, Feeding Gauge, UX Polish
- 2026-02-22: Iteration 14 — Pet Profile Health + Feeding + QR Certificates
- 2026-02-22: Iteration 13 — Critical Fixes + Home Cleanup
- 2026-02-20: Iteration 12 — Integration-Ready Architecture
- 2026-02-20: Iteration 9 — Local-first Functionality
- 2026-02-20: Iteration 8 and earlier — 100 screens, design system, localStorage state, flyer download, calendar integration
- 2026-02-20: Initial Replit setup

## User Preferences
- Minimal dependencies, minimal scope changes
- Small commit-ready changes preferred
- No heavy libraries unless strictly necessary
