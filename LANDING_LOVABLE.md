# AI_MATCHING

Purpose:
Define the official MVP direction for PETTODO’s AI-assisted matching system so image quality checks, similarity workflows, duplicate detection, match ranking, caution framing, and review logic are implemented in a practical, trust-safe, pilot-usable way without pretending that matching is a universal identity oracle.

What belongs here:
- role of AI matching inside PETTODO
- matching scope in the MVP
- inputs, outputs, and stages of the matching pipeline
- quality-gate and image-readiness rules
- match-result logic and user-facing framing
- duplicate-detection logic
- review and trust-safety boundaries
- relationship between matching, cases, profiles, and Community Dogs
- release-critical baseline for matching
- what remains intentionally not finalized

Update rule:
Update when PETTODO’s matching scope, provider strategy, match-result framing, trust-safety boundaries, or release expectations for AI-assisted matching materially change.

---

## 1. Why this document exists

Matching is one of PETTODO’s most distinctive and high-value product capabilities.

It matters because PETTODO should help users and helpers answer questions such as:

- does this animal look like one already registered?
- is this sighted or found animal probably linked to an existing lost case?
- is this a likely duplicate profile?
- should the user create a new record, open a case, or review existing candidates first?

At the same time, matching is one of the easiest areas to overclaim.

If implemented badly, matching can make PETTODO look like:

- a fake-AI product with cosmetic results
- a system that confuses similarity with identity
- a product that exposes risky public claims too early
- a product that misclassifies owned pets, Community Dogs, and unknown animals
- a trust-sensitive workflow driven by false certainty

This document exists to stop that.

It defines the official MVP matching direction before heavier Replit implementation.

It is not the full future computer-vision roadmap.
It is the official operational baseline for the current MVP phase.

---

## 2. Core matching rule

PETTODO matching is a **suggestion-and-review system**, not an automatic identity oracle.

This is the most important rule in the entire document.

Matching may support:

- recovery assistance
- duplicate suspicion
- next-step guidance
- case prioritization
- record-quality improvement
- Community Dog creation safety
- user decision support

Matching must not be treated as:

- universal proof of identity
- automatic proof of ownership
- final dispute resolution
- automatic truth for public/shared records
- replacement for evidence, review, or human judgment in trust-sensitive situations

---

## 3. Role of matching inside PETTODO

Matching is part of PETTODO’s broader product direction, but it is not the only product identity.

It should support both:

- **Emergency workflows**
- **Daily / identity workflows**

### Emergency support examples
- a user creates a lost case and receives possible matches
- a helper reports a found or sighted animal and sees likely existing profiles/cases
- a QR/public flow can route the user away from unnecessary duplicate creation

### Daily / identity support examples
- a user creating a new profile is warned about likely duplicates
- a Community Dog creation flow checks whether a similar record already exists
- a record can be made more reliable over time through structured comparison and review

---

## 4. What matching is allowed to do in the MVP

The MVP matching system should support these practical capabilities:

- image quality assessment
- usable vs poor photo gating
- similarity-based candidate ranking
- profile-to-profile matching
- case-to-profile matching where relevant
- duplicate suspicion
- likely-candidate checks before creation
- user-facing score + reasons + caution + next action
- controlled support for Community Dog creation and shared-record review

The MVP does not need:

- perfect identity resolution
- advanced behavioral biometrics
- universal multi-animal recognition maturity
- forensic-level breed/species modeling
- fully mature trust/reputation weighting
- automatic final adjudication of all conflicts

---

## 5. Matching scope in MVP

## 5.1 Operational animal scope

PETTODO is multi-animal in structure, but MVP matching should follow PETTODO’s broader operational emphasis:

- strongest practical depth for dogs
- meaningful support for cats where possible
- extensible structure for other animals later

The system must not behave as if only dogs exist, but it is acceptable for dog matching depth to be stronger in the first phase.

---

## 5.2 Matching surfaces in MVP

Matching may appear in these product surfaces:

- lost case flow
- found case flow
- sighted case flow
- new profile creation flow
- Community Dog creation flow
- duplicate-review flow
- match detail view
- map/list-assisted candidate review
- public/profile/case next-step guidance when appropriate

