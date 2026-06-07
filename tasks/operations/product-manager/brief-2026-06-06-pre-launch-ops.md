# TASK BRIEF — Product Manager — 2026-06-06

**MILESTONE:** Cross-milestone — M1, M2, M5, M6 (parallel to technology build)
**PRIORITY:** P3 — Medium. Runs parallel to engineering; no immediate blocker, but Track 2 must complete before M1 UI implementation begins (due 2026-06-13).
**TASK:** Commission all four operations specialists simultaneously — Market Researcher, Product Researcher, Growth Engineer, and Advertising Specialist — using the briefs below.
**DUE:** All briefs issued to specialists by 2026-06-07. Deliverables due per-track schedule below.

---

## Strategic Context

Technology is building M0 → M1 → M2 in sequence. Operations must run ahead of technology so that when engineers reach a decision point, the research is already done. **Track 2 is the most time-sensitive** — Product Researcher output must be available before M1 UI implementation begins. All other tracks can run in parallel.

The four tracks also interlock with each other: attribution spec (Track 3) must confirm the M5 schema is complete before the Backend Engineer locks the cart_events table. App Store prep (Track 4) requires competitive context from Track 1 to finalize positioning.

---

## Track 1 — Market Researcher: Competitive Landscape Analysis

**MILESTONE:** M2 — Recipe Upload MVP (product decisions); M6 — Launch Prep (positioning)
**PRIORITY:** P3 — Medium. Feeds M2 product decisions and launch positioning; no M1 dependency.
**OBJECTIVE:** Produce a competitive landscape report answering: *Where is Forkd's differentiation strongest and where are competitors weakest?*
**DELIVERABLE FORMAT:** Standard Market Research Report (per Market Researcher role.md)
**ACCEPTANCE CRITERIA:**
- [ ] Covers top 5 recipe/social food apps: Yummly, Tasty, Whisk, Paprika, Mela — features, monetization, and weaknesses documented
- [ ] Covers craft beverage platforms: BrewFather, Meadist, and Reddit-native tools — community served and product gaps identified
- [ ] Compares Instacart affiliate program rates vs. other grocery affiliate programs (rates, terms, exclusivity)
- [ ] Documents what competitor recipe platforms pay creators vs. Forkd's model
- [ ] Each major finding states a confidence level (Verified / Estimated / Assumption)
- [ ] Headline finding stated first — differentiation gap identified clearly
- [ ] No advocacy disguised as research — findings neutral, recommendations labeled

**DATA REQUIRED:** Public product pages, App Store listings, press releases, creator monetization disclosures, affiliate program terms. No paywalled data.
**DEADLINE:** 2026-06-16

---

## Track 2 — Product Researcher: Auth/Onboarding UX Patterns

**MILESTONE:** M1 — Authentication & User Profiles; M6 — Onboarding Flow
**PRIORITY:** P2 — High. Must complete before M1 UI implementation begins. This is the highest-priority track.
**OBJECTIVE:** Produce a product research report answering: *What is the fastest path from app download to first value moment for Forkd?*
**DELIVERABLE FORMAT:** Standard Product Research Report (per Product Researcher role.md) — must include behavioral evidence
**ACCEPTANCE CRITERIA:**
- [ ] Documents how best-in-class social apps handle first-time auth: TikTok, Pinterest, Instagram — specific flows described, not summarized
- [ ] Identifies what users do in first 3 minutes and what causes drop-off (behavioral evidence, not stated preferences)
- [ ] Documents how recipe apps handle the "no content" empty state for new users
- [ ] Defines minimum viable onboarding to reach first value moment (upload or save first recipe) — specific recommendation with rationale
- [ ] Behavioral vs. stated preference explicitly distinguished throughout
- [ ] Recommendation tied to a specific observed pain or behavior, not opinion

