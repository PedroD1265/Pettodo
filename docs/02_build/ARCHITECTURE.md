# ARCHITECTURE

Purpose:
Define the recommended technical architecture for PETTODO’s current MVP phase: a real, pilot-usable web app built from the current Replit product base, with real infrastructure, real persistence, real auth, real storage, real public/profile flows, controlled trust-sensitive workflows, and an AI layer that can evolve without locking the product to one provider forever.

What belongs here:
- architecture principles
- v1 recommended architecture
- runtime layer ownership
- infra and service responsibilities
- auth strategy
- data and storage strategy
- AI service architecture
- geospatial and matching architecture
- protected contact architecture
- moderation/admin architecture
- environments and deployment strategy
- observability and security basics
- future scalable architecture
- brief migration guidance beyond Replit

Update rule:
Update when the official runtime stack, primary infrastructure direction, auth strategy, AI-provider strategy, deployment model, or core production architecture changes materially.

---

## 1. Why this document exists

PETTODO already has strong product breadth and a serious prototype.
What it does not yet have is a fully real production architecture.

This document exists to define:

- what runs where
- what should become real first
- what should stay simple in v1
- how PETTODO uses Replit, Azure, Google, and Lovable without chaotic overlap
- how the product stays flexible enough to switch AI providers later
- how the team can move from prototype to real pilot web app

This document is for the current MVP execution phase, not the full long-term ecosystem.

---

## 2. Certainty rule

Use PETTODO certainty tags consistently:

- **[confirmed]** = directly supported by current PETTODO docs or explicit user decisions
- **[probable]** = strong operational recommendation, but not fully locked forever
- **[unknown]** = still not fully decided

Do not present a recommendation as if it were already implemented reality.

---

## 3. Source-of-truth relationship

This document should be interpreted together with:

- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `PRD_MVP_WEBAPP.md`
- `PUBLIC_DATA_POLICY.md`
- `TRUST_AND_SAFETY.md`
- `QA_CURRENT.md`
- `RELEASE_CRITERIA.md`

Interpretation rule:
- `MASTER_CONTEXT.md` defines the stable top-level product direction.
- `CURRENT_STATE.md` defines what is real today and what is still simulated.
- `PRD_MVP_WEBAPP.md` defines what the MVP must become.
- `PUBLIC_DATA_POLICY.md` and `TRUST_AND_SAFETY.md` define minimum acceptable risk and visibility behavior.
- this file defines how those decisions should be implemented technically.

If those documents conflict, stable product truth and actual implementation reality win.

---

## 4. Architecture goals for this phase

### 4.1 Primary goal
**[confirmed]**

Turn PETTODO from an advanced frontend prototype into a real pilot-usable web app for Cochabamba.

### 4.2 Architecture goals
**[confirmed]**
- keep the current Replit product track alive
- avoid rebuilding the product from zero
- introduce real auth
- introduce real persistence
- introduce real image storage
- introduce real QR/public profile behavior
- introduce real case handling
- introduce real protected contact
- introduce controlled Community Dog workflows
- introduce practical AI-assisted workflows
- preserve room to migrate compute later
- avoid unnecessary multi-cloud fragmentation

### 4.3 Non-goal for this phase
**[confirmed]**
This architecture is not trying to optimize first for:
- nationwide scale on day one
- mobile-native apps first
- a fully mature marketplace layer
- a fully mature social/reputation layer
- a one-cloud purity rule at the cost of startup-program leverage or product fit

---

## 5. Core architecture principles

### 5.1 One platform = one clear job
**[confirmed]**

PETTODO should not split the same core responsibility across multiple overlapping systems without a clear reason.

### 5.2 Reuse the strong prototype
**[confirmed]**

The architecture should extend the current Replit-based product instead of discarding the existing work.

### 5.3 Azure should carry serious operational weight
**[confirmed / user decision]**

Azure should not be decorative.
It should handle meaningful production responsibilities so PETTODO has a defensible Azure-based operational story.

