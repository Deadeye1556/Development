# CEO TASK BRIEF — CTO — 2026-06-06

**MILESTONE:** M1 — Authentication & User Profiles  
**TASK:** Architecture review and standards lock before engineers write a single line of M1 code  
**PRIORITY:** High — M1 engineers cannot start until CTO has approved the architecture

---

## Context

M0 is one task from closure (DevOps Expo fix). The moment that gate passes, Backend Engineer needs to be in Supabase and Frontend Engineer needs to be scaffolding screens. There is no time for architecture debates mid-sprint. Lock everything now.

M1 target: **June 22, 2026.** That is 16 days. The estimate is 7–14 hours. We are on time if engineers start clean.

---

## Decisions Needed From You

Review each item and confirm or flag for CEO escalation:

### 1. Authentication Implementation
- **Proposed:** Supabase Auth — email/password + Google OAuth
- **Question:** Any concerns with using Supabase Auth directly, or do we need a wrapper?
- **Confirm or flag**

### 2. Navigation Library
- **Proposed:** React Navigation (tab navigator + stack navigators per tab)
- **Tab structure:** Home, Discover, Upload, Profile (4 tabs)
- **Confirm or flag**

### 3. M1 Supabase Schema Scope
- **Proposed M1 tables:** `profiles` and `follows` (as defined in `/docs/architecture.md`)
- **Question:** Should `saves` table also be created in M1 even though it is used in M3? Early schema = better.
- **Confirm or flag**

### 4. Profile Service Functions (M1 scope)
- **Proposed:** `fetchProfile(userId)`, `updateProfile(userId, data)`, `followUser(followerId, followingId)`, `unfollowUser(followerId, followingId)`, `checkIfFollowing(followerId, followingId)`, `fetchFollowers(userId)`, `fetchFollowing(userId)`
- **Confirm or flag**

### 5. Google OAuth on Expo
- **Concern:** Google OAuth with Expo requires `expo-auth-session` and redirect URI configuration in Supabase. Confirm that the Backend and Frontend Engineers coordinate on this specifically — it is the most failure-prone part of M1.
- **Confirm or flag**

---

## Standards to Set for Technology Manager

Before passing work down, issue the following M1 standards to Technology Manager:

1. All auth tokens managed by Supabase — no manual token storage
2. RLS must be applied to profiles and follows **before** any service function uses them
3. Google OAuth redirect URI must be tested on a real device, not just simulator
4. `profiles` table auto-populated on `auth.users` insert via Supabase trigger (not app-level code)
5. All screens: loading state, empty state, error state — no exceptions

---

## Your Deliverable

Write to `tasks/technology/cto/deliverable-2026-06-06-m1-architecture.md`:

```
CTO ARCHITECTURE APPROVAL — M1 — [Date]
AUTH METHOD: [confirmed / flagged — details]
NAVIGATION: [confirmed / flagged — details]
SCHEMA SCOPE: [tables approved for M1]
SAVES TABLE: [include in M1 / defer to M3]
SERVICE FUNCTIONS: [confirmed list]
GOOGLE OAUTH: [confirmed / concern raised]
STANDARDS PASSED TO TM: [yes / pending]
CEO ESCALATIONS: [list any, or "none"]
```

Then cascade task briefs to Technology Manager for Backend Engineer, Frontend Engineer, and AI Engineer (M2 prep).

---

## CEO Note

If anything here conflicts with a technical reality I am not seeing, escalate immediately using the Board Escalation Format in your role.md. Do not silently proceed with a decision I have not approved.
