# WEBAPP_REPLIT

Purpose:
Define the official working model for building PETTODO’s core web app in Replit during the current MVP phase, so implementation stays aligned with product truth, architecture, trust/safety rules, QA reality, and beta-release priorities.

What belongs here:
- Replit’s official role in PETTODO
- what the Replit build should focus on now
- what should not distract the Replit workstream
- implementation rules for real-vs-demo work
- integration expectations with auth, storage, DB, AI, and external services
- workflow for turning specs into Replit execution
- output expectations after each Replit work session

Update rule:
Update when the official Replit workstream role, MVP build priorities, implementation workflow, or runtime responsibility changes materially.

---

## 1. Why this document exists

PETTODO already has a strong Replit-based product base.

At the same time, PETTODO is still not yet a fully real multi-user production system.
The main challenge now is not inventing more product surface.
The main challenge is turning the current Replit-built prototype depth into a real pilot-usable web app.

This document exists to make Replit work more disciplined by defining:

- what Replit is responsible for
- what the Replit workstream should focus on first
- how to avoid endless prototype expansion
- how to turn approved specs into implementation work
- how to connect Replit work to the wider PETTODO architecture
- how to report Replit progress without confusion

This is a build-operations document for the web app.

It is not the PRD.
It is not the architecture spec.
It is not the screen map.
It is not the full data model.

---

## 2. What this document is and is not

### This document is
- the execution guide for the core PETTODO web app in Replit
- a bridge between approved docs and practical implementation work
- a filter for deciding what Replit should build now vs later

### This document is not
- the full product definition
- the full UI inventory
- the full architecture spec
- a landing-page document
- a backlog replacement
- a legal/privacy document

---

## 3. Official role of Replit in PETTODO

### 3.1 Current role
**[confirmed]**

Replit is the main current build track for the PETTODO web app.

### 3.2 What that means
**[confirmed]**
Replit is responsible for helping turn the current advanced prototype into a real web app that can support pilot-style testing.

### 3.3 What Replit is not responsible for
**[confirmed]**
Replit is not the place to define:
- landing strategy
- official brand direction
- product truth
- legal policy
- final source-of-truth documentation

Those come from approved docs and must guide the build.

### 3.4 Supporting tools
**[confirmed / recommended]**
Replit is the primary builder.
Antigravity, VS Code, or other tools may support review, refactor, debugging, or local work, but they do not replace Replit as the official main build track for this phase.

---

## 4. Build objective for the Replit workstream

### 4.1 Main objective
**[confirmed]**

Use Replit to help PETTODO stop being a frontend-only demo and become a real web-based product for pilot testing.

### 4.2 Core implementation target
**[confirmed]**
The Replit workstream should prioritize making these capabilities real:

- sign-in
- persistence
- animal profile creation
- QR/public profile flows
- lost / found / sighted case creation
- image upload/storage
- match suggestions
- protected contact
- controlled Community Dog creation
- minimum moderation/admin capability
- share/flyer outputs
- trust-safe public behavior

### 4.3 Non-goal for this phase
**[confirmed]**
The Replit workstream should not spend core time first on:
- polishing non-core ecosystem features into maturity
- overbuilding marketplace/social modules
- visual expansion that does not improve beta readiness
- adding more demo-only flows that do not become real
- speculative features outside current MVP truth

---

## 5. Replit build priorities

## 5.1 Priority 1 — Turn core demo flows into real flows
**[confirmed]**

Replit should first replace demo/local-only behavior in critical product paths.

Examples:
- localStorage-only core state
- fake OTP / fake auth
- simulated protected contact
- simulated image persistence
- fake case persistence
- fake public profile backing

## 5.2 Priority 2 — Preserve what is already strong
**[confirmed]**

The current app already has strong value in:
- route coverage
- product framing
- emergency logic
- QR logic
- Community Dogs presence
- maps
- trust/safety language
- daily/emergency logic

Replit work should preserve these strengths while making the core infrastructure real.

## 5.3 Priority 3 — Do not mistake breadth for readiness
**[confirmed]**

