import React, { useState } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { LUNA } from '../../data/demoData';
import { Shield, MapPin, Camera, CheckCircle, AlertTriangle, Eye, Lock } from 'lucide-react';

// QRP_01 — Public shell, no app chrome
export function QRP_01() {
  const nav = useNavigate();
  const { contactRevealed } = useApp();
  return (
    <div className="flex flex-col min-h-full" style={{ background: 'var(--white)' }}>
      <ScreenLabel name="QRP_01_QRPublic_LandingPetCard" />
      {/* Public header */}
      <div className="px-4 py-3 text-center" style={{ background: 'var(--green-bg)' }}>
        <p className="text-[11px]" style={{ color: 'var(--green-dark)', fontWeight: 500 }}>PETTODO — Pet Identity</p>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-4 items-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'var(--green-soft)' }}>
          <span className="text-5xl">🐕</span>
        </div>

        <h2 className="text-[22px] text-center" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{LUNA.name}</h2>
        <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>{LUNA.breed}</p>

        <div className="w-full p-4 rounded-xl" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
          <p className="text-[15px] text-center" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>
            This dog has an owner. Help them get home.
          </p>
        </div>

        <div className="w-full p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Description</span>
              <span className="text-[13px]" style={{ fontWeight: 500, color: 'var(--gray-900)' }}>{LUNA.description}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Microchip</span>
              <span className="text-[13px]" style={{ fontWeight: 500, color: 'var(--gray-900)' }}>Yes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Vaccines</span>
              <span className="text-[13px]" style={{ fontWeight: 500, color: 'var(--green-primary)' }}>Up to date</span>
            </div>
          </div>
        </div>

        {contactRevealed && (
          <div className="w-full p-3 rounded-xl" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
            <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>Owner contact revealed</p>
            <p className="text-[14px] mt-1" style={{ color: 'var(--green-dark)' }}>📞 +1 (555) 987-6543</p>
            <p className="text-[12px] mt-0.5" style={{ color: 'var(--green-dark)' }}>Alex J.</p>
          </div>
        )}

        <div className="w-full flex flex-col gap-2">
          {!contactRevealed && (
            <Btn variant="primary" fullWidth onClick={() => nav('/public/qr-captcha')}>
              <Eye size={16} /> Show Owner Contact
            </Btn>
          )}
          <Btn variant="secondary" fullWidth onClick={() => nav('/public/qr-report')}>
            <MapPin size={16} /> I found/spotted this dog
          </Btn>
        </div>

        <p className="text-[11px] text-center" style={{ color: 'var(--gray-400)' }}>
          Powered by PETTODO · Privacy protected
        </p>
      </div>
    </div>
  );
}

// QRP_02
export function QRP_02() {
  const nav = useNavigate();
  const { setContactRevealed } = useApp();
  const [step, setStep] = useState<'captcha' | 'countdown' | 'rateLimit'>('captcha');

  const handleVerify = () => {
    setStep('countdown');
    setTimeout(() => {
      setContactRevealed(true);
      nav('/public/qr-landing');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-full" style={{ background: 'var(--white)' }}>
      <ScreenLabel name="QRP_02_QRPublic_ShowContact_Captcha" />
      <div className="px-4 py-3 text-center" style={{ background: 'var(--green-bg)' }}>
        <p className="text-[11px]" style={{ color: 'var(--green-dark)', fontWeight: 500 }}>PETTODO — Verify You're Human</p>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-4 items-center justify-center">
        {step === 'captcha' && (
          <>
            <Lock size={40} style={{ color: 'var(--info)' }} />
            <h3 className="text-[17px] text-center" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Verify you're human</h3>
            <p className="text-[13px] text-center" style={{ color: 'var(--gray-500)' }}>
              Complete the captcha to see the owner's contact information.
            </p>

            {/* Simulated captcha */}
            <div className="w-full p-4 rounded-xl" style={{ background: 'var(--gray-100)', border: '1px solid var(--gray-200)' }}>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded border-2 flex items-center justify-center" style={{ borderColor: 'var(--gray-300)' }}>
                  <CheckCircle size={16} style={{ color: 'var(--green-primary)' }} />
                </div>
                <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>I'm not a robot</span>
              </div>
            </div>

            <Btn variant="primary" fullWidth onClick={handleVerify}>Verify</Btn>

            {/* Rate limit toggle for demo */}
            <button
              onClick={() => setStep('rateLimit')}
              className="text-[12px] mt-2"
              style={{ color: 'var(--gray-400)', minHeight: 44 }}
            >
              (Demo: Show rate-limit exceeded state)
            </button>
          </>
        )}

        {step === 'countdown' && (
          <>
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--green-soft)' }}>
              <CheckCircle size={32} style={{ color: 'var(--green-primary)' }} />
            </div>
            <h3 className="text-[17px] text-center" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Verified!</h3>
            <p className="text-[13px] text-center" style={{ color: 'var(--gray-500)' }}>
              Revealing contact information...
            </p>
            <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--green-primary)', borderTopColor: 'transparent' }} />
          </>
        )}

        {step === 'rateLimit' && (
          <>
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--red-bg)' }}>
              <AlertTriangle size={32} style={{ color: 'var(--red-primary)' }} />
            </div>
            <h3 className="text-[17px] text-center" style={{ fontWeight: 600, color: 'var(--red-dark)' }}>Rate limit exceeded</h3>
            <p className="text-[14px] text-center" style={{ color: 'var(--red-dark)' }}>
              Too many attempts. Try again in 60 minutes.
            </p>
            <div className="text-[24px]" style={{ fontWeight: 700, color: 'var(--red-primary)', fontFamily: 'monospace' }}>
              59:42
            </div>
            <Btn variant="ghost" fullWidth onClick={() => setStep('captcha')}>
              (Demo: Reset)
            </Btn>
          </>
        )}
      </div>
    </div>
  );
}

// QRP_03
export function QRP_03() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full" style={{ background: 'var(--white)' }}>
      <ScreenLabel name="QRP_03_QRPublic_ReportSeenOrFound" />
      <div className="px-4 py-3 text-center" style={{ background: 'var(--green-bg)' }}>
        <p className="text-[11px]" style={{ color: 'var(--green-dark)', fontWeight: 500 }}>PETTODO — Report Sighting</p>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-4">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Help {LUNA.name} get home</h3>
        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Thank you for scanning the QR code. Please tell us what you saw.</p>

        <div className="flex flex-col gap-3">
          <button className="flex items-start gap-3 p-4 rounded-xl text-left" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)', minHeight: 64 }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--green-primary)' }}>
              <CheckCircle size={20} style={{ color: 'var(--white)' }} />
            </div>
            <div>
              <p className="text-[14px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>I have this dog</p>
              <p className="text-[12px]" style={{ color: 'var(--green-dark)' }}>The dog is with me and safe.</p>
            </div>
          </button>

          <button className="flex items-start gap-3 p-4 rounded-xl text-left" style={{ background: '#FFFBEB', border: '1px solid #FDE68A', minHeight: 64 }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--warning)' }}>
              <Eye size={20} style={{ color: 'var(--white)' }} />
            </div>
            <div>
              <p className="text-[14px]" style={{ fontWeight: 600, color: 'var(--warning)' }}>I spotted this dog</p>
              <p className="text-[12px]" style={{ color: '#92400E' }}>I saw this dog nearby but didn't take it.</p>
            </div>
          </button>
        </div>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Where? (optional)</label>
          <input className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }} placeholder="Location or address" />
        </div>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Photo (optional)</label>
          <div className="h-20 rounded-xl flex items-center justify-center" style={{ background: 'var(--gray-100)', border: '2px dashed var(--gray-300)' }}>
            <Camera size={20} style={{ color: 'var(--gray-400)' }} />
          </div>
        </div>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Your phone (to be contacted)</label>
          <input className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }} placeholder="+1 (555) ..." />
        </div>

        <Btn variant="primary" fullWidth onClick={() => nav('/public/qr-landing')}>Submit Report</Btn>

        <p className="text-[11px] text-center" style={{ color: 'var(--gray-400)' }}>
          Powered by PETTODO · Approximate area only — exact address is hidden.
        </p>
      </div>
    </div>
  );
}
