# CTO TASK BRIEF — Technology Manager — 2026-06-06

**FOR:** Backend Engineer  
**MILESTONE:** M1 — Authentication & User Profiles  
**TASK:** Create M1 database schema in Supabase with RLS and write all M1 service functions  
**START CONDITION:** CTO architecture approval in `tasks/technology/cto/deliverable-2026-06-06-m1-architecture.md` must be confirmed before issuing this brief. Confirm approval, then issue immediately.  
**NOTE:** Backend work does not require Expo Go — this can start in Supabase dashboard right now.

---

## Issue This Brief to Backend Engineer

```
TASK BRIEF — Backend Engineer — 2026-06-06
MILESTONE: M1 — Authentication & User Profiles
FEATURE: Supabase schema and service functions for auth and profiles

ACCEPTANCE CRITERIA:
- [ ] profiles table created with exact schema from /docs/architecture.md
- [ ] follows table created with exact schema from /docs/architecture.md
- [ ] RLS enabled on both tables before any service function touches them
- [ ] Supabase trigger: on auth.users insert → auto-create profiles row
- [ ] Service functions written: fetchProfile, updateProfile, followUser,
      unfollowUser, checkIfFollowing, fetchFollowers, fetchFollowing
- [ ] All service functions return predictable typed responses (not raw Supabase response)
- [ ] Google OAuth redirect URI registered in Supabase Auth settings
- [ ] No service_role key referenced anywhere in app code
- [ ] All async operations have try/catch
- [ ] No console.log, no TODOs, no dead code

FILES TO TOUCH:
- Supabase dashboard (schema + RLS + triggers) — no file tracked in git
- forkd/src/lib/supabase.js (client init, if not yet created)
- forkd/src/services/profiles.js (create this file)

FILES NOT TO TOUCH:
- Any screen or component file → Frontend Engineer
- Any AI pipeline file → AI Engineer
- app.json, .env → DevOps Engineer

DEADLINE: M1 gate — June 22, 2026
```

---

## Your TM Review Checklist (after Backend submits)

- [ ] Every new table has RLS enabled — confirm in Supabase dashboard
- [ ] Supabase trigger verified (create a test user, confirm profiles row auto-creates)
- [ ] Service functions return typed responses — check for raw `.data` pass-throughs
- [ ] Google OAuth redirect URI tested, not just configured
- [ ] No `service_role` key anywhere in app code
- [ ] No console.log or TODOs
- [ ] Deliverable includes: tables created, RLS policies listed, service functions listed, how-to-verify steps

## Sign-Off Format

When complete, write sign-off to `tasks/technology/cto/signoff-2026-06-06-m1-backend-schema.md`
