import React from 'react';
import { Check } from 'lucide-react';

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="contents">
            <div className="flex flex-col items-center gap-1 flex-1">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[12px]"
                style={{
                  background: done ? 'var(--green-primary)' : active ? 'var(--red-primary)' : 'var(--gray-200)',
                  color: done || active ? 'var(--white)' : 'var(--gray-400)',
                  fontWeight: 600,
                }}
              >
                {done ? <Check size={14} /> : i + 1}
              </div>
              <span className="text-[10px] text-center" style={{ color: active ? 'var(--gray-900)' : 'var(--gray-400)', fontWeight: active ? 600 : 400 }}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-0.5 rounded" style={{ background: done ? 'var(--green-primary)' : 'var(--gray-200)', maxWidth: 24, marginTop: -12 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
