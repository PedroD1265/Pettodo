import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AppMode = 'emergency' | 'daily';

interface AppState {
  mode: AppMode;
  setMode: (m: AppMode) => void;
  toggleMode: () => void;
  hasActiveCase: boolean;
  setHasActiveCase: (v: boolean) => void;
  contactRevealed: boolean;
  setContactRevealed: (v: boolean) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>('daily');
  const [hasActiveCase, setHasActiveCase] = useState(true);
  const [contactRevealed, setContactRevealed] = useState(false);

  const toggleMode = () => setMode(m => m === 'emergency' ? 'daily' : 'emergency');

  return (
    <AppContext.Provider value={{ mode, setMode, toggleMode, hasActiveCase, setHasActiveCase, contactRevealed, setContactRevealed }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
