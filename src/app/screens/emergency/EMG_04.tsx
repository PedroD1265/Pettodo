import React from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Stepper } from '../../components/pettodo/Stepper';
import { Btn } from '../../components/pettodo/Buttons';
import { useNavigate } from 'react-router';
import { Clock } from 'lucide-react';

export default function EMG_04() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_04_Lost_Panic_Time" />
      <AppBar title="Report Lost Dog" showBack backTo="/emg/lost-location" />
      <Stepper steps={['Photos', 'Location', 'Time', 'Traits', 'Publish']} current={2} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <h3 className="text-[17px] mb-1" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>When did it happen?</h3>
          <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>When did you last see your dog?</p>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-[13px] mb-1 block" style={{ color: 'var(--gray-700)', fontWeight: 500 }}>Date</label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }}>
              <Clock size={16} style={{ color: 'var(--gray-400)' }} />
              <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>Today — February 19, 2026</span>
            </div>
          </div>
          <div>
            <label className="text-[13px] mb-1 block" style={{ color: 'var(--gray-700)', fontWeight: 500 }}>Approximate time</label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }}>
              <Clock size={16} style={{ color: 'var(--gray-400)' }} />
              <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>6:30 PM</span>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>
            An approximate time helps searchers prioritize recent sightings. You can update this later.
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <Btn variant="emergency" fullWidth onClick={() => nav('/emg/lost-traits')}>
            Next: Traits (Recommended)
          </Btn>
          <Btn variant="ghost" fullWidth onClick={() => nav('/emg/lost-published')}>
            Skip — Publish now
          </Btn>
        </div>
      </div>
    </div>
  );
}
