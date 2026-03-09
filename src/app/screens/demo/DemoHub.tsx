import React from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Btn } from '../../components/pettodo/Buttons';
import { toast } from 'sonner';
import {
  PawPrint, AlertTriangle, Cpu, Heart, RotateCcw, Play, Users,
} from 'lucide-react';

const SCENARIOS = [
  {
    label: 'Daily Care Demo',
    desc: 'Pet profiles, feeding, health, vaccines',
    icon: <Heart size={20} />,
    path: '/home-daily',
    color: 'var(--green-primary)',
    bg: 'var(--green-bg)',
  },
  {
    label: 'Lost Pet Emergency Demo',
    desc: 'Report lost, share flyer, sightings',
    icon: <AlertTriangle size={20} />,
    path: '/emg/entry',
    color: 'var(--red-primary)',
    bg: 'var(--red-bg)',
  },
  {
    label: 'AI Assisted Match Demo',
    desc: 'Smart matching, top 10, compare',
    icon: <Cpu size={20} />,
    path: '/emg/matching-top10',
    color: 'var(--info, #2563eb)',
    bg: 'var(--info-bg, #eff6ff)',
  },
  {
    label: 'Community + Safe Recovery',
    desc: 'Chat, verification, safe meetup',
    icon: <Users size={20} />,
    path: '/emg/chat',
    color: 'var(--green-dark, #166534)',
    bg: 'var(--green-soft, #dcfce7)',
  },
  {
    label: 'Community Dogs Demo',
    desc: 'Street dogs map, care logs, disputes',
    icon: <PawPrint size={20} />,
    path: '/community-dogs/map-list',
    color: 'var(--warning-dark, #92400e)',
    bg: 'var(--warning-bg, #fffbeb)',
  },
];

export default function DemoHub() {
  const nav = useNavigate();
  const { resetStore, setMode } = useApp();

  const handleReset = () => {
    resetStore();
    toast.success('Demo data reset to defaults.');
  };

  const handleScenario = (path: string) => {
    if (path.startsWith('/emg')) {
      setMode('emergency');
    } else {
      setMode('daily');
    }
    nav(path);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: 'var(--gray-50, #f9fafb)' }}>
      <div className="w-full max-w-sm flex flex-col gap-5">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Play size={22} style={{ color: 'var(--green-primary)' }} />
            <h1 className="text-[24px]" style={{ fontWeight: 800, color: 'var(--gray-900)' }}>PETTODO Demo</h1>
          </div>
          <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>
            Choose a scenario to start exploring
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {SCENARIOS.map(s => (
            <button
              key={s.label}
              onClick={() => handleScenario(s.path)}
              className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all"
              style={{ background: 'var(--white, #fff)', border: '1px solid var(--gray-200)' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: s.bg, color: s.color }}>
                {s.icon}
              </div>
              <div className="flex-1">
                <p className="text-[14px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{s.label}</p>
                <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>{s.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="border-t pt-4 mt-1" style={{ borderColor: 'var(--gray-200)' }}>
          <Btn variant="ghost" fullWidth icon={<RotateCcw size={16} />} onClick={handleReset}>
            Reset Demo Data
          </Btn>
        </div>

        <p className="text-[10px] text-center" style={{ color: 'var(--gray-400)' }}>
          Prototype — local data only, no backend
        </p>
      </div>
    </div>
  );
}
