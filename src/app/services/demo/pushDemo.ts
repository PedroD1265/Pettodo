import { toast } from 'sonner';
import type { IPushService } from '../interfaces';

export const pushDemoAdapter: IPushService = {
  async requestPermission() {
    return 'granted';
  },

  async subscribe() {
    return { success: true };
  },

  showLocalNotification(title, body) {
    toast(title, { description: body, duration: 5000 });
  },
};
