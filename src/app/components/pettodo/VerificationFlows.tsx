import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Btn } from './Buttons';
import { Banner } from './Banners';
import { Phone, CheckCircle, AlertTriangle, ShieldCheck, Camera, CreditCard, X, Clock, RefreshCw } from 'lucide-react';

// ========== BASIC OTP FLOW ==========

type OTPStep = 'phone' | 'otp' | 'success' | 'error' | 'rate_limit';

interface OTPFlowProps {
  onComplete: () => void;
  onDismiss?: () => void;
  inline?: boolean;
}

export function OTPFlow({ onComplete, onDismiss, inline = false }: OTPFlowProps) {
  const { setVerificationLevel } = useApp();
  const [step, setStep] = useState<OTPStep>('phone');
  const [phone, setPhone] = useState('+1 (555) 987-6543');
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const handleSendOTP = () => {
    if (attempts >= 5) {
      setStep('rate_limit');
      return;
    }
    setStep('otp');
    setResendTimer(30);
    setAttempts(a => a + 1);
  };

  const handleVerify = () => {
    if (otp === '0000') {
      setStep('error');
      return;
    }
    setStep('success');
    setVerificationLevel('basic');
    setTimeout(onComplete, 1500);
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setResendTimer(30);
    setAttempts(a => a + 1);
    if (attempts >= 5) {
      setStep('rate_limit');
    }
  };

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    inline ? (
      <div className="flex flex-col gap-3 w-full">{children}</div>
    ) : (
      <div className="flex flex-col gap-4 p-4 rounded-2xl w-full" style={{ background: 'var(--gray-100)' }}>
        <div className="flex items-center justify-between">
          <h4 className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Phone Verification</h4>
          {onDismiss && (
            <button onClick={onDismiss} style={{ minWidth: 44, minHeight: 44, color: 'var(--gray-400)' }}>
              <X size={18} />
            </button>
          )}
        </div>
        {children}
      </div>
    )
  );

  if (step === 'rate_limit') {
    return (
      <Wrapper>
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'var(--warning-bg)' }}>
            <Clock size={28} style={{ color: 'var(--warning)' }} />
          </div>
          <p className="text-[15px] text-center" style={{ fontWeight: 600, color: 'var(--warning-dark)' }}>
            Too many attempts
          </p>
          <p className="text-[13px] text-center" style={{ color: 'var(--warning-dark)' }}>
            Too many attempts. Try again in 60 minutes.
          </p>
        </div>
      </Wrapper>
    );
  }

  if (step === 'success') {
    return (
      <Wrapper>
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'var(--green-soft)' }}>
            <CheckCircle size={28} style={{ color: 'var(--green-primary)' }} />
          </div>
          <p className="text-[15px] text-center" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>
            Phone verified!
          </p>
          <p className="text-[13px] text-center" style={{ color: 'var(--green-dark)' }}>
            You can now manage your case, chat with finders, and receive notifications.
          </p>
        </div>
      </Wrapper>
    );
  }

  if (step === 'error') {
    return (
      <Wrapper>
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--red-bg)' }}>
            <AlertTriangle size={24} style={{ color: 'var(--red-primary)' }} />
          </div>
          <p className="text-[14px] text-center" style={{ fontWeight: 600, color: 'var(--red-dark)' }}>
            Invalid code
          </p>
          <p className="text-[13px] text-center" style={{ color: 'var(--gray-500)' }}>
            The code you entered is incorrect. Please try again.
          </p>
          <Btn variant="primary" fullWidth onClick={() => { setOtp(''); setStep('otp'); }}>Try Again</Btn>
        </div>
      </Wrapper>
    );
  }

  if (step === 'otp') {
    return (
      <Wrapper>
        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>
          Enter the 6-digit code sent to {phone}
        </p>
        <div className="flex gap-2 justify-center">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div
              key={i}
              className="w-11 h-12 rounded-xl flex items-center justify-center text-[20px]"
              style={{
                background: 'var(--white)',
                border: `2px solid ${otp[i] ? 'var(--gray-900)' : 'var(--gray-200)'}`,
                fontWeight: 700,
                color: 'var(--gray-900)',
              }}
            >
              {otp[i] || ''}
            </div>
          ))}
        </div>
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="Enter code"
          className="px-3 py-2.5 rounded-xl text-center text-[16px]"
          style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', minHeight: 48 }}
        />
        <Btn variant="primary" fullWidth onClick={handleVerify}>Verify Code</Btn>
        <div className="flex items-center justify-center gap-2">
          {resendTimer > 0 ? (
            <span className="text-[13px]" style={{ color: 'var(--gray-400)' }}>
              Resend in {resendTimer}s
            </span>
          ) : (
            <button onClick={handleResend} className="flex items-center gap-1 text-[13px]" style={{ color: 'var(--info)', fontWeight: 500, minHeight: 44 }}>
              <RefreshCw size={14} /> Resend code
            </button>
          )}
        </div>
      </Wrapper>
    );
  }

  // Phone entry step
  return (
    <Wrapper>
      <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>
        Enter your phone number to receive a verification code.
      </p>
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', minHeight: 48 }}>
        <Phone size={16} style={{ color: 'var(--gray-400)' }} />
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="flex-1 text-[14px] bg-transparent outline-none"
          style={{ color: 'var(--gray-900)' }}
        />
      </div>
      <Btn variant="primary" fullWidth onClick={handleSendOTP}>Send Verification Code</Btn>
      <p className="text-[11px] text-center" style={{ color: 'var(--gray-400)' }}>
        Standard messaging rates may apply. Code expires in 10 minutes.
      </p>
    </Wrapper>
  );
}

