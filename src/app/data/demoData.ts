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
