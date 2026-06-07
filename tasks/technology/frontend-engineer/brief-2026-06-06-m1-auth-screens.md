# TASK BRIEF — Frontend Engineer — 2026-06-06

MILESTONE: M1 — Authentication & User Profiles
PRIORITY: P1 — Critical / Blocking
FEATURE: M1 navigation scaffold + auth and profile screens — full implementation
DUE: June 22, 2026

**Reference:** `tasks/operations/product-researcher/deliverable-2026-06-06-auth-onboarding-ux.md`
Read before writing any navigation code — UX research drives the architecture below.

---

## PART 1 — NAVIGATION ARCHITECTURE (read before writing any code)

The navigation layer must support unauthenticated browsing from the first commit. Users must NOT be required to sign up or log in to browse Discover or view a recipe. Auth is triggered by a social action, not by app launch.

**CORRECT ARCHITECTURE — two stacks, session-conditional:**

AppStack (no auth required):
- DiscoverScreen (default tab for all users including unauthenticated)
- RecipeDetailScreen (accessible without auth)
- HomeScreen (empty for unauthenticated users — shows followed creator feed when logged in)
- UploadScreen (requires auth — redirect to AuthScreen if not signed in)
- ProfileScreen (requires auth to view own profile — redirect if not signed in)

AuthStack:
- OnboardingScreen (3-chip interest selection — first launch only, before Discover loads)
- AuthScreen (triggered by social action or UploadScreen/ProfileScreen access)
- SignUpScreen

Session listener (`supabase.auth.onAuthStateChange`) switches between stacks. Social action buttons (Save, Like, Follow, Add to Cart) check session state and redirect to AuthScreen if user is not signed in — they do not block the screen from loading.

Default tab for new and unauthenticated users: **Discover** (not Home). Home tab shows empty state with prompt to follow creators until social graph exists.

**THIS ARCHITECTURE CANNOT BE ADDED AFTER AuthScreen.js IS BUILT. It must be the starting shape of `navigation/index.js`.**

---

## PART 2 — FIRST LAUNCH ONBOARDING (implement before Discover loads)

On first app launch only (check AsyncStorage flag):
- Show OnboardingScreen before Discover loads
- Display 3 chip selectors for user interest categories (e.g. Cooking, Homebrewing, Fermentation, Mead, BBQ, Spirits, Cider)
- Selection is mandatory — user must pick at least 1 before continuing
- Save selections to AsyncStorage and to profiles row if user is signed in
- This is one simple screen, not a complex multi-step flow

---

## PART 3 — WHAT'S ALREADY BUILT (use these, do not rebuild)

**Backend Engineer delivered:**
- `forkd/src/lib/supabase.js` — Supabase client, import directly
- `forkd/src/services/profiles.js` — 7 service functions:
  - `fetchProfile(userId)` → `{ profile, error }`
  - `updateProfile(userId, data)` → `{ success, error }`
  - `followUser(followerId, followingId)` → `{ success, error }`
  - `unfollowUser(followerId, followingId)` → `{ success, error }`
  - `checkIfFollowing(followerId, followingId)` → `{ isFollowing, error }`
  - `fetchFollowers(userId)` → `{ followers, error }`
  - `fetchFollowing(userId)` → `{ following, error }`

**DevOps Engineer delivered:**
- `"scheme": "forkd"` in `app.json` — deep link scheme for OAuth
- Packages installed: `@supabase/supabase-js`, `@react-native-async-storage/async-storage`, `react-native-url-polyfill`, `expo-auth-session`, `expo-web-browser`, `expo-image-picker`

---

## PART 4 — AUTH CALLS (use directly from Supabase client)

```js
import { supabase } from '../lib/supabase';

supabase.auth.signUp({ email, password, options: { data: { display_name } } })
supabase.auth.signInWithPassword({ email, password })
supabase.auth.signOut()
supabase.auth.getSession()
supabase.auth.onAuthStateChange((event, session) => { ... })
```

---

## PART 5 — GOOGLE OAUTH (highest risk item)

1. Use `expo-auth-session` + `expo-web-browser` (`WebBrowser.openAuthSessionAsync`)
2. Coordinate with Backend Engineer on the exact Supabase redirect URI before wiring — verify the URI string character-for-character
3. Must be tested on a real physical device — simulator result does not count
4. Do not mark complete until it works on device
5. Research confirms Google OAuth drives 15–30% higher sign-up completion on mobile — this is required, not optional

---

