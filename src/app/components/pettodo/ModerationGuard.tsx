import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ScreenLabel } from './ScreenLabel';
import { AppBar } from './AppBar';
import { Btn } from './Buttons';

export function ModerationGuard() {
  const nav = useNavigate();
  const { user, authReady, authzReady, canAccessModeration } = useAuth();

  if (!authReady || !authzReady) {
    return (
      <div className="flex flex-col min-h-full">
        <ScreenLabel name="MOD_GUARD_Loading" />
        <AppBar title="Review Queue" showBack showBell={false} />
        <div
          className="flex-1 flex items-center justify-center"
          style={{ background: 'var(--white)' }}
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: 'var(--brand-primary)', borderTopColor: 'transparent' }}
            />
            <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>
              Checking moderation access...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  if (!canAccessModeration) {
    return (
      <div className="flex flex-col min-h-full">
        <ScreenLabel name="MOD_GUARD_AccessDenied" />
        <AppBar title="Review Queue" showBack showBell={false} />
        <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4">
          <ShieldAlert size={48} style={{ color: 'var(--red-primary)' }} />
          <h3 className="text-[18px] text-center" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>
            Access restricted
          </h3>
          <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>
            This queue is available only to moderator or operator accounts.
          </p>
          <div className="w-full max-w-[320px] flex flex-col gap-2">
            <Btn variant="primary" fullWidth onClick={() => nav('/')}>
              Go to home
            </Btn>
            <Btn variant="secondary" fullWidth onClick={() => nav('/profile/user')}>
              Back to profile
            </Btn>
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
