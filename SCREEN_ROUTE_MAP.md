# COMMUNITY_DOGS

Purpose:
Define the official MVP model for Community Dogs in PETTODO so creation, visibility, contributions, evidence, review, and moderation work in a controlled, trust-sensitive, pilot-usable way without turning PETTODO into an uncontrolled public animal wiki.

What belongs here:
- Community Dog definition and role inside PETTODO
- scope and limits of Community Dogs in the MVP
- creation rules
- visibility rules
- contribution and evidence rules
- sensitive-update and change-request rules
- review and moderation logic
- interaction with matches, cases, maps, and QR/public profiles
- what is intentionally not finalized yet

Update rule:
Update when Community Dog governance, creation flow, public visibility model, contribution rights, review logic, or moderation requirements materially change.

---

## 1. Why this document exists

Community Dogs are already part of PETTODO’s approved MVP direction.

They are important because PETTODO is not only a lost-pet app and not only a private pet-management app.
It also supports controlled community visibility and coordinated care around animals that exist in public or semi-public urban contexts.

At the same time, Community Dogs are one of the most trust-sensitive areas of the product.

If handled badly, they can turn PETTODO into:

- an uncontrolled public animal wiki
- a confusing mix of owned pets, stray visibility, and shared records
- a low-trust system where any user can publish or overwrite sensitive claims
- a moderation burden with weak evidence and weak accountability

This document exists to define the constrained MVP direction so Replit, review, QA, policy, and future docs all use the same model.

It is not the full long-term community-governance design.
It is the official operational baseline for the current MVP phase.

---

## 2. Core definition

A Community Dog is a dog that is visible or relevant in a community/public urban context and is tracked in PETTODO through a controlled shared record.

A Community Dog is not the same thing as:

- every dog seen in the street
- every stray dog
- every unknown dog
- every found dog
- every sighting
- every owned dog that happens to appear outdoors

Important rule:
Community Dog is a profile/state classification, not a case type.

That means:

- **Community Dog** is an animal-profile type
- **Lost / Found / Sighted** are case types
- **Probable Match / Strong Match / No Match** are match-result types

These must remain separate.

---

## 3. Positioning inside PETTODO

Community Dogs are a meaningful part of PETTODO, but they are not the dominant identity of the whole product.

Operationally, PETTODO should remain:

- a community-powered network for managing and recovering pets
- useful before emergencies
- useful during emergencies
- capable of controlled community-animal support

Community Dogs should therefore be:

- present from the MVP
- strong enough to be real
- controlled enough to be safe
- secondary to the overall core identity of PETTODO

Community Dogs must not make PETTODO look like:

- only a street-dog database
- only a rescue/NGO platform
- an unrestricted public animal-editing system

---

## 4. Scope of Community Dogs in the MVP

In the MVP, Community Dogs are included in a constrained operational form.

That means the MVP should support:

- discovery of Community Dog records
- controlled creation of new Community Dog records
- controlled public/community visibility
- sightings and selected care-related contributions
- evidence-backed actions
- controlled change requests for sensitive updates
- review-aware states
- minimum moderation/operator handling
- likely-match / likely-duplicate checks before or during creation
- map/list presence in a policy-safe way

The MVP does not need full maturity in:

- advanced contributor reputation systems
- complex multi-party governance workflows
- complete shelter/institutional workflows
- full dispute-engine design
- advanced legal/ownership arbitration
- unrestricted high-volume community editing

---

## 5. What Community Dogs are not

To avoid drift, Community Dogs are not:

- an automatic classification for every public dog
- a casual replacement for owned-pet profiles
- a catch-all bucket for uncertain identity
- an excuse to bypass public-data and trust rules
- a wiki page that anyone can rewrite instantly
- a system where AI alone decides final public truth
- a replacement for cases, reports, or matching

If a flow treats Community Dog as any of the above, it is incorrect.

---

## 6. Relationship to other profile types

PETTODO distinguishes these animal-profile categories:

- Owned Pet
- Community Dog
- Stray Dog
- Unknown Animal

Important rules:

### 6.1 Classification must be explicit
A dog should not become a Community Dog by accident.

### 6.2 Classification may evolve
Examples:
- Unknown Animal → Owned Pet
- Stray Dog → Community Dog
- Community Dog → Owned Pet

### 6.3 Community Dog is not the default for uncertainty
If the system lacks enough confidence or social/community context, a record may remain:
- Unknown Animal
- or Stray Dog

until better evidence exists.

### 6.4 Cases do not redefine identity
A Community Dog may have a case.
A case does not define the profile category.

