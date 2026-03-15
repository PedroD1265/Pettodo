# TRUST_AND_SAFETY

Purpose:
Define the operational trust and safety rules for PETTODO’s MVP so sensitive actions, public/shared records, contact flows, evidence-backed contributions, moderation, and abuse handling work under consistent, risk-aware rules.

What belongs here:
- trust and safety principles
- risk tiers for actions and flows
- review and moderation logic
- protected contact safety rules
- Community Dog trust rules
- evidence and dispute handling
- AI limits in trust-sensitive workflows
- abuse prevention and escalation principles
- MVP minimum moderation requirements

Update rule:
Update when moderation logic, review thresholds, protected-contact behavior, abuse controls, AI authority boundaries, or public/shared-record trust rules materially change.

---

## 1. Why this document exists

PETTODO is designed to be useful in public and community-facing scenarios, but it cannot rely on openness alone.

The product includes:
- public animal visibility
- QR flows
- lost / found / sighted cases
- protected contact
- Community Dog records
- evidence-backed actions
- AI-assisted workflows

That combination requires formal trust and safety rules so PETTODO can:
- reduce fraud
- reduce confusion
- reduce unsafe handoffs
- avoid careless exposure
- prevent shared records from becoming unstable
- support real pilot use with controlled risk

This document complements:
- `PUBLIC_DATA_POLICY.md`
- `PRD_MVP_WEBAPP.md`
- future `ARCHITECTURE.md`

It does not replace legal terms, privacy policy, or detailed technical implementation specs.

---

## 2. Certainty rule

Use PETTODO certainty tags consistently:

- **[confirmed]** = directly supported by current PETTODO source-of-truth docs
- **[probable]** = strong operational interpretation, but not yet fully locked
- **[unknown]** = still not fully defined

Do not present a probable or unknown rule as if it were already final.

---

## 3. Scope

This document applies to trust- and safety-relevant product surfaces, including:

- public animal profiles
- QR-linked public pages
- public case pages
- protected contact flows
- Community Dog creation and editing
- shared/public animal record updates
- evidence-backed actions
- matching-related trust decisions
- contribution and review workflows
- abuse, dispute, and suspicious-behavior handling
- internal moderation minimum for the MVP

This document does not define:
- exact backend architecture
- exact database schema
- full legal/privacy text
- final trust/reputation engine
- exact technical thresholds for all automated systems

Those belong in other documents.

---

## 4. Core trust and safety principles

### 4.1 More risk = more verification
**[confirmed]**

The higher the trust, safety, or public impact of an action, the stronger the review and verification should be.

### 4.2 Minimum necessary exposure
**[confirmed]**

PETTODO should expose only the minimum information needed to help identify, care for, or recover an animal.

### 4.3 Protected contact by default
**[confirmed]**

For owned pets, protected contact is the default.
Direct owner contact must not be the default public state.

### 4.4 Approximate public location only
**[confirmed]**

Public location should remain approximate, not exact.

### 4.5 Shared records are controlled, not open-edit
**[confirmed]**

Shared/public animal records must not behave like unrestricted public-edit pages.

### 4.6 Trust over convenience
**[confirmed]**

If a feature creates unacceptable privacy, abuse, fraud, or moderation risk, PETTODO should prefer safer defaults over maximum openness.

### 4.7 AI assists, but does not replace all human judgment
**[confirmed]**

AI may assist with bounded operational tasks and pre-review, but trust-sensitive public record changes should not depend only on AI.

### 4.8 Auditability matters
**[confirmed]**

PETTODO may log relevant actions for moderation, accountability, abuse prevention, and system trust operations.

---

## 5. Trust-sensitive entities and roles

### 5.1 Trust-sensitive product entities
**[confirmed]**
- Owned Pet records
- Community Dog records
- Stray Dog / Unknown Animal records
- Lost / Found / Sighted cases
- evidence-backed actions
- protected contact interactions
- change requests on shared/public records
- matching outputs when they affect user decisions

### 5.2 Core user roles relevant to trust/safety
**[confirmed]**

#### Owner
Registers and manages animals and may publish a lost case.

#### Finder / helper
Reports or interacts around a found or sighted animal.

#### Community caregiver
Contributes to controlled Community Dog records and community-visible care context.