### 5.4 Google should carry real identity + AI weight
**[confirmed / user decision]**

Google services should also have a real role, especially where they help PETTODO:
- reduce friction in onboarding
- strengthen visual and multimodal intelligence
- support a credible AI-first startup narrative without making AI the entire product

### 5.5 AI provider must be replaceable
**[confirmed]**

The product should be architected so that:
- one AI provider is active at a time
- switching provider does not require rewriting the whole product
- AI outputs flow through internal contracts, not provider-specific UI assumptions
- embeddings and extracted attributes preserve provider/version metadata so they can be regenerated or migrated later if needed

### 5.6 Trust-sensitive flows must remain controlled
**[confirmed]**

Protected contact, public profile exposure, Community Dog governance, and sensitive record changes must remain architecture-level concerns, not UI-only promises.

### 5.7 Mobile-first web now, mobile packaging later
**[confirmed]**

The product must feel like a real mobile-first app on the web first.
Android/iOS packaging comes after the web beta is stable enough.

### 5.8 External system of record
**[confirmed]**

Replit remains the delivery environment in v1, but the real product state must not depend on Replit-local storage.
Core records must live outside the app host.

---

## 6. Official v1 recommended architecture

### 6.1 High-level layer ownership

#### Experience layer
**[confirmed]**
- **Replit** = main PETTODO web app
- **Lovable** = landing and marketing site only

#### Documentation and coordination layer
**[confirmed]**
- **GitHub** = repositories and issue/project coordination
- **pettodo-docs** = source of truth for stable project documents

#### Operational infrastructure layer
**[confirmed / recommended]**
- **Azure Blob Storage** = images, derived assets, flyers, documents
- **Azure Database for PostgreSQL** = primary transactional database and system of record
- **Azure Functions** = async jobs, processing, and background tasks
- **Azure Key Vault** = secrets and credentials source of truth
- **Azure Communication Services** = later-phase SMS, email, and communication support where needed

#### Identity and AI layer
**[confirmed / recommended]**
- **Firebase Auth** = low-friction sign-in, primarily Google sign-in
- **Vertex AI / Gemini** = photo understanding, embeddings, structured extraction, AI assistance

### 6.2 Important interpretation rule
**[confirmed]**

These are the official recommended services and responsibilities for v1 architecture.
This does not mean every part is already implemented today.

---

## 7. Official v1 deployment shape

### 7.1 Public domains
**[recommended]**
- `pettodo.app` = landing
- `www.pettodo.app` = redirect to landing or same landing
- `app.pettodo.app` = main PETTODO web app

### 7.2 Future optional domains
**[recommended]**
These are useful future candidates, not current mandatory commitments:
- `admin.pettodo.app` = future admin/operator interface if separated
- `api.pettodo.app` = future external API domain if compute separates later

### 7.3 Current hosting stance
**[confirmed]**
The app stays in Replit for now.

### 7.4 Future hosting stance
**[confirmed / user direction]**
The architecture should be prepared to move core runtime out of Replit in the near future if needed, without changing product semantics.

### 7.5 Landing hosting stance
**[confirmed]**
Lovable is for landing and public marketing only, not the app core.

---

## 8. Runtime model

### 8.1 Current app runtime
**[confirmed / recommended]**
PETTODO runs initially as a web app served from Replit.

### 8.2 Backend stance in v1
**[confirmed / recommended]**
In v1, the main application runtime and primary request/response backend may still live inside the Replit-served app.

This means:
- the main web app and its primary backend logic may still ship together at first
- Azure Functions should be used for async, background, and processing-heavy work
- the architecture should still keep service boundaries clean so backend logic can later be extracted without rewriting the domain model

### 8.3 Recommended Replit deployment stance
**[recommended]**
For the main app in v1:
- default to a deployment mode suited to variable app and API traffic
- only use an always-on runtime shape if a persistent worker or permanently connected process becomes truly necessary
- keep background-heavy or slow work off the main request path where possible