## PART 6 — SCREEN SPECS (write before any implementation)

Before writing implementation code, write a spec for each screen:
- Components needed
- Data displayed and source
- States: loading / empty / error
- User actions

**Screens to spec (9 total):**
1. OnboardingScreen (3-chip interest selection — first launch only)
2. AuthScreen (email/password + Google OAuth — triggered by social action)
3. SignUpScreen (email, password, display name)
4. HomeScreen (followed creator feed — empty state with prompt if no follows)
5. DiscoverScreen (all recipes — default tab, no auth required)
6. UploadScreen (auth required — redirect if not signed in)
7. ProfileScreen (own profile: edit button; other profile: follow/unfollow)
8. EditProfileScreen (avatar, display name, bio)
9. SettingsScreen (change password, sign out)

Include specs in deliverable. TM reviews before sign-off.

---

## PART 7 — ACCEPTANCE CRITERIA

**Navigation:**
- [ ] Discover tab loads without authentication
- [ ] RecipeDetail screen accessible without authentication
- [ ] Social action buttons (Save, Like, Follow) redirect to AuthScreen if not signed in
- [ ] UploadScreen redirects to AuthScreen if not signed in
- [ ] Session state change (sign in / sign out) switches stacks without reload
- [ ] Default tab for new/unauthenticated users is Discover

**Onboarding:**
- [ ] OnboardingScreen shows on first launch only
- [ ] User must select at least 1 interest chip to proceed
- [ ] Selection saved to AsyncStorage (and profiles row if signed in)
- [ ] Does not show on subsequent launches

**Auth screens:**
- [ ] Email/password sign-up creates Supabase user + profiles row auto-populates
- [ ] Email/password login works end-to-end
- [ ] Google OAuth initiates via `expo-auth-session` + `expo-web-browser`
- [ ] Google OAuth confirmed working on a real physical device
- [ ] Session persists — close and reopen app, user stays logged in

**Profile screens:**
- [ ] ProfileScreen displays avatar, display name, bio, follower count, following count
- [ ] Follow/unfollow works and persists
- [ ] EditProfileScreen updates display name, bio, avatar via `updateProfile`
- [ ] SettingsScreen: change password and sign out work

**All screens:**
- [ ] Screen specs written for all 9 screens before implementation begins
- [ ] Navigation scaffold verified on device before screens are wired
- [ ] All 9 screens have loading, empty, and error states — no exceptions
- [ ] No hardcoded credentials, no console.log, no TODOs, no dead code

---

## PART 8 — FILES TO TOUCH

- `forkd/src/navigation/index.js`
- `forkd/src/screens/OnboardingScreen.js`
- `forkd/src/screens/AuthScreen.js` (or `LoginScreen.js` + `SignUpScreen.js`)
- `forkd/src/screens/HomeScreen.js`
- `forkd/src/screens/DiscoverScreen.js` (no-auth accessible)
- `forkd/src/screens/UploadScreen.js` (auth-gated)
- `forkd/src/screens/ProfileScreen.js`
- `forkd/src/screens/EditProfileScreen.js`
- `forkd/src/screens/SettingsScreen.js`
- `forkd/src/components/` (new components as needed)
- `forkd/src/styles/theme.js` (add constants if needed)

**FILES NOT TO TOUCH:**
- `forkd/src/lib/supabase.js` → Backend Engineer
- `forkd/src/services/profiles.js` → Backend Engineer
- `forkd/app.json` → DevOps Engineer
- `forkd/.env` or `.env.example` → DevOps Engineer
- `forkd/src/services/ai/` → AI Engineer

---

## PART 9 — STANDARDS (enforced by TM on review — no exceptions)

- Auth tokens managed by Supabase SDK only — no manual token storage anywhere
- Every screen: loading state, empty state, error state — all three, no exceptions
- No hardcoded colors — theme constants from `forkd/src/styles/theme.js` only
- No console.log, no TODOs, no dead code in any submitted file

---

## DELIVERABLE

Write to `tasks/technology/frontend-engineer/deliverable-2026-06-06-m1-auth-screens.md`:
- Screen specs for all 9 screens
- Files created/modified
- Explicit pass/fail per acceptance criterion
- Google OAuth: state the device make/model used for physical device test
- Navigation: confirm scaffold rendered on device before screens were wired

---
NEXT ACTION
Open:  Technology Manager
Say:   "You are the Technology Manager. Check your inbox."
Why:   Frontend Engineer M1 auth screens deliverable is ready for your review.
---
