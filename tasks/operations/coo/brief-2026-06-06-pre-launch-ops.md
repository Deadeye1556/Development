# CEO TASK BRIEF — COO — 2026-06-06

**MILESTONE:** Cross-milestone — operations work runs parallel to technology build  
**TASK:** Commission and oversee the four operations tracks that feed technology decisions and launch preparation  
**PRIORITY:** P3 — Medium. Runs parallel to technology build; no dependency on M0 or Expo. Commission Product Manager immediately.  
**DUE:** Commission to Product Manager by 2026-06-07 (tomorrow)

---

## Context

Technology is building M0→M1→M2 in sequence. Operations must run ahead of technology — by the time engineers need a decision, the research must already be done.

Four tracks are active now:

| Track | Owner | Feeds | Due |
|---|---|---|---|
| Competitive landscape | Market Researcher | M2 product decisions, launch positioning | 2026-06-16 |
| Auth/onboarding UX patterns | Product Researcher | M1 implementation, M6 onboarding | 2026-06-13 |
| Attribution tracking spec | Growth Engineer | M5 Backend schema (locks early) | 2026-06-20 |
| App Store listing prep | Advertising Specialist | M6 submission | 2026-07-15 |

---

## Your Job

1. Review this brief and confirm alignment with business model
2. Commission Product Manager on all four tracks using the brief details below
3. Review deliverables from Product Manager before any go to CEO
4. Flag to CEO if any research finding conflicts with a locked business decision

---

## Brief Details for Product Manager to Issue

### Track 1 — Market Researcher: Competitive Landscape
**Research question:** Where is Forkd's differentiation strongest and where are competitors weakest?
**Scope:**
- Top 5 recipe/social food apps: Yummly, Tasty, Whisk, Paprika, Mela — features, monetization, weaknesses
- Craft beverage platforms: BrewFather, Meadist, any Reddit-native tools — who serves this community
- Instacart affiliate vs. other grocery affiliate programs — rate comparison, terms
- Creator monetization on recipe platforms — what others pay vs. Forkd's model
**Format:** Standard Market Research Report format from role.md
**Due:** 2026-06-16

### Track 2 — Product Researcher: Auth/Onboarding UX
**Research question:** What is the fastest path from app download to first value moment?
**Scope:**
- How do best-in-class social apps handle first-time auth (TikTok, Pinterest, Instagram)
- What do users do in the first 3 minutes? What causes drop-off?
- How do recipe apps handle the "no content" empty state for new users?
- What is the minimum viable onboarding to get a new user to upload or save their first recipe?
**Format:** Standard Product Research Report format from role.md — include behavioral evidence
**Due:** 2026-06-13 (before M1 UI implementation begins)

### Track 3 — Growth Engineer: Attribution Tracking Spec
**Research question:** Is our cart_events schema complete enough to support all creator payout calculations?
**Scope:**
- Audit `/docs/architecture.md` cart_events table and `/docs/creator-program.md` payout formula
- Confirm every field needed for payout calculation is in the schema
- Write the complete payout formula as a worked example (real numbers)
- Define the monthly requalification check logic for Elite, Golden Goat, LEGENDARY
- Flag any schema gap that would prevent payout from being reproducible from raw cart_events data alone
**Format:** Spec document with worked example and schema confirmation/gap analysis
**Due:** 2026-06-20

### Track 4 — Advertising Specialist: App Store Listing Prep
**Research question:** What keywords, title framing, and positioning will perform best in Food & Drink category?
**Scope:**
- Research top-ranked Food & Drink apps on App Store — what keywords appear in their titles/subtitles
- Draft 3 title options and 3 subtitle options for Forkd
- Draft keyword list (100 character limit for App Store keyword field)
- Draft App Store description (first 3 lines are critical — visible without "More")
- Screenshot strategy confirmed vs. draft in role.md — any updates?
**Format:** Draft copy document with keyword rationale
**Due:** 2026-07-15 (no M6 dependency yet — early draft only)

---

## CEO Escalation Triggers

Return this brief to CEO if:
- Market research reveals a competitor has cart-level attribution tracking Forkd doesn't know about
- Product research reveals the auth flow needs a design decision beyond M1 scope
- Attribution spec reveals a schema gap that requires Backend Engineer work in M1 (not M5)
- Any finding conflicts with a locked business decision

---

## Your COO Deliverable

When all four tracks are commissioned and Product Manager has issued briefs, write to `tasks/operations/coo/deliverable-2026-06-06-pre-launch-ops.md`:

```
COO OPS COMMISSION REPORT — [Date]
TRACK 1 — Market Research: [briefed / pending / issue]
TRACK 2 — Product Research: [briefed / pending / issue]
TRACK 3 — Growth Engineering: [briefed / pending / issue]
TRACK 4 — Advertising: [briefed / pending / issue]
CEO ESCALATIONS: [list any / none]
```
