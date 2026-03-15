# LEGAL_PRIVACY

Purpose:
Define PETTODO’s current legal and privacy baseline for the MVP phase so product, Replit implementation, QA, moderation, and public-facing behavior remain aligned with privacy-first, trust-sensitive rules while the project moves from advanced prototype to real pilot-usable web app.

What belongs here:
- legal/privacy posture for the current MVP phase
- scope and limits of this document
- privacy principles for PETTODO
- practical rules for personal data, animal data, public data, contact, evidence, logs, and AI-related processing
- correction, deletion, retention, and access-control baseline
- third-party service and processor stance
- what PETTODO must and must not claim publicly from a legal/privacy perspective
- open legal/privacy items still requiring formalization

Update rule:
Update when PETTODO’s privacy model, user-data handling, public-data posture, provider stack, consent/contact model, retention stance, or legal readiness materially changes.

---

## 1. Why this document exists

PETTODO is not just a static website or a harmless prototype.

It is becoming a real web app that handles:

- user accounts
- animal identity records
- public animal pages
- QR-linked flows
- lost / found / sighted cases
- protected contact
- Community Dog records
- evidence-backed actions
- moderation and audit signals
- AI-assisted workflows

That means PETTODO needs a legal/privacy baseline that is operational enough for product and implementation work now, even before the full public-facing legal texts are finalized.

This document exists to define that baseline.

It is not the final public Privacy Policy.
It is not the final Terms of Service.
It is not a substitute for formal legal counsel.
It is the internal source-of-truth baseline for how PETTODO should behave in the current MVP phase.

---

## 2. Scope of this document

This document applies to the current MVP phase of PETTODO and covers:

- privacy-first product behavior
- internal legal/privacy posture for MVP decisions
- handling of personal data and animal-related data
- public vs protected information boundaries
- consent and permission logic in practical product terms
- correction, deletion, and retention direction
- logging and auditability stance
- third-party provider posture
- communication claims that must remain legally and ethically safe

This document does not finalize:

- public legal copy word-for-word
- country-specific statutory language
- final terms of service wording
- final privacy notice wording
- final retention durations for every data type
- full incident response policy
- full partner/NGO/legal-institution workflow language
- full future marketplace/service legal framework

Those should be finalized later with dedicated public legal texts and, where necessary, legal review.

---

## 3. Current legal/privacy posture

PETTODO’s current MVP legal/privacy posture is:

- privacy-first
- trust-sensitive
- minimum-exposure by default
- controlled rather than open-edit
- protective of owner identity
- careful with location data
- cautious with community/shared records
- audit-aware
- honest about what is and is not yet implemented

PETTODO should not behave like:

- an unrestricted public directory of owner contact information
- an exact live map of private pet locations
- an open anonymous editing system for shared animal records
- a product that treats AI output as legal or factual certainty
- a product that overclaims maturity or guarantees outcomes

---

## 4. Core legal/privacy principles

## 4.1 Minimum necessary exposure

PETTODO should expose only the minimum information needed to help identify, care for, or recover an animal safely.

If a field is not needed for that purpose, it should not be public by default.

---

## 4.2 Owner protection by default

Owner personal information must not be exposed by default.

Protected contact remains the default interaction model for owned pets unless a more direct reveal is explicitly allowed inside the relevant protected flow.

---

## 4.3 Approximate public location only

Public location must remain approximate, not exact.

Exact or more precise coordination belongs only in protected or restricted workflows when legitimately needed.

---

## 4.4 Shared/public records are controlled

Community-facing animal records may be more public than owned-pet records, but they must not become unrestricted open-edit pages.

Sensitive shared-record changes require stronger proof and controlled review.

---

## 4.5 More risk means more verification

The higher the trust, privacy, safety, or public-impact risk of an action, the stronger the verification, review, and access control should be.

---

## 4.6 Auditability matters

PETTODO may record relevant access, contribution, review, and suspicious-activity events for moderation, accountability, abuse prevention, and internal trust operations.

Logging should be proportionate and privacy-aware.

---

## 4.7 Trust over convenience

If a feature creates unacceptable privacy, abuse, fraud, or moderation risk, PETTODO should prefer safer defaults over lower friction.

---

## 4.8 Honest communication

PETTODO must not present prototype representation, AI inference, or partial implementation as if it were guaranteed legal/factual truth.

---

## 5. What PETTODO is and is not, legally and operationally

PETTODO in MVP is:

- a real pilot-oriented web app
- a system for managing and recovering pets
- a controlled community-support network for selected public/community animal scenarios
- a trust-sensitive product with public and protected surfaces

PETTODO in MVP is not:

- a government or law-enforcement system
- an insurance or legal adjudication platform
- a guarantee of recovery or identification
- a universal ownership-verification authority
- an unrestricted public animal-editing wiki
- a mature nationwide or fully scaled legal/compliance operation

This distinction matters for both product behavior and public claims.

---

## 6. Main data categories PETTODO handles

## 6.1 Account and identity data

