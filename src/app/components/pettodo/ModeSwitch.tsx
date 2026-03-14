import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, Shield } from 'lucide-react';

export function ModeSwitch() {
  const { mode, setMode } = useApp();
  const isEmergency = mode === 'emergency';

  return (
    <div className="flex items-center p-0.5 rounded-full" style={{ background: 'var(--gray-200)', height: 28 }}>
      <button
        onClick={() => setMode('daily')}
        className="flex items-center gap-1 px-2.5 rounded-full transition-all"
        style={{
          background: !isEmergency ? 'var(--white)' : 'transparent',
          color: !isEmergency ? 'var(--brand-primary)' : 'var(--gray-500)',
          height: 24,
          fontWeight: !isEmergency ? 600 : 500,
          boxShadow: !isEmergency ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <Shield size={12} />
        <span className="text-[11px]">Daily</span>
      </button>
      <button
        onClick={() => setMode('emergency')}
        className="flex items-center gap-1 px-2.5 rounded-full transition-all"
        style={{
          background: isEmergency ? 'var(--white)' : 'transparent',
          color: isEmergency ? 'var(--red-primary)' : 'var(--gray-500)',
          height: 24,
          fontWeight: isEmergency ? 600 : 500,
          boxShadow: isEmergency ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <AlertTriangle size={12} />
        <span className="text-[11px]">Emergency</span>
      </button>
    </div>
  );
}
