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
- 2026-02-20: Iteration 9 implementation
  - Real PNG/PDF flyer download (html-to-image + jsPDF)
  - Real .ics file download for Events and Play Dates
  - localStorage persistence for demo state (mode, activeCase, verification, sightings, etc.)
  - Added `disabled` prop to Btn component
  - New utility files: `src/app/utils/flyerDownload.ts`, `src/app/utils/icsHelper.ts`, `src/app/utils/localStorage.ts`
- 2026-02-20: Initial Replit setup - configured Vite dev server on port 5000 with all hosts allowed, added .gitignore, configured static deployment

## User Preferences
- Minimal dependencies, minimal scope changes
- Small commit-ready changes preferred
- No heavy libraries unless strictly necessary