Examples:
- a Community Dog may have a sighted case or a found-related flow
- an Owned Pet may be seen outdoors and must not be turned into a Community Dog just because of a sighting

---

## 7. Why Community Dogs matter in PETTODO

Community Dogs strengthen PETTODO in several ways:

- they reflect urban animal reality in Cochabamba and similar contexts
- they create visibility for dogs that may not belong to one clear private owner flow
- they support evidence-backed care history over time
- they support local community participation
- they reduce fragmentation of ad hoc public animal information
- they reinforce PETTODO’s identity as more than only emergency recovery

But this value only exists if trust and control are preserved.

---

## 8. Core Community Dog principles

### 8.1 Controlled visibility, not chaos
Community Dog records may be more public than owned-pet records, but they must remain controlled.

### 8.2 Shared records are not unrestricted edits
Sensitive shared data must not be overwritten casually.

### 8.3 More risk means more review
The more trust-sensitive the claim, the stronger the evidence and review path should be.

### 8.4 Evidence matters
Relevant contributions should support evidence attachment where appropriate.

### 8.5 AI assists, but does not finalize all public truth
AI may help with matching, duplicate suspicion, quality checks, and pre-review, but not every sensitive change should become visible automatically.

### 8.6 Operator control remains necessary
The MVP should support minimum operator/moderator review for sensitive or conflicting cases.

### 8.7 Community Dog logic must remain distinct from case logic
A Community Dog record is an identity record.
It is not just a list of sightings or a case feed.

---

## 9. Community Dog creation model

## 9.1 Creation stance

A new Community Dog should not become a fully trusted public record without checks.

This is a confirmed direction.

In MVP terms, creation should require:

- user account
- likely-candidate / likely-duplicate awareness
- AI review where helpful
- nearby-user or community context where relevant
- minimal human/community validation
- operator review in sensitive situations

---

## 9.2 Recommended MVP creation flow

The recommended controlled creation flow is:

User starts Community Dog creation  
→ system checks likely matches / likely duplicates / likely existing records  
→ user provides basic identity info, visible traits, and initial evidence  
→ system runs AI-assisted pre-review where useful  
→ record enters controlled creation path  
→ record becomes either:
- provisional + pending review
- or approved and visible if low-risk enough and checks are satisfied

For MVP, the safest operational default is:

- create a provisional record
- keep it in a review-aware state
- expose only once basic validation logic is satisfied

---

## 9.3 What creation should require in practice

A creation flow should include, at minimum:

- authenticated user
- one or more identifying photos where possible
- broad location / zone context
- visible trait information
- initial description
- basic explanation of why this dog should exist as a Community Dog record
- duplicate-awareness step
- acknowledgment that shared records are controlled and review-aware

It should not require excessive friction for every case, but it also must not behave like one-click public publishing.

---

## 9.4 Nearby-user / community context

Nearby-user or community context is part of the approved direction for Community Dog workflows.

In the MVP, this should be treated as:

- a supporting validation signal
- not the only validation mechanism
- not a replacement for operator control in sensitive cases

Exact qualification thresholds for who counts as a valid nearby/community confirmer are still not fully locked.

That remains intentionally open.

---

## 9.5 Sensitive creation cases

The following should trigger stronger caution or review during creation:

- likely duplicate of an existing record
- possible match to an owned pet
- very weak evidence
- conflicting user claims
- identity-critical uncertainty
- unusually sensitive health/status claims
- suspicious creation behavior

In these cases, creation should not flow like a casual low-risk publish action.

---

## 10. Community Dog visibility model

## 10.1 General visibility stance

Community Dog records may be more publicly visible than owned-pet records, but not everything should be public.

They remain subject to:

- public-data minimization
- approximate-location rules
- trust-sensitive field controls
- review-aware state logic

---

## 10.2 Publicly visible information may include

Where approved and appropriate, a Community Dog public profile may show:

- public photo(s)
- species / broad type
- Community Dog classification
- broad visible traits
- general description
- approximate zone or area
- public-safe care/action history summary
- selected public statuses
- non-sensitive evidence-backed updates that are safe to show
- controlled contribution prompts where allowed

This must remain consistent with public-data policy.

---

## 10.3 Information that should not be casually public

The following should remain protected, restricted, or internal unless explicitly justified:

- exact location
- exact live movement data
- full internal moderation notes
- internal abuse/suspicion markers
- raw trust signals
- detailed contributor-risk markers
- internal review metadata
- exact coordination details in sensitive contexts

---

## 10.4 Community Dog visibility is not identical to owned-pet visibility

Important rule:
Owned Pet and Community Dog public behavior must not be treated as the same by default.

