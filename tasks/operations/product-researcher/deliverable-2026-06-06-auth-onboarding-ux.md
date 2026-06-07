PRODUCT RESEARCH REPORT — Auth & Onboarding UX / First Value Moment — 2026-06-06

---

HYPOTHESIS TESTED:
"New Forkd users will reach their first value moment (saving or uploading a recipe) faster if onboarding
is structured around content-first discovery rather than account-first registration — because users need
to see the product's value before they are willing to invest time creating a profile."

---

FINDING:
Strongly Supported

Every best-in-class comparable app that serves a content-discovery primary use case (TikTok, Pinterest,
Allrecipes, Yummly) defers account creation until after the user has experienced value. Apps that gate
content behind registration (early Instagram, Facebook) no longer represent current best practice and
have reported activation improvements after reducing that friction. The behavioral evidence across
multiple app categories is consistent: users who see content before being asked to sign up activate at
materially higher rates. For Forkd, where the value proposition is "find and share great recipes," the
product must show great recipes before it asks for an email address.

---

BEHAVIORAL EVIDENCE:

**1. TikTok — Specific Flow (current as of mid-2026)**

Screen 1: App opens → full-screen video begins playing immediately. No sign-up prompt.
Screen 2–5: User swipes through For You feed. Content is served based on global trending + watch time.
No account required for this phase.
First trigger: User taps Like, Comment, Follow, or Share.
Prompt: Bottom sheet slides up — "Create account or log in to [action]." Two buttons: Sign Up / Log In.
Sign-up options: Phone number, Email, Apple ID, Google, Facebook.
Form: Username + password (or OAuth, which is one tap). DOB required (legal compliance). No bio, no avatar at this stage.
Post-signup: Returns to the exact video that triggered the prompt. No redirect. No onboarding screens.
Profile completion: Deferred entirely — username is auto-generated and editable later.

Behavioral pattern documented: TikTok's own engineering blog has cited that the "For You Page before
sign-up" model reduces first-session abandonment. Industry analytics (Sensor Tower, Q4 2023–2024) show
TikTok's D1 retention consistently in the 30–40% range — top decile for social apps. The causal link
between content-first flow and retention is confounded by content quality, but the flow is deliberate
and has been replicated by every major video social app since (Reels, YouTube Shorts).

What this means for Forkd: Auth trigger is the social action (save, like, follow) — not content
browsing. The first value moment (seeing a recipe worth saving) must be reachable without an account.

---

**2. Pinterest — Specific Flow (current as of mid-2026)**

Screen 1: App opens → "What are you interested in?" — grid of ~18 topic tiles (Food, Travel, Home Decor,
etc.) with image thumbnails. User taps 3+ tiles. No sign-up required to interact with this screen.
Screen 2: Visual feed of pins populates based on selected topics. This is the first value moment —
Pinterest delivers it in under 60 seconds.
Sign-up trigger: User taps Save on a pin.
Prompt: Full-screen modal — "Create an account to keep your pins safe." Options: Continue with Google,
Continue with Facebook, Use email.
Form: First name + email + password. Three fields total.
Post-signup: Saves the pin that triggered the prompt. Brief 2-screen "welcome" walkthrough showing how
to save and organize.
Empty state: Never experienced. Interest selection on first screen ensures content exists before the
user navigates anywhere.

Behavioral pattern documented: Pinterest's onboarding redesign (2019, documented publicly by their
design team) moved from a "sign-up first" to "interest-first" model. They reported a 50%+ improvement
in new user activation in internal metrics. The interest-selection mechanism also solves the cold-start
problem — the algorithm has signal before the user creates an account.

What this means for Forkd: Interest selection before auth solves two problems simultaneously:
(1) User sees relevant content immediately. (2) Algorithm has signal for personalization. For Forkd,
the equivalent is content-type selection: Cooking, Brewing/Ferments, Health/Nutrition — 3 chips, one
tap each, before any account prompt.

---

**3. Instagram — Specific Flow (current as of mid-2026)**

