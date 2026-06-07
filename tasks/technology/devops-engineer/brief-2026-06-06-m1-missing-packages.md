# TASK BRIEF — DevOps Engineer — 2026-06-06

MILESTONE: M1 — Authentication & User Profiles
FEATURE: Missing package install — expo-web-browser and expo-image-picker
PRIORITY: P1 — Critical / Blocking

Two packages are missing from the M1 install. Frontend Engineer code references both. The app will crash on device without them.

## INSTALL COMMANDS (run from forkd/ directory)

```powershell
npx expo install expo-web-browser expo-image-picker
```

Use `npx expo install` — not `npm install`. Expo resolves compatible versions.

## WHY THESE PACKAGES

- `expo-web-browser` — required by `AuthScreen.js` for Google OAuth flow via `WebBrowser.openAuthSessionAsync`. Also a required peer of `expo-auth-session` that should have been included in the original install.
- `expo-image-picker` — required by `EditProfileScreen.js` for avatar photo selection.

## ACCEPTANCE CRITERIA

- [ ] `expo-web-browser` present in `forkd/package.json` at Expo-resolved version
- [ ] `expo-image-picker` present in `forkd/package.json` at Expo-resolved version
- [ ] `npx expo start` runs clean after install — no Metro bundler errors
- [ ] No `forkd/src/` files modified
- [ ] No credentials introduced
- [ ] `package.json` and `package-lock.json` updated

## FILES TO TOUCH

- `forkd/package.json` — updated by install command
- `forkd/package-lock.json` — updated by install command

## FILES NOT TO TOUCH

- Any file in `forkd/src/` → engineer domain
- `forkd/app.json` → already correct
- `forkd/.env` or `.env.example` → already correct

## DELIVERABLE

Write to `tasks/technology/devops-engineer/deliverable-2026-06-06-m1-missing-packages.md`:
- Confirmation both packages installed via `npx expo install`
- Expo-resolved versions from `package.json`
- `npx expo start` clean confirmation

## DEADLINE

Immediate — Frontend Engineer device verification is blocked.

---
NEXT ACTION
Open:  Technology Manager
Say:   "You are the Technology Manager. Check your inbox."
Why:   DevOps Engineer deliverable for missing packages is ready for your review.
---
