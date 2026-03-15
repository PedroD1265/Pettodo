# ENVIRONMENTS_PUBLIC

Purpose:
Define PETTODO’s official environment model, public-domain structure, configuration boundaries, and environment-specific exposure rules for the current MVP phase so build, QA, deployment, and release work can move from prototype ambiguity to controlled real-system execution.

What belongs here:
- official environment set for the current phase
- purpose and limits of each environment
- public domains and public-routing stance
- service usage by environment
- secrets and configuration rules
- data, media, and isolation rules by environment
- public exposure rules by environment
- minimum sanity checks before preview or production use
- what remains intentionally not finalized

Update rule:
Update when PETTODO’s official environment set, public-domain structure, runtime ownership, secret-management approach, deployment model, or environment-specific exposure rules materially change.

---

## 1. Why this document exists

PETTODO already has a serious prototype and a clear architectural direction.

What is still missing is an official operational environment note that tells the team:

- which environments exist right now
- what each environment is allowed to do
- which public URLs belong to landing vs app
- which services should be wired per environment
- how secrets and configuration should be handled
- what must stay isolated from production
- what must be true before real pilot users touch the system

This document is not the full deployment runbook.
It is the official environment and public-exposure baseline for the current MVP phase.

---

## 2. Scope and interpretation rule

This document should be interpreted together with:

- MASTER_CONTEXT.md
- CURRENT_STATE.md
- ARCHITECTURE.md
- WEBAPP_REPLIT.md
- PUBLIC_DATA_POLICY.md
- TRUST_AND_SAFETY.md
- QA_CURRENT.md
- RELEASE_CRITERIA.md

Interpretation rule:

- MASTER_CONTEXT defines stable product direction.
- CURRENT_STATE defines what is real today vs still simulated.
- ARCHITECTURE defines the recommended runtime, infra, and service ownership.
- WEBAPP_REPLIT defines how implementation work should use this environment model.
- PUBLIC_DATA_POLICY and TRUST_AND_SAFETY define what public exposure is acceptable.
- QA_CURRENT and RELEASE_CRITERIA define why environment discipline matters for beta readiness.

If these sources conflict, actual implementation reality and approved product truth win.

---

## 3. Official environment set for the current phase

## 3.1 Official environments

For the current MVP phase, PETTODO uses this official environment set:

- local
- preview/dev
- production

This is the official working model for this phase.
Do not invent extra permanent environments unless there is a real operational reason.

---

## 3.2 Environment philosophy

The purpose of the environment model is not to look enterprise-heavy.

The purpose is to make PETTODO:

- honest
- testable
- safer
- easier to review
- harder to confuse
- ready for pilot-style usage

If environment setup creates more ambiguity than clarity, it is wrong.

---

## 4. Environment definitions

## 4.1 Local

Purpose:
Used for local development, debugging, code review support, integration checks, and pre-push validation.

Typical usage:
- VS Code work
- Antigravity-assisted review
- local branch testing
- environment-level debugging before Replit deploy validation

Allowed characteristics:
- developer-oriented
- may use non-public URLs
- may use dev/test credentials
- may use seeded or disposable local-safe data
- should never be treated as public product truth

Important rules:
- local must not depend on production secrets hardcoded in code
- local must not silently mutate production data
- local must not become the only place where core behavior works

---

## 4.2 Preview/dev

Purpose:
Used for non-production deployed testing of real integrations, QA validation, feature review, and pre-release verification.

Typical usage:
- Replit preview or non-production deploy
- integration validation with external services
- QA checks on backend-backed flows
- release candidate review before production exposure

Allowed characteristics:
- may use real service integrations
- should use non-production credentials where possible
- should support route, auth, media, and persistence testing
- may be accessible to internal reviewers or controlled testers

Important rules:
- preview/dev is not a fake sandbox if it claims real integration
- preview/dev should be close enough to production to validate meaningful behavior
- preview/dev must not expose production-only sensitive data casually
- preview/dev should be the main pre-production truth-check environment

---

## 4.3 Production

Purpose:
Used for real pilot access, controlled real-user usage, and the official public app experience.

Typical usage:
- real pilot-style web testing
- official app domain usage
- real public profile / QR / case access
- controlled real-user flows

Allowed characteristics:
- stable public routing
- real integrations
- real records
- real trust-sensitive behavior
- real release review discipline

Important rules:
- production must not rely on demo-only assumptions
- production must not present fake integrations as real
- production must not be opened to users if environment confusion makes safe usage unrealistic
- production is for honest pilot use, not for pretending the beta cut line is already passed

---

## 5. Official public-domain structure

## 5.1 Official public domains for this phase

