import React from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { PetCard } from '../../components/pettodo/Cards';
import { Btn } from '../../components/pettodo/Buttons';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { LUNA } from '../../data/demoData';
import { PawPrint, QrCode, Syringe, BookOpen } from 'lucide-react';

export default function HOM_01() {
  const nav = useNavigate();
  const { setMode } = useApp();

  React.useEffect(() => { setMode('daily'); }, []);

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="HOM_01_Home_Daily_NoActiveCase" />
      <AppBar title="PETTODO" showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <h2 className="text-[20px] mb-0.5" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Good evening! 🐾</h2>
          <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Everything looks great with your pets today.</p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: <PawPrint size={20} />, label: 'My Pets', path: '/daily/pet-list' },
            { icon: <QrCode size={20} />, label: 'QR ID', path: '/qr/hub' },
            { icon: <Syringe size={20} />, label: 'Vaccines', path: '/daily/vaccines' },
            { icon: <BookOpen size={20} />, label: 'Learn', path: '/education/library' },
          ].map((a) => (
            <button
              key={a.label}
              onClick={() => nav(a.path)}
              className="flex flex-col items-center gap-1 py-3 rounded-xl"
              style={{ background: 'var(--green-bg)', color: 'var(--green-dark)', minHeight: 44 }}
            >
              {a.icon}
              <span className="text-[10px]" style={{ fontWeight: 600 }}>{a.label}</span>
            </button>
          ))}
        </div>

        {/* Pet */}
        <div>
          <h3 className="text-[15px] mb-2" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Your Pets</h3>
          <PetCard name={LUNA.name} breed={LUNA.breed} hasQR vaccineStatus="Up to date" onClick={() => nav('/daily/pet-profile')} />
        </div>

        {/* Upcoming */}
        <div className="p-3 rounded-xl" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
          <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>Upcoming reminder</p>
          <p className="text-[12px] mt-0.5" style={{ color: 'var(--green-dark)' }}>Distemper booster — Mar 20, 2026</p>
        </div>

        {/* Community */}
        <div>
          <h3 className="text-[15px] mb-2" style={{ fontWeight: 600, color: 'var(--gray-900)' }}></h3>
          <div className="flex gap-2">
            <Btn variant="secondary" onClick={() => nav('/communities/home')}>Communities</Btn>
            <Btn variant="secondary" onClick={() => nav('/events/list')}>Events</Btn>
            <Btn variant="secondary" onClick={() => nav('/playdates/home')}>Play Dates</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
