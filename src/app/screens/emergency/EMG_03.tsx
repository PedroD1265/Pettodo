import React from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Stepper } from '../../components/pettodo/Stepper';
import { MapPlaceholder } from '../../components/pettodo/MapComponents';
import { Btn } from '../../components/pettodo/Buttons';
import { Banner } from '../../components/pettodo/Banners';
import { useNavigate } from 'react-router';
import { MapPin } from 'lucide-react';

export default function EMG_03() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_03_Lost_Panic_Location" />
      <AppBar title="Report Lost Dog" showBack backTo="/emg/lost-photos" />
      <Stepper steps={['Photos', 'Location', 'Time', 'Traits', 'Publish']} current={1} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <h3 className="text-[17px] mb-1" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Where was your dog last seen?</h3>
          <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Tap the map or use your current location.</p>
        </div>

        <MapPlaceholder height={200} />

        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <MapPin size={16} style={{ color: 'var(--red-primary)' }} />
          <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>Central Park, near Bethesda Fountain</span>
        </div>

        <Banner type="privacy" text="Your exact location is protected" />

        <div className="mt-auto">
          <Btn variant="emergency" fullWidth onClick={() => nav('/emg/lost-time')}>
            Next: Time
          </Btn>
        </div>
      </div>
    </div>
  );
}