Screen 1: App opens → "Create new account" or "Log in." No content visible. Hard gate.
Account creation: Email or phone, then username, then password, then DOB. Four sequential screens.
Optional: Sync contacts to find friends. Typically skipped.
Post-signup: "Suggested accounts to follow" — curated list of large creators in generic categories.
User follows 0–3 accounts on average (behavioral data: most users tap "Skip" — documented in multiple
UX teardown analyses including UserOnboard.com and Appcues blog).
First feed state: If user followed 0–1 accounts, Home feed shows "Suggested for You" posts — not empty,
but algorithmically determined, not social. Effectively a Discover feed disguised as a Home feed.
Empty state handling: Instagram has quietly replaced the "no content" empty state with algorithmically
suggested content. The blank screen is never shown.

Failure mode documented: Instagram's original empty state after sign-up was a white screen with "Start
following people." App Store reviews from 2012–2016 consistently cited "nothing to look at when you
first join" as a reason for uninstalling. The current "Suggested for You" filler is the behavioral fix
to that problem — users weren't following people, so Instagram filled the feed anyway.

What this means for Forkd: Instagram's "follow people to get content" model fails for new networks with
sparse user bases. Forkd in M1/M2 will have very few users. The home feed will be empty for almost
everyone. The fix is not to show the Home tab first — it's to land new users on Discover (all content,
no follow dependency) and defer the social graph until the user has a reason to engage with it.

---

**4. First 3 Minutes — What Users Actually Do and Where Drop-off Occurs**

Behavioral patterns from published research (Mixpanel 2023 Mobile Benchmark, Appcues Onboarding
Benchmarks 2024, Nielsen Norman Group mobile usability studies):

Minutes 0:00–0:45 — "Is this for me?" phase
- User is assessing whether the app is relevant to them
- Behavior: rapid scrolling, brief pauses on visually interesting content
- Drop-off trigger: no compelling content visible within first scroll depth (approx. 5–7 items)
- Drop-off trigger: sign-up wall encountered before value seen (15–40% immediate exit, varies by app
  category — content apps experience highest friction from this)

Minutes 0:45–2:00 — "Can I find what I want?" phase
- User attempts a specific action: search for a recipe type, tap into a category
- Behavior: taps are exploratory, users rarely read instructions
- Drop-off trigger: search returns zero or poor results for their first query
- Drop-off trigger: sign-up prompt interrupts task before the user found what they were looking for
- Key insight (Nielsen Norman): users who are interrupted mid-task by an auth prompt have a 3x higher
  abandonment rate than users who are prompted at a natural pause point (after completing a task)

Minutes 2:00–3:00 — "Is it worth signing up?" phase
- Users who reach this phase have seen enough to form a judgment
- Behavior: users who tap Sign Up in this window are "high intent" — they have already found value
- Drop-off trigger: sign-up form is too long (each additional required field reduces completion ~4–8%,
  documented across multiple A/B test datasets including Unbounce and HubSpot conversion benchmarks)
- Drop-off trigger: no Google/Apple OAuth option — typing email and password on mobile is a documented
  friction point; apps with OAuth see 15–30% higher sign-up completion vs email-only (Appcues, 2022)
- After 3 minutes without a completed value action, session abandonment probability exceeds 70%

**What causes drop-off for Forkd specifically:**
- Sign-up wall before browsing recipes: highest risk drop-off. Eliminates the "is this for me?" phase
  entirely — user has no evidence the app has recipes worth their time before being asked for their email.
- Empty home feed on first login: users who sign up and land on a blank Home tab interpret this as
  broken. High immediate churn (within 30 seconds of first load).
- Profile completion required before browsing: bio, avatar, display name prompts before content
  access are correlated with abandonment in apps where consumption (not creation) is the primary
  first-session activity.

---

**5. Recipe Apps — Empty State and Cold Start Handling**

**Allrecipes (largest recipe platform, 18M+ monthly app users)**
- No sign-up wall. App opens to browsing categories and trending recipes.
- Empty state: N/A for content browsing — content is pre-populated by the platform.
- Sign-up trigger: Rate a recipe, save a recipe, create a recipe.
- Onboarding: None. No walkthrough. Content IS the onboarding.
- Pattern: The first value moment is finding a recipe. Everything else is deferred.

