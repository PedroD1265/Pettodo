# SCREEN_ROUTE_MAP

Purpose:
Define the official route and screen structure for PETTODO’s MVP web app so product, Replit implementation, QA, moderation, and future handoffs all use the same routing logic, access boundaries, and beta-priority screen map.

What belongs here:
- official route groups for the PETTODO web app
- screen families and their product purpose
- public vs authenticated vs elevated-access route boundaries
- beta-critical vs lower-priority route areas
- route structure rules that preserve PETTODO product truth
- navigation and grouping logic for implementation and QA

Update rule:
Update when PETTODO’s official MVP route structure, access boundaries, beta-critical screen families, or navigation model changes materially.

---

# 1. Why this document exists

PETTODO already has broad UI and route coverage.

What is still missing is an official route-and-screen map that defines:

- which route families are core to the real MVP
- which route families are public vs protected
- which screens are beta-critical
- which areas exist in prototype but are not first-beta maturity priorities
- how Daily and Emergency logic should coexist
- how trust-sensitive screens remain separated from public browsing

This document is not the final frontend file tree.  
It is the operational screen map used by product, build, QA, and documentation.

---

# 2. What this document is and is not

## This document is

- the official route-group map for the PETTODO web app
- a screen-family reference for product, build, and QA
- a routing truth layer between PRD and implementation
- a way to separate beta-critical surfaces from lower-priority breadth

## This document is not

- the full PRD
- the final UI inventory of every visual state
- the final code route list
- the backend API contract
- the landing page documentation

---

# 3. Core route mapping principles

## 3.1 Route map must follow product truth

The route structure must preserve PETTODO’s core truths:

- PETTODO is not only a lost-pet app
- Daily and Emergency belong in the same product
- animal profile is not the same as case
- case is not the same as match result
- protected contact is the default
- public location must remain approximate

---

## 3.2 Screen existence does not equal beta priority

A screen existing in the prototype does not automatically make it beta critical.

This document separates:

- beta-critical route groups
- high-priority supporting groups
- prototype breadth not required for first beta

---

## 3.3 Public and protected surfaces must be separated

Routes must clearly distinguish:

- public routes
- authenticated routes
- elevated trust routes
- moderator/operator routes

---

## 3.4 Daily and Emergency are modes

Daily care and Emergency recovery must live in the same product system.

Some screens are daily-first.  
Some screens are emergency-first.  
They should not behave like separate applications.

---

# 4. Access model

## Public routes

Accessible without login.

Examples:

- landing
- public animal profile
- public case page
- QR scan result
- public reporting entry
- share links

Public routes must respect privacy and approximate location rules.

---

## Authenticated routes

Require user login.

Examples:

- creating animal profiles
- editing owned animals
- opening cases
- uploading images
- contributing to Community Dogs
- initiating protected contact
- managing account settings

---

## Elevated verification routes

Some flows may require additional checks:

- protected contact escalation
- sensitive record edits
- ownership-sensitive actions
- moderation operations

---

## Moderator / operator routes

Internal review and moderation surfaces.

These routes:

- require role-based access
- are not publicly visible
- must remain auditable

---

# 5. Official route groups

---

# Route Group A — Public Entry and Discovery

Purpose:
Public entry and understanding of PETTODO.

Examples:

- landing page
- how PETTODO works
- selected educational content
- services discovery
- public search entry

Access:
Public

Priority:
Supporting

---

# Route Group B — Authentication and Account Entry

Purpose:
Handle login and onboarding.

Examples:

- sign-in
- Google login
- account recovery
- first profile setup

Access:
Public entry → authenticated session

Priority:
Critical

---

# Route Group C — Main App Shell and Home

Purpose:
Provide the primary application interface.

Examples:

- authenticated home
- quick actions
- navigation hub
- recent activity

Access:
Authenticated

Priority:
Critical

---

# Route Group D — Animal Identity and Owned Pets

Purpose:
Handle the main PETTODO loop of digital pet identity.

Examples:

- my animals list
- create animal
- edit animal
- animal profile
- photos
- traits
- documents
- care history

Access:
Authenticated

Priority:
Critical

---

# Route Group E — QR and Public Animal Identity

Purpose:
Manage QR identity and public animal profiles.

Examples:

- QR management
- QR scan result
- public animal profile
- public next actions
- report sighting from QR

Access:
Mixed (public and authenticated)

Priority:
Critical

---

# Route Group F — Emergency Case Management

Purpose:
Handle lost, found, and sighted cases.

Examples:

- create lost case
- create found case
- create sighted case
- case detail
- case timeline
- case status updates
- resolve case

Access:
Authenticated for creation  
Public viewing may exist in limited form

