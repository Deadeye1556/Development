# DELIVERABLE — Frontend Engineer — 2026-06-06

**MILESTONE:** M1 — Authentication & User Profiles
**FEATURE:** Auth and profile screens — full M1 implementation
**PRIORITY:** P1

---

## Summary

Full M1 navigation scaffold and auth/profile screens implemented with the P1 architectural constraint applied. Architecture is unauthenticated-first: Discover tab is accessible without auth, AuthScreen is a modal triggered by social actions, interest selection runs once on first launch.

---

## Files Created / Modified

| File | Status | Notes |
|---|---|---|
| `forkd/src/styles/theme.js` | Created | Design system: colors, typography, spacing, radius, shadow |
| `forkd/src/context/AuthContext.js` | Created | Provides session + user via useAuth() hook; wraps RootNavigator |
| `forkd/src/navigation/index.js` | Created | RootStack (Onboarding → Main/Auth modal); initialRouteName from AsyncStorage |
| `forkd/src/screens/OnboardingScreen.js` | Created | 3-chip interest selection, first launch only, persists to AsyncStorage |
| `forkd/src/screens/AuthScreen.js` | Created | Login + signup toggle, Google OAuth via expo-auth-session, dismisses on session |
| `forkd/src/screens/HomeScreen.js` | Created | Auth-aware placeholder; sign-in prompt for unauth, browse-Discover CTA for auth |
| `forkd/src/screens/DiscoverScreen.js` | Created | Accessible to all users, M2 placeholder |
| `forkd/src/screens/UploadScreen.js` | Created | Auth-gated placeholder; sign-in prompt for unauth |
| `forkd/src/screens/ProfileScreen.js` | Created | Own profile + other-user view, follow/unfollow, sign-in prompt for unauth |
| `forkd/src/screens/EditProfileScreen.js` | Created | Edit display name, bio, avatar via ImagePicker + Supabase storage |
| `forkd/src/screens/SettingsScreen.js` | Created | Change password (supabase.auth.updateUser), sign out |
| `forkd/App.js` | Modified | Now renders RootNavigator; removed default Expo boilerplate |

---

## BLOCKING DEPENDENCY — DevOps Engineer Must Install Packages

**The app cannot be run or tested until these packages are installed.** None of these were present in `package.json` or `node_modules` when this deliverable was written.

```
@react-navigation/native
@react-navigation/native-stack
@react-navigation/bottom-tabs
react-native-screens
react-native-safe-area-context
expo-image-picker
expo-web-browser
```

DevOps must add all 7 to `package.json` and run `npm install`. Avatar upload (EditProfileScreen) also requires a Supabase `avatars` storage bucket — Backend Engineer must create it with appropriate RLS before that AC can be verified.

---

## Architecture Note — P1 Constraint Applied

The original brief AC "unauthenticated users land on AuthScreen, authenticated users land on tab navigator" is superseded. Applied architecture:

- App always opens to Tab Navigator (Discover tab default via `initialRouteName="Discover"`)
- Unauthenticated users can browse Discover without signing in
- Social action triggers (`navigation.navigate('Auth')`) present AuthScreen as a root-level modal
- After auth, modal dismisses and user returns to context (via `useEffect` on session in AuthScreen)
- First launch: OnboardingScreen (3 interest chips) runs once, `hasSeenOnboarding` written to AsyncStorage

---

## Acceptance Criteria — Status

