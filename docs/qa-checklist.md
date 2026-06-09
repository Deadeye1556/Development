# Forkd — QA / On-Device Verification Checklist

**Owner:** COO · **Issue:** [FOR-48](/FOR/issues/FOR-48)
**Feeds:** on-device QA [FOR-49](/FOR/issues/FOR-49) (COO-2) · store-submission gate [FOR-55](/FOR/issues/FOR-55) (COO-8)
**Related:** [Gate Tracker](./gate-tracker.md) · [Milestones](./milestones.md) · [Cadence](./delivery-cadence.md)

The pre-release verification gate run **on a physical device** before any milestone gate flips to `passed` and before any store submission. Each item has a single, unambiguous **pass condition**. A release ships only when every applicable section has **zero known blockers**.

---

## Definition of Done (this artifact)

- ✅ On-device pre-release checklist covering **functional**, **platform**, and **store-compliance** items.
- ✅ Each item has a clear pass condition.
- ✅ Aligns with the bar: *"store submission runs against a compliance checklist with zero known blockers."*

---

## How to run

1. Build a release-config app and install on a **physical iOS device and a physical Android device** (Expo Go is acceptable for milestone gates; a release/standalone build is **required** before store submission).
2. Walk each applicable section top to bottom. Mark `PASS` / `FAIL` / `N/A`.
3. Any `FAIL` is a **known blocker** — log it, name an owner, and the release does not proceed until it is `PASS` or explicitly waived by the COO.
4. Record the run (date, device + OS version, build) in the Gate Tracker evidence column when used to close a milestone gate.

**Pass bar for a release:** every applicable item is `PASS`; zero `FAIL` open.

---

## A. Functional (per-feature)

Run the items for the feature(s) in the release. Pass condition is stated inline.

### A1. Auth & Profiles (M1)
- [ ] Sign up with a brand-new email → account is created and lands logged-in. **Pass:** new session active, no error toast.
- [ ] Log out → log back in with the same credentials. **Pass:** returns to the authenticated home.
- [ ] Google OAuth sign-in completes via `forkd://` redirect. **Pass:** returns to app authenticated.
- [ ] Profile screen renders avatar, display name, and bio. **Pass:** all three visible and correct.
- [ ] Edit profile (name/bio/avatar) and re-open the screen. **Pass:** changes persisted.
- [ ] Account A follows Account B; counts update on both. **Pass:** follower/following counts increment correctly.

### A2. Recipe Upload (M2)
- [ ] Manual entry: title + ingredients (qty/unit/name) + steps → publish. **Pass:** recipe saved to Supabase and retrievable.
- [ ] Photo-snap a recipe card → form auto-fills. **Pass:** parsed fields match the card.
- [ ] Nutrition label generates after ingredient list completes. **Pass:** appears ≤5s with cal/protein/fat/carbs.
- [ ] Serving-size slider changes. **Pass:** nutrition panel updates dynamically.
- [ ] Attach photo/video to a step + cover media. **Pass:** media attaches to the correct step and persists.
- [ ] Content-type tags (recipe/ferment/mead/spirit/cider/homebrew). **Pass:** saved tags reload correctly.

### A3. Catalog & Feed (M3 / M4)
- [ ] Search a known term. **Pass:** relevant results ≤1s.
- [ ] Apply category/dietary/content filters. **Pass:** results narrow correctly.
- [ ] Save / rate / comment on a recipe. **Pass:** all three persist across reload.
- [ ] Follow 3 accounts → home feed populates with their recipes. **Pass:** their content appears.
- [ ] Empty feed state. **Pass:** onboarding/suggested-creators prompt shows, not a blank screen.

### A4. Grocery Cart (M5)
- [ ] "Add to Cart" → Instacart opens pre-loaded. **Pass:** ingredients present in the cart.
- [ ] Shopping list aggregates + dedupes across 3 recipes. **Pass:** duplicate ingredients combined.
- [ ] Pantry checkboxes. **Pass:** persist between sessions.
- [ ] Complete a cart event. **Pass:** logged to `cart_events` with recipe_id, creator_id, user_id, retailer, value, timestamp.

---

## B. Platform / Device

Run on **both** iOS and Android physical devices.

- [ ] App launches from a cold start. **Pass:** no crash; first screen renders.
- [ ] Tab navigation (Home, Search, Upload, Profile). **Pass:** all tabs reachable on iOS and Android.
- [ ] Portrait orientation + common screen sizes (small phone + large phone). **Pass:** no clipped/overlapping content.
- [ ] Network-loss handling (toggle airplane mode mid-action). **Pass:** friendly error, no crash, recovers on reconnect.
- [ ] API/Supabase failure path. **Pass:** user-facing error message, not a raw stack or silent hang.
- [ ] Loading states on every data-loading view. **Pass:** skeleton/spinner shown, no frozen blank screen.
- [ ] Empty states on every list/feed screen. **Pass:** intentional empty UI, not blank.
- [ ] Permissions prompts (camera, photo library) request and handle denial. **Pass:** denial path doesn't crash.
- [ ] Backgrounding + resume. **Pass:** session and state preserved.
- [ ] No crash bugs across the full functional walk. **Pass:** zero crashes (M6 gate requirement).

---

## C. Store Compliance (pre-submission)

Required before App Store / Google Play submission ([FOR-55](/FOR/issues/FOR-55)). **Zero known blockers** in this section is a hard gate.

- [ ] App icon present in all required sizes. **Pass:** no missing-asset warnings in the build.
- [ ] App name, subtitle, description, keywords prepared. **Pass:** listing copy finalized.
- [ ] Screenshots for required device sizes (both stores). **Pass:** full required set generated.
- [ ] **Privacy policy** URL live and reachable. **Pass:** loads publicly.
- [ ] **Terms of service** URL live and reachable. **Pass:** loads publicly.
- [ ] Data-collection / privacy disclosures (Apple Privacy Nutrition Label + Play Data Safety). **Pass:** accurately reflect what the app collects.
- [ ] Account deletion path available (Apple requirement for accounts). **Pass:** user can delete their account in-app.
- [ ] Third-party/affiliate disclosure (Instacart) where required. **Pass:** disclosed in listing/UX.
- [ ] No private APIs / disallowed SDKs; release build signed. **Pass:** build passes store validation.
- [ ] Age rating / content rating questionnaire completed. **Pass:** rating set on both stores.
- [ ] Test/demo credentials provided for reviewers. **Pass:** working review account supplied.
- [ ] Crash-free on the reviewer happy path. **Pass:** no crash in core flow on a clean install.

---

## Sign-off

A release is cleared when the COO records: **build ID · device + OS versions tested · date · every applicable item PASS · zero open FAIL.** File the result on the relevant milestone gate in the [Gate Tracker](./gate-tracker.md) and on [FOR-49](/FOR/issues/FOR-49) (on-device QA) or [FOR-55](/FOR/issues/FOR-55) (store submission).
