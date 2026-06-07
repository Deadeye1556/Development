# CEO TASK BRIEF — CTO — 2026-06-06

**MILESTONE:** M1 — Authentication & User Profiles
**TASK:** Cascade to Technology Manager immediately: DevOps must install two missing packages before Frontend Engineer can test AuthScreen or EditProfileScreen on device.
**PRIORITY:** P1 — Critical / Blocking. Frontend Engineer code imports both packages. The app will crash on any screen that triggers these imports until they are installed.
**DUE:** Before Frontend Engineer completes any device testing.

---

## Missing Packages

Frontend Engineer implementation references two packages that were not in the original DevOps install:

| Package | Where Used | Install Command |
|---|---|---|
| `expo-web-browser` | `AuthScreen.js` — Google OAuth flow via `WebBrowser.openAuthSessionAsync` | `npx expo install expo-web-browser` |
| `expo-image-picker` | `EditProfileScreen.js` — Avatar photo selection | `npx expo install expo-image-picker` |

Both are standard Expo packages with Expo-managed version resolution. Use `npx expo install` — not `npm install`.

---

## Context

The original DevOps package brief installed:
- `@supabase/supabase-js`
- `@react-native-async-storage/async-storage`
- `react-native-url-polyfill`
- `expo-auth-session`

`expo-web-browser` is a required peer of `expo-auth-session` and should have been included. `expo-image-picker` was not in scope of the original brief but is now needed for the avatar upload flow in `EditProfileScreen`.

---

## DevOps Deliverable

DevOps writes to `tasks/technology/devops-engineer/deliverable-2026-06-06-m1-missing-packages.md`:
- Confirmation both packages installed via `npx expo install`
- Updated `package.json` entries showing the Expo-resolved versions
- `npx expo start` runs clean after install