### 8.4 Recommended app structure inside v1
**[recommended]**
Use the app in a way that already separates concerns logically, even if physically still deployed together:

- frontend UI layer
- application and service layer
- data access layer
- integration adapters layer
- AI adapter layer

This helps later extraction into independent services without full rewrite.

### 8.5 Replit role in v1
**[confirmed / recommended]**
Replit should handle:
- primary web app hosting
- app runtime during beta
- fast iteration
- early environment variables
- rapid product shipping

### 8.6 What Replit should not permanently own
**[recommended]**
Replit should not become the long-term hidden owner of:
- all secrets permanently
- all data storage
- all asynchronous processing
- all AI-provider assumptions
- all future scale decisions

That logic should already be designed to live outside the Replit deployment if needed.

---

## 9. Environments

### 9.1 Official environment set for this phase
**[confirmed / user decision]**
- **local**
- **preview/dev**
- **production**

### 9.2 Local
**[confirmed]**
Used when working from:
- VS Code
- local code review
- Antigravity-assisted local or near-local iteration
- integration testing before pushing

### 9.3 Preview/dev
**[confirmed]**
Used for:
- Replit preview or non-production deploys
- feature validation
- QA before real beta
- integration testing with cloud services

### 9.4 Production
**[confirmed]**
Used for:
- real pilot testing
- app domain
- controlled real-user usage

### 9.5 Environment rule
**[confirmed / recommended]**
Every external service should support separate configuration by environment:
- auth settings
- database connection
- storage container or bucket
- AI provider credentials
- communication credentials
- feature flags where needed

---

## 10. Identity and access architecture

### 10.1 Primary auth approach
**[confirmed / recommended]**
Use Firebase Auth as the primary identity system for v1.

#### Primary login mode
- Google sign-in first

#### Optional fallback
- secondary auth method later if needed

#### Additional verification
- reserved for higher-risk actions
- not part of the default onboarding path

#### Phone/SMS stance
**[recommended]**
Phone and SMS verification should remain secondary until PETTODO validates real deliverability, cost, and operational reliability for Bolivia.

### 10.2 Why this is recommended
**[probable / strong recommendation]**
Firebase Auth gives:
- low-friction web onboarding
- good fit with the Google/GCP strategy
- faster time to pilot
- cleaner Google-account-first onboarding aligned with the PRD

### 10.3 Access model
**[confirmed]**

#### Public / no-login
May include:
- landing
- viewing selected public profiles
- viewing selected public cases
- scanning QR
- viewing public QR pages
- selected educational or general content

#### Auth-required
Required for:
- creating animal profiles
- creating cases
- uploading images
- editing records
- contributing to Community Dogs
- initiating protected workflows
- using sensitive AI-assisted flows
- handling trust-sensitive interactions

#### Additional verification later
Reserved for:
- protected contact escalation
- ownership-sensitive actions
- moderator/operator actions
- sensitive shared-record changes

### 10.4 Admin/operator access
**[confirmed / recommended]**
Do not create a totally separate auth system for admin in v1.

Use:
- the same auth provider
- role-based access control
- allowlisted operator accounts and/or role claims
- route protection in app/admin surfaces
- audit logging for sensitive admin actions

#### Recommended initial admin model
- same login provider
- role = `moderator` or `operator`
- admin UI visible only to authorized users
- no public discoverable admin actions

This is a minimum internal moderation surface, not a requirement for a huge enterprise-style admin suite on day one.

---

## 11. Data architecture

### 11.1 Official system of record
**[confirmed / recommended]**
Use Azure Database for PostgreSQL Flexible Server as the primary transactional database.

### 11.2 Why PostgreSQL is recommended
**[probable / strong recommendation]**
It allows PETTODO to keep:
- core relational data
- geospatial extensions
- vector support
- audit/history logic
- flexible querying

inside one serious operational data system.

### 11.3 Recommended extension direction
**[recommended]**
- **PostGIS** for geospatial logic
- **pgvector** for embedding storage and similarity operations

