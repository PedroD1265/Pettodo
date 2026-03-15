# DATA_MODEL

Purpose:
Define the recommended logical data model for PETTODO’s MVP phase so the web app can move from demo/local-first behavior to real persistence, real trust-sensitive workflows, real public/profile behavior, and real backend implementation without breaking product truth.

What belongs here:
- core domain entities
- entity boundaries and relationships
- canonical records for animals, cases, matches, media, evidence, contact, and moderation
- visibility and review-state modeling rules
- MVP data conventions that support Replit implementation and future backend extraction
- what is intentionally left open for later technical detail

Update rule:
Update when PETTODO’s core entity model, profile/case/match separation, trust-sensitive workflow structure, visibility model, or backend persistence approach materially changes.

---

# 1. Why this document exists

PETTODO already has strong product breadth, route coverage, and UI logic.

What is still missing is a stable backend-ready model that defines:

- what the canonical records are
- what must stay separate
- what relationships are required
- what can be public vs protected vs internal
- how evidence, review, and moderation fit into the same system
- how to implement real persistence without inventing product behavior during development

This document is the bridge between:

- PRD_MVP_WEBAPP.md
- PUBLIC_DATA_POLICY.md
- TRUST_AND_SAFETY.md
- ARCHITECTURE.md
- WEBAPP_REPLIT.md

It is not the final SQL schema.  
It defines the official **logical domain model for MVP implementation**.

---

# 2. Scope and certainty stance

This document defines the **logical MVP data model** and the **recommended relational structure**.

It finalizes:

- core entity families
- important relationships
- minimum required state models
- separation between canonical truth and public output
- minimum review/evidence/moderation structures

It does not finalize:

- SQL column types
- exact indexes
- API payload formats
- moderation thresholds
- trust/reputation systems
- retention schedules
- advanced duplicate merge logic

Certainty tags used:

- **confirmed** = supported by PETTODO documentation or decisions
- **recommended** = strong implementation guidance
- **unknown** = intentionally not locked

---

# 3. Core modeling rules

## 3.1 Profile, case, and match must remain separate

PETTODO must preserve the distinction between:

- animal profile
- case
- match result

These are different concepts and must not collapse into a single record.

---

## 3.2 Every workflow must persist against canonical records

Real product behavior must persist against database-backed entities.

Frontend-only state must never become the source of truth.

---

## 3.3 Canonical truth is not the same as public output

The internal database may store richer information than public pages display.

Public outputs must be derived using:

- canonical records
- visibility settings
- profile type
- review state
- trust and safety policy

---

## 3.4 Exact location must not be public

Precise coordinates must never be exposed directly.

Public location must always use an approximate representation.

---

## 3.5 Shared records must support review

Community Dog creation and sensitive shared record edits must support review states.

Direct edits without governance are not allowed.

---

## 3.6 Evidence-backed actions are first-class records

Evidence must be stored as structured records.

Evidence must not be treated as loose file attachments.

---

## 3.7 AI outputs must be auditable

Matching and analysis must persist:

- provider name
- model version
- processing metadata
- reasoning bundle when available

---

## 3.8 Auditability is part of the model

Sensitive actions must be traceable through audit logs.

Examples include:

- protected contact usage
- moderation actions
- review decisions
- role changes

---

## 3.9 Avoid premature over-modeling

MVP should avoid complex reputation systems or advanced social graph models.

The goal is a stable and implementable domain model.

---

# 4. Universal data conventions

## 4.1 Core metadata

Most records should include:

- id
- created_at
- updated_at
- created_by_user_id (when applicable)
- updated_by_user_id (when applicable)

---

## 4.2 Visibility level

Records that appear publicly should support visibility states such as:

- public
- account_required
- restricted
- private_internal

---

## 4.3 Review state

Trust-sensitive records may support:

- pending_review
- approved
- rejected

---

## 4.4 Risk tier

Optional classification:

- low
- medium
- high

---

## 4.5 Soft deletion

Prefer states such as:

- archived
- hidden
- revoked

instead of permanent deletion.

---

## 4.6 Structured JSON

JSON fields may be used for:

- extracted attributes
- AI metadata
- evidence payloads
- proposed changes

Core relationships should remain relational.

---

# 5. Core domain overview

PETTODO’s MVP revolves around these domains:

1. Users and access
2. Animal identity
3. Cases and case history
4. Media and AI outputs
5. Matching
6. Actions and evidence
7. Shared-record governance
8. Protected contact
9. Moderation and audit
10. QR and public links

---

# 6. Recommended entity model

---

# 6.1 Users and access

## users

Internal PETTODO account record.

Responsibilities:

- one row per account
- linked to external auth provider
- minimal internal identity

Fields include:

- external auth id
- email
- display name
- phone (optional)
- account status
- verification state

---

## user_roles

Role assignments.

Possible values:

- user
- moderator
- operator

Role assignments must be auditable.

---

## user_preferences

Optional user configuration.

Examples:

- notification preferences
- contact permissions
- language settings

---

# 6.2 Animal identity

## animals

Canonical animal identity record.

Fields include:

- profile_type  
  owned_pet  
  community_dog  
  stray_dog  
  unknown_animal

- species
- name (optional)
- sex
- age estimate
- breed or type
- description
- visible traits
- owner_user_id (owned pets only)
- record status
- review state

This record defines identity, not cases.

---

## animal_classification_history

Tracks profile-type transitions.

Examples:

Unknown Animal → Owned Pet  
Stray Dog → Community Dog

Fields include:

- animal_id
- previous_type
- new_type
- reason
- supporting evidence
- actor
- timestamp

