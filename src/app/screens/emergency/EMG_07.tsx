import React from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Btn } from '../../components/pettodo/Buttons';
import { FlyerPreview, ShareKitActions } from '../../components/pettodo/FlyerShareKit';
import { useNavigate } from 'react-router';

export default function EMG_07() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_07_Lost_ShareKit_FlyerPNG_PDF" />
      <AppBar title="Share Kit" showBack backTo="/emg/lost-published" />
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
        <div>
          <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Share Luna's flyer</h3>
          <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Print or share digitally to reach more people.</p>
        </div>

        {/* Flyer preview */}
        <FlyerPreview type="lost" />

        {/* Share Kit actions */}
        <ShareKitActions />

        <div className="mt-auto pb-4 flex flex-col gap-3">
          <Btn variant="primary" fullWidth onClick={() => nav('/emg/matching-top10')}>
            View Possible Matches
          </Btn>
          <button 
            onClick={() => nav('/emg/lost-published')}
            className="text-[13px] font-medium text-center py-2" 
            style={{ color: 'var(--gray-500)' }}
          >
            Back to Report Published
          </button>
        </div>
      </div>
    </div>
  );
}
