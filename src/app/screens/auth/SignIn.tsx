import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

export default function SignIn() {
  const { user, authReady, isDemo, signInWithGoogle } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (isDemo || (authReady && user)) {
    return <Navigate to="/" replace />;
  }

  if (!authReady) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--gray-50, #F9FAFB)' }}>
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: 'var(--brand-primary, #2A6BB8)', borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      const code = err?.code;
      if (code === 'auth/popup-blocked') {
        setError('Popup was blocked. Please allow popups for this site and try again.');
      } else if (code === 'auth/popup-closed-by-user') {
        setError(null);
      } else if (code === 'auth/cancelled-popup-request') {
        setError(null);
      } else {
        setError(err?.message || 'Sign-in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-6"
      style={{ background: 'var(--gray-50, #F9FAFB)' }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8 flex flex-col items-center gap-6"
        style={{ background: 'var(--white, #fff)', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
      >
        <img
          src="/brand/pettodo-logo-primary.png"
          alt="PETTODO"
          style={{ height: 40 }}
        />
        <div className="text-center">
          <h1
            className="text-[20px]"
            style={{ fontWeight: 700, color: 'var(--gray-900, #111)' }}
          >
            Welcome to PETTODO
          </h1>
          <p
            className="text-[14px] mt-1"
            style={{ color: 'var(--gray-500, #6B7280)' }}
          >
            Sign in to manage your pets
          </p>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-[14px] transition-all"
          style={{
            fontWeight: 600,
            background: 'var(--white, #fff)',
            border: '1px solid var(--gray-300, #D1D5DB)',
            color: 'var(--gray-900, #111)',
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.04 24.04 0 0 0 0 21.56l7.98-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          {loading ? 'Signing in...' : 'Continue with Google'}
        </button>

        {error && (
          <p className="text-[13px] text-center" style={{ color: 'var(--destructive, #EF4444)' }}>
            {error}
          </p>
        )}

        <p className="text-[11px] text-center" style={{ color: 'var(--gray-400, #9CA3AF)' }}>
          By signing in you agree to PETTODO's terms of service
        </p>
      </div>
    </div>
  );
}