It should not appear everywhere just because it exists.

---

## 6. Matching inputs

The matching system may use a combination of these signals:

- animal photos
- visible traits
- species
- broad breed/type hints
- sex if known
- size/age band where useful
- broad area / approximate location
- case type context
- recency or timing context
- profile category context
- record quality signals
- structured extracted attributes
- similarity embeddings
- duplicate/perceptual-hash signals

Important:
Image similarity is central, but not the only possible signal.

---

## 7. Matching output model

## 7.1 User-facing output rule

Match output should include:

- score
- reasons
- caution framing
- next action

That is a confirmed product rule.

### Minimum user-facing behavior
Users should be able to understand:

- why this candidate appeared
- how strong or weak the signal is
- what they should do next
- that the result is still a suggestion, not absolute truth

---

## 7.2 Official match-result language

PETTODO’s approved user-facing match bands are:

- **Probable Match**
- **Strong Match**
- **No Match**

These are output types, not profile identity.

Internal ranking may be more granular, but PETTODO should map it back to these approved user-facing concepts.

---

## 7.3 Match-result meaning

### Strong Match
A stronger similarity signal that deserves serious review and next-step action, but still does not automatically finalize identity truth.

### Probable Match
A meaningful candidate that should be reviewed, but with more uncertainty and more caution.

### No Match
No sufficiently useful candidate under the current conditions and thresholds.

Important:
No Match does not mean “this animal definitely has no existing related record.”
It means no candidate was strong enough under the current search and evidence conditions.

---

## 8. Matching pipeline direction

The recommended matching pipeline for MVP is multi-stage.

This keeps matching practical, cost-aware, and more trustworthy.

---

## 8.1 Stage A — Input and context intake

At intake, the system should capture:

- the source entity
- task context
- image set
- animal type/category context
- flow type
- broad location context where appropriate
- whether the user is creating, searching, reporting, or reviewing

Examples of trigger contexts:
- new lost case
- new found case
- new sighted report
- new animal profile creation
- Community Dog creation proposal
- manual match refresh

---

## 8.2 Stage B — Cheap quality gate

The system should not send every image directly to the expensive AI path.

Start with a practical quality gate using low-cost checks where possible, such as:

- blur detection
- brightness/exposure check
- framing/usability check
- minimum usable subject size
- single-animal vs multi-animal warning where feasible
- near-duplicate/perceptual-hash screening

Suggested result states:
- usable
- questionable
- poor

### Operational rule
Poor images should not automatically enter the full matching path as if they were equally reliable.

Instead, the system should:

- warn the user
- request a better photo when helpful
- allow limited continuation only when product logic really requires it
- preserve honest confidence framing

---

## 8.3 Stage C — AI-assisted quality fallback

If the cheap quality gate is inconclusive, the system may use AI-assisted quality review.

AI may help with:

- subject visibility
- framing quality
- whether the image is useful enough for matching
- identifying likely unusable or misleading photos

This is a bounded area where AI may be more operationally decisive.

---

## 8.4 Stage D — Normalization and preparation

For usable images, the system should support:

- normalization
- thumbnail generation
- derived image versions
- optional subject-focused crops where practical
- metadata extraction
- embedding preparation

This stage is important for stability, storage discipline, and repeatable matching quality.

---

## 8.5 Stage E — Feature and embedding generation

The system may generate structured signals such as:

- visual attributes
- extracted visible traits
- embeddings or vector representations
- duplicate signals
- provider/model metadata

Important:
Provider metadata matters because PETTODO must remain AI-capable but not AI-locked.

---

## 8.6 Stage F — Candidate retrieval

Once usable matching inputs exist, PETTODO should retrieve likely candidates from relevant record pools.

Candidate pools may include:

- owned-pet animal profiles
- Community Dog profiles
- unknown-animal records
- active lost cases
- active found/sighted-related records where useful

Candidate retrieval should be context-aware.

Examples:
- a lost case should prioritize likely animal/profile/case candidates relevant to recovery
- a new Community Dog creation should prioritize likely duplicate profiles first
- a found/sighted flow should prioritize existing profiles and active cases before encouraging new record creation

---

## 8.7 Stage G — Ranking

