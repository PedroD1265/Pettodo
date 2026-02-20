import React, { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

type BtnVariant = 'primary' | 'secondary' | 'destructive' | 'ghost' | 'disabled' | 'loading' | 'icon' | 'emergency' | 'daily';

interface BtnProps {
  variant?: BtnVariant;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
}

export function Btn({ variant = 'primary', children, onClick, className = '', fullWidth = false, icon, disabled = false }: BtnProps) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl transition-all';
  const size = variant === 'icon' ? 'p-2.5' : 'px-5 py-3';
  const w = fullWidth ? 'w-full' : '';

  const styles: Record<BtnVariant, React.CSSProperties> = {
    primary: { background: 'var(--gray-900)', color: 'var(--white)', minHeight: 48 },
    secondary: { background: 'var(--gray-100)', color: 'var(--gray-900)', minHeight: 48, border: '1px solid var(--gray-200)' },
    destructive: { background: 'var(--red-primary)', color: 'var(--white)', minHeight: 48 },
    ghost: { background: 'transparent', color: 'var(--gray-700)', minHeight: 44 },
    disabled: { background: 'var(--gray-200)', color: 'var(--gray-400)', minHeight: 48, cursor: 'not-allowed' },
    loading: { background: 'var(--gray-900)', color: 'var(--white)', minHeight: 48, opacity: 0.7 },
    icon: { background: 'var(--gray-100)', color: 'var(--gray-700)', minWidth: 44, minHeight: 44 },
    emergency: { background: 'var(--red-primary)', color: 'var(--white)', minHeight: 48 },
    daily: { background: 'var(--green-primary)', color: 'var(--white)', minHeight: 48 },
  };

  return (
    <button
      onClick={(variant === 'disabled' || disabled) ? undefined : onClick}
      className={`${base} ${size} ${w} ${className}`}
      style={disabled ? styles['disabled'] : styles[variant]}
      disabled={variant === 'disabled' || disabled}
    >
      {variant === 'loading' && <Loader2 size={18} className="animate-spin" />}
      {icon && variant !== 'loading' && icon}
      {children}
    </button>
  );
}
