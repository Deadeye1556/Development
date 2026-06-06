# Forkd — Development Milestones

**Launch target:** November 16, 2026 | **Fallback:** January 1, 2027
**Weekly capacity:** 5–6 hours | **Total estimated:** 61–121 hours | **Available:** 156 hours before launch

Do not advance to the next milestone until every gate checkbox is checked.

---

## Milestone 0 — Environment Setup
**Target:** June 1, 2026 | **Est:** 5–9 hrs | **Owner:** DevOps Engineer

### Status
- [x] Cursor Pro — subscribed
- [x] OpenAI — account created, key saved
- [x] Supabase — project "Recipe-App" created, RLS enabled, auto-expose tables disabled, keys saved
- [x] Instacart Developer — application submitted (1–2 week approval window)
- [x] Expo Go — installed on phone
- [x] Node.js LTS — installed
- [x] GitHub — Forkd repo created (private)
- [x] Expo CLI — installed (`npm install -g expo-cli`)
- [ ] **App shell running on phone via Expo Go** ← BLOCKING

### Blocking Issue
Windows Firewall blocking port 8081. DevOps Engineer owns this fix.
```powershell
New-NetFirewallRule -DisplayName "Expo Dev Server" -Direction Inbound -Protocol TCP -LocalPort 8081 -Action Allow
```
Fallback: press `S` in Expo terminal → select Tunnel mode.

### Milestone Gate ✅ (all required)
- [ ] App shell loads on phone via Expo Go
- [x] Supabase dashboard accessible, keys saved
- [x] All API keys stored in `.env` file (not committed)
- [x] GitHub repo has initial commit

---

## Milestone 1 — Authentication & User Profiles
**Target:** June 22, 2026 | **Est:** 7–14 hrs | **Owners:** Backend Engineer + Frontend Engineer

### Action Items
- [ ] Implement email/password sign-up and login (Supabase Auth)
- [ ] Implement Google OAuth sign-in
- [ ] Create `profiles` table with RLS
- [ ] Create `follows` table with RLS
- [ ] Build user profile screen (avatar, display name, bio, follower/following count)
- [ ] Build follow/unfollow system
- [ ] Build settings screen (edit profile, change password)
- [ ] Build tab navigation (Home, Search, Upload, Profile)

### Prompt for Cursor/Claude Code
> "Using React Native with Expo and Supabase, build a complete authentication flow including email/password signup, Google OAuth, user profile creation with avatar/bio/follower count display, and a follow/unfollow system. Use Supabase Auth. Create the `profiles` and `follows` tables with RLS policies. Add a 4-tab navigator: Home, Search, Upload, Profile."

### Milestone Gate ✅ (all required)
- [ ] New user can sign up, log in, and log out
- [ ] Profile screen shows avatar, name, and bio
- [ ] Two test accounts can follow each other
- [ ] Tab navigation works on iOS and Android
- [ ] All Supabase tables have RLS enabled

---

## Milestone 2 — Recipe Upload MVP ⭐
**Target:** July 20, 2026 | **Est:** 13–26 hrs | **Owners:** Frontend + Backend + AI Engineer
**Most critical milestone — the core product. Do not rush.**

### Action Items
- [ ] Build manual text entry upload form (title, ingredients, steps)
- [ ] Ingredient input: quantity + unit + name fields per ingredient
- [ ] **Photo snap pipeline** — GPT-4o vision → auto-fill form from photo (AI Engineer)
- [ ] Connect nutrition analysis pipeline (OpenAI → USDA fallback)
- [ ] Display nutrition panel (calories, protein, fat, carbs per serving)
- [ ] Serving size adjuster — nutrition panel updates dynamically
- [ ] Step photo/video upload (Expo ImagePicker)
- [ ] Cover photo/video upload
- [ ] Category/tag selector: cuisine type, dietary restrictions, content type (recipe/ferment/mead/spirit/cider/homebrew)
- [ ] Recipe draft save
- [ ] Recipe publish flow with confirmation screen
- [ ] **Fiverr task:** URL import scraper ($150–$300)

### Prompt for Cursor/Claude Code
> "Build a React Native recipe upload screen with: (1) ingredient list input with quantity/unit/name fields, (2) GPT-4o vision integration that takes a photo and returns a structured recipe JSON to auto-fill the form, (3) nutrition analysis from the ingredient list using OpenAI with USDA FoodData Central as fallback, (4) per-step photo and video upload using Expo ImagePicker, (5) content type tags (recipe, ferment, mead, spirit, cider, homebrew), (6) publish to Supabase. Show a nutrition facts panel that updates as ingredients are added."

### Milestone Gate ✅ (all required)
- [ ] User can upload a recipe via manual entry
- [ ] Photo snap correctly parses a recipe card and fills the form
- [ ] Nutrition label generates within 5 seconds of completing ingredient list
- [ ] Nutrition panel shows calories, protein, fat, carbs per serving
- [ ] Serving size slider updates the nutrition panel
- [ ] Recipe saves to Supabase and is retrievable
- [ ] Step photos/videos attach to their respective steps
- [ ] Content type tags save correctly

---

## Milestone 3 — Recipe Catalog
**Target:** August 10, 2026 | **Est:** 8–16 hrs | **Owners:** Frontend + Backend Engineer

