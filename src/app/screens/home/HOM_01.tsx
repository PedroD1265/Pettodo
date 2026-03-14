import React, { useMemo } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { PetCard } from '../../components/pettodo/Cards';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { LUNA } from '../../data/demoData';
import { Users, Calendar, Dog, Shield, Footprints, Scissors, Home, GraduationCap, Utensils, CalendarCheck } from 'lucide-react';

function getNextFeedingTime(reminders: { timeHHMM: string; enabled: boolean }[]): string | null {
  const enabled = reminders.filter(r => r.enabled).sort((a, b) => a.timeHHMM.localeCompare(b.timeHHMM));
  if (enabled.length === 0) return null;
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  for (const r of enabled) {
    const [h, m] = r.timeHHMM.split(':').map(Number);
    if (h * 60 + m > nowMins) return r.timeHHMM;
  }
  return enabled[0].timeHHMM + ' (tomorrow)';
}

export default function HOM_01() {
  const nav = useNavigate();
  const { setMode, store } = useApp();

  const petReminders = store.feedingReminders.filter(r => r.petId === 'pet-luna-001');
  const nextFeeding = useMemo(() => getNextFeedingTime(petReminders), [petReminders]);

  React.useEffect(() => { setMode('daily'); }, []);

  return (
    <div className="flex flex-col min-h-full" style={{ background: 'var(--gray-50, #F9FAFB)' }}>
      <ScreenLabel name="HOM_01_Home_Daily_NoActiveCase" />
      <AppBar showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-4">

        <div>
          <h3 className="text-[15px] mb-2" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Your Pets</h3>
          <PetCard name={LUNA.name} breed={LUNA.breed} hasQR vaccineStatus="Up to date" onClick={() => nav('/daily/pet-profile')} />
        </div>

        <div className="p-3 rounded-xl flex items-center gap-3" style={{ background: 'var(--brand-secondary-bg)', border: '1px solid var(--brand-secondary-soft)' }}>
          <CalendarCheck size={18} style={{ color: 'var(--brand-secondary-dark)' }} />
          <div>
            <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--brand-secondary-dark)' }}>Upcoming reminder</p>
            <p className="text-[12px] mt-0.5" style={{ color: 'var(--brand-secondary-dark)' }}>Distemper booster — Mar 20, 2026</p>
          </div>
        </div>

        {nextFeeding && (
          <button onClick={() => nav('/daily/pet-profile?expandFeeding=1')} className="w-full p-3 rounded-xl text-left flex items-center gap-3" style={{ background: 'var(--brand-primary-bg)', border: '1px solid var(--brand-primary-soft)' }}>
            <Utensils size={18} style={{ color: 'var(--brand-primary)' }} />
            <div>
              <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--brand-primary-dark)' }}>Next feeding</p>
              <p className="text-[12px]" style={{ color: 'var(--brand-primary)' }}>{nextFeeding}</p>
            </div>
          </button>
        )}

        <div>
          <h3 className="text-[15px] mb-2" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Community</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: <Users size={18} />, label: 'Communities', path: '/communities/home', color: 'var(--brand-primary-bg)', accent: 'var(--brand-primary-dark)' },
              { icon: <Calendar size={18} />, label: 'Events', path: '/events/list', color: 'var(--brand-secondary-bg)', accent: 'var(--brand-secondary-dark)' },
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

        <div>
          <h3 className="text-[15px] mb-2" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Services</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                icon: <Footprints size={16} style={{ color: 'var(--brand-primary)' }} />,
                bg: 'var(--brand-primary-bg)',
                label: 'Verified Walkers',
                sub: 'Strict verification',
                cat: 'walkers',
                badge: <Shield size={10} style={{ color: 'var(--brand-primary)' }} />,
              },
              {
                icon: <Scissors size={16} style={{ color: 'var(--brand-secondary-dark)' }} />,
                bg: 'var(--brand-secondary-bg)',
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
                icon: <GraduationCap size={16} style={{ color: 'var(--brand-primary)' }} />,
                bg: 'var(--brand-primary-bg)',
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
