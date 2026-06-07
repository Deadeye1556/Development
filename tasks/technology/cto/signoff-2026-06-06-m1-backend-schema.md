# TECHNOLOGY MANAGER SIGN-OFF — M1 Backend Schema — 2026-06-06

ENGINEER: Backend Engineer
CHECKLIST: all items passed

NOTES:
- profiles and follows tables created with exact schema per architecture.md — confirmed column-by-column
- saves table created schema + RLS only, no service functions — exactly per CTO instruction
- RLS enabled on all three tables; policies confirmed correct (authenticated SELECT, own-row UPDATE/INSERT/DELETE patterns)
- Supabase trigger written correctly (security definer, fires on auth.users insert, reads display_name from raw_user_meta_data) — dashboard verification required by Board before M1 gate closes
- All 7 service functions written in forkd/src/services/profiles.js — try/catch, typed returns, no raw .data pass-through, no service_role key
- forkd/src/lib/supabase.js initialized correctly — AsyncStorage adapter, detectSessionInUrl: false, env vars only
- Google OAuth: NOT YET CONFIGURED — correctly flagged as multi-team dependency. DevOps Engineer must add "scheme": "forkd" to app.json and install required packages; Board must supply Google Cloud Console credentials. Physical device test required per CTO standard before M1 sign-off is final.

OPEN GATE ITEMS (not Backend Engineer failures — multi-team dependencies):
1. Board fills in .env values (Supabase URL/key) and confirms trigger fires via dashboard
2. DevOps Engineer: add "scheme": "forkd" to app.json, install @supabase/supabase-js, @react-native-async-storage/async-storage, react-native-url-polyfill, expo-auth-session
3. Google OAuth: Google Cloud Console credentials + Supabase Auth dashboard registration
4. Physical device OAuth test before M1 gate closes (CTO requirement)

READY FOR CTO REVIEW: ✅
