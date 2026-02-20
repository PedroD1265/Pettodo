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
