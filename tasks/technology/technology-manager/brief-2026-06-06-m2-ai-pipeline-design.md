# CTO TASK BRIEF — Technology Manager — 2026-06-06

MILESTONE: M2 — Recipe Upload MVP (design phase — implementation in M2 sprint)
PRIORITY: P2 — High. AI Engineer can work independently of M1. Pipeline design must be complete before M2 begins July 20, 2026. Every day this is delayed is a day closer to a blocked M2 sprint.
TASK: Brief AI Engineer to design, test, and validate both AI pipelines — photo snap and nutrition analysis — including prompt engineering, output schemas, cost validation, and fallback logic.
DUE: June 20, 2026 — one week before M2 begins. No exceptions.

---

## Issue This Brief to AI Engineer

```
TASK BRIEF — AI Engineer — 2026-06-06
MILESTONE: M2 prep (design phase — implementation in M2 sprint)
PRIORITY: P2 — High
FEATURE: Photo Snap Pipeline + Nutrition Analysis Pipeline
DUE: June 20, 2026

You do not need Expo running. You do not need M1 to be complete.
Call OpenAI API directly. Start now.

---

PIPELINE 1 — PHOTO SNAP (forkd/src/services/ai/photoSnap.js)

Write a GPT-4o Vision system prompt that reliably extracts structured
recipe data from a photo.

Required output schema (JSON):
{
  title: string,
  description: string,
  ingredients: [{ quantity: string, unit: string, name: string }],
  steps: [{ description: string }],
  cuisine_tags: string[],
  dietary_tags: string[],
  content_type: "recipe" | "ferment" | "mead" | "spirit" | "cider" | "homebrew" | "other"
}

Test against 5 images covering:
1. Printed recipe card
2. Handwritten recipe
3. Food photo only (no text — test graceful failure)
4. Homebrew / fermentation recipe
5. A recipe in a foreign language or unusual format

For each test: show the prompt sent, the raw response received, and whether
the output matched the schema.

Failure handling: malformed or missing JSON → return null with a user-facing
message. Never crash. Never return partial data as if it were complete.

Cost target: under $0.02 per call. Measure and log actual token usage and
cost for each of the 5 test calls. If any call exceeds $0.02, flag immediately
— do not submit.

---

PIPELINE 2 — NUTRITION ANALYSIS (forkd/src/services/ai/nutrition.js)

Write a GPT-4o-mini system prompt that converts an ingredients list into a
nutrition schema.

Required output schema (JSON):
{
  calories: number,
  protein_g: number,
  carbs_g: number,
  fat_g: number,
  fiber_g: number,
  sugar_g: number,
  sodium_mg: number,
  servings: number,
  confidence: "high" | "medium" | "low",
  note: string | null
}

Confidence levels:
- high: all ingredients recognized, full data available
- medium: most ingredients recognized, minor gaps estimated
- low: significant gaps, USDA fallback used, or unusual ingredients

Fallback chain (must be implemented and tested — not just described):
1. Call GPT-4o-mini with full ingredients list
2. If OpenAI fails or returns invalid JSON → fall back to USDA FoodData Central
   API lookup for individual ingredients
3. If USDA returns partial data → return partial result with confidence: "low"
4. Never return nothing — always return the best available data with
   appropriate confidence level

Test against 3 ingredient lists:
1. Simple recipe (5–8 common ingredients)
2. Complex recipe (15+ ingredients including mixed units)
3. Unusual ingredients (homebrewing hops, specialty malts, fermentation agents)

For each test: show ingredients sent, response received, confidence level,
and whether fallback was triggered.

Cost target: under $0.005 per call. Measure actual token usage and cost.
If any call exceeds $0.005, flag before submitting.

---

WHAT TO BUILD

Two files only — design phase, not yet wired to any UI:
- forkd/src/services/ai/photoSnap.js
  Exports: analyzePhoto(base64Image) → { recipe, error }
- forkd/src/services/ai/nutrition.js
  Exports: analyzeNutrition(ingredients) → { nutrition, error }

Both must:
- Read API key from process.env.EXPO_PUBLIC_OPENAI_KEY — never hardcoded
- Have try/catch on all async operations
- Return typed response objects { data, error } — never throw
- Log nothing to console (no user content, no API responses)

FILES TO TOUCH:
- forkd/src/services/ai/photoSnap.js (create)
- forkd/src/services/ai/nutrition.js (create)

FILES NOT TO TOUCH:
- Any screen or component file → Frontend Engineer
- Supabase schema or services → Backend Engineer
- app.json, .env → DevOps Engineer

---

ACCEPTANCE CRITERIA

Photo Snap:
- [ ] System prompt documented in deliverable (readable by CTO)
- [ ] 5 test cases run — inputs and outputs shown for each
- [ ] Failure case handled: malformed JSON → null + user message, no crash
- [ ] Actual cost per call measured — all 5 calls under $0.02
- [ ] analyzePhoto(base64Image) returns { recipe, error }

Nutrition:
- [ ] System prompt documented in deliverable (readable by CTO)
- [ ] 3 test cases run — inputs, outputs, confidence levels shown
- [ ] Fallback chain tested — not just described. Show a test where OpenAI
  fails and USDA is actually called
- [ ] Actual cost per call measured — all 3 calls under $0.005
- [ ] analyzeNutrition(ingredients) returns { nutrition, error }

Both pipelines:
- [ ] No API key hardcoded — reads from environment variable
- [ ] No user content logged to console
- [ ] Failure cases return { recipe: null, error } or { nutrition: null, error }
  — never crash, never throw unhandled

---

DELIVERABLE

Write to tasks/technology/ai-engineer/deliverable-2026-06-06-m2-pipeline-design.md:
- Both system prompts (full text)
- All test cases: input shown, output shown, pass/fail per criterion
- Actual token usage and cost per call for all 8 tests
- Fallback chain test: show the USDA call was actually made
- Explicit pass/fail per acceptance criterion
```

---

## Your TM Review Checklist

- [ ] Both prompts in deliverable — full text readable, not summarized
- [ ] 5 photo snap test cases documented — all 5 images tested including failure case
- [ ] 3 nutrition test cases documented including unusual ingredients
- [ ] Actual cost per call measured — under target for every call
- [ ] Fallback chain tested — USDA call confirmed, not just described
- [ ] No API key hardcoded — check photoSnap.js and nutrition.js source
- [ ] No user content logged to console — check both files
- [ ] Failure cases return null gracefully — check both error paths
- [ ] Both functions return typed { data, error } response objects

## Sign-Off Format

When complete, write sign-off to `tasks/technology/cto/signoff-2026-06-06-m2-ai-pipeline-design.md`
