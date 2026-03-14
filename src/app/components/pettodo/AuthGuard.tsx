import React, { useEffect, useRef } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export function AuthGuard() {
  const { user, authReady, isDemo, hasPendingImport, importLocalData } = useAuth();
  const { loadPetsFromApi } = useApp();
  const didLoad = useRef(false);

  useEffect(() => {
    if (isDemo || !authReady || !user || didLoad.current) return;
    didLoad.current = true;

    (async () => {
      if (hasPendingImport) {
        try {
          await importLocalData();
        } catch (err) {
          console.error('[AuthGuard] Import failed:', err);
        }
      }
      await loadPetsFromApi();
    })();
  }, [isDemo, authReady, user, hasPendingImport, importLocalData, loadPetsFromApi]);

  if (isDemo) {
    return <Outlet />;
  }

  if (!authReady) {
    return (
      <div
        className="flex items-center justify-center h-full"
        style={{ background: 'var(--white)' }}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: 'var(--brand-primary)', borderTopColor: 'transparent' }}
          />
          <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return <Outlet />;
}
