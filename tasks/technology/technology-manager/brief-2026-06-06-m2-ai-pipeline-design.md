# CTO TASK BRIEF — Technology Manager — 2026-06-06

**FOR:** AI Engineer  
**MILESTONE:** M2 — Recipe Upload MVP (prepare now, implement in M2)  
**TASK:** Design and test the photo snap and nutrition analysis pipelines — prompt engineering, schemas, fallback logic, cost validation  
**START CONDITION:** Issue immediately — AI Engineer can call OpenAI API directly without Expo running.  
**DELIVERABLE DUE:** Before M2 begins (before July 20, 2026). Start now to avoid M2 delay.

---

## Issue This Brief to AI Engineer

```
TASK BRIEF — AI Engineer — 2026-06-06
MILESTONE: M2 prep (design phase — implementation in M2)
FEATURE: Photo Snap Pipeline + Nutrition Analysis Pipeline

ACCEPTANCE CRITERIA — PHOTO SNAP:
- [ ] System prompt written for GPT-4o Vision that reliably extracts:
      title, description, ingredients[], steps[], cuisine_tags[],
      dietary_tags[], content_type from a recipe image
- [ ] Output schema defined and validated against 5 test images
  (use: a printed recipe card, a handwritten recipe, a food photo,
   a homebrew recipe, a fermentation guide)
- [ ] Failure case handled: malformed JSON → return null with user message
- [ ] Cost per call measured from actual API calls (target: under $0.02)
- [ ] Prompt documented in deliverable so it can be reviewed before M2

ACCEPTANCE CRITERIA — NUTRITION PIPELINE:
- [ ] System prompt written for GPT-4o-mini that converts ingredients[] to
      nutrition schema: {calories, protein_g, carbs_g, fat_g, fiber_g,
      sugar_g, sodium_mg, servings, confidence, note}
- [ ] Fallback chain tested:
      OpenAI fails → USDA FoodData Central lookup → partial with confidence:'low'
- [ ] Cost per call measured (target: under $0.005)
- [ ] Confidence levels: high (all ingredients recognized), medium (most),
      low (significant gaps or fallback used)
- [ ] 3 test cases documented: simple recipe, complex recipe, unusual ingredients

FILES TO TOUCH:
- forkd/src/services/ai/photoSnap.js (create — design phase, not yet wired to UI)
- forkd/src/services/ai/nutrition.js (create — design phase)
- deliverable: tasks/technology/ai-engineer/
  deliverable-2026-06-06-m2-pipeline-design.md

FILES NOT TO TOUCH:
- Any screen or component file → Frontend Engineer
- Supabase schema → Backend Engineer
- app.json, .env → DevOps Engineer

COST TRACKING REQUIRED:
Run at least 5 photo snap calls and 5 nutrition calls.
Log actual token usage and cost per call in the deliverable.
If any call exceeds the cost target, flag immediately — do not submit.

DEADLINE: 2026-06-20 (one week before M2 begins)
```

---

## Your TM Review Checklist

- [ ] Both prompts are in the deliverable — readable by CTO
- [ ] 5 photo snap test cases documented (inputs and outputs shown)
- [ ] 3 nutrition test cases documented
- [ ] Actual cost per call measured and within target
- [ ] Fallback chain tested — not just described
- [ ] No API key hardcoded — uses environment variable
- [ ] No user content logged to console
- [ ] Failure cases return null or partial, never crash

## Sign-Off Format

When complete, write sign-off to `tasks/technology/cto/signoff-2026-06-06-m2-ai-pipeline-design.md`
