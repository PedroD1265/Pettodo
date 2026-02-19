import React from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Banner } from '../../components/pettodo/Banners';
import { Stepper } from '../../components/pettodo/Stepper';
import { Btn } from '../../components/pettodo/Buttons';
import { PhotoQualityBadge } from '../../components/pettodo/Badges';
import { useNavigate } from 'react-router';
import { Camera, Plus } from 'lucide-react';

export default function EMG_02() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_02_Lost_Panic_Photos" />
      <AppBar title="Report Lost Dog" showBack backTo="/emg/entry" />
      <Banner type="calm" text="Stay calm — we'll guide you step by step" />
      <Stepper steps={['Photos', 'Location', 'Time', 'Traits', 'Publish']} current={0} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <h3 className="text-[17px] mb-1" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Add photos of your dog</h3>
          <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Clear, well-lit photos help find your dog faster.</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="aspect-square rounded-xl flex flex-col items-center justify-center gap-1" style={{ background: 'var(--gray-100)', border: '2px dashed var(--gray-300)' }}>
            <Camera size={24} style={{ color: 'var(--gray-400)' }} />
            <span className="text-[10px]" style={{ color: 'var(--gray-400)' }}>Main photo</span>
          </div>
          <div className="aspect-square rounded-xl flex items-center justify-center" style={{ background: 'var(--gray-100)', border: '2px dashed var(--gray-300)' }}>
            <Plus size={20} style={{ color: 'var(--gray-400)' }} />
          </div>
          <div className="aspect-square rounded-xl flex items-center justify-center" style={{ background: 'var(--gray-100)', border: '2px dashed var(--gray-300)' }}>
            <Plus size={20} style={{ color: 'var(--gray-400)' }} />
          </div>
        </div>

        <PhotoQualityBadge quality="ok" />

        <div className="p-3 rounded-xl" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
          <p className="text-[12px]" style={{ color: 'var(--info)', fontWeight: 500 }}>
            Better photos improve match accuracy
          </p>
        </div>

        <div className="mt-auto">
          <Btn variant="emergency" fullWidth onClick={() => nav('/emg/lost-location')}>
            Next: Location
          </Btn>
        </div>
      </div>
    </div>
  );
}
