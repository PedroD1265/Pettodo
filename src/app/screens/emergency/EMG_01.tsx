import React from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Btn } from '../../components/pettodo/Buttons';
import { useNavigate } from 'react-router';
import { AlertTriangle, Search, Eye } from 'lucide-react';

export default function EMG_01() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_01_Entry_3CTAs" />
      <AppBar title="Emergency" showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-6 justify-center">
        <div className="text-center">
          <h2 className="text-[22px] mb-2" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>What happened?</h2>
          <p className="text-[14px]" style={{ color: 'var(--gray-500)' }}>Choose the situation that best describes what you need.</p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => nav('/emg/lost-photos')}
            className="flex items-center gap-4 p-4 rounded-2xl text-left"
            style={{ background: 'var(--red-bg)', border: '2px solid var(--red-soft)', minHeight: 80 }}
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--red-primary)' }}>
              <AlertTriangle size={24} style={{ color: 'var(--white)' }} />
            </div>
            <div>
              <p className="text-[16px]" style={{ fontWeight: 700, color: 'var(--red-dark)' }}>I lost my dog</p>
              <p className="text-[12px] mt-0.5" style={{ color: 'var(--red-dark)' }}>Report and start searching immediately</p>
            </div>
          </button>

          <button
            onClick={() => nav('/emg/found-photos')}
            className="flex items-center gap-4 p-4 rounded-2xl text-left"
            style={{ background: 'var(--green-bg)', border: '2px solid var(--green-soft)', minHeight: 80 }}
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--green-primary)' }}>
              <Search size={24} style={{ color: 'var(--white)' }} />
            </div>
            <div>
              <p className="text-[16px]" style={{ fontWeight: 700, color: 'var(--green-dark)' }}>I found a dog</p>
              <p className="text-[12px] mt-0.5" style={{ color: 'var(--green-dark)' }}>Help reunite this dog with their owner</p>
            </div>
          </button>

          <button
            onClick={() => nav('/emg/sighted-report')}
            className="flex items-center gap-4 p-4 rounded-2xl text-left"
            style={{ background: '#FFFBEB', border: '2px solid #FDE68A', minHeight: 80 }}
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--warning)' }}>
              <Eye size={24} style={{ color: 'var(--white)' }} />
            </div>
            <div>
              <p className="text-[16px]" style={{ fontWeight: 700, color: 'var(--warning)' }}>I spotted a dog</p>
              <p className="text-[12px] mt-0.5" style={{ color: '#92400E' }}>Report a sighting to help an active search</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
