# LOVABLE_PROMPT_TEMPLATE

Purpose:
Provide the official reusable prompt structure for creating and iterating the PETTODO landing page in Lovable without drifting from product truth, brand direction, messaging rules, CTA logic, or landing structure.

What belongs here:
- reusable prompt scaffold for Lovable
- required source-of-truth documents
- mandatory context packaging rules
- brand constraints
- page structure instructions
- copy and visual guardrails
- data/counter usage rules
- allowed / disallowed claims
- iteration request formats
- review and handoff rules

Update rule:
Update when the landing strategy, CTA logic, section architecture, brand direction, messaging rules, language behavior, or Lovable workflow changes materially.

---

## 1. Why this template exists

This template exists to make Lovable iterations faster, cleaner, and more consistent.

`LANDING_LOVABLE.md` defines the official landing strategy.
This file translates that strategy into a practical prompt system that can be reused across:
- first landing generation
- section rewrites
- visual iterations
- CTA adjustments
- copy cleanup
- bilingual refinements
- review/fix cycles

This document should reduce:
- prompt inconsistency
- repeated re-explanation
- accidental feature invention
- wrong product framing
- brand drift
- landing drift away from PETTODO’s real MVP

---

## 2. Documents that must be treated as source of truth

Before using this template, the operator should have access to:

- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `BRAND_SYSTEM.md`
- `LANDING_LOVABLE.md`

Required support when relevant:
- `PRD_MVP_WEBAPP.md`
- latest landing handoff
- latest review notes
- latest accepted landing version

Important:
If Lovable output conflicts with these documents, the docs win.

---

## 3. Non-negotiable truth rules for Lovable

Any prompt built from this template must preserve these rules:

### 3.1 Product truth
PETTODO is:
- a community-powered network for managing and recovering pets
- useful before emergencies, during emergencies, and in selected community-animal scenarios
- not only a lost-pet app
- not primarily a marketplace
- not an uncontrolled social network

### 3.2 Current delivery truth
The landing must present PETTODO as:
- a real web app users can start trying now

The landing must not present PETTODO as:
- just an idea
- only a pilot concept
- an unfinished mockup
- a fully mature nationwide platform
- a finished marketplace
- a fully released native mobile app

### 3.3 CTA truth
Primary CTA:
**Prueba PETTODO ahora**

CTA destination:
- the PETTODO web app

The CTA should appear:
- in the hero
- again near the end of the landing

### 3.4 Safety truth
The landing must reinforce that PETTODO:
- protects sensitive information
- uses safer contact logic
- does not expose owner data by default
- does not claim perfect AI certainty

### 3.5 Community Dogs truth
Community Dogs matter and deserve a strong section, but they must not dominate the hero or make PETTODO look like only a street-dog management product.

### 3.6 Brand truth
The landing must follow the approved PETTODO brand direction:
- use the selected logo
- use the selected favicon / symbol
- follow the current blue + green brand direction
- keep the tone trustworthy, useful, calm, and human
- avoid childish, generic, alarmist, or rescue-poster aesthetics

### 3.7 Data truth
If the landing includes data, counters, comparisons, or contextual statistics:
- only use verified and documented numbers
- do not invent statistics
- do not use manipulative or random claims
- do not force counters if the data is not ready

---

## 4. Mandatory prompt-building rules

Every Lovable prompt should:

- be written as an implementation brief, not as brainstorming
- assume core product decisions are already made
- ask Lovable to build within constraints
- explicitly forbid invented claims and invented features
- request clean hierarchy and modern visual quality
- ask for editable, modular sections
- ask for mobile-first responsive behavior
- state whether the task is:
  - first build
  - revision
  - copy refinement
  - visual refinement
  - bilingual pass
  - cleanup after review

Do not send vague prompts like:
- “make it better”
- “make it modern”
- “make it more emotional”
- “build a cool landing for pets”

That kind of prompting causes drift.

---

## 5. Standard operating flow for Lovable work

Use this sequence whenever possible:

### Step 1
Start from the official PETTODO landing direction.

### Step 2
Tell Lovable exactly what type of iteration is needed.

### Step 3
Lock the message, CTA, required assets, and forbidden claims.

### Step 4
Specify the section structure to preserve or adjust.

### Step 5
Specify brand, visual direction, and tone.

### Step 6
If using data/counters, specify which numbers are approved and documented.

### Step 7
After output, review against:
- product truth
- landing truth
- safety truth
- CTA truth
- brand truth
- section completeness
- claim discipline

### Step 8
Create a corrective follow-up prompt only for the gaps found.

---