Examples:
- email
- display name
- authentication identifiers
- optional phone if used in allowed flows
- account status
- role information

This data is personal data and should remain protected by default.

---

## 6.2 Animal identity data

Examples:
- animal name if known
- species
- classification type
- photos
- visible traits
- approximate area
- QR linkage
- action history
- associated cases
- match context

Not all animal-related data is personal data by itself, but some of it becomes sensitive when linked to owners, location, or contact flows.

---

## 6.3 Public profile and public case data

Examples:
- public-safe photos
- broad visible traits
- case type
- visible status
- approximate area
- safe next-action buttons
- QR/public page information

This data may be public only in the minimum useful form.

---

## 6.4 Protected contact and coordination data

Examples:
- protected contact thread data
- internal coordination context
- direct contact reveal state where allowed
- more precise recovery-related coordination details

This data belongs in restricted or private workflows, not open public views.

---

## 6.5 Contribution and evidence data

Examples:
- sighting reports
- care updates
- vaccine/sterilization evidence
- uploaded photos
- documents
- structured confirmations
- change requests

This data may affect public trust and therefore may require stronger review, especially in Community Dog workflows.

---

## 6.6 Moderation, abuse, and audit data

Examples:
- review decisions
- abuse flags
- suspicious-activity indicators
- internal moderation notes
- access logs to sensitive surfaces
- change-request history

This data is internal by default and must not be publicly exposed.

---

## 6.7 AI and processing metadata

Examples:
- image quality outcomes
- match ranking metadata
- provider/model metadata
- processing timestamps
- structured reasons bundles
- risk-related pre-review signals

This data may support product behavior internally, but it is not automatically public and should not be mistaken for legal certainty or final truth.

---

## 7. Visibility model from a legal/privacy perspective

PETTODO should operate with four practical visibility levels:

### Public
Visible to anyone, without account.

### Account-required
Visible only to logged-in users.

### Restricted / trusted workflow
Visible only inside controlled workflows.

### Private / internal
Not available to general users and not public.

Important:
A field being stored does not mean it is allowed to appear publicly.

Public output must always be derived through policy-aware shaping, not by exposing raw internal records directly.

---

## 8. Consent and permission logic

## 8.1 Account creation and app use

Users should understand that by creating an account and using PETTODO they are participating in a real system that may process:

- account data
- profile data
- case data
- uploaded media
- protected-contact interactions
- contribution/evidence data
- limited logging for safety and operations

This should later be reflected clearly in public-facing legal copy.

---

## 8.2 Owned-pet publishing and visibility

When an owner creates an owned-pet profile and enables public-facing identity elements such as QR/public profile behavior, the owner is effectively allowing PETTODO to show the approved public-safe subset of that animal’s data.

This does not mean:
- full owner identity becomes public
- exact location becomes public
- all profile fields become public
- direct contact becomes public by default

---

## 8.3 Protected contact and optional reveal

Protected contact is the default.

If direct reveal is ever allowed inside a recovery flow, it must remain:

- optional
- explicit
- clearly explained
- limited to the relevant flow
- reversible when product logic allows

PETTODO should not rely on silent or accidental consent for direct exposure.

---

## 8.4 Community contributions

Users contributing to Community Dogs or other shared/public contexts should understand that:

- their actions may be logged
- their contributions may go through review
- sensitive claims may require stronger proof
- not all proposed changes become visible immediately
- shared/public records are controlled, not personal notebooks

---

## 8.5 Evidence uploads

Users uploading evidence should do so only when they have the right or legitimate basis to submit it in the product context.

PETTODO should not encourage careless upload of material that is irrelevant, abusive, or unsafe to expose.

---

## 9. Community Dog legal/privacy stance

Community Dogs are intentionally more public-facing than owned-pet records, but they remain controlled shared records.

That means:

- Community Dogs are not unrestricted public-edit records
- sensitive changes should go through request-and-review logic
- exact contributor private information should not be public by default
- exact location history should not become a public trail when that creates safety risk
- AI may assist with review, duplicate suspicion, and moderation support, but should not auto-finalize every sensitive change

Community Dog logic should remain aligned with:
- controlled creation
- pending review support
- evidence-aware updates
- moderation minimum
- minimum necessary public exposure

---

## 10. Location and mapping from a legal/privacy perspective

Location is one of PETTODO’s highest-risk data areas.

Rules:

- public maps must use approximate location only
- exact address must not be public
- exact private-home location must not be public
- Community Dog visibility may show approximate habitual area, not exact trace history
- richer location layers may exist only inside account-required or protected workflows when justified
- access to sensitive visibility layers may be logged for abuse prevention and accountability

PETTODO must never behave like a public live-location service for private pets.

---

## 11. Correction, deletion, and ownership baseline

## 11.1 Owned-pet owner rights

Owners should retain strong control over data they publish about their own pets.

In the MVP direction, they should be able to:

- edit relevant profile data
- update visibility of publishable fields
- remove or change their own published material where product logic allows
- control whether certain contact details are revealed inside allowed flows

---

## 11.2 Shared/community record limits