Important:
Enable and validate the required extensions against the selected Azure PostgreSQL server version and configuration before treating them as active implementation reality.

### 11.4 Core domain data families
**[recommended]**
The architecture should expect at least these data families:

#### Identity and accounts
- users
- user roles
- verification state
- account preferences

#### Animals
- animal records
- animal classification/state
- visible traits
- public/private field flags
- QR linkage

#### Cases
- lost cases
- found cases
- sighted cases
- case status
- case history
- case visibility

#### Media
- photos
- photo metadata
- derived thumbnails/crops
- photo quality results
- embeddings references

#### Matching
- match candidates
- match scores
- score reasons
- ranking metadata
- review outcome
- provider metadata for generated embeddings or extracted attributes

#### Community Dog contribution
- sightings
- meals/care contributions
- evidence attachments
- change requests
- moderation state

#### Trust and moderation
- protected contact events
- moderation decisions
- audit logs
- abuse/suspicion flags
- review states

#### Sharing
- public pages
- flyer/share artifact references
- public link tokens
- QR tokens

### 11.5 Data modeling rule
**[confirmed]**
The architecture must preserve the conceptual separation between:
- animal profile
- case
- match result

These are not the same entity and must not collapse into one table-thinking model.

---

## 12. Storage and file architecture

### 12.1 Primary object storage
**[confirmed / recommended]**
Use Azure Blob Storage for:
- original uploaded photos
- normalized photos
- thumbnails and crops
- flyer/share artifacts
- supporting documents where allowed
- other binary assets

### 12.2 Recommended storage containers / logical groups
**[recommended]**
Keep files logically separated, for example:
- `animal-originals`
- `animal-derived`
- `case-originals`
- `case-derived`
- `public-assets`
- `flyers`
- `documents`
- `moderation-evidence`

Exact names can change, but the separation matters.

### 12.3 Storage security rule
**[confirmed / recommended]**
Storage should be private by default.

Public access should happen through:
- explicitly public derived assets
- controlled public URLs
- signed or short-lived access where appropriate
- app-level permission checks where needed

### 12.4 Image-processing rule
**[confirmed / recommended]**
On upload, the system should support:
- file validation
- normalization
- derived version generation
- metadata extraction
- handoff to quality gate and AI pipeline

---

## 13. AI architecture

### 13.1 Core AI architecture rule
**[confirmed]**
PETTODO must be AI-capable but not AI-locked.

The app should use an internal AI service layer so the product talks to:
- a PETTODO AI interface

not directly to one provider’s UI contract.

### 13.2 Recommended AI service contracts
**[recommended]**
Create provider-agnostic internal contracts such as:
- `photoQualityService`
- `embeddingService`
- `attributeExtractionService`
- `matchRankingService`
- `moderationAssistService`
- `searchRecommendationService`

### 13.3 Internal-vs-provider distinction
**[confirmed]**
The internal AI contracts are the stable architecture layer.
The active provider is replaceable.

This means:
- product logic should depend on PETTODO contracts
- provider adapters should sit behind those contracts
- changing the provider should not force UI or domain-model redesign

### 13.4 Primary provider recommendation for v1
**[confirmed / recommended]**
Use Vertex AI / Gemini as the primary AI provider layer in v1.

#### Why
- better fit for the current GCP/Gemini direction
- better fit for multimodal and image-oriented workflows in the current plan
- helps justify real Google/GCP usage
- aligns with the desire for meaningful AI usage without tying the whole infrastructure to Google

### 13.5 AI usage areas in v1
**[confirmed / recommended]**
AI may assist with:
- photo quality checks
- image analysis
- extraction of structured visible attributes
- embeddings generation
- match ranking support
- moderation assistance
- later natural-language suggestions

### 13.6 AI authority boundary
**[confirmed]**
AI may be more decisive in bounded operational tasks such as:
- photo usability classification
- match scoring and ranking support

But trust-sensitive public record changes must not depend only on AI.

---

## 14. Matching and photo-intelligence architecture