| # | Criterion | Status | Notes |
|---|---|---|---|
| 1 | AuthScreen: email/password sign-up works end-to-end | BLOCKED | DevOps must install packages before device test |
| 2 | AuthScreen: email/password login works end-to-end | BLOCKED | Same — packages not installed |
| 3 | AuthScreen: Google OAuth button initiates flow via expo-auth-session | BLOCKED | `expo-web-browser` not installed |
| 4 | Google OAuth tested on real physical device | BLOCKED | Cannot test without packages; also requires Backend Engineer to confirm redirect URI in Supabase Auth dashboard before this can be marked done |
| 5 | ProfileScreen: displays avatar, display name, bio, follower count, following count | BLOCKED | Packages not installed — code correct per review |
| 6 | ProfileScreen: follow/unfollow works and persists | BLOCKED | Packages not installed — calls followUser/unfollowUser correctly |
| 7 | EditProfileScreen: updates display name, bio, avatar — calls updateProfile | BLOCKED | Packages not installed; also requires `avatars` Supabase storage bucket |
| 8 | SettingsScreen: change password and sign out work | BLOCKED | Packages not installed — calls supabase.auth.updateUser and signOut correctly |
| 9 | Tab navigator: 4 tabs, navigable on device | BLOCKED | React Navigation packages not installed |
| 10 | ~~Auth stack: unauth → AuthScreen, auth → Tab~~ | SUPERSEDED | P1 constraint replaced this with content-first architecture (see above) |
| 11 | Session persistence: app reopen keeps user logged in | BLOCKED | Packages not installed — Supabase client already configured with persistSession: true and AsyncStorage |
| 12 | All screens have loading, empty, and error states | PASS | ProfileScreen, EditProfileScreen, SettingsScreen, AuthScreen, OnboardingScreen: all three states implemented. Placeholder screens (Home, Discover, Upload) have auth-aware empty states; no async data fetch means loading/error not applicable for M1 |
| 13 | No hardcoded credentials, no console.log, no TODOs | PASS | Confirmed by code review |

**New ACs from P1 constraint:**

| # | Criterion | Status |
|---|---|---|
| P1a | Unauthenticated users can browse Discover tab without signing in | PASS (code) — BLOCKED (device test) |
| P1b | Social actions redirect unauthenticated users to Auth modal | PASS (code) — Home, Upload, Profile tabs all call navigation.navigate('Auth') when unauth |
| P1c | Discover tab is the default tab for all users | PASS — `initialRouteName="Discover"` on Tab.Navigator |
| P1d | First launch shows interest selection screen (OnboardingScreen) | PASS (code) — `initialRouteName` set from AsyncStorage; `navigation.replace('Main')` after selection |

---

## Google OAuth Device Test

**Not completed.** This AC explicitly states the simulator result does not count and physical device is required. The device test cannot be performed until:
1. DevOps installs `expo-web-browser` and remaining packages
2. Backend Engineer confirms the exact redirect URI (`forkd://`) is registered in the Supabase Auth dashboard
3. Google OAuth provider is enabled in the Supabase Auth dashboard

This item should remain BLOCKED until both engineers confirm their coordination steps are complete.

---

## How to Verify After Packages Are Installed

1. **Session persistence:** Run `expo start`, sign up, kill app, reopen — should land directly on Tab Navigator (Discover tab)
2. **Unauthenticated Discover access:** Clear storage, reopen, complete onboarding — Discover tab must be visible and navigable without any auth prompt
3. **Auth modal trigger:** Tap Upload tab without signing in — should navigate to Auth modal overlay
4. **Sign-up flow:** Complete sign-up — profiles row should auto-populate via Supabase trigger (Backend Engineer must confirm trigger exists)
5. **Follow/unfollow:** On another user's ProfileScreen, tap Follow — check `follows` table in Supabase dashboard
6. **Edit profile:** Change display name and bio, tap Save — verify update in Supabase `profiles` table
7. **Settings sign out:** Tap Sign out — app should return to Discover tab with unauthenticated state
8. **Onboarding one-time:** Complete onboarding, kill and reopen app — onboarding must not appear again

---

NEXT ACTION
Open:  Technology Manager
Say:   "You are the Technology Manager. Check your inbox."
Why:   Frontend Engineer M1 auth screens deliverable is ready for review. Contains a blocking dependency: 7 npm packages must be installed by DevOps before any device verification is possible.
---