// ========== STRICT VERIFICATION FLOW ==========

type StrictStep = 'start' | 'id_front' | 'id_back' | 'selfie' | 'submitted';

interface StrictFlowProps {
  onComplete: () => void;
  onDismiss?: () => void;
}

export function StrictVerificationFlow({ onComplete, onDismiss }: StrictFlowProps) {
  const { strictStatus, setStrictStatus, setVerificationLevel } = useApp();
  const [step, setStep] = useState<StrictStep>('start');

  // If already submitted, show status
  if (strictStatus !== 'not_started' && step === 'start') {
    return <StrictStatusView status={strictStatus} onRetry={() => { setStrictStatus('not_started'); setStep('start'); }} />;
  }

  if (step === 'submitted') {
    return (
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col items-center gap-3 py-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--info-bg)' }}>
            <Clock size={32} style={{ color: 'var(--info)' }} />
          </div>
          <h3 className="text-[18px] text-center" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Verification Submitted</h3>
          <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>
            Your ID and selfie are being reviewed. This usually takes less than 24 hours.
          </p>
          <div className="w-full p-3 rounded-xl" style={{ background: 'var(--info-bg)', border: '1px solid var(--info-soft)' }}>
            <p className="text-[13px]" style={{ color: 'var(--info-dark)', fontWeight: 500 }}>
              Status: Pending review
            </p>
          </div>
          <Btn variant="primary" fullWidth onClick={() => {
            setStrictStatus('pending');
            onComplete();
          }}>Done</Btn>
        </div>
      </div>
    );
  }

  if (step === 'selfie') {
    return (
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Take a selfie</h3>
          {onDismiss && <button onClick={onDismiss} style={{ minWidth: 44, minHeight: 44, color: 'var(--gray-400)' }}><X size={18} /></button>}
        </div>
        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>
          Hold your phone at arm's length and look directly at the camera. Make sure your face is well-lit and fully visible.
        </p>

        <div className="flex flex-col items-center gap-3">
          <div className="w-48 h-48 rounded-full flex items-center justify-center" style={{ background: 'var(--gray-100)', border: '3px dashed var(--info)' }}>
            <Camera size={48} style={{ color: 'var(--gray-400)' }} />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            {['Face fully visible', 'Good lighting, no shadows', 'No sunglasses or hats', 'Neutral expression'].map(tip => (
              <div key={tip} className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'var(--gray-100)' }}>
                <CheckCircle size={14} style={{ color: 'var(--green-primary)' }} />
                <span className="text-[12px]" style={{ color: 'var(--gray-700)' }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Btn variant="primary" fullWidth onClick={() => setStep('submitted')} icon={<Camera size={18} />}>
            Take Selfie
          </Btn>
          <Btn variant="ghost" fullWidth onClick={() => setStep('id_back')}>Back</Btn>
        </div>
      </div>
    );
  }

  if (step === 'id_back') {
    return (
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>ID — Back side</h3>
          {onDismiss && <button onClick={onDismiss} style={{ minWidth: 44, minHeight: 44, color: 'var(--gray-400)' }}><X size={18} /></button>}
        </div>
        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>
          Take a clear photo of the back of your government-issued ID.
        </p>
        <div className="aspect-[3/2] rounded-2xl flex flex-col items-center justify-center gap-2" style={{ background: 'var(--gray-100)', border: '2px dashed var(--gray-300)' }}>
          <CreditCard size={40} style={{ color: 'var(--gray-400)' }} />
          <span className="text-[13px]" style={{ color: 'var(--gray-400)' }}>Tap to capture back of ID</span>
        </div>
        <Banner type="info" text="All data is encrypted. We only verify your identity — no data is stored." />
        <div className="mt-auto flex flex-col gap-2">
          <Btn variant="primary" fullWidth onClick={() => setStep('selfie')}>Next: Selfie</Btn>
          <Btn variant="ghost" fullWidth onClick={() => setStep('id_front')}>Back</Btn>
        </div>
      </div>
    );
  }

  if (step === 'id_front') {
    return (
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>ID — Front side</h3>
          {onDismiss && <button onClick={onDismiss} style={{ minWidth: 44, minHeight: 44, color: 'var(--gray-400)' }}><X size={18} /></button>}
        </div>
        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>
          Take a clear photo of the front of your government-issued ID (passport, driver's license, or national ID).
        </p>
        <div className="aspect-[3/2] rounded-2xl flex flex-col items-center justify-center gap-2" style={{ background: 'var(--gray-100)', border: '2px dashed var(--gray-300)' }}>
          <CreditCard size={40} style={{ color: 'var(--gray-400)' }} />
          <span className="text-[13px]" style={{ color: 'var(--gray-400)' }}>Tap to capture front of ID</span>
        </div>
        <Banner type="info" text="All data is encrypted. We only verify your identity — no data is stored." />
        <div className="mt-auto flex flex-col gap-2">
          <Btn variant="primary" fullWidth onClick={() => setStep('id_back')}>Next: Back of ID</Btn>
          <Btn variant="ghost" fullWidth onClick={() => setStep('start')}>Back</Btn>
        </div>
      </div>
    );
  }

  // Start screen
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Strict Verification</h3>
        {onDismiss && <button onClick={onDismiss} style={{ minWidth: 44, minHeight: 44, color: 'var(--gray-400)' }}><X size={18} /></button>}
      </div>

      <div className="flex flex-col items-center gap-3 py-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--green-soft)' }}>
          <ShieldCheck size={32} style={{ color: 'var(--green-primary)' }} />
        </div>
        <p className="text-[14px] text-center" style={{ color: 'var(--gray-700)' }}>
          Strict verification is required to keep the community safe for high-trust actions.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Required for:</p>
        {[
          'Walker onboarding',
          'Organizing events as official organizer',
          'Ownership disputes',
          'Creating communities',
        ].map(item => (
          <div key={item} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'var(--gray-100)' }}>
            <ShieldCheck size={14} style={{ color: 'var(--green-primary)' }} />
            <span className="text-[13px]" style={{ color: 'var(--gray-700)' }}>{item}</span>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-xl" style={{ background: 'var(--info-bg)', border: '1px solid var(--info-soft)' }}>
        <p className="text-[12px]" style={{ color: 'var(--info-dark)', fontWeight: 500 }}>
          You will need: a government-issued ID and a selfie. Takes about 2 minutes.
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Btn variant="primary" fullWidth onClick={() => setStep('id_front')} icon={<ShieldCheck size={18} />}>
          Start Verification
        </Btn>
        {onDismiss && <Btn variant="ghost" fullWidth onClick={onDismiss}>Maybe Later</Btn>}
      </div>
    </div>
  );
}

// Strict status display
function StrictStatusView({ status, onRetry }: { status: string; onRetry: () => void }) {
  if (status === 'approved') {
    return (
      <div className="flex flex-col items-center gap-3 p-4 py-6">
        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'var(--green-soft)' }}>
          <ShieldCheck size={28} style={{ color: 'var(--green-primary)' }} />
        </div>
        <p className="text-[15px] text-center" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>Strict Verified</p>
        <p className="text-[13px] text-center" style={{ color: 'var(--gray-500)' }}>
          Your identity has been verified. You have full access to all features.
        </p>
      </div>
    );
  }
  if (status === 'rejected') {
    return (
      <div className="flex flex-col items-center gap-3 p-4 py-6">
        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'var(--red-bg)' }}>
          <AlertTriangle size={28} style={{ color: 'var(--red-primary)' }} />
        </div>
        <p className="text-[15px] text-center" style={{ fontWeight: 600, color: 'var(--red-dark)' }}>Verification Rejected</p>
        <p className="text-[13px] text-center" style={{ color: 'var(--gray-500)' }}>
          Your submission could not be verified. Common reasons: blurry photo, expired ID, or face mismatch.
        </p>
        <Btn variant="primary" fullWidth onClick={onRetry}>Resubmit Verification</Btn>
      </div>
    );
  }
  // pending
  return (
    <div className="flex flex-col items-center gap-3 p-4 py-6">
      <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'var(--info-bg)' }}>
        <Clock size={28} style={{ color: 'var(--info)' }} />
      </div>
      <p className="text-[15px] text-center" style={{ fontWeight: 600, color: 'var(--info-dark)' }}>Pending Review</p>
      <p className="text-[13px] text-center" style={{ color: 'var(--gray-500)' }}>
        Your verification is being reviewed. This usually takes less than 24 hours.
      </p>
    </div>
  );
}

