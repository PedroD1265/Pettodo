import React, { useState } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Stepper } from '../../components/pettodo/Stepper';
import { Btn } from '../../components/pettodo/Buttons';
import { Banner } from '../../components/pettodo/Banners';
import { DirectionCompass } from '../../components/pettodo/MapComponents';
import { useNavigate, useLocation } from 'react-router';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner';

export default function EMG_05() {
  const nav = useNavigate();
  const location = useLocation();
  const prefilled = location.state?.prefilled as boolean | undefined;
  const petName = location.state?.petName as string | undefined;
  const sourcePetId = location.state?.petId as string | undefined;

  const { createCase, setHasActiveCase } = useApp();

  const [direction, setDirection] = useState('SE');
  const [selectedSize, setSelectedSize] = useState<string>('Medium');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedTemperament, setSelectedTemperament] = useState<string[]>([]);
  const [marks, setMarks] = useState('');
  const [collar, setCollar] = useState('');
  const [publishing, setPublishing] = useState(false);

  const sizes = ['Small', 'Medium', 'Large'];
  const colors = ['Brown', 'White', 'Black', 'Golden', 'Gray', 'Spotted'];
  const temperaments = ['Friendly', 'Shy', 'Energetic', 'Calm', 'Anxious'];

  const toggleColor = (c: string) =>
    setSelectedColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const toggleTemperament = (t: string) =>
    setSelectedTemperament(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const traits = [marks, collar].filter(Boolean);
      const created = await createCase({
        type: 'lost',
        petId: sourcePetId ?? null,
        size: selectedSize,
        colors: selectedColors,
        traits: [...selectedTemperament, ...traits],
        direction,
        description: [
          selectedSize,
          selectedColors.length > 0 ? selectedColors.join(', ') : null,
          marks || null,
          collar || null,
          selectedTemperament.length > 0 ? selectedTemperament.join(', ') : null,
          direction ? `Last direction: ${direction}` : null,
        ].filter(Boolean).join(' · '),
      });
      setHasActiveCase(true);
      nav('/emg/lost-published', { state: { caseId: created.id, petName } });
    } catch (err: any) {
      console.error('[EMG_05] createCase failed:', err);
      toast.error(err?.message || 'Failed to publish report. Please try again.');
      setPublishing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_05_Lost_Panic_Traits" />
      <AppBar title="Report Lost Dog" showBack backTo="/emg/lost-time" />
      <Stepper steps={['Photos', 'Location', 'Time', 'Traits', 'Publish']} current={3} />
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
        {prefilled && petName && (
          <Banner type="prefilled" text={`Reporting ${petName} — fill in any additional details`} />
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
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className="flex-1 py-2 rounded-xl text-[13px]"
                style={{
                  background: s === selectedSize ? 'var(--red-primary)' : 'var(--gray-100)',
                  color: s === selectedSize ? 'var(--white)' : 'var(--gray-700)',
                  fontWeight: s === selectedSize ? 600 : 400,
                  minHeight: 44,
                }}
              >{s}</button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="text-[13px] mb-1.5 block" style={{ color: 'var(--gray-700)', fontWeight: 500 }}>Colors (select all that apply)</label>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => toggleColor(c)}
                className="px-3 py-1.5 rounded-full text-[12px]"
                style={{
                  background: selectedColors.includes(c) ? 'var(--red-primary)' : 'var(--gray-100)',
                  color: selectedColors.includes(c) ? 'var(--white)' : 'var(--gray-700)',
                  fontWeight: selectedColors.includes(c) ? 600 : 400,
                  minHeight: 44,
                }}
              >{c}</button>
            ))}
          </div>
        </div>

        {/* Distinguishing marks */}
        <div>
          <label className="text-[13px] mb-1 block" style={{ color: 'var(--gray-700)', fontWeight: 500 }}>Distinguishing marks</label>
          <textarea
            className="w-full px-3 py-2.5 rounded-xl text-[14px]"
            style={{ background: 'var(--gray-100)', minHeight: 48, resize: 'none' }}
            value={marks}
            onChange={e => setMarks(e.target.value)}
            placeholder="Describe any distinguishing marks..."
          />
        </div>

        {/* Collar */}
        <div>
          <label className="text-[13px] mb-1 block" style={{ color: 'var(--gray-700)', fontWeight: 500 }}>Collar description</label>
          <textarea
            className="w-full px-3 py-2.5 rounded-xl text-[14px]"
            style={{ background: 'var(--gray-100)', minHeight: 48, resize: 'none' }}
            value={collar}
            onChange={e => setCollar(e.target.value)}
            placeholder="Describe collar, tags, etc..."
          />
        </div>

        {/* Temperament */}
        <div>
          <label className="text-[13px] mb-1.5 block" style={{ color: 'var(--gray-700)', fontWeight: 500 }}>Temperament</label>
          <div className="flex flex-wrap gap-2">
            {temperaments.map((t) => (
              <button
                key={t}
                onClick={() => toggleTemperament(t)}
                className="px-3 py-1.5 rounded-full text-[12px]"
                style={{
                  background: selectedTemperament.includes(t) ? 'var(--red-primary)' : 'var(--gray-100)',
                  color: selectedTemperament.includes(t) ? 'var(--white)' : 'var(--gray-700)',
                  minHeight: 44,
                }}
              >{t}</button>
            ))}
          </div>
        </div>

        {/* Direction */}
        <DirectionCompass selected={direction} onSelect={setDirection} />

        <div className="mt-4 pb-4">
          <Btn
            variant="emergency"
            fullWidth
            onClick={handlePublish}
            disabled={publishing}
          >
            {publishing ? 'Publishing...' : 'Publish Report'}
          </Btn>
        </div>
      </div>
    </div>
  );
}