Recommended public-domain structure for the current phase:

- `pettodo.app` = landing
- `www.pettodo.app` = redirect to landing or same landing
- `app.pettodo.app` = main PETTODO web app

This is the official public interpretation for the current MVP phase.

---

## 5.2 Domain responsibility rule

Each public domain should have one clear job.

- landing domain should explain and convert
- app domain should run the actual PETTODO product
- future admin or API domains are optional and not current commitments

Do not blur landing and app responsibilities carelessly.

---

## 5.3 Current hosting stance

For the current phase:

- landing is handled separately from the app
- the main app remains in the current Replit-led runtime path
- future extraction of compute is possible, but not required before this document is valid

This document supports current execution, not a forced migration.

---

## 6. Service ownership by environment

## 6.1 Experience layer

### Landing
- public marketing and explanation surface
- separate from the app
- should not become the hidden owner of core product runtime

### Main app
- current main PETTODO web app runtime
- current primary user-facing product surface
- current place where core product flows become real

---

## 6.2 Identity layer

Primary direction for all serious environments:

- Firebase Auth as primary auth system
- Google-first sign-in experience
- role-aware access inside the same auth model

Environment rule:
- each environment should use environment-appropriate auth configuration
- do not mix production auth settings casually into local or preview/dev
- public and authenticated behavior must stay testable in preview/dev before production use

---

## 6.3 Data layer

Primary system of record direction:

- Azure Database for PostgreSQL as the serious transactional data layer

Environment rule:
- each environment must have its own connection configuration
- preview/dev and production must not be treated as the same database reality
- local work must not silently depend on production database access

Recommended stance:
- production data is protected
- preview/dev should use non-production data or controlled test data
- local should use local-safe or disposable data paths where practical

---

## 6.4 File and media layer

Primary object storage direction:

- Azure Blob Storage for images, derived assets, flyers, and supported documents

Environment rule:
- storage must be separated logically by environment
- production media must not be mixed casually with preview/dev media
- public assets should be intentionally derived and controlled, not exposed by raw default access

Recommended logical separation:
- environment-aware containers or prefixes
- clear distinction between originals, derived media, public assets, and moderation-sensitive assets

---

## 6.5 Async and processing layer

Primary direction:

- Azure Functions for background and processing-heavy jobs

Typical uses:
- image normalization
- thumbnails or crops
- embedding generation
- attribute extraction
- moderation-support tasks
- share artifact generation
- scheduled cleanup or maintenance

Environment rule:
- preview/dev should be able to validate job behavior without requiring production execution paths
- production async jobs must be observable enough to detect failure honestly

---

## 6.6 AI layer

Primary direction:

- Vertex AI / Gemini as the recommended current AI provider path
- provider-agnostic internal service contracts remain the architectural rule

Environment rule:
- provider credentials must be environment-specific
- preview/dev may validate real AI integration where feasible
- production should not expose provider secrets in frontend code
- AI availability or degradation should be handled honestly

---

## 6.7 Secrets layer

Primary direction:

- Azure Key Vault is the serious secrets source of truth
- runtime secrets may still be mirrored into Replit environment variables where required in this phase

Environment rule:
- no provider secret exposed in client
- no direct AI secret exposed in frontend
- no unrestricted storage credential exposure
- no hardcoded production secrets in repo or local config
- each environment must have clearly scoped credential material

---

## 7. Configuration rules by environment

## 7.1 Every external service must be environment-aware

At minimum, each serious environment should have distinct configuration for:

- auth
- database
- storage
- AI provider credentials
- async/job configuration
- communication credentials when applicable
- feature flags when needed

This is not optional once real integrations start.

---

## 7.2 Configuration source rule

Configuration should come from environment-level variables or managed secret/config sources.

Do not treat code edits as the main configuration mechanism for changing environments.

---

## 7.3 Feature-flag rule

Feature flags may be used when needed, especially for:

- protected rollout
- risky integrations
- partial AI availability
- admin or moderation surfaces
- production-safe dark launch of features

But feature flags must not become an excuse for hiding broken core flows indefinitely.

---

## 8. Public exposure rules by environment

## 8.1 Public exposure must follow policy in every environment

No environment is exempt from the core public trust rules.

That means:

- exact address should not be publicly shown
- exact coordinates should not be publicly shown
- owner data should not be exposed by default
- protected contact remains the default for owned pets
- public data should remain minimized
- Community Dog visibility may be broader than owned-pet visibility, but still controlled

Preview/dev is not a reason to be careless with public-trust logic.

---

## 8.2 Local public behavior

Local may simulate public pages for development, but:

