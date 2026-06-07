# UNBLOCK NOTICE — Frontend Engineer — 2026-06-06

FROM: Technology Manager
RE: M1 Device Verification — You Are Unblocked

---

All blocking dependencies are resolved. You may proceed to device verification immediately.

## What Was Installed

DevOps Engineer has confirmed all packages are in `forkd/package.json`:

| Package | Version |
|---|---|
| `@react-navigation/native` | `^7.2.5` |
| `@react-navigation/native-stack` | `^7.16.0` |
| `@react-navigation/bottom-tabs` | `^7.16.2` |
| `react-native-screens` | `4.25.2` |
| `react-native-safe-area-context` | `~5.7.0` |
| `expo-image-picker` | `~56.0.16` |
| `expo-web-browser` | `~56.0.5` |

Run `npm install` from `forkd/` to pull these into your local `node_modules` before testing.

---

## Device Verification Checklist

Work through these in order. Do not skip ahead.

**1. Navigation scaffold first**
- Run `npx expo start`, scan QR on device
- Confirm all 4 tabs load (Home, Discover, Upload, Profile)
- Confirm Discover tab is the default
- Confirm unauthenticated user can browse Discover without any auth prompt

**2. Onboarding**
- Clear app storage (or fresh install), reopen
- Confirm OnboardingScreen appears before Discover
- Confirm at least 1 chip must be selected to continue
- Confirm it does not appear on second launch

**3. Auth flows**
- Email/password sign-up — verify profiles row auto-populates in Supabase dashboard
- Email/password login
- Sign out from SettingsScreen — confirm return to unauthenticated state

**4. Social action auth gate**
- While signed out, tap Upload tab — confirm AuthScreen modal appears
- While signed out, tap Follow on a profile — confirm AuthScreen modal appears

**5. Session persistence**
- Sign in, kill app completely, reopen — confirm user is still logged in and lands on Discover

**6. Google OAuth (physical device only — simulator does not count)**
- Coordinate with Backend Engineer to confirm redirect URI (`forkd://`) is registered in Supabase Auth dashboard before attempting
- Tap "Continue with Google" on AuthScreen
- Complete OAuth flow
- Confirm session established and modal dismisses
- State device make and model in your deliverable

**7. Profile and edit flows**
- View own ProfileScreen — avatar, display name, bio, follower/following counts
- Edit display name and bio via EditProfileScreen — verify update in Supabase dashboard
- Avatar upload (requires `avatars` storage bucket — contact TM if this is not yet available)

---

## Outstanding Dependency — Avatar Upload

The `avatars` Supabase storage bucket has been briefed to Backend Engineer but may not yet be created. If avatar upload fails during verification, note it as blocked and continue with all other criteria. Do not hold the full deliverable for this one item.

---

## Deliverable

Update `tasks/technology/frontend-engineer/deliverable-2026-06-06-m1-auth-screens.md` with:
- Screen specs for all 9 screens (required — include before sign-off)
- Pass/fail per acceptance criterion with device confirmation where applicable
- Google OAuth device make/model
- Any remaining blocked items with reason

---
NEXT ACTION
Open:  Technology Manager
Say:   "You are the Technology Manager. Check your inbox."
Why:   Frontend Engineer device verification deliverable is ready for your review.
---
