# PETTODO Phase 1 Auth + Backend Infrastructure Audit
**Date:** 2026-03-14 21:00 UTC-4
**Branch:** `main` (HEAD: `bb68b4b`)
**Scope:** Firebase Auth, Express API, PostgreSQL persistence, AuthGuard, demo/integration mode separation

---

## 1. CORRECTLY IMPLEMENTED

### 1.1 Auth Service Interface & Adapter Pattern — ✅ CORRECT
- `IAuthService` interface added cleanly to `interfaces.ts` (L47–60)
- `authDemoAdapter` provides a synthetic user, bypasses auth entirely in demo mode
- `authFirebaseAdapter` wraps Firebase `signInWithPopup`, `onAuthStateChanged`, `getIdToken` correctly
- Service index (`index.ts`) correctly routes: `auth = isDemo ? authDemoAdapter : authFirebaseAdapter`
- **Good:** Auth adapter follows the same pattern as all other services

### 1.2 Firebase Client Configuration — ✅ CORRECT
- `src/firebase.ts` — lazy singleton pattern for `FirebaseApp` and `Auth`
- Config reads from `VITE_FIREBASE_*` env vars (client-safe)
- Never exposed server-side secrets in client code

### 1.3 AuthContext — ✅ CORRECT
- Clean separation: `user`, `authReady`, `isDemo`, `hasPendingImport`
- `onAuthStateChanged` subscription with proper cleanup (L58)
- API token provider set on mount for integration mode (L30–33)
- `importLocalData()` with conflict handling (409 → silently clears localStorage)
- `signInWithGoogle()` / `signOut()` properly delegate to adapter

### 1.4 AuthGuard Component — ✅ CORRECT
- Demo mode → immediate pass-through via `<Outlet />`
- Loading state → spinner
- No user → redirect to `/auth/sign-in`
- On first auth: auto-imports local data if pending, then loads pets from API
- `didLoad.current` ref prevents multiple loads

### 1.5 Route Structure — ✅ CORRECT
- `AuthGuard` wraps all AppShell routes
- `/auth/sign-in` is OUTSIDE the guard
- `/public/qr-*` routes are OUTSIDE the guard (via `PublicShell`)
- `/demo`, `/sitemap`, `/design-system`, `/execution-log` are OUTSIDE the guard
- `GlobalLayout` wraps `AuthProvider` → `AppProvider` → `Outlet` (correct nesting order)

### 1.6 Backend Express Server — ✅ CORRECT STRUCTURE
- Express 5 with CORS, JSON parsing (1MB limit)
- Routes: `/api/health`, `/api/auth/me`, `/api/pets/*`, `/api/import/*`, `/api/public/pet/:petId`
- Firebase Admin token verification middleware
- PostgreSQL connection via `pg` Pool with fallback logic (PG* vars → DATABASE_URL)
- Schema migration on startup via `schema.sql`

### 1.7 API Routes — ✅ CORRECT
- `GET /api/pets` — scoped by `owner_uid`
- `POST /api/pets` — validates `name`, assigns ID, scoped by owner
- `PUT /api/pets/:id` — ownership check, COALESCE update
- `DELETE /api/pets/:id` — ownership check, RETURNING for 404 detection
- `POST /api/import/pets` — transactional, idempotent (409 if already imported), 100-pet limit
- `GET /api/public/pet/:petId` — no auth required, strips sensitive fields

### 1.8 SignIn Screen — ✅ CORRECT
- Clean Google sign-in button with proper SVG icon
- Error handling for popup-blocked, popup-closed, generic errors
- Loading state management
- Redirects to `/` if already authenticated or in demo mode

### 1.9 Demo Mode Backward Compatibility — ✅ CORRECT
- `VITE_APP_MODE=demo` (default) → no Firebase init, no API calls, no auth gate
- All existing demo flows remain fully functional
- `DemoHub` screen added at `/demo` as a standalone entry point

---

## 2. FRAGILE OR RISKY

