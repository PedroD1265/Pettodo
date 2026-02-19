import React from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { useNavigate } from 'react-router';

const modules = [
  { name: 'Home (Bipolar)', paths: ['/home-daily', '/home-emergency'], color: 'var(--gray-900)' },
  { name: 'Emergency Search', paths: ['/emg/entry'], color: 'var(--red-primary)' },
  { name: 'QR Identification', paths: ['/qr/hub'], color: 'var(--info)' },
  { name: 'Daily Pet Manager', paths: ['/daily/home'], color: 'var(--green-primary)' },
  { name: 'Education', paths: ['/education/library'], color: 'var(--green-dark)' },
  { name: 'Communities', paths: ['/communities/home'], color: '#8B5CF6' },
  { name: 'Events', paths: ['/events/list'], color: '#EC4899' },
  { name: 'Community Dogs', paths: ['/community-dogs/map-list'], color: '#F97316' },
  { name: 'Walkers', paths: ['/walkers/marketplace'], color: '#0EA5E9' },
  { name: 'Play Dates', paths: ['/playdates/home'], color: '#14B8A6' },
  { name: 'Profile', paths: ['/profile/user'], color: 'var(--gray-700)' },
  { name: 'Public QR', paths: ['/public/qr-landing'], color: '#6366F1' },
];

export default function SMP_01() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full" style={{ background: 'var(--white)' }}>
      <ScreenLabel name="SMP_01_FlowMapGeneral" />
      <div className="p-4">
        <h2 className="text-[20px] mb-1" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>PETTODO Flow Map</h2>
        <p className="text-[13px] mb-4" style={{ color: 'var(--gray-500)' }}>Tap any module to navigate. All modules connect through the bipolar Home screen.</p>
        <div className="flex flex-col gap-2">
          {modules.map((m) => (
            <button
              key={m.name}
              onClick={() => nav(m.paths[0])}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-left"
              style={{ background: 'var(--gray-100)', minHeight: 48 }}
            >
              <div className="w-3 h-3 rounded-full shrink-0" style={{ background: m.color }} />
              <span className="text-[14px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{m.name}</span>
              <span className="ml-auto text-[12px]" style={{ color: 'var(--gray-400)' }}>→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
