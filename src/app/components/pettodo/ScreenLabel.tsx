import React from 'react';

export function ScreenLabel({ name }: { name: string }) {
  return (
    <div className="px-2 py-0.5 text-[9px] tracking-wide" style={{ background: 'var(--gray-200)', color: 'var(--gray-500)', fontFamily: 'monospace' }}>
      SCREEN: {name}
    </div>
  );
}