A screen existing does not mean the capability is release-ready.
Replit work should prioritize:
- real capability
- stable flow truth
- beta-cut-line progress

over:
- adding more screens
- cosmetic breadth
- visual complexity without real infrastructure

---

## 6. What Replit should build now

The following are the main types of work that should be implemented through the Replit workstream now.

### 6.1 Core account and session work
- real sign-in
- route protection
- user session handling
- role-aware access
- public vs authenticated behavior separation

### 6.2 Core animal identity work
- animal profile creation/editing
- digital identity persistence
- QR creation/linkage
- public profile rendering backed by real records

### 6.3 Core case work
- create LOST / FOUND / SIGHTED cases
- update and resolve cases
- connect cases to animal profile logic where appropriate
- preserve case vs animal separation

### 6.4 Core media work
- real image upload flow
- real file persistence integration
- derived image handling
- image quality checks
- media linked to animal and case records

### 6.5 Core matching work
- real match pipeline integration
- match scoring/ranking presentation
- caution framing
- no false certainty
- useful next steps after match results

### 6.6 Core trust-sensitive work
- protected contact
- public/private data boundaries in the UI and backend behavior
- Community Dog contribution controls
- review states
- admin/operator minimum tooling

### 6.7 Core share/output work
- flyer/share generation from real data
- public-safe sharing flows
- QR/public link continuity

---

## 7. What Replit should not prioritize now

### 7.1 Low-priority maturity work
Do not prioritize first:
- fully mature walkers marketplace
- fully mature play dates system
- fully mature events/community social layer
- advanced rewards/points economy
- advanced sponsorship systems

### 7.2 Demo-expansion work
Do not prioritize:
- adding more demo-only screens for appearance
- fake “smart” features with no real backing
- visual complexity that makes the app harder to stabilize

### 7.3 Architecture drift
Do not let Replit work drift into:
- hidden local-only core logic presented as real
- provider-specific coupling that breaks architecture decisions
- unrestricted public-data behavior
- UI claims that exceed implementation truth

---

## 8. Required reading before any meaningful Replit task

Before starting a meaningful Replit task, the agent/operator should read:

### Always
- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `ARCHITECTURE.md`

### Then, depending on the task
- `PRD_MVP_WEBAPP.md`
- `PUBLIC_DATA_POLICY.md`
- `TRUST_AND_SAFETY.md`
- `QA_CURRENT.md`
- `RELEASE_CRITERIA.md`
- `SCREEN_ROUTE_MAP.md` when available
- `DATA_MODEL.md` when available
- `ENVIRONMENTS_PUBLIC.md` when available

### Continuity
- latest relevant handoff

Important:
Do not start major Replit work from memory alone if it touches core product truth, public data, architecture, or beta blockers.

---

## 9. Replit execution workflow

Use this flow for meaningful work sessions.

### Step 1 — identify the task
State clearly what kind of Replit task it is:
- auth
- persistence
- profile
- QR/public profile
- case flow
- image flow
- matching
- protected contact
- Community Dog logic
- moderation/admin
- deployment/integration
- refactor/fix

### Step 2 — load the minimum correct context
Read the minimum required documents for that task.

### Step 3 — define a mini-spec
Before asking Replit to build, define:
- objective
- scope
- what must remain unchanged
- constraints
- acceptance criteria
- docs used as source of truth

### Step 4 — execute in Replit
Ask Replit to implement the change within the approved constraints.

### Step 5 — inspect the result
Check:
- what became real
- what remains simulated
- what routes/components changed
- what broke
- what docs may now be outdated

### Step 6 — decide whether docs need updating
Only update stable docs if:
- implementation reality changed materially
- a project truth changed
- a contradiction was discovered

### Step 7 — leave handoff
For meaningful work, leave a handoff summarizing:
- task completed
- files or areas touched
- new truth
- unresolved issues
- next best step

---

## 10. Replit implementation rules

## 10.1 Real vs demo rule
**[confirmed]**

If a flow is still demo/local-only, do not present it internally as already production-real.

### Acceptable language
- prototype-only
- simulated
- local-first
- demo-backed
- partially real

### Not acceptable language
- done
- production-ready
- real
- solved

