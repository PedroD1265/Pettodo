import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, Shield } from 'lucide-react';

export function ModeSwitch() {
  const { mode, setMode } = useApp();
  const isEmergency = mode === 'emergency';

  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-full" style={{ background: 'var(--gray-100)', height: 32 }}>
      <button
        onClick={() => setMode('daily')}
        className="flex items-center gap-1 px-3 rounded-full transition-all"
        style={{
          background: !isEmergency ? 'var(--white)' : 'transparent',
          color: !isEmergency ? 'var(--brand-primary)' : 'var(--gray-400)',
          height: 28,
          fontWeight: !isEmergency ? 600 : 400,
          boxShadow: !isEmergency ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <Shield size={13} />
        <span className="text-[12px]">Daily</span>
      </button>
      <button
        onClick={() => setMode('emergency')}
        className="flex items-center gap-1 px-3 rounded-full transition-all"
        style={{
          background: isEmergency ? 'var(--white)' : 'transparent',
          color: isEmergency ? 'var(--red-primary)' : 'var(--gray-400)',
          height: 28,
          fontWeight: isEmergency ? 600 : 400,
          boxShadow: isEmergency ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <AlertTriangle size={13} />
        <span className="text-[12px]">Emergency</span>
      </button>
    </div>
  );
}