### 2.1 Firebase Admin Init with Missing Credentials — ⚠️ MEDIUM
**File:** `server/firebaseAdmin.ts` L8–17
- If `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, or `FIREBASE_PRIVATE_KEY` are missing, the code logs a warning but **still calls `initializeApp()` with `undefined` credential values**
- `cert({ projectId: undefined, clientEmail: undefined, privateKey: undefined })` will either throw or create a broken admin instance
- **Risk:** Server starts but all token verification silently fails or crashes on first request

### 2.2 CORS Origin Matching — ⚠️ MEDIUM
**File:** `server/index.ts` L13–22
- Uses `origin.startsWith(o)` which is overly permissive. If `ALLOWED_ORIGINS` contains `http://localhost:5000`, then `http://localhost:50001` would also pass.
- **Risk:** Slightly widened CORS surface, not critical for internal pilot but should be exact matching

### 2.3 `addPet` Optimistic Update without Sync Guarantee — ⚠️ MEDIUM
**File:** `src/app/context/AppContext.tsx` L153–160
- In integration mode, `addPet` writes to local state first, then fires `petApi.create()` asynchronously
- If the API call fails, it removes the pet from local state (good!)
- But `saveEntityStore(next)` at L135 also writes to localStorage, which means a pet could exist in localStorage even after the API-side revert
- **Risk:** Ghost pets in localStorage after API failure, causing de-sync

### 2.4 `loadPetsFromApi` Overwrites Local State Without Merge — ⚠️ LOW
**File:** `src/app/context/AppContext.tsx` L140–151
- `setStore(prev => ({ ...prev, pets }))` replaces the pets array entirely with API data
- Any locally-created pet that hasn't been synced yet is silently lost
- **Risk:** Race condition during simultaneous create + load

### 2.5 Schema Migration is All-or-Nothing — ⚠️ LOW
**File:** `server/migrate.ts`
- Reads entire `schema.sql` and executes it as one query
- Uses `CREATE TABLE IF NOT EXISTS` so it's safe for re-runs
- But future schema changes will need a proper migration system
- **Risk:** Not a current problem, but blocks Phase 2 schema evolution

---

## 3. INCOMPLETE

### 3.1 No `VITE_AUTH_PROVIDER` Usage — ⚠️ HIGH
**File:** `src/app/config/appConfig.ts` L6
- `authProvider` config exists (`'demo' | 'firebase'`) but `services/index.ts` only checks `isDemo` (which is `appConfig.mode === 'demo'`)
- The auth adapter selection is: `isDemo ? authDemoAdapter : authFirebaseAdapter`
- **Impact:** You cannot have `VITE_APP_MODE=integration` + `VITE_AUTH_PROVIDER=demo`. The auth provider flag is dead code.
- **Severity:** HIGH — this means the two env vars are entangled and `VITE_AUTH_PROVIDER` is misleading

### 3.2 No Vite API Proxy in Dev — ⚠️ HIGH
**File:** `src/app/services/api.ts` L24
- `apiFetch` calls `fetch('/api${path}')` — relative to the frontend origin
- The Vite dev server runs on port 5000, the API on port 3001
- There is NO `vite.config.ts` proxy configuration visible
- **Impact:** In local development, all API calls will hit `http://localhost:5000/api/...` which is the Vite dev server, not the Express backend. They will all 404.
- **Severity:** HIGH — integration mode is broken in local dev without a proxy

### 3.3 Missing `users` Table — ⚠️ MEDIUM
**File:** `server/schema.sql`
- Only `pets` and `imports` tables exist
- No `users` table to store user profiles after first auth
- The `/api/auth/me` endpoint returns data from the Firebase token, not from a database record
- **Impact:** No persistent user profile, no user settings persistence, no user-scoped data beyond pets
- **Severity:** MEDIUM — acceptable for Phase 1, but Phase 2 needs this

### 3.4 No Error Boundary / 404 Route — ⚠️ MEDIUM
- No catch-all route for undefined paths
- No React error boundary for runtime errors
- **Impact:** Users hitting bad URLs see a blank page

