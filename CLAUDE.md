# Forkd — Project Context for Claude Code

Read this file at the start of every session. Then read your role file from `/team/` before doing anything else.

## What This Project Is

Forkd is a React Native mobile app for crafting and sharing consumable recipes — food, ferments, mead, spirits, cider, homebrewing, and more. It combines a social feed with a one-tap grocery cart integration and a creator revenue share program. See `README.md` for the full product and business overview.

## Starting a Session — Role Startup Protocol

Every Claude Code session represents one team member. At the start of every session:

1. **Identify your role** — the user will tell you ("You are the Frontend Engineer") or you will ask
2. **Read your role file** — `team/[division]/[role]/role.md`
3. **Check your inbox** — `tasks/[role]/` for any open task briefs
4. **Confirm** — state your role, domain, and any open tasks in one sentence
5. **Follow your role's workflow exactly**

If no role is specified, say: "I'm ready. Which role should I adopt for this session?"

**Do not take any action before reading your role.md.**

### Role File Locations

| Role | File |
|---|---|
| CEO | `team/ceo/role.md` |
| CTO | `team/technology/cto/role.md` |
| Technology Manager | `team/technology/technology-manager/role.md` |
| Frontend Engineer | `team/technology/frontend-engineer/role.md` |
| Backend Engineer | `team/technology/backend-engineer/role.md` |
| AI Engineer | `team/technology/ai-engineer/role.md` |
| DevOps Engineer | `team/technology/devops-engineer/role.md` |
| COO | `team/operations/coo/role.md` |
| Product Manager | `team/operations/product-manager/role.md` |
| Growth Engineer | `team/operations/growth-engineer/role.md` |
| Market Researcher | `team/operations/market-researcher/role.md` |
| Product Researcher | `team/operations/product-researcher/role.md` |
| Advertising Specialist | `team/operations/advertising-specialist/role.md` |
| CFO | `team/cfo/role.md` (INACTIVE) |

---

## How Work Flows Between Sessions

All task briefs and deliverables are written to `tasks/`. This is the communication layer between sessions — each agent writes to their own inbox folder, and their superior reads from it.

```
tasks/
  ceo/                   CEO inbox — receives deliverables from CTO and COO
  technology/
    cto/                 CTO inbox — receives sign-offs from Technology Manager
    technology-manager/  TM inbox — receives submitted work from engineers
    frontend-engineer/   Engineer inboxes — receive task briefs from TM
    backend-engineer/
    ai-engineer/
    devops-engineer/
  operations/
    coo/                 COO inbox — receives sign-offs from Product Manager
    product-manager/     PM inbox — receives submitted work from specialists
    growth-engineer/     Specialist inboxes — receive task briefs from PM
    market-researcher/
    product-researcher/
    advertising-specialist/
```

**File naming:**
- Task briefs: `tasks/[role]/brief-[YYYY-MM-DD]-[feature].md`
- Deliverables: `tasks/[role]/deliverable-[YYYY-MM-DD]-[feature].md`
- Return reports: `tasks/[role]/return-[YYYY-MM-DD]-[feature].md`
- Sign-offs: `tasks/[role]/signoff-[YYYY-MM-DD]-[feature].md`

---

## Organizational Rules — Non-Negotiable

- **Only the CEO agent commits, branches, merges, or pushes to git.** No other role touches git under any circumstances.
- **Work flows up the chain.** Engineers → Technology Manager → CTO → CEO. Specialists → Product Manager → COO → CEO.
- **Managers return subpar work.** They do not fix it themselves — they write a Return Report and send it back down.
- **Managers update subordinate role.md files** when patterns of subpar work emerge (2+ returns for the same issue).
- **CEO escalates to Board** when uncertain. Board corrections are recorded in `team/ceo/learning.md`.

---

## Quality Standards (Every Role)

- No placeholders, TODOs, or half-finished work in submitted deliverables
- Every deliverable has acceptance criteria that can be verified by the next level up
- Subpar work is returned with specific, actionable feedback — never vague
- Role `role.md` files are living documents — updated by superiors during review cycles

---

## Multi-Window Setup (CEO Manages)

When multiple Claude Code sessions run in parallel, each session works in an isolated git worktree. **Only the CEO creates and manages worktrees.**

```
# CEO creates a worktree for an engineer task
git worktree add ../forkd-[role]-[feature] -b feat/[milestone]-[feature]

# List active worktrees
git worktree list

# Remove after CEO commits the work
git worktree remove ../forkd-[role]-[feature]
```

Each engineer session opens in their assigned worktree path. The CEO session stays in the main repo directory.

---

## Project File Structure

```
README.md                          Board-level company overview
CLAUDE.md                          This file
team/
  ceo/                             CEO — git authority, Board escalation
  cfo/                             CFO — INACTIVE until Phase 2
  technology/
    cto/                           CTO — tech vision and standards
    technology-manager/            Engineering overseer and QA
    frontend-engineer/             React Native UI
    backend-engineer/              Supabase schema and services
    ai-engineer/                   OpenAI pipelines
    devops-engineer/               Build, deploy, environment
  operations/
    coo/                           COO — operations and product direction
    product-manager/               Operations overseer and QA
    growth-engineer/               Affiliate, creator program, analytics
    market-researcher/             Market and competitive intelligence
    product-researcher/            User and product research
    advertising-specialist/        App Store, launch, creator outreach
docs/
  milestones.md                    Full milestone roadmap
  architecture.md                  System design and data model
  creator-program.md               Creator tier specification
tasks/                             Agent inbox — task briefs and deliverables
forkd/                             React Native app source code (created M0/M1)
```

Each `team/[role]/` folder contains: `role.md`, `learning.md`, `review.md`, `archive/`

---

## Tech Stack Quick Reference

| Layer | Technology |
|---|---|
| Mobile | React Native + Expo |
| Backend | Supabase |
| AI | OpenAI GPT-4o |
| Nutrition fallback | USDA FoodData Central |
| Grocery | Instacart Developer API |

---

## Current Priority

M0 completion: Expo Go connection is blocked by Windows Firewall on port 8081.
DevOps Engineer owns this fix. Task brief in `tasks/devops-engineer/`.
See `team/technology/devops-engineer/role.md` for fix details.
