import React from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate, useLocation } from 'react-router';
import { Home, Search, QrCode, Users, User, MapPin, PawPrint, BookOpen, CalendarDays } from 'lucide-react';

const emergencyTabs = [
  { icon: Home, label: 'Home', path: '/home-emergency' },
  { icon: Search, label: 'Search', path: '/emg/entry' },
  { icon: MapPin, label: 'Map', path: '/emg/map-layers' },
  { icon: Users, label: 'Community', path: '/communities/home' },
  { icon: User, label: 'Profile', path: '/profile/user' },
];

const dailyTabs = [
  { icon: Home, label: 'Home', path: '/home-daily' },
  { icon: PawPrint, label: 'Pets', path: '/daily/pet-list' },
  { icon: QrCode, label: 'QR', path: '/qr/hub' },
  { icon: BookOpen, label: 'Learn', path: '/education/library' },
  { icon: User, label: 'Profile', path: '/profile/user' },
];

export function BottomNav() {
  const { mode, hasActiveCase } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const isEmg = mode === 'emergency';
  const tabs = isEmg ? emergencyTabs : dailyTabs;
  const accent = isEmg ? 'var(--red-primary)' : 'var(--green-primary)';

  return (
    <div
      className="flex items-stretch border-t"
      style={{ background: 'var(--white)', borderColor: 'var(--gray-200)', minHeight: 56 }}
    >
      {tabs.map((tab) => {
        const active = location.pathname.startsWith(tab.path);
        const Icon = tab.icon;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center justify-center flex-1 gap-0.5 relative"
            style={{ minHeight: 56, minWidth: 44, color: active ? accent : 'var(--gray-400)' }}
          >
            <Icon size={22} />
            <span className="text-[10px]">{tab.label}</span>
            {tab.label === 'Search' && hasActiveCase && isEmg && (
              <span className="absolute top-2 right-1/4 w-2 h-2 rounded-full" style={{ background: 'var(--red-primary)' }} />
            )}
          </button>
        );
      })}
    </div>
  );
}
