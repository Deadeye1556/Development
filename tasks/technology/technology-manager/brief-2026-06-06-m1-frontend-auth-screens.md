# CTO TASK BRIEF — Technology Manager — 2026-06-06

MILESTONE: M1 — Authentication & User Profiles
PRIORITY: P1 — Critical / Blocking. M0 gate just closed. Frontend Engineer is the active critical path to M1 gate closure by June 22, 2026. Every day without a complete, authoritative brief is a day of potential rework.
TASK: Supersede the brief already in Frontend Engineer's inbox (`brief-2026-06-06-m1-auth-screens.md`) with the merged brief below. Issue the merged version before Frontend Engineer writes a single line of navigation code.
DUE: June 22, 2026 — M1 gate target

---

## ACTION REQUIRED

The brief currently in Frontend Engineer's inbox is missing the screen spec planning work scoped in the earlier planning brief. Before Frontend Engineer begins, replace it with the merged brief below — one complete document covering planning, navigation, and implementation together.

---

## Issue This Brief to Frontend Engineer (supersedes brief-2026-06-06-m1-auth-screens.md)

```
TASK BRIEF — Frontend Engineer — 2026-06-06
MILESTONE: M1 — Authentication & User Profiles
PRIORITY: P1 — Critical / Blocking
FEATURE: M1 navigation scaffold + auth and profile screens — full implementation
DUE: June 22, 2026

---

PART 1 — BEFORE YOU WRITE ANY CODE

Write a screen spec for each M1 screen listed below. Each spec must state:
- Components needed
- Data it displays and where it comes from
- States it must handle: loading / empty / error
- User actions it supports

M1 screens to spec:
1. AuthScreen (email/password login + sign-up toggle + Google OAuth button)
2. SignUpScreen (email, password, display name — if split from AuthScreen)
3. ProfileScreen (avatar, display name, bio, follower count, following count,
   recipe grid, edit button if own profile, follow/unfollow if other profile)
4. EditProfileScreen (avatar upload, display name, bio — calls updateProfile)
5. SettingsScreen (change password, sign out)
6. HomeScreen (placeholder — tab must exist, empty state only for now)
7. DiscoverScreen (placeholder — tab must exist, empty state only for now)
8. UploadScreen (placeholder — tab must exist, empty state only for now)

Include specs in your deliverable. TM will review all specs before sign-off.

---

PART 2 — WHAT'S ALREADY BUILT (use these, do not rebuild)

Backend Engineer delivered:
- forkd/src/lib/supabase.js — Supabase client, import directly
- forkd/src/services/profiles.js — 7 service functions:
    fetchProfile(userId)              → { profile, error }
    updateProfile(userId, data)       → { success, error }
    followUser(followerId, followingId)    → { success, error }
    unfollowUser(followerId, followingId)  → { success, error }
    checkIfFollowing(followerId, followingId) → { isFollowing, error }
    fetchFollowers(userId)            → { followers, error }
    fetchFollowing(userId)            → { following, error }

DevOps Engineer delivered:
- "scheme": "forkd" in app.json — deep link scheme set for OAuth
- Packages installed: @supabase/supabase-js, @react-native-async-storage/async-storage,
  react-native-url-polyfill, expo-auth-session

---

PART 3 — AUTH CALLS (use directly from Supabase client, not service functions)

import { supabase } from '../lib/supabase';

supabase.auth.signUp({ email, password, options: { data: { display_name } } })
supabase.auth.signInWithPassword({ email, password })
supabase.auth.signOut()
supabase.auth.getSession()   // session state on app load

---

PART 4 — NAVIGATION SCAFFOLD (write this first, before any screen logic)

File: forkd/src/navigation/index.js

Structure:
- Root navigator: checks session state on load
  - If no session → Auth Stack (AuthScreen → SignUpScreen)
  - If session → Tab Navigator
- Tab Navigator: Home | Discover | Upload | Profile (4 tabs)
- Each tab has its own stack navigator

Write placeholders for all screens before wiring any auth logic. Confirm
navigation renders on device before proceeding to screen implementation.

---

PART 5 — GOOGLE OAUTH (highest risk item)

1. Use expo-auth-session to initiate the OAuth flow
2. Coordinate with Backend Engineer on the exact Supabase redirect URI
   before wiring — Backend registered it in the Supabase Auth dashboard
3. Must be tested on a real physical device — simulator does not count
4. Do not mark this criterion complete until it works on device
5. If redirect URI does not match exactly, OAuth will silently fail —
   verify the URI string character-for-character with Backend Engineer

---

PART 6 — ACCEPTANCE CRITERIA

- [ ] Screen specs written for all 8 screens before implementation begins
- [ ] Navigation scaffold renders on device (all 4 tabs + auth stack) before screens are wired
- [ ] AuthScreen: email/password sign-up creates Supabase user + profiles row auto-populates
- [ ] AuthScreen: email/password login works end-to-end
- [ ] AuthScreen: Google OAuth button initiates flow via expo-auth-session
- [ ] Google OAuth confirmed working on a real physical device
- [ ] ProfileScreen: displays avatar, display name, bio, follower count, following count
- [ ] ProfileScreen: follow/unfollow works and persists
- [ ] EditProfileScreen: updates display name, bio, avatar via updateProfile
- [ ] SettingsScreen: change password and sign out work
- [ ] Session persistence: close and reopen app — user stays logged in
- [ ] All 8 screens have loading, empty, and error states — no exceptions
- [ ] No hardcoded credentials, no console.log, no TODOs, no dead code

---

PART 7 — FILES TO TOUCH

- forkd/src/navigation/index.js
- forkd/src/screens/AuthScreen.js (or LoginScreen.js + SignUpScreen.js)
- forkd/src/screens/ProfileScreen.js
- forkd/src/screens/EditProfileScreen.js
- forkd/src/screens/SettingsScreen.js
- forkd/src/screens/HomeScreen.js (placeholder)
- forkd/src/screens/DiscoverScreen.js (placeholder)
- forkd/src/screens/UploadScreen.js (placeholder)
- forkd/src/components/ (new components as needed)
- forkd/src/styles/theme.js (add constants if needed)

FILES NOT TO TOUCH:
- forkd/src/lib/supabase.js → Backend Engineer
- forkd/src/services/profiles.js → Backend Engineer
- forkd/app.json → DevOps Engineer
- forkd/.env or .env.example → DevOps Engineer
- forkd/src/services/ai/ → AI Engineer

---

PART 8 — STANDARDS (enforced by TM on review — no exceptions)

- All auth tokens managed by Supabase SDK — no manual token storage anywhere
- Every screen: loading state, empty state, error state — all three, every screen
- No hardcoded colors — theme constants from forkd/src/styles/theme.js only
- No console.log, no TODOs, no dead code in any submitted file

---

DELIVERABLE

Write to tasks/technology/frontend-engineer/deliverable-2026-06-06-m1-auth-screens.md:
- Screen specs for all 8 screens
- Files created/modified
- How to verify each acceptance criterion
- Explicit pass/fail per criterion
- Google OAuth device test: state the device make/model used
- Navigation scaffold: confirm it rendered on device before screens were wired
```

---

## Your TM Review Checklist

- [ ] Screen specs present for all 8 screens — components, data, states, actions all listed
- [ ] Navigation scaffold was verified on device before screen logic was written
- [ ] All acceptance criteria passed — binary per criterion
- [ ] Google OAuth tested on real physical device — state device in deliverable
- [ ] Every screen has loading, empty, and error state — check all 8
- [ ] No hardcoded credentials or colors
- [ ] No console.log, no TODOs, no dead code
- [ ] Files touched are in Frontend Engineer scope only
- [ ] Session persistence confirmed — close and reopen, user stays logged in

## Sign-Off Format

When complete, write sign-off to `tasks/technology/cto/signoff-2026-06-06-m1-frontend-auth-screens.md`
