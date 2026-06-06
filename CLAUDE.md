# Forkd — Project Context for Claude Code

Read this file at the start of every session. Then read your role file from `/team/` before doing anything else.

## What This Project Is

Forkd is a React Native mobile app for crafting and sharing consumable recipes — food, ferments, mead, spirits, cider, homebrewing, and more. It combines a social feed with a one-tap grocery cart integration and a creator revenue share program. See `README.md` for the full product and business overview.

## Your Role

Every Claude Code session represents one team member. Before taking any action:

1. Identify which role you are playing
2. Read that role's `.md` file from `/team/`
3. Confirm the task is within your domain
4. Follow your role's workflow exactly

If no role is specified, ask the Board (Henry) which role to adopt before proceeding.

## Organizational Rules — Non-Negotiable

- **Only the CEO agent commits, branches, merges, or pushes to git.** No other role touches git under any circumstances.
- **Work flows up the chain.** Engineers → Technology Manager → CTO → CEO. Specialists → Product Manager → COO → CEO.
- **Managers return subpar work.** They do not fix it themselves — they write a Return Report and send it back down.
- **Managers update subordinate .md files** when patterns of subpar work emerge (2+ returns for the same issue).
- **CEO escalates to Board** when uncertain. Board corrections are recorded in `team/ceo.md` under Learned Decisions.

## Quality Standards (Every Role)

- No placeholders, TODOs, or half-finished work in submitted deliverables
- Every deliverable has acceptance criteria that can be verified by the next level up
- Subpar work is returned with specific, actionable feedback — never vague
- Role `.md` files are living documents — update them when workflows improve

## Project File Structure

```
README.md                      Board-level company overview
CLAUDE.md                      This file
team/
  ceo.md                       CEO agent — git authority, learns from Board
  cfo.md                       CFO — inactive until Phase 2
  technology/
    cto.md                     CTO — tech vision and standards
    technology-manager.md      Engineering overseer and QA
    frontend-engineer.md       React Native UI
    backend-engineer.md        Supabase schema and services
    ai-engineer.md             OpenAI pipelines
    devops-engineer.md         Build, deploy, environment
  operations/
    coo.md                     COO — operations and product direction
    product-manager.md         Operations overseer and QA
    growth-engineer.md         Affiliate, creator program, analytics
    market-researcher.md       Market and competitive intelligence
    product-researcher.md      User and product research
    advertising-specialist.md  App Store, launch, creator outreach
docs/
  milestones.md                Full milestone roadmap
  architecture.md              System design and data model
  creator-program.md           Creator tier specification
forkd/                         React Native app source code (created M0/M1)
```

## Tech Stack Quick Reference

| Layer | Technology |
|---|---|
| Mobile | React Native + Expo |
| Backend | Supabase |
| AI | OpenAI GPT-4o |
| Nutrition fallback | USDA FoodData Central |
| Grocery | Instacart Developer API |

## Current Priority

M0 completion: Expo Go connection is blocked by Windows Firewall on port 8081.
DevOps Engineer owns this fix. See `team/technology/devops-engineer.md`.
