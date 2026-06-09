# Forkd — Milestone Gate Tracker

**Owner:** COO · **Issue:** [FOR-48](/FOR/issues/FOR-48)
**Source of truth for gate criteria:** [milestones.md](./milestones.md) · **Cadence:** [delivery-cadence.md](./delivery-cadence.md) · **Verification:** [qa-checklist.md](./qa-checklist.md)

Single view of every milestone gate: its status, owner, target date, and the **explicit pass/exit criteria** that must be true to advance. **Rule:** do not start a milestone until the prior milestone's gate is `passed`. The detailed gate checkboxes live in [milestones.md](./milestones.md); this tracker is the rollup the COO updates every weekly review.

---

## Definition of Done (this artifact)

- ✅ Every milestone gate has an explicit pass/exit criterion.
- ✅ Each gate carries status (not-started / in-progress / passed), owner, and target date.
- ✅ Bidirectional link with [milestones.md](./milestones.md) (this file ↔ milestones).

**Status legend:** 🟢 `passed` · 🟡 `in-progress` · ⚪ `not-started` · 🔴 `blocked`

---

## Gate Rollup

| Gate | Owner | Target | Status | Exit criteria (all must hold) |
|---|---|---|---|---|
| **M0 — Environment** | DevOps Eng | Jun 1, 2026 | 🟢 passed | App shell loads on phone via Expo Go; Supabase reachable + keys saved; all keys in `.env` (uncommitted); repo has initial commit. → [details](./milestones.md#milestone-0--environment-setup) |
| **M1 — Auth & Profiles** | Backend + Frontend | Jun 22, 2026 | 🟡 in-progress | Fresh user can sign up / log in / log out; profile shows avatar+name+bio; two accounts can mutually follow; tab nav works iOS+Android ✅; all tables RLS-enabled ✅. **Open:** avatars bucket; 3 gate checks unverified. → [details](./milestones.md#milestone-1--authentication--user-profiles) |
| **M2 — Recipe Upload ⭐** | Frontend + Backend + AI | Jul 20, 2026 | ⚪ not-started | Manual-entry upload works; photo-snap parses a recipe card → fills form; nutrition label generates ≤5s; panel shows cal/protein/fat/carbs; serving slider updates panel; recipe persists+retrievable in Supabase; step media attaches; content tags save. → [details](./milestones.md#milestone-2--recipe-upload-mvp-) |
| **M3 — Recipe Catalog** | Frontend + Backend | Aug 10, 2026 | ⚪ not-started | Search returns relevant results ≤1s; category filters narrow correctly; detail page shows all content incl. step media; save + rating persist; comments post+display. → [details](./milestones.md#milestone-3--recipe-catalog) |
| **M4 — Home Feed** | Frontend + Backend | Aug 31, 2026 | ⚪ not-started | Following 3 accounts populates feed; Discover shows all recipes sorted by saves; save-from-feed adds to collection; empty state shows onboarding (not blank). → [details](./milestones.md#milestone-4--home-feed) |
| **M5 — Grocery Cart 💰** | Backend + Frontend + Growth | Sep 28, 2026 | 🔴 blocked | "Add to Cart" opens Instacart pre-loaded; list aggregates+dedupes across 3 recipes; pantry checkboxes persist; affiliate tracking confirmed in IDP dashboard; cart events log to Supabase w/ full attribution. **Blocker:** Instacart prod approval — see [FOR-50](/FOR/issues/FOR-50) / [readiness doc](../for-50-readiness.md). → [details](./milestones.md#milestone-5--grocery-cart-integration-) |
| **M6 — Polish, Beta & Launch Prep** | All | Oct 26, 2026 | ⚪ not-started | Zero crash bugs in beta; every screen has loading+empty states; Store + Play listings created w/ screenshots; ≥5 real users each uploaded ≥1 recipe; ≥1 Instacart cart add by a beta user (tracking confirmed). → [details](./milestones.md#milestone-6--polish-beta--launch-prep) |
| **Launch Week 🚀** | All | Nov 16, 2026 | ⚪ not-started | Store + Play listings published; launch posts live (target subreddits + TX communities); 10 creators DMed; Supabase logs monitored 24h; every early comment/review answered. → [details](./milestones.md#launch-week--november-16-2026-) |

---

## Open Gate Items (active focus)

These are the specific unmet criteria currently on the critical path. The COO clears these in the weekly plan; verification follows the [QA Checklist](./qa-checklist.md).

### M1 — Auth & Profiles (🟡 closing)
| Criterion | Status | Owner | Evidence / blocker |
|---|---|---|---|
| New user can sign up, log in, log out | ⚪ unverified | Backend/Frontend | Verify on-device (Wk 1 plan) |
| Profile screen shows avatar, name, bio | ⚪ unverified | Frontend | Needs avatars bucket (below) |
| Two test accounts can follow each other | ⚪ unverified | Backend | Verify on-device (Wk 1 plan) |
| Supabase Storage `avatars` bucket + RLS | 🟡 in flight | Backend Eng | Last open M1 **action item** ([milestones.md:44](./milestones.md)) |
| Tab nav works iOS + Android | 🟢 passed | — | Confirmed on device 2026-06-06 |
| All tables RLS-enabled | 🟢 passed | — | Confirmed |

**M1 gate verdict:** ⚪ not yet passable — close the 3 unverified checks + ship the avatars bucket, then re-run the M1 gate and flip to 🟢. Tracked in [Week 1 plan](./delivery-cadence.md#week-1--june-2026-06-08--2026-06-14).

---

## Update protocol

Updated at every **Weekly Review** (Sun) per the [cadence ritual](./delivery-cadence.md#the-ritual). When a gate's criteria all hold and are verified on-device:
1. Flip the gate to 🟢 `passed` here.
2. Check the matching gate boxes in [milestones.md](./milestones.md).
3. Record the verification evidence (date + device) in the gate's row.
4. Only then may the next milestone move to 🟡 `in-progress`.
