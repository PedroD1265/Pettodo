import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { INITIAL_COMMUNITY_DOG_SIGHTINGS, INITIAL_COMMUNITY_DOG_CARE_RECORDS } from '../data/demoData';
import { loadPersistedState, savePersistedState } from '../utils/localStorage';
import {
  loadEntityStore, saveEntityStore, resetEntityStore, EntityStore,
  Pet, Case, Sighting, CareLog, generateId, Settings,
  AppNotification, ChatMessage, DemoDocument, BookingRequest,
  VaccineRecord, MedicationRecord, HealthCondition, PetHealthDocument,
  FeedingPreset, FeedingLog, FeedingReminder,
} from '../data/storage';

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
  updateCase: (caseId: string, partial: Partial<Case>) => void;
  resetStore: () => void;
  updateSettings: (patch: Partial<Settings>) => void;
  // Notifications
  addNotification: (n: Omit<AppNotification, 'id' | 'createdAt' | 'read'>) => AppNotification;
  markNotificationRead: (id: string) => void;
  // Chat
  addChatMessage: (msg: Omit<ChatMessage, 'id' | 'createdAt'>) => ChatMessage;
  getThreadMessages: (threadId: string) => ChatMessage[];
  // Documents
  addDocument: (doc: Omit<DemoDocument, 'id' | 'createdAt'>) => DemoDocument;
  // Bookings
  addBookingRequest: (req: Omit<BookingRequest, 'id' | 'createdAt'>) => BookingRequest;
  // Health
  addVaccineRecord: (r: Omit<VaccineRecord, 'id' | 'createdAt'>) => VaccineRecord;
  addMedicationRecord: (r: Omit<MedicationRecord, 'id' | 'createdAt'>) => MedicationRecord;
  addHealthCondition: (c: Omit<HealthCondition, 'id' | 'createdAt'>) => HealthCondition;
  addHealthDocument: (d: Omit<PetHealthDocument, 'id' | 'createdAt'>) => PetHealthDocument;
  // Feeding
  upsertFeedingPreset: (petId: string, preset: Omit<FeedingPreset, 'petId'>) => void;
  addFeedingLog: (l: Omit<FeedingLog, 'id' | 'createdAt'>) => FeedingLog;
  addFeedingReminder: (r: Omit<FeedingReminder, 'id' | 'createdAt'>) => FeedingReminder;
  updateFeedingReminder: (id: string, partial: Partial<FeedingReminder>) => void;
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

  const updateCase = (caseId: string, partial: Partial<Case>) => {
    updateStore(s => ({
      ...s,
      cases: s.cases.map(c => c.id === caseId ? { ...c, ...partial } : c),
    }));
  };

  const resetStore = () => {
    const fresh = resetEntityStore();
    setStore(fresh);
  };

  const updateSettings = (patch: Partial<Settings>) => {
    updateStore(s => ({
      ...s,
      settings: { ...s.settings, ...patch, notif: { ...s.settings.notif, ...((patch as any).notif ?? {}) } },
    }));
  };

  const addNotification = (n: Omit<AppNotification, 'id' | 'createdAt' | 'read'>): AppNotification => {
    const newN: AppNotification = { ...n, id: generateId('notif'), createdAt: Date.now(), read: false };
    updateStore(s => ({ ...s, notifications: [newN, ...s.notifications] }));
    return newN;
  };

  const markNotificationRead = (id: string) => {
    updateStore(s => ({
      ...s,
      notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n),
    }));
  };

  const addChatMessage = (msg: Omit<ChatMessage, 'id' | 'createdAt'>): ChatMessage => {
    const newMsg: ChatMessage = { ...msg, id: generateId('msg'), createdAt: Date.now() };
    updateStore(s => ({ ...s, chatMessages: [...s.chatMessages, newMsg] }));
    return newMsg;
  };

  const getThreadMessages = (threadId: string): ChatMessage[] => {
    return store.chatMessages.filter(m => m.threadId === threadId);
  };

  const addDocument = (doc: Omit<DemoDocument, 'id' | 'createdAt'>): DemoDocument => {
    const newDoc: DemoDocument = { ...doc, id: generateId('doc'), createdAt: Date.now() };
    updateStore(s => ({ ...s, documents: [...s.documents, newDoc] }));
    return newDoc;
  };

  const addBookingRequest = (req: Omit<BookingRequest, 'id' | 'createdAt'>): BookingRequest => {
    const newReq: BookingRequest = { ...req, id: generateId('booking'), createdAt: Date.now() };
    updateStore(s => ({ ...s, bookingRequests: [...s.bookingRequests, newReq] }));
    return newReq;
  };

  const addVaccineRecord = (r: Omit<VaccineRecord, 'id' | 'createdAt'>): VaccineRecord => {
    const rec: VaccineRecord = { ...r, id: generateId('vax'), createdAt: Date.now() };
    updateStore(s => ({ ...s, vaccineRecords: [...s.vaccineRecords, rec] }));
    return rec;
  };

  const addMedicationRecord = (r: Omit<MedicationRecord, 'id' | 'createdAt'>): MedicationRecord => {
    const rec: MedicationRecord = { ...r, id: generateId('med'), createdAt: Date.now() };
    updateStore(s => ({ ...s, medicationRecords: [...s.medicationRecords, rec] }));
    return rec;
  };

  const addHealthCondition = (c: Omit<HealthCondition, 'id' | 'createdAt'>): HealthCondition => {
    const rec: HealthCondition = { ...c, id: generateId('cond'), createdAt: Date.now() };
    updateStore(s => ({ ...s, healthConditions: [...s.healthConditions, rec] }));
    return rec;
  };

  const addHealthDocument = (d: Omit<PetHealthDocument, 'id' | 'createdAt'>): PetHealthDocument => {
    const rec: PetHealthDocument = { ...d, id: generateId('hdoc'), createdAt: Date.now() };
    updateStore(s => ({ ...s, healthDocuments: [...s.healthDocuments, rec] }));
    return rec;
  };

  const upsertFeedingPreset = (petId: string, preset: Omit<FeedingPreset, 'petId'>) => {
    updateStore(s => {
      const idx = s.feedingPresets.findIndex(p => p.petId === petId);
      const updated = [...s.feedingPresets];
      if (idx >= 0) {
        updated[idx] = { ...updated[idx], ...preset, petId };
      } else {
        updated.push({ ...preset, petId });
      }
      return { ...s, feedingPresets: updated };
    });
  };

  const addFeedingLog = (l: Omit<FeedingLog, 'id' | 'createdAt'>): FeedingLog => {
    const rec: FeedingLog = { ...l, id: generateId('feed'), createdAt: Date.now() };
    updateStore(s => ({ ...s, feedingLogs: [...s.feedingLogs, rec] }));
    return rec;
  };

  const addFeedingReminder = (r: Omit<FeedingReminder, 'id' | 'createdAt'>): FeedingReminder => {
    const rec: FeedingReminder = { ...r, id: generateId('fremind'), createdAt: Date.now() };
    updateStore(s => ({ ...s, feedingReminders: [...s.feedingReminders, rec] }));
    return rec;
  };

  const updateFeedingReminder = (id: string, partial: Partial<FeedingReminder>) => {
    updateStore(s => ({
      ...s,
      feedingReminders: s.feedingReminders.map(r => r.id === id ? { ...r, ...partial } : r),
    }));
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
      store, addPet, addCase, addSighting, addCareLog, updateCase, resetStore, updateSettings,
      addNotification, markNotificationRead,
      addChatMessage, getThreadMessages,
      addDocument,
      addBookingRequest,
      addVaccineRecord, addMedicationRecord, addHealthCondition, addHealthDocument,
      upsertFeedingPreset, addFeedingLog, addFeedingReminder, updateFeedingReminder,
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
