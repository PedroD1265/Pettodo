export interface Article {
  id: string;
  title: string;
  category: 'Emergency' | 'Health' | 'Behavior' | 'Social';
  date: string;
  sourceName: string;
  sourceUrl: string;
  summary: string;
  body: string[];
}

export const EDUCATION_ARTICLES: Article[] = [
  {
    id: 'first-hour',
    title: 'What to do in the first hour after losing your dog',
    category: 'Emergency',
    date: 'Feb 10, 2026',
    sourceName: 'ASPCA',
    sourceUrl: 'https://www.aspca.org/pet-care/general-pet-care/finding-lost-pet',
    summary: 'The first 60 minutes after a dog goes missing are the most critical. Evidence-based steps to maximize your chances of a quick reunion.',
    body: [
      'The first hour after losing your dog is critical. Most dogs are found within a 1-mile radius of where they went missing — staying calm and acting systematically will maximize your chances of a quick reunion.',
      '1. Search the immediate area in a spiral pattern, calling your dog\'s name calmly. Panicked shouting can scare a frightened dog further away.',
      '2. Leave a piece of your worn clothing or your dog\'s bedding near the last known location. Familiar scents act as anchors.',
      '3. Notify nearby shelters and veterinary clinics immediately. Many reunions happen within 24 hours when shelters are alerted fast.',
      '4. Post on local social media groups with a clear photo, description, and your phone number. Avoid posting your exact home address.',
      '5. Use a lost-pet reporting platform like PETTODO to create a digital alert with real-time map tracking and AI-assisted matching.',
      'Remember: do not leave flyers with your home address. Use a phone number only, and arrange handoff at a neutral safe point.',
    ],
  },
  {
    id: 'body-language',
    title: 'Understanding canine body language',
    category: 'Behavior',
    date: 'Jan 28, 2026',
    sourceName: 'American Kennel Club',
    sourceUrl: 'https://www.akc.org/expert-advice/training/how-to-read-dog-body-language/',
    summary: 'Dogs communicate almost entirely through body posture and facial expression. Learning to read these signals prevents misunderstandings and bite incidents.',
    body: [
      'Dogs communicate almost entirely through body posture, tail position, ear angle, and facial expression. Misreading these signals is a leading cause of bite incidents, especially between unfamiliar dogs.',
      'A relaxed dog has a loose, wagging tail, soft eyes, and weight distributed evenly. The mouth may be slightly open.',
      'A fearful dog tucks its tail, flattens its ears, avoids eye contact, and may yawn or lick its lips repeatedly. These are calming signals — not signs of guilt.',
      'An aroused or overstimulated dog stiffens its body, raises its hackles, holds its tail high, and makes direct, sustained eye contact. This is a warning, not aggression — but it should be respected.',
      'Whale eye (showing the whites of the eyes) is one of the clearest distress signals. Back away slowly and give the dog space.',
      'When introducing dogs, watch for play bows (front legs stretched, rear end up) — a universal invitation to play. If one dog repeatedly turns away, allow them to disengage.',
    ],
  },
  {
    id: 'vaccine-schedule',
    title: 'Vaccination schedule guide for puppies and adult dogs',
    category: 'Health',
    date: 'Feb 1, 2026',
    sourceName: 'VCA Animal Hospitals',
    sourceUrl: 'https://vcahospitals.com/know-your-pet/puppy-vaccination-schedule',
    summary: 'A complete guide to core and non-core vaccines, timing windows, and how to stay compliant without over-vaccinating.',
    body: [
      'Vaccines are one of the most effective tools for preventing life-threatening infectious diseases in dogs. Understanding the schedule helps you stay compliant without over-vaccinating.',
      'Core vaccines (recommended for all dogs): Distemper, Parvovirus, Adenovirus/Hepatitis (combined as DA2PP or DHPP), and Rabies.',
      'Puppy schedule: First dose at 6–8 weeks, then booster every 2–4 weeks until 16 weeks old. Rabies is given at 12–16 weeks.',
      'After the puppy series, a booster is given at 1 year. After that, core vaccines are typically given every 1–3 years depending on your veterinarian\'s protocol and local regulations.',
      'Non-core vaccines (given based on risk factors): Bordetella (kennel cough), Leptospirosis, Lyme disease, and Canine influenza. Dogs that visit parks or doggy daycare frequently are strong candidates.',
      'PETTODO stores your vaccination records and sends automatic reminders before each due date. You can upload certificates directly to the Document Vault.',
    ],
  },
  {
    id: 'play-date-intro',
    title: 'How to safely introduce dogs at a play date',
    category: 'Social',
    date: 'Jan 15, 2026',
    sourceName: 'PetMD',
    sourceUrl: 'https://www.petmd.com/dog/training/how-introduce-dogs',
    summary: 'Proper introductions between unfamiliar dogs prevent conflict and set the stage for lasting friendships. A neutral location and loose-leash greeting are essential.',
    body: [
      'A proper introduction sets the foundation for a safe and positive play date. Rushing the process is the single most common mistake dog owners make.',
      'Step 1: Choose a neutral location — a park or quiet street, never one dog\'s home territory. Home dogs often feel the need to defend their space.',
      'Step 2: Arrive with both dogs on a loose leash. A tight leash communicates tension to the dog and escalates arousal.',
      'Step 3: Allow a brief parallel walk before any direct greeting. Walk side by side 10–15 feet apart for 2–3 minutes.',
      'Step 4: Allow the dogs to approach each other in a curved arc (not head-on). Direct face-to-face approaches are considered rude in dog body language.',
      'Step 5: Keep initial greetings to 3–5 seconds, then call your dog away calmly. This prevents overwhelm and teaches the dogs that meetings are calm events.',
      'Step 6: Once both dogs are relaxed, release them to play in a safely fenced area. Intervene only if one dog is repeatedly fleeing or vocalizing in distress.',
    ],
  },
  {
    id: 'anti-scam',
    title: 'Protecting yourself from lost-pet scams',
    category: 'Emergency',
    date: 'Feb 5, 2026',
    sourceName: 'Better Business Bureau',
    sourceUrl: 'https://www.bbb.org/article/news-releases/23058-bbb-scam-alert-lost-pet-scams-target-desperate-pet-owners',
    summary: 'Lost-pet scams are on the rise. Learn the red flags, how to verify claims, and why you should never pay anything before a safe, in-person handoff.',
    body: [
      'When a pet goes missing, owners become emotionally vulnerable — and scammers know this. Lost-pet scams increased significantly in recent years, targeting people at their most desperate moments.',
      'Common scam patterns: A stranger claims to have found your pet and asks for money to "cover transport costs" before handing the animal over. This is almost always a scam.',
      'Red flag 1: Any request for money before you see your pet in person at a neutral location. Legitimate finders do not ask for upfront payment.',
      'Red flag 2: Refusal to provide a live video call showing your pet. A real finder will gladly show the dog is safe. This is called Proof of Life.',
      'Red flag 3: Pressure to use gift cards, wire transfers, or cryptocurrency. These payment methods are irreversible and preferred by scammers.',
      'What to do: Always arrange handoffs at a verified safe point — a veterinary clinic, shelter, or police station. PETTODO maintains a list of vetted safe points in your area. Report any suspected scammer directly through the case chat.',
    ],
  },
  {
    id: 'microchip-guide',
    title: 'Microchipping your dog: what it is and why it matters',
    category: 'Health',
    date: 'Jan 20, 2026',
    sourceName: 'AVMA',
    sourceUrl: 'https://www.avma.org/resources/pet-owners/petcare/microchipping-your-animal',
    summary: 'A microchip is a permanent, tamper-proof identification that dramatically increases reunion rates for lost dogs. Here\'s what you need to know.',
    body: [
      'A microchip is a small, passive radio-frequency transponder (about the size of a grain of rice) inserted under the skin between the shoulder blades. It stores a unique 15-digit ID number.',
      'When a lost dog is brought to a shelter or clinic, staff scan for a chip using a universal reader. The ID links to your contact information in a national database.',
      'Studies show microchipped dogs are returned to their owners at a rate 2.5 times higher than non-chipped dogs (AVMA, 2024).',
      'Important: A microchip only works if the database record is kept up to date. After moving or changing your phone number, update your registration immediately.',
      'The procedure takes seconds, costs approximately $25–$50, and requires no anesthesia. Most dogs react no more than they would to a standard vaccination.',
      'PETTODO stores your microchip number in your pet\'s profile and displays it on the QR public page, so anyone who scans your pet\'s tag can immediately see whether a chip is registered.',
    ],
  },
];
