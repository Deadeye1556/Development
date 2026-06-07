# CTO TASK BRIEF — Technology Manager — 2026-06-06

**FOR:** DevOps Engineer
**MILESTONE:** M1 — Authentication & User Profiles
**TASK:** Add app scheme to `app.json` and install the four packages required for Supabase Auth and Google OAuth to function on device
**PRIORITY:** P2 — High. Google OAuth cannot be tested and M1 gate cannot close until these are in place.
**DUE:** Before Frontend Engineer begins auth screen implementation

---

## Issue This Brief to DevOps Engineer

```
TASK BRIEF — DevOps Engineer — 2026-06-06
MILESTONE: M1 — Authentication & User Profiles
FEATURE: App scheme and auth package installation

ACCEPTANCE CRITERIA:
- [ ] "scheme": "forkd" added to forkd/app.json (top-level field)
- [ ] @supabase/supabase-js installed
- [ ] @react-native-async-storage/async-storage installed
- [ ] react-native-url-polyfill installed
- [ ] expo-auth-session installed
- [ ] npx expo start still runs clean after installs
- [ ] No new secrets or values committed
- [ ] package.json and package-lock.json (or yarn.lock) updated and committed

FILES TO TOUCH:
- forkd/app.json (add scheme field only — no other changes)
- forkd/package.json (updated by npm/yarn install — commit this)
- forkd/package-lock.json or yarn.lock (updated by install — commit this)

FILES NOT TO TOUCH:
- Any file in src/ → engineer domain
- .env or .env.example → already correct
- Any screen, service, or navigation file

INSTALL COMMANDS (run from forkd/ directory):
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage react-native-url-polyfill expo-auth-session

Use npx expo install (not npm install) — Expo manages compatible versions automatically.

DEADLINE: Before Frontend Engineer begins auth screen implementation
```

---

## Your TM Review Checklist

- [ ] `app.json` has `"scheme": "forkd"` at the top level — confirm exact field and value
- [ ] All four packages appear in `package.json` dependencies
- [ ] `npx expo start` runs clean after install — no Metro bundler errors
- [ ] No src/ files modified
- [ ] No credentials introduced

## Sign-Off Format

When complete, write sign-off to `tasks/technology/cto/signoff-2026-06-06-m1-devops-packages.md`
