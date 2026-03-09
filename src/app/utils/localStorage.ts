const STORAGE_KEY = 'pettodo_demo_state';

export interface PersistedState {
  mode: 'emergency' | 'daily';
  hasActiveCase: boolean;
  caseClaimed: boolean;
  verificationLevel: 'none' | 'basic' | 'strict';
  strictStatus: 'not_started' | 'pending' | 'approved' | 'rejected';
  demoTimeOffset: number;
  communityDogSightings: any[];
  communityDogCareRecords: any[];
}

const DEFAULTS: PersistedState = {
  mode: 'daily',
  hasActiveCase: false,
  caseClaimed: false,
  verificationLevel: 'none',
  strictStatus: 'not_started',
  demoTimeOffset: 0,
  communityDogSightings: [],
  communityDogCareRecords: [],
};

export function loadPersistedState(): Partial<PersistedState> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return {};
    const result: Partial<PersistedState> = {};
    if (parsed.mode === 'emergency' || parsed.mode === 'daily') result.mode = parsed.mode;
    if (typeof parsed.hasActiveCase === 'boolean') result.hasActiveCase = parsed.hasActiveCase;
    if (typeof parsed.caseClaimed === 'boolean') result.caseClaimed = parsed.caseClaimed;
    if (['none', 'basic', 'strict'].includes(parsed.verificationLevel)) result.verificationLevel = parsed.verificationLevel;
    if (['not_started', 'pending', 'approved', 'rejected'].includes(parsed.strictStatus)) result.strictStatus = parsed.strictStatus;
    if (typeof parsed.demoTimeOffset === 'number') result.demoTimeOffset = parsed.demoTimeOffset;
    if (Array.isArray(parsed.communityDogSightings)) result.communityDogSightings = parsed.communityDogSightings;
    if (Array.isArray(parsed.communityDogCareRecords)) result.communityDogCareRecords = parsed.communityDogCareRecords;
    return result;
  } catch {
    return {};
  }
}

export function savePersistedState(state: PersistedState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // silently fail
  }
}

export function resetPersistedState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // silently fail
  }
}
