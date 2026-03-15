# PUBLIC_DATA_POLICY

Purpose:
Define what PETTODO may show publicly, what must remain protected, who can modify shared animal records, and how trust, privacy, safety, and community contributions should be handled.

What belongs here:
- Public vs private data rules
- Visibility rules by animal/profile type
- Contact and location exposure rules
- Evidence and contribution rules
- Community Dog editing and review rules
- Correction, deletion, and access-control principles

Update rule:
Update when product privacy rules, public profile behavior, moderation logic, legal requirements, or trust/safety strategy materially change.

---

## 1. Policy objective

PETTODO should expose only the minimum amount of information necessary to:
- identify an animal
- support recovery
- support safe contact
- support controlled community care
- reduce abuse, scraping, fraud, and unsafe exposure

This policy exists to balance:
- usefulness
- trust
- privacy
- public safety
- community collaboration

---

## 2. Core principles

### 2.1 Minimum necessary exposure
Public views should reveal only the minimum information needed to help identify, recover, or safely support an animal.

### 2.2 Owner protection by default
Owner personal information must not be exposed by default.

### 2.3 Community visibility with control
Community-facing animal records may be more public than owned-pet records, but they must not become unrestricted open-edit pages.

### 2.4 Sensitive changes require more proof
The more sensitive the change, the more evidence and review it should require.

### 2.5 Trust over convenience
If a feature creates unacceptable privacy, abuse, fraud, or moderation risk, PETTODO should prefer safer defaults over maximum openness.

### 2.6 Auditability
PETTODO may record access, contribution, and review events for safety, moderation, abuse prevention, and system trust.

---

## 3. Scope of this policy

This policy applies to:
- owned pet public profiles
- Community Dog public profiles
- Stray Dog / Unknown Animal public records
- lost / found / sighted case pages
- QR flows
- map visibility
- contact flows
- evidence-backed actions
- community edits and change requests

For deeper implementation details, see:
- `ARCHITECTURE.md`
- future trust/safety and moderation documents

---

## 4. Public vs protected data categories

PETTODO uses four practical visibility levels.

### 4.1 Public
Visible to anyone, even without account.

Examples:
- animal name if intentionally public
- public photo(s)
- species / broad type
- visible status
- general public description
- approximate location
- public QR landing page
- public lost/found/sighted case page

### 4.2 Account-required
Visible only to logged-in users.

Examples:
- richer case context
- extended recovery-relevant details
- some map layers
- some community-record interactions
- contribution history in limited form

### 4.3 Restricted / trusted workflow
Visible only inside protected flows.

Examples:
- protected contact channel
- more precise coordination information
- change-request handling
- evidence review interfaces
- certain moderation-related details

### 4.4 Private / internal
Not public and not available to general users.

Examples:
- direct owner identifiers by default
- moderation notes
- abuse/suspicion markers
- full evidence audit metadata
- private account details
- exact internal trust signals

---

## 5. Profile types covered by this policy

PETTODO distinguishes these animal-profile categories:

- **Owned Pet**
- **Community Dog**
- **Stray Dog**
- **Unknown Animal**

Important:
Not every animal seen in the street is automatically a Community Dog.
Classification must be explicit and may change when evidence improves.

---

## 6. Owned Pet public data policy

Owned Pet profiles are public in a limited, safety-oriented way.

### 6.1 What may be public
Examples of acceptable public data:
- pet name
- public photo(s)
- species
- visible traits
- broad age or age range if shared
- non-sensitive descriptive info useful for identification
- current visible status (safe / lost / found-related / etc.)
- approximate location
- protected contact entry point
- QR-linked public profile

### 6.2 What should not be public by default
Examples:
- phone number
- WhatsApp
- email
- exact address
- exact live location
- sensitive medical documents
- owner full private data
- internal account identifiers

### 6.3 Owner-controlled optional fields
The owner may choose to expose additional information in selected contexts, especially in recovery flows.

Examples:
- age
- visible conditions
- non-sensitive medical notes helpful for recovery/care
- optional phone visibility during a lost case

