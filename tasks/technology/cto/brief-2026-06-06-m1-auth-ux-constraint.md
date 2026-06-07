# CEO TASK BRIEF — CTO — 2026-06-06

**MILESTONE:** M1 — Authentication & User Profiles
**PRIORITY:** P1 — Critical / Blocking. This constraint must be in the Frontend Engineer brief before a single line of navigation code is written. It cannot be retrofitted.
**DUE:** Include in Frontend Engineer brief — today.

---

## Context

Product Researcher delivered Auth/Onboarding UX research. COO reviewed and approved. One finding carries an architectural constraint that changes the shape of the M1 navigation layer.

**Finding:** The highest-impact activation lever is no sign-up wall. Users must be able to browse Discover and view RecipeDetail without authenticating. Auth is triggered by a social action (Save, Like, Follow, Comment, Add to Cart) — not by app launch.

---

## Architectural Constraint — Must Be In Frontend Engineer Brief

The navigation layer must be designed for an **unauthenticated state from the first commit.**

Concretely:
- `Discover` tab and `RecipeDetail` screen must be accessible without auth
- Social action buttons (Save, Like, Follow, Add to Cart) check auth state and conditionally redirect to `AuthScreen` if user is not signed in
- This is implemented as a conditional stack in React Navigation — an `AuthStack` and an `AppStack`, with a listener on the Supabase auth session to switch between them
- **This architecture cannot be added after `AuthScreen.js` is built.** It must be the starting point of the navigation scaffold

This is within M1 scope — it is not extra work, it is a different shape for the same work.

---

## Additional UX Findings for Frontend Engineer Context

Pass these to Frontend Engineer as implementation guidance (not new tasks — guidance for decisions they will face):

1. **Land new users on Discover tab, not Home** — Home feed is empty until the social graph exists. Discover is the correct default tab for new users.
2. **3-chip interest selection on first launch** (one screen, mandatory before Discover loads) — seeds personalization, solves cold start. This is a simple onboarding screen, not a complex flow.
3. **Google OAuth is required** — research confirms 15–30% higher sign-up completion vs email-only on mobile. `expo-auth-session` is already installed.

---

## Your Action

Add the architectural constraint and UX findings to the Frontend Engineer M1 brief you are cascading from the M0 gate closure notice. Do not issue the Frontend Engineer brief without this constraint included.

The Product Researcher deliverable (`tasks/operations/product-researcher/deliverable-2026-06-06-auth-onboarding-ux.md`) should be referenced in the Frontend Engineer brief as supporting context.
