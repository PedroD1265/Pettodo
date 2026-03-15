# PETTODO — Replit Wave 1 UI Review Summary

## 1. Current Accepted UI Direction
- **Brand Tokens (Active):** `--brand-primary` (Blue/Trust), `--brand-secondary` (Green/Care), `--red-primary` (Emergency).
- **Navigation Architecture:** `BottomNav` unifies tabs accurately (Daily/Emergency variants are preserved).

## 2. What Changed in Wave 1 Polish
- **Shell Background:** Fixed the "color-by-numbers" feel by replacing the flooded light-blue global shell with a crisp, premium `--gray-50` background canvas in `AppShell` and `HOM_01`.
- **Header De-compression:** Increased `AppBar` minimum height to 56px and enlarged the `PETTODO` logo (from 28px to 36px) to fix visual compression and assert the brand.
- **Mode Switch Subordination:** Re-architected the `ModeSwitch` from two dominant visual pills (44px) into a true, compact segmented control (28px height, 11px font size) inside `AppBar`.

## 3. What Is Still Weak / Next Replit Task Priorities
1. **Premium Surfaces (Cards / Modals):** While borders, shadows, and base tokens are applied, components in `Cards.tsx` lack the final fraction of premium composition. We need slightly bolder headings, better micro-spacing between icons/labels, and softer border radii refinement.
2. **Typography Hierarchy:** The app relies heavily on `text-[12px]` to `text-[15px]`. The typography hierarchy needs adjustment to create better scanning contrast (font weights, line heights) without crowding the layout.
3. **Empty States & Layout Margins:** Some screens may have awkward top/bottom padding now that the horizontal components (AppBar/ModeSwitch) are strictly controlled.

## 4. Minimum Source-of-Truth Guidance for Next Replit Session
- **Do not invent new navigation structures.** Keep the current `BottomNav` and router system. 
- **Do not revert the ModeSwitch or Logo sizing.** They were deliberately reduced and enlarged respectively to correct visual hierarchy.
- **Focus purely on component interior composition** (spacing, typography contrast, micro-alignments) during the next Wave.
- **Keep reading the tokens from `theme.css`.** No inline hex codes.
