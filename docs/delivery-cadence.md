# Forkd — Weekly Delivery Cadence

**Owner:** COO · **Issue:** [FOR-48](/FOR/issues/FOR-48)
**Budget:** 5–6 hours / week (hard cap) · **Launch target:** Nov 16, 2026 (fallback Jan 1, 2027)
**Related:** [Gate Tracker](./gate-tracker.md) · [Milestones](./milestones.md) · [QA Checklist](./qa-checklist.md)

This is the operating rhythm that turns the [milestone roadmap](./milestones.md) into shipped work inside a fixed 5–6 hr/week budget. It has two parts: the **ritual** (when we plan and review) and the **template** (how each week is planned). A populated **Week 1** plan follows.

---

## Definition of Done (this artifact)

- ✅ A reusable weekly-plan **template** sized to the 5–6 hr/week budget, with explicit capacity accounting and overflow → backlog handling.
- ✅ The **ritual** is written down: when the week is planned, when it is reviewed, and where the live plan lives.
- ✅ **This week's plan (Wk 1, Jun) is populated** against the budget.

---

## The Ritual

| Event | When | Who | Output |
|---|---|---|---|
| **Weekly Plan** | Start of week (Mon) | COO | Picks ≤6 hrs of work from the milestone backlog, assigns an owner to each item, writes it into the live plan below. |
| **Mid-week pulse** | Midpoint (Thu, async) | COO | One-line status per active item: on-track / at-risk / blocked. Blocked items get a named owner + action. |
| **Weekly Review** | End of week (Sun) | COO | Mark each item shipped / slipped; slipped items carry to next week's backlog with a reason; update the [Gate Tracker](./gate-tracker.md). |

**Where the plan lives:** this file. The most recent week is at the top of the **Weekly Plans** section. Prior weeks are kept as a ledger so slippage is visible over time.

**Capacity rule:** total *planned* hours in a week must be ≤ 6.0. If a milestone needs more than the week's budget, split it across weeks — never overcommit the week. Anything that does not fit goes to **Overflow → Backlog**, not into the active plan.

---

## Weekly Plan Template

Copy this block at the top of **Weekly Plans** every Monday.

```
## Week N — <Month> (<start date> → <end date>)
**Milestone(s) in focus:** Mx — <name>
**Budgeted:** X.X / 6.0 hrs

| # | Task | Owner | Est (hr) | Status | Notes |
|---|------|-------|----------|--------|-------|
| 1 |      |       |          | todo   |       |
| 2 |      |       |          | todo   |       |

**Budget check:** sum(Est) = X.X ≤ 6.0 ✅
**Overflow → Backlog:** <items that did not fit, with reason>
**Mid-week pulse (Thu):** <one line per item>
**Weekly review (Sun):** shipped: … | slipped: … (reason + carry-to) | gate-tracker updated: yes/no
```

Status values per task: `todo` → `in_progress` → `shipped` (or `slipped` / `blocked`). `blocked` always names the owner and the action that unblocks it.

---

## Weekly Plans

### Week 1 — June (2026-06-08 → 2026-06-14)
**Milestone(s) in focus:** [M1 — Authentication & User Profiles](./milestones.md#milestone-1--authentication--user-profiles) (closing the gate)
**Budgeted:** 5.5 / 6.0 hrs

M1 is code-complete except the avatars storage bucket, and three gate checks are unverified. Week 1 is a **gate-closing week**: finish the one open action item and verify the M1 gate on-device so we can open M2 (the critical milestone) clean.

| # | Task | Owner | Est (hr) | Status | Notes |
|---|------|-------|----------|--------|-------|
| 1 | Create Supabase Storage `avatars` bucket + RLS, wire to profile screen | Backend Eng | 1.5 | todo | Last open M1 action item ([milestones.md:44](./milestones.md)) |
| 2 | On-device verification: sign up → log in → log out on a fresh account | COO / QA | 1.0 | todo | M1 gate check #1; use [QA Checklist](./qa-checklist.md) |
| 3 | On-device verification: profile screen shows avatar + name + bio | COO / QA | 0.5 | todo | M1 gate check #2; depends on task 1 |
| 4 | On-device verification: two test accounts follow each other | COO / QA | 0.5 | todo | M1 gate check #3 |
| 5 | Update [Gate Tracker](./gate-tracker.md): mark M1 gate checks passed/failed with evidence | COO | 0.5 | todo | Records the verification results |
| 6 | Pre-stage M2 (Recipe Upload) brief so Week 2 starts on the critical path | COO | 1.5 | todo | M2 is the most critical milestone — do not start cold |

**Budget check:** sum(Est) = 5.5 ≤ 6.0 ✅
**Overflow → Backlog:** Full M2 build (13–26 hrs) — sequenced across Weeks 2–6, not this week. Dark mode / polish (M6) — deferred.
**Mid-week pulse (Thu):** _to be filled 2026-06-11_
**Weekly review (Sun):** _to be filled 2026-06-14_

---

## Backlog (overflow / not-yet-scheduled)

Items pulled from the milestone roadmap that did not fit a week. Pulled into a week during the Monday plan.

- M2 — Recipe Upload MVP (13–26 hrs) — **next up**, sequence across Weeks 2+.
- M2 Fiverr: URL import scraper ($150–$300) — kick off vendor SOW when M2 starts.
- M6 — Dark mode, polish, onboarding — deferred until M2–M5 land.
