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

