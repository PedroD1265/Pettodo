# MASTER_CONTEXT

Purpose:
Short, stable, non-contradictory context for PETTODO. This file is the first reference for humans and AI agents before working on any PETTODO task.

What belongs here:
- What PETTODO is
- Current official product direction
- Current official execution stack
- MVP scope for the current phase
- Rules for separating current reality vs future vision
- High-level non-contradictory constraints

Update rule:
Update only when core product direction, stack ownership, MVP scope, or strategic execution changes.

---

## 1. Project identity

**PETTODO is a community-powered network for managing and recovering pets.**

PETTODO is not only a lost-pet app.
It is a product designed to create everyday value for pet owners and animal caregivers, while becoming especially useful when an animal is lost, found, sighted, or needs coordinated community support.

PETTODO combines:
- pet management
- animal identity
- emergency recovery
- community participation
- controlled public visibility
- AI-assisted workflows

---

## 2. Product concept

PETTODO has two functional product modes inside one experience:

- **Emergency mode**
- **Daily mode**

### Daily mode
Prioritizes:
- pet registration
- pet profile
- feeding
- vaccines
- documents
- QR identity
- education
- useful tools for daily care
- selected community and service visibility

### Emergency mode
Prioritizes:
- lost / found / sighted reporting
- map and animal visibility
- possible matches
- QR-based access
- flyer / public link
- protected contact
- coordinated recovery actions
- reduced distraction and higher relevance in notifications

Important:
Emergency vs Daily is a **functional product logic**, not the dominant brand expression.
It may be visible in the interface, but it should not feel like two separate products or two separate brands.

---

## 3. Core product loop

The main loop of PETTODO is not “wait until a pet gets lost.”

### Official primary loop
User arrives
→ registers a pet
→ creates useful digital identity for that animal
→ uses daily management features
→ builds animal history over time
→ PETTODO is ready if loss or emergency happens

Principle:
PETTODO should create value before an emergency, not only during one.

### Secondary emergency loop
Animal is lost / found / sighted
→ case is created
→ visibility increases
→ matches or probable matches appear
→ protected contact / reports happen
→ recovery or resolution becomes possible

### Community loop
A community-visible animal is registered
→ local users contribute sightings or care-related actions
→ evidence and history accumulate
→ profile becomes more reliable over time

---

## 4. Animal model and system layers

PETTODO separates three different concepts.

### A. Animal profile
Defines what the animal currently is in the system.

Initial categories:
- **Owned Pet**
- **Community Dog**
- **Stray Dog**
- **Unknown Animal**

Important:
Not every dog seen in the street is automatically a Community Dog.
Classification must be explicit and can evolve with new evidence.

Examples:
- Unknown Animal → Owned Pet
- Stray Dog → Community Dog
- Community Dog → Owned Pet

### B. Case
Describes what is happening around the animal.

Case types:
- **Lost**
- **Found**
- **Sighted**

A case is an event, not the identity of the animal.

### C. Match result
Describes what the system thinks about similarity between records.

Match types:
- **Probable Match**
- **Strong Match**
- **No Match**

PETTODO should not treat similarity as the same thing as identity.

---

## 5. Digital identity of the animal

Digital identity is a central concept in PETTODO.

PETTODO builds a useful digital identity for each animal over time.

This identity may include:
- animal profile
- photos
- visible traits
- QR
- public profile
- action history
- evidence
- associated cases
- matching context

This identity should improve:
- usefulness in daily care
- clarity of public visibility
- quality of matching
- recovery readiness

---

## 6. Current official direction

Current official direction for this phase:

- The core product is the **Replit web app**
- The landing page is handled separately, mainly in **Lovable**
- **GitHub** is used for repositories and documentation
- **pettodo-docs** is the curated documentation hub
- **Azure** is part of the preferred infrastructure direction
- **GCP / Gemini** are part of the preferred AI and advanced capability direction
- AI Studio is no longer the main delivery track
- The immediate goal is a **real usable web app** for pilot testing
- Android/iOS are a **future stage after web validation**, not the current delivery priority

Important:
This is the current preferred direction, not the full technical specification.
For technical implementation details, see `ARCHITECTURE.md`.

---

## 7. Current MVP for this phase

The current MVP is a real pilot-ready web app focused on the highest-value product loops.

### In scope now
- pet registration
- animal profile creation
- digital identity building
- QR-linked public profile access
- lost / found / sighted cases
- map and search flows
- match suggestions
- flyer/share kit
- protected contact flow
- real authentication
- real storage and persistence
- public profile and case visibility
- controlled Community Dog creation and contribution
- owned pet vs community dog distinction
- admin / moderation minimum
- pilot-ready web deployment

### Community Dogs in MVP
Community Dogs are part of the MVP, but in a controlled form.

This means:
- they are included from the beginning
- they are publicly visible in a controlled way
- their creation and critical updates must be moderated by system logic, evidence, and/or validation
- they must not grow into an uncontrolled open wiki