## 6. Reusable master prompt template for full landing generation

Use this when generating a full landing version in Lovable.

---

### TEMPLATE — FULL LANDING GENERATION

Act as a senior product marketing designer and landing-page builder working inside Lovable.

Build the PETTODO landing page using the following instructions as fixed constraints, not optional inspiration.

## 1. Task
[Describe whether this is:
- a first version,
- a redesign,
- a refinement,
- or a section update.]

## 2. Product context
PETTODO is a community-powered network for managing and recovering pets.

Important:
- PETTODO is not only a lost-pet app
- it helps users care for pets, organize pet information, build animal identity, and act better in recovery situations
- it also includes a controlled community-animal dimension, including Community Dogs
- it should feel useful before emergencies, not only during emergencies

## 3. Current state constraints
PETTODO should be presented as:
- a real web app ready for first users
- not just an idea
- not just a demo
- not a fully mature nationwide-scale system
- not a finished marketplace
- not a fully released native mobile app

Do not overpromise features that are not part of the approved current direction.

## 4. Brand constraints
Use the approved PETTODO brand direction.

Required assets and visual rules:
- use the approved PETTODO logo
- use the approved favicon / symbol
- follow the approved blue + green brand direction
- treat current logo artwork as the visual source of truth
- do not invent alternate official colors
- do not replace the logo casually with random font approximations

Brand tone:
- trustworthy and structured in sensitive topics
- warm and human in daily-care/community topics

Brand should not feel:
- childish
- generic pet app
- overly veterinary
- improvised NGO-like
- AI-hype driven
- alarmist by default

## 5. Landing objective
The landing must:
- explain why PETTODO exists
- make users understand the problem PETTODO solves
- show the product is useful and real
- motivate users to try the web app
- create trust
- communicate both everyday value and recovery value

## 6. Target audience
Primary audience:
[insert]

Secondary audience:
[insert]

Tertiary audience:
[insert]

The landing should speak first to the primary audience without erasing the broader community dimension.

## 7. Main CTA
Primary CTA:
[insert exact CTA]

CTA destination:
[insert destination]

The CTA should appear:
- in the hero
- near the end of the page

## 8. Required page structure
Create the page as a scrolling landing with these sections:

1. Hero
2. Problem / context / data section
3. Core product features
4. Community Dogs / community-animal section
5. More product functions / broader ecosystem
6. Safety / trust section
7. Allies / support section
8. Final CTA section

## 9. Hero message
Use this headline:
**Una red para cuidar, identificar y recuperar mascotas.**

Use this subheadline:
**Cuida mejor a tu mascota, organiza su información y accede a herramientas inteligentes dentro de una comunidad que protege y cuida a las mascotas.**

## 10. Section guidance

### Hero
Must include:
- main headline
- supporting subheadline
- CTA
- product-oriented visual
- strong first impression of trust + usefulness

### Problem / context / data
Should:
- explain the problem clearly
- use structured contextual information
- include meaningful data/counters only if verified and documented
- inform and emotionally engage without exaggeration

### Core product features
Should highlight:
- pet information organization
- digital identity
- QR
- intelligent tools
- practical daily value
- recovery usefulness

### Community Dogs section
Important:
- this is strong and meaningful
- but should not dominate the hero identity of the product
- frame it as responsible visibility, care, and control
- avoid making PETTODO look like only a street-dog app

### More functions / ecosystem
Should:
- briefly show broader product potential
- avoid overwhelming the user
- not turn into a marketplace-heavy presentation

### Safety / trust section
Should explain:
- protected contact
- organized information
- safer visibility
- trust-sensitive design

### Allies / support section
Should:
- invite contact from people or organizations who want to support or collaborate
- include a form with:
  - name
  - contact number
  - Gmail/email
  - message/comment
  - submit action

### Final CTA
Repeat the main CTA clearly.

## 11. AI positioning
AI is part of PETTODO, but it is not the whole brand.

The landing may present AI as:
- useful intelligent support
- matching assistance
- image/helpful-tool support
- workflow support

Do not:
- make AI the main identity of the landing
- overpromise certainty
- imply AI alone solves recovery

## 12. Message constraints
The landing may say that PETTODO helps users:
- care for pets
- organize pet information
- build digital identity
- use QR/public profile logic
- use intelligent tools
- act better in recovery scenarios
- give responsible visibility to community dogs

The landing must NOT imply:
- guaranteed recovery
- perfect AI recognition
- fully mature nationwide deployment
- complete marketplace maturity
- unrestricted public editing of animal records
- public exposure of owner data by default
- universal partner support already active
- complete public-animal control system already proven at scale

