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
  photoUrl?: string;
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

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  type: 'sighting' | 'match' | 'chat' | 'push' | 'system' | 'vaccine' | 'community';
  createdAt: number;
  read: boolean;
  linkTo?: string;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  caseId: string;
  text: string;
  sender: 'user' | 'other' | 'system';
  createdAt: number;
}

export interface DemoDocument {
  id: string;
  name: string;
  url: string;
  size: number;
  createdAt: number;
}

export interface Provider {
  id: string;
  category: 'walkers' | 'grooming' | 'daycare' | 'training';
  name: string;
  shortBio: string;
  zoneLabel: string;
  lat: number;
  lng: number;
  rating: number;
  verifiedLevel: 'none' | 'basic' | 'strict';
  priceHint: string;
  photoUrl?: string;
}

export interface BookingRequest {
  id: string;
  providerId: string;
  category: Provider['category'];
  requestedTime: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: number;
}

export interface VaccineRecord {
  id: string;
  petId: string;
  name: string;
  dateGivenISO: string;
  nextDueISO?: string;
  notes?: string;
  createdAt: number;
}

export interface MedicationRecord {
  id: string;
  petId: string;
  name: string;
  dosageOrInstructions?: string;
  startDateISO: string;
  endDateISO?: string;
  notes?: string;
  createdAt: number;
}

export interface HealthCondition {
  id: string;
  petId: string;
  name: string;
  notes?: string;
  createdAt: number;
}

export interface PetHealthDocument {
  id: string;
  petId: string;
  title: string;
  kind: 'photo' | 'file' | 'qr';
  url?: string;
  sizeKB?: number;
  issuedDateISO?: string;
  notes?: string;
  createdAt: number;
  qrRaw?: string;
  qrParsed?: Record<string, unknown>;
}

export interface FeedingPreset {
  petId: string;
  foodName: string;
  kcalPer100g?: number;
  notes?: string;
}

export interface FeedingLog {
  id: string;
  petId: string;
  timeISO: string;
  foodName: string;
  grams?: number;
  notes?: string;
  createdAt: number;
}

export interface FeedingReminder {
  id: string;
  petId: string;
  timeHHMM: string;
  enabled: boolean;
  createdAt: number;
}

export interface WeightLog {
  id: string;
  petId: string;
  dateISO: string;
  weightKg: number;
  note?: string;
  createdAt: number;
}

export interface EntityStore {
  pets: Pet[];
  cases: Case[];
  sightings: Sighting[];
  careLogs: CareLog[];
  verification: UserVerificationState;
  settings: Settings;
  notifications: AppNotification[];
  chatMessages: ChatMessage[];
  documents: DemoDocument[];
  providers: Provider[];
  bookingRequests: BookingRequest[];
  vaccineRecords: VaccineRecord[];
  medicationRecords: MedicationRecord[];
  healthConditions: HealthCondition[];
  healthDocuments: PetHealthDocument[];
  feedingPresets: FeedingPreset[];
  feedingLogs: FeedingLog[];
  feedingReminders: FeedingReminder[];
  weightLogs: WeightLog[];
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

const SEED_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-001',
    title: 'New sighting near Luna',
    body: 'Someone reported a dog matching Luna\'s description near Bethesda Fountain.',
    type: 'sighting',
    createdAt: Date.now() - 1000 * 60 * 15,
    read: false,
    linkTo: '/emg/matching-top10',
  },
  {
    id: 'notif-002',
    title: 'AI Match Found — 87% confidence',
    body: 'A possible match was found for case CASE-2026-0219. Tap to review.',
    type: 'match',
    createdAt: Date.now() - 1000 * 60 * 60,
    read: false,
    linkTo: '/emg/matching-top10',
  },
  {
    id: 'notif-003',
    title: 'Vaccine reminder',
    body: 'Distemper booster due for Luna in 29 days (Mar 20, 2026).',
    type: 'vaccine',
    createdAt: Date.now() - 1000 * 60 * 60 * 3,
    read: true,
    linkTo: '/daily/vaccines',
  },
];

const SEED_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-001',
    threadId: 'thread-luna-001',
    caseId: 'CASE-2026-0219',
    text: 'Hi! I think I found your dog near the fountain. Brown with white chest?',
    sender: 'other',
    createdAt: Date.now() - 1000 * 60 * 25,
  },
  {
    id: 'msg-002',
    threadId: 'thread-luna-001',
    caseId: 'CASE-2026-0219',
    text: 'Yes! That\'s Luna! Does she have a red collar? Please don\'t let her run.',
    sender: 'user',
    createdAt: Date.now() - 1000 * 60 * 22,
  },
  {
    id: 'msg-003',
    threadId: 'thread-luna-001',
    caseId: 'CASE-2026-0219',
    text: '⚠️ Anti-scam reminder: Never pay upfront. Meet at a safe, public location.',
    sender: 'system',
    createdAt: Date.now() - 1000 * 60 * 20,
  },
];