### Not the immediate scope
These may remain in the broader product vision, but are not the first release priority:
- fully mature walkers marketplace
- full play dates system
- advanced communities/events systems
- full trust/reputation maturity
- sponsor rewards, donations, and ecosystem incentives
- full mobile-native apps as the main current deliverable

---

## 8. Access, account, and user friction

PETTODO allows different levels of access depending on risk.

### Public or low-risk access may include
- browsing landing content
- reading education/library content
- viewing selected services
- scanning QR
- viewing public animal profiles
- viewing public lost/found/sighted cases

### Account-based access is required for
- creating animal profiles
- creating cases
- uploading images
- using sensitive AI-driven functions
- editing owned-pet records
- creating or contributing to Community Dogs
- interacting with sensitive public data
- initiating important contributions or protected workflows

### Additional verification may be required for higher-risk interactions
Examples:
- community interactions between users
- play dates
- hiring walkers
- sensitive trust-based exchanges
- actions that affect shared or public animal records

### Account onboarding stance
PETTODO should keep onboarding light.
Google/Gmail sign-in is preferred and should feel frictionless.
Additional user data should be completed progressively when required by a feature.

---

## 9. Multi-animal scope

PETTODO is designed for multiple animal types.

In practice:
- dogs currently receive the strongest operational emphasis
- cats are also a major supported category
- other animals should remain possible within the product structure

The system should not behave as if dogs are the only valid animal type, even if they receive earlier operational depth.

---

## 10. Public trust and safety stance

PETTODO is privacy-first and trust-sensitive.

Core permanent principles:
- more risk = more verification
- no unnecessary exposure of private owner data
- public flows should prefer protected contact
- public location should be approximate, not exact
- public identity should reveal only the minimum useful information
- public visibility rules differ between owned pets and community animals
- the system should reduce fraud, confusion, and unsafe handoffs
- not all community-facing actions can bypass review
- user-generated changes to shared animal records must be controlled

### Minimum public exposure principle
PETTODO should expose only the minimum public information necessary to help identify, care for, or recover an animal.

### Contact principle
Protected contact is the default for owned pets.
Direct contact may exist only when explicitly allowed by the owner in the relevant flow.

---

## 11. QR principle

The QR is an active identity and recovery tool.

When someone scans a QR, PETTODO should show:
- the public profile of the animal
- the current visible status of that animal
- protected contact options
- relevant recovery actions when applicable

If the animal is currently lost, the QR flow should support reporting a sighting.

---

## 12. AI principle

PETTODO is designed to include AI in multiple parts of the product.

The product should clearly state that AI is part of the planned and active system direction, without tying the product to one provider in this document.

AI may assist with:
- image analysis
- photo quality checks
- matching and similarity analysis
- evidence review
- moderation support
- workflow assistance
- structured recommendations

Important:
AI does not replace all human or community validation.

### AI authority stance
AI may drive bounded operational decisions in some areas such as:
- photo quality classification
- match ranking and similarity analysis

But sensitive trust-based actions, especially around shared public records, may require additional human, moderator, or community confirmation.

For technical AI implementation details, see `ARCHITECTURE.md`.

---

## 13. Pilot context

Current pilot focus:
- Cochabamba

Cochabamba is the pilot city, not the final territorial limit of the product.

PETTODO should be built with a real local pilot mindset, while staying structurally scalable to other cities in Bolivia.

---

## 14. Positioning and tone

PETTODO should be understood primarily as:
- a community network for the care and safety of pets
- a practical system for managing and recovering animals
- a useful digital layer for animals in urban environments

### Tone
PETTODO should use a hybrid tone.

#### More institutional / trustworthy when dealing with:
- loss and recovery
- health-sensitive actions
- community dogs
- public trust
- reports
- vaccination
- shared public records

#### More warm / human when dealing with:
- pet care
- education
- daily use
- supportive community features
- non-sensitive interactions

---

## 15. What PETTODO is not

To avoid future confusion:

- PETTODO is **not only** a lost-pet app
- not every street dog is automatically a Community Dog
- PETTODO does **not** expose owner personal data by default
- PETTODO is not currently defined as a marketplace-first product
- PETTODO is not an unrestricted public editing system for animals

---

## 16. Documentation rule

This file is the top-level stable context, not the full history and not the full technical specification.

Agents should read:
1. `MASTER_CONTEXT.md`
2. `CURRENT_STATE.md`
3. the specific workstream document for the task
4. the latest relevant handoff

For technical implementation details, see:
- `ARCHITECTURE.md`

Agents should not:
- treat future vision as implemented reality
- mix pilot MVP scope with long-term ecosystem ambitions
- mix product context with hackathon-specific or grant-specific framing unless the task explicitly requires it

---

## 17. Certainty policy

When documenting PETTODO:
- use **[confirmed]** for directly supported project evidence or explicit current decisions
- use **[probable]** for strong but not fully locked interpretations
- use **[unknown]** where the project has not decided yet

Do not invent certainty.
