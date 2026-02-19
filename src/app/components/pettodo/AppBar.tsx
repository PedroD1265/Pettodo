import React from 'react';
import { useApp } from '../../context/AppContext';
import { ModeSwitch } from './ModeSwitch';
import { ChevronLeft, Bell } from 'lucide-react';
import { useNavigate } from 'react-router';

interface AppBarProps {
  title?: string;
  showBack?: boolean;
  showBell?: boolean;
  backTo?: string;
}

export function AppBar({ title, showBack = false, showBell = true, backTo }: AppBarProps) {
  const { mode } = useApp();
  const navigate = useNavigate();
  const isEmg = mode === 'emergency';
  const bg = isEmg ? 'var(--red-bg)' : 'var(--green-bg)';
  const accent = isEmg ? 'var(--red-primary)' : 'var(--green-primary)';

  return (
    <div className="flex flex-col" style={{ background: bg }}>
      {/* Mode switch row */}
      <div className="flex items-center justify-center pt-2 pb-1">
        <ModeSwitch />
      </div>
      {/* Title row */}
      <div className="flex items-center px-4 pb-2" style={{ minHeight: 44 }}>
        {showBack && (
          <button
            onClick={() => backTo ? navigate(backTo) : navigate(-1)}
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
        {showBell && (
          <button
            className="flex items-center justify-center ml-auto"
            style={{ minWidth: 44, minHeight: 44, color: 'var(--gray-500)' }}
          >
            <Bell size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
