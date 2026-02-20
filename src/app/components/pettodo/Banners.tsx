import React, { ReactNode } from 'react';
import { AlertTriangle, Info, Shield, CheckCircle, Lock, Eye } from 'lucide-react';

type BannerType = 'info' | 'warning' | 'antiscam' | 'activeCase' | 'privacy' | 'success' | 'prefilled' | 'noPayments' | 'calm';

interface BannerProps {
  type: BannerType;
  children?: ReactNode;
  text?: string;
}

const cfg: Record<BannerType, { bg: string; color: string; border: string; icon: ReactNode }> = {
  info: { bg: 'var(--info-bg)', color: 'var(--info)', border: 'var(--info-soft)', icon: <Info size={16} /> },
  warning: { bg: 'var(--warning-bg)', color: 'var(--warning)', border: 'var(--warning-soft)', icon: <AlertTriangle size={16} /> },
  antiscam: { bg: 'var(--red-bg)', color: 'var(--red-dark)', border: 'var(--red-soft)', icon: <Shield size={16} /> },
  activeCase: { bg: 'var(--red-bg)', color: 'var(--red-dark)', border: 'var(--red-soft)', icon: <AlertTriangle size={16} /> },
  privacy: { bg: 'var(--info-bg)', color: 'var(--info)', border: 'var(--info-soft)', icon: <Lock size={16} /> },
  success: { bg: 'var(--green-bg)', color: 'var(--green-dark)', border: 'var(--green-soft)', icon: <CheckCircle size={16} /> },
  prefilled: { bg: 'var(--green-bg)', color: 'var(--green-dark)', border: 'var(--green-soft)', icon: <CheckCircle size={16} /> },
  noPayments: { bg: 'var(--warning-bg)', color: 'var(--warning)', border: 'var(--warning-soft)', icon: <Info size={16} /> },
  calm: { bg: 'var(--green-bg)', color: 'var(--green-dark)', border: 'var(--green-soft)', icon: <Eye size={16} /> },
};

export function Banner({ type, children, text }: BannerProps) {
  const c = cfg[type];
  return (
    <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      <span className="mt-0.5 shrink-0" style={{ color: c.color }}>{c.icon}</span>
      <span className="text-[13px]" style={{ color: c.color, fontWeight: 500 }}>
        {text || children}
      </span>
    </div>
  );
}
