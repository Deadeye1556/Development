# CTO ARCHITECTURE APPROVAL — M1 — 2026-06-06

---

## AUTH METHOD: Confirmed

Supabase Auth directly — email/password + Google OAuth via `expo-auth-session`. No wrapper. Supabase Auth handles token lifecycle, session refresh, and storage automatically via AsyncStorage under the hood. A custom wrapper adds complexity without benefit at this scale and would require us to maintain token refresh logic we get for free. **Approved as proposed.**

---

## NAVIGATION: Confirmed

React Navigation — tab navigator (4 tabs) + stack navigators per tab. 4-tab structure: **Home, Discover, Upload, Profile** — matches architecture spec exactly. This is the correct choice for Expo; no competing library warrants consideration. **Approved as proposed.**

---

## SCHEMA SCOPE: Expanded — profiles + follows + saves

Approving `profiles` and `follows` as M1 tables. **Also approving `saves` creation in M1 schema** — schema only, no UI until M3.

Rationale: `saves` is a 3-column junction table (user_id, recipe_id, created_at). Creating it now costs near zero. Deferring risks a blocking migration mid-M3 sprint when engineers expect the table to exist. The correct rule is: create schema ahead of UI when the schema is known and stable. It is. **Backend Engineer must create saves with RLS in M1 but must not build any UI or service functions for it.**

M1 tables approved:
- `profiles` — full schema per architecture.md
- `follows` — full schema per architecture.md
- `saves` — schema + RLS only, no service functions

---

## SERVICE FUNCTIONS: Confirmed

Approved list for `forkd/src/services/profiles.js`:
- `fetchProfile(userId)`
- `updateProfile(userId, data)`
- `followUser(followerId, followingId)`
- `unfollowUser(followerId, followingId)`
- `checkIfFollowing(followerId, followingId)`
- `fetchFollowers(userId)`
- `fetchFollowing(userId)`

All functions must return typed response objects (not raw Supabase `.data`). All must have try/catch.

---

## GOOGLE OAUTH: Concern Raised — Coordination Required

Google OAuth is the highest-risk piece of M1. Explicitly requiring Backend + Frontend Engineer coordination on:

1. `expo-auth-session` must be installed — confirm in `package.json` before wiring any screen
2. Supabase Auth dashboard must have exact redirect URI registered — URI format is `forkd://` (deep link scheme must be set in `app.json` as `"scheme": "forkd"`)
3. **Must be tested on a real device.** iOS Simulator and Android Emulator handle deep links unreliably and will mask OAuth failures that appear on device
4. Backend Engineer registers the URI in Supabase; Frontend Engineer wires the `expo-auth-session` flow; they must sync before either considers their work complete

Technology Manager must confirm cross-engineer coordination before signing off M1 Frontend deliverable.

---

## STANDARDS PASSED TO TECHNOLOGY MANAGER: Yes

Enforce all of the following on M1 — these are gates, not guidelines:

1. All auth tokens managed by Supabase SDK — no manual token storage in AsyncStorage, SecureStore, or elsewhere
2. RLS must be applied to `profiles`, `follows`, and `saves` **before** any service function or screen touches them
3. `profiles` table must auto-populate on `auth.users` insert via Supabase PostgreSQL trigger — this must not be handled in app-level code
4. Google OAuth redirect URI must be tested on a real physical device before sign-off — simulator result is not acceptable
5. All screens must have loading state, empty state, and error state before submission — no exceptions

---

## CEO ESCALATIONS: None

No conflicts with Board-level pillars. All decisions fall within approved stack. No library additions outside approved tech stack. No escalation required.

---

## STATUS

Technology Manager is cleared to issue M1 briefs to Backend Engineer and Frontend Engineer immediately.

Backend Engineer may begin Supabase schema work now — backend does not require Expo Go.

Frontend Engineer must wait for DevOps Engineer M0 sign-off (Expo Go fix) before UI screens can be tested on device — but may begin navigation scaffold.

AI Engineer M2 prep brief: approved for TM to issue as pre-planning only. No M2 code begins until M1 gate is closed.
