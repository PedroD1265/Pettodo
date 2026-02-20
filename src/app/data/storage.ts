const STORAGE_KEY = 'pettodo_entities_v1';

export interface Pet {
  id: string;
  name: string;
  breed: string;
  size: 'Small' | 'Medium' | 'Large';
  colors: string[];
  marks: string;
  collar: string;
  temperament: string;
  age: string;
  weight: string;
  microchip: string;
  vaccines: string;
  lastVaccine: string;
  nextVaccine: string;
  createdAt: number;
}

export interface Case {
  id: string;
  type: 'lost' | 'found' | 'sighted';
  petId: string;
  status: 'active' | 'in_progress' | 'resolved' | 'paused' | 'expired' | 'archived';
  location: string;
  lat: number;
  lng: number;
  privacyRadius: number;
  time: string;
  createdAt: number;
  description: string;
  size: 'Small' | 'Medium' | 'Large';
  colors: string[];
  traits: string[];
  direction: string;
}

export interface Sighting {
  id: string;
  caseId: string;
  lat: number;
  lng: number;
  location: string;
  time: string;
  createdAt: number;
  note: string;
}

export interface CareLog {
  id: string;
  petId: string;
  date: string;
  ate: boolean;
  water: boolean;
  walked: boolean;
  note: string;
  createdAt: number;
}

export interface UserVerificationState {
  level: 'none' | 'basic' | 'strict';
  strictStatus: 'not_started' | 'pending' | 'approved' | 'rejected';
  phone?: string;
  verifiedAt?: number;
}

export interface NotifSettings {
  sightingsNearMe: boolean;
  aiMatch: boolean;
  caseUpdates: boolean;
  chatMessages: boolean;
  vaccineReminders: boolean;
  feedingReminders: boolean;
  communityPosts: boolean;
  eventUpdates: boolean;
  playdateInvitations: boolean;
}

export interface Settings {
  defaultRadius: number;
  showPhone: boolean;
  allowChat: boolean;
  showEmail: boolean;
  captchaEnabled: boolean;
  notif: NotifSettings;
}

export const DEFAULT_SETTINGS: Settings = {
  defaultRadius: 300,
  showPhone: false,
  allowChat: true,
  showEmail: false,
  captchaEnabled: true,
  notif: {
    sightingsNearMe: true,
    aiMatch: true,
    caseUpdates: true,
    chatMessages: true,
    vaccineReminders: true,
    feedingReminders: false,
    communityPosts: true,
    eventUpdates: true,
    playdateInvitations: true,
  },
};

export interface EntityStore {
  pets: Pet[];
  cases: Case[];
  sightings: Sighting[];
  careLogs: CareLog[];
  verification: UserVerificationState;
  settings: Settings;
}

const SEED_PET: Pet = {
  id: 'pet-luna-001',
  name: 'Luna',
  breed: 'Medium mixed-breed',
  size: 'Medium',
  colors: ['Brown', 'White'],
  marks: 'White chest patch',
  collar: 'Red collar with tag',
  temperament: 'Friendly, energetic',
  age: '3 years',
  weight: '18 kg',
  microchip: 'Yes — #985112006789012',
  vaccines: 'Up to date',
  lastVaccine: 'Rabies — Jan 15, 2026',
  nextVaccine: 'Distemper booster — Mar 20, 2026',
  createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
};

const SEED_CASE: Case = {
  id: 'CASE-2026-0219',
  type: 'lost',
  petId: 'pet-luna-001',
  status: 'active',
  location: 'Central Park, near Bethesda Fountain',
  lat: 40.7741,
  lng: -73.9715,
  privacyRadius: 300,
  time: 'Today at 6:30 PM',
  createdAt: Date.now() - 1000 * 60 * 60 * 2,
  description: 'Brown with white chest patch, red collar',
  size: 'Medium',
  colors: ['Brown', 'White'],
  traits: ['Red collar', 'White chest patch', 'Friendly'],
  direction: 'SE',
};