Priority:
Critical

---

# Route Group G — Reports and Sightings

Purpose:
Collect structured community input.

Examples:

- report sighting
- found report
- public contribution entry
- report confirmation

Access:
Mixed

Priority:
Critical

---

# Route Group H — Matching and Map Discovery

Purpose:
Provide similarity suggestions and geographic discovery.

Examples:

- possible matches
- match detail
- score explanation
- map view
- nearby discovery

Access:
Mixed

Priority:
Critical

Matching results are advisory and must never be presented as proof.

---

# Route Group I — Protected Contact

Purpose:
Allow communication while protecting identity.

Examples:

- contact request
- relay thread
- safe coordination
- reveal decision when allowed

Access:
Authenticated

Priority:
Critical

---

# Route Group J — Community Dogs

Purpose:
Handle shared dog identity and contributions.

Examples:

- community dogs discovery
- community dog profile
- creation proposal
- sightings timeline
- care contributions
- change requests

Access:
Mixed

Priority:
Critical but controlled

---

# Route Group K — Actions and Evidence

Purpose:
Store historical actions tied to animals.

Examples:

- vaccination record
- sterilization record
- feeding update
- evidence upload
- action timeline

Access:
Authenticated

Priority:
High

---

# Route Group L — Sharing and Flyers

Purpose:
Generate shareable outputs.

Examples:

- flyer generation
- share preview
- share links

Access:
Authenticated for generation  
Public for viewing

Priority:
High

---

# Route Group M — Notifications and Settings

Purpose:
Handle personal operational features.

Examples:

- notifications
- inbox
- settings
- privacy controls
- verification status

Access:
Authenticated

Priority:
High

---

# Route Group N — Moderation and Review

Purpose:
Support trust and safety operations.

Examples:

- review queue
- abuse review
- shared-record review
- moderation decisions

Access:
Moderator / operator only

Priority:
Critical minimum

---

# Route Group O — Secondary Ecosystem Features

Purpose:
Represent additional ecosystem surfaces not required for first beta.

Examples:

- walkers
- play dates
- extended community features

Access:
Mixed

Priority:
Lower

---

# 6. Beta priority classification

## Critical

- Authentication
- Main App Shell
- Animal Identity
- QR Identity
- Case Management
- Reports
- Matching
- Protected Contact
- Community Dogs
- Moderation

## High

- Actions and Evidence
- Sharing
- Notifications and Settings

## Supporting

- Public entry
- Secondary ecosystem features

---

# 7. Navigation guidance

Authenticated navigation should prioritize:

- Home
- My Animals
- QR
- Cases
- Community
- Notifications
- Settings

Emergency shortcuts should always be easy to access.

---

# 8. Route prefix structure

Recommended structure:

- `/` landing
- `/auth/...` authentication
- `/app/...` authenticated routes
- `/animals/...` animal profiles
- `/cases/...` case routes
- `/qr/...` QR access
- `/public/...` public views
- `/community/...` community dogs
- `/contact/...` protected contact
- `/admin/...` moderation

Exact paths may evolve but must preserve clear boundaries.

New real-data routes added in Case Baseline fix pack:
- `/emg/lost-select-pet` — Real pet selection for lost reports (uses `petApi.list()`)
- `/emg/cases` — Real case discovery/list (uses `caseApi.list()`)

---

# 9. Route state rules

Public animal views must differ from owner management screens.

Case state must remain separate from animal identity.

Match results must be presented as suggestions.

Community contributions must support review states such as:

- pending
- approved
- rejected

---

# 10. Canonical screen journeys

Primary journey:

User → login → create animal → build identity → generate QR → manage daily care → ready for emergencies

Lost animal journey:

User → open animal → create lost case → upload images → see matches → share flyer → coordinate contact → resolve case

Found animal journey:

User → scan QR or view public profile → report sighting → structured report → recovery coordination

Community dog journey:

User → discover community dog → contribute sightings/actions → record evolves with review

---

# 11. QA usage

QA should validate functionality by route groups rather than isolated screens.

This allows clearer reporting of readiness by product surface.

---

# 12. Replit usage

Development should use this map to determine:

- where new features belong
- whether a route is public or protected
- whether a route is critical for beta

---

# 13. What this document does not finalize

This document does not finalize:

- every exact URL
- final component tree
- final UI copy
- final navigation labels
- final API contract

---

# 14. Final rule

PETTODO’s route structure must support a real operational product.

If routing blurs boundaries between identity, cases, matches, contact, and moderation, it is incorrect.

If routing preserves clarity, safety, and operational logic, it aligns with PETTODO’s MVP direction.
