import type { ISmsService } from '../interfaces';

const DEMO_OTP = '123456';
const pendingOtps = new Map<string, string>();

export const smsDemoAdapter: ISmsService = {
  async requestOtp(phone) {
    const otp = DEMO_OTP;
    pendingOtps.set(phone, otp);
    console.info(`[DEMO SMS] OTP for ${phone}: ${otp}`);
    return { success: true };
  },

  async verifyOtp(phone, code) {
    const stored = pendingOtps.get(phone);
    if (stored === code || code === DEMO_OTP) {
      pendingOtps.delete(phone);
      return { success: true };
    }
    return { success: false };
  },
};