- local simulation must not be mistaken for public production truth
- local should not leak production-like private data into screenshots, demos, or review artifacts
- local is acceptable for interface validation, not for proving public safety by itself

---

## 8.3 Preview/dev public behavior

Preview/dev may expose controlled public-like routes for internal review or limited testing, including:

- public animal profile rendering
- QR-linked pages
- case pages
- public-safe share outputs

But preview/dev should still avoid:

- uncontrolled indexing assumptions
- raw unrestricted media exposure
- production owner-data leakage
- exact location exposure
- accidental use of real production trust-sensitive records

---

## 8.4 Production public behavior

Production public routes may include, when implemented and approved:

- landing
- selected public profiles
- selected public case pages
- QR-linked pages
- public-safe share links

Production must not expose:

- direct owner contact by default
- exact address
- exact live location
- raw moderation data
- internal trust signals
- unrestricted shared-record editing paths

---

## 9. Data and isolation rules

## 9.1 Environment isolation rule

Core data, media, auth configuration, and processing credentials must be isolated by environment.

At a minimum, avoid these failures:

- preview/dev using production database casually
- preview/dev writing production media unintentionally
- local using production credentials by default
- production reading fake seed state as if it were system truth

---

## 9.2 Production-data discipline

Production should be treated as the only environment for real pilot records.

Preview/dev should not become a shadow production environment with unmanaged real-user data.

---

## 9.3 Test-data rule

Preview/dev should support controlled test records that let the team validate:

- sign-in
- animal creation
- QR/public flow
- case flow
- media flow
- matching
- protected contact
- Community Dog review-aware behavior

without requiring production trust assumptions.

---

## 10. Routing and deployment sanity rules

## 10.1 Routing truth rule

Stable production routing matters for beta readiness.

The product should not be considered ready for real pilot access if:

- deploy/routing behavior is too unstable for normal usage
- route fallback behavior is unreliable
- public links or QR paths break unpredictably
- environment confusion makes access unrealistic

---

## 10.2 Public-link continuity rule

Public profile, case, share, and QR-linked routes must remain coherent across the environment they are intended for.

Especially in production:

- QR must resolve correctly
- public link targets must remain stable enough for real use
- share outputs must not point to broken or ambiguous environments

---

## 10.3 Landing vs app separation rule

Landing and app may live in different delivery tracks, but user navigation must remain coherent.

Users should not be confused about whether they are in:

- the marketing site
- the real product
- a preview/test environment

---

## 11. Minimum sanity checks before meaningful preview/dev use

Before using preview/dev as a serious validation environment, confirm at least:

- auth configuration is correct for preview/dev
- database points to the intended non-production target
- storage points to the intended non-production target
- public/private route behavior is consistent
- no client-exposed secret exists
- QR/public routes resolve in the expected environment
- media upload and read paths are environment-correct
- failure states are visible enough to debug honestly

---

## 12. Minimum sanity checks before production use

Before exposing production to real pilot users, confirm at least:

- production auth is real and stable enough
- production persistence is real
- production public profile and QR routes are real
- production image storage is real
- production route behavior is stable enough for normal access
- public/private boundaries are enforced
- owner data is not exposed by default
- exact public location is not exposed
- protected contact or safe contact path is real where required
- core errors can be observed and investigated
- environment confusion is not undermining the release

---

## 13. QA and release usage rule

QA should use this document to verify environment truth, not only screen behavior.

That includes checking:

- whether a flow is real in the intended environment
- whether preview/dev is sufficiently production-like for the task being validated
- whether production access is honest and stable
- whether environment confusion is hiding release blockers

Release review should treat environment confusion as a real blocker, not a cosmetic issue.

---

## 14. Replit usage rule

Before meaningful Replit work touching real integrations, the operator should know:

- which environment the task targets
- which external services are expected to be real
- which secrets/config are required
- whether the task affects public routes
- whether the task changes what can be tested in preview/dev or production
- whether docs must be updated after the implementation

This document is part of that pre-task environment truth.

---

## 15. What this document does not finalize

This document does not fully finalize:

- exact cloud resource names
- exact Replit deployment settings
- exact secret names
- exact CI/CD implementation
- exact DNS provider workflow
- exact rollback runbook
- exact production observability stack
- exact admin subdomain rollout
- exact future split between preview and dev if that becomes necessary later

Those can be defined later in more detailed implementation or ops documents.

---

## 16. Final rule

PETTODO should not move into real Replit-backed integration work or real pilot exposure with vague environment assumptions.

If the team does not know which environment is using which services, which URLs are public, which secrets are active, and which trust boundaries apply, the environment model is not ready.

If local, preview/dev, and production each have a clear job and a controlled exposure model, PETTODO is much closer to honest beta execution.
