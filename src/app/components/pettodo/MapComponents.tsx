import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Eye, Heart, Cross } from 'lucide-react';

const PIN_TYPES = [
  { icon: '📍', color: 'var(--red-primary)', label: 'Lost', desc: 'Dog reported lost' },
  { icon: '✅', color: 'var(--green-primary)', label: 'Found', desc: 'Dog found by someone' },
  { icon: '👁️', color: 'var(--warning)', label: 'Sighted', desc: 'Dog spotted in area' },
  { icon: '🐕', color: '#F97316', label: 'Community Dog', desc: 'Known street/community dog (lower priority)' },
  { icon: '🏥', color: 'var(--info)', label: 'Safe Point', desc: 'Trusted handoff location' },
];

export function MapLegend() {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'var(--white)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--gray-200)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-2"
        style={{ minHeight: 44 }}
      >
        <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Map Legend</span>
        {open ? <ChevronUp size={16} style={{ color: 'var(--gray-400)' }} /> : <ChevronDown size={16} style={{ color: 'var(--gray-400)' }} />}
      </button>
      {open && (
        <div className="px-3 pb-3 flex flex-col gap-2">
          {PIN_TYPES.map((p) => (
            <div key={p.label} className="flex items-center gap-2">
              <span className="text-[14px]">{p.icon}</span>
              <span className="text-[12px]" style={{ fontWeight: 600, color: p.color }}>{p.label}</span>
              <span className="text-[11px]" style={{ color: 'var(--gray-400)' }}>— {p.desc}</span>
            </div>
          ))}
          <div className="mt-1 px-2 py-1.5 rounded-lg" style={{ background: 'var(--gray-100)' }}>
            <span className="text-[11px]" style={{ color: 'var(--gray-500)' }}>
              Approximate area only — exact address is hidden.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export function MapPlaceholder({ children, height = 220 }: { children?: React.ReactNode; height?: number }) {
  return (
    <div
      className="relative rounded-xl overflow-hidden flex items-center justify-center"
      style={{ background: '#E8F4E8', height, border: '1px solid var(--gray-200)' }}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <MapPin size={64} style={{ color: 'var(--gray-400)' }} />
      </div>
      {/* Simulated pins */}
      <div className="absolute top-1/3 left-1/3 text-lg">📍</div>
      <div className="absolute top-1/2 right-1/3 text-lg">✅</div>
      <div className="absolute bottom-1/3 left-1/2 text-sm">👁️</div>
      <div className="absolute top-1/4 right-1/4 text-xs opacity-60">🐕</div>
      <div className="absolute bottom-1/4 left-1/4 text-sm">🏥</div>
      {/* Approximate circle */}
      <div className="absolute w-32 h-32 rounded-full border-2 border-dashed opacity-40" style={{ borderColor: 'var(--red-primary)', background: 'rgba(220,38,38,0.05)' }} />
      {children}
    </div>
  );
}

export function RadiusSelector({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const options = [300, 500, 1000, 2000];
  const labels = ['300m', '500m', '1 km', '2 km'];
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Privacy radius</span>
      <div className="flex gap-2">
        {options.map((o, i) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className="flex-1 py-2 rounded-xl text-[13px] transition-all"
            style={{
              background: value === o ? 'var(--info)' : 'var(--gray-100)',
              color: value === o ? 'var(--white)' : 'var(--gray-700)',
              fontWeight: value === o ? 600 : 400,
              minHeight: 44,
            }}
          >
            {labels[i]}
          </button>
        ))}
      </div>
    </div>
  );
}

export function DirectionCompass({ selected, onSelect }: { selected: string; onSelect: (d: string) => void }) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Direction last seen heading</span>
      <div className="grid grid-cols-4 gap-2">
        {dirs.map((d) => (
          <button
            key={d}
            onClick={() => onSelect(d)}
            className="w-12 h-12 rounded-xl text-[13px] flex items-center justify-center transition-all"
            style={{
              background: selected === d ? 'var(--red-primary)' : 'var(--gray-100)',
              color: selected === d ? 'var(--white)' : 'var(--gray-700)',
              fontWeight: 600,
              minHeight: 44,
              minWidth: 44,
            }}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}
