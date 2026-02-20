export const LUNA = {
  name: 'Luna',
  breed: 'Medium mixed-breed',
  description: 'Brown with white chest patch, red collar',
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
};

export const LOST_CASE = {
  id: 'CASE-2026-0219',
  headline: 'Luna was lost near Central Park — today at 6:30 PM',
  location: 'Central Park, near Bethesda Fountain',
  time: 'Today at 6:30 PM',
  status: 'Active',
  direction: 'SE',
  lastSeen: '12 min ago',
  sightings: 7,
  followers: 23,
  matchCount: 4,
};

export const SAFE_POINT = {
  name: 'San Martín Partner Vet',
  hours: 'Open 8 AM – 8 PM',
  distance: '0.3 km away',
  type: 'Veterinary Clinic',
  trusted: true,
  phone: '+1 (555) 012-3456',
};

export const WALKER = {
  name: 'Carlos R.',
  verified: 'strict' as const,
  rating: 4.8,
  walks: 142,
  since: 'Member since 2024',
  reviews: [
    { author: 'Maria G.', text: 'Carlos was amazing with Buddy. Very punctual and sent photo updates throughout the walk.', rating: 5 },
    { author: 'James T.', text: 'Reliable and caring. My dog loves walking with Carlos.', rating: 5 },
    { author: 'Sofia L.', text: 'Great communication and follows all the safety guidelines.', rating: 4 },
  ],
};

export const EVENT = {
  name: 'Community dog walk',
  date: 'Saturday, Feb 22, 2026 — 10:00 AM',
  location: 'Riverside Park, Main Entrance',
  source: 'Instagram: @centralpark_dogs',
  organizer: 'Central Park Dog Community',
  attendees: 18,
  verified: 'ai' as const,
  communityScore: 82,
};

export const COMMUNITY = {
  name: 'Central Park Dog Community',
  members: 342,
  posts: 89,
  description: 'A community for dog owners in the Central Park area. Share tips, organize walks, and help lost dogs.',
};

export const MATCHES = [
  { id: 1, confidence: 87, reasons: ['similar color', 'similar size', 'matching feature'], location: '0.4 km NE', time: '2 hours ago', status: 'found' as const },
  { id: 2, confidence: 72, reasons: ['similar color', 'near your area'], location: '1.2 km SE', time: '5 hours ago', status: 'found' as const },
  { id: 3, confidence: 65, reasons: ['similar size', 'near your area'], location: '0.8 km N', time: '1 day ago', status: 'sighted' as const },
  { id: 4, confidence: 51, reasons: ['similar color'], location: '2.1 km W', time: '2 days ago', status: 'sighted' as const },
];

export const CHAT_MESSAGES = [
  { id: 1, sender: 'system', text: 'Chat started. Remember: Handoff only at a safe point. Do not share your address.' },
  { id: 2, sender: 'other', text: 'Hi! I think I found your dog near the park entrance. She has a red collar and white chest.' },
  { id: 3, sender: 'me', text: 'That sounds like Luna! Can you send a photo?' },
  { id: 4, sender: 'other', text: 'Sure, sending now. She seems healthy and friendly.' },
  { id: 5, sender: 'system', text: 'Reminder: Request proof of life before arranging a meeting.' },
  { id: 6, sender: 'me', text: 'Great! Can we meet at San Martín Partner Vet for the handoff?' },
  { id: 7, sender: 'other', text: 'Yes, I can be there tomorrow at 10 AM. Is that okay?' },
  { id: 8, sender: 'me', text: 'Perfect. See you there. Thank you so much!' },
];

export const VACCINES = [
  { name: 'Rabies', date: 'Jan 15, 2026', status: 'completed' as const, next: 'Jan 15, 2027' },
  { name: 'DHPP (Distemper)', date: 'Nov 10, 2025', status: 'completed' as const, next: 'Mar 20, 2026' },
  { name: 'Bordetella', date: 'Sep 5, 2025', status: 'completed' as const, next: 'Sep 5, 2026' },
  { name: 'Leptospirosis', date: 'Jul 20, 2025', status: 'completed' as const, next: 'Jul 20, 2026' },
  { name: 'Canine Influenza', date: null, status: 'pending' as const, next: 'Mar 1, 2026' },
];

export const FEEDING = [
  { time: '7:30 AM', meal: 'Breakfast', food: 'Dry kibble — 1.5 cups', done: true },
  { time: '12:30 PM', meal: 'Midday snack', food: 'Dental chew', done: true },
  { time: '6:30 PM', meal: 'Dinner', food: 'Wet food + kibble mix — 1 cup', done: false },
];

export const ARTICLES = [
  { id: 1, title: 'What to do in the first hour after losing your dog', source: 'ASPCA', date: 'Feb 10, 2026', category: 'Emergency' },
  { id: 2, title: 'Understanding canine body language', source: 'AKC', date: 'Jan 28, 2026', category: 'Behavior' },
  { id: 3, title: 'Vaccination schedule guide for puppies and adults', source: 'VCA Hospitals', date: 'Feb 1, 2026', category: 'Health' },
  { id: 4, title: 'How to safely introduce dogs at a play date', source: 'PetMD', date: 'Jan 15, 2026', category: 'Social' },
];

