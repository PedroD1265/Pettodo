# PRD_MVP_WEBAPP

Purpose:
Define the real MVP for PETTODO's current execution phase: a usable web app for real pilot testing.

What belongs here:
- MVP goal
- target users
- core problems solved
- scope in / out
- must-have user flows
- trust/privacy rules
- release criteria at product level

Update rule:
Update when the MVP scope, release target, or pilot strategy changes.

---

## 1. Product definition

PETTODO MVP WebApp is a real pilot-ready web application for managing and recovering pets, while also functioning as a community-support network for animals in urban environments.

It is not only a lost-pet tool.
Its role is to create value before emergencies, during emergencies, and in selected controlled community-animal scenarios.

The MVP is designed to help people:
- register animals
- build useful animal identity over time
- use QR/public pages
- create lost / found / sighted cases
- receive possible matches
- share a case quickly
- coordinate contact more safely
- contribute to controlled Community Dog records
- avoid exposing sensitive data unnecessarily

This MVP is not the full PETTODO ecosystem.
It is the first real operational version intended for pilot testing.

---

## 2. MVP objective

Launch a usable PETTODO web app that works as a real product for pilot testing in Cochabamba.

The MVP must stop being a frontend-only demo and become a real web-based system with:
- real sign-in
- real persistence
- real image upload/storage
- real public animal profile flows
- real case creation
- real QR-linked public access
- controlled Community Dog creation
- real protected contact flow
- practical AI-assisted workflows
- enough trust and safety to test with real users

---

## 3. Product loop

### Official primary loop
User arrives
→ registers an animal
→ creates digital identity (profile + QR + usable history)
→ uses daily management features
→ builds animal history over time
→ PETTODO is ready if loss or emergency happens

### Secondary loop
User or community creates/report cases
→ visibility increases
→ probable matches appear
→ protected communication or reports happen
→ recovery or case resolution becomes possible

### Community loop
A community-visible animal is identified
→ profile is created in a controlled way
→ local contributions and evidence accumulate
→ visibility and record quality improve over time

---

## 4. Pilot context

### Pilot city
- Cochabamba

### Pilot reality
The first real version should be built for local testing and iteration, not as a generic abstract product.

### Expansion stance
The product should remain structurally scalable to other cities in Bolivia after pilot validation.

---

## 5. Animal scope

PETTODO is a multi-animal product.

### Operational emphasis
- strongest early depth for dogs
- strong support for cats
- extensible support for other animals over time

The product should not behave as if only dogs matter, even if dogs receive stronger operational attention in the first phase.

---

## 6. Animal profile model

PETTODO distinguishes animal identity from case status.

### Animal Profile categories
- **Owned Pet**
- **Community Dog**
- **Stray Dog**
- **Unknown Animal**

These are profile states/types, not case types.

### Case types
- **Lost**
- **Found**
- **Sighted**

These are event states, not animal identity.

### Match result types
- **Probable Match**
- **Strong Match**
- **No Match**

These are system outputs, not profile identity.

### Important rule
Not every dog seen in the street is automatically a Community Dog.

Classification may evolve when new evidence appears.

Examples:
- Unknown Animal → Owned Pet
- Stray Dog → Community Dog
- Community Dog → Owned Pet

---

## 7. Digital identity of the animal

Digital identity is a core concept of the MVP.

An animal identity may include:
- profile
- name (if known)
- species
- type/state classification
- photos
- visible traits
- QR
- public profile
- action history
- evidence
- associated cases
- match context

This identity should improve:
- daily usefulness
- public recognizability
- match quality
- emergency readiness

---

## 8. Account and access policy

### Public / low-risk access may include
- browsing public landing content
- viewing selected educational content
- viewing selected services
- scanning QR
- viewing public animal profiles
- viewing public cases

### Account-based access is required for
- creating animal profiles
- creating cases
- uploading images
- editing owned-pet records
- creating or contributing to Community Dogs
- using sensitive AI-assisted functions
- initiating protected workflows
- handling sensitive public interactions