### 3.5 Public Pet Route Exposes Microchip Data — ⚠️ MEDIUM
**File:** `server/routes/public.ts` L27
- `microchip: row.microchip ? 'Yes' : ''` — reveals presence but not full number (good)
- But `weight` is not included in the public API response while `vaccines` is
- **Impact:** Minor data exposure inconsistency

---

## 4. INCORRECTLY IMPLEMENTED

### 4.1 `firebaseAdmin.ts` Will Crash if Env Vars Missing — 🔴 CRITICAL
**File:** `server/firebaseAdmin.ts` L14–18
```typescript
if (getApps().length === 0) {
  initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}
```
- This runs unconditionally even when credentials are undefined
- `cert()` with undefined values will throw a Firebase Admin SDK error
- The server will crash on boot before it can serve any routes (including health check)
- **Fix:** Guard the `initializeApp()` call behind a credential check, or export a nullable `adminAuth`

### 4.2 Server Dependencies in Client `package.json` — 🔴 CRITICAL
**File:** `package.json` L48–61
- `cors`, `express`, `firebase-admin`, `pg` are listed in frontend `dependencies`
- These are Node.js server packages bundled into the Vite dependency tree
- Vite may attempt to resolve these during client build and fail
- `firebase-admin` especially is huge (300KB+) and absolutely must NOT be in a browser bundle
- **Impact:** Build may fail or bloat. Security risk if admin SDK code leaks to client.
- **Fix:** Move `express`, `cors`, `firebase-admin`, `pg` to a separate `server/package.json` or to `optionalDependencies`

### 4.3 `publicApi.getPet` Bypasses `apiFetch` — 🟡 LOW
**File:** `src/app/services/api.ts` L72–75
- Uses raw `fetch()` instead of `apiFetch()`, meaning no shared error handling
- This is intentional (public route = no auth header needed) but creates inconsistency
- **Fix:** Create an `unauthenticatedFetch` helper or add an `auth: false` option to `apiFetch`

### 4.4 `npm run build` FAILS — Production Build is Broken — 🔴 CRITICAL
**Verified:** Running `npm run build` on `main` produces:
```
Rollup failed to resolve import "firebase/auth" from "src/app/services/integration/authFirebase.ts"
```
**Root Causes (two compounding issues):**
1. `firebase` package is listed in `package.json` dependencies but `node_modules/firebase` does NOT exist (never installed after the Replit merge)
2. `services/index.ts` L18 uses a **static import** (`import { authFirebaseAdapter } from './integration/authFirebase'`) — this means Vite/Rollup always resolves and bundles it, even in demo mode when it's never used at runtime
- **Fix A (immediate):** Run `npm install` to install missing packages
- **Fix B (architectural):** Change to dynamic import (`const { authFirebaseAdapter } = await import(...)`) or use conditional re-exports to avoid bundling Firebase SDK in demo mode

---

## 5. WILL LIKELY BREAK AT RUNTIME

### 5.1 Integration Mode Without Vite Proxy — 🔴 WILL BREAK
- Setting `VITE_APP_MODE=integration` and running `npm run dev` will cause all `/api/*` calls to 404
- Need `vite.config.ts` proxy: `'/api': { target: 'http://localhost:3001' }`

### 5.2 Server Boot Without Database — 🔴 WILL BREAK
- `server/index.ts` calls `await testConnection()` which calls `process.exit(1)` on failure
- Without a running PostgreSQL instance, the server crashes immediately
- This is correct behavior but needs to be documented

### 5.3 Server Boot Without Firebase Credentials — 🔴 WILL BREAK
- `server/firebaseAdmin.ts` will crash `initializeApp()` with undefined cert values
- Every authenticated API endpoint then returns 500

### 5.4 `DemoHub` Uses `useApp()` which Works — ✅ OK
- `DemoHub` is outside AuthGuard but inside GlobalLayout → AppProvider → works correctly

---