---

## animal_visibility_settings

Controls profile exposure.

Examples:

- public profile enabled
- visible fields
- contact permissions

---

## animal_zones

Stores animal area context.

Examples:

- home zone
- habitual area
- sighting zone

Fields include:

- animal_id
- zone_type
- internal coordinates
- public approximate coordinates
- label
- confidence

---

# 6.3 Cases and case history

## cases

Event record for an animal.

Case types:

- lost
- found
- sighted

Fields include:

- animal_id
- case_type
- lifecycle_status
- visibility_level
- created_by_user_id
- opened_at
- resolved_at
- public_area

Rules:

- cases never overwrite animal identity
- animals may have multiple cases over time

---

## case_events

Timeline history for cases.

Examples:

- case created
- status changed
- case resolved
- moderation intervention

---

## case_reports

Structured reports attached to a case.

Examples:

- sighting
- found confirmation
- location update

Fields include:

- case_id
- report_type
- user_id
- time_seen
- approximate location
- confidence
- media references

---

# 6.4 Media and AI analysis

## media_assets

Canonical media file reference.

Fields include:

- owner_entity_type
- owner_entity_id
- uploaded_by_user_id
- storage_key
- mime_type
- visibility_level
- moderation_state

---

## media_variants

Derived media such as:

- thumbnails
- compressed versions
- crops

---

## media_analysis_results

AI analysis results.

Examples:

- photo quality
- extracted attributes
- moderation signals

---

## embeddings

Vector embeddings for similarity search.

Fields include:

- subject_type
- subject_id
- provider
- model
- vector_reference
- created_at

---

# 6.5 Matching

## match_runs

Represents one matching process execution.

Triggers include:

- new case
- new photo
- manual refresh

---

## match_candidates

Ranked candidates produced by a match run.

Fields include:

- match_run_id
- target_animal_id
- score
- score_band
- reasoning bundle

Matches are suggestions, not proof.

---

# 6.6 Actions and evidence

## animal_actions

Historical actions linked to an animal.

Examples:

- vaccination
- sterilization
- feeding
- care update

Fields include:

- animal_id
- case_id
- action_type
- actor_user_id
- payload
- visibility

---

## evidence_items

Evidence supporting claims.

Evidence types:

- photo
- document
- structured confirmation

Fields include:

- target_entity_type
- target_entity_id
- evidence_type
- media_asset_id
- verification_state

---

# 6.7 Shared-record governance

## change_requests

Proposed changes to shared records.

Examples:

- Community Dog creation
- vaccination update
- classification change

Fields include:

- target_entity_type
- target_entity_id
- request_type
- proposed_changes
- requested_by_user_id
- review_state

---

## review_decisions

Final review outcomes.

Fields include:

- reviewer_user_id
- decision
- reason_code
- notes

---

# 6.8 Protected contact

## protected_contact_threads

Relay-first contact container.

Fields include:

- animal_id
- case_id
- requester_user_id
- recipient_user_id
- status
- reveal_state

---

## protected_contact_messages

Messages inside the contact thread.

Fields include:

- thread_id
- sender_user_id
- message
- created_at

---

## protected_contact_events

Audit events for contact behavior.

Examples:

- contact initiated
- reveal accepted
- rate limit triggered

---

# 6.9 Moderation and audit

## abuse_flags

Risk or abuse signals.

Targets include:

- users
- animals
- cases
- media
- change requests

---

## audit_logs

Internal audit trail.

Examples:

- moderation decisions
- role grants
- protected contact usage
- sensitive record access

---

# 6.10 QR and public links

## public_links

Public-access token system.

Used for:

- public profiles
- public cases
- QR landing pages

---

## qr_identities

QR association with animals.

Fields include:

- animal_id
- public_link_id
- issued_at
- revoked_at

---

## share_artifacts

Generated share outputs.

Examples:

- flyers
- share cards
- PDF exports

---

# 7. Relationship rules

User → Animals  
One user may create many animals.

Animal → Cases  
One animal may have many cases.

Animal → Actions  
One animal may have many actions.

Case → Reports  
One case may have many reports.

Match Runs → Candidates  
One run may produce many candidates.

---

# 8. Public data rule

Canonical data remains internal.

Public views are derived using:

- visibility rules
- policy filters
- review states

---

# 9. Derived vs canonical state

Canonical data includes:

- animals
- cases
- actions
- evidence
- change_requests

Derived state includes:

- current status badges
- match summaries
- cached public views

Derived state must never replace canonical records.

---

# 10. MVP minimum table set

Minimum recommended schema for MVP:

users  
user_roles  
animals  
animal_classification_history  
animal_visibility_settings  
animal_zones  
cases  
case_events  
case_reports  
media_assets  
media_analysis_results  
embeddings  
match_runs  
match_candidates  
animal_actions  
evidence_items  
change_requests  
review_decisions  
protected_contact_threads  
protected_contact_messages  
protected_contact_events  
abuse_flags  
audit_logs  
public_links  
qr_identities  
share_artifacts

---

# 11. Items intentionally not finalized

The following remain open:

- community confirmation thresholds
- exact moderation escalation rules
- trust reputation scoring
- duplicate animal merge system
- final retention policies
- exact public API contracts

Implementation must preserve flexibility for these future decisions.

---

# 12. Final rule

PETTODO’s data model must preserve:

- identity
- event history
- evidence
- review
- visibility
- protected contact

If these concerns collapse into simplified frontend-style objects, the model is incorrect.

If they remain independent first-class entities, the model aligns with PETTODO’s product direction.
