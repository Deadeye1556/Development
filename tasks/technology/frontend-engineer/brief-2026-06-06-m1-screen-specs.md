# TASK BRIEF — Frontend Engineer — 2026-06-06

**FROM:** Technology Manager  
**MILESTONE:** M1 — Authentication & User Profiles  
**FEATURE:** M1 screen specifications + navigation scaffold  
**START CONDITION:** Start immediately — this work does not require Expo Go running.  
**HOLD:** Full screen implementation is held until M0 gate passes. This task is planning + scaffold only.

---

## Part 1 — Screen Specification Document

Write a specification for every M1 screen. For each screen, document exactly:
- **Components needed** (list every UI element)
- **Data it displays** (what comes from Supabase, what is local state)
- **User actions** (what the user can tap, type, or swipe)
- **States required** (loading, empty, error — what each looks like)

### Screens to Specify

**1. AuthScreen** (entry point — login or sign up choice)
- Components: app logo, "Sign In" button, "Create Account" button, Google OAuth button
- States: default, loading (during Google OAuth)
- Actions: navigate to LoginScreen, navigate to SignUpScreen, Google OAuth tap

**2. LoginScreen**
- Components: email input, password input, "Log In" button, "Forgot Password?" link, Google OAuth button, back arrow
- States: default, loading, error (invalid credentials)
- Actions: submit, navigate to ForgotPassword, Google OAuth, back

**3. SignUpScreen**
- Components: display name input, email input, password input, "Create Account" button, back arrow
- States: default, loading, error (email taken, weak password)
- Validation: display name required, email format, password minimum 8 chars
- Actions: submit, back

**4. ProfileScreen** (used for own profile and other users' profiles)
- Components: avatar (circular), display name, bio, follower count, following count, "Follow" button (if not own profile), "Edit Profile" button (if own profile), recipe grid or empty state
- States: loading (skeleton), loaded, empty (no recipes yet), error
- Data: profile row from Supabase, follows relationship
- Actions: follow/unfollow, navigate to EditProfile (own), tap recipe → RecipeDetail (M2)

**5. EditProfileScreen**
- Components: avatar with edit overlay, display name input, bio input, "Save" button
- States: default, loading (save in progress), success, error
- Actions: pick avatar image (Expo ImagePicker), save, cancel

**6. SettingsScreen**
- Components: "Change Password" row, "Sign Out" row, dividers
- States: default, loading (sign out in progress)
- Actions: change password flow, sign out (clears session, navigates to AuthScreen)

---

## Part 2 — Navigation Scaffold

Create `forkd/src/navigation/index.js` with:

```
Auth Stack (shown when not logged in):
  AuthScreen → LoginScreen
  AuthScreen → SignUpScreen
  LoginScreen → ForgotPasswordScreen (placeholder)

Tab Navigator (shown when logged in):
  Tab 1: Home (HomeScreen placeholder)
  Tab 2: Discover (DiscoverScreen placeholder)
  Tab 3: Upload (UploadScreen placeholder)
  Tab 4: Profile (ProfileScreen)

Profile Stack (nested in Profile tab):
  ProfileScreen → EditProfileScreen
  ProfileScreen → SettingsScreen
```

Create placeholder screen files (just a `<View><Text>Screen Name</Text></View>`) for any screen not yet built. Name the files exactly as they appear in `/docs/architecture.md`.

---

## Acceptance Criteria

- [ ] Spec document exists with all 6 screens specified
- [ ] Each screen spec includes: components, data, user actions, all 3 states
- [ ] `forkd/src/navigation/index.js` created with auth stack + tab navigator
- [ ] Placeholder screen files created for all M1 screens
- [ ] No hardcoded colors — any color references use `styles/theme.js` or a placeholder constant
- [ ] No API calls in scaffold code
- [ ] No TODOs (say "placeholder" explicitly if a component is placeholder)

---

## Self-Check Before Submitting

- [ ] Every screen has loading, empty, and error states specified — no exceptions
- [ ] Navigation structure matches the flow a real user would experience
- [ ] Placeholder screens import cleanly (no broken imports)

---

## Deliverable

Write to `tasks/technology/frontend-engineer/deliverable-2026-06-06-m1-screen-specs.md`

Include:
1. Screen specs (can copy from this brief format and fill in)
2. Files created (list)
3. Navigation structure summary (one paragraph)
4. Any UX questions or edge cases flagged for TM review
