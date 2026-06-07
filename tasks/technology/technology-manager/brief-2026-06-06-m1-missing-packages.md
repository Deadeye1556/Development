# CTO TASK BRIEF — Technology Manager — 2026-06-06

MILESTONE: M1 — Authentication & User Profiles
PRIORITY: P1 — Critical / Blocking. Frontend Engineer code imports both packages. The app will crash on any screen that triggers these imports until they are installed. (Inherited from CEO brief — no adjustment.)
TASK: Brief DevOps Engineer to install two missing packages immediately — before Frontend Engineer does any device testing.
DUE: Before Frontend Engineer completes any device testing.

---

## Issue This Brief to DevOps Engineer

```
TASK BRIEF — DevOps Engineer — 2026-06-06
MILESTONE: M1 — Authentication & User Profiles
FEATURE: Missing package install — expo-web-browser and expo-image-picker
PRIORITY: P1 — Critical / Blocking

Two packages are missing from the M1 install. Frontend Engineer code
references both. The app will crash on device without them.

INSTALL COMMANDS (run from forkd/ directory):
npx expo install expo-web-browser expo-image-picker

Use npx expo install — not npm install. Expo resolves compatible versions.

WHY THESE PACKAGES:
- expo-web-browser: required by AuthScreen.js for Google OAuth flow via
  WebBrowser.openAuthSessionAsync. Also a required peer of expo-auth-session
  that should have been included in the original install.
- expo-image-picker: required by EditProfileScreen.js for avatar photo
  selection.

ACCEPTANCE CRITERIA:
- [ ] expo-web-browser present in forkd/package.json at Expo-resolved version
- [ ] expo-image-picker present in forkd/package.json at Expo-resolved version
- [ ] npx expo start runs clean after install — no Metro bundler errors
- [ ] No src/ files modified
- [ ] No credentials introduced
- [ ] package.json and package-lock.json updated

FILES TO TOUCH:
- forkd/package.json
- forkd/package-lock.json

FILES NOT TO TOUCH:
- Any file in forkd/src/ → engineer domain
- forkd/app.json → already correct
- forkd/.env or .env.example → already correct

DELIVERABLE:
Write to tasks/technology/devops-engineer/deliverable-2026-06-06-m1-missing-packages.md:
- Confirmation both packages installed via npx expo install
- Expo-resolved versions from package.json
- npx expo start clean confirmation
```

---

## Your TM Review Checklist

- [ ] Both packages present in package.json — check exact package names
- [ ] npx expo start confirmed clean — no errors
- [ ] No src/ files modified
- [ ] No credentials introduced

## Sign-Off Format

When complete, write sign-off to `tasks/technology/cto/signoff-2026-06-06-m1-missing-packages.md`
