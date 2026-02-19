import React from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';

export default function SMP_02() {
  return (
    <div className="flex flex-col min-h-full" style={{ background: 'var(--white)' }}>
      <ScreenLabel name="SMP_02_BipolarNavigationDiagram" />
      <div className="p-4">
        <h2 className="text-[20px] mb-4" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Bipolar Navigation</h2>

        <div className="flex gap-3 mb-6">
          <div className="flex-1 p-3 rounded-xl" style={{ background: 'var(--red-bg)', border: '1px solid var(--red-soft)' }}>
            <p className="text-[14px] mb-1" style={{ fontWeight: 700, color: 'var(--red-dark)' }}>🔴 Emergency Mode</p>
            <p className="text-[11px]" style={{ color: 'var(--red-dark)' }}>Map-first, report fast, AI matching, safe handoff, case closure</p>
          </div>
          <div className="flex-1 p-3 rounded-xl" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
            <p className="text-[14px] mb-1" style={{ fontWeight: 700, color: 'var(--green-dark)' }}>🟢 Daily Mode</p>
            <p className="text-[11px]" style={{ color: 'var(--green-dark)' }}>Calm dashboard, health, docs, QR, education, social</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
            <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Mode Switch Rules</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              <li className="text-[12px]" style={{ color: 'var(--gray-700)' }}>• Global switch visible on ALL in-app screens</li>
              <li className="text-[12px]" style={{ color: 'var(--gray-700)' }}>• Active case → auto-opens Emergency Home</li>
              <li className="text-[12px]" style={{ color: 'var(--gray-700)' }}>• No active case → auto-opens Daily Home</li>
              <li className="text-[12px]" style={{ color: 'var(--gray-700)' }}>• Emergency: no daily distractions</li>
              <li className="text-[12px]" style={{ color: 'var(--gray-700)' }}>• Daily: only subtle badge if following a case</li>
              <li className="text-[12px]" style={{ color: 'var(--gray-700)' }}>• QRP_ public pages: NO switch, NO nav</li>
            </ul>
          </div>

          <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
            <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Bottom Nav Adapts</p>
            <div className="mt-2 flex gap-2">
              <div className="flex-1">
                <p className="text-[11px] mb-1" style={{ fontWeight: 600, color: 'var(--red-primary)' }}>Emergency</p>
                <p className="text-[11px]" style={{ color: 'var(--gray-500)' }}>Home · Search · Map · Community · Profile</p>
              </div>
              <div className="flex-1">
                <p className="text-[11px] mb-1" style={{ fontWeight: 600, color: 'var(--green-primary)' }}>Daily</p>
                <p className="text-[11px]" style={{ color: 'var(--gray-500)' }}>Home · Pets · QR · Learn · Profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