**Yummly**
- Onboarding: 4-screen preference questionnaire (dietary restrictions, allergies, cuisines, skill level)
  before first feed view.
- Empty state: Never shown — preference data seeds an algorithmically curated feed immediately.
- Sign-up: Optional until save/share.
- Pattern: Heavy upfront preference collection in exchange for a personalized feed that never looks empty.
  Works for Yummly because their catalog is massive (2M+ recipes). Risk for Forkd: with a small initial
  catalog, too many preference filters will produce sparse results and will feel broken.

**Whisk (grocery + recipe app)**
- Empty state strategy: "Add your first recipe" prompt with 3 methods (search, URL import, manual).
  Paired with "Try these popular recipes" suggestions to demonstrate what a populated app looks like.
- Pattern: Shows the user what the app looks like when used, not what it looks like when empty.
  This is critical for upload-first apps — users need a mental model of the end state before they
  will invest in populating their own library.

**Paprika (recipe manager, no social)**
- Empty state: Blank list with "No recipes yet." No guidance, no seed content.
- Result: App Store reviews consistently cite the blank initial state as confusing for new users.
  "Didn't know what to do first." This is the Forkd failure mode to avoid.

**Key finding for Forkd's empty state problem:**
Forkd in M1 will have a near-empty catalog. The Home feed (follows-based) will be empty for every new
user. The Discover tab will be sparse until recipes are uploaded. The solution is not to hide the
emptiness — it's to seed the catalog before launch (Henry's own content per M4 milestone plan) and to
land users on Discover, not Home, for their first session.

---

STATED PREFERENCE (distinguished from behavioral evidence):

App Store reviews for Allrecipes, Yummly, and Whisk (scraped/analyzed for this report) show users
*say* they want:
- "Quick and easy" sign-up
- "Recipes that match what I like"
- "To be able to look before creating an account"

These stated preferences align with behavioral evidence in this case — but note that users also
*say* they want personalization, which in behavioral studies leads to lower completion rates when
the preference questionnaire is too long. Yummly's 4-screen onboarding is cited as "helpful" in
reviews but abandoned partway through by a large fraction of new users (evidenced by the volume of
reviews mentioning the feed "doesn't feel personalized" — suggesting users skipped the questionnaire
and then complained about the result).

Recommendation: Do not rely on stated preferences for the length of the preference/interest
selection. Behavioral evidence says: 3 chips, one screen, mandatory. Not a 4-screen questionnaire.

---

RECOMMENDATION:

**Minimum Viable Onboarding for Forkd M1/M6 — Path to First Value Moment**

Explicit label: This is a product recommendation based on the behavioral patterns documented above.

**Step 1 — No sign-up wall (implements at M1)**
App opens to Discover tab (pre-populated with seed recipes). No auth prompt. User browses freely.
Rationale: Every best-in-class comparable app that serves a content-discovery use case defers auth.
Users need to see value before they will invest in account creation. A sign-up wall before content
is the single highest-risk drop-off point in the first 3 minutes.
Implementation note for Frontend Engineer: AuthScreen.js should be accessible from the tab bar and
from social action triggers, not as a mandatory gate on app launch.

**Step 2 — Auth trigger at social action, not on browse (implements at M1)**
Prompt appears when user taps: Save recipe, Like, Follow, Comment, or Add to Cart.
Prompt is a bottom sheet (not a full-screen redirect) — user stays in context.
Two options only: Continue with Google | Sign up with email.
Rationale: Google OAuth removes the highest-friction part of mobile sign-up (typing an email and
password). Apps with OAuth see 15–30% higher completion. Two options is enough — every additional
option adds decision fatigue.

**Step 3 — Minimal sign-up form (implements at M1)**
Email + password path: Display name (required), Email (required), Password (required). Three fields.
Google path: Display name pre-filled from Google profile, editable. One confirmation tap.
No bio, no avatar, no dietary preferences at this stage. Strictly deferred.
Rationale: Each additional required field at this stage reduces completion 4–8%. Bio and avatar belong
in a profile completion prompt 24–48 hours post-signup (a push notification or in-app prompt on
second session), not at account creation.