### Additional verification may be required for higher-risk features
Examples:
- trust-sensitive interaction between users
- certain community features
- higher-risk contact or exchange flows
- future social or marketplace features

### Login stance
The MVP should support low-friction sign-in, with strong encouragement toward Google/Gmail-based onboarding.

Onboarding should remain brief at first, with progressive completion of additional user data as features require it.

---

## 9. Core user types

### 9.1 Pet owner
A person who registers and manages one or more animals and may create a lost case.

### 9.2 Finder / helper
A person who finds or spots an animal and wants to:
- report it
- compare possible matches
- help return it safely
- or create a visible record if the animal is not yet in the system

### 9.3 Community caregiver
A person who helps track or care for a Community Dog and may:
- register a community-visible dog
- log sightings
- propose care-related actions
- contribute evidence-backed public information
- improve visibility without converting every case into an emergency

### 9.4 Moderator / operator
A trusted internal or elevated role used for reviewing sensitive records, disputes, and moderation.

---

## 10. Core problems the MVP solves

### Problem 1
Pet recovery is fragmented and chaotic.

### Problem 2
People who find or see an animal often do not know:
- whether it already has an owner-linked identity
- whether it is a Community Dog
- how to contact safely
- whether they should create a case, a sighting, or a new profile

### Problem 3
A QR or public profile should help connect an animal to useful identity without exposing unnecessary private data.

### Problem 4
Animals visible in the community need continuity and record quality without being confused with emergency cases or random street sightings.

### Problem 5
Owners need a useful reason to use the app before a pet gets lost.

---

## 11. MVP success criteria

The MVP is successful if pilot users can:

- sign in with low friction
- register animals
- create useful animal identity
- generate or access QR-linked public profiles
- create lost / found / sighted cases
- upload useful photos
- receive possible matches
- view controlled public animal pages
- share flyer/link outputs
- safely initiate contact without exposing owner data by default
- distinguish owned pets from Community Dogs and other categories
- contribute to Community Dogs through controlled, evidence-aware workflows

---

## 12. Core MVP scope

## 12.1 In scope

### A. Authentication and user access
- low-friction sign-in
- account/session management
- public low-risk browsing
- account-required sensitive workflows
- support for progressive user profile completion

### B. Animal records
- create animal profile
- edit owned-pet profile
- basic attributes
- multi-animal support
- photo upload
- visible traits

### C. Digital identity and QR
- QR generation
- QR-linked public profile
- public profile with current visible status
- if animal is currently lost, QR/public flow must support reporting a sighting
- public profile should connect identity, status, and safe next actions

### D. Emergency cases
- create LOST case
- create FOUND case
- create SIGHTED case
- approximate public area only
- basic timeline/status progression

### E. Photo and image pipeline
- upload images
- quality gate
- image storage
- images used for matching and public profile display

### F. Match flow
- suggest possible matches
- score + reasons
- match detail view
- AI-assisted ranking
- no automatic identity certainty claim
- final case-sensitive confirmation still requires human/community logic where needed

### G. Public profile logic
- owned pet public profile
- Community Dog public profile
- controlled visibility
- no-match / possible-match flow
- create new profile when appropriate and allowed

### H. Sharing outputs
- public link
- QR-linked access
- fixed-template flyer/social output
- ready-to-share text/copy
- no AI-generated poster art required

### I. Safety and contact
- protected contact logic by default for owned pets
- optional owner-controlled contact reveal when allowed in the flow
- no unnecessary public address exposure
- anti-scam / safe-handoff framing
- controlled public visibility

### J. Community Dogs
- create a Community Dog profile in a controlled way
- show likely matches before allowing new creation
- require nearby user + AI review + minimal human validation for creation
- add sightings
- add evidence-backed actions
- maintain visible public operational history
- distinguish community records from active emergency cases

### K. Actions + Evidence
The MVP should support the concept that relevant animal actions can have evidence attached.

Examples:
- vaccine
- sterilization
- feeding
- sighting
- care-related updates

Critical trust-sensitive actions may require stronger evidence than lightweight actions.