**DATA REQUIRED:** App store reviews, UX teardowns, published onboarding research, product case studies. No invented personas.
**DEADLINE:** 2026-06-13 — hard deadline, M1 blocked without this

---

## Track 3 — Growth Engineer: Attribution Tracking Spec

**MILESTONE:** M5 — Grocery Cart Integration (schema locks early)
**PRIORITY:** P3 — Medium. Schema must be confirmed before M5 backend work begins; no M1 or M2 dependency.
**OBJECTIVE:** Produce an attribution spec answering: *Is the cart_events schema complete enough to support all creator payout calculations?*
**DELIVERABLE FORMAT:** Spec document with worked example and schema gap analysis
**ACCEPTANCE CRITERIA:**
- [ ] Audits `/docs/architecture.md` cart_events table — every field listed, purpose documented
- [ ] Audits `/docs/creator-program.md` payout formula — every input variable identified
- [ ] Confirms (or denies) that every field needed for payout calculation exists in the schema
- [ ] Provides complete payout formula as a worked example using real numbers (not variables)
- [ ] Defines monthly requalification check logic for Elite, Golden Goat, and LEGENDARY tiers
- [ ] Flags any schema gap that would prevent payout from being reproducible from raw cart_events data alone
- [ ] Attribution logic is traceable to a specific data event per field (not narrative)
- [ ] Creator tier calculations documented with formula, not prose

**DATA REQUIRED:** `/docs/architecture.md`, `/docs/creator-program.md`. No external sources needed — this is an internal audit.
**DEADLINE:** 2026-06-20

---

## Track 4 — Advertising Specialist: App Store Listing Prep

**MILESTONE:** M6 — Polish, Beta & Launch Prep
**PRIORITY:** P3 — Medium. No M6 dependency yet — early draft only, allows iteration time.
**OBJECTIVE:** Produce draft App Store listing copy answering: *What keywords, title framing, and positioning will perform best in the Food & Drink category?*
**DELIVERABLE FORMAT:** Draft copy document with keyword rationale (per Advertising Specialist role.md)
**ACCEPTANCE CRITERIA:**
- [ ] Documents top-ranked Food & Drink apps on App Store — keywords in titles and subtitles identified
- [ ] Delivers 3 title options and 3 subtitle options for Forkd — each with positioning rationale
- [ ] Delivers keyword list within App Store's 100-character limit — keywords ranked by rationale
- [ ] Delivers App Store description draft — first 3 lines visible without "More" tap, benefit-focused not feature-focused
- [ ] Screenshot strategy confirmed vs. draft in role.md — any recommended updates noted with rationale
- [ ] All copy is benefit-focused (what the user gains), not feature-focused (what the app does)
- [ ] Success metric defined: keyword ranking target or conversion rate benchmark

**DATA REQUIRED:** App Store public listings, keyword research tools (free tier acceptable), category rankings. No paid ASO tools required.
**DEADLINE:** 2026-07-15

---

## COO Escalation Triggers

Escalate immediately to COO (do not hold for scheduled review) if:
- Market research reveals a competitor with cart-level creator attribution tracking Forkd is unaware of
- Product research reveals the auth flow requires a design decision beyond M1 scope
- Attribution spec reveals a schema gap requiring Backend Engineer changes in M1 (not M5)
- Any finding from any track conflicts with a locked business decision

---

## Your Product Manager Deliverable

When all four specialists have been briefed, write to `tasks/operations/product-manager/deliverable-2026-06-06-pre-launch-ops.md`:

```
PM COMMISSION REPORT — [Date]
TRACK 1 — Market Research: [briefed / pending / issue]
TRACK 2 — Product Research: [briefed / pending / issue]
TRACK 3 — Growth Engineering: [briefed / pending / issue]
TRACK 4 — Advertising: [briefed / pending / issue]
ESCALATIONS: [list any / none]
```

As each specialist delivers, review against acceptance criteria above and pass or return. Do not batch — review each as it arrives.