### Action Items
- [ ] Build recipe card component (cover photo/video, title, author, tags, calorie count)
- [ ] Build recipe detail page (full ingredients, steps with media, nutrition panel, creator profile link)
- [ ] Full-text search (Supabase `pg_trgm` extension)
- [ ] Category filter chips (cuisine, dietary restriction, content type, meal type)
- [ ] Sort options: Trending, Newest, Most Saved
- [ ] Save/bookmark recipe to personal collection
- [ ] Recipe rating (1–5 stars)
- [ ] Comments on recipes

### Milestone Gate ✅ (all required)
- [ ] Search returns relevant results within 1 second
- [ ] Category filters correctly narrow results
- [ ] Recipe detail page shows all content including step media
- [ ] Save and rating functions work and persist
- [ ] Comments post and display correctly

---

## Milestone 4 — Home Feed
**Target:** August 31, 2026 | **Est:** 8–16 hrs | **Owners:** Frontend + Backend Engineer

### Action Items
- [ ] Chronological feed from followed creators
- [ ] Discover tab: trending recipes from all users
- [ ] Feed card component (cover media, title, creator avatar, macro summary, save/react buttons)
- [ ] Save, like, comment from feed card
- [ ] Notification badge for new content from followed creators
- [ ] Empty state with suggested creators to follow
- [ ] Seed 5–10 recipes from Henry's own content

### Milestone Gate ✅ (all required)
- [ ] Following 3 test accounts populates home feed with their recipes
- [ ] Discover tab shows all recipes sorted by saves
- [ ] Saving a recipe from feed adds it to personal collection
- [ ] Empty state shows onboarding prompt, not a blank screen

---

## Milestone 5 — Grocery Cart Integration 💰
**Target:** September 28, 2026 | **Est:** 8–18 hrs | **Owners:** Backend + Frontend + Growth Engineer
**Revenue activates here. Instacart affiliate must be approved before this milestone begins.**

### Action Items
- [ ] **Fiverr task:** Instacart Developer API integration — "Add to Cart" button ($200–$500)
- [ ] Shopping list screen: aggregated ingredients across saved recipes
- [ ] Ingredient deduplication ("2 cups flour" + "1 cup flour" = "3 cups flour")
- [ ] Pantry check: checkboxes for items already on hand
- [ ] "Add remaining to Instacart" — sends unchecked items to cart
- [ ] Cart confirmation screen with items sent + estimated total
- [ ] **Cart event logging** — every cart event logs to `cart_events` table with recipe_id, creator_id, user_id, retailer, timestamp

### Prompt for Cursor/Claude Code
> "Integrate the Instacart Developer Platform API into a React Native app. Build a shopping list screen that aggregates ingredients from multiple saved recipes, deduplicates quantities, allows users to check off items they already have, and sends the remaining items to an Instacart cart via the API. Log every cart completion to a Supabase `cart_events` table with recipe_id, creator_id, user_id, retailer, order_value, and timestamp for creator attribution tracking."

### Milestone Gate ✅ (all required)
- [ ] "Add to Cart" opens Instacart with ingredients pre-loaded
- [ ] Shopping list aggregates and deduplicates across 3 test recipes
- [ ] Pantry checkboxes persist between sessions
- [ ] Instacart affiliate tracking confirmed in Instacart developer dashboard
- [ ] Cart events logging to Supabase with full attribution data

---

## Milestone 6 — Polish, Beta & Launch Prep
**Target:** October 26, 2026 | **Est:** 9–17 hrs | **All roles active**

### Action Items
- [ ] Full UI pass: consistent spacing, fonts, colors
- [ ] Dark mode support
- [ ] Loading states and skeleton screens on every data-loading view
- [ ] Empty states on every screen
- [ ] Error handling: network errors, API failures show friendly messages
- [ ] Onboarding flow (3-screen walkthrough for new users)
- [ ] App icon design
- [ ] **Fiverr task:** App Store + Google Play submission ($50–$150)
- [ ] Beta test with 10–20 users (friends, family, homebrew/BBQ community)
- [ ] Fix top 5 bugs from beta
- [ ] Privacy policy + terms of service
- [ ] PostHog analytics integration

### Milestone Gate ✅ (all required)
- [ ] Zero crash bugs in beta testing
- [ ] All screens have loading and empty states
- [ ] App Store and Play Store listings created with screenshots
- [ ] At least 5 real users have uploaded at least 1 recipe each
- [ ] At least 1 Instacart cart add completed by a beta user (affiliate tracking confirmed)

---

## Launch Week — November 16, 2026 🚀

- [ ] App Store and Google Play listings published
- [ ] Post on r/mead, r/homebrewing, r/Cooking, r/BBQ, r/MealPrepSunday
- [ ] Post in Texas-specific food communities
- [ ] DM 10 food/craft beverage creators with early access
- [ ] Monitor Supabase logs for errors in first 24 hours
- [ ] Respond to every early user comment and review

---

## Fiverr Budget Summary

| Task | Milestone | Budget |
|---|---|---|
| URL recipe scraper | M2 | $150–$300 |
| Instacart API integration | M5 | $200–$500 |
| App Store / Play Store submission | M6 | $50–$150 |
| Stripe Connect payout system | Phase 2 | $300–$600 |
| **Total** | | **$700–$1,550** |
