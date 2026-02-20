import React from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Bell, Eye, MapPin, Calendar, Syringe } from 'lucide-react';

const notifications = [
  { type: 'emergency', icon: <Eye size={16} style={{ color: 'var(--red-primary)' }} />, text: 'New sighting near your area — 3 min ago', time: '3 min ago', bg: 'var(--red-bg)' },
  { type: 'emergency', icon: <MapPin size={16} style={{ color: 'var(--red-primary)' }} />, text: 'Possible match found — 87% confidence', time: '15 min ago', bg: 'var(--red-bg)' },
  { type: 'daily', icon: <Syringe size={16} style={{ color: 'var(--green-primary)' }} />, text: 'Vaccine reminder: Distemper booster in 29 days', time: '1 hour ago', bg: 'var(--green-bg)' },
  { type: 'daily', icon: <Calendar size={16} style={{ color: 'var(--green-primary)' }} />, text: 'Community dog walk — Saturday at 10 AM', time: '2 hours ago', bg: 'var(--green-bg)' },
  { type: 'emergency', icon: <Bell size={16} style={{ color: 'var(--warning)' }} />, text: 'Case CASE-2026-0219 updated with new sighting', time: '4 hours ago', bg: 'var(--warning-bg)' },
];

export default function HOM_04() {
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="HOM_04_ModeAware_Notifications" />
      <AppBar title="Notifications" showBack showBell={false} />
      <div className="flex-1 p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full text-[12px]" style={{ background: 'var(--red-bg)', color: 'var(--red-dark)', fontWeight: 600 }}>Emergency</span>
          <span className="px-3 py-1 rounded-full text-[12px]" style={{ background: 'var(--green-bg)', color: 'var(--green-dark)', fontWeight: 600 }}>Daily</span>
          <span className="px-3 py-1 rounded-full text-[12px]" style={{ background: 'var(--gray-100)', color: 'var(--gray-700)', fontWeight: 600 }}>All</span>
        </div>
        {notifications.map((n, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: n.bg, minHeight: 44 }}>
            <span className="mt-0.5 shrink-0">{n.icon}</span>
            <div className="flex-1">
              <p className="text-[13px]" style={{ color: 'var(--gray-900)', fontWeight: 500 }}>{n.text}</p>
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--gray-400)' }}>{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
