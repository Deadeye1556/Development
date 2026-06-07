# COO TASK BRIEF — Product Manager — 2026-06-06

**MILESTONE:** Cross-milestone operations  
**TASK:** Commission and oversee four parallel research and strategy tracks  
**PRIORITY:** All four specialists start today

---

## Issue These Briefs Immediately

Issue one brief to each specialist. Deadlines are firm — technology depends on some of these outputs.

---

## Brief 1 — Market Researcher

```
TASK BRIEF — Market Researcher — 2026-06-06
MILESTONE: Cross-milestone (feeds M2 product decisions + launch)
OBJECTIVE: Competitive landscape and market positioning research
DELIVERABLE FORMAT: Market Research Report (standard format from role.md)
ACCEPTANCE CRITERIA:
- [ ] Top 5 recipe/food social apps analyzed: Yummly, Tasty, Whisk, Paprika, Mela
      For each: features, creator monetization model, weaknesses, user reviews summary
- [ ] Craft beverage platforms identified: BrewFather, Meadist, any Reddit tools
      Who currently serves the homebrew/mead community online?
- [ ] Affiliate rate comparison: Instacart vs. Amazon Fresh vs. Walmart Grocery
      What rates are publicly available? What requires negotiation?
- [ ] Creator monetization benchmarks: what do other recipe platforms pay creators?
      Compare to Forkd's tier structure
- [ ] Headline finding: where is Forkd's differentiation clearest?
- [ ] All claims labeled: Verified / Estimated / Assumption
- [ ] Competitive claims flagged if source is older than 12 months
DATA REQUIRED: Public sources only — App Store reviews, company websites,
  affiliate program documentation, Reddit communities, press coverage
DEADLINE: 2026-06-16
```

---

## Brief 2 — Product Researcher

```
TASK BRIEF — Product Researcher — 2026-06-06
MILESTONE: M1 feed (auth/onboarding — needed before UI implementation)
OBJECTIVE: UX patterns research — auth flow and new user onboarding
DELIVERABLE FORMAT: Product Research Report (standard format from role.md)
ACCEPTANCE CRITERIA:
- [ ] Hypothesis tested: "New Forkd users need to see content before being
      asked to sign up, otherwise they drop off"
      (Supported / Partially Supported / Not Supported — with evidence)
- [ ] Auth UX patterns: how do TikTok, Pinterest, Instagram handle first-time auth?
      Social-login only? Browse-first? Forced gate? Document behavioral evidence.
- [ ] Empty state research: what do recipe apps show new users with no feed content?
      What prevents the "blank screen" drop-off?
- [ ] First 3 minutes: what is the fastest path to value in a recipe/social app?
      First action a new user should take: upload, browse, or follow?
- [ ] Recommendation: what Forkd's M1 auth and onboarding flow should be
      (explicit recommendation, not buried in findings)
- [ ] Confidence level stated
- [ ] Behavioral evidence distinguished from stated preference
DATA REQUIRED: Competitor app analysis (download and test), UX research literature,
  Reddit/community feedback on recipe app onboarding, App Store reviews
DEADLINE: 2026-06-13
```

---

## Brief 3 — Growth Engineer

```
TASK BRIEF — Growth Engineer — 2026-06-06
MILESTONE: M5 prep (attribution schema must be locked before M5 begins)
OBJECTIVE: Validate cart attribution schema and document full payout formula
DELIVERABLE FORMAT: Specification document with worked example
ACCEPTANCE CRITERIA:
- [ ] Audit cart_events schema in /docs/architecture.md against payout formula
      in /docs/creator-program.md — confirm every field needed for payout
      calculation exists in the schema
- [ ] Schema gap analysis: any missing field that prevents payout from being
      reproducible from raw cart_events data alone?
- [ ] Payout formula documented as a worked example:
      Pick a hypothetical Golden Goat creator. Show month-end calculation
      step by step. Input: raw cart_events rows. Output: payout dollar amount.
- [ ] Monthly requalification logic documented:
      Elite tier: what counts as "active" (≥1 recipe published in calendar month)?
      Golden Goat/LEGENDARY: how is top 0.1% calculated? What data is needed?
- [ ] Creator tier advancement: at what point in the month does tier upgrade
      (real-time or 1st of month batch)?
- [ ] Any formula ambiguity flagged as a question for CEO decision
- [ ] All calculations validated with worked examples showing the math
DATA REQUIRED: /docs/creator-program.md, /docs/architecture.md
DEADLINE: 2026-06-20
```

---

## Brief 4 — Advertising Specialist

```
TASK BRIEF — Advertising Specialist — 2026-06-06
MILESTONE: M6 prep (draft now — no implementation dependency)
OBJECTIVE: App Store listing strategy and first draft
DELIVERABLE FORMAT: Copy document with keyword rationale
ACCEPTANCE CRITERIA:
- [ ] Research: top 10 Food & Drink apps on App Store — what keywords appear
      in their title and subtitle fields? List them.
- [ ] Title options: 3 draft titles for Forkd (30 character limit)
      Each title should include at least one high-value keyword
- [ ] Subtitle options: 3 draft subtitles (30 character limit)
      Lead with the cart/shopping benefit — that is the differentiator
- [ ] Keyword field draft (100 character limit — comma-separated)
      Research which keywords have volume and low competition in Food & Drink
- [ ] App Store description: first paragraph draft (first 3 lines visible before
      "More" — this is the conversion copy)
- [ ] Screenshot strategy: confirm or update the 6-slot plan in role.md
      Any slots that should change based on research?
- [ ] All keyword recommendations have rationale (why this keyword, not another)
- [ ] No claims in copy that Forkd cannot deliver at launch
DATA REQUIRED: App Store competitor research (download apps, check listing copy),
  keyword research tools if available, /docs/creator-program.md for creator hook
DEADLINE: 2026-07-15 (early draft — no urgency, but start now)
```

---

## Your PM Review Checklist (apply when deliverables come in)

**All specialists:**
- [ ] Deliverable format matches what was requested
- [ ] Headline finding or recommendation stated first
- [ ] All claims sourced or labeled (Verified / Estimated / Assumption)
- [ ] No advocacy disguised as research

**Market Researcher:** confidence labels on all major findings; no stale data
**Product Researcher:** behavioral vs. stated preference distinguished; recommendation explicit
**Growth Engineer:** attribution logic traceable to specific cart_events field; formula reproducible
**Advertising Specialist:** all copy benefit-focused; success metric implicit in deliverable

## When Complete

Sign-off each deliverable to `tasks/operations/coo/` as:
`signoff-2026-06-[date]-[specialist].md`
