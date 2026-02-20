import React, { createContext, useContext, useState, ReactNode } from 'react';
import { INITIAL_COMMUNITY_DOG_SIGHTINGS, INITIAL_COMMUNITY_DOG_CARE_RECORDS } from '../data/demoData';

export type AppMode = 'emergency' | 'daily';
export type VerificationLevel = 'none' | 'basic' | 'strict';
export type StrictStatus = 'not_started' | 'pending' | 'approved' | 'rejected';
export type CaseStatus = 'active' | 'in_progress' | 'resolved' | 'paused' | 'expired' | 'archived';

interface AppState {
  mode: AppMode;
  setMode: (m: AppMode) => void;
  toggleMode: () => void;
  hasActiveCase: boolean;
  setHasActiveCase: (v: boolean) => void;
  contactRevealed: boolean;
  setContactRevealed: (v: boolean) => void;
  // Verification
  verificationLevel: VerificationLevel;
  setVerificationLevel: (v: VerificationLevel) => void;
  strictStatus: StrictStatus;
  setStrictStatus: (v: StrictStatus) => void;
  // Panic mode
  caseClaimed: boolean;
  setCaseClaimed: (v: boolean) => void;
  // Lifecycle timers
  demoTimeOffset: number; // in days
  setDemoTimeOffset: (d: number) => void;
  caseStatus: CaseStatus;
  setCaseStatus: (s: CaseStatus) => void;
  caseCreatedDay: number; // day 0 = today
  // Demo controls
  showDemoControls: boolean;
  setShowDemoControls: (v: boolean) => void;
  // Community Dogs
  communityDogSightings: typeof INITIAL_COMMUNITY_DOG_SIGHTINGS;
  addCommunityDogSighting: (s: any) => void;
  communityDogCareRecords: typeof INITIAL_COMMUNITY_DOG_CARE_RECORDS;
  addCommunityDogCareRecord: (r: any) => void;
  // Walkers
  walkerAvailability: { days: string[], times: string[] };
  setWalkerAvailability: (v: { days: string[], times: string[] }) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>('daily');
  const [hasActiveCase, setHasActiveCase] = useState(false);
  const [contactRevealed, setContactRevealed] = useState(false);
  const [verificationLevel, setVerificationLevel] = useState<VerificationLevel>('none');
  const [strictStatus, setStrictStatus] = useState<StrictStatus>('not_started');
  const [caseClaimed, setCaseClaimed] = useState(false);
  const [demoTimeOffset, setDemoTimeOffset] = useState(0);
  const [caseStatus, setCaseStatus] = useState<CaseStatus>('active');
  const [showDemoControls, setShowDemoControls] = useState(false);
  
  // Community Dogs
  const [communityDogSightings, setCommunityDogSightings] = useState(INITIAL_COMMUNITY_DOG_SIGHTINGS);
  const addCommunityDogSighting = (s: any) => setCommunityDogSightings(prev => [s, ...prev]);

  const [communityDogCareRecords, setCommunityDogCareRecords] = useState(INITIAL_COMMUNITY_DOG_CARE_RECORDS);
  const addCommunityDogCareRecord = (r: any) => setCommunityDogCareRecords(prev => [r, ...prev]);

  // Walkers Availability Stub
  const [walkerAvailability, setWalkerAvailability] = useState<{ days: string[], times: string[] }>({
    days: ['Mon', 'Wed', 'Fri'],
    times: ['Morning']
  });

  const toggleMode = () => setMode(m => m === 'emergency' ? 'daily' : 'emergency');

  return (
    <AppContext.Provider value={{
      mode, setMode, toggleMode,
      hasActiveCase, setHasActiveCase,
      contactRevealed, setContactRevealed,
      verificationLevel, setVerificationLevel,
      strictStatus, setStrictStatus,
      caseClaimed, setCaseClaimed,
      demoTimeOffset, setDemoTimeOffset,
      caseStatus, setCaseStatus,
      caseCreatedDay: 0,
      showDemoControls, setShowDemoControls,
      communityDogSightings, addCommunityDogSighting,
      communityDogCareRecords, addCommunityDogCareRecord,
      walkerAvailability, setWalkerAvailability,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