Important:
Owner control exists **within platform safety limits**.
PETTODO should not allow clearly unsafe exposure by default.

---

## 7. Contact policy for Owned Pets

### 7.1 Default contact rule
Owned-pet contact must be protected by default.

Public pages should show:
- protected contact button
- safe communication entry point
- recovery-related action buttons when relevant

### 7.2 Optional owner contact reveal
During a lost-pet flow, the owner may choose to expose direct contact information through an explicit opt-in control.

Example:
- show phone / WhatsApp toggle during case publication

This must remain:
- optional
- reversible
- clearly explained to the owner

### 7.3 Anti-abuse protection
Protected contact flows should support abuse mitigation such as:
- basic captcha
- anti-scraping measures
- rate limiting
- suspicious behavior detection
- event logging

Detailed technical rules belong in technical documentation, not here.

---

## 8. Community Dog public data policy

Community Dogs are public-facing records by design, but under controlled governance.

### 8.1 What may be public
Examples:
- community-facing name if known/used
- photos
- animal type and visible traits
- approximate area
- sighting history in limited form
- care-related public actions
- evidence-backed public actions where appropriate
- general public notes useful to the community

### 8.2 What should not be public by default
Examples:
- exact private residence of any contributor
- personal contact details of contributors by default
- raw moderation data
- internal trust or abuse signals
- exact precise location trails if they create safety risk

### 8.3 Community Dog editing rule
Community Dogs are not freely editable like personal notes.
Sensitive changes should go through controlled review.

Examples of sensitive changes:
- changing the dog name
- changing vaccination status
- changing sterilization status
- changing important health-related claims
- changing identity-critical traits when conflict exists

---

## 9. Stray Dog / Unknown Animal public data policy

These categories should remain visible enough to support identification, classification, and community response, but not over-assert identity.

### 9.1 Public rule
A Stray Dog or Unknown Animal record may show:
- photo
- approximate area
- observed traits
- sighting notes
- public classification state

### 9.2 Classification rule
The system must not overstate certainty.
An Unknown Animal should remain unknown until stronger evidence appears.

---

## 10. Case data policy

PETTODO distinguishes animal identity from case status.

Case pages may include:
- Lost
- Found
- Sighted

### 10.1 Public case data may include
- public photos
- animal profile summary
- case type
- approximate area
- case timeline summary
- safe next-action buttons
- flyer/public link

### 10.2 Protected case data may include
- protected contact
- richer internal coordination context
- more detailed reports
- review or moderation states
- exact coordination information when needed

---

## 11. Location exposure policy

### 11.1 Public location rule
Public location should be approximate, not exact.

### 11.2 Owned Pet location behavior
For owned pets, public location should reflect only a safe approximation.

Example direction:
- public icon displaced from exact home area
- no exact home point shown

### 11.3 Community Dog location behavior
For Community Dogs, public maps may show:
- approximate habitual area
- central zone of known presence
- an area or radius rather than exact coordinates

### 11.4 Stray / observed animals
For stray or repeatedly sighted animals, the product may show the general area where the animal is usually seen, not an exact permanent point.

### 11.5 Protected location layers
Some richer recovery or pattern layers may be visible only to logged-in users or within protected workflows.

### 11.6 Audit rule
PETTODO may log access to sensitive visibility layers for abuse prevention and auditability.

---

## 12. QR public-page policy

QR is an active identity and recovery tool.

When a QR is scanned, PETTODO should show:
- public animal profile
- current visible animal status
- protected contact action
- recovery-related action if relevant

If the animal is currently lost, QR flow should support:
- **Report sighting**

QR pages must follow the same privacy rules as public profiles:
- no exact address by default
- no uncontrolled owner-data exposure
- no hidden expansion into unsafe private information

---

## 13. Actions and evidence policy

PETTODO supports actions that may have evidence attached.

### 13.1 Action types may include
- vaccination
- sterilization
- feeding
- sighting
- care-related action
- public-status update

### 13.2 Evidence types may include
- photo
- document
- structured user confirmation
- community confirmation
- moderator confirmation