// ========== VERIFICATION GATE COMPONENT ==========

interface VerificationGateProps {
  requiredLevel: 'basic' | 'strict';
  children: React.ReactNode;
  actionLabel?: string;
}

export function VerificationGate({ requiredLevel, children, actionLabel }: VerificationGateProps) {
  const { verificationLevel, strictStatus } = useApp();
  const [showFlow, setShowFlow] = useState(false);

  const isBasicMet = verificationLevel === 'basic' || verificationLevel === 'strict' as string;
  const isStrictMet = strictStatus === 'approved';

  if (requiredLevel === 'basic' && !isBasicMet) {
    if (showFlow) {
      return <OTPFlow onComplete={() => setShowFlow(false)} onDismiss={() => setShowFlow(false)} />;
    }
    return (
      <div className="flex flex-col gap-3 p-4 rounded-xl" style={{ background: 'var(--warning-bg)', border: '1px solid var(--warning-soft)' }}>
        <div className="flex items-center gap-2">
          <Phone size={18} style={{ color: 'var(--warning)' }} />
          <span className="text-[14px]" style={{ fontWeight: 600, color: 'var(--warning-dark)' }}>
            SMS verification required
          </span>
        </div>
        <p className="text-[12px]" style={{ color: 'var(--warning-dark)' }}>
          {actionLabel || 'This action'} requires phone verification.
        </p>
        <Btn variant="primary" onClick={() => setShowFlow(true)}>Verify Phone Number</Btn>
      </div>
    );
  }

  if (requiredLevel === 'strict' && !isStrictMet) {
    if (showFlow) {
      return <StrictVerificationFlow onComplete={() => setShowFlow(false)} onDismiss={() => setShowFlow(false)} />;
    }
    return (
      <div className="flex flex-col gap-3 p-4 rounded-xl" style={{ background: 'var(--warning-bg)', border: '1px solid var(--warning-soft)' }}>
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} style={{ color: 'var(--warning)' }} />
          <span className="text-[14px]" style={{ fontWeight: 600, color: 'var(--warning-dark)' }}>
            Strict verification required
          </span>
        </div>
        <p className="text-[12px]" style={{ color: 'var(--warning-dark)' }}>
          This action requires Strict verification (ID + Selfie).
        </p>
        <Btn variant="primary" onClick={() => setShowFlow(true)} icon={<ShieldCheck size={16} />}>Start Verification</Btn>
      </div>
    );
  }

  return <>{children}</>;
}
