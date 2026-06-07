# TASK BRIEF — Product Researcher — 2026-06-06

**FROM:** Product Manager  
**MILESTONE:** M1 feed — needed before Frontend Engineer implements auth UI  
**OBJECTIVE:** UX patterns research — auth flow and new user onboarding  
**DEADLINE:** 2026-06-13

---

## Research Questions

1. Do users need to see content before signing up, or will they create an account cold?
2. What is the fastest path from app download to first value moment in a recipe/social app?
3. What prevents new users from hitting the "blank screen" and dropping off?
4. What should Forkd's first-time user flow actually look like?

---

## Hypothesis to Test

**Hypothesis A:** "New Forkd users need to browse content before being asked to sign up — a hard auth gate on launch will cause significant drop-off."

**Hypothesis B:** "Creator-first positioning (leading with earn money from your recipes) will motivate signup without requiring content-first browsing."

Test both. Evidence may support one, both, or neither.

---

## Research Scope

### 1. Auth UX Patterns (test each app yourself)
Download and open each app as a new user. Document exactly:
- When is sign-up required? (Launch? After browsing? After taking an action?)
- What is shown before auth? (Feed? Splash? Feature highlights?)
- How many steps to create an account?
- Is Google/Apple sign-in offered? Is it the default?
- TikTok, Pinterest, Instagram (social comparison)
- Yummly, Whisk (recipe app comparison)

For each: document what you **observe** the flow to be, not what you assume.

### 2. Empty State Research
When a new user has no followers and no saved content:
- What does the home feed show? (Trending? Popular? Nothing?)
- What does the discovery tab show?
- Is there a prompt to follow suggested creators?
- Where do recipe apps seed content for new users so the app doesn't feel empty?
Document patterns from: TikTok (excellent empty state), Pinterest (curated onboarding), any recipe app

### 3. First 3 Minutes
From community research (Reddit, App Store reviews, UX studies you can find):
- What action do users take first in recipe apps? Browse or upload?
- What causes users to delete a recipe app in the first session?
- What makes users return to a recipe app on day 2?
Focus on behavioral evidence — what users **do**, not what they say they want.

### 4. Creator Onboarding Specific
Forkd needs early creators to upload recipes. Research:
- How do platforms recruit early creators (TikTok in its early days, Pinterest)?
- What is the minimum experience that makes a creator "sticky" to a new platform?
- What is the first action that predicts a creator will upload again?

---

## Deliverable Format

Use the standard Product Research Report format from your role.md:

```
PRODUCT RESEARCH REPORT — Auth/Onboarding UX — 2026-06-06

HYPOTHESIS TESTED:
[Both hypotheses stated]

FINDING:
[Supported / Partially Supported / Not Supported for each]

BEHAVIORAL EVIDENCE:
[What you observed users actually do — app testing results]

STATED PREFERENCE (if available):
[What users say in reviews, Reddit, etc.]

RECOMMENDATION:
[Explicit recommendation for Forkd's M1 auth flow and empty state]

CONFIDENCE:
[High / Medium / Low — why]

SOURCES / METHOD:
[App testing (list which apps), community research, UX studies]
```

---

## Acceptance Criteria

- [ ] Both hypotheses tested — both have evidence cited
- [ ] At least 5 apps personally tested and auth flow documented
- [ ] Empty state pattern research covers at least 3 apps
- [ ] Recommendation is explicit and actionable for Frontend Engineer
- [ ] Behavioral evidence distinguished from stated preference
- [ ] Confidence level stated with reasoning
- [ ] No features recommended without a validated problem statement

---

## Deliverable Location

Write to `tasks/operations/product-researcher/deliverable-2026-06-13-auth-onboarding-ux.md`