### 14.1 Product rule
**[confirmed]**
Matching is a suggestion-and-review system, not an automatic identity oracle.

### 14.2 Recommended matching pipeline

#### Stage A — cheap photo quality gate
**[confirmed / recommended]**
Do not send every photo directly to the expensive AI path.

Start with:
- blur detection
- brightness/exposure checks
- framing checks
- single-animal vs multi-animal checks where possible
- minimum usable subject size
- duplicate/perceptual hash checks

Result:
- usable
- questionable
- poor

#### Stage B — AI quality fallback
**[recommended]**
Only if the heuristic layer is uncertain, allow a lighter AI-assisted quality assessment.

#### Stage C — normalization
**[recommended]**
For good-enough photos:
- create thumbnails
- create normalized versions
- optional subject-focused crops
- store outputs in Blob Storage

#### Stage D — advanced extraction
**[recommended]**
Use the active AI provider to produce:
- embeddings
- visible attributes
- useful structured descriptors

#### Stage E — ranking
**[confirmed / recommended]**
Final match ranking should combine:
- visual similarity
- attribute similarity
- geo-temporal proximity
- species/type consistency
- case state compatibility
- QR or profile linkage where applicable

#### Stage F — thresholds
**[recommended]**
Use human-readable output bands such as:
- suggestion
- candidate
- strong match

Never treat a score alone as permission to expose private data.

### 14.3 Public scan rule
**[confirmed / user decision]**
If a public scan identifies an owned pet, the public result should remain limited and safe.

If a public scan identifies a Community Dog, the system may show broader animal-facing information consistent with policy and governance.

If no exact match is found, the system may show likely candidates and allow the user to create a new profile if appropriate.

---

## 15. Public profile and QR architecture

### 15.1 QR is an active product flow
**[confirmed]**
QR is not decorative.
It must connect to a real public profile, status, and recovery surface.

### 15.2 Owned Pet QR/public behavior
**[confirmed / recommended]**
Public output should show only the minimum useful information, such as:
- public photo
- visible status
- name if allowed
- protected contact entry point
- recovery action if relevant
- approximate location only when relevant and allowed

### 15.3 Community Dog QR/public behavior
**[confirmed / recommended]**
Community Dog public records may show broader information than owned pets, but still under controlled governance.

Possible public-facing data may include:
- photos
- public name if used
- broader history/care context
- meal/care records where appropriate
- route/zone-level community visibility
- contribution prompts

Important:
This must still be controlled, not reckless or wiki-like.

### 15.4 If currently lost
**[confirmed]**
The QR/public flow should support:
- **Report sighting**

---

## 16. Protected contact architecture

### 16.1 Recommended model for v1
**[recommended]**
Use a protected relay-first model.

The default should be:
- user initiates protected contact
- system mediates the contact event
- owner personal data is not publicly exposed by default

### 16.2 Optional reveal model
**[confirmed / recommended]**
Allow optional owner-controlled direct reveal only in approved flows and only as an explicit choice.

### 16.3 Why relay-first is recommended
**[probable / strong recommendation]**
It is the safest balance for v1:
- reduces scraping
- reduces harassment
- reduces scams
- aligns with public-data policy
- allows later addition of stronger verification without redesigning the whole product

### 16.4 Contact-event architecture should support
**[recommended]**
- event logging
- rate limiting
- anti-abuse checks
- case linkage
- optional evidence or proof requests in sensitive cases
- later SMS or additional verification if needed

---

## 17. Community Dogs and moderation architecture

### 17.1 Community Dog creation model
**[confirmed / user decision]**
Use:
- account-required creation
- likely-candidates shown first
- AI pre-review where helpful
- nearby/community confirmation where relevant
- admin/operator review for sensitive cases

### 17.2 Important validation rule
**[confirmed]**
Community Dog creation and sensitive updates must not rely only on account presence plus AI suggestion.

For trust-sensitive cases, the flow should preserve the minimum human/community validation path already defined for PETTODO.

