import React from 'react';
import { ShieldCheck, Phone, Clock, CheckCircle, AlertTriangle, Eye, Star } from 'lucide-react';

export function VerificationBadge({ level }: { level: 'sms' | 'strict' }) {
  if (level === 'strict') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]" style={{ background: 'var(--green-soft)', color: 'var(--green-dark)', fontWeight: 600 }}>
        <ShieldCheck size={12} /> Strict verified (ID+Selfie)
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]" style={{ background: 'var(--info)', color: 'var(--white)', fontWeight: 500 }}>
      <Phone size={12} /> SMS verified
    </span>
  );
}

export function ConfidenceBadge({ value }: { value: number }) {
  const level = value >= 75 ? 'High' : value >= 50 ? 'Medium' : 'Low';
  const bg = value >= 75 ? 'var(--green-soft)' : value >= 50 ? '#FEF3C7' : 'var(--red-soft)';
  const color = value >= 75 ? 'var(--green-dark)' : value >= 50 ? 'var(--warning)' : 'var(--red-dark)';
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]" style={{ background: bg, color, fontWeight: 600 }}>
      {level} {value}%
    </span>
  );
}

export function FreshnessBadge({ text = 'Last updated 12 min ago' }: { text?: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px]" style={{ color: 'var(--gray-500)' }}>
      <Clock size={11} /> {text}
    </span>
  );
}

export function StatusChip({ status }: { status: 'lost' | 'found' | 'sighted' | 'resolved' | 'active' }) {
  const styles: Record<string, { bg: string; color: string; label: string }> = {
    lost: { bg: 'var(--red-soft)', color: 'var(--red-dark)', label: 'Lost' },
    found: { bg: 'var(--green-soft)', color: 'var(--green-dark)', label: 'Found' },
    sighted: { bg: '#FEF3C7', color: 'var(--warning)', label: 'Sighted' },
    resolved: { bg: 'var(--gray-200)', color: 'var(--gray-700)', label: 'Resolved' },
    active: { bg: 'var(--red-soft)', color: 'var(--red-dark)', label: 'Active' },
  };
  const s = styles[status];
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]" style={{ background: s.bg, color: s.color, fontWeight: 600 }}>
      {s.label}
    </span>
  );
}

export function MatchReasonTag({ reason }: { reason: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px]" style={{ background: 'var(--gray-100)', color: 'var(--gray-700)', fontWeight: 500 }}>
      {reason}
    </span>
  );
}

export function EventTrustBadge({ type }: { type: 'ai' | 'community' }) {
  if (type === 'ai') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]" style={{ background: '#DBEAFE', color: 'var(--info)', fontWeight: 600 }}>
        <CheckCircle size={12} /> AI Verified
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]" style={{ background: 'var(--green-soft)', color: 'var(--green-dark)', fontWeight: 600 }}>
      <Star size={12} /> Community Verified (weighted)
    </span>
  );
}

export function PhotoQualityBadge({ quality }: { quality: 'good' | 'ok' | 'poor' }) {
  const cfg = {
    good: { bg: 'var(--green-soft)', color: 'var(--green-dark)', label: 'Good quality', tip: '' },
    ok: { bg: '#FEF3C7', color: 'var(--warning)', label: 'Acceptable', tip: 'Better photos improve match accuracy' },
    poor: { bg: 'var(--red-soft)', color: 'var(--red-dark)', label: 'Poor quality', tip: 'Face not visible. Matches may be less accurate.' },
  };
  const c = cfg[quality];
  return (
    <div className="flex flex-col gap-0.5">
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]" style={{ background: c.bg, color: c.color, fontWeight: 600 }}>
        {c.label}
      </span>
      {c.tip && <span className="text-[11px] pl-1" style={{ color: c.color }}>{c.tip}</span>}
    </div>
  );
}

export function DirectionChip({ direction }: { direction: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[12px] border" style={{ borderColor: 'var(--gray-200)', color: 'var(--gray-700)', fontWeight: 500 }}>
      🧭 {direction}
    </span>
  );
}

export function NewAccountBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px]" style={{ background: '#FEF3C7', color: 'var(--warning)', fontWeight: 600 }}>
      <AlertTriangle size={10} /> New account — limited features
    </span>
  );
}
