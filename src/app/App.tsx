import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--gray-100)' }}>
      {/* iPhone 13 viewport frame */}
      <div
        className="relative overflow-hidden flex flex-col"
        style={{
          width: 390,
          height: 844,
          borderRadius: 40,
          boxShadow: 'var(--shadow-lg)',
          background: 'var(--white)',
          border: '8px solid var(--gray-900)',
        }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 py-1.5 shrink-0" style={{ background: 'var(--white)' }}>
          <span className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>9:41</span>
          <div className="w-28 h-6 rounded-full" style={{ background: 'var(--gray-900)' }} />
          <div className="flex items-center gap-1">
            <span className="text-[10px]" style={{ color: 'var(--gray-900)' }}>●●●●</span>
            <span className="text-[10px]" style={{ color: 'var(--gray-900)' }}>📶</span>
            <span className="text-[10px]" style={{ color: 'var(--gray-900)' }}>🔋</span>
          </div>
        </div>

        {/* Router content */}
        <div className="flex-1 overflow-hidden">
          <RouterProvider router={router} />
        </div>

        {/* Home indicator */}
        <div className="flex items-center justify-center py-2 shrink-0" style={{ background: 'var(--white)' }}>
          <div className="w-32 h-1 rounded-full" style={{ background: 'var(--gray-900)', opacity: 0.2 }} />
        </div>
      </div>
    </div>
  );
}
