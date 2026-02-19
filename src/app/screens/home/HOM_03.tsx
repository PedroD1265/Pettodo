import React from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router';
import { AlertTriangle, Leaf, ChevronLeft } from 'lucide-react';

export default function HOM_03() {
  const { mode, setMode, hasActiveCase } = useApp();
  const nav = useNavigate();

  const switchTo = (m: 'emergency' | 'daily') => {
    setMode(m);
    nav(m === 'emergency' ? '/home-emergency' : '/home-daily');
  };

  return (
    <div className="flex flex-col min-h-full" style={{ background: 'var(--white)' }}>
      <ScreenLabel name="HOM_03_ModeSwitch_Explicit" />
      <div className="p-4">
        <button onClick={() => nav(-1)} className="flex items-center gap-1 mb-4" style={{ minHeight: 44, color: 'var(--gray-500)' }}>
          <ChevronLeft size={20} /> Back
        </button>
        <h2 className="text-[20px] mb-1" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Switch Mode</h2>
        <p className="text-[13px] mb-6" style={{ color: 'var(--gray-500)' }}>
          PETTODO adapts its entire interface to your current need.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => switchTo('emergency')}
            className="flex items-start gap-4 p-4 rounded-2xl text-left"
            style={{ background: 'var(--red-bg)', border: mode === 'emergency' ? '2px solid var(--red-primary)' : '2px solid transparent', minHeight: 80 }}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--red-primary)' }}>
              <AlertTriangle size={22} style={{ color: 'var(--white)' }} />
            </div>
            <div>
              <p className="text-[16px]" style={{ fontWeight: 700, color: 'var(--red-dark)' }}>Emergency Mode</p>
              <p className="text-[12px] mt-0.5" style={{ color: 'var(--red-dark)' }}>
                Lost/found dog search, AI matching, safe handoff, real-time map
              </p>
              {hasActiveCase && (
                <p className="text-[11px] mt-1 px-2 py-0.5 rounded-full inline-block" style={{ background: 'var(--red-soft)', color: 'var(--red-dark)', fontWeight: 600 }}>
                  1 active case
                </p>
              )}
            </div>
          </button>

          <button
            onClick={() => switchTo('daily')}
            className="flex items-start gap-4 p-4 rounded-2xl text-left"
            style={{ background: 'var(--green-bg)', border: mode === 'daily' ? '2px solid var(--green-primary)' : '2px solid transparent', minHeight: 80 }}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--green-primary)' }}>
              <Leaf size={22} style={{ color: 'var(--white)' }} />
            </div>
            <div>
              <p className="text-[16px]" style={{ fontWeight: 700, color: 'var(--green-dark)' }}>Daily Mode</p>
              <p className="text-[12px] mt-0.5" style={{ color: 'var(--green-dark)' }}>
                Pet health, documents, vaccines, QR identity, education, community
              </p>
            </div>
          </button>
        </div>

        <div className="mt-6 p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>
            <strong>Adaptive behavior:</strong> If you have an active case, the app defaults to Emergency Home.
            If no active case exists, it defaults to Daily Home. You can switch anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
