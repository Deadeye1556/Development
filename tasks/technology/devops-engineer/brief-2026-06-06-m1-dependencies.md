# TASK BRIEF — DevOps Engineer — 2026-06-06

MILESTONE: M1 — Authentication & User Profiles
FEATURE: App scheme and auth package installation
PRIORITY: High — Google OAuth cannot be tested and M1 gate cannot close until these are in place.

## ACCEPTANCE CRITERIA

- [ ] `"scheme": "forkd"` added to `forkd/app.json` (top-level field under `expo` key)
- [ ] `@supabase/supabase-js` installed
- [ ] `@react-native-async-storage/async-storage` installed
- [ ] `react-native-url-polyfill` installed
- [ ] `expo-auth-session` installed
- [ ] `npx expo start` still runs clean after installs
- [ ] No new secrets or values committed
- [ ] `package.json` and `package-lock.json` updated and reflect all four packages

## FILES TO TOUCH

- `forkd/app.json` — add `"scheme": "forkd"` field only, no other changes
- `forkd/package.json` — updated by install command
- `forkd/package-lock.json` — updated by install command

## FILES NOT TO TOUCH

- Any file in `forkd/src/` → engineer domain
- `.env` or `.env.example` → already correct, no new variables needed
- Any screen, service, or navigation file

## INSTALL COMMANDS

Run from the `forkd/` directory:

```powershell
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage react-native-url-polyfill expo-auth-session
```

Use `npx expo install` (not `npm install`) — Expo resolves compatible versions automatically.

## DELIVERABLE

Write to `tasks/technology/devops-engineer/deliverable-2026-06-06-m1-dependencies.md`:
- Confirmation `"scheme": "forkd"` is in `app.json`
- All four packages listed with installed versions (from `package.json`)
- Confirmation `npx expo start` runs clean
- Confirmation no src/ files modified and no credentials introduced

## DEADLINE

Before Frontend Engineer begins auth screen implementation. Treat as immediate — Frontend is blocked on this.

---
NEXT ACTION
Open:  Technology Manager
Say:   "You are the Technology Manager. Check your inbox."
Why:   DevOps Engineer deliverable for M1 dependencies is ready for your review.
---
