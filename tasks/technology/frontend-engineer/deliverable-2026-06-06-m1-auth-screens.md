# DELIVERABLE — Frontend Engineer — 2026-06-06 (Updated: Post-Unblock)

**MILESTONE:** M1 — Authentication & User Profiles
**FEATURE:** Auth and profile screens — full M1 implementation
**PRIORITY:** P1

---

## Bundle Verification — 2026-06-06

Metro bundler started on `http://localhost:8081`. iOS bundle requested and compiled successfully.

- **Exit code:** 0 (clean compile)
- **Bundle size:** 7.2MB (expected for React Navigation + Supabase + all screens)
- **Modules confirmed in bundle:** AuthContext, AuthScreen, DiscoverScreen, EditProfileScreen, HomeScreen, OnboardingScreen, ProfileScreen, RootNavigator, SettingsScreen, TabNavigator, UploadScreen — all 11 present
- **JS errors in bundle:** None

Physical device testing (QR scan, auth flows, Google OAuth) requires the user to run `npx expo start` from `forkd/` and scan the QR with Expo Go. Instructions in the verification section below.

---

## Files Created / Modified

| File | Status | Notes |
|---|---|---|
| `forkd/src/styles/theme.js` | Created | Design system: colors, typography, spacing, radius, shadow |
| `forkd/src/context/AuthContext.js` | Created | Provides session + user via useAuth() hook; wraps RootNavigator |
| `forkd/src/navigation/index.js` | Created | RootStack (Onboarding → Main/Auth modal); initialRouteName from AsyncStorage |
| `forkd/src/screens/OnboardingScreen.js` | Created | 3-chip interest selection, first launch only, persists to AsyncStorage |
| `forkd/src/screens/AuthScreen.js` | Created | Login + signup toggle, Google OAuth via expo-auth-session, dismisses on session |
| `forkd/src/screens/HomeScreen.js` | Created | Auth-aware placeholder; sign-in prompt (unauth), browse-Discover CTA (auth) |
| `forkd/src/screens/DiscoverScreen.js` | Created | Accessible to all users without auth, M2 placeholder |
| `forkd/src/screens/UploadScreen.js` | Created | Auth-gated placeholder; sign-in prompt for unauthenticated users |
| `forkd/src/screens/ProfileScreen.js` | Created | Own profile + other-user view, follow/unfollow, sign-in prompt when unauth |
| `forkd/src/screens/EditProfileScreen.js` | Created | Edit display name, bio, avatar (ImagePicker + Supabase storage upload) |
| `forkd/src/screens/SettingsScreen.js` | Created | Change password (supabase.auth.updateUser), sign out |
| `forkd/App.js` | Modified | Renders RootNavigator only |

---

## Screen Specifications

### 1. OnboardingScreen
**Route:** `Onboarding` (root stack, shown once on first launch)
**Trigger:** `hasSeenOnboarding` absent from AsyncStorage
**States:**
- Default: Title ("What brings you to Forkd?"), subtitle, 3 tile buttons (Cooking & Recipes 🍳, Brewing & Ferments 🍺, Health & Nutrition 🥗)
- Loading: ActivityIndicator replaces "Get Started" button label while writing AsyncStorage
- Error: Red error text below tiles if AsyncStorage write fails
- Empty: N/A — tiles always render
**Interaction:** Select a tile → highlights with primary border color. Tap "Get Started" → writes `hasSeenOnboarding = 'true'` and `userInterest = [key]` to AsyncStorage → `navigation.replace('Main')`. Button disabled until a tile is selected.

---

### 2. AuthScreen
**Route:** `Auth` (root stack, modal presentation)
**Trigger:** Social action from unauthenticated state, or explicit sign-in navigation
**States:**
- Login mode: email + password fields, "Sign in" button, Google OAuth button, toggle to sign-up
- Signup mode: display name + email + password fields, "Create account" button, Google OAuth button, toggle to login
- Loading: ActivityIndicator on primary button + button disabled while request in flight
- Error: Red errorBox with message below password field
- Empty: N/A — form always visible
**Interaction:** Mode toggle clears all fields and error. On successful auth, `useEffect` watching `session` calls `navigation.goBack()` to dismiss modal. Close button (✕) top-right also dismisses. Keyboard-avoiding scroll view on both platforms.