const SEED_SIGHTINGS: Sighting[] = [
  {
    id: 'sight-001',
    caseId: 'CASE-2026-0219',
    lat: 40.7751,
    lng: -73.9705,
    location: '0.4 km NE',
    time: '2 hours ago',
    createdAt: Date.now() - 1000 * 60 * 120,
    note: 'Running toward east side',
  },
  {
    id: 'sight-002',
    caseId: 'CASE-2026-0219',
    lat: 40.7730,
    lng: -73.9725,
    location: '0.3 km SW',
    time: '4 hours ago',
    createdAt: Date.now() - 1000 * 60 * 240,
    note: 'Near fountain, had collar',
  },
];

const SEED_FOUND_CASES: Case[] = [
  {
    id: 'FOUND-001',
    type: 'found',
    petId: '',
    status: 'active',
    location: '0.4 km NE from Bethesda',
    lat: 40.7751,
    lng: -73.9705,
    privacyRadius: 300,
    time: '2 hours ago',
    createdAt: Date.now() - 1000 * 60 * 120,
    description: 'Brown dog, white chest, red collar',
    size: 'Medium',
    colors: ['Brown', 'White'],
    traits: ['Red collar', 'Friendly'],
    direction: '',
  },
  {
    id: 'SIGHT-001',
    type: 'sighted',
    petId: '',
    status: 'active',
    location: '0.8 km N',
    lat: 40.7820,
    lng: -73.9715,
    privacyRadius: 0,
    time: '5 hours ago',
    createdAt: Date.now() - 1000 * 60 * 300,
    description: 'Medium brown dog spotted running',
    size: 'Medium',
    colors: ['Brown'],
    traits: ['Running fast'],
    direction: 'N',
  },
  {
    id: 'FOUND-002',
    type: 'found',
    petId: '',
    status: 'active',
    location: '1.2 km SE',
    lat: 40.7670,
    lng: -73.9670,
    privacyRadius: 500,
    time: '1 day ago',
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    description: 'Medium sized dog, brown fur',
    size: 'Medium',
    colors: ['Brown'],
    traits: ['Shy'],
    direction: '',
  },
];

const SEED_CARE_LOGS: CareLog[] = [
  {
    id: 'care-001',
    petId: 'pet-luna-001',
    date: 'Today',
    ate: true,
    water: true,
    walked: false,
    note: '',
    createdAt: Date.now() - 1000 * 60 * 60 * 3,
  },
];

const DEFAULTS: EntityStore = {
  pets: [SEED_PET],
  cases: [SEED_CASE, ...SEED_FOUND_CASES],
  sightings: SEED_SIGHTINGS,
  careLogs: SEED_CARE_LOGS,
  verification: { level: 'none', strictStatus: 'not_started' },
  settings: DEFAULT_SETTINGS,
};

export function loadEntityStore(): EntityStore {
  if (typeof window === 'undefined') return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    return {
      pets: Array.isArray(parsed.pets) && parsed.pets.length > 0 ? parsed.pets : DEFAULTS.pets,
      cases: Array.isArray(parsed.cases) && parsed.cases.length > 0 ? parsed.cases : DEFAULTS.cases,
      sightings: Array.isArray(parsed.sightings) ? parsed.sightings : DEFAULTS.sightings,
      careLogs: Array.isArray(parsed.careLogs) ? parsed.careLogs : DEFAULTS.careLogs,
      verification: parsed.verification ?? DEFAULTS.verification,
      settings: parsed.settings ? { ...DEFAULT_SETTINGS, ...parsed.settings, notif: { ...DEFAULT_SETTINGS.notif, ...(parsed.settings.notif ?? {}) } } : DEFAULT_SETTINGS,
    };
  } catch {
    return DEFAULTS;
  }
}

export function saveEntityStore(store: EntityStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // silently fail if storage full
  }
}

export function resetEntityStore(): EntityStore {
  saveEntityStore(DEFAULTS);
  return DEFAULTS;
}

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