## 13. Visual direction
Use a balanced mix of:
- product mockups / UI screenshots / idealized UI views
- emotionally relevant pet photography
- clean spacing
- modern hierarchy
- restrained visual system

Avoid:
- childish visuals
- over-illustration
- rescue-poster style drama
- generic startup gradients everywhere
- clutter
- too much copy density in one block

## 14. Language
Prepare the structure so the landing supports Spanish and English with a visible ES / EN toggle.

## 15. Output expectations
I want:
- a coherent landing page
- strong hierarchy
- modern but practical design
- product seriousness
- clear CTA
- consistent PETTODO branding
- no overpromising
- no invented partner logos, metrics, testimonials, or fake credibility signals

If needed, prioritize clarity and trust over decorative flourishes.

---

## 7. Reusable prompt template for section-only iteration

Use this when one section needs revision without rebuilding the whole landing.

---

### TEMPLATE — SECTION ITERATION

Revise only the following landing section for PETTODO:
[SECTION NAME]

Keep unchanged:
- the overall product truth
- the main CTA logic
- the current landing structure
- the approved brand direction
- the serious + human PETTODO tone

Goal of this revision:
[DESCRIBE THE SPECIFIC PROBLEM]

Requirements:
- do not invent features
- do not invent claims
- do not make PETTODO look like only a lost-pet app
- do not oversell AI
- preserve readability and clear hierarchy
- preserve consistency with a real web app ready for first users
- preserve logo/favicons/brand direction already approved

Section-specific direction:
[ADD EXACT COPY / VISUAL / STRUCTURE NOTES]

Return:
- revised section structure
- improved copy
- any layout adjustment only if it helps clarity

Do not rewrite unrelated sections.

---

## 8. Reusable prompt template for review-fix cycle

Use this after reviewing a Lovable version and detecting concrete problems.

---

### TEMPLATE — REVIEW FIX

Revise the current PETTODO landing based on these exact issues.

Problems detected:
1. [ISSUE]
2. [ISSUE]
3. [ISSUE]

What must remain unchanged:
- PETTODO core message
- primary CTA: “Prueba PETTODO ahora”
- the product truth that PETTODO is useful in daily care and recovery
- the approved brand direction
- the serious + useful + community-aware tone

Fix instructions:
- correct only the detected issues
- do not rebuild the whole landing unless required
- do not introduce new features
- do not add invented proof points
- do not invent data/counters
- keep the landing aligned with a real web app, not a concept-only page

Expected output:
- corrected sections
- clearer hierarchy where needed
- cleaner copy where needed
- no drift from the official landing brief

---

## 9. Reusable prompt template for bilingual pass

Use this when the landing already exists and needs ES / EN consistency.

---

### TEMPLATE — BILINGUAL PASS

Refine the PETTODO landing so it supports Spanish and English cleanly.

Requirements:
- preserve the same meaning across both languages
- do not translate mechanically if clarity suffers
- keep CTA logic equivalent
- preserve brand tone
- keep safety/trust language serious and precise
- keep warm/productive tone in care-related sections

Important:
- Spanish should feel native and natural for Bolivia/LatAm users
- English should feel clear, modern, and neutral
- do not change product claims during translation
- do not add or remove sections unless necessary for clarity

Check especially:
- headline
- subheadline
- CTA labels
- section titles
- support form labels
- safety / trust phrasing

---

## 10. Required context block to paste before custom prompts

Use this block before any custom Lovable request if the session needs grounding.

---

### CONTEXT BLOCK

PETTODO is a community-powered network for managing and recovering pets.
It creates value before emergencies through pet identity, organization, QR access, and useful daily tools.
It also helps in lost / found / sighted situations through visibility, matching support, and safer contact flows.
Community Dogs are part of the product in a controlled way, but PETTODO should not be framed as only a street-dog platform.
The landing must present PETTODO as a real web app users can start trying now.
Primary CTA: “Prueba PETTODO ahora”.
Use the approved PETTODO logo, favicon/symbol, and blue + green brand direction.
Do not invent metrics, claims, partners, or mature features that are not already real.
Only use verified and documented numbers if a data/counter section is included.

---

## 11. Prompt variables that the operator should fill

Before sending a prompt to Lovable, define:

- **Task type:** first build / rewrite / section edit / visual cleanup / bilingual pass / fix cycle
- **Target section:** full page or exact section name
- **Main objective:** what must improve
- **Protected elements:** what must not change
- **Known mistakes to avoid:** exact product or message drift risks
- **Expected output:** full rewrite / section rewrite / layout improvement / copy cleanup

---

