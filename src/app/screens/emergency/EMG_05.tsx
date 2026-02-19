import React, { useState } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Stepper } from '../../components/pettodo/Stepper';
import { Btn } from '../../components/pettodo/Buttons';
import { Banner } from '../../components/pettodo/Banners';
import { DirectionCompass } from '../../components/pettodo/MapComponents';
import { useNavigate, useLocation } from 'react-router';
import { LUNA } from '../../data/demoData';

export default function EMG_05() {
  const nav = useNavigate();
  const location = useLocation();
  const isPrefilled = location.state?.prefilled;
  const [direction, setDirection] = useState('SE');

  const sizes = ['Small', 'Medium', 'Large'];
  const colors = ['Brown', 'White', 'Black', 'Golden', 'Gray', 'Spotted'];
  const temperaments = ['Friendly', 'Shy', 'Energetic', 'Calm', 'Anxious'];

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_05_Lost_Panic_Traits" />
      <AppBar title="Report Lost Dog" showBack backTo="/emg/lost-time" />
      <Stepper steps={['Photos', 'Location', 'Time', 'Traits', 'Publish']} current={3} />
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
        {isPrefilled && (
          <Banner type="prefilled" text="Prefilled from Luna's profile" />
        )}

        <div>
          <h3 className="text-[17px] mb-0.5" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Dog traits</h3>
          <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Recommended — helps improve match accuracy</p>
        </div>

        {/* Size */}
        <div>
          <label className="text-[13px] mb-1.5 block" style={{ color: 'var(--gray-700)', fontWeight: 500 }}>Size</label>
          <div className="flex gap-2">
            {sizes.map((s) => (
              <button key={s} className="flex-1 py-2 rounded-xl text-[13px]" style={{
                background: s === LUNA.size ? 'var(--red-primary)' : 'var(--gray-100)',
                color: s === LUNA.size ? 'var(--white)' : 'var(--gray-700)',
                fontWeight: s === LUNA.size ? 600 : 400, minHeight: 44,
              }}>{s}</button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="text-[13px] mb-1.5 block" style={{ color: 'var(--gray-700)', fontWeight: 500 }}>Colors (select all)</label>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button key={c} className="px-3 py-1.5 rounded-full text-[12px]" style={{
                background: LUNA.colors.includes(c) ? 'var(--red-primary)' : 'var(--gray-100)',
                color: LUNA.colors.includes(c) ? 'var(--white)' : 'var(--gray-700)',
                fontWeight: LUNA.colors.includes(c) ? 600 : 400, minHeight: 44,
              }}>{c}</button>
            ))}
          </div>
        </div>

        {/* Distinguishing marks */}
        <div>
          <label className="text-[13px] mb-1 block" style={{ color: 'var(--gray-700)', fontWeight: 500 }}>Distinguishing marks</label>
          <div className="px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }}>
            <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>{LUNA.marks}</span>
          </div>
        </div>

        {/* Collar */}
        <div>
          <label className="text-[13px] mb-1 block" style={{ color: 'var(--gray-700)', fontWeight: 500 }}>Collar description</label>
          <div className="px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }}>
            <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>{LUNA.collar}</span>
          </div>
        </div>

        {/* Temperament */}
        <div>
          <label className="text-[13px] mb-1.5 block" style={{ color: 'var(--gray-700)', fontWeight: 500 }}>Temperament</label>
          <div className="flex flex-wrap gap-2">
            {temperaments.map((t) => (
              <button key={t} className="px-3 py-1.5 rounded-full text-[12px]" style={{
                background: LUNA.temperament.includes(t) ? 'var(--red-primary)' : 'var(--gray-100)',
                color: LUNA.temperament.includes(t) ? 'var(--white)' : 'var(--gray-700)',
                minHeight: 44,
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Direction */}
        <DirectionCompass selected={direction} onSelect={setDirection} />

        <div className="mt-4 pb-4">
          <Btn variant="emergency" fullWidth onClick={() => nav('/emg/lost-published')}>
            Publish Report
          </Btn>
        </div>
      </div>
    </div>
  );
}
