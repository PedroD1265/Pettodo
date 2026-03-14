import React from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate, useLocation } from 'react-router';
import { Home, PawPrint, QrCode, Users, User } from 'lucide-react';

const tabs = [
  { icon: Home, label: 'Home', dailyPath: '/home-daily', emgPath: '/home-emergency' },
  { icon: PawPrint, label: 'Pets', dailyPath: '/daily/pet-list', emgPath: '/daily/pet-list' },
  { icon: QrCode, label: 'QR', dailyPath: '/qr/hub', emgPath: '/qr/hub' },
  { icon: Users, label: 'Community', dailyPath: '/communities/home', emgPath: '/communities/home' },
  { icon: User, label: 'Profile', dailyPath: '/profile/user', emgPath: '/profile/user' },
];

export function BottomNav() {
  const { mode, hasActiveCase } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const isEmg = mode === 'emergency';

  return (
    <div
      className="flex items-stretch border-t"
      style={{ background: 'var(--white)', borderColor: 'var(--gray-200)', minHeight: 56 }}
    >
      {tabs.map((tab) => {
        const path = isEmg ? tab.emgPath : tab.dailyPath;
        const active = location.pathname.startsWith(path) ||
          (tab.label === 'Home' && (location.pathname === '/home-daily' || location.pathname === '/home-emergency'));
        const Icon = tab.icon;
        return (
          <button
            key={tab.label}
            onClick={() => navigate(path)}
            className="flex flex-col items-center justify-center flex-1 gap-0.5 relative"
            style={{
              minHeight: 56,
              minWidth: 44,
              color: active ? 'var(--brand-primary)' : 'var(--gray-400)',
            }}
          >
            <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
            <span className="text-[10px]" style={{ fontWeight: active ? 600 : 400 }}>{tab.label}</span>
            {tab.label === 'Home' && hasActiveCase && isEmg && (
              <span className="absolute top-2 right-1/4 w-2 h-2 rounded-full" style={{ background: 'var(--red-primary)' }} />
            )}
          </button>
        );
      })}
    </div>
  );
}
