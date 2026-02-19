import React from 'react';
import { Outlet } from 'react-router';

export function PublicShell() {
  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--gray-100)' }}>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
