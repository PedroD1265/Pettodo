import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { appConfig } from '../config/appConfig';
import { getServices } from '../services';
import type { AuthAccessSource, AuthRole, AuthUser } from '../services/interfaces';
import { setApiTokenProvider, importApi, reviewApi } from '../services/api';

interface AuthState {
  user: AuthUser | null;
  authReady: boolean;
  isDemo: boolean;
  authzReady: boolean;
  role: AuthRole | null;
  canAccessModeration: boolean;
  accessSource: AuthAccessSource;
  hasPendingImport: boolean;
  importLocalData: () => Promise<{ imported: number } | null>;
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
  const [authzReady, setAuthzReady] = useState(false);
  const [role, setRole] = useState<AuthRole | null>(null);
  const [canAccessModeration, setCanAccessModeration] = useState(false);
  const [accessSource, setAccessSource] = useState<AuthAccessSource>('none');
  const [hasPendingImport, setHasPendingImport] = useState(false);

  useEffect(() => {
    if (!isDemo) {
      setApiTokenProvider(() => authService.getIdToken());
    }
  }, [authService, isDemo]);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setAuthReady(true);

      if (firebaseUser && !isDemo) {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            const hasPets = Array.isArray(parsed.pets) && parsed.pets.length > 0;
            setHasPendingImport(hasPets);
          } catch {
            setHasPendingImport(false);
          }
        } else {
          setHasPendingImport(false);
        }
      } else {
        setHasPendingImport(false);
      }
    });
    return unsubscribe;
  }, [authService, isDemo]);

  useEffect(() => {
    let cancelled = false;

    if (!authReady) {
      return () => {
        cancelled = true;
      };
    }

    if (!user || isDemo) {
      setRole(null);
      setCanAccessModeration(false);
      setAccessSource(isDemo ? 'demo' : 'none');
      setAuthzReady(true);
      return () => {
        cancelled = true;
      };
    }

    setAuthzReady(false);

    (async () => {
      try {
        const profile = await authService.getAccessProfile();
        let nextRole = profile.role;
        let nextCanAccessModeration = profile.canAccessModeration;
        let nextAccessSource = profile.source;

        if (!nextCanAccessModeration) {
          try {
            await reviewApi.getPending();
            nextCanAccessModeration = true;
            nextAccessSource = 'review_probe';
          } catch (err: any) {
            if (err?.status !== 401 && err?.status !== 403) {
              console.warn('[AuthContext] Moderation access probe failed:', err);
            }
          }
        }

        if (cancelled) return;

        setRole(nextRole);
        setCanAccessModeration(nextCanAccessModeration);
        setAccessSource(nextAccessSource);
        setAuthzReady(true);
      } catch (err) {
        if (cancelled) return;

        console.warn('[AuthContext] Access profile load failed:', err);
        setRole(null);
        setCanAccessModeration(false);
        setAccessSource('none');
        setAuthzReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authReady, authService, isDemo, user]);

  const importLocalData = useCallback(async (): Promise<{ imported: number } | null> => {
    if (isDemo) return null;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    try {
      const parsed = JSON.parse(stored);
      const pets = Array.isArray(parsed.pets) ? parsed.pets : [];
      if (pets.length === 0) return null;

      const result = await importApi.importPets(pets);
      localStorage.removeItem(STORAGE_KEY);
      setHasPendingImport(false);
      return { imported: result.imported };
    } catch (err: any) {
      if (err.status === 409) {
        localStorage.removeItem(STORAGE_KEY);
        setHasPendingImport(false);
        return null;
      }
      throw err;
    }
  }, [isDemo]);

  const signInWithGoogle = useCallback(async () => {
    const result = await authService.signInWithGoogle();
    setUser(result);
  }, [authService]);

  const signOut = useCallback(async () => {
    await authService.signOut();
    setUser(null);
    setRole(null);
    setCanAccessModeration(false);
    setAccessSource('none');
    setAuthzReady(true);
  }, [authService]);

  const getIdToken = useCallback(async () => {
    return authService.getIdToken();
  }, [authService]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authReady,
        isDemo,
        authzReady,
        role,
        canAccessModeration,
        accessSource,
        hasPendingImport,
        importLocalData,
        signInWithGoogle,
        signOut,
        getIdToken,
      }}
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
