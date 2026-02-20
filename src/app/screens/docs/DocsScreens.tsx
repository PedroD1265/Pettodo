import React from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';

export function ExecutionLog() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full" style={{ background: 'var(--white)' }}>
      <ScreenLabel name="98_Execution_Log" />
      <div className="p-4 flex flex-col gap-4">
        <button onClick={() => nav('/')} className="flex items-center gap-1" style={{ minHeight: 44, color: 'var(--gray-500)' }}>
          <ChevronLeft size={20} /> Home
        </button>
        <h1 className="text-[22px]" style={{ fontWeight: 700 }}>Execution Log</h1>

        <section>
          <h2 className="text-[17px] mb-2" style={{ fontWeight: 600 }}>Iteration 1 — Foundation</h2>
          <ul className="flex flex-col gap-1.5">
            {[
              'Complete PETTODO design system tokens (CSS variables)',
              '20+ reusable UI components (Buttons, Badges, Cards, Chat, Map, Timeline, Stepper, Modals, Banners)',
              '100 required screen routes organized into 12 page groups',
              'Bipolar navigation (Emergency/Daily) with global mode switch',
              'App shell with adaptive bottom nav (5 tabs per mode)',
              'Public QR shell without app chrome',
              'All 10 end-to-end flows wired via React Router',
              'Complete demo data centered on Luna',
              'All 19 required UI copy phrases placed in context',
              'iPhone 13 viewport (390x844) phone frame wrapper',
            ].map((item, i) => (
              <li key={i} className="text-[13px] pl-4" style={{ color: 'var(--gray-700)', listStyleType: 'disc' }}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-[17px] mb-2" style={{ fontWeight: 600 }}>Iteration 2 — Critical Spec Gaps</h2>
          <div className="flex flex-col gap-2">
            {[
              { tag: 'Task 1 — Panic Mode', desc: 'calm Banner on EMG_02, minimal-field note, Stepper active step' },
              { tag: 'Task 2 — Verification Levels', desc: 'OTPFlow, StrictVerificationFlow, VerificationGate, AppContext extended' },
              { tag: 'Task 3 — Photo Quality', desc: 'PhotoUploadGrid with good/ok/poor scoring, tips, "Better photos" warning' },
              { tag: 'Task 4 — Flyer + Share Kit', desc: 'FlyerPreview, ShareKitActions, FLYER_SHARE_TEXT, safety reminder' },
              { tag: 'Task 5 — Lifecycle Timers', desc: 'CaseLifecycleBar (30d), MatchLifecycleBar (10d), demoTimeOffset control' },
              { tag: 'Quick Fixes', desc: 'warning tokens in theme.css, HOM_01 h3 fix, hasActiveCase=false, Modals token cleanup' },
              { tag: 'DemoControls', desc: 'Gear FAB + panel: mode, case, verification level, strict status, time offset' },
            ].map((item, i) => (
              <div key={i} className="p-2.5 rounded-lg" style={{ background: 'var(--gray-100)' }}>
                <p className="text-[12px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{item.tag}</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--gray-500)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[17px] mb-2" style={{ fontWeight: 600 }}>Key decisions</h2>
          <ul className="flex flex-col gap-1.5">
            {[
              'Screens grouped by page into multi-export files for maintainability',
              'CSS variables used for all tokens (not Tailwind config) per Tailwind v4',
              'Maps are simulated placeholder views (no real map API)',
              'Auth, SMS, ID verification, and payments are simulated UI-only',
              'Inter font loaded via Google Fonts with system fallback',
              'All interactive targets meet 44px minimum',
              'English only, light mode only',
              'React.Fragment avoided in loops — div.contents used instead',
            ].map((item, i) => (
              <li key={i} className="text-[13px] pl-4" style={{ color: 'var(--gray-700)', listStyleType: 'disc' }}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-[17px] mb-2" style={{ fontWeight: 600 }}>How to test flows</h2>
          <div className="flex flex-col gap-2">
            {[
              { flow: '1. Mode Switch', path: '/home-daily → tap mode switch → /home-emergency' },
              { flow: '2. LOST', path: '/emg/entry → I lost my dog → follow CTAs through all steps' },
              { flow: '3. FOUND', path: '/emg/entry → I found a dog → follow CTAs' },
              { flow: '4. SIGHTED', path: '/emg/entry → I spotted a dog → follow CTAs' },
              { flow: '5. MAP', path: '/emg/map-layers → tap pins → case details' },
              { flow: '6. Daily→Emergency', path: '/daily/pet-profile → Report Luna as Lost → prefilled flow' },
              { flow: '7. Communities→Events', path: '/communities/home → detail → events → verify' },
              { flow: '8. Walkers', path: '/walkers/marketplace → profile → request → chat → session' },
              { flow: '9. Play Dates', path: '/playdates/home → create → approve → detail → chat' },
              { flow: '10. Public QR', path: '/public/qr-landing → show contact → captcha → back' },
            ].map((f, i) => (
              <div key={i} className="p-2 rounded-lg" style={{ background: 'var(--gray-100)' }}>
                <p className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{f.flow}</p>
                <p className="text-[11px]" style={{ color: 'var(--gray-500)', fontFamily: 'monospace' }}>{f.path}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[17px] mb-2" style={{ fontWeight: 600 }}>Iteration 4 — Panic Mode Claim Gate UX</h2>
          <div className="p-2.5 rounded-lg" style={{ background: 'var(--gray-100)' }}>
             <p className="text-[12px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>EMG_06 Claim Gate</p>
             <p className="text-[11px] mt-0.5" style={{ color: 'var(--gray-500)' }}>Added info section, wrapped Edit/Chat buttons with VerificationGate, synced claim state.</p>
          </div>
        </section>

        <section>
          <h2 className="text-[17px] mb-2" style={{ fontWeight: 600 }}>Known gaps</h2>
          <ul className="flex flex-col gap-1.5">
            {[
              'Map views are placeholder (no Mapbox/Google Maps integration)',
              'Camera/photo upload is UI-only simulation (no FileReader/MediaDevices)',
              'Real-time chat is simulated with static messages',
              'No actual SMS or captcha verification',
              'AI matching is simulated with demo data',
              'Flyer PNG/PDF download is simulated (toast only)',
              'Calendar integration buttons are non-functional',
            ].map((item, i) => (
              <li key={i} className="text-[13px] pl-4" style={{ color: 'var(--gray-500)', listStyleType: 'disc' }}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export function QASelfCheck() {
  const nav = useNavigate();

  const screens100 = [
    'SMP_01', 'SMP_02', 'SMP_03',
    'HOM_01', 'HOM_02', 'HOM_03', 'HOM_04',
    'EMG_01–31 (31 screens)',
    'QRH_01–05 (5 screens)',
    'DLY_01–08 (8 screens)',
    'EDU_01–04 (4 screens)',
    'COM_01–05 (5 screens)',
    'EVT_01–06 (6 screens)',
    'CMT_01–08 (8 screens)',
    'SRV_01–10 (10 screens)',
    'PD_01–08 (8 screens)',
    'PRF_01–05 (5 screens)',
    'QRP_01–03 (3 screens)',
    '01_Design_System',
    '98_Execution_Log',
    '99_QA_SelfCheck',
  ];

  const phrases = [
    { phrase: 'Possible match (AI doesn\'t confirm)', screen: 'EMG_11, EMG_16, EMG_17' },
    { phrase: 'Stay calm — we\'ll guide you step by step', screen: 'EMG_02' },
    { phrase: 'Your exact location is protected', screen: 'EMG_03, EMG_09, PRF_03' },
    { phrase: 'Do not share your address', screen: 'EMG_23, PRF_03' },
    { phrase: 'Handoff only at a safe point', screen: 'EMG_26, EMG_28, PRF_05' },
    { phrase: 'Reward only after the handoff', screen: 'EMG_28, PRF_05' },
    { phrase: 'No upfront payments or deposits', screen: 'EMG_28, PRF_05, SRV_05' },
    { phrase: 'Request proof of life', screen: 'EMG_23, EMG_24' },
    { phrase: 'Event source', screen: 'EVT_01, EVT_02' },
    { phrase: 'AI Verified', screen: 'EVT_02, EVT_04' },
    { phrase: 'Community Verified (weighted)', screen: 'EVT_02, EVT_05' },
    { phrase: 'PETTODO does not process payments', screen: 'EMG_28, SRV_03, SRV_05, PRF_05' },
    { phrase: 'Better photos improve match accuracy', screen: 'EMG_02, EMG_08 (PhotoUploadGrid)' },
    { phrase: 'This dog has an owner. Help them get home.', screen: 'QRP_01, CMT_05' },
    { phrase: 'Report suspicious behavior', screen: 'EMG_23, SRV_05, PD_06' },
    { phrase: 'Approximate area only — exact address is hidden.', screen: 'EMG_15, EMG_19, QRP_03' },
    { phrase: 'This action requires Strict verification (ID + Selfie).', screen: 'EVT_06, SRV_10, PD_08, VerificationGate' },
    { phrase: 'Too many attempts. Try again in 60 minutes.', screen: 'QRP_02, QRH_03, OTPFlow rate_limit' },
    { phrase: 'Last updated 12 min ago', screen: 'EMG_15, EMG_18, EMG_21' },
  ];

  const iter2Components = [
    'OTPFlow — phone → OTP → success / error / rate_limit',
    'StrictVerificationFlow — start → ID front → ID back → selfie → submitted',
    'VerificationGate — basic / strict gating wrapper',
    'PhotoUploadGrid — 3 slots, quality scoring, inline tips',
    'FlyerPreview — LOST/FOUND flyer with QR placeholder',
    'ShareKitActions — download PNG/PDF, copy text, share link',
    'CaseLifecycleBar — 30-day progress, status chip',
    'MatchLifecycleBar — 10-day bar, day 7 / day 9 markers',
    'DemoControlsFab — gear icon FAB (bottom-right)',
    'DemoControlsPanel — full state control overlay',
  ];

  return (
    <div className="flex flex-col min-h-full" style={{ background: 'var(--white)' }}>
      <ScreenLabel name="99_QA_SelfCheck" />
      <div className="p-4 flex flex-col gap-4">
        <button onClick={() => nav('/')} className="flex items-center gap-1" style={{ minHeight: 44, color: 'var(--gray-500)' }}>
          <ChevronLeft size={20} /> Home
        </button>
        <h1 className="text-[22px]" style={{ fontWeight: 700 }}>QA Self-Check</h1>

        <section>
          <h2 className="text-[17px] mb-2" style={{ fontWeight: 600 }}>Pages / Route Groups ✅</h2>
          <div className="flex flex-col gap-1">
            {['00_Sitemap', '01_Design_System', '02_Home_Bipolar', '03_Emergency_Search', '04_QR_Identification', '05_Daily_PetManager_Education', '06_Communities_Events', '07_Community_Dogs', '08_Services_Walkers', '09_PlayDates', '10_Profile_Verification_Privacy', '11_QR_Public_Landing', '98_Execution_Log', '99_QA_SelfCheck'].map((p) => (
              <div key={p} className="flex items-center gap-2 py-0.5">
                <span className="text-[12px]" style={{ color: 'var(--green-primary)' }}>✅</span>
                <span className="text-[12px]" style={{ color: 'var(--gray-700)' }}>{p}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[17px] mb-2" style={{ fontWeight: 600 }}>100 Screens Checklist ✅</h2>
          <div className="flex flex-col gap-1">
            {screens100.map((s) => (
              <div key={s} className="flex items-center gap-2 py-0.5">
                <span className="text-[12px]" style={{ color: 'var(--green-primary)' }}>✅</span>
                <span className="text-[12px]" style={{ color: 'var(--gray-700)' }}>{s}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[17px] mb-2" style={{ fontWeight: 600 }}>10 Flows Checklist ✅</h2>
          <div className="flex flex-col gap-1">
            {[
              '1. Home ↔ Mode Switch',
              '2. LOST flow (17 screens)',
              '3. FOUND flow (9 screens)',
              '4. SIGHTED flow (4 screens)',
              '5. MAP flow',
              '6. Daily → Emergency Prefilled',
              '7. Communities → Events',
              '8. Walkers (8 screens)',
              '9. Play Dates (6 screens)',
              '10. Public QR',
            ].map((f) => (
              <div key={f} className="flex items-center gap-2 py-0.5">
                <span className="text-[12px]" style={{ color: 'var(--green-primary)' }}>✅</span>
                <span className="text-[12px]" style={{ color: 'var(--gray-700)' }}>{f}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[17px] mb-2" style={{ fontWeight: 600 }}>Required Phrases ✅</h2>
          <div className="flex flex-col gap-1.5">
            {phrases.map((p, i) => (
              <div key={i} className="p-2 rounded-lg" style={{ background: 'var(--gray-100)' }}>
                <p className="text-[11px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>"{p.phrase}"</p>
                <p className="text-[10px]" style={{ color: 'var(--gray-400)' }}>→ {p.screen}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[17px] mb-2" style={{ fontWeight: 600 }}>Iteration 2 Components ✅</h2>
          <div className="flex flex-col gap-1">
            {iter2Components.map((c) => (
              <div key={c} className="flex items-start gap-2 py-0.5">
                <span className="text-[12px] shrink-0" style={{ color: 'var(--green-primary)' }}>✅</span>
                <span className="text-[12px]" style={{ color: 'var(--gray-700)' }}>{c}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[17px] mb-2" style={{ fontWeight: 600 }}>Iteration 4 Checks ✅</h2>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 py-0.5">
              <span className="text-[12px]" style={{ color: 'var(--green-primary)' }}>✅</span>
              <span className="text-[12px]" style={{ color: 'var(--gray-700)' }}>Panic Mode claim gate is explicitly represented in EMG_06 and triggers OTP when unverified.</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[17px] mb-2" style={{ fontWeight: 600 }}>Accessibility ✅</h2>
          <div className="flex flex-col gap-1">
            {[
              'All interactive targets >= 44x44 px',
              'Light mode only',
              'English only — no lorem ipsum',
              'Public QR screens: no app chrome',
              'Semantic color contrast maintained',
              'CSS variable tokens only — no hardcoded hex values',
              'React.Fragment avoided in loops (div.contents)',
            ].map((a) => (
              <div key={a} className="flex items-center gap-2 py-0.5">
                <span className="text-[12px]" style={{ color: 'var(--green-primary)' }}>✅</span>
                <span className="text-[12px]" style={{ color: 'var(--gray-700)' }}>{a}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}