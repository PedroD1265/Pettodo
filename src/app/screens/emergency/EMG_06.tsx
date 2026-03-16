import React, { useEffect } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { VerificationGate } from '../../components/pettodo/VerificationFlows';
import { useNavigate, useLocation } from 'react-router';
import { CheckCircle, Share2, Edit, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function EMG_06() {
  const nav = useNavigate();
  const location = useLocation();
  const caseId = location.state?.caseId as string | undefined;
  const { caseClaimed, setCaseClaimed, verificationLevel, setHasActiveCase } = useApp();
  const isVerified = verificationLevel === 'basic' || verificationLevel === 'strict' as string;

  // Sync verification status to claim status
  useEffect(() => {
    if (isVerified && !caseClaimed) {
      setCaseClaimed(true);
      setHasActiveCase(true);
    }
  }, [isVerified, caseClaimed, setCaseClaimed, setHasActiveCase]);

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_06_Lost_Published_SMSGate" />
      <AppBar title="Report Published" showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-4 items-center overflow-y-auto">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mt-2" style={{ background: 'var(--green-soft)' }}>
          <CheckCircle size={32} style={{ color: 'var(--green-primary)' }} />
        </div>

        <h2 className="text-[20px] text-center" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Report Published!</h2>
        <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>Your lost dog report is now live and the community will be alerted.</p>

        {caseId && (
          <div className="px-3 py-2 rounded-xl text-center" style={{ background: 'var(--gray-100)' }}>
            <p className="text-[11px]" style={{ color: 'var(--gray-500)' }}>Case ID</p>
            <p className="text-[12px] font-mono" style={{ color: 'var(--gray-700)', fontWeight: 600 }}>{caseId}</p>
          </div>
        )}

        <Banner type="success" text="Your report is live. No account was needed to post." />

        {/* Claim Gate Info */}
        {!isVerified && (
          <div className="flex flex-col gap-1 items-center mb-2">
            <h3 className="text-[16px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Your report is live.</h3>
            <p className="text-[14px] text-center" style={{ color: 'var(--gray-700)' }}>
              Verify your phone to edit, chat, and coordinate a safe handoff.
            </p>
          </div>
        )}

        {/* Management Actions (Gated) */}
        <div className="w-full">
          <VerificationGate requiredLevel="basic" actionLabel="Managing your case">
            <div className="flex flex-col gap-3 w-full">
              <div className="p-3 rounded-xl flex items-center gap-2 mb-2" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
                <CheckCircle size={16} style={{ color: 'var(--green-primary)' }} />
                <div>
                  <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>Case claimed</p>
                  <p className="text-[11px]" style={{ color: 'var(--green-dark)' }}>You can now edit, chat, and manage this case.</p>
                </div>
              </div>
              
              <Btn variant="primary" fullWidth onClick={() => nav('/emg/case-detail-lost')} icon={<Edit size={18} />}>
                Edit Case
              </Btn>
              <Btn variant="daily" fullWidth onClick={() => nav('/emg/chat')} icon={<MessageCircle size={18} />}>
                Open Chat
              </Btn>
            </div>
          </VerificationGate>
        </div>

        <div className="w-full h-[1px] my-2" style={{ background: 'var(--gray-200)' }} />

        <div className="w-full flex flex-col gap-2 mt-auto pb-4">
          <Btn variant="emergency" fullWidth onClick={() => nav('/emg/share-flyer')} icon={<Share2 size={18} />}>
            Create and Share Flyer
          </Btn>
          <Btn variant="ghost" fullWidth onClick={() => nav('/emg/matching-top10')}>
            View Possible Matches
          </Btn>
        </div>
      </div>
    </div>
  );
}