const SEED_PROVIDERS: Provider[] = [
  {
    id: 'prov-w-001',
    category: 'walkers',
    name: 'Carlos M.',
    shortBio: 'Certified dog walker, 5 years exp. Specializes in high-energy breeds.',
    zoneLabel: 'Upper West Side',
    lat: 40.7850,
    lng: -73.9800,
    rating: 4.9,
    verifiedLevel: 'strict',
    priceHint: '$20–25 / 30 min',
  },
  {
    id: 'prov-w-002',
    category: 'walkers',
    name: 'Ana M.',
    shortBio: 'Group and solo walks. Insured, background checked.',
    zoneLabel: 'Midtown / Central Park',
    lat: 40.7700,
    lng: -73.9750,
    rating: 4.5,
    verifiedLevel: 'basic',
    priceHint: '$18–22 / 30 min',
  },
  {
    id: 'prov-g-001',
    category: 'grooming',
    name: 'Snip & Shine Grooming',
    shortBio: 'Full-service grooming salon. Bath, haircut, nail trim included.',
    zoneLabel: 'Hell\'s Kitchen',
    lat: 40.7640,
    lng: -73.9920,
    rating: 4.8,
    verifiedLevel: 'strict',
    priceHint: '$55–90 / session',
  },
  {
    id: 'prov-g-002',
    category: 'grooming',
    name: 'Pawfect Look',
    shortBio: 'Mobile grooming van — comes to you. Eco-friendly products.',
    zoneLabel: 'Brooklyn / Lower Manhattan',
    lat: 40.7060,
    lng: -74.0090,
    rating: 4.6,
    verifiedLevel: 'basic',
    priceHint: '$65–100 / session',
  },
  {
    id: 'prov-d-001',
    category: 'daycare',
    name: 'Happy Tails Daycare',
    shortBio: 'Day boarding with supervised play groups. Camera access for owners.',
    zoneLabel: 'East Village',
    lat: 40.7264,
    lng: -73.9818,
    rating: 4.7,
    verifiedLevel: 'strict',
    priceHint: '$40–55 / day',
  },
  {
    id: 'prov-d-002',
    category: 'daycare',
    name: 'Bark & Play',
    shortBio: 'Small group daycare (max 8 dogs). Drop-in or monthly plans.',
    zoneLabel: 'Williamsburg',
    lat: 40.7162,
    lng: -73.9500,
    rating: 4.4,
    verifiedLevel: 'basic',
    priceHint: '$35–48 / day',
  },
  {
    id: 'prov-t-001',
    category: 'training',
    name: 'David K. — K9 Training',
    shortBio: 'Certified professional trainer. Positive reinforcement only. Group & private.',
    zoneLabel: 'Upper East Side',
    lat: 40.7731,
    lng: -73.9547,
    rating: 4.9,
    verifiedLevel: 'strict',
    priceHint: '$80–120 / session',
  },
  {
    id: 'prov-t-002',
    category: 'training',
    name: 'Sit & Stay Academy',
    shortBio: 'Puppy basics to advanced obedience. Group classes on weekends.',
    zoneLabel: 'Chelsea',
    lat: 40.7465,
    lng: -74.0014,
    rating: 4.5,
    verifiedLevel: 'basic',
    priceHint: '$25 / class',
  },
];

const SEED_VACCINE_RECORDS: VaccineRecord[] = [
  {
    id: 'vax-001',
    petId: 'pet-luna-001',
    name: 'Rabies',
    dateGivenISO: '2026-01-15',
    nextDueISO: '2027-01-15',
    notes: 'Annual booster',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 38,
  },
  {
    id: 'vax-002',
    petId: 'pet-luna-001',
    name: 'Distemper booster',
    dateGivenISO: '2025-03-20',
    nextDueISO: '2026-03-20',
    notes: 'Due in March 2026',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 340,
  },
  {
    id: 'vax-003',
    petId: 'pet-luna-001',
    name: 'Bordetella',
    dateGivenISO: '2025-09-10',
    nextDueISO: '2026-09-10',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 165,
  },
];

const SEED_MEDICATION_RECORDS: MedicationRecord[] = [
  {
    id: 'med-001',
    petId: 'pet-luna-001',
    name: 'Heartguard Plus',
    dosageOrInstructions: '1 chewable tablet monthly',
    startDateISO: '2025-06-01',
    notes: 'Heartworm prevention',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 200,
  },
];

const SEED_HEALTH_CONDITIONS: HealthCondition[] = [];

const SEED_HEALTH_DOCUMENTS: PetHealthDocument[] = [];

