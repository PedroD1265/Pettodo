import React, { useState, useEffect, useCallback } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Btn } from '../../components/pettodo/Buttons';
import { useNavigate } from 'react-router';
import { caseApi, type CaseRecord } from '../../services/api';
import { AlertTriangle, Search, Eye, RefreshCw, Plus, Clock } from 'lucide-react';

const TYPE_CONFIG = {
  lost: { label: 'Lost', bg: 'var(--red-bg)', color: 'var(--red-dark)', border: 'var(--red-soft)', icon: <AlertTriangle size={14} /> },
  found: { label: 'Found', bg: 'var(--green-bg)', color: 'var(--green-dark)', border: 'var(--green-soft)', icon: <Search size={14} /> },
  sighted: { label: 'Sighted', bg: 'var(--warning-bg)', color: 'var(--warning-dark)', border: 'var(--warning-soft)', icon: <Eye size={14} /> },
} as const;

const STATUS_LABELS: Record<string, string> = {
  active: 'Active',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  paused: 'Paused',
  expired: 'Expired',
  archived: 'Archived',
};

export default function EMG_CASES_LIST() {
  const nav = useNavigate();
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<'all' | 'lost' | 'found' | 'sighted'>('all');

  const loadCases = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await caseApi.list();
      setCases(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCases();
  }, [loadCases]);

  const filtered = filter === 'all' ? cases : cases.filter((c) => c.type === filter);

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_CASES_LIST_CaseDiscovery" />
      <AppBar title="My Reports" showBack backTo="/emg/entry" />

      <div className="flex-1 flex flex-col">
        {/* Filter chips */}
        <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto shrink-0">
          {(['all', 'lost', 'found', 'sighted'] as const).map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap capitalize"
                style={{
                  background: isActive ? 'var(--red-primary)' : 'var(--gray-100)',
                  color: isActive ? 'var(--white)' : 'var(--gray-700)',
                  fontWeight: 500,
                  minHeight: 36,
                }}
              >
                {f === 'all' ? 'All' : TYPE_CONFIG[f]?.label ?? f}
              </button>
            );
          })}

          <button
            onClick={loadCases}
            className="ml-auto px-3 py-1.5 rounded-full flex items-center gap-1 text-[12px] whitespace-nowrap shrink-0"
            style={{ background: 'var(--gray-100)', color: 'var(--gray-700)', minHeight: 36 }}
          >
            <RefreshCw size={12} /> Refresh
          </button>
        </div>

        <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto">
          {loading && (
            <div className="flex-1 flex items-center justify-center py-12">
              <p className="text-[14px]" style={{ color: 'var(--gray-500)' }}>Loading reports...</p>
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center gap-3 py-12">
              <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>Unable to load reports.</p>
              <Btn variant="secondary" onClick={loadCases}>Retry</Btn>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-12">
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'var(--gray-100)' }}>
                <Search size={24} style={{ color: 'var(--gray-400)' }} />
              </div>
              <div className="text-center">
                <p className="text-[16px] mb-1" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>
                  {filter === 'all' ? 'No reports yet' : `No ${filter} reports`}
                </p>
                <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>
                  Reports you create will appear here.
                </p>
              </div>
              <Btn variant="emergency" icon={<Plus size={16} />} onClick={() => nav('/emg/entry')}>
                Create a Report
              </Btn>
            </div>
          )}

          {!loading && !error && filtered.map((c) => {
            const cfg = TYPE_CONFIG[c.type] ?? TYPE_CONFIG.lost;
            const statusLabel = STATUS_LABELS[c.status] ?? c.status;
            const createdDate = c.createdAt ? new Date(Number(c.createdAt)).toLocaleDateString() : '—';
            return (
              <div
                key={c.id}
                className="p-4 rounded-2xl flex flex-col gap-2"
                style={{ background: cfg.bg, border: `1.5px solid ${cfg.border}` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]" style={{ background: 'rgba(0,0,0,0.07)', color: cfg.color, fontWeight: 600 }}>
                      {cfg.icon} {cfg.label}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,0,0,0.07)', color: cfg.color, fontWeight: 500 }}>
                      {statusLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px]" style={{ color: cfg.color, opacity: 0.7 }}>
                    <Clock size={10} /> {createdDate}
                  </div>
                </div>

                {c.location && (
                  <p className="text-[13px]" style={{ color: cfg.color, fontWeight: 500 }}>{c.location}</p>
                )}
                {c.description && (
                  <p className="text-[12px] line-clamp-2" style={{ color: cfg.color, opacity: 0.8 }}>{c.description}</p>
                )}
                <p className="text-[10px] font-mono" style={{ color: cfg.color, opacity: 0.5 }}>{c.id}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="p-4 pt-0 shrink-0">
          <Btn variant="emergency" fullWidth icon={<Plus size={16} />} onClick={() => nav('/emg/entry')}>
            New Report
          </Btn>
        </div>
      </div>
    </div>
  );
}
