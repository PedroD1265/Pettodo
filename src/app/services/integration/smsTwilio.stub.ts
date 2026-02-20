import type { ISmsService } from '../interfaces';

export const smsTwilioStub: ISmsService = {
  async requestOtp(phone) {
    // TODO: Implement via backend proxy
    // POST /api/sms/request-otp  body: { phone }
    // Backend calls: Twilio Verify POST /v2/Services/{serviceSid}/Verifications
    // Body: { To: phone, Channel: 'sms' }
    // NEVER put TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN in client code.
    throw new Error(`[Twilio] Not implemented. phone=${phone}`);
  },

  async verifyOtp(phone, code) {
    // TODO: Implement via backend proxy
    // POST /api/sms/verify-otp  body: { phone, code }
    // Backend calls: Twilio Verify POST /v2/Services/{serviceSid}/VerificationChecks
    // Body: { To: phone, Code: code }
    throw new Error(`[Twilio] Not implemented. phone=${phone} code=${code}`);
  },
};
