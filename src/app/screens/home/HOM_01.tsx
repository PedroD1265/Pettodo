import React from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { PetCard } from '../../components/pettodo/Cards';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { LUNA } from '../../data/demoData';
import { PawPrint, QrCode, Syringe, BookOpen, Users, Calendar, Dog, Shield, Footprints, Scissors, Home, GraduationCap } from 'lucide-react';

export default function HOM_01() {
  const nav = useNavigate();
  const { setMode } = useApp();

  React.useEffect(() => { setMode('daily'); }, []);

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="HOM_01_Home_Daily_NoActiveCase" />
      <AppBar title="PETTODO" showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-4">

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
          <h3 className="text-[15px] mb-2" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Community</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: <Users size={18} />, label: 'Communities', path: '/communities/home', color: 'var(--info-bg)', accent: 'var(--info-dark)' },
              { icon: <Calendar size={18} />, label: 'Events', path: '/events/list', color: 'var(--green-bg)', accent: 'var(--green-dark)' },
              { icon: <Dog size={18} />, label: 'Play Dates', path: '/playdates/home', color: 'var(--warning-bg)', accent: 'var(--warning-dark)' },
              { icon: <Dog size={18} />, label: 'Street Dogs', path: '/community-dogs/map-list', color: 'var(--gray-100)', accent: 'var(--gray-700)' },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => nav(item.path)}
                className="flex flex-col items-center gap-1.5 py-3 rounded-xl"
                style={{ background: item.color, color: item.accent, minHeight: 44, border: '1px solid var(--gray-200)' }}
              >
                {item.icon}
                <span className="text-[10px]" style={{ fontWeight: 600 }}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-[15px] mb-2" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Services</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                icon: <Footprints size={16} style={{ color: 'var(--info)' }} />,
                bg: 'var(--info-bg)',
                label: 'Verified Walkers',
                sub: 'Strict verification',
                cat: 'walkers',
                badge: <Shield size={10} style={{ color: 'var(--info)' }} />,
              },
              {
                icon: <Scissors size={16} style={{ color: 'var(--green-primary)' }} />,
                bg: 'var(--green-bg)',
                label: 'Dog Grooming',
                sub: 'Bath & haircut',
                cat: 'grooming',
                badge: null,
              },
              {
                icon: <Home size={16} style={{ color: 'var(--warning)' }} />,
                bg: 'var(--warning-bg)',
                label: 'Dog Daycare',
                sub: 'Supervised play',
                cat: 'daycare',
                badge: null,
              },
              {
                icon: <GraduationCap size={16} style={{ color: 'var(--red-primary)' }} />,
                bg: 'var(--red-bg)',
                label: 'Training',
                sub: 'Positive reinforcement',
                cat: 'training',
                badge: null,
              },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => nav(`/walkers/marketplace?cat=${item.cat}`)}
                className="flex flex-col items-center gap-1.5 py-3.5 rounded-xl border"
                style={{ background: 'var(--white)', borderColor: 'var(--gray-200)' }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: item.bg }}>
                  {item.icon}
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{item.label}</span>
                    {item.badge}
                  </div>
                  <p className="text-[10px]" style={{ color: 'var(--gray-500)' }}>{item.sub}</p>
                </div>
              </button>
            ))}
          </div>
          <p className="text-[11px] mt-2 px-1" style={{ color: 'var(--gray-500)' }}>
            Higher-risk services may require stricter verification.
          </p>
        </div>

      </div>
    </div>
  );
}