Candidates should be ranked using a practical combination of signals such as:

- image similarity
- quality confidence
- broad location relevance
- timing relevance
- visible trait alignment
- category compatibility
- duplicate risk signals
- record completeness or reliability where appropriate

This stage may be strongly AI-assisted, but PETTODO should still keep the result as ranked suggestion output, not identity certainty.

---

## 8.8 Stage H — User-facing result shaping

Before showing results, PETTODO should convert internal ranking into user-appropriate output that includes:

- candidate list
- match band
- reasons
- caution framing
- next steps

This is where PETTODO turns technical ranking into safe, understandable product behavior.

---

## 9. Match reasons and caution framing

## 9.1 Reasons should be human-readable

The user-facing reasons should be practical and understandable.

Examples:
- similar coat/pattern
- similar visible traits
- similar size/build
- similar approximate area
- similar recent report context
- likely duplicate of an existing profile

Avoid unexplained black-box outputs like:
- “confidence 0.81”
without any useful interpretation.

---

## 9.2 Caution framing is mandatory

Every meaningful match surface should preserve the message that:

- this is a suggestion
- review is still needed
- public/shared truth is not automatically finalized by AI
- more evidence may still be required

This is especially important for:

- owned-pet recovery
- Community Dog creation
- duplicate handling
- disputed identity
- public/shared record changes

---

## 9.3 Unsafe certainty is prohibited

The product must not present AI output as universal certainty for:

- ownership
- profile identity
- public/shared record truth
- final case resolution
- trust-sensitive disputes

If the UI implies certainty where the docs do not allow it, the implementation is wrong.

---

## 10. Matching and duplicate detection

## 10.1 Duplicate detection is part of the matching system

Matching is not only for recovery.
It is also for duplicate suspicion.

This matters especially in:

- new profile creation
- Community Dog creation
- found/sighted flows
- case creation around animals that may already exist in the system

---

## 10.2 Duplicate warning rule

Before encouraging a user to create a new record, PETTODO should show likely existing candidates where possible.

This is especially important for:

- Community Dog creation
- found/sighted reports
- unknown-animal flows
- public/community-visible animal records

The purpose is to reduce:

- duplicate profiles
- confusion
- data fragmentation
- accidental misclassification
- unnecessary parallel records

---

## 10.3 Duplicate suspicion is not forced merge

A likely duplicate should not automatically merge records.

Instead, it may trigger:

- user review
- operator review
- stronger caution
- additional evidence requirement
- duplicate-handling workflow later

PETTODO should not silently rewrite identity truth.

---

## 11. Matching and Community Dogs

## 11.1 Community Dog creation must use matching carefully

Community Dog creation is one of the most important matching use cases.

Before allowing or finalizing a new Community Dog record, the system should try to answer:

- does this dog likely already exist in PETTODO?
- is this likely an existing Community Dog?
- could this actually be an owned pet or existing profile?
- is the user about to create a duplicate?

---

## 11.2 Community Dog matching is not fully auto-finalizing

Even if a likely candidate appears, the system should still allow controlled review logic.

Examples:
- suggest reviewing the existing record
- suggest contributing to an existing record instead of creating a new one
- trigger higher review if the candidate may be an owned pet
- require stronger caution where confidence is weak

---

## 11.3 Community Dog trust boundary

Matching may support Community Dog governance, but it must not bypass:

- evidence requirements
- review-aware state
- operator moderation in sensitive conflicts
- public-data controls

---

## 12. Matching and cases

## 12.1 Case-aware matching

Matching should understand that cases are event contexts, not identity by themselves.

A match may relate:

- an active case to an animal profile
- a sighted/found report to a likely existing animal
- a lost case to a likely found/sighted-related candidate

But the system must preserve:

- profile
- case
- match

as separate layers.

---

## 12.2 Case next-step guidance

When matching is shown inside case flows, PETTODO should guide users toward safe next steps.

Examples:
- review likely profile
- open protected contact
- compare details
- add more images
- report sighting
- avoid creating a duplicate case or duplicate profile

---

## 13. Matching and public flows

## 13.1 Public-safe behavior rule

Matching is trust-sensitive and should not become an uncontrolled public identity engine.

