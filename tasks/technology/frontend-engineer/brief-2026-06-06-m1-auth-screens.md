# TASK BRIEF — Frontend Engineer — 2026-06-06

MILESTONE: M1 — Authentication & User Profiles
FEATURE: Auth screens, profile screens, and navigation scaffold
PRIORITY: P1 — Read the navigation architecture section before writing a single line of code.
DEADLINE: June 22, 2026 — M1 gate target

---

## ⚠ READ THIS FIRST — Navigation Architecture Constraint

**This cannot be retrofitted.** The navigation layer must be designed for an unauthenticated state from the very first commit.

**Required architecture:**

- Two stacks: `AuthStack` (Login/SignUp) and `AppStack` (tab navigator)
- A listener on `supabase.auth.onAuthStateChange` that switches the active stack based on session state
- `Discover` tab and `RecipeDetail` screen are accessible **without auth**
- Social action buttons (Save, Like, Follow, Add to Cart) check auth state — if user is not signed in, redirect to `AuthScreen` rather than blocking access to the content
- Auth is triggered by a social action, not by app launch

This is the same amount of work as a standard auth gate — it is just a different shape. Start here.

**Reference:** Product Researcher auth/onboarding UX findings — `tasks/operations/product-researcher/deliverable-2026-06-06-auth-onboarding-ux.md`

---

## UX Implementation Guidance

These findings come from Product Researcher UX research approved by COO. They are not optional — apply them as you build:

1. **Default tab is Discover, not Home** — Home feed is empty until the social graph exists. New users must land on Discover.
2. **3-chip interest selection on first launch** — One screen (`OnboardingScreen`), mandatory before Discover loads for new users. Chips seed personalization and solve the cold-start problem. Simple screen: pick 3 interests from a grid, tap Continue.
3. **Google OAuth is required** — Research confirms 15–30% higher sign-up completion vs email-only on mobile. `expo-auth-session` is already installed.

---

## What's Already Built — Use These, Don't Rebuild

**Backend Engineer delivered:**
- `forkd/src/lib/supabase.js` — Supabase client, import and use directly
- `forkd/src/services/profiles.js` — all 7 service functions ready to call:
  - `fetchProfile(userId)` → `{ profile, error }`
  - `updateProfile(userId, data)` → `{ success, error }`
  - `followUser(followerId, followingId)` → `{ success, error }`
  - `unfollowUser(followerId, followingId)` → `{ success, error }`
  - `checkIfFollowing(followerId, followingId)` → `{ isFollowing, error }`
  - `fetchFollowers(userId)` → `{ followers, error }`
  - `fetchFollowing(userId)` → `{ following, error }`

**DevOps Engineer delivered:**
- `"scheme": "forkd"` in `app.json`
- Packages installed: `@supabase/supabase-js`, `@react-native-async-storage/async-storage`, `react-native-url-polyfill`, `expo-auth-session`

---

## Auth Calls — Use Directly From Supabase Client

```js
import { supabase } from '../lib/supabase';

supabase.auth.signUp({ email, password, options: { data: { display_name } } })
supabase.auth.signInWithPassword({ email, password })
supabase.auth.signOut()
supabase.auth.getSession()
supabase.auth.onAuthStateChange((event, session) => { ... })
```

Do not write service functions for auth — call the Supabase client directly from your screens.

---

## Google OAuth — Highest Risk Item

1. Use `expo-auth-session` to initiate the OAuth flow
2. Coordinate with Backend Engineer on the exact redirect URI before wiring — Backend registered it in the Supabase Auth dashboard
3. **Must be tested on a real physical device** — simulator result does not count per CTO standard
4. Do not mark this criterion complete until it works on device

---

## ACCEPTANCE CRITERIA

**Navigation:**
- [ ] `AuthStack` and `AppStack` implemented — session listener on `supabase.auth.onAuthStateChange` switches between them
- [ ] `Discover` tab accessible without authentication
- [ ] Social action buttons (Save, Like, Follow, Add to Cart) check auth state — redirect unauthenticated users to `AuthScreen`
- [ ] Unauthenticated users land on Discover; authenticated users land on tab navigator
- [ ] Session persistence: closing and reopening app keeps user logged in
- [ ] Tab navigator: Home, Discover, Upload, Profile — 4 tabs, navigable on device
- [ ] Default tab for new users is Discover (not Home)

**Onboarding:**
- [ ] `OnboardingScreen`: 3-chip interest selection shown to new users before Discover loads
- [ ] Interest selection is mandatory (cannot skip) and dismisses permanently after first completion

**Auth:**
- [ ] `AuthScreen`: email/password sign-up works end-to-end (creates Supabase user + profiles row auto-populates via trigger)
- [ ] `AuthScreen`: email/password login works end-to-end
- [ ] `AuthScreen`: Google OAuth button initiates flow via `expo-auth-session`
- [ ] Google OAuth tested and confirmed working on a real physical device — state the device in your deliverable

**Profile:**
- [ ] `ProfileScreen`: displays avatar, display name, bio, follower count, following count
- [ ] `ProfileScreen`: follow/unfollow button works and persists
- [ ] `EditProfileScreen`: updates display name, bio, avatar — calls `updateProfile`
- [ ] `SettingsScreen`: change password and sign out work

**Quality:**
- [ ] All screens have loading, empty, and error states — no exceptions
- [ ] No hardcoded credentials, no hardcoded colors
- [ ] No console.log, no TODOs, no dead code

---

## FILES TO TOUCH

- `forkd/src/navigation/index.js` — AuthStack + AppStack with session listener
- `forkd/src/screens/OnboardingScreen.js` — 3-chip interest selection (new)
- `forkd/src/screens/AuthScreen.js` (or split: `LoginScreen.js`, `SignUpScreen.js`)
- `forkd/src/screens/ProfileScreen.js`
- `forkd/src/screens/EditProfileScreen.js`
- `forkd/src/screens/SettingsScreen.js`
- `forkd/src/screens/HomeScreen.js` (placeholder)
- `forkd/src/screens/DiscoverScreen.js` (placeholder — must be accessible without auth)
- `forkd/src/screens/UploadScreen.js` (placeholder)
- `forkd/src/components/` (any new components needed)
- `forkd/src/styles/theme.js` (if theme constants need adding)

## FILES NOT TO TOUCH

- `forkd/src/lib/supabase.js` → Backend Engineer domain
- `forkd/src/services/profiles.js` → Backend Engineer domain
- `forkd/app.json` → DevOps Engineer domain
- `forkd/.env` or `.env.example` → DevOps Engineer domain
- `forkd/src/services/ai/` → AI Engineer domain

---

## STANDARDS — Enforced on TM Review

- All auth tokens managed by Supabase SDK — no manual token storage anywhere
- Every screen must have loading state, empty state, and error state
- No hardcoded colors — use theme constants from `forkd/src/styles/theme.js`
- No console.log, no TODOs, no dead code

---

## DELIVERABLE

Write to `tasks/technology/frontend-engineer/deliverable-2026-06-06-m1-auth-screens.md`:
- Files created/modified
- How to verify each acceptance criterion
- Explicit pass/fail per criterion
- Google OAuth device test confirmation — name the device used

---
NEXT ACTION
Open:  Technology Manager
Say:   "You are the Technology Manager. Check your inbox."
Why:   Frontend Engineer deliverable for M1 auth screens is ready for your review.
---
