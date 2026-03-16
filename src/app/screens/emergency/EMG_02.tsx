import React, { useState } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Banner } from '../../components/pettodo/Banners';
import { Stepper } from '../../components/pettodo/Stepper';
import { Btn } from '../../components/pettodo/Buttons';
import { PhotoUploadGrid } from '../../components/pettodo/PhotoQuality';
import { useNavigate, useLocation } from 'react-router';

export default function EMG_02() {
  const nav = useNavigate();
  const location = useLocation();
  // Preserve pet context from EMG_SELECT_PET throughout the Lost flow
  const petState = location.state as { petId?: string | null; petName?: string | null; prefilled?: boolean } | null;

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const hasPhotos = selectedFiles.length > 0;

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_02_Lost_Panic_Photos" />
      <AppBar title="Report Lost Dog" showBack backTo="/emg/lost-select-pet" />
      <Banner type="calm" text="Stay calm — we'll guide you step by step" />
      <Stepper steps={['Photos', 'Location', 'Time', 'Traits', 'Publish']} current={0} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <h3 className="text-[17px] mb-1" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Add photos of your dog</h3>
          <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Clear, well-lit photos help find your dog faster. Tap slots to add.</p>
          <p className="text-[11px] mt-1" style={{ color: 'var(--red-primary)', fontWeight: 600 }}>
            No account needed to post — minimal fields only
          </p>
        </div>

        <PhotoUploadGrid onFilesChange={setSelectedFiles} />

        <div className="mt-auto flex flex-col gap-2">
          <Btn variant="emergency" fullWidth onClick={() => nav('/emg/lost-location', { state: petState })} disabled={!hasPhotos}>
            Next: Location
          </Btn>
          {!hasPhotos && (
            <p className="text-[11px] text-center" style={{ color: 'var(--red-primary)' }}>
              Add at least 1 photo before continuing
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
