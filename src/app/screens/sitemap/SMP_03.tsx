import React from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { useNavigate } from 'react-router';

const flows = [
  { id: 1, name: 'Home ↔ Mode Switch', start: '/home-daily', color: 'var(--gray-900)', path: 'HOM_01 ↔ HOM_03 ↔ HOM_02' },
  { id: 2, name: 'LOST flow', start: '/emg/entry', color: 'var(--red-primary)', path: 'EMG_01→02→03→04→05→06→07→16→17→23→24→25→26→27→28→29→30' },
  { id: 3, name: 'FOUND flow', start: '/emg/entry', color: 'var(--green-primary)', path: 'EMG_01→08→09→10→11→16→23→26→30' },
  { id: 4, name: 'SIGHTED flow', start: '/emg/entry', color: 'var(--warning)', path: 'EMG_01→12→13→20' },
  { id: 5, name: 'Map → Detail', start: '/emg/map-layers', color: 'var(--info)', path: 'EMG_14↔15↔18/19/20↔16↔23' },
  { id: 6, name: 'Daily → Emergency', start: '/daily/pet-profile', color: '#8B5CF6', path: 'DLY_03→DLY_08→EMG_05/06' },
  { id: 7, name: 'Communities → Events', start: '/communities/home', color: '#EC4899', path: 'COM_01→03→EVT_01→02→04→05' },
  { id: 8, name: 'Walkers', start: '/walkers/marketplace', color: '#0EA5E9', path: 'SRV_01→02→03→04→05→07→08→09' },
  { id: 9, name: 'Play Dates', start: '/playdates/home', color: '#14B8A6', path: 'PD_01→03→04→05→06→07' },
  { id: 10, name: 'Public QR', start: '/public/qr-landing', color: '#6366F1', path: 'QRP_01→02→01 & QRP_01→03' },
];

export default function SMP_03() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full" style={{ background: 'var(--white)' }}>
      <ScreenLabel name="SMP_03_PrototypeLinksLegend" />
      <div className="p-4">
        <h2 className="text-[20px] mb-1" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>10 Required Flows</h2>
        <p className="text-[13px] mb-4" style={{ color: 'var(--gray-500)' }}>Tap a flow to start testing it end-to-end.</p>
        <div className="flex flex-col gap-2">
          {flows.map((f) => (
            <button
              key={f.id}
              onClick={() => nav(f.start)}
              className="flex flex-col px-4 py-3 rounded-xl text-left"
              style={{ background: 'var(--gray-100)', minHeight: 48 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px]" style={{ background: f.color, color: 'var(--white)', fontWeight: 700 }}>
                  {f.id}
                </div>
                <span className="text-[14px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{f.name}</span>
              </div>
              <span className="text-[10px] mt-1 pl-8 break-all" style={{ color: 'var(--gray-400)', fontFamily: 'monospace' }}>{f.path}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