unless that is actually true.

## 10.2 Core truth rule
**[confirmed]**
Do not let Replit implementation break core PETTODO truths such as:
- PETTODO is not only a lost-pet app
- owned pet != Community Dog != Stray Dog != Unknown Animal
- case != profile != match result
- protected contact is default for owned pets
- public location is approximate
- AI does not equal guaranteed identity truth

## 10.3 Architecture compliance rule
**[confirmed]**
Replit work should follow the approved architecture direction:
- Replit as current runtime
- external system of record
- Azure operational services
- Firebase Auth
- provider-agnostic AI layer
- safer public/private boundaries

Do not hardwire local-only patterns into the app in ways that fight the architecture.

## 10.4 Trust-safe UI rule
**[confirmed]**
UI work in Replit must preserve critical trust/safety language and safe behavior where applicable.

Do not remove or weaken:
- protected contact framing
- approximate-area rules
- safe handoff reminders
- caution language for matches
- abuse/suspicion reporting surfaces where already required

---

## 11. Integration expectations for Replit

## 11.1 Database
**[confirmed / recommended]**
Replit should integrate with the approved external DB direction rather than expanding local-only product truth.

## 11.2 Storage
**[confirmed / recommended]**
Replit should integrate with external file/object storage for real media and assets rather than keeping critical media behavior local/demo-only.

## 11.3 Auth
**[confirmed / recommended]**
Replit should implement real auth behavior aligned with the chosen auth provider and route protection model.

## 11.4 AI
**[confirmed / recommended]**
Replit should call internal/provider-adapter logic for AI features rather than baking provider-specific assumptions directly into the UI flow.

## 11.5 Async jobs
**[confirmed / recommended]**
Heavy processing should not block the main user request path when it can be handled asynchronously.

---

## 12. Quality rules for Replit output

A Replit implementation pass is good only if it is:

- aligned with approved docs
- honest about what is real vs simulated
- stable enough to test
- not creating hidden contradictions
- moving toward beta readiness
- not weakening trust/privacy behavior
- not increasing architecture debt carelessly

### Red flags
A Replit iteration is weak if it:
- adds more fake behavior instead of replacing fake behavior
- hides unresolved infrastructure gaps
- changes product logic without doc grounding
- breaks public/private rules
- overpromises capability in the UI
- increases complexity without helping the beta cut line

---

## 13. Expected outputs after a meaningful Replit session

After a meaningful Replit work session, the return should ideally include:

- what was implemented
- what was partially implemented
- what remains simulated
- which routes/components/files were touched
- what external services were integrated or changed
- what broke or became risky
- what docs may need updating
- what the next task should be

This should later feed into a handoff.

---

## 14. Replit-specific acceptance mindset

For PETTODO, a change should usually be considered acceptable in Replit only if:

- the change solves a real MVP need
- the change respects trust/privacy architecture
- the change does not confuse prototype breadth with real product maturity
- the change moves at least one core release criterion closer to true
- the app remains mobile-first and usable

If a change only makes the prototype look busier, it is probably not the right priority.

---

## 15. Replit and documentation relationship

### 15.1 Docs guide Replit
Stable docs guide the Replit workstream.

### 15.2 Replit does not silently redefine docs
If implementation reveals a contradiction, that contradiction should be reported and resolved explicitly.

### 15.3 Replit sessions should not create shadow truth
The current truth must live in approved docs and handoffs, not only in the memory of a builder session.

---

## 16. Minimum beta-oriented focus for Replit

Until the real beta cut line is met, Replit work should keep returning to this core checklist:

- real sign-in
- real persistence
- real image upload/storage
- real public animal profile flows
- real case creation
- real QR-linked public access
- controlled Community Dog creation
- real protected contact flow
- practical AI-assisted workflows
- minimum trust and safety required for real-user testing

If a task does not clearly support that trajectory, it should be questioned before execution.

---

## 17. Final rule

Replit should be used to turn PETTODO into a real web product, not just a more polished prototype.

The goal of the Replit workstream is not:
“add more interface.”

The goal is:
“make the core system real, testable, and honest.”
