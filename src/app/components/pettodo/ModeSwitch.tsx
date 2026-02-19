import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, Leaf } from 'lucide-react';

export function ModeSwitch() {
  const { mode, setMode } = useApp();
  const isEmergency = mode === 'emergency';

  return (
    <div className="flex items-center gap-1 p-1 rounded-full" style={{ background: 'var(--gray-100)' }}>
      <button
        onClick={() => setMode('emergency')}
        className="flex items-center gap-1.5 px-3 rounded-full transition-all"
        style={{
          background: isEmergency ? 'var(--red-primary)' : 'transparent',
          color: isEmergency ? 'var(--white)' : 'var(--gray-500)',
          minHeight: 44,
          minWidth: 44,
        }}
      >
        <AlertTriangle size={16} />
        <span className="text-[13px]">Emergency</span>
      </button>
      <button
        onClick={() => setMode('daily')}
        className="flex items-center gap-1.5 px-3 rounded-full transition-all"
        style={{
          background: !isEmergency ? 'var(--green-primary)' : 'transparent',
          color: !isEmergency ? 'var(--white)' : 'var(--gray-500)',
          minHeight: 44,
          minWidth: 44,
        }}
      >
        <Leaf size={16} />
        <span className="text-[13px]">Daily</span>
      </button>
    </div>
  );
}
