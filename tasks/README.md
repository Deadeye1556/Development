# Tasks — Agent Inbox Directory

This directory is the communication layer between Claude Code sessions. Each agent writes deliverables here. Superiors read from here to review and pass work up the chain.

## File Naming

| Type | Pattern | Written by |
|---|---|---|
| Task brief | `brief-YYYY-MM-DD-feature.md` | Superior (assigns work down) |
| Deliverable | `deliverable-YYYY-MM-DD-feature.md` | Agent (submits work up) |
| Return report | `return-YYYY-MM-DD-feature.md` | Superior (sends subpar work back) |
| Sign-off | `signoff-YYYY-MM-DD-feature.md` | Manager (packages for next level up) |

## Flow Example

```
CEO writes  → tasks/technology/cto/brief-2026-06-06-m1-architecture.md
CTO reviews → tasks/technology/technology-manager/brief-2026-06-06-m1-backend-schema.md
TM issues   → tasks/technology/backend-engineer/brief-2026-06-06-m1-schema.md
Backend does the work → tasks/technology/backend-engineer/deliverable-2026-06-06-m1-schema.md
TM reviews  → tasks/technology/cto/signoff-2026-06-06-m1-backend-schema.md
CTO reviews → tasks/ceo/deliverable-2026-06-06-m1-backend-schema.md
CEO reviews → commits to git
```

---

## Active Tasks — 2026-06-06

### Technology Division

| Agent | Brief | Due | Status |
|---|---|---|---|
| DevOps Engineer | M0 — Expo Go connection fix | ASAP (blocking) | Brief issued |
| CTO | M1 — Architecture review and approval | 2026-06-08 | Brief issued |
| Technology Manager | M1 — Backend schema brief (cascade from CTO) | After CTO approval | Brief issued |
| Technology Manager | M1 — Frontend planning brief (cascade from CTO) | After CTO approval | Brief issued |
| Technology Manager | M2 — AI pipeline design brief (cascade from CTO) | After CTO approval | Brief issued |
| Backend Engineer | M1 — Supabase schema + service functions | 2026-06-15 | Brief issued |
| Frontend Engineer | M1 — Screen specs + navigation scaffold | 2026-06-09 | Brief issued |
| AI Engineer | M2 — Photo snap + nutrition pipeline design | 2026-06-20 | Brief issued |

### Operations Division

| Agent | Brief | Due | Status |
|---|---|---|---|
| COO | Pre-launch ops commission | 2026-06-07 | Brief issued |
| Product Manager | Research commission (all 4 specialists) | 2026-06-07 | Brief issued |
| Market Researcher | Competitive landscape research | 2026-06-16 | Brief issued |
| Product Researcher | Auth/onboarding UX patterns | 2026-06-13 | Brief issued |
| Growth Engineer | Attribution tracking spec | 2026-06-20 | Brief issued |
| Advertising Specialist | App Store listing prep | 2026-07-15 | Brief issued |

### CFO
Inactive — activation criteria not yet met. No tasks.

---

## How to Open an Agent Session

1. Open a new Claude Code window in this project folder
2. Tell the session its role: **"You are the [Role Name]. Read your role and check your inbox."**
3. The session reads `team/[division]/[role]/role.md`
4. The session reads `tasks/[division]/[role]/` for open briefs
5. The session executes the brief and writes a deliverable

**Priority session to open right now:** DevOps Engineer (M0 is blocking everything)
