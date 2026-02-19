import React from 'react';
import { Outlet } from 'react-router';
import { BottomNav } from '../components/pettodo/BottomNav';

export function AppShell() {
  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--white)' }}>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
