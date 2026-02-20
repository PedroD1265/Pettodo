import type { IPushService } from '../interfaces';

export const pushFcmStub: IPushService = {
  async requestPermission() {
    // TODO: Implement FCM permission request
    // 1. import { getMessaging, getToken } from 'firebase/messaging'
    // 2. await Notification.requestPermission()
    // 3. const messaging = getMessaging(firebaseApp)
    // 4. Parse VITE_FIREBASE_CONFIG_JSON for firebaseApp initialization
    return Notification.permission as 'granted' | 'denied' | 'default';
  },

  async subscribe() {
    // TODO: Implement FCM token registration
    // 1. const token = await getToken(messaging, { vapidKey: '...' })
    // 2. POST /api/push/register  body: { token }
    // 3. Backend stores token for server-side push via Firebase Admin SDK
    // Requires firebase-messaging-sw.js in public/
    throw new Error('[FCM] Not implemented. See docs/INTEGRATIONS.md for setup steps.');
  },

  showLocalNotification(title, body) {
    // Service worker showNotification — always works if permission granted
    if ('serviceWorker' in navigator && Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(reg => {
        reg.showNotification(title, { body, icon: '/favicon.ico' });
      });
    }
  },
};