### 17.3 Sensitive shared-record changes
**[confirmed / user decision]**
Use simplified review states:
- `pending_review`
- `approved`
- `rejected`

### 17.4 Admin/operator role
**[confirmed / recommended]**
Admin is not a separate app identity system in v1.
It is a protected role inside the same identity system.

Admin/operator should be able to:
- review pending changes
- approve/reject change requests
- review suspicious activity
- resolve shared-record conflicts
- close or flag abusive cases
- manage public-record safety issues

### 17.5 Nearby confirmation
**[confirmed / recommended]**
Nearby/community confirmation may exist as a supporting signal, but should not replace operator control in sensitive situations.

### 17.6 Review principle
**[confirmed]**
Shared/public record changes should not be unrestricted direct edits.

---

## 18. Geo-search and heatmap architecture

### 18.1 V1 recommendation
**[confirmed / recommended]**
Heatmaps and search guidance in v1 should be deterministic and geospatial, not LLM-first.

### 18.2 V1 inputs may include
**[recommended]**
- last seen point
- time elapsed
- zone density
- road/path logic
- barriers
- parks/markets/vets/shelters
- sightings history
- home area if relevant
- sighting confidence

### 18.3 Why this is recommended
**[probable / strong recommendation]**
This gives:
- lower cost
- more traceability
- easier QA
- easier defense before users, judges, partners, or startup reviewers

### 18.4 Future AI support
**[probable]**
Later AI may help:
- explain the search plan
- summarize the case
- prioritize zones
- combine weak signals
- suggest next actions in language

But the core v1 heatmap should not depend on a generative model.

---

## 19. Async jobs and background processing

### 19.1 Recommended async layer
**[confirmed / recommended]**
Use Azure Functions for background and event-driven work such as:
- image normalization
- thumbnail/crop generation
- embedding generation jobs
- attribute extraction jobs
- share artifact generation jobs
- notification or message preparation
- moderation queue processing
- scheduled cleanup or maintenance tasks

### 19.2 Why async matters
**[confirmed / recommended]**
Heavy or slow operations should not block the main user request path in the Replit app.

---

## 20. Share kit and flyer generation architecture

### 20.1 Official v1 rule
**[confirmed]**
Do not depend on generative image creation for flyers.

### 20.2 Recommended approach
**[confirmed / recommended]**
Use:
- fixed branded templates
- structured case data
- auto-filled copy
- HTML/CSS rendering
- export to PNG/PDF
- prebuilt aspect ratios for key share surfaces

### 20.3 AI role here
**[recommended]**
AI may optionally help with:
- short copy
- long copy
- bilingual variants
- WhatsApp-ready text

But the visual output should remain template-driven.

---

## 21. Security architecture baseline

### 21.1 Secret management
**[confirmed / recommended]**
Use Azure Key Vault as the long-term secret source of truth.

In practical v1 execution, runtime secrets may still be mirrored into Replit environment variables where required, but the architecture should treat Key Vault as the serious secrets layer.

### 21.2 Basic security requirements
**[confirmed / recommended]**
- no provider secret exposed in client
- no direct AI key exposed in frontend
- no unrestricted storage access
- no unrestricted moderation/admin routes
- public/private data separation at API/domain level
- audit logging for sensitive actions

### 21.3 Communication layer
**[confirmed / recommended]**
Keep Azure Communication Services as the preferred communication layer for future SMS/email or sensitive notification workflows, especially if PETTODO decides to operationalize more verified contact or notification logic later.

Use only after real deliverability and cost validation when the feature is needed.

---

## 22. Observability and operations baseline

### 22.1 Minimum operational visibility for v1
**[recommended]**
The system should support at least:
- error logging
- async job visibility
- failed upload visibility
- failed AI job visibility
- moderation queue visibility
- basic analytics/events
- release/version awareness

### 22.2 Operational truth rule
**[confirmed / recommended]**
The team must know when a real integration failed.
Silent demo-like failure is not acceptable in real beta.

---

## 23. Credit / startup-program alignment

