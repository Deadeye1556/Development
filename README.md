# Forkd
## Board-Level Overview

**Mission:** Build the world's first social platform where crafting anything consumable — food, ferments, spirits, mead, cider, homebrews — connects directly to the grocery cart, creating a closed loop between inspiration and purchase.

**Vision:** Forkd becomes the platform that replaces the cookbook, out-competes TikTok for food and craft creators, and negotiates directly with major grocery retailers using the most precise purchase-intent data in the food industry.

---

## Product Pillars

1. **Create** — Upload recipes via photo snap (GPT-4o vision), text entry, or URL import. AI generates nutrition labels automatically from ingredient lists.
2. **Discover** — Social feed from followed creators + a global Discover tab. Photos, short-form video, text shares — all content types supported.
3. **Cook** — Full recipe detail with step photos, nutrition panel, and serving size adjuster.
4. **Shop** — One-tap grocery cart integration. Ingredients from any recipe or saved list sent directly to a retailer cart with full attribution tracking.

---

## Scope

Forkd covers **all consumable crafting** — not just food. This includes:
- Food recipes (all cuisines, dietary styles)
- Ferments (sourdough, kimchi, kombucha, sauerkraut)
- Mead, wine, and cider making
- Homebrewing (beer, ales, lagers)
- Spirits and distilling
- Any other craft consumable

---

## Business Model

| Phase | Revenue Source | Rate |
|---|---|---|
| Launch (Phase 1) | Instacart affiliate commission | ~3% per completed order |
| Year 2 (Phase 3) | Direct retailer deals (Kroger, HEB, Walmart) | 10%+ negotiated via attribution data |
| Year 3+ (Phase 4) | Retail media network (sponsored ingredients, CPG deals) | TBD |

**The negotiation moat:** Forkd owns the moment between "I want to cook this" and "I need to buy these ingredients." No other platform can provide recipe-to-purchase attribution at the ingredient level. This data is the leverage for above-market retailer rates.

---

## Creator Revenue Share

Badge earned permanently. Rate requalifies monthly. Creators can never lose their identity — only their rate if inactive.

| Tier | Lifetime Carts Required | Monthly Rate |
|---|---|---|
| Starter | 0 | 0.25% of cart GMV |
| Rising | 500 | 0.40% |
| Featured | 2,500 | 0.60% |
| Partner | 10,000 | 0.80% |
| Elite | 25,000 | 1.00% (requalify monthly) |
| Golden Goat 🐐 | 50,000 | 2.50% (badge permanent, rate requalifies monthly) |
| LEGENDARY ⚡ | 500,000 | 2.50% + platform bonus (requalifies monthly) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile | React Native + Expo |
| Backend | Supabase (auth, database, storage, realtime) |
| AI — Photo Snap | OpenAI GPT-4o Vision |
| AI — Nutrition | OpenAI GPT-4o + USDA FoodData Central (fallback) |
| Grocery Cart | Instacart Developer API |
| Creator Payouts | Stripe Connect (Phase 2) |
| Analytics | PostHog (Phase 6) |

---

## Organizational Structure

```
Board (Henry) — ultimate authority, approves CEO decisions, each correction is a CEO learning event
└── CEO Agent — all git operations, final decisions, escalates uncertainty to Board
    ├── CTO — technology vision and standards
    │   └── Technology Manager — engineering oversight, QA, updates engineer .md files
    │       ├── Frontend Engineer
    │       ├── Backend Engineer
    │       ├── AI Engineer
    │       └── DevOps Engineer
    ├── COO — operations and product direction
    │   └── Product Manager — operations oversight, QA, updates specialist .md files
    │       ├── Growth Engineer
    │       ├── Market Researcher
    │       ├── Product Researcher
    │       └── Advertising Specialist
    └── CFO — financial oversight (INACTIVE — activates at Phase 2)
```

**Git authority:** Only the CEO agent commits, branches, merges, or pushes. All other agents deliver work through their chain. Board approves when CEO is uncertain.

---

## Milestone Status

| Milestone | Target Date | Status |
|---|---|---|
| M0 — Environment Setup | June 1, 2026 | 🟡 In Progress |
| M1 — Auth & Profiles | June 22, 2026 | ⬜ Not Started |
| M2 — Recipe Upload MVP | July 20, 2026 | ⬜ Not Started |
| M3 — Recipe Catalog | August 10, 2026 | ⬜ Not Started |
| M4 — Home Feed | August 31, 2026 | ⬜ Not Started |
| M5 — Grocery Cart | September 28, 2026 | ⬜ Not Started |
| M6 — Polish & Beta | October 26, 2026 | ⬜ Not Started |
| Launch | November 16, 2026 | ⬜ Pending |
| Fallback | January 1, 2027 | ⬜ Buffer |

**Full milestone detail:** `/docs/milestones.md`

---

## Locked Decisions

These decisions are final. Do not revisit without Board approval.

- **App name:** Forkd (working title — rename decided before M6)
- **Scope:** All consumable crafting, not just food
- **Content types:** Photos, short-form video, text — no restrictions
- **Photo snap:** GPT-4o vision pipeline is non-negotiable core feature (M2)
- **Creator system:** Badge permanent, rate requalifies monthly
- **Git authority:** CEO agent only — no exceptions

---

## Working Files

| File | Purpose |
|---|---|
| `CLAUDE.md` | Project-wide context loaded in every Claude Code session |
| `team/ceo.md` | CEO agent definition and learned decisions |
| `team/technology/` | CTO, Technology Manager, and all engineers |
| `team/operations/` | COO, Product Manager, and all specialists |
| `team/cfo.md` | CFO (inactive, ready for Phase 2) |
| `docs/milestones.md` | Full milestone roadmap with acceptance criteria |
| `docs/architecture.md` | System architecture and data model |
| `docs/creator-program.md` | Creator tier system full specification |
| `Recipe App (Perplexity).md` | Original planning session transcript |