---

### 3. HomeScreen
**Route:** `Home` tab
**States (unauthenticated):** Centered layout — home emoji, "Your feed lives here", subtitle, "Sign in" button → navigates to Auth modal
**States (authenticated):** Centered layout — cooking emoji, "Your feed is on its way", subtitle, "Browse Discover" button → navigates to Discover tab
**Loading:** N/A — no async fetch in M1
**Error:** N/A — no async fetch in M1

---

### 4. DiscoverScreen
**Route:** `Discover` tab (default tab via `initialRouteName="Discover"`)
**Accessible to:** All users including unauthenticated
**States:** Header bar ("Discover"), centered layout — magnifier emoji, "Recipes coming soon", M2 milestone note
**Loading:** N/A — no async fetch in M1
**Error:** N/A — no async fetch in M1

---

### 5. UploadScreen
**Route:** `Upload` tab
**States (unauthenticated):** Centered layout — upload emoji, "Share your recipes", subtitle, "Sign in to upload" button → navigates to Auth modal
**States (authenticated):** Centered layout — camera emoji, "Upload is coming in M2", milestone note
**Loading:** N/A — no async fetch in M1
**Error:** N/A — no async fetch in M1

---

### 6. ProfileScreen
**Route:** `ProfileMain` (within Profile stack)
**Receives:** Optional `route.params.userId` — if absent, shows current user's profile
**States:**
- Unauthenticated + own profile: Centered — person emoji, "Your profile lives here", "Sign in" button → Auth modal
- Loading (auth + userId known): Full-screen ActivityIndicator while fetching profile/followers/following
- Loaded (own profile): Avatar (or initials placeholder), display name, bio (if set), follower/following stat blocks, ⚙️ Settings button (top-right), "Edit Profile" outlined button
- Loaded (other user's profile): Same layout but "Follow" / "Following" button in place of Edit. Follow state loaded via checkIfFollowing. Follow/unfollow updates local count optimistically.
- Error: Error emoji, error message, "Try again" button
- Empty (profile not found): Shrug emoji, "Profile not found" message
**Pull-to-refresh:** RefreshControl re-fetches all data

---

### 7. EditProfileScreen
**Route:** `EditProfile` (within Profile stack, from ProfileScreen)
**Requires:** Authenticated session
**States:**
- Loading: Full-screen ActivityIndicator while fetching current profile data
- Loaded: Nav bar (Cancel / Edit Profile / Save), avatar circle (tap to pick photo), display name field, bio field (multiline, 200-char limit with counter), error box if save fails
- Saving: ActivityIndicator on "Save" nav button, fields not editable
- Load error: Error emoji, error message, "Go back" button
**Interaction:** Cancel → `navigation.goBack()`. Tap avatar → `ImagePicker.requestMediaLibraryPermissionsAsync()` → if granted, launch image library → select → shows locally via `localAvatarUri` state. Save → if `localAvatarUri` set, uploads to Supabase `avatars` bucket, gets public URL, then calls `updateProfile(userId, { display_name, bio, avatar_url })`. On success → `navigation.goBack()`.

---

### 8. SettingsScreen
**Route:** `Settings` (within Profile stack, from ProfileScreen ⚙️ button)
**Requires:** Authenticated session
**States (change password):**
- Default: "← Back" / Settings / empty nav bar, "Change Password" section with new password + confirm fields, "Update password" button
- Loading: ActivityIndicator on "Update password" button
- Error: Red errorBox with message
- Success: Green successBox "Password updated successfully."
**States (sign out):**
- Default: "Sign out" outlined destructive button (red border)
- Loading: ActivityIndicator on sign out button
- Error: Red errorBox with message
**Interaction:** Password change calls `supabase.auth.updateUser({ password })` — does not require current password. Sign out calls `supabase.auth.signOut()` — session clears → `onAuthStateChange` fires → app remains on Tab Navigator (Discover tab) in unauthenticated state.

---

## Architecture Note — P1 Constraint Applied

Original AC "unauthenticated users land on AuthScreen" is superseded. Architecture applied:

- App always opens to Tab Navigator with Discover as default tab (`initialRouteName="Discover"`)
- Unauthenticated users can browse Discover without any auth prompt
- Auth modal triggered by social actions via `navigation.navigate('Auth')`
- After auth, modal dismisses via `useEffect` on session state
- First launch: OnboardingScreen runs once (AsyncStorage gate)
- AuthContext wraps entire app — session/user available to all screens via `useAuth()`

---

## Acceptance Criteria — Status

| # | Criterion | Status |
|---|---|---|
| 1 | AuthScreen: email/password sign-up works end-to-end | READY — bundle clean, awaiting device test |
| 2 | AuthScreen: email/password login works end-to-end | READY — bundle clean, awaiting device test |
| 3 | AuthScreen: Google OAuth button initiates flow via expo-auth-session | READY — expo-web-browser installed, awaiting device test |
| 4 | Google OAuth tested on real physical device | PENDING DEVICE — requires Backend Engineer to confirm redirect URI in Supabase Auth dashboard first |
| 5 | ProfileScreen: displays avatar, display name, bio, follower/following counts | READY — awaiting device test |
| 6 | ProfileScreen: follow/unfollow works and persists | READY — calls followUser/unfollowUser, awaiting device test |
| 7 | EditProfileScreen: updates display name, bio — calls updateProfile | READY — awaiting device test |
| 7b | EditProfileScreen: avatar upload | PENDING — requires Backend Engineer `avatars` storage bucket |
| 8 | SettingsScreen: change password and sign out work | READY — awaiting device test |
| 9 | Tab navigator: 4 tabs, navigable on device | READY — React Navigation installed, bundle clean, awaiting device test |
| 10 | ~~Auth stack: unauth → AuthScreen~~ | SUPERSEDED — P1 constraint applied |
| 11 | Session persistence: app reopen keeps user logged in | READY — supabase.js configured with persistSession: true + AsyncStorage |
| 12 | All screens have loading, empty, and error states | PASS — verified by code review |
| 13 | No hardcoded credentials, no console.log, no TODOs | PASS — verified by code review |
| P1a | Unauthenticated Discover access without auth prompt | PASS (code) — awaiting device confirmation |
| P1b | Social actions redirect unauth users to Auth modal | PASS (code) — awaiting device confirmation |
| P1c | Discover tab is default for all users | PASS — `initialRouteName="Discover"` |
| P1d | First launch interest selection screen | PASS (code) — awaiting device confirmation |

---

## Device Verification — User Must Complete

Metro bundle compiles clean. To complete device verification:

```
1. Open a terminal in forkd/
2. Run: npx expo start
3. Scan the QR code with Expo Go on your physical device
4. Work through the checklist:
   - OnboardingScreen appears on fresh install
   - Discover tab loads without auth
   - Upload/Profile tabs show sign-in prompt when unauth
   - Email sign-up creates user + profiles row in Supabase
   - Email login restores session
   - Kill app and reopen — user stays logged in
   - Follow/unfollow on a second test account
   - Google OAuth (after Backend Engineer confirms redirect URI)
```

---

## Google OAuth Device Test

Not yet completed. Before attempting:
1. Backend Engineer must confirm `forkd://` redirect URI is registered in Supabase Auth dashboard
2. Google OAuth provider must be enabled in Supabase Auth dashboard
3. Test must be on physical device — simulator does not count

---
NEXT ACTION
Open:  Technology Manager
Say:   "You are the Technology Manager. Check your inbox."
Why:   Frontend Engineer M1 deliverable updated with full screen specs and bundle verification — Metro compiled clean, all modules present. Physical device testing ready to begin.
---
