# CTO TASK BRIEF — Technology Manager — 2026-06-06

**FOR:** Frontend Engineer  
**MILESTONE:** M1 — Authentication & User Profiles  
**TASK:** M1 screen specification document + tab navigation scaffold  
**START CONDITION:** Issue immediately — this is planning work that does not require Expo Go running.  
**HOLD:** Do not assign UI implementation work until M0 gate is confirmed passed.

---

## Issue This Brief to Frontend Engineer

```
TASK BRIEF — Frontend Engineer — 2026-06-06
MILESTONE: M1 — Authentication & User Profiles
FEATURE: M1 screen specifications and navigation scaffold

ACCEPTANCE CRITERIA:
- [ ] Screen spec document written for every M1 screen (see list below)
- [ ] Tab navigator scaffold written in forkd/src/navigation/index.js
  (4 tabs: Home, Discover, Upload, Profile — placeholder screens OK for now)
- [ ] Auth flow navigation written (stack: Login → SignUp → ForgotPassword)
- [ ] Each screen spec lists: components needed, data it displays,
      states it must handle (loading/empty/error), user actions

M1 SCREENS TO SPECIFY:
1. AuthScreen (login + sign up toggle)
2. SignUpScreen (email, password, display name)
3. LoginScreen (email/password + Google OAuth button)
4. ProfileScreen (avatar, display name, bio, follower count, following count,
   recipe grid, edit button if own profile)
5. EditProfileScreen (avatar upload, display name, bio)
6. SettingsScreen (change password, sign out)

FILES TO TOUCH:
- forkd/src/navigation/index.js (create — tab + auth stack)
- forkd/src/screens/ (create placeholder screen files for each M1 screen)
- deliverable: tasks/technology/frontend-engineer/
  deliverable-2026-06-06-m1-screen-specs.md

FILES NOT TO TOUCH:
- Supabase schema or services → Backend Engineer
- app.json, .env → DevOps Engineer
- Any AI file → AI Engineer

NOTE: Navigation scaffold code can be written and committed even before
Expo Go is working. Screen specs are pure documentation — no Expo needed.

DEADLINE: Screen specs — 2026-06-09 (before M0 gate, so we are ready)
          Navigation scaffold — deliver with specs
```

---

## Your TM Review Checklist

- [ ] All 6 screens are specified — nothing missing
- [ ] Each spec includes: components, data, states (loading/empty/error), user actions
- [ ] Navigation scaffold: tab navigator + auth stack both written
- [ ] No hardcoded colors in scaffold (uses theme constants or placeholder)
- [ ] No screen has a missing state (must have loading, empty, error planned)

## Sign-Off Format

When complete, write sign-off to `tasks/technology/cto/signoff-2026-06-06-m1-frontend-planning.md`
