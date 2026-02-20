import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { INITIAL_COMMUNITY_DOG_SIGHTINGS, INITIAL_COMMUNITY_DOG_CARE_RECORDS } from '../data/demoData';
import { loadPersistedState, savePersistedState } from '../utils/localStorage';
import { loadEntityStore, saveEntityStore, EntityStore, Pet, Case, Sighting, CareLog, generateId } from '../data/storage';

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
  verificationLevel: VerificationLevel;
  setVerificationLevel: (v: VerificationLevel) => void;
  strictStatus: StrictStatus;
  setStrictStatus: (v: StrictStatus) => void;
  caseClaimed: boolean;
  setCaseClaimed: (v: boolean) => void;
  demoTimeOffset: number;
  setDemoTimeOffset: (d: number) => void;
  caseStatus: CaseStatus;
  setCaseStatus: (s: CaseStatus) => void;
  caseCreatedDay: number;
  showDemoControls: boolean;
  setShowDemoControls: (v: boolean) => void;
  communityDogSightings: typeof INITIAL_COMMUNITY_DOG_SIGHTINGS;
  addCommunityDogSighting: (s: any) => void;
  communityDogCareRecords: typeof INITIAL_COMMUNITY_DOG_CARE_RECORDS;
  addCommunityDogCareRecord: (r: any) => void;
  walkerAvailability: { days: string[], times: string[] };
  setWalkerAvailability: (v: { days: string[], times: string[] }) => void;
  // Entity store
  store: EntityStore;
  addPet: (pet: Omit<Pet, 'id' | 'createdAt'>) => Pet;
  addCase: (c: Omit<Case, 'id' | 'createdAt'>) => Case;
  addSighting: (s: Omit<Sighting, 'id' | 'createdAt'>) => Sighting;
  addCareLog: (log: Omit<CareLog, 'id' | 'createdAt'>) => CareLog;
  resetStore: () => void;
}

const AppContext = createContext<AppState | null>(null);

function getInitialPersisted() {
  if (typeof window === 'undefined') return {};
  return loadPersistedState();
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [persisted] = useState(getInitialPersisted);
  const [mode, setMode] = useState<AppMode>(persisted.mode ?? 'daily');
  const [hasActiveCase, setHasActiveCase] = useState(persisted.hasActiveCase ?? false);
  const [contactRevealed, setContactRevealed] = useState(false);
  const [verificationLevel, setVerificationLevel] = useState<VerificationLevel>(persisted.verificationLevel ?? 'none');
  const [strictStatus, setStrictStatus] = useState<StrictStatus>(persisted.strictStatus ?? 'not_started');
  const [caseClaimed, setCaseClaimed] = useState(persisted.caseClaimed ?? false);
  const [demoTimeOffset, setDemoTimeOffset] = useState(persisted.demoTimeOffset ?? 0);
  const [caseStatus, setCaseStatus] = useState<CaseStatus>('active');
  const [showDemoControls, setShowDemoControls] = useState(false);

  const [communityDogSightings, setCommunityDogSightings] = useState(
    persisted.communityDogSightings && persisted.communityDogSightings.length > 0
      ? persisted.communityDogSightings
      : INITIAL_COMMUNITY_DOG_SIGHTINGS
  );
  const addCommunityDogSighting = (s: any) => setCommunityDogSightings(prev => [s, ...prev]);

  const [communityDogCareRecords, setCommunityDogCareRecords] = useState(
    persisted.communityDogCareRecords && persisted.communityDogCareRecords.length > 0
      ? persisted.communityDogCareRecords
      : INITIAL_COMMUNITY_DOG_CARE_RECORDS
  );
  const addCommunityDogCareRecord = (r: any) => setCommunityDogCareRecords(prev => [r, ...prev]);

  const [walkerAvailability, setWalkerAvailability] = useState<{ days: string[], times: string[] }>({
    days: ['Mon', 'Wed', 'Fri'],
    times: ['Morning']
  });

  // Entity store
  const [store, setStore] = useState<EntityStore>(() => loadEntityStore());

  const updateStore = (updater: (prev: EntityStore) => EntityStore) => {
    setStore(prev => {
      const next = updater(prev);
      saveEntityStore(next);
      return next;
    });
  };

  const addPet = (pet: Omit<Pet, 'id' | 'createdAt'>): Pet => {
    const newPet: Pet = { ...pet, id: generateId('pet'), createdAt: Date.now() };
    updateStore(s => ({ ...s, pets: [...s.pets, newPet] }));
    return newPet;
  };

  const addCase = (c: Omit<Case, 'id' | 'createdAt'>): Case => {
    const newCase: Case = { ...c, id: generateId('case'), createdAt: Date.now() };
    updateStore(s => ({ ...s, cases: [...s.cases, newCase] }));
    return newCase;
  };

  const addSighting = (s: Omit<Sighting, 'id' | 'createdAt'>): Sighting => {
    const newSighting: Sighting = { ...s, id: generateId('sight'), createdAt: Date.now() };
    updateStore(st => ({ ...st, sightings: [...st.sightings, newSighting] }));
    return newSighting;
  };

  const addCareLog = (log: Omit<CareLog, 'id' | 'createdAt'>): CareLog => {
    const newLog: CareLog = { ...log, id: generateId('care'), createdAt: Date.now() };
    updateStore(s => ({ ...s, careLogs: [...s.careLogs, newLog] }));
    return newLog;
  };

  const resetStore = () => {
    const fresh = loadEntityStore();
    setStore(fresh);
  };

  const toggleMode = () => setMode(m => m === 'emergency' ? 'daily' : 'emergency');

  useEffect(() => {
    savePersistedState({
      mode,
      hasActiveCase,
      caseClaimed,
      verificationLevel,
      strictStatus,
      demoTimeOffset,
      communityDogSightings,
      communityDogCareRecords,
    });
  }, [mode, hasActiveCase, caseClaimed, verificationLevel, strictStatus, demoTimeOffset, communityDogSightings, communityDogCareRecords]);

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
      store, addPet, addCase, addSighting, addCareLog, resetStore,
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