### 13.3 Critical action rule
Actions that affect public trust, health trust, or safety should require stronger evidence.

Examples:
- vaccination claims for Community Dogs
- sterilization claims
- sensitive status changes

### 13.4 Flexible action rule
Lower-risk actions may allow lighter evidence requirements.

Examples:
- feeding
- lightweight sightings
- minor descriptive updates

---

## 14. Community edits, review, and change requests

### 14.1 Creation of Community Dogs
A new Community Dog should not become a fully trusted public record without checks.

Creation should require:
- user account
- nearby-user context
- AI review
- minimal human/community validation

### 14.2 Sensitive modifications
Sensitive modifications should go through controlled change requests rather than instant direct overwrite.

### 14.3 Review layers
Depending on the action, review may include:
- AI review
- nearby-user confirmation
- moderator/community review
- evidence verification

### 14.4 Confirmation thresholds
The exact threshold for community confirmation is still to be defined and belongs in more detailed moderation/trust documentation.

For now:
- PETTODO should support the concept of **pending review**
- not all proposed changes should become visible immediately

---

## 15. Correction, deletion, and ownership rules

### 15.1 Owned Pet owner rights
Owners should retain strong control over data they publish about their own pets.

They should be able to:
- edit
- remove
- update
- control visibility of their own published fields

### 15.2 Shared/community record limits
Community/shared animal records should not be freely deleted or rewritten by one user without checks.

### 15.3 Change-request model
Sensitive changes to shared/community records should use a request-and-review model.

### 15.4 Correction principle
The system should support correction of errors and disputes without making shared records unstable or easy to vandalize.

---

## 16. Reputation and trust visibility

PETTODO may show limited reputation-related cues for contributors in order to increase trust in community contributions.

Examples:
- visible contribution history
- trusted contributor indicator
- meaningful participation cues

Important:
The final trust/reputation model is not fully defined in the MVP.
This document only establishes that:
- community trust matters
- visible contribution quality matters
- community contributions should not all be treated equally

---

## 17. AI role in public-data workflows

AI may assist with:
- image quality review
- duplicate detection
- probable match detection
- evidence pre-review
- moderation assistance
- suspicious-pattern detection

### Important limit
AI should not automatically finalize every trust-sensitive public-data change.

Examples:
- vaccination claims for Community Dogs
- sensitive status changes
- disputed shared-record modifications

AI may be more operationally decisive in bounded tasks such as:
- photo quality classification
- similarity analysis
- match ranking

But public-trust-sensitive actions may still require additional human or community confirmation.

---

## 18. Public access vs contribution rights

### Public / low-risk access
May include:
- viewing public profiles
- viewing public cases
- scanning QR
- browsing low-risk public information

### Account-required access
Required for:
- profile creation
- case creation
- image uploads
- Community Dog creation
- meaningful public-data contribution
- sensitive workflow participation

### Higher-trust access
May require stronger verification for:
- trust-sensitive user-to-user interaction
- high-impact community edits
- future social/service interactions

---

## 19. Logging and auditability

PETTODO may log relevant events such as:
- access to sensitive profile/case layers
- protected contact attempts
- contribution attempts
- review actions
- change requests
- suspicious activity indicators

Purpose:
- safety
- moderation
- abuse prevention
- accountability
- internal trust operations

This logging should be proportionate and privacy-aware.

---

## 20. What PETTODO should not become

PETTODO should not become:
- an unrestricted public directory of owner contact information
- an exact live map of private pet locations
- an open anonymous edit surface for shared animal records
- a system where every community claim becomes truth instantly
- a product that trades trust and safety for lower friction

---

## 21. Open policy items still to define elsewhere

These need more detailed definition in later docs:
- exact field-level public/private matrix per page type
- exact nearby-user validation logic
- exact community confirmation thresholds
- exact abuse and rate-limit rules
- exact trust/reputation mechanics
- exact evidence requirements by action type
- exact retention and deletion operational rules
- exact moderator escalation flows
