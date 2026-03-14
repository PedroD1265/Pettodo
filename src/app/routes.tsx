import { createBrowserRouter, Outlet } from 'react-router';
import { AppShell } from './layout/AppShell';
import { PublicShell } from './layout/PublicShell';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { AuthGuard } from './components/pettodo/AuthGuard';
import { Toaster } from 'sonner';

function GlobalLayout() {
  return (
    <AuthProvider>
      <AppProvider>
        <Outlet />
        <Toaster position="top-center" richColors />
      </AppProvider>
    </AuthProvider>
  );
}

// Sitemap
import SMP_01 from './screens/sitemap/SMP_01';
import SMP_02 from './screens/sitemap/SMP_02';
import SMP_03 from './screens/sitemap/SMP_03';

// Home
import HOM_01 from './screens/home/HOM_01';
import HOM_02 from './screens/home/HOM_02';
import HOM_03 from './screens/home/HOM_03';
import HOM_04 from './screens/home/HOM_04';

// Emergency
import EMG_01 from './screens/emergency/EMG_01';
import EMG_02 from './screens/emergency/EMG_02';
import EMG_03 from './screens/emergency/EMG_03';
import EMG_04 from './screens/emergency/EMG_04';
import EMG_05 from './screens/emergency/EMG_05';
import EMG_06 from './screens/emergency/EMG_06';
import EMG_07 from './screens/emergency/EMG_07';
import { EMG_08, EMG_09, EMG_10, EMG_11, EMG_12, EMG_13 } from './screens/emergency/EMG_08_to_13';
import { EMG_14, EMG_15, EMG_16, EMG_17, EMG_18, EMG_19, EMG_20 } from './screens/emergency/EMG_14_to_20';
import { EMG_21, EMG_22, EMG_23, EMG_24, EMG_25 } from './screens/emergency/EMG_21_to_25';
import { EMG_26, EMG_27, EMG_28, EMG_29, EMG_30, EMG_31 } from './screens/emergency/EMG_26_to_31';

// QR Hub
import { QRH_01, QRH_02, QRH_03, QRH_04, QRH_05 } from './screens/qr-hub/QRH_screens';

// Daily & Education
import { DLY_01, DLY_02, DLY_03, DLY_04, DLY_05, DLY_06, DLY_07, DLY_08 } from './screens/daily/DLY_screens';
import { EDU_01, EDU_02, EDU_03, EDU_04 } from './screens/daily/EDU_screens';

// Communities & Events
import { COM_01, COM_02, COM_03, COM_04, COM_05, EVT_01, EVT_02, EVT_03, EVT_04, EVT_05, EVT_06 } from './screens/communities/COM_EVT_screens';

// Community Dogs
import { CMT_01, CMT_02, CMT_03, CMT_04, CMT_05, CMT_06, CMT_07, CMT_08 } from './screens/community-dogs/CMT_screens';

// Walkers
import { SRV_01, SRV_02, SRV_03, SRV_04, SRV_05, SRV_06, SRV_07, SRV_08, SRV_09, SRV_10 } from './screens/walkers/SRV_screens';

// Play Dates
import { PD_01, PD_02, PD_03, PD_04, PD_05, PD_06, PD_07, PD_08 } from './screens/playdates/PD_screens';

// Profile
import { PRF_01, PRF_02, PRF_03, PRF_04, PRF_05 } from './screens/profile/PRF_screens';

// Public QR
import { QRP_01, QRP_02, QRP_03 } from './screens/qr-public/QRP_screens';

// Design System
import DS_01 from './screens/design-system/DS_01';

// Demo
import DemoHub from './screens/demo/DemoHub';

// Auth
import SignIn from './screens/auth/SignIn';

// Docs
import { ExecutionLog, QASelfCheck } from './screens/docs/DocsScreens';

