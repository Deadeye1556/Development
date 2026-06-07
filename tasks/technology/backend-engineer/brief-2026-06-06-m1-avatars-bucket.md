# TASK BRIEF — Backend Engineer — 2026-06-06

MILESTONE: M1 — Authentication & User Profiles
FEATURE: Supabase Storage — avatars bucket
PRIORITY: High — EditProfileScreen avatar upload is blocked until this bucket exists.

## Context

Frontend Engineer's `EditProfileScreen.js` uploads avatars to Supabase Storage at path `{userId}/avatar.{ext}` in a bucket named `avatars`. This bucket does not yet exist. Avatar upload will fail at runtime until it is created with correct RLS.

## ACCEPTANCE CRITERIA

- [ ] `avatars` storage bucket created in Supabase (public bucket — avatar URLs are read publicly by ProfileScreen)
- [ ] RLS policy: authenticated users can upload/update only to their own folder (`{userId}/`)
  - INSERT and UPDATE allowed where `(storage.foldername(name))[1] = auth.uid()::text`
- [ ] RLS policy: public SELECT on all objects in bucket (profile photos are public)
- [ ] Bucket verified: upload a test image via Supabase dashboard, confirm public URL is accessible
- [ ] No `service_role` key referenced anywhere in app code
- [ ] No console.log, no TODOs

## FILES TO TOUCH

- Supabase dashboard — Storage configuration and RLS (no file tracked in git)

## FILES NOT TO TOUCH

- Any screen or component file → Frontend Engineer
- `forkd/src/services/profiles.js` → no changes needed, avatar URL already handled by `updateProfile`
- `app.json`, `.env` → DevOps Engineer

## DELIVERABLE

Write to `tasks/technology/backend-engineer/deliverable-2026-06-06-m1-avatars-bucket.md`:
- Confirmation bucket created and visibility setting
- RLS policies applied (list them)
- How to verify (test upload + public URL check)
- No service_role key in app code confirmed

## DEADLINE

Before M1 gate closes — avatar upload is a required AC for EditProfileScreen.

---
NEXT ACTION
Open:  Technology Manager
Say:   "You are the Technology Manager. Check your inbox."
Why:   Backend Engineer deliverable for avatars storage bucket is ready for your review.
---
