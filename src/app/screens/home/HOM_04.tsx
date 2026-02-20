import React, { useState } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router';
import { Bell, Eye, MapPin, Calendar, Syringe, MessageCircle, Zap, Check } from 'lucide-react';

const TYPE_META: Record<string, { icon: React.ReactNode; bg: string; color: string }> = {
  sighting: { icon: <Eye size={16} />, bg: 'var(--red-bg)', color: 'var(--red-primary)' },
  match: { icon: <Zap size={16} />, bg: 'var(--red-bg)', color: 'var(--red-primary)' },
  chat: { icon: <MessageCircle size={16} />, bg: 'var(--info-bg)', color: 'var(--info)' },
  push: { icon: <Bell size={16} />, bg: 'var(--warning-bg)', color: 'var(--warning)' },
  vaccine: { icon: <Syringe size={16} />, bg: 'var(--green-bg)', color: 'var(--green-primary)' },
  community: { icon: <Calendar size={16} />, bg: 'var(--green-bg)', color: 'var(--green-primary)' },
  system: { icon: <Bell size={16} />, bg: 'var(--gray-100)', color: 'var(--gray-500)' },
};

function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? 's' : ''} ago`;
}

export default function HOM_04() {
  const { store, markNotificationRead } = useApp();
  const nav = useNavigate();
  const [filter, setFilter] = useState<'all' | 'emergency' | 'daily'>('all');

  const EMERGENCY_TYPES = new Set(['sighting', 'match', 'chat', 'push']);
  const DAILY_TYPES = new Set(['vaccine', 'community', 'system']);

  const filtered = store.notifications.filter(n => {
    if (filter === 'emergency') return EMERGENCY_TYPES.has(n.type);
    if (filter === 'daily') return DAILY_TYPES.has(n.type);
    return true;
  });

  const unread = store.notifications.filter(n => !n.read).length;

  const handleTap = (id: string, linkTo?: string) => {
    markNotificationRead(id);
    if (linkTo) nav(linkTo);
  };

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="HOM_04_ModeAware_Notifications" />
      <AppBar title="Notifications" showBack showBell={false} />
      <div className="flex-1 p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-2">
          {(['all', 'emergency', 'daily'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1 rounded-full text-[12px] capitalize"
              style={{
                background: filter === f
                  ? f === 'emergency' ? 'var(--red-primary)' : f === 'daily' ? 'var(--green-primary)' : 'var(--gray-900)'
                  : f === 'emergency' ? 'var(--red-bg)' : f === 'daily' ? 'var(--green-bg)' : 'var(--gray-100)',
                color: filter === f ? 'var(--white)' : f === 'emergency' ? 'var(--red-dark)' : f === 'daily' ? 'var(--green-dark)' : 'var(--gray-700)',
                fontWeight: 600,
              }}
            >
              {f === 'all' ? `All${unread > 0 ? ` (${unread})` : ''}` : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-2 py-12">
            <Check size={32} style={{ color: 'var(--gray-300)' }} />
            <p className="text-[14px]" style={{ color: 'var(--gray-400)' }}>All caught up!</p>
          </div>
        ) : (
          filtered.map(n => {
            const meta = TYPE_META[n.type] ?? TYPE_META.system;
            return (
              <button
                key={n.id}
                onClick={() => handleTap(n.id, n.linkTo)}
                className="flex items-start gap-3 p-3 rounded-xl text-left w-full"
                style={{
                  background: n.read ? 'var(--gray-50, var(--gray-100))' : meta.bg,
                  minHeight: 44,
                  border: n.read ? 'none' : `1px solid ${meta.bg}`,
                  opacity: n.read ? 0.75 : 1,
                }}
              >
                <span className="mt-0.5 shrink-0" style={{ color: meta.color }}>{meta.icon}</span>
                <div className="flex-1">
                  <p className="text-[13px]" style={{ color: 'var(--gray-900)', fontWeight: n.read ? 400 : 600 }}>{n.title}</p>
                  <p className="text-[12px] mt-0.5" style={{ color: 'var(--gray-600)' }}>{n.body}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--gray-400)' }}>{timeAgo(n.createdAt)}</p>
                </div>
                {!n.read && (
                  <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: meta.color }} />
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