## 12. Prompt customization checklist

Before sending a prompt to Lovable, make sure the following are filled:

- [ ] exact task
- [ ] exact target audience
- [ ] exact CTA
- [ ] exact CTA destination
- [ ] approved headline/subheadline if already defined
- [ ] section ordering confirmed
- [ ] AI positioning confirmed
- [ ] Community Dogs positioning confirmed
- [ ] claims constraints confirmed
- [ ] current logo/favicons available
- [ ] visual direction available
- [ ] approved numbers/counters available, if applicable
- [ ] latest audit/review notes checked

---

## 13. Fast-fill variables

Use this small block when preparing a specific prompt:

### Prompt variables
- Task:
- Main headline:
- Subheadline:
- Primary CTA:
- CTA destination:
- Primary audience:
- Secondary audience:
- Tertiary audience:
- Key data points to show:
- Key features to highlight:
- Community Dogs emphasis:
- AI emphasis:
- Ally/support CTA:
- Required language mode:
- Notes from latest audit:

---

## 14. Allowed asks inside Lovable prompts

It is valid to ask Lovable for:

- stronger hierarchy
- cleaner spacing
- more product realism
- better screenshot/mockup balance
- better CTA visibility
- clearer section transitions
- more trust-oriented copy
- better emotional restraint
- stronger explanation of daily usefulness
- stronger but controlled Community Dogs section
- cleaner bilingual handling
- better use of approved brand assets
- better use of verified contextual data

---

## 15. Disallowed asks inside Lovable prompts

Do not ask Lovable to:

- invent user metrics
- invent testimonials
- invent NGO/institutional backing
- make PETTODO look nationwide if it is not stated
- promise guaranteed recovery
- promise perfect recognition
- make AI the hero of the brand
- turn the landing into a generic pet shop or marketplace site
- turn the landing into a rescue-only NGO site
- turn Community Dogs into the full identity of PETTODO
- force counters when no verified numbers are available
- use random brand colors or random substitute logos

---

## 16. Anti-drift rules

A Lovable prompt for PETTODO must never drift into:

- generic pet app landing
- AI startup landing
- rescue NGO poster
- marketplace-first landing
- overpromised product maturity
- vague “community” without useful product explanation
- random visual system detached from the approved brand

If the prompt allows too much ambiguity, rewrite it before sending.

---

## 17. Review checklist after each Lovable iteration

After each iteration, review the output with these questions:

### Message
- Does the landing still describe PETTODO correctly?
- Does it still communicate daily usefulness plus emergency usefulness?
- Does it avoid the “only lost-pet app” trap?

### Product truth
- Does it match the real MVP direction?
- Does it avoid promising things that are not ready?

### CTA
- Is “Prueba PETTODO ahora” visible and clear?
- Does the CTA feel natural, not repetitive or spammy?

### Community Dogs
- Are they present strongly but not dominating the hero?
- Is the framing controlled and responsible?

### Safety / trust
- Does the landing communicate protected contact and controlled visibility?
- Does it avoid careless public-data messaging?

### AI
- Does it show smart capability without hype?
- Does it avoid certainty claims?

### Brand
- Does it follow `BRAND_SYSTEM.md`?
- Does it use the logo and colors correctly?
- Does it feel trustworthy + human?

### Data / proof
- If counters or statistics appear, are they verified and documented?
- Does the page avoid fake proof signals?

### Visual quality
- Does it feel modern, real, and useful?
- Is there a good balance of emotional relevance and product seriousness?

### Structure
- Are all required sections present?
- Is the allies/support section clear and practical?

---

## 18. Handoff note after Lovable output

After Lovable generates a version, the result should be reviewed against:

- `MASTER_CONTEXT.md`
- `CURRENT_STATE.md`
- `BRAND_SYSTEM.md`
- `LANDING_LOVABLE.md`

Then documented in a landing handoff including:
- prompt used
- what changed
- what worked
- what failed
- what should be fixed next
- what must not change in the next iteration

---

## 19. Output rule for operators

When using Lovable, save or document:

- the prompt used
- what version it generated
- what changed from the prior iteration
- what still failed review
- what the next correction prompt should focus on

This helps prevent random iteration loops.

---

## 20. Practical usage note

This file is not the landing strategy itself.
It is the execution template that helps turn the landing strategy into consistent Lovable prompts.

Use:
- `LANDING_LOVABLE.md` to decide what the landing should be
- `LOVABLE_PROMPT_TEMPLATE.md` to ask Lovable to build it correctly
- review docs/templates to evaluate the result and refine it
- handoff docs/templates to preserve continuity across iterations