### L. Admin / moderation minimum
- basic review capability
- dispute handling readiness
- abuse/suspicion handling minimum
- controlled change requests for sensitive public/shared records

---

## 12.2 Out of scope for the first real beta

These may exist in the broader PETTODO vision, but they are not first-release priorities:

- fully mature walkers marketplace
- fully mature play dates system
- fully mature social communities system
- sponsor rewards / points economy maturity
- advanced partner donation ecosystems
- native Android/iOS as the main release target
- full reputation engine maturity
- advanced AI planning as a complete mature system
- full legal/insurance/partner workflows

---

## 13. Community Dog governance in MVP

Community Dogs are included in MVP, but in a constrained form.

### Creation requirements
A new Community Dog profile should require:
- nearby user context
- AI review
- minimal human/community validation

### Sensitive modifications
Certain changes must not be freely editable.
Examples:
- name changes
- vaccine-related updates
- sensitive care/health status changes

These should go through:
- AI review
- and/or nearby-user confirmation
- and/or moderator/community confirmation

### Change-request principle
Shared animal records should support controlled change requests rather than unrestricted editing.

---

## 14. Matching and AI principles

### Matching rule
The system suggests similarity.
It does not treat AI output as universal identity certainty.

### Match output should include
- score
- reasons
- caution framing
- next action

### AI role
AI may assist with:
- match ranking
- image analysis
- photo quality checks
- evidence review
- moderation assistance

### AI authority stance
The system may rely more heavily on AI in bounded operational tasks such as:
- image quality classification
- match scoring/ranking

But trust-sensitive public record changes should not depend only on AI.

---

## 15. Public visibility and trust rules

### Core rules
- exact address should not be publicly shown
- exact coordinates should not be publicly shown
- public location should remain approximate
- owner data should not be exposed by default
- public data should be minimized
- Community Dog visibility may be broader than owned-pet visibility, but still controlled
- not all shared/public actions can bypass review
- PETTODO must reduce abuse, confusion, and unsafe handoffs

### Contact rule
Owned-pet contact is protected by default.
The owner may choose to reveal additional contact detail within allowed flows, but direct exposure is not the default state.

### Public-data principle
Expose only the minimum information needed to help identify, care for, or recover the animal.

---

## 16. Location principle

### Public location
Only approximate location should be shown publicly.

### Private coordination
Exact or more precise location sharing belongs inside protected/private interaction contexts.

### Special visibility logic
The system may use different public map logic depending on:
- owned pet
- Community Dog
- Stray Dog
- active lost case

But public exact location should remain restricted.

---

## 17. QR behavior

QR is an active identity and recovery mechanism.

When scanned, the QR/public flow should show:
- public animal profile
- animal status
- protected contact option
- recovery action if relevant

If the animal is currently lost, the QR/public flow should include:
- **Report sighting**

---

## 18. Product UX stance

### Required UX qualities
- mobile-first web experience
- low friction
- no dead ends
- no blank states
- practical usefulness before emergency
- clear but not brand-dominant Daily/Emergency mode logic
- serious, useful, trust-oriented experience
- warm but reliable product voice

---

## 19. Non-functional goals

The MVP should be:
- pilot-usable
- understandable to non-technical users
- safe enough to test with real people
- documentation-friendly
- architecture-ready for real infra
- extensible into a broader PETTODO ecosystem

---

## 20. MVP release decision rule

The MVP is ready for beta only if all are true:

- authentication is real
- persistence is real
- image upload/storage is real
- owned-pet profile creation is real
- public QR/profile flow is real
- case creation is real
- match suggestion flow is real
- protected contact flow is real
- Community Dog creation is controlled
- public-data behavior is consistent
- owned pet vs Community Dog vs Stray vs Unknown logic is clear
- no critical privacy contradiction remains open

---

## 21. Open items still to be finalized elsewhere

These should be finalized in dedicated docs:
- exact public data field policy
- exact moderation thresholds
- exact nearby-user validation mechanics
- exact evidence requirements per action type
- exact reputation-system behavior
- exact architecture implementation
- exact AI service implementation details
