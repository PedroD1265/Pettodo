import React from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Btn } from '../../components/pettodo/Buttons';
import { useNavigate } from 'react-router';
import { Share2, Download, Image, FileText } from 'lucide-react';
import { LOST_CASE, LUNA } from '../../data/demoData';

export default function EMG_07() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_07_Lost_ShareKit_FlyerPNG_PDF" />
      <AppBar title="Share Kit" showBack backTo="/emg/lost-published" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Share Luna's flyer</h3>
        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Print or share digitally to reach more people.</p>

        {/* Flyer preview */}
        <div className="rounded-2xl overflow-hidden" style={{ border: '2px solid var(--red-soft)', boxShadow: 'var(--shadow-md)' }}>
          <div className="p-4" style={{ background: 'var(--red-primary)' }}>
            <p className="text-[20px] text-center" style={{ fontWeight: 700, color: 'var(--white)' }}>LOST DOG</p>
          </div>
          <div className="p-4 flex flex-col items-center gap-3" style={{ background: 'var(--white)' }}>
            <div className="w-32 h-32 rounded-xl flex items-center justify-center" style={{ background: 'var(--gray-100)' }}>
              <span className="text-5xl">🐕</span>
            </div>
            <p className="text-[18px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{LUNA.name}</p>
            <p className="text-[13px] text-center" style={{ color: 'var(--gray-700)' }}>{LUNA.breed} · {LUNA.description}</p>
            <p className="text-[13px] text-center" style={{ color: 'var(--red-dark)', fontWeight: 500 }}>
              Last seen: {LOST_CASE.location}<br />{LOST_CASE.time}
            </p>
            <div className="w-20 h-20 rounded-lg flex items-center justify-center" style={{ background: 'var(--gray-100)' }}>
              <span className="text-[10px]" style={{ color: 'var(--gray-400)' }}>QR Code</span>
            </div>
            <p className="text-[11px]" style={{ color: 'var(--gray-400)' }}>Scan to report a sighting</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Btn variant="secondary" className="flex-1" icon={<Image size={18} />}>PNG</Btn>
          <Btn variant="secondary" className="flex-1" icon={<FileText size={18} />}>PDF</Btn>
          <Btn variant="secondary" className="flex-1" icon={<Download size={18} />}>Download</Btn>
        </div>

        <Btn variant="emergency" fullWidth icon={<Share2 size={18} />}>
          Share Flyer
        </Btn>

        <div className="mt-auto pb-4">
          <Btn variant="primary" fullWidth onClick={() => nav('/emg/matching-top10')}>
            View Possible Matches
          </Btn>
        </div>
      </div>
    </div>
  );
}