Examples:
- owned pets prioritize owner protection and protected contact
- Community Dogs may allow broader community visibility and contribution, but still in a controlled way

---

## 10.5 Pending-review state and public visibility

Not every proposed Community Dog record or update should become visible immediately.

The MVP should support the concept of:

- pending review
- approved
- rejected

Pending items may:
- remain non-public
- or appear only in restricted/internal review contexts
- or appear in a clearly limited provisional form if later approved as a product decision

For now, the safe default is:
pending review is not treated as fully trusted public truth.

---

## 11. Contribution model

## 11.1 Community contributions are allowed, but bounded

PETTODO should allow meaningful community participation around Community Dogs.

That may include:

- sightings
- feeding updates
- some care-related notes
- evidence-backed actions
- corrections
- change requests
- visibility-enhancing reports

But contribution does not equal unrestricted editing rights.

---

## 11.2 Types of contributions that may exist in MVP

Community Dog contributions may include:

- sighting report
- feeding/care action
- vaccination-related action
- sterilization-related action
- descriptive correction
- status-related note
- photo contribution
- location/zone update
- duplicate suspicion / likely-match signal
- change request for sensitive fields

---

## 11.3 Low-risk vs high-risk contributions

### Lower-risk examples
These may allow lighter evidence and lighter review in MVP:

- lightweight sighting
- feeding update
- minor descriptive clarification
- additional photo
- broad area confirmation

### Higher-risk examples
These should require stronger evidence and/or review:

- vaccination claim
- sterilization claim
- sensitive health-related claim
- identity-critical change
- name change under conflict
- public-trust-sensitive status change
- conflict about whether the dog is actually a Community Dog
- possible owned-pet misclassification

---

## 11.4 Contribution rights

At minimum:

- public or low-risk browsing may be open
- meaningful contribution requires account
- higher-impact shared-record changes may require stronger trust or review
- some actions may need additional confirmation layers beyond login

This aligns with PETTODO’s broader access model.

---

## 12. Evidence rules for Community Dogs

## 12.1 Evidence-backed actions are part of the model

Community Dog records should support evidence-backed actions.

Examples:
- vaccination
- sterilization
- feeding
- sighting
- care-related updates

---

## 12.2 Evidence types may include

- photo
- document
- structured user confirmation
- community confirmation
- moderator confirmation

---

## 12.3 Stronger claims require stronger support

Claims affecting:

- public trust
- health trust
- public safety
- identity confidence

should require stronger support than lightweight community notes.

---

## 12.4 Evidence is support, not absolute truth

Even when evidence is provided, some sensitive changes may still require review if:

- evidence is weak
- evidence conflicts with prior record state
- multiple users disagree
- the action changes public-trust-sensitive information
- abuse/manipulation risk is present

---

## 13. Sensitive modifications and change requests

## 13.1 Sensitive modifications must not be freely editable

This is a confirmed rule.

Examples include:

- name changes
- vaccination updates
- sterilization updates
- sensitive care/health status changes
- identity-critical changes under conflict

These must not behave like unrestricted direct edits.

---

## 13.2 Change-request model

The official MVP direction is a request-and-review model for sensitive Community Dog changes.

That means:

- a user proposes the change
- the system stores the proposal
- review logic determines whether it becomes visible
- the canonical record is not blindly overwritten at proposal time

---

## 13.3 Review-aware states

The simplified review states for Community Dog shared-record changes should be:

- pending_review
- approved
- rejected

These states should appear in:

- creation flow
- sensitive change requests
- some evidence-sensitive contributions where required

---

## 13.4 Correction principle

The product should support correction of errors and disputes without making shared records unstable or easy to vandalize.

That means:
- shared records can evolve
- but evolution must be controlled
- and one user should not be able to casually rewrite community truth

---

## 14. Review model

## 14.1 Available review layers in principle

Depending on the action, review may include:

- AI review
- nearby-user/community confirmation
- moderator/operator review
- evidence verification

---

## 14.2 AI review role

AI may assist with:

- photo quality review
- duplicate detection
- probable match detection
- evidence pre-review
- suspicious-pattern detection
- moderation assistance

AI may be more decisive in bounded tasks such as:

- photo quality classification
- similarity analysis
- match ranking

But AI should not automatically finalize every trust-sensitive Community Dog change.

---

## 14.3 Human/operator review role

Human or operator review is especially important when:

- the shared record is disputed
- the change is health-sensitive
- the change is identity-sensitive
- multiple users conflict
- the change may expose the platform to fraud or unsafe public information
- abuse patterns appear

---

## 14.4 Exact thresholds still open

The following are intentionally not fully locked yet:

- how many confirmations are needed
- exactly which users qualify as valid confirmers
- exact evidence threshold by action type
- exact auto-approval boundaries
- exact escalation conditions

This document should not fake-finalize those thresholds.

---

## 15. Matching and duplicate logic for Community Dogs

## 15.1 Match is not identity

Community Dog workflows must preserve PETTODO’s rule that match is not the same as identity.

Match results may support:

- duplicate suspicion
- review prioritization
- creation warnings
- next-step guidance
- recovery assistance

They should not alone finalize sensitive public record truth.

---

## 15.2 Likely-candidate check before creation

Before allowing or finalizing a new Community Dog creation, the system should show likely candidates where possible.

This is a confirmed MVP direction.

Purpose:
- reduce duplicate records
- reduce confusion
- reduce accidental creation of a record that already exists
- reduce mistaken creation of a Community Dog for an owned pet

---

## 15.3 Community Dog and owned-pet conflict

When a Community Dog candidate may actually be an Owned Pet, the flow should behave cautiously.

That may require:

- stronger review
- more evidence
- operator attention
- avoidance of premature public-truth claims

The product must not casually convert possible owned-pet identity conflicts into Community Dog truth.

---

## 16. Relationship to cases, maps, QR, and public pages

## 16.1 Cases

A Community Dog may be associated with cases, but the record itself is not a case.

Case logic must remain separate.

---

## 16.2 Maps

Community Dogs may appear on public or account-required map surfaces in a controlled way, using approximate location logic only.

Map presence must not imply:

- exact live tracking
- exact address
- unrestricted coordination
- unrestricted public-trust certainty

---

## 16.3 QR

QR is central to owned-pet identity and recovery.
A Community Dog may later support QR-related or public-link identity patterns if approved in implementation, but Community Dog governance does not depend on QR to be valid in MVP.

This means:
- Community Dog support does not require full QR maturity for every community record
- QR should not be treated as the defining requirement for Community Dog inclusion

---

## 16.4 Public pages

Community Dog public pages should:

- be useful
- be identifiable
- remain policy-safe
- support contribution where allowed
- avoid uncontrolled public editing behavior

---

## 17. Moderator/operator role in Community Dogs

## 17.1 Role stance

Admin/operator is not a separate identity system in v1.
It is a protected role inside the same core identity system.

---

## 17.2 Minimum operator capabilities for Community Dogs

Operators should be able to:

- review pending Community Dog creations
- review sensitive change requests
- approve or reject review-required items
- inspect suspicious contribution behavior
- resolve some shared-record conflicts
- flag risky or abusive cases
- help maintain public-record safety

---

## 17.3 MVP moderation stance

The MVP does not need a large enterprise moderation suite.

It does need minimum real moderation capability for trust-sensitive Community Dog flows.

---

## 18. Release-critical Community Dog baseline

For first real beta, the following must be true:

- Community Dogs are handled in a controlled way
- likely matches / likely duplicates are shown before allowing new creation where required
- creation follows the constrained MVP direction
- sensitive changes are not freely editable
- some form of controlled review/change-request logic exists for sensitive shared-record changes

The following must not be true at release:

- any user can freely create or rewrite sensitive Community Dog records without checks
- Community Dog handling behaves like an uncontrolled open wiki
- Community Dog handling ignores review/governance requirements already defined in MVP scope

If those failures remain true, release readiness is blocked.

---

## 19. Data-model and route implications

Community Dog implementation should remain aligned with the official build docs.

### Data-model implications
Community Dogs should rely on:

- canonical animal record
- explicit profile type
- classification history where relevant
- actions and evidence
- change requests for sensitive updates
- review decisions
- review-aware visibility state

### Route implications
Community Dogs should remain distinct inside route structure from:

- owned-pet management
- case management
- matching detail
- moderation/admin surfaces

The route map should preserve:
- public discovery
- controlled contribution entry
- review-aware update paths
- protected moderation paths

---

## 20. What this document does not finalize

This document does not fully finalize:

- exact nearby-user qualification logic
- exact community confirmation thresholds
- exact evidence thresholds by action subtype
- exact contributor trust/reputation system
- exact UI wording for every contribution state
- exact QR role for future Community Dog extensions
- exact abuse/rate-limit tuning
- exact deletion/retention mechanics for every shared-record case

Those should remain open until more detailed implementation or moderation work requires them.

---

## 21. Final rule

Community Dogs should make PETTODO more useful and more grounded in real urban animal life, not less trustworthy.

If Community Dogs become an uncontrolled public-edit system, the model is wrong.

If they remain visible, useful, evidence-aware, review-aware, and operationally controlled, they are aligned with PETTODO’s MVP direction.