const SEED_FEEDING_PRESETS: FeedingPreset[] = [
  {
    petId: 'pet-luna-001',
    foodName: 'Premium Adult Kibble',
    kcalPer100g: 350,
    notes: 'Mixed with a bit of wet food',
  },
];

const SEED_FEEDING_LOGS: FeedingLog[] = [
  {
    id: 'feed-001',
    petId: 'pet-luna-001',
    timeISO: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    foodName: 'Premium Adult Kibble',
    grams: 150,
    notes: 'Morning meal',
    createdAt: Date.now() - 1000 * 60 * 60 * 8,
  },
  {
    id: 'feed-002',
    petId: 'pet-luna-001',
    timeISO: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    foodName: 'Premium Adult Kibble',
    grams: 130,
    notes: 'Evening meal',
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
  },
];

const SEED_FEEDING_REMINDERS: FeedingReminder[] = [
  {
    id: 'fremind-001',
    petId: 'pet-luna-001',
    timeHHMM: '08:00',
    enabled: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
  },
  {
    id: 'fremind-002',
    petId: 'pet-luna-001',
    timeHHMM: '18:00',
    enabled: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
  },
];

const SEED_WEIGHT_LOGS: WeightLog[] = [
  { id: 'wlog-001', petId: 'pet-luna-001', dateISO: '2025-12-01', weightKg: 17.5, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 84 },
  { id: 'wlog-002', petId: 'pet-luna-001', dateISO: '2026-01-05', weightKg: 17.8, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 49 },
  { id: 'wlog-003', petId: 'pet-luna-001', dateISO: '2026-02-10', weightKg: 18.0, note: 'Post-vet visit', createdAt: Date.now() - 1000 * 60 * 60 * 24 * 13 },
];

const DEFAULTS: EntityStore = {
  pets: [SEED_PET],
  cases: [SEED_CASE, ...SEED_FOUND_CASES],
  sightings: SEED_SIGHTINGS,
  careLogs: SEED_CARE_LOGS,
  verification: { level: 'none', strictStatus: 'not_started' },
  settings: DEFAULT_SETTINGS,
  notifications: SEED_NOTIFICATIONS,
  chatMessages: SEED_CHAT_MESSAGES,
  documents: [],
  providers: SEED_PROVIDERS,
  bookingRequests: [],
  vaccineRecords: SEED_VACCINE_RECORDS,
  medicationRecords: SEED_MEDICATION_RECORDS,
  healthConditions: SEED_HEALTH_CONDITIONS,
  healthDocuments: SEED_HEALTH_DOCUMENTS,
  feedingPresets: SEED_FEEDING_PRESETS,
  feedingLogs: SEED_FEEDING_LOGS,
  feedingReminders: SEED_FEEDING_REMINDERS,
  weightLogs: SEED_WEIGHT_LOGS,
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
      settings: parsed.settings
        ? { ...DEFAULT_SETTINGS, ...parsed.settings, notif: { ...DEFAULT_SETTINGS.notif, ...(parsed.settings.notif ?? {}) } }
        : DEFAULT_SETTINGS,
      notifications: Array.isArray(parsed.notifications) ? parsed.notifications : DEFAULTS.notifications,
      chatMessages: Array.isArray(parsed.chatMessages) ? parsed.chatMessages : DEFAULTS.chatMessages,
      documents: Array.isArray(parsed.documents) ? parsed.documents : [],
      providers: Array.isArray(parsed.providers) && parsed.providers.length > 0 ? parsed.providers : DEFAULTS.providers,
      bookingRequests: Array.isArray(parsed.bookingRequests) ? parsed.bookingRequests : [],
      vaccineRecords: Array.isArray(parsed.vaccineRecords) ? parsed.vaccineRecords : DEFAULTS.vaccineRecords,
      medicationRecords: Array.isArray(parsed.medicationRecords) ? parsed.medicationRecords : DEFAULTS.medicationRecords,
      healthConditions: Array.isArray(parsed.healthConditions) ? parsed.healthConditions : DEFAULTS.healthConditions,
      healthDocuments: Array.isArray(parsed.healthDocuments) ? parsed.healthDocuments : DEFAULTS.healthDocuments,
      feedingPresets: Array.isArray(parsed.feedingPresets) ? parsed.feedingPresets : DEFAULTS.feedingPresets,
      feedingLogs: Array.isArray(parsed.feedingLogs) ? parsed.feedingLogs : DEFAULTS.feedingLogs,
      feedingReminders: Array.isArray(parsed.feedingReminders) ? parsed.feedingReminders : DEFAULTS.feedingReminders,
      weightLogs: Array.isArray(parsed.weightLogs) ? parsed.weightLogs : DEFAULTS.weightLogs,
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
