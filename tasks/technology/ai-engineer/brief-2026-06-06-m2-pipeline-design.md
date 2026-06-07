# TASK BRIEF — AI Engineer — 2026-06-06

**FROM:** Technology Manager  
**MILESTONE:** M2 prep — design phase (implementation in M2, July 20 sprint)  
**FEATURE:** Photo Snap Pipeline + Nutrition Analysis Pipeline — prompt design, testing, cost validation  
**START CONDITION:** Start immediately — you can call OpenAI API directly without Expo running. No UI integration yet.  
**DEADLINE:** 2026-06-20 — must be complete one week before M2 begins

---

## What to Build

You are in design-and-test phase. No UI wiring. Your job is to write the pipeline code, test it against real inputs, measure real costs, and confirm it works before M2 engineers try to integrate it.

---

## Pipeline 1 — Photo Snap (`forkd/src/services/ai/photoSnap.js`)

### What it does
Takes a base64-encoded image and returns structured recipe data.

### Required output schema (exact — never deviate)
```json
{
  "title": "string",
  "description": "string or null",
  "ingredients": [
    { "quantity": "string", "unit": "string", "name": "string" }
  ],
  "steps": ["string"],
  "cuisine_tags": ["string"],
  "dietary_tags": ["string"],
  "content_type": "recipe | ferment | mead | spirit | cider | homebrew | other"
}
```

### Test inputs required (use real images)
1. A printed recipe card (food)
2. A handwritten recipe
3. A photo of a finished dish (no text — tests graceful handling)
4. A homebrew/mead recipe page
5. A fermentation guide excerpt

### Failure case
If GPT-4o returns malformed JSON or cannot parse the image:
- Return `null`
- Log nothing to console (no user content in logs)
- The caller displays: "We couldn't read that photo — try manual entry or a clearer shot."

### Cost target
Under $0.02 per call. Measure actual tokens used on your 5 test cases and report average cost.

---

## Pipeline 2 — Nutrition Analysis (`forkd/src/services/ai/nutrition.js`)

### What it does
Takes an ingredient list and returns a nutrition label.

### Required output schema (exact — never deviate)
```json
{
  "calories": 0,
  "protein_g": 0,
  "carbs_g": 0,
  "fat_g": 0,
  "fiber_g": 0,
  "sugar_g": 0,
  "sodium_mg": 0,
  "servings": 1,
  "confidence": "high | medium | low",
  "note": "string or null"
}
```

### Fallback chain (implement all three levels)
1. OpenAI GPT-4o-mini with explicit nutrition prompt → structured JSON
2. If OpenAI fails → USDA FoodData Central API lookup for each ingredient individually
3. If USDA partial → return partial data with `confidence: "low"` and a note

### Test cases required
1. Simple recipe (pasta with 5 common ingredients)
2. Complex recipe (20+ ingredients, mixed units)
3. Unusual ingredients (mead: honey, water, yeast, fruit — test USDA fallback)

### Cost target
Under $0.005 per call. Measure actual tokens on your 3 test cases.

---

## Acceptance Criteria

**Photo Snap:**
- [ ] System prompt reliably extracts all 7 fields from all 5 test images
- [ ] Output validated against schema before returning (reject malformed responses)
- [ ] Failure case returns null (tested with a blank/irrelevant image)
- [ ] Average cost under $0.02 — measured, not estimated
- [ ] No API key hardcoded
- [ ] No user image content in any log

**Nutrition:**
- [ ] All 3 test cases return valid schema output
- [ ] Fallback chain tested — confirmed USDA path activates when OpenAI deliberately fails
- [ ] Confidence levels correct: high for known ingredients, low for gaps
- [ ] Average cost under $0.005 — measured
- [ ] No API key hardcoded

---

## Self-Check Before Submitting

- [ ] Both pipeline files exist in `forkd/src/services/ai/`
- [ ] Tested against real inputs (not mocked)
- [ ] All failures return null or partial — no thrown exceptions
- [ ] Prompts use a system message with explicit JSON schema instruction
- [ ] Actual cost data recorded

---

## Deliverable

Write to `tasks/technology/ai-engineer/deliverable-2026-06-06-m2-pipeline-design.md`

Include:
1. Photo snap system prompt (full text — CTO will review this)
2. Photo snap test results: input description → output JSON (5 cases)
3. Photo snap cost: average per call, highest per call
4. Nutrition system prompt (full text)
5. Nutrition test results (3 cases)
6. Nutrition fallback: how you triggered and confirmed the USDA path
7. Nutrition cost: average per call
8. Any edge cases flagged for M2 implementation
