import React from 'react';
import { useApp } from '../../context/AppContext';
import { ModeSwitch } from './ModeSwitch';
import { ChevronLeft, Bell } from 'lucide-react';
import { useNavigate } from 'react-router';
import { appConfig } from '../../config/appConfig';

interface AppBarProps {
  title?: string;
  showBack?: boolean;
  showBell?: boolean;
  backTo?: string;
}

export function AppBar({ title, showBack = false, showBell = true, backTo }: AppBarProps) {
  const { mode, store, markNotificationRead } = useApp();
  const navigate = useNavigate();
  const isEmg = mode === 'emergency';
  const bg = isEmg ? 'var(--red-bg)' : 'var(--green-bg)';
  const accent = isEmg ? 'var(--red-primary)' : 'var(--green-primary)';

  const unreadCount = (store.notifications ?? []).filter(n => !n.read).length;

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      if (window.history.state && window.history.state.idx === 0) {
        navigate(mode === 'emergency' ? '/home-emergency' : '/home-daily');
      } else {
        navigate(-1);
      }
    }
  };

  const handleBell = () => {
    navigate('/home-notifications');
  };

  const isDemo = appConfig.mode === 'demo';

  return (
    <div className="flex flex-col" style={{ background: bg }}>
      <div className="flex items-center justify-center pt-2 pb-1">
        <ModeSwitch />
      </div>
      <div className="flex items-center px-4 pb-2" style={{ minHeight: 44 }}>
        {showBack && (
          <button
            onClick={handleBack}
            className="flex items-center justify-center mr-2"
            style={{ minWidth: 44, minHeight: 44, color: accent }}
          >
            <ChevronLeft size={24} />
          </button>
        )}
        {title && (
          <span className="flex-1 text-[17px] truncate" style={{ color: 'var(--gray-900)', fontWeight: 600 }}>
            {title}
          </span>
        )}
        <span
          className="ml-2 px-1.5 py-0.5 rounded text-[9px] shrink-0"
          style={{
            background: isDemo ? 'var(--gray-200)' : 'var(--info-bg)',
            color: isDemo ? 'var(--gray-500)' : 'var(--info)',
            fontWeight: 700,
            letterSpacing: '0.04em',
          }}
        >
          {isDemo ? 'DEMO' : 'INTEG'}
        </span>
        {showBell && (
          <button
            onClick={handleBell}
            className="flex items-center justify-center ml-2 relative"
            style={{ minWidth: 44, minHeight: 44, color: 'var(--gray-500)' }}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span
                className="absolute flex items-center justify-center rounded-full text-[9px]"
                style={{
                  top: 8,
                  right: 6,
                  width: 16,
                  height: 16,
                  background: 'var(--red-primary)',
                  color: 'var(--white)',
                  fontWeight: 700,
                }}
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