#### Moderator / operator
Handles sensitive review, disputes, suspicious behavior, and high-impact moderation decisions.

---

## 6. Practical risk tiers

PETTODO should use practical risk tiers to decide how much friction, review, and validation a flow needs.

### 6.1 Low-risk actions
**[confirmed / operational interpretation]**

Examples:
- browsing public profiles
- browsing public cases
- scanning QR
- viewing approximate map visibility
- lightweight sightings
- non-sensitive descriptive updates
- feeding logs with low public trust impact

Expected handling:
- low friction
- minimal review
- basic abuse protection
- logging where useful

### 6.2 Medium-risk actions
**[confirmed / operational interpretation]**

Examples:
- creating a case
- uploading images
- proposing edits to shared records
- adding public notes
- contributing some evidence-backed actions
- initiating protected contact
- proposing classification-relevant updates

Expected handling:
- account required
- system validation
- abuse controls
- possible AI pre-review
- possible pending-review state

### 6.3 High-risk actions
**[confirmed / operational interpretation]**

Examples:
- creating a new Community Dog public record
- changing vaccination/sterilization claims
- changing sensitive health-related public fields
- resolving disputes in shared/public records
- trust-sensitive contact/recovery coordination
- making a sensitive change visible on a shared public record
- taking enforcement action on abuse or fraud patterns

Expected handling:
- stronger review
- evidence-sensitive logic
- AI plus human/community validation where needed
- moderator/operator readiness
- no instant unchecked overwrite

---

## 7. Access and verification stance

### 7.1 Public access
**[confirmed]**

Public or low-risk access may include:
- viewing public profiles
- viewing public cases
- scanning QR
- consuming low-risk public information

This does not imply permission to modify, coordinate, or affect trust-sensitive state.

### 7.2 Account-required access
**[confirmed]**

Account is required for:
- profile creation
- case creation
- image uploads
- Community Dog creation
- meaningful public-data contribution
- sensitive workflow participation
- initiating protected workflows

### 7.3 Additional verification
**[confirmed]**

Some higher-risk features may require stronger verification than normal login.

Examples:
- high-impact community edits
- trust-sensitive user-to-user interaction
- future social/service interactions
- actions affecting shared/public records

### 7.4 MVP note
**[confirmed]**

The MVP should remain low-friction overall, but not at the cost of unsafe trust-sensitive flows.

---

## 8. Protected contact safety rules

### 8.1 Default stance
**[confirmed]**

Protected contact is the default for owned pets.

### 8.2 Product purpose of protected contact
**[confirmed / operational interpretation]**

Protected contact exists to:
- reduce scraping
- reduce harassment
- reduce scam risk
- avoid unnecessary owner-data exposure
- allow safer recovery coordination

### 8.3 Anti-abuse minimum
**[confirmed / constrained by existing docs]**

Protected contact flows should support abuse mitigation such as:
- rate limiting
- basic anti-bot or captcha measures
- suspicious-behavior detection
- event logging
- protected/private escalation if misuse appears

### 8.4 Optional direct-contact reveal
**[confirmed]**

When allowed in a recovery flow, direct contact reveal must remain:
- optional
- explicit
- reversible
- clearly explained to the owner

### 8.5 Exact implementation status
**[confirmed]**

A fully real protected-contact system is not yet implemented in production and remains part of the current MVP build work.

---

## 9. Community Dog trust rules

### 9.1 Community Dogs are included, but controlled
**[confirmed]**

Community Dogs are part of the MVP from the beginning, but they must remain controlled public records.

### 9.2 Creation rule
**[confirmed]**

A new Community Dog should not become a fully trusted public record without checks.

Creation should require:
- user account
- nearby-user context
- AI review
- minimal human/community validation

### 9.3 Sensitive modifications
**[confirmed]**

Certain modifications must not be freely editable.

Examples:
- name changes
- vaccination updates
- sterilization updates
- sensitive care/health status changes
- identity-critical changes under conflict

### 9.4 Change-request model
**[confirmed]**

Sensitive updates to shared/community records should use a request-and-review model rather than unrestricted direct overwrite.

### 9.5 Pending state
**[confirmed]**

PETTODO should support the concept of:
- pending review
- not all proposed changes becoming visible immediately

### 9.6 Community Dog safety boundary
**[confirmed]**

