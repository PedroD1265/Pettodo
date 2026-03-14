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

## API Endpoints
- `GET /api/health` — unprotected, returns `{ ok: true }`
- `GET /api/auth/me` — protected (Bearer token), returns `{ uid, email, displayName, photoURL }`

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

## Recent Changes
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
