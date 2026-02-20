import React, { useState } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { VerificationBadge } from '../../components/pettodo/Badges';
import { RadiusSelector } from '../../components/pettodo/MapComponents';
import { OTPFlow, StrictVerificationFlow } from '../../components/pettodo/VerificationFlows';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Shield, Star, CheckCircle, AlertTriangle, Bell, Lock, MapPin, Eye, Phone, FileText, Clock, ShieldCheck } from 'lucide-react';

// PRF_01
export function PRF_01() {
  const nav = useNavigate();
  const { verificationLevel, strictStatus } = useApp();
  const badgeLevel = strictStatus === 'approved' ? 'strict' : verificationLevel === 'basic' ? 'sms' : 'sms';
  const showBadge = verificationLevel !== 'none' || strictStatus === 'approved';

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="PRF_01_UserProfile_BadgesActivityReputation" />
      <AppBar title="Profile" showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'var(--gray-100)' }}>
            <span className="text-3xl">👤</span>
          </div>
          <div>
            <h3 className="text-[20px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Alex Johnson</h3>
            {showBadge && <VerificationBadge level={badgeLevel} />}
            {!showBadge && (
              <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: 'var(--warning-bg)', color: 'var(--warning-dark)', fontWeight: 500 }}>
                Not verified
              </span>
            )}
            <p className="text-[12px] mt-1" style={{ color: 'var(--gray-500)' }}>Member since 2024</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
            <Star size={18} style={{ color: 'var(--warning)' }} className="mx-auto" />
            <span className="text-[16px] block mt-1" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>4.9</span>
            <span className="text-[10px]" style={{ color: 'var(--gray-500)' }}>Reputation</span>
          </div>
          <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
            <span className="text-[16px] block mt-1" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>2</span>
            <span className="text-[10px]" style={{ color: 'var(--gray-500)' }}>Pets</span>
          </div>
          <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
            <span className="text-[16px] block mt-1" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>5</span>
            <span className="text-[10px]" style={{ color: 'var(--gray-500)' }}>Cases helped</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {[
            { label: 'Verification Center', path: '/profile/verification', icon: <Shield size={18} /> },
            { label: 'Privacy Settings', path: '/profile/privacy', icon: <Lock size={18} /> },
            { label: 'Notifications', path: '/profile/notifications', icon: <Bell size={18} /> },
            { label: 'Safety Center', path: '/profile/safety', icon: <Eye size={18} /> },
          ].map((item) => (
            <button key={item.label} onClick={() => nav(item.path)} className="flex items-center gap-3 p-3 rounded-xl text-left" style={{ background: 'var(--gray-100)', minHeight: 48 }}>
              <span style={{ color: 'var(--gray-500)' }}>{item.icon}</span>
              <span className="text-[14px]" style={{ fontWeight: 500, color: 'var(--gray-900)' }}>{item.label}</span>
              <span className="ml-auto text-[14px]" style={{ color: 'var(--gray-400)' }}>→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// PRF_02
export function PRF_02() {
  const { verificationLevel, strictStatus } = useApp();
  const [showOTP, setShowOTP] = useState(false);
  const [showStrict, setShowStrict] = useState(false);

  const isBasicDone = verificationLevel === 'basic' || verificationLevel === 'strict' as string;
  const isStrictDone = strictStatus === 'approved';
  const isStrictPending = strictStatus === 'pending';
  const isStrictRejected = strictStatus === 'rejected';

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="PRF_02_VerificationCenter_L1_L2" />
      <AppBar title="Verification Center" showBack backTo="/profile/user" />
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Your verification level</h3>

        {/* Level 1 — SMS */}
        {isBasicDone ? (
          <div className="p-4 rounded-xl" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={20} style={{ color: 'var(--green-primary)' }} />
              <span className="text-[15px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>Level 1 — SMS Verified</span>
            </div>
            <p className="text-[12px]" style={{ color: 'var(--green-dark)' }}>Phone number confirmed via SMS.</p>
          </div>
        ) : showOTP ? (
          <div className="p-4 rounded-xl" style={{ background: 'var(--gray-100)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Phone size={18} style={{ color: 'var(--info)' }} />
              <span className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Level 1 — SMS Verification</span>
            </div>
            <OTPFlow onComplete={() => setShowOTP(false)} onDismiss={() => setShowOTP(false)} inline />
          </div>
        ) : (
          <div className="p-4 rounded-xl" style={{ background: 'var(--gray-100)', border: '1px solid var(--gray-200)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Phone size={20} style={{ color: 'var(--gray-400)' }} />
              <span className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Level 1 — SMS</span>
            </div>
            <p className="text-[12px] mb-3" style={{ color: 'var(--gray-500)' }}>Verify your phone to edit cases, enter chat, and more.</p>
            <Btn variant="primary" fullWidth onClick={() => setShowOTP(true)}>Verify Phone</Btn>
          </div>
        )}

        {/* Level 2 — Strict */}
        {isStrictDone ? (
          <div className="p-4 rounded-xl" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={20} style={{ color: 'var(--green-primary)' }} />
              <span className="text-[15px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>Level 2 — Strict Verified</span>
            </div>
            <p className="text-[12px]" style={{ color: 'var(--green-dark)' }}>ID + Selfie verification complete.</p>
          </div>
        ) : isStrictPending ? (
          <div className="p-4 rounded-xl" style={{ background: 'var(--info-bg)', border: '1px solid var(--info-soft)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Clock size={20} style={{ color: 'var(--info)' }} />
              <span className="text-[15px]" style={{ fontWeight: 600, color: 'var(--info-dark)' }}>Level 2 — Pending Review</span>
            </div>
            <p className="text-[12px]" style={{ color: 'var(--info-dark)' }}>Your ID and selfie are being reviewed. Usually under 24 hours.</p>
          </div>
        ) : isStrictRejected ? (
          <div className="p-4 rounded-xl" style={{ background: 'var(--red-bg)', border: '1px solid var(--red-soft)' }}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={20} style={{ color: 'var(--red-primary)' }} />
              <span className="text-[15px]" style={{ fontWeight: 600, color: 'var(--red-dark)' }}>Level 2 — Rejected</span>
            </div>
            <p className="text-[12px] mb-3" style={{ color: 'var(--red-dark)' }}>
              Reason: blurry photo or face mismatch. Please resubmit.
            </p>
            <Btn variant="primary" fullWidth onClick={() => setShowStrict(true)}>Resubmit Verification</Btn>
          </div>
        ) : showStrict ? (
          <StrictVerificationFlow onComplete={() => setShowStrict(false)} onDismiss={() => setShowStrict(false)} />
        ) : (
          <div className="p-4 rounded-xl" style={{ background: 'var(--gray-100)', border: '1px solid var(--gray-200)' }}>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={20} style={{ color: 'var(--gray-400)' }} />
              <span className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Level 2 — Strict (ID + Selfie)</span>
            </div>
            <p className="text-[12px] mb-3" style={{ color: 'var(--gray-500)' }}>
              Required for walkers, official organizers, and ownership disputes.
            </p>
            <Btn variant="primary" fullWidth onClick={() => setShowStrict(true)} icon={<ShieldCheck size={16} />}>Start Strict Verification</Btn>
          </div>
        )}

        <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <h4 className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Escalation triggers</h4>
          <p className="text-[12px] mt-1" style={{ color: 'var(--gray-500)' }}>
            Strict verification is required for: organizing events, walker onboarding, ownership disputes, and creating communities.
          </p>
          <p className="text-[12px] mt-1" style={{ color: 'var(--gray-500)' }}>
            This action requires Strict verification (ID + Selfie).
          </p>
        </div>
      </div>
    </div>
  );
}

// PRF_03
export function PRF_03() {
  const [radius, setRadius] = useState(300);
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="PRF_03_Privacy_RadiusAndContact" />
      <AppBar title="Privacy Settings" showBack backTo="/profile/user" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Privacy & Location</h3>

        <RadiusSelector value={radius} onChange={setRadius} />
        <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>
          Default: 300m. Your exact location is never shown. Only an approximate area is visible on the map.
        </p>

        <Banner type="privacy" text="Your exact location is protected" />
        <Banner type="info" text="Do not share your address" />

        <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <h4 className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Contact settings</h4>
          <div className="mt-2 flex flex-col gap-2">
            {[
              { label: 'Show phone on QR page', value: false },
              { label: 'Allow chat from case followers', value: true },
              { label: 'Show email to verified users', value: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-1">
                <span className="text-[13px]" style={{ color: 'var(--gray-700)' }}>{item.label}</span>
                <div className="w-12 h-7 rounded-full flex items-center px-0.5" style={{ background: item.value ? 'var(--green-primary)' : 'var(--gray-300)' }}>
                  <div className="w-6 h-6 rounded-full" style={{ background: 'var(--white)', marginLeft: item.value ? 18 : 0 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// PRF_04
export function PRF_04() {
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="PRF_04_Notifications_ByMode" />
      <AppBar title="Notifications" showBack backTo="/profile/user" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Notification preferences</h3>

        <div className="p-3 rounded-xl" style={{ background: 'var(--red-bg)', border: '1px solid var(--red-soft)' }}>
          <p className="text-[13px] mb-2" style={{ fontWeight: 600, color: 'var(--red-dark)' }}>Emergency notifications</p>
          {[
            { label: 'New sightings near me', value: true },
            { label: 'AI match found', value: true },
            { label: 'Case updates', value: true },
            { label: 'Chat messages', value: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-1.5">
              <span className="text-[13px]" style={{ color: 'var(--red-dark)' }}>{item.label}</span>
              <div className="w-12 h-7 rounded-full flex items-center px-0.5" style={{ background: item.value ? 'var(--red-primary)' : 'var(--gray-300)' }}>
                <div className="w-6 h-6 rounded-full" style={{ background: 'var(--white)', marginLeft: item.value ? 18 : 0 }} />
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
          <p className="text-[13px] mb-2" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>Daily notifications</p>
          {[
            { label: 'Vaccine reminders', value: true },
            { label: 'Feeding reminders', value: false },
            { label: 'Community posts', value: true },
            { label: 'Event updates', value: true },
            { label: 'Play date invitations', value: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-1.5">
              <span className="text-[13px]" style={{ color: 'var(--green-dark)' }}>{item.label}</span>
              <div className="w-12 h-7 rounded-full flex items-center px-0.5" style={{ background: item.value ? 'var(--green-primary)' : 'var(--gray-300)' }}>
                <div className="w-6 h-6 rounded-full" style={{ background: 'var(--white)', marginLeft: item.value ? 18 : 0 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// PRF_05
export function PRF_05() {
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="PRF_05_SafetyCenter_AntiscamProofSafePoints" />
      <AppBar title="Safety Center" showBack backTo="/profile/user" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Safety Center</h3>
        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>PETTODO prioritizes your safety at every step.</p>

        <div className="p-3 rounded-xl" style={{ background: 'var(--red-bg)', border: '1px solid var(--red-soft)' }}>
          <h4 className="text-[13px]" style={{ fontWeight: 600, color: 'var(--red-dark)' }}>Anti-scam protection</h4>
          <ul className="mt-1.5 flex flex-col gap-1">
            <li className="text-[12px]" style={{ color: 'var(--red-dark)' }}>• No upfront payments or deposits</li>
            <li className="text-[12px]" style={{ color: 'var(--red-dark)' }}>• Reward only after the handoff</li>
            <li className="text-[12px]" style={{ color: 'var(--red-dark)' }}>• PETTODO does not process payments</li>
            <li className="text-[12px]" style={{ color: 'var(--red-dark)' }}>• Do not share your address</li>
          </ul>
        </div>

        <div className="p-3 rounded-xl" style={{ background: 'var(--info-bg)', border: '1px solid var(--info-soft)' }}>
          <h4 className="text-[13px]" style={{ fontWeight: 600, color: 'var(--info-dark)' }}>Proof of life</h4>
          <p className="text-[12px] mt-1" style={{ color: 'var(--info-dark)' }}>
            Request proof of life before arranging any meeting. Only live captures are accepted.
          </p>
        </div>

        <div className="p-3 rounded-xl" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
          <h4 className="text-[13px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>Safe points</h4>
          <p className="text-[12px] mt-1" style={{ color: 'var(--green-dark)' }}>
            Handoff only at a safe point — trusted veterinary clinics and shelters.
          </p>
        </div>

        <div className="p-3 rounded-xl" style={{ background: 'var(--warning-bg)', border: '1px solid var(--warning-soft)' }}>
          <h4 className="text-[13px]" style={{ fontWeight: 600, color: 'var(--warning-dark)' }}>Report suspicious behavior</h4>
          <p className="text-[12px] mt-1" style={{ color: 'var(--warning-dark)' }}>
            Available in all chats, case details, and walker interactions. Reports are reviewed promptly.
          </p>
        </div>
      </div>
    </div>
  );
}
