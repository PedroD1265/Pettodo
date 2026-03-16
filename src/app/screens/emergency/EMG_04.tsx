import React, { useState } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Stepper } from '../../components/pettodo/Stepper';
import { Btn } from '../../components/pettodo/Buttons';
import { useNavigate, useLocation } from 'react-router';
import { Clock } from 'lucide-react';

export default function EMG_04() {
  const nav = useNavigate();
  const location = useLocation();
  // Preserve pet context from previous steps
  const petState = location.state as { petId?: string | null; petName?: string | null; prefilled?: boolean } | null;

  const [quickPick, setQuickPick] = useState<string | null>(null);
  const [dateValue, setDateValue] = useState(new Date().toISOString().slice(0, 10));
  const [timeValue, setTimeValue] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  );

  const quickOptions = [
    { label: 'About 1 hour ago', value: '1h' },
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
  ];

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_04_Lost_Panic_Time" />
      <AppBar title="Report Lost Dog" showBack backTo="/emg/lost-location" />
      <Stepper steps={['Photos', 'Location', 'Time', 'Traits', 'Publish']} current={2} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <h3 className="text-[17px] mb-1" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>When did it happen?</h3>
          <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Quick pick or enter exact time below.</p>
        </div>

        {/* Quick pick buttons */}
        <div className="flex flex-col gap-2">
          <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Quick pick</span>
          <div className="flex gap-2">
            {quickOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setQuickPick(opt.value)}
                className="flex-1 py-2.5 rounded-xl text-[13px]"
                style={{
                  background: quickPick === opt.value ? 'var(--red-primary)' : 'var(--gray-100)',
                  color: quickPick === opt.value ? 'var(--white)' : 'var(--gray-700)',
                  fontWeight: quickPick === opt.value ? 600 : 400,
                  minHeight: 44,
                  border: quickPick === opt.value ? '2px solid var(--red-dark)' : '2px solid transparent',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Or exact time */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: 'var(--gray-200)' }} />
          <span className="text-[12px]" style={{ color: 'var(--gray-400)' }}>or enter exact time</span>
          <div className="flex-1 h-px" style={{ background: 'var(--gray-200)' }} />
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-[13px] mb-1 block" style={{ color: 'var(--gray-700)', fontWeight: 500 }}>Date</label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }}>
              <Clock size={16} style={{ color: 'var(--gray-400)' }} />
              <input
                type="date"
                className="flex-1 bg-transparent text-[14px] outline-none"
                style={{ color: 'var(--gray-900)' }}
                value={dateValue}
                onChange={(e) => { setDateValue(e.target.value); setQuickPick(null); }}
              />
            </div>
          </div>
          <div>
            <label className="text-[13px] mb-1 block" style={{ color: 'var(--gray-700)', fontWeight: 500 }}>Approximate time</label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }}>
              <Clock size={16} style={{ color: 'var(--gray-400)' }} />
              <input
                type="time"
                className="flex-1 bg-transparent text-[14px] outline-none"
                style={{ color: 'var(--gray-900)' }}
                value={timeValue}
                onChange={(e) => { setTimeValue(e.target.value); setQuickPick(null); }}
              />
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>
            An approximate time helps searchers prioritize recent sightings. You can update this later.
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <Btn variant="emergency" fullWidth onClick={() => nav('/emg/lost-traits', { state: petState })}>
            Next: Traits (Recommended)
          </Btn>
          <Btn variant="ghost" fullWidth onClick={() => nav('/emg/lost-published', { state: petState })}>
            Skip — Publish now
          </Btn>
        </div>
      </div>
    </div>
  );
}
