# TASK BRIEF — DevOps Engineer — 2026-06-06

MILESTONE: M1 — Authentication & User Profiles
FEATURE: React Navigation and UI package installation
PRIORITY: High — Frontend Engineer screens cannot be run or tested until these are installed.

## Context

Frontend Engineer has written all M1 screens. They import 7 packages that are not yet in `package.json`. The app will not start until these are installed.

## ACCEPTANCE CRITERIA

- [ ] All 7 packages installed with no peer dependency errors:
  - `@react-navigation/native`
  - `@react-navigation/native-stack`
  - `@react-navigation/bottom-tabs`
  - `react-native-screens`
  - `react-native-safe-area-context`
  - `expo-image-picker`
  - `expo-web-browser`
- [ ] `npx expo start` runs clean after install
- [ ] `package.json` and `package-lock.json` updated to reflect all new packages
- [ ] `.env` remains excluded from git

## FILES TO TOUCH

- `forkd/package.json` — updated by install command
- `forkd/package-lock.json` — updated by install command

## FILES NOT TO TOUCH

- Any file in `forkd/src/` → engineer domain
- `forkd/app.json`, `.env`, `.env.example` → already correct

## INSTALL COMMAND

Run from the `forkd/` directory:

```powershell
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context expo-image-picker expo-web-browser
```

Use `npx expo install` — Expo resolves SDK-compatible versions.

## DELIVERABLE

Write to `tasks/technology/devops-engineer/deliverable-2026-06-06-m1-nav-packages.md`:
- All 7 packages listed with installed versions (from `package.json`)
- Confirmation `npx expo start` runs clean
- Confirmation `.env` is not staged

## DEADLINE

Immediate — Frontend Engineer device verification is blocked on this.

---
NEXT ACTION
Open:  Technology Manager
Say:   "You are the Technology Manager. Check your inbox."
Why:   DevOps Engineer deliverable for M1 nav packages is ready for your review.
---
