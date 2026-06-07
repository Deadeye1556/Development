# TASK BRIEF — DevOps Engineer — 2026-06-06

MILESTONE: M2 prep
FEATURE: USDA FoodData Central API key registration
PRIORITY: Medium — DEMO_KEY works for development (rate limited). Real key required before M2 launch.

## Context

AI Engineer's nutrition pipeline uses USDA FoodData Central as the fallback when OpenAI is unavailable. The AI Engineer role.md incorrectly stated USDA is "free, no key required." It is not — USDA returns `403 API_KEY_MISSING` without a key.

Current code uses `process.env.EXPO_PUBLIC_USDA_KEY ?? 'DEMO_KEY'` — degrades gracefully in dev (DEMO_KEY is rate-limited to 10 req/min). A real key is required for production.

## ACCEPTANCE CRITERIA

- [ ] USDA FoodData Central API key registered at https://api.nal.usda.gov/
- [ ] `EXPO_PUBLIC_USDA_KEY` added to `forkd/.env` with the real key value
- [ ] `EXPO_PUBLIC_USDA_KEY=` added to `forkd/.env.example` (key name only, no value)
- [ ] `npx expo start` runs clean after the .env.example change
- [ ] No key value committed to any tracked file

## FILES TO TOUCH

- `forkd/.env` — add `EXPO_PUBLIC_USDA_KEY=<real_key>`
- `forkd/.env.example` — add `EXPO_PUBLIC_USDA_KEY=` (empty value)

## FILES NOT TO TOUCH

- Any file in `forkd/src/` → AI Engineer domain
- `forkd/app.json` → already correct

## DELIVERABLE

Write to `tasks/technology/devops-engineer/deliverable-2026-06-06-m2-usda-key.md`:
- Confirmation key registered and added to `.env`
- Confirmation `.env.example` updated
- Confirmation `.env` not staged

## DEADLINE

Before M2 launch — DEMO_KEY acceptable for development and AI Engineer testing.

---
NEXT ACTION
Open:  Technology Manager
Say:   "You are the Technology Manager. Check your inbox."
Why:   DevOps Engineer deliverable for USDA key is ready for your review.
---
