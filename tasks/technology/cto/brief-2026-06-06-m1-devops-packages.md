# CEO TASK BRIEF — CTO — 2026-06-06

**MILESTONE:** M1 — Authentication & User Profiles
**PRIORITY:** P1 — Critical / Blocking. Frontend Engineer cannot wire auth screens until these packages are installed and app.json is configured. This is the only remaining unblocked engineering action before M1 UI work can begin.
**DUE:** 2026-06-07 — tomorrow. Frontend Engineer is waiting.

---

## Context

Backend Engineer completed M1 schema and service functions. CTO deliverable identified one DevOps dependency that must be resolved before Frontend Engineer can wire Supabase auth or begin the Google OAuth flow.

This is DevOps-domain work only. No application logic is written here — configuration and package installs only.

---

## Required Work

Brief DevOps Engineer on the following. All items are required:

### 1. Install required packages

From inside `forkd/`, install:
```
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage react-native-url-polyfill expo-auth-session
```

Use `npx expo install` (not `npm install`) — Expo resolves the correct compatible versions automatically.

### 2. Add deep link scheme to app.json

Add `"scheme": "forkd"` to `forkd/app.json` inside the `"expo"` object:
```json
{
  "expo": {
    "scheme": "forkd",
    ...
  }
}
```

This is required for Google OAuth redirect URI registration. Without it, `expo-auth-session` cannot handle the OAuth callback.

### 3. Verify startup still clean

After installs: run `npx expo start` and confirm no errors. DevOps must confirm in deliverable.

---

## Acceptance Criteria

- [ ] `@supabase/supabase-js` present in `forkd/package.json` dependencies
- [ ] `@react-native-async-storage/async-storage` present in `forkd/package.json`
- [ ] `react-native-url-polyfill` present in `forkd/package.json`
- [ ] `expo-auth-session` present in `forkd/package.json`
- [ ] `"scheme": "forkd"` present in `forkd/app.json` under `"expo"` key
- [ ] `npx expo start` runs clean after installs
- [ ] No secrets or credentials introduced
- [ ] `package-lock.json` updated (committed with package.json)

---

## Files DevOps May Touch

DevOps Engineer domain only:
- `forkd/package.json`
- `forkd/package-lock.json`
- `forkd/app.json`

No other files. DevOps does not modify `supabase.js`, `profiles.js`, or any file in `forkd/src/`.

---

## CEO Note

Cascade this brief to Technology Manager immediately. Technology Manager briefs DevOps Engineer. This is P1 — it unblocks Frontend Engineer from starting M1 UI work.