The public product may expose limited low-risk matching-related guidance where appropriate, but meaningful matching actions should generally require account or controlled flow context.

---

## 13.2 Public profile / QR implication

Public/QR flows may support smart next-step behavior such as:

- report sighting
- review current visible status
- initiate safe contact path
- avoid unnecessary duplicate creation

But they must not expose raw internal trust signals, moderation state, or risky identity inference details.

---

## 14. Matching and trust/safety boundaries

## 14.1 More risk = more caution

The higher the public or trust impact of a match result, the stronger the caution and review should be.

Examples of higher-risk contexts:
- owned-pet vs Community Dog conflict
- public/shared record changes
- disputed identity
- high-impact recovery decisions
- possible fraud/manipulation
- health-sensitive or trust-sensitive record changes

---

## 14.2 AI is more decisive only in bounded tasks

PETTODO allows AI to be more operationally decisive in bounded tasks such as:

- photo quality classification
- similarity analysis
- match ranking support

But not in fully trust-sensitive truth-finalization tasks.

---

## 14.3 Human/operator review role

Human or operator review becomes more important when:

- a match affects public/shared record truth
- a Community Dog may actually be an owned pet
- users disagree about identity
- evidence conflicts
- abuse or suspicious behavior appears
- multiple records are in tension

---

## 15. User experience rules for matching

## 15.1 Matching should feel useful, not magical

The UX should make users feel that PETTODO is helping them practically, not performing theatrical AI.

That means:

- explain enough
- avoid gimmick language
- avoid certainty inflation
- show what to do next

---

## 15.2 Matching should reduce confusion

A good match flow helps users answer:

- should I use this existing record?
- should I contact someone?
- should I report a sighting?
- should I create a new record?
- should this go to review?

If the flow only shows candidates without helping decisions, it is incomplete.

---

## 15.3 Poor-photo experience matters

When image quality is weak, PETTODO should handle that honestly.

The system may say, in effect:

- this photo may be too weak for strong matching
- upload a clearer image for better results
- you can still continue, but confidence may be lower

This is better than pretending the system is equally reliable on poor inputs.

---

## 16. Data-model and architecture implications

Matching implementation should remain aligned with PETTODO’s build docs.

### Core entity implications
Matching should rely on:

- match runs
- match candidates
- media assets
- media analysis results
- embeddings
- provider metadata
- reasons bundles
- review state where applicable

### Architecture implications
Matching should use:

- a provider-agnostic internal AI service layer
- replaceable provider adapters
- bounded AI contracts
- durable storage and retrieval of relevant artifacts
- pipeline stages that preserve cost-awareness and reviewability

### Canonical separation rule
Matching output must not replace:
- animal records
- case records
- review decisions
- moderation outcomes

---

## 17. Release-critical matching baseline

For first real beta, the following must be true:

- users can receive real possible matches
- matching is based on real stored media and/or real candidate retrieval
- user-facing results include score + reasons + caution framing + next action
- matching is not purely cosmetic
- the product does not claim identity certainty
- the system is useful enough to support pilot testing

The following do not need to be true at first beta:

- perfect accuracy
- full long-tail species coverage
- advanced reputation weighting
- enterprise moderation intelligence
- universal automation of all identity decisions

Important:
Matching does not need to be perfect.
It does need to be real, usable, and truthfully framed.

---

## 18. What this document does not finalize

This document does not fully finalize:

- exact numeric thresholds for match bands
- exact model/provider tuning details
- exact score formulas
- exact weighting of location vs image vs metadata
- exact duplicate-merge mechanics
- exact UI copy for every caution state
- exact multi-image aggregation logic
- exact abuse/rate-limit thresholds around search and matching
- exact future provider-switch migration process
- exact future trust/reputation weighting in ranking

Those remain open until later implementation or tuning work requires them.

---

## 19. Final rule

PETTODO matching should make the product more useful, more reviewable, and more honest.

If matching becomes a decorative fake-AI layer, it is wrong.

If matching becomes an unsafe certainty engine, it is wrong.

If matching becomes a practical suggestion-and-review system that helps users recover animals, avoid duplicates, and make safer next decisions, it is aligned with PETTODO’s MVP direction.