Community Dogs must not turn PETTODO into an uncontrolled public animal wiki.

---

## 10. Evidence and proof rules

### 10.1 PETTODO supports evidence-backed actions
**[confirmed]**

Relevant actions may carry evidence.

Examples:
- vaccination
- sterilization
- feeding
- sighting
- care-related updates
- some public-status updates

### 10.2 Evidence types may include
**[confirmed]**
- photo
- document
- structured user confirmation
- community confirmation
- moderator confirmation

### 10.3 Stronger evidence for stronger claims
**[confirmed]**

Actions affecting public trust, health trust, or safety should require stronger evidence than lightweight actions.

### 10.4 Lightweight actions
**[confirmed / constrained interpretation]**

Lower-risk actions may allow lighter evidence requirements.

Examples:
- feeding
- lightweight sighting
- minor descriptive updates

### 10.5 Evidence is not absolute truth by itself
**[probable]**

Uploaded evidence may support a claim, but some sensitive cases may still require review if:
- the evidence is weak
- the claim conflicts with prior record state
- the action has large public or health trust implications
- abuse or manipulation risk exists

---

## 11. Review layers and decision model

### 11.1 Review layers available in principle
**[confirmed]**

Depending on the action, review may include:
- AI review
- nearby-user confirmation
- moderator/community review
- evidence verification

### 11.2 AI review role
**[confirmed]**

AI may assist with:
- photo quality review
- duplicate detection
- probable match detection
- evidence pre-review
- suspicious-pattern detection
- moderation assistance

### 11.3 AI authority boundary
**[confirmed]**

AI may be more operationally decisive in bounded tasks such as:
- photo quality classification
- similarity analysis
- match ranking

But AI should not automatically finalize every trust-sensitive public-data change.

### 11.4 Human/operator review role
**[confirmed / operational interpretation]**

Human or moderator review is especially important when:
- a shared/public record is disputed
- the change is health-sensitive
- the change is identity-sensitive
- multiple users conflict
- the action may expose the platform to fraud or unsafe public information

### 11.5 Nearby-user/community confirmation
**[confirmed / partial]**

Nearby-user or community confirmation is part of the direction for some Community Dog workflows.

### 11.6 Exact thresholds
**[unknown]**

Exact thresholds for:
- how many confirmations are needed
- which users qualify
- what counts as enough evidence
- which actions bypass which layer

are not fully locked yet and should be finalized later in more detailed operational or architecture documentation.

---

## 12. Matching, identity, and caution rules

### 12.1 Match is not identity
**[confirmed]**

PETTODO must not treat similarity output as the same thing as confirmed identity.

### 12.2 Trust and UX rule for matches
**[confirmed]**

Matching output should include:
- score
- reasons
- caution framing
- next action

### 12.3 Unsafe certainty is prohibited
**[confirmed]**

The system must not present AI output as universal certainty for:
- ownership
- profile identity
- shared/public record truth
- final dispute resolution

### 12.4 Practical implication
**[confirmed / operational interpretation]**

A match may support:
- review prioritization
- user guidance
- next-step suggestion
- duplicate suspicion
- recovery assistance

It should not alone finalize sensitive public-trust state.

---

## 13. Abuse, fraud, and unsafe-use handling

### 13.1 PETTODO should actively reduce
**[confirmed]**
- fraud
- confusion
- scraping
- harassment
- unsafe handoffs
- vandalism of shared records
- careless exposure of private data

### 13.2 Abuse patterns the system should be ready for
**[confirmed / operational interpretation]**
- repeated protected-contact misuse
- scraping of public profiles or case pages
- false or manipulative public claims
- vandalism or hostile edits on shared records
- spam contributions
- attempts to overstate AI certainty
- malicious record duplication
- unsafe attempts to obtain precise location or direct owner data

### 13.3 Minimum product responses
**[probable / operational interpretation]**

Depending on severity, PETTODO may:
- slow the action
- require login
- require stronger verification
- place the action into pending review
- hide the change until reviewed
- restrict specific contribution capability
- flag the activity internally
- escalate to moderator/operator review

### 13.4 Anonymous high-impact action stance
**[confirmed / constrained interpretation]**

High-impact actions should not be treated as fully anonymous low-friction actions.

---