export const COMMUNITY_DOGS = [
  { id: 'cd1', name: 'Buddy (street)', lastSeen: '2 hours ago', location: 'Central Park, East side', image: 'figma:asset/cd1' },
  { id: 'cd2', name: 'Lady (community)', lastSeen: 'Yesterday', location: 'Riverside Park entrance', image: 'figma:asset/cd2' },
  { id: 'cd3', name: 'Rex (street)', lastSeen: '3 days ago', location: 'West 72nd St area', image: 'figma:asset/cd3' },
];

export const INITIAL_COMMUNITY_DOG_SIGHTINGS = [
  { id: 1, dogId: 'cd1', date: 'Today at 4:30 PM', location: 'Central Park, near Boat Pond', note: 'Sleeping on the bench', author: 'Maria G.' },
  { id: 2, dogId: 'cd1', date: 'Today at 12:15 PM', location: '5th Ave & 79th St', note: 'Walking north', author: 'Doorman' },
  { id: 3, dogId: 'cd1', date: 'Yesterday', location: 'Central Park, East side', note: 'Playing with another dog', author: 'James T.' },
];

export const INITIAL_COMMUNITY_DOG_CARE_RECORDS = [
  { id: 1, dogId: 'cd1', type: 'feeding', date: 'Today at 8:00 AM', detail: 'Dry kibble + water', author: 'Maria G.' },
  { id: 2, dogId: 'cd1', type: 'vaccine', date: 'Jan 15, 2026', detail: 'Rabies booster', author: 'Dr. Smith (Verified)' },
  { id: 3, dogId: 'cd1', type: 'note', date: 'Yesterday', detail: 'Seemed limping slightly on left paw', author: 'James T.' },
];

// ========== PHOTO QUALITY SCORING (Task 3) ==========

export type PhotoQuality = 'good' | 'ok' | 'poor';

export interface PhotoScore {
  quality: PhotoQuality;
  reasons: string[];
  tips: string[];
}

const QUALITY_PROFILES: PhotoScore[] = [
  { quality: 'good', reasons: ['Face visible', 'Good lighting', 'Clear focus'], tips: [] },
  { quality: 'ok', reasons: ['Body visible', 'Slightly dark'], tips: ['Try better lighting', 'Get a front face shot'] },
  { quality: 'poor', reasons: ['Blurry', 'Dog too far', 'Face not visible'], tips: ['Move closer', 'Hold camera steady', 'Photograph from the front'] },
];

let photoCallCount = 0;
export function scorePhoto(): PhotoScore {
  // Cycle through profiles to simulate variety
  const profile = QUALITY_PROFILES[photoCallCount % QUALITY_PROFILES.length];
  photoCallCount++;
  return profile;
}

export function getConfidenceModifier(qualities: PhotoQuality[]): number {
  const poorCount = qualities.filter(q => q === 'poor').length;
  const okCount = qualities.filter(q => q === 'ok').length;
  return -(poorCount * 15) - (okCount * 5);
}

// ========== PHOTO GUIDANCE ==========

export const PHOTO_GUIDANCE = [
  { label: 'Front face', desc: 'Clear view of the face', icon: '📸' },
  { label: 'Full body', desc: 'Head to tail, side view', icon: '🐕' },
  { label: 'Good lighting', desc: 'Natural light, no harsh shadows', icon: '☀️' },
];

// ========== FLYER / SHARE KIT (Task 4) ==========

export const FLYER_SHARE_TEXT = `🚨 LOST DOG — ${LUNA.name}
${LUNA.breed} · ${LUNA.description}
Last seen: ${LOST_CASE.location}
${LOST_CASE.time}
If found, please report via PETTODO app.
Do NOT approach if the dog seems scared.
pettodo.app/case/${LOST_CASE.id}`;

export const FLYER_SAFETY_REMINDER =
  'Never share your home address. Meet only at safe points. Report suspicious behavior.';

// ========== LIFECYCLE HELPERS (Task 5) ==========

export function getCaseAge(demoTimeOffset: number): number {
  return demoTimeOffset; // days since case created
}

export function getMatchAge(demoTimeOffset: number): number {
  // Match found on day 0, so age = offset
  return demoTimeOffset;
}

export function getCaseStatusFromAge(age: number): string {
  if (age >= 30) return 'Expired';
  if (age >= 25) return 'Expiring soon';
  return 'Active';
}

export function getMatchStatusFromAge(age: number): string {
  if (age >= 10) return 'Expired';
  if (age >= 9) return 'Last day';
  if (age >= 7) return 'Expiring soon';
  return 'Active';
}

export function formatDaysRemaining(current: number, total: number): string {
  const remaining = total - current;
  if (remaining <= 0) return 'Expired';
  if (remaining === 1) return '1 day remaining';
  return `${remaining} days remaining`;
}