## 6. FIXES NEEDED BEFORE PERSISTENCE PHASE

### Priority 1 — CRITICAL (blocking)

| # | File | Issue | Fix |
|---|---|---|---|
| 1 | `server/firebaseAdmin.ts` | Crashes on missing env vars | Wrap `initializeApp` in credential check; export nullable admin or throw clear error |
| 2 | `package.json` | Server deps in client package | Create `server/package.json` OR move to `devDependencies` at minimum |
| 3 | `vite.config.ts` | No API proxy for dev | Add `server.proxy: { '/api': 'http://localhost:3001' }` |
| 4 | **`services/index.ts`** | **Build broken — firebase not installed + static import always resolves** | **Run `npm install`; then convert to dynamic import for firebase adapter** |

### Priority 2 — HIGH (functionality)

| # | File | Issue | Fix |
|---|---|---|---|
| 4 | `services/index.ts` | `VITE_AUTH_PROVIDER` unused | Either use it or remove from config/env template |
| 5 | `server/schema.sql` | No users table | Add `CREATE TABLE IF NOT EXISTS users (uid TEXT PRIMARY KEY, email TEXT, ...)` |
| 6 | `AppContext.tsx` L135 | localStorage write on API revert | Skip `saveEntityStore` when in integration mode |

### Priority 3 — MEDIUM (quality)

| # | File | Issue | Fix |
|---|---|---|---|
| 7 | `server/index.ts` L16 | CORS startsWith too loose | Use strict equality or URL parsing |
| 8 | `routes.tsx` | No 404 catch-all route | Add `{ path: '*', Component: NotFound }` |
| 9 | `server/routes/public.ts` | Field exposure inconsistency | Audit which fields are safe for public view |

---

## 7. TESTS TO RUN NEXT

### Without secrets (can run now)
1. `npm run build` — verify Vite doesn't try to bundle server deps
2. `npm run dev` → navigate to `/` → verify demo mode still works perfectly
3. `npm run dev` → navigate to `/demo` → verify DemoHub renders
4. `npm run dev` → navigate to `/auth/sign-in` → verify page renders (even without Firebase config)
5. `npm run dev` → navigate to `/public/qr-landing` → verify it's accessible without auth guard

### With secrets (need Firebase + PostgreSQL)
6. Set `VITE_APP_MODE=integration` + Firebase vars → verify Google sign-in flow
7. Start API server (`npm run api`) with database → verify `GET /api/health` returns `{ ok: true }`
8. Verify `POST /api/pets` with valid Firebase token creates a pet
9. Verify `GET /api/pets` returns only pets owned by the authenticated user
10. Verify `POST /api/import/pets` with seed data, then verify 409 on second attempt
11. Verify `GET /api/public/pet/:id` works without auth token

---

## 8. SUMMARY TABLE

| Area | Verdict | Severity |
|---|---|---|
| Auth adapter pattern | ✅ Correct | — |
| Firebase client init | ✅ Correct | — |
| AuthContext | ✅ Correct | — |
| AuthGuard | ✅ Correct | — |
| Route protection | ✅ Correct | — |
| SignIn screen | ✅ Correct | — |
| Demo backward compatibility | ✅ Correct | — |
| API pet CRUD | ✅ Correct | — |
| Import flow | ✅ Correct | — |
| Public pet route | ✅ Correct | — |
| Firebase Admin init crash | ❌ Broken | 🔴 Critical |
| Server deps in client | ❌ Wrong location | 🔴 Critical |
| No Vite API proxy | ❌ Missing | 🔴 Critical |
| `VITE_AUTH_PROVIDER` unused | ⚠️ Dead code | 🟡 High |
| No users table | ⚠️ Incomplete | 🟡 High |
| Optimistic update + localStorage | ⚠️ Race condition | 🟡 Medium |
| CORS matching too loose | ⚠️ Fragile | 🟡 Medium |
| No 404 route | ⚠️ Missing | 🟡 Medium |
| No error boundary | ⚠️ Missing | 🟡 Medium |
