import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ModeSwitch } from './ModeSwitch';
import { ChevronLeft, Bell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { appConfig } from '../../config/appConfig';

const HISTORY_KEY = 'pettodo_nav_history';
const MAX_HISTORY = 6;

function getNavHistory(): string[] {
  try {
    const raw = sessionStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function pushNavHistory(path: string) {
  const hist = getNavHistory();
  if (hist[hist.length - 1] === path) return;
  hist.push(path);
  if (hist.length > MAX_HISTORY) hist.shift();
  sessionStorage.setItem(HISTORY_KEY, JSON.stringify(hist));
}

function detectLoop(current: string): boolean {
  const hist = getNavHistory();
  if (hist.length < 3) return false;
  const prev = hist[hist.length - 2];
  const prevPrev = hist[hist.length - 3];
  if (current === prevPrev && prev !== current) return true;
  return false;
}

function getFallback(mode: string, currentPath: string): string {
  if (currentPath.startsWith('/daily')) {
    return currentPath.includes('pet') ? '/daily/pet-list' : '/home-daily';
  }
  if (currentPath.startsWith('/emg')) {
    return '/home-emergency';
  }
  return mode === 'emergency' ? '/home-emergency' : '/home-daily';
}

interface AppBarProps {
  title?: string;
  showBack?: boolean;
  showBell?: boolean;
  backTo?: string;
}

export function AppBar({ title, showBack = false, showBell = true, backTo }: AppBarProps) {
  const { mode, store } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = (store.notifications ?? []).filter(n => !n.read).length;

  useEffect(() => {
    pushNavHistory(location.pathname);
  }, [location.pathname]);

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
      return;
    }

    const currentPath = location.pathname;
    const isShallow = window.history.state && window.history.state.idx === 0;

    if (isShallow || detectLoop(currentPath)) {
      navigate(getFallback(mode, currentPath));
      return;
    }

    navigate(-1);
  };

  const handleBell = () => {
    navigate('/home-notifications');
  };

  const isDemo = appConfig.mode === 'demo';

  return (
    <div className="flex flex-col" style={{ background: 'var(--white)', borderBottom: '1px solid var(--gray-200)' }}>
      <div className="flex items-center px-4 py-2" style={{ minHeight: 48 }}>
        {showBack ? (
          <button
            onClick={handleBack}
            className="flex items-center justify-center mr-2"
            style={{ minWidth: 36, minHeight: 36, color: 'var(--brand-primary)' }}
          >
            <ChevronLeft size={22} />
          </button>
        ) : (
          <img
            src="/brand/pettodo-logo-primary.png"
            alt="PETTODO"
            style={{ height: 28 }}
            className="mr-3"
          />
        )}

        {title && showBack && (
          <span className="flex-1 text-[16px] truncate mr-2" style={{ color: 'var(--gray-900)', fontWeight: 600 }}>
            {title}
          </span>
        )}

        {!title && showBack && <div className="flex-1" />}
        {!showBack && <div className="flex-1" />}

        {!showBack && <ModeSwitch />}

        <span
          className="ml-2 px-1.5 py-0.5 rounded text-[9px] shrink-0"
          style={{
            background: isDemo ? 'var(--gray-100)' : 'var(--blue-bg)',
            color: isDemo ? 'var(--gray-400)' : 'var(--brand-primary)',
            fontWeight: 700,
            letterSpacing: '0.04em',
          }}
        >
          {isDemo ? 'DEMO' : 'INTEG'}
        </span>
        {showBell && (
          <button
            onClick={handleBell}
            className="flex items-center justify-center ml-1 relative"
            style={{ minWidth: 36, minHeight: 36, color: 'var(--gray-500)' }}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span
                className="absolute flex items-center justify-center rounded-full text-[9px]"
                style={{
                  top: 4,
                  right: 2,
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
