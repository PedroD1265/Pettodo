import React from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, AlertTriangle, CheckCircle, Pause, Archive } from 'lucide-react';
import { formatDaysRemaining, getCaseStatusFromAge, getMatchStatusFromAge } from '../../data/demoData';

export function CaseLifecycleBar() {
  const { demoTimeOffset, caseStatus } = useApp();
  const caseAge = demoTimeOffset;
  const totalDays = 30;
  const progress = Math.min((caseAge / totalDays) * 100, 100);
  const statusLabel = caseStatus === 'active' ? getCaseStatusFromAge(caseAge) : caseStatus;
  const isExpired = caseAge >= totalDays;

  const statusColor = getStatusColor(statusLabel);

  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CaseStatusIcon status={statusLabel} />
          <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Case Lifecycle</span>
        </div>
        <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: statusColor.bg, color: statusColor.text, fontWeight: 600 }}>
          {statusLabel.charAt(0).toUpperCase() + statusLabel.slice(1)}
        </span>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--gray-200)' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${progress}%`,
            background: isExpired ? 'var(--red-primary)' : caseAge >= 25 ? 'var(--warning)' : 'var(--green-primary)',
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[11px]" style={{ color: 'var(--gray-500)' }}>Day {caseAge} / {totalDays}</span>
        <span className="text-[11px]" style={{ color: isExpired ? 'var(--red-dark)' : 'var(--gray-500)' }}>
          {formatDaysRemaining(caseAge, totalDays)}
        </span>
      </div>
      <p className="text-[11px]" style={{ color: 'var(--gray-400)' }}>Active by default up to 30 days</p>
    </div>
  );
}

export function MatchLifecycleBar({ matchDay }: { matchDay?: number }) {
  const { demoTimeOffset } = useApp();
  const matchAge = matchDay ?? demoTimeOffset;
  const totalDays = 10;
  const progress = Math.min((matchAge / totalDays) * 100, 100);
  const status = getMatchStatusFromAge(matchAge);
  const isExpired = matchAge >= totalDays;

  const showDay7 = matchAge >= 7;
  const showDay9 = matchAge >= 9;

  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl" style={{ background: isExpired ? 'var(--red-bg)' : 'var(--gray-100)' }}>
      <div className="flex items-center justify-between">
        <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>
          {isExpired ? 'Match Expired' : 'Match Active'}
        </span>
        <span className="text-[11px] px-2 py-0.5 rounded-full" style={{
          background: isExpired ? 'var(--red-soft)' : matchAge >= 7 ? 'var(--warning-bg)' : 'var(--green-soft)',
          color: isExpired ? 'var(--red-dark)' : matchAge >= 7 ? 'var(--warning-dark)' : 'var(--green-dark)',
          fontWeight: 600,
        }}>
          {status}
        </span>
      </div>
      <div className="relative w-full h-2.5 rounded-full overflow-visible" style={{ background: 'var(--gray-200)' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${progress}%`,
            background: isExpired ? 'var(--red-primary)' : matchAge >= 9 ? 'var(--red-primary)' : matchAge >= 7 ? 'var(--warning)' : 'var(--green-primary)',
          }}
        />
        {/* Day 7 marker */}
        <div className="absolute top-0 h-full flex items-center" style={{ left: '70%' }}>
          <div className="w-0.5 h-4 -mt-0.5 rounded" style={{ background: 'var(--warning)' }} />
        </div>
        {/* Day 9 marker */}
        <div className="absolute top-0 h-full flex items-center" style={{ left: '90%' }}>
          <div className="w-0.5 h-4 -mt-0.5 rounded" style={{ background: 'var(--red-primary)' }} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[11px]" style={{ color: 'var(--gray-500)' }}>Day {Math.min(matchAge, totalDays)} / {totalDays}</span>
        <span className="text-[11px]" style={{ color: isExpired ? 'var(--red-dark)' : 'var(--gray-500)' }}>
          {formatDaysRemaining(matchAge, totalDays)}
        </span>
      </div>
      {/* Reminder markers */}
      <div className="flex items-center gap-2">
        <ReminderMarker day={7} label="Day 7 reminder" active={showDay7} color="var(--warning)" />
        <ReminderMarker day={9} label="Day 9 last call" active={showDay9} color="var(--red-primary)" />
      </div>
      {isExpired && (
        <p className="text-[11px]" style={{ color: 'var(--red-dark)', fontWeight: 500 }}>
          This match has expired but is still accessible via search/filter.
        </p>
      )}
    </div>
  );
}

function ReminderMarker({ day, label, active, color }: { day: number; label: string; active: boolean; color: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 rounded-full" style={{ background: active ? color : 'var(--gray-300)' }} />
      <span className="text-[10px]" style={{ color: active ? color : 'var(--gray-400)', fontWeight: active ? 600 : 400 }}>
        {label}
      </span>
    </div>
  );
}

function CaseStatusIcon({ status }: { status: string }) {
  switch (status.toLowerCase()) {
    case 'resolved': return <CheckCircle size={16} style={{ color: 'var(--green-primary)' }} />;
    case 'expired': return <AlertTriangle size={16} style={{ color: 'var(--red-primary)' }} />;
    case 'paused': return <Pause size={16} style={{ color: 'var(--warning)' }} />;
    case 'archived': return <Archive size={16} style={{ color: 'var(--gray-500)' }} />;
    default: return <Clock size={16} style={{ color: 'var(--info)' }} />;
  }
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'resolved': return { bg: 'var(--green-soft)', text: 'var(--green-dark)' };
    case 'expired': return { bg: 'var(--red-soft)', text: 'var(--red-dark)' };
    case 'expiring soon': return { bg: 'var(--warning-bg)', text: 'var(--warning-dark)' };
    case 'paused': return { bg: 'var(--warning-bg)', text: 'var(--warning-dark)' };
    case 'archived': return { bg: 'var(--gray-200)', text: 'var(--gray-700)' };
    case 'in_progress':
    case 'in progress': return { bg: 'var(--info-bg)', text: 'var(--info-dark)' };
    default: return { bg: 'var(--green-soft)', text: 'var(--green-dark)' };
  }
}