## 14. Disputes, corrections, and record stability

### 14.1 Correction principle
**[confirmed]**

PETTODO should support correction of errors and disputes without making shared records unstable or easy to vandalize.

### 14.2 Owned-pet control
**[confirmed]**

Owners retain strong control over their own published data, within platform safety limits.

### 14.3 Shared/public record stability
**[confirmed]**

Community/shared animal records should not be freely deleted or rewritten by one user without checks.

### 14.4 Dispute handling minimum
**[confirmed]**

The MVP should include minimum readiness for:
- basic review capability
- dispute handling
- abuse/suspicion handling
- controlled change requests for sensitive public/shared records

### 14.5 Internal resolution note
**[probable]**

When disputes cannot be safely auto-resolved, the system should favor:
- keeping the current trusted state stable
- placing the proposed change in review
- requesting more evidence
- routing to moderator/operator review

---

## 15. Logging and auditability

### 15.1 What may be logged
**[confirmed]**
- access to sensitive profile/case layers
- protected contact attempts
- contribution attempts
- review actions
- change requests
- suspicious activity indicators

### 15.2 Why logging exists
**[confirmed]**
- safety
- moderation
- abuse prevention
- accountability
- internal trust operations

### 15.3 Logging stance
**[confirmed]**

Logging should be proportionate and privacy-aware.

### 15.4 Visibility rule
**[confirmed / constrained interpretation]**

Internal trust, abuse, or moderation markers should not be public by default.

---

## 16. Transparency and user-facing trust cues

### 16.1 PETTODO should be clear, not theatrical
**[confirmed / tone-aligned interpretation]**

User-facing trust language should feel:
- serious
- useful
- calm
- protective
- not melodramatic
- not “AI magic”

### 16.2 Good examples of trust cues
**[probable]**
- protected contact
- pending review
- approximate area only
- verified evidence attached
- contributor history in limited form
- caution wording on matches

### 16.3 Things the product should avoid signaling
**[confirmed / aligned with current docs]**
- perfect certainty
- uncontrolled openness
- guaranteed recovery
- direct owner-data exposure by default
- “anyone can change anything” behavior

---

## 17. MVP minimum trust-and-safety requirements

For the first real beta, PETTODO should have at least:

### A. Public exposure controls
**[confirmed]**
- approximate public location only
- minimized public data
- no default owner-data exposure
- controlled visibility by profile type

### B. Protected contact minimum
**[confirmed]**
- protected contact flow for owned pets
- abuse-aware handling
- optional direct contact reveal only where allowed

### C. Community Dog moderation minimum
**[confirmed]**
- controlled creation
- change-request handling for sensitive updates
- pending review support
- minimal human/community validation in sensitive workflows

### D. Evidence-aware workflows
**[confirmed]**
- ability to attach evidence to relevant actions
- stronger review for stronger claims

### E. Matching safety
**[confirmed]**
- caution framing
- no identity certainty claim
- AI not acting as sole authority for trust-sensitive public changes

### F. Internal moderation readiness
**[confirmed]**
- basic review capability
- dispute handling readiness
- abuse/suspicion handling minimum

---

## 18. Out of scope for this document

This document does not finalize:
- exact numeric moderation thresholds
- final trust/reputation scoring system
- exact nearby-user qualification rules
- exact retention schedule for logs/evidence
- full legal/compliance workflows
- full insurance or law-enforcement procedures
- full future social/service trust model

These may be defined later in:
- `ARCHITECTURE.md`
- future ops/moderation docs
- legal/privacy docs
- future reputation/trust system docs

---

## 19. Operational checklist for product decisions

When a PETTODO flow affects trust or safety, ask:

1. Is the action low-risk, medium-risk, or high-risk?
2. Is account required here?
3. Does the user need stronger verification?
4. Is the information public, restricted, or private?
5. Could this expose owner data unnecessarily?
6. Could this reveal location too precisely?
7. Could this destabilize a shared/public record?
8. Is AI only assisting, or being treated as final authority?
9. Does this action need evidence?
10. Does it need pending review or escalation?

If those questions cannot be answered safely, the flow is not ready.

---

## 20. Final rule

PETTODO should be easy enough to use, but controlled enough to trust.

The product must not trade trust and safety for lower friction in high-impact flows.