### 23.1 Azure usage justification
**[confirmed / recommended]**
This architecture gives Azure real operational weight through:
- Blob Storage
- PostgreSQL
- Functions
- Key Vault
- later Communication Services

This creates a real Azure infrastructure story, not a decorative one.

### 23.2 Google usage justification
**[confirmed / recommended]**
This architecture gives Google real usage through:
- Firebase Auth
- Vertex AI / Gemini

This creates a real Google identity + AI story, not a decorative one.

### 23.3 Important rule
**[confirmed]**
Startup-program alignment should support the product.
It must not distort the product into a fragile multi-cloud mess.

---

## 24. Services intentionally not in the core v1 architecture

### 24.1 Akamai / Linode / similar temporary resources
**[confirmed / recommended]**
Do not make them core unless a specific need appears.
They are tactical resources, not part of the current recommended core architecture.

### 24.2 Retool
**[confirmed / recommended]**
Retool may be useful tactically for short-term admin/internal tooling experiments, but should not define the main product architecture for this phase.

---

## 25. Future scalable architecture

### 25.1 V1 recommended architecture
**[confirmed / recommended]**
- app runtime still in Replit
- landing in Lovable
- Azure as operational infra
- Firebase Auth
- Vertex AI / Gemini
- provider-agnostic AI layer
- role-based moderation/admin inside the app
- deterministic geospatial search v1

### 25.2 Future scalable architecture
**[confirmed / recommended]**
As the product stabilizes, move toward this shape:

#### Frontend
- web frontend remains modular and mobile-first
- later optional PWA optimization
- later optional native packaging or native apps

#### API / backend
- dedicated backend service separated from Replit runtime
- stable domain-based API layer
- same domain model preserved

#### Jobs
- async processing remains separated
- AI tasks and media tasks remain non-blocking

#### Data
- PostgreSQL remains system of record unless a real later decision changes it
- object storage remains abstracted behind a storage service contract

#### AI
- same internal AI contracts remain
- provider can be swapped
- historical embeddings and extracted attributes may need a migration strategy if provider changes

### 25.3 Default future migration direction
**[probable / recommended]**
If PETTODO exits Replit soon after beta hardening, the cleanest default is:
- keep frontend contract stable
- extract backend/API into containerized or managed runtime
- keep PostgreSQL + Blob + Key Vault + Functions layer intact
- move only the app compute first
- do not migrate auth, storage, and compute all at once unless necessary

---

## 26. Brief migration guidance beyond Replit

This section is intentionally brief and general.

### 26.1 Phase 1 — prepare while still on Replit
- keep service boundaries clean
- isolate provider adapters
- avoid frontend dependency on Replit-only assumptions
- centralize environment configuration
- keep database, storage, and auth external

### 26.2 Phase 2 — extract compute
- move API/backend logic to a dedicated runtime
- keep app URLs stable where possible
- preserve auth/session semantics
- preserve public/profile/QR routes

### 26.3 Phase 3 — harden production operations
- improve observability
- improve release automation
- improve background jobs
- improve operational dashboards
- improve scaling and rollback discipline

### 26.4 Migration rule
Do not move because moving sounds better.
Move only when Replit stops being the best speed/quality tradeoff for the stage.

---

## 27. What this document does not finalize

This document does not fully finalize:
- exact SQL schema
- exact API contract per route
- exact admin UI screens
- exact moderation thresholds
- exact evidence thresholds
- exact deliverability strategy for SMS in Bolivia
- exact rollback/deployment automation implementation
- exact provider-switch migration scripts for embeddings

Those may be defined in:
- implementation specs
- build workstream docs
- integration docs
- future ops/runbooks

---

## 28. Final rule

PETTODO v1 should be built as a real mobile-first web app on top of the current Replit product base, with Azure carrying serious operational infrastructure, Google carrying serious identity + AI value, and the architecture staying modular enough to evolve without a rewrite.

The goal is not the prettiest architecture diagram.

The goal is a real, defensible, usable system.
