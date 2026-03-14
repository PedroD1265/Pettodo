import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { appConfig } from '../config/appConfig';
import { getServices } from '../services';
import type { AuthUser } from '../services/interfaces';

interface AuthState {
  user: AuthUser | null;
  authReady: boolean;
  isDemo: boolean;
  hasPendingImport: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthState | null>(null);

const STORAGE_KEY = 'pettodo_entities_v1';

export function AuthProvider({ children }: { children: ReactNode }) {
  const isDemo = appConfig.mode === 'demo';
  const authService = getServices().auth;

  const [user, setUser] = useState<AuthUser | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [hasPendingImport, setHasPendingImport] = useState(false);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setAuthReady(true);

      if (firebaseUser && !isDemo) {
        const stored = localStorage.getItem(STORAGE_KEY);
        setHasPendingImport(!!stored);
      } else {
        setHasPendingImport(false);
      }
    });
    return unsubscribe;
  }, [authService, isDemo]);

  const signInWithGoogle = useCallback(async () => {
    const result = await authService.signInWithGoogle();
    setUser(result);
  }, [authService]);

  const signOut = useCallback(async () => {
    await authService.signOut();
    setUser(null);
  }, [authService]);

  const getIdToken = useCallback(async () => {
    return authService.getIdToken();
  }, [authService]);

  return (
    <AuthContext.Provider
      value={{ user, authReady, isDemo, hasPendingImport, signInWithGoogle, signOut, getIdToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
