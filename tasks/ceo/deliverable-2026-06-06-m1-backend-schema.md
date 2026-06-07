# CTO DELIVERABLE SUMMARY — M1 Backend Schema — 2026-06-06

MILESTONE GATE: M1 — Authentication & User Profiles
GATE CHECKBOXES CLOSED BY THIS DELIVERABLE:
- [x] Create `profiles` table with RLS
- [x] Create `follows` table with RLS
- [x] Build follow/unfollow system (service functions delivered)

GATE CHECKBOXES STILL OPEN (not Backend Engineer scope):
- [ ] New user can sign up, log in, and log out — Frontend Engineer
- [ ] Profile screen shows avatar, name, bio — Frontend Engineer
- [ ] Two test accounts can follow each other — requires Frontend + device
- [ ] Tab navigation works on iOS and Android — Frontend Engineer
- [ ] Google OAuth — multi-team dependency (see below)

FILES CHANGED:
- Supabase dashboard — `profiles`, `follows`, `saves` tables created with RLS (not tracked in git — Board must verify in dashboard)
- `forkd/src/lib/supabase.js` — Supabase client initialized (AsyncStorage adapter, env vars, detectSessionInUrl: false)
- `forkd/src/services/profiles.js` — all 7 M1 service functions written

SECURITY CHECK: ✅ Passed
- RLS enabled on `profiles`, `follows`, and `saves` before any service function touches them
- No `service_role` key in any app code
- All credentials via environment variables only
- `detectSessionInUrl: false` set correctly (prevents URL-based session exposure in React Native)
- All async operations have try/catch

ARCHITECTURE CHECK: ✅ Passed
- Supabase trigger used for auto-profile creation on `auth.users` insert (DB trigger, not app-level code — per CTO M1 standard)
- `saves` table created schema + RLS only, no service functions — per CTO instruction
- All service functions return typed responses, no raw `.data` pass-through
- File locations match architecture.md exactly

SCOPE CHECK: ✅ Passed
- Only Backend-domain files touched
- Google OAuth not attempted unilaterally — correctly flagged as multi-team dependency

MULTI-TEAM DEPENDENCIES (must be resolved before M1 gate closes):
1. **Board** — fill in `forkd/.env` with Supabase URL and Anon Key; verify Supabase trigger fires by creating a test user in Supabase Auth dashboard and confirming a `profiles` row auto-creates
2. **DevOps Engineer (new brief required)** — add `"scheme": "forkd"` to `forkd/app.json`; install packages: `@supabase/supabase-js`, `@react-native-async-storage/async-storage`, `react-native-url-polyfill`, `expo-auth-session`
3. **Board / Google** — Google Cloud Console credentials + Supabase Auth dashboard redirect URI registration
4. **Physical device test** — Google OAuth must be tested on a real physical device per CTO standard before M1 sign-off is final

RECOMMENDED GIT ACTION: commit to `main` — "Add Supabase client init and M1 profile service functions"
FILES TO COMMIT: `forkd/src/lib/supabase.js`, `forkd/src/services/profiles.js`
