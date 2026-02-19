import React from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { useNavigate } from 'react-router';
import { CheckCircle, Phone, Share2 } from 'lucide-react';
import { LOST_CASE } from '../../data/demoData';

export default function EMG_06() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_06_Lost_Published_SMSGate" />
      <AppBar title="Report Published" showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-4 items-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mt-4" style={{ background: 'var(--green-soft)' }}>
          <CheckCircle size={32} style={{ color: 'var(--green-primary)' }} />
        </div>

        <h2 className="text-[20px] text-center" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Report Published!</h2>
        <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>{LOST_CASE.headline}</p>

        <Banner type="info" text="To manage this case and receive notifications, verify your phone number." />

        <div className="w-full p-4 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <p className="text-[14px] mb-3" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Verify with SMS</p>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl mb-3" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', minHeight: 48 }}>
            <Phone size={16} style={{ color: 'var(--gray-400)' }} />
            <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>+1 (555) 987-6543</span>
          </div>
          <Btn variant="primary" fullWidth onClick={() => {}}>Send Verification Code</Btn>
        </div>

        <p className="text-[12px]" style={{ color: 'var(--gray-400)' }}>
          Your report is already live. SMS verification lets you manage updates and chat with finders.
        </p>

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