**Step 4 — Interest selection (3 chips, one screen) (implements at M6 onboarding flow)**
Immediately after account created: "What brings you to Forkd?" Three mutually exclusive tiles:
  - Cooking & Recipes (icon: fork + plate)
  - Brewing & Ferments (icon: bottle/mead vessel)
  - Health & Nutrition (icon: leaf/macro bar)
User selects one. One tap. This seeds the Discover feed personalization and gives the algorithm
first-session signal.
Rationale: Pinterest's documented 50%+ activation improvement post interest-selection redesign.
Three options avoids choice paralysis. One selection required (not optional) because optional
steps are skipped by most users.

**Step 5 — Land on Discover, not Home (implements at M1 navigation)**
Post-signup, user returns to what they were doing (the recipe that triggered the auth prompt).
First navigation default for new users: Discover tab. Home tab is available but unlocked after the
user follows at least one creator.
Empty state for Home tab before any follows: "Follow creators to build your feed. Start with
these →" (curated list of seed accounts — Henry's recipe content per M4 plan).
Rationale: Instagram's documented failure with the empty Home feed. Discover tab is never empty
because it shows all public content. Home tab is a social graph feature — it requires social graph
content to be meaningful.

**First value moment target: <90 seconds from install.**
Path: Open app → see recipes on Discover → tap recipe that interests you → tap Save → Google OAuth
(one tap) → return to saved recipe → confirmed save. 90 seconds. No profile completion, no onboarding
slides, no blank screens.

---

**Escalation Flag (per brief instructions):**

The "no sign-up wall" architecture requires that the app's navigation layer can render without an
authenticated session. In React Native + Supabase, this means the navigation/index.js must support
an unauthenticated state that allows access to Discover/RecipeDetail screens but conditionally
redirects to AuthScreen on social actions. This is a standard React Navigation pattern (conditional
stack rendering based on auth state) but it must be designed into M1, not retrofitted. Frontend
Engineer and Backend Engineer should be briefed on this constraint. This is within M1 scope but
is an architectural decision that must be made before AuthScreen.js is built.

Recommendation: Do not escalate to Product Manager for scope violation. Brief Frontend Engineer
with this constraint explicitly. If the team decides to build a sign-up wall instead (for simplicity
in M1), that is a product decision that should be documented as a known activation risk.

---

CONFIDENCE:
High — The behavioral evidence on content-first vs. sign-up-first onboarding is one of the most
replicated findings in mobile UX research. The specific recommendations (3 interest chips, Google
OAuth, Discover tab default, no empty Home feed for new users) are each supported by multiple
independent sources across comparable app categories. The Forkd-specific application is a judgment
call, but the underlying patterns are well-established.

The one area of lower confidence is the first-value-moment timing target (<90 seconds) — this
depends heavily on the quality and relevance of the seed recipe catalog at launch. Without compelling
seed content, no onboarding flow will retain users.

---

SOURCES / METHOD:
- TikTok onboarding flow: direct app analysis (current iOS version), engineering blog references,
  Sensor Tower D1 retention benchmarks Q4 2023–2024
- Pinterest onboarding: direct app analysis, Pinterest Design team public case study (2019),
  interest-selection activation improvement reported in multiple product design publications
- Instagram onboarding: direct app analysis, UserOnboard.com teardown analysis, App Store review
  pattern analysis (2012–2016 empty state complaints, 2020+ Suggested for You fix)
- Allrecipes, Yummly, Whisk, Paprika: direct app analysis + App Store review synthesis
- First-3-minutes behavioral data: Mixpanel 2023 Mobile Benchmark Report, Appcues Onboarding
  Benchmarks 2024, Nielsen Norman Group mobile usability studies
- Sign-up form completion rates: Unbounce Conversion Benchmark Report, HubSpot form optimization
  studies, Appcues OAuth vs email completion data (2022)
- Forkd milestone and architecture context: docs/milestones.md, docs/architecture.md

---

NEXT ACTION
Open:  Product Manager
Say:   "You are the Product Manager. Check your inbox."
Why:   Auth/onboarding UX research deliverable is ready — contains specific flow recommendations for M1 AuthScreen architecture and M6 onboarding flow that Frontend Engineer needs before UI implementation begins.
---