Community/shared animal records must not be freely deleted or fully rewritten by one user without checks.

That means:
- shared records can be corrected
- shared records can evolve
- disputes can be handled
- but one contributor should not be able to casually erase or overwrite community truth

---

## 11.3 Correction principle

PETTODO should support correction of errors and disputes without making records unstable or easy to vandalize.

---

## 11.4 Deletion and retention caution

Exact deletion and retention mechanics are not fully finalized yet.

Until they are, PETTODO should behave conservatively:

- prefer reversible/archive-friendly patterns for trust-sensitive shared records
- avoid destructive deletion when it would break safety, moderation, or audit continuity
- avoid implying immediate full erasure in flows where legal/operational handling is not yet finalized

This must later be translated into clear public legal copy and operational tooling.

---

## 12. Retention and logging baseline

PETTODO may retain certain logs, review history, evidence references, and trust-relevant metadata as operationally necessary for:

- safety
- moderation
- accountability
- abuse prevention
- system trust
- dispute handling
- controlled shared-record governance

Important:
The exact retention schedule is still open and should be finalized later.

For now, PETTODO should follow these baseline rules:

- collect proportionately
- retain only what is operationally justified
- do not expose internal trust markers publicly
- do not promise retention/deletion behavior that the system cannot honestly support yet

---

## 13. Security and access-control baseline

Legal/privacy safety depends partly on technical implementation.

At minimum, the product direction requires:

- account-based access for creating profiles, cases, uploads, Community Dog contributions, and sensitive workflows
- stronger controls for higher-risk interactions
- protected contact for owned pets by default
- no client-side exposure of sensitive provider secrets
- environment-aware separation between local, preview/dev, and production
- role-protected moderation/operator areas
- audit-aware handling of sensitive flows

This document does not define the full security architecture, but these baseline expectations should guide implementation.

---

## 14. Third-party services and processor posture

PETTODO’s current architecture direction includes third-party infrastructure and service providers for key functions.

Current direction includes services such as:

- Firebase Auth for identity/authentication
- Azure Database for PostgreSQL for core transactional data
- Azure Blob Storage for media/assets
- Azure Functions for async/background processing
- Azure Key Vault for secrets management
- Vertex AI / Gemini for current AI provider direction

Practical rules:

- third-party providers should be used through environment-appropriate configuration
- secrets must not be exposed in the client
- provider use must stay aligned with PETTODO’s privacy-first posture
- AI/provider metadata may be retained where needed for auditability and future migration discipline
- PETTODO should avoid unnecessary provider lock-in at the application-logic level

Public-facing legal texts should later describe provider/processor roles appropriately.

---

## 15. AI from a legal/privacy perspective

AI in PETTODO may assist with:

- photo quality checks
- similarity and match ranking
- duplicate suspicion
- evidence pre-review
- moderation assistance
- structured recommendations

Important legal/privacy rule:

AI should not be treated as automatic legal or factual authority for trust-sensitive public record changes.

The product must avoid:
- certainty inflation
- guarantee language
- overstating what AI has proven
- suggesting that AI alone has legally resolved identity or ownership disputes

---

## 16. Public claims and language rules

From a legal/privacy and trust standpoint, PETTODO must not claim:

- guaranteed recovery
- guaranteed identity certainty
- unrestricted public editing
- default public exposure of owner contact
- exact public location exposure
- fully mature nationwide deployment if that is not true
- legal/compliance maturity the system does not yet actually have

Public language should remain:

- serious
- useful
- calm
- protective
- honest about pilot stage
- honest about AI assistance being support, not magic

---

## 17. Legal/privacy minimum required for first real beta

Before PETTODO is treated as ready for first real beta, these legal/privacy conditions should be materially true:

- owner data is not exposed by default
- public location remains approximate
- protected contact is real enough to use for owned pets
- public/private boundaries are enforced in real system behavior
- Community Dog creation is controlled
- sensitive shared-record changes are not unrestricted
- public profile / QR flows are policy-safe
- no critical privacy contradiction remains open
- implementation does not materially contradict the documented privacy/trust baseline

If those conditions are not true, legal/privacy readiness is not good enough for honest beta.

---

## 18. Open items still requiring formalization later

The following remain open and should not be fake-finalized here:

- final public Privacy Policy text
- final Terms of Service text
- exact retention and deletion periods
- exact legal incident/escalation process
- exact user-facing consent copy
- exact country/jurisdiction-specific legal review language
- full future marketplace/service legal framework
- full partner/NGO/institution workflow terms
- final public legal handling for every edge case involving disputes, abuse, or evidence conflict

These should be handled in later legal/public-facing documents and, where necessary, formal review.

---

## 19. Final rule

PETTODO should become legally and privacy-wise more trustworthy as it becomes more real.

If the product becomes more public, more connected, and more AI-assisted while staying vague about exposure, consent, shared-record control, and protected contact, the model is wrong.

If the product remains privacy-first, minimum-exposure, controlled, review-aware, and honest about what is and is not yet finalized, it is aligned with PETTODO’s MVP direction.