export const router = createBrowserRouter([
  {
    Component: GlobalLayout,
    children: [
      // === IN-APP ROUTES (with AuthGuard + AppShell) ===
      {
        Component: AuthGuard,
        children: [{
        Component: AppShell,
        children: [
          // Home
          { path: '/', Component: HOM_01 },
          { path: '/home-daily', Component: HOM_01 },
          { path: '/home-emergency', Component: HOM_02 },
          { path: '/home-mode-switch', Component: HOM_03 },
          { path: '/home-notifications', Component: HOM_04 },

          // Emergency
          { path: '/emg/entry', Component: EMG_01 },
          { path: '/emg/lost-photos', Component: EMG_02 },
          { path: '/emg/lost-location', Component: EMG_03 },
          { path: '/emg/lost-time', Component: EMG_04 },
          { path: '/emg/lost-traits', Component: EMG_05 },
          { path: '/emg/lost-published', Component: EMG_06 },
          { path: '/emg/share-flyer', Component: EMG_07 },
          { path: '/emg/found-photos', Component: EMG_08 },
          { path: '/emg/found-radius', Component: EMG_09 },
          { path: '/emg/found-qr-scan', Component: EMG_10 },
          { path: '/emg/found-published', Component: EMG_11 },
          { path: '/emg/sighted-report', Component: EMG_12 },
          { path: '/emg/sighted-success', Component: EMG_13 },
          { path: '/emg/map-layers', Component: EMG_14 },
          { path: '/emg/map-pin-detail', Component: EMG_15 },
          { path: '/emg/matching-top10', Component: EMG_16 },
          { path: '/emg/matching-compare', Component: EMG_17 },
          { path: '/emg/case-detail-lost', Component: EMG_18 },
          { path: '/emg/case-detail-found', Component: EMG_19 },
          { path: '/emg/case-detail-sighted', Component: EMG_20 },
          { path: '/emg/heatmap', Component: EMG_21 },
          { path: '/emg/quadrants', Component: EMG_22 },
          { path: '/emg/chat', Component: EMG_23 },
          { path: '/emg/proof-modal', Component: EMG_24 },
          { path: '/emg/proof-capture', Component: EMG_25 },
          { path: '/emg/safe-point-select', Component: EMG_26 },
          { path: '/emg/safe-delivery-schedule', Component: EMG_27 },
          { path: '/emg/safe-delivery-rules', Component: EMG_28 },
          { path: '/emg/safe-delivery-checkin', Component: EMG_29 },
          { path: '/emg/case-resolved', Component: EMG_30 },
          { path: '/emg/case-lifecycle', Component: EMG_31 },

          // QR Hub
          { path: '/qr/hub', Component: QRH_01 },
          { path: '/qr/config', Component: QRH_02 },
          { path: '/qr/anti-scraping', Component: QRH_03 },
          { path: '/qr/share-download', Component: QRH_04 },
          { path: '/qr/preview', Component: QRH_05 },

          // Daily
          { path: '/daily/home', Component: DLY_01 },
          { path: '/daily/pet-list', Component: DLY_02 },
          { path: '/daily/pet-profile', Component: DLY_03 },
          { path: '/daily/documents', Component: DLY_04 },
          { path: '/daily/feeding', Component: DLY_05 },
          { path: '/daily/vaccines', Component: DLY_06 },
          { path: '/daily/calendar', Component: DLY_07 },
          { path: '/daily/report-lost', Component: DLY_08 },

          // Education
          { path: '/education/library', Component: EDU_01 },
          { path: '/education/article', Component: EDU_02 },
          { path: '/education/article/:id', Component: EDU_02 },
          { path: '/education/ai-assistant', Component: EDU_03 },
          { path: '/education/guide', Component: EDU_04 },

          // Communities
          { path: '/communities/home', Component: COM_01 },
          { path: '/communities/create', Component: COM_02 },
          { path: '/communities/detail', Component: COM_03 },
          { path: '/communities/create-post', Component: COM_04 },
          { path: '/communities/moderation', Component: COM_05 },

          // Events
          { path: '/events/list', Component: EVT_01 },
          { path: '/events/detail', Component: EVT_02 },
          { path: '/events/create', Component: EVT_03 },
          { path: '/events/ia-verification', Component: EVT_04 },
          { path: '/events/community-confirmation', Component: EVT_05 },
          { path: '/events/official-organizer', Component: EVT_06 },

          // Community Dogs
          { path: '/community-dogs/map-list', Component: CMT_01 },
          { path: '/community-dogs/create', Component: CMT_02 },
          { path: '/community-dogs/detail', Component: CMT_03 },
          { path: '/community-dogs/dedup', Component: CMT_04 },
          { path: '/community-dogs/found-warning', Component: CMT_05 },
          { path: '/community-dogs/dispute-start', Component: CMT_06 },
          { path: '/community-dogs/dispute-evidence', Component: CMT_07 },
          { path: '/community-dogs/dispute-resolution', Component: CMT_08 },

          // Walkers
          { path: '/walkers/marketplace', Component: SRV_01 },
          { path: '/walkers/profile', Component: SRV_02 },
          { path: '/walkers/request', Component: SRV_03 },
          { path: '/walkers/confirmation', Component: SRV_04 },
          { path: '/walkers/chat', Component: SRV_05 },
          { path: '/walkers/first-meet', Component: SRV_06 },
          { path: '/walkers/walk-session', Component: SRV_07 },
          { path: '/walkers/post-session', Component: SRV_08 },
          { path: '/walkers/incident-report', Component: SRV_09 },
          { path: '/walkers/verification', Component: SRV_10 },

          // Play Dates
          { path: '/playdates/home', Component: PD_01 },
          { path: '/playdates/compatibility', Component: PD_02 },
          { path: '/playdates/create', Component: PD_03 },
          { path: '/playdates/approval', Component: PD_04 },
          { path: '/playdates/detail', Component: PD_05 },
          { path: '/playdates/chat', Component: PD_06 },
          { path: '/playdates/incident', Component: PD_07 },
          { path: '/playdates/participation', Component: PD_08 },

          // Profile
          { path: '/profile/user', Component: PRF_01 },
          { path: '/profile/verification', Component: PRF_02 },
          { path: '/profile/privacy', Component: PRF_03 },
          { path: '/profile/notifications', Component: PRF_04 },
          { path: '/profile/safety', Component: PRF_05 },
        ],
      }],
      },

      // === AUTH ROUTES (no shell, no guard) ===
      { path: '/auth/sign-in', Component: SignIn },

      // === PUBLIC QR ROUTES (no app chrome) ===
      {
        Component: PublicShell,
        children: [
          { path: '/public/qr-landing', Component: QRP_01 },
          { path: '/public/qr-landing/:petId', Component: QRP_01 },
          { path: '/public/qr-captcha', Component: QRP_02 },
          { path: '/public/qr-captcha/:petId', Component: QRP_02 },
          { path: '/public/qr-report', Component: QRP_03 },
          { path: '/public/qr-report/:petId', Component: QRP_03 },
        ],
      },

      // === STANDALONE ROUTES (no shell, no guard) ===
      { path: '/demo', Component: DemoHub },
      { path: '/sitemap', Component: SMP_01 },
      { path: '/sitemap/bipolar', Component: SMP_02 },
      { path: '/sitemap/flows', Component: SMP_03 },
      { path: '/design-system', Component: DS_01 },
      { path: '/execution-log', Component: ExecutionLog },
      { path: '/qa-selfcheck', Component: QASelfCheck },
    ]
  }
]);
