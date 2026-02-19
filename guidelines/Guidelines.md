# PETTODO Design & Development Guidelines

## Layout Rules
- No absolute positioning unless necessary for overlays
- Use CSS variable tokens via `var(--token-name)` — do not hardcode colors
- Keep components reusable and composable
- All interactive targets must be >= 44x44 px (WCAG touch target)
- English-only UI copy — no lorem ipsum anywhere
- Public QR routes (QRP_*): NO app chrome (no AppBar, no BottomNav, no ModeSwitch)

## Bipolar Navigation
- Global ModeSwitch visible on ALL in-app screens via AppBar
- Emergency mode: red color system, map-first, urgent CTAs
- Daily mode: green color system, calm dashboard, health/social
- Bottom nav adapts per mode (5 tabs each)

## Token System
- All colors defined as CSS variables in `theme.css`
- Emergency: `--red-primary`, `--red-dark`, `--red-soft`, `--red-bg`
- Daily: `--green-primary`, `--green-dark`, `--green-soft`, `--green-bg`
- Semantic: `--info` (blue), `--warning` (amber)
- Neutrals: `--gray-100` through `--gray-900`
- Spacing: `--sp-1` (4px) through `--sp-8` (32px)
- Radius: `--r-sm` (8px) through `--r-xl` (24px)
- Elevation: `--shadow-sm`, `--shadow-md`, `--shadow-lg`

## Component Standards
- One screen per required frame name
- Each screen renders `<ScreenLabel name="ExactFrameName" />` at top
- Use Btn component for all buttons (variant-based)
- Use Banner component for all informational/warning messages
- Cards are composable via CardShell wrapper

## Safety & Anti-Scam
- Required phrases must appear in exact locations
- "Report suspicious behavior" in all chats and case details
- "PETTODO does not process payments" on relevant payment screens
- No real auth, SMS, ID verification, or payment processing

## Viewport
- Target: iPhone 13 (390x844)
- Light mode only
- Inter font with system fallback
