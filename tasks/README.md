# Tasks — Agent Inbox Directory

This directory is the communication layer between Claude Code sessions. Each agent writes deliverables here. Superiors read from here to review and pass work up the chain.

## File Naming

| Type | Pattern | Written by |
|---|---|---|
| Task brief | `brief-YYYY-MM-DD-feature.md` | Superior (assigns work down) |
| Deliverable | `deliverable-YYYY-MM-DD-feature.md` | Agent (submits work up) |
| Return report | `return-YYYY-MM-DD-feature.md` | Superior (sends subpar work back) |
| Sign-off | `signoff-YYYY-MM-DD-feature.md` | Manager (packages for next level up) |

## Chain of Command — Brief Flow

Briefs flow strictly through the chain. No skipping levels.

```
CEO → CTO → Technology Manager → Engineers
CEO → COO → Product Manager → Specialists
```

**CEO briefs go to CTO and COO only.** CTO/COO cascade to their reports.

## Flow Example

```
CEO writes  → tasks/technology/cto/brief-2026-06-06-m1-architecture.md
CTO reviews → tasks/technology/technology-manager/brief-YYYY-MM-DD-m1-backend-schema.md
TM issues   → tasks/technology/backend-engineer/brief-YYYY-MM-DD-m1-schema.md
Backend does → tasks/technology/backend-engineer/deliverable-YYYY-MM-DD-m1-schema.md
TM reviews  → tasks/technology/technology-manager/signoff-YYYY-MM-DD-m1-backend-schema.md
CTO reviews → tasks/technology/cto/signoff-YYYY-MM-DD-m1-backend-schema.md
CEO reviews → commits to git
```

---

## Active Tasks — 2026-06-06

CEO briefs are the only briefs written at the CEO level. All downstream briefs are written by CTO, COO, TM, or PM through their respective chains.

### CEO Briefs Issued

| To | Brief | Priority | Due | Status |
|---|---|---|---|---|
| CTO | M0 — Expo Go connection fix | **P1 — Critical/Blocking** | ASAP | TM signed off; pending Henry device confirmation |
| CTO | M1 — Architecture review and approval | **P2 — High** | 2026-06-08 | CTO delivered — approved |
| COO | Pre-launch ops commission | **P3 — Medium** | Commission by 2026-06-07 | Brief issued |

### Technology Division — Work Artifacts

| File | Written by | Status |
|---|---|---|
| `tasks/technology/cto/deliverable-2026-06-06-m1-architecture.md` | CTO | Delivered — M1 approved |
| `tasks/technology/cto/signoff-2026-06-06-m0-expo-connection.md` | Technology Manager | M0 gate pending Henry device confirmation |
| `tasks/technology/devops-engineer/deliverable-2026-06-06-m0-expo-connection.md` | DevOps Engineer | Delivered — accepted |
| `tasks/technology/devops-engineer/return-2026-06-06-m0-expo-connection.md` | Technology Manager | Issued and corrected — resolved |

### Operations Division — Work Artifacts

*(None yet — awaiting COO session to cascade to Product Manager)*

### CFO
Inactive — activation criteria not met. No tasks.

---

## M0 Gate Status

**NOT CLOSED.** One action remains for Henry (Board):
1. Fill `forkd/.env` with Supabase URL, Supabase Anon Key, and OpenAI Key
2. Run `npx expo start` in `forkd/` and confirm Expo Go loads on device
   - If firewall blocks: press `S` in Expo terminal to switch to Tunnel mode
3. Confirm to CEO agent that device connected — M0 gate closes

Once M0 closes, Technology Manager is cleared to issue M1 briefs to Backend Engineer and Frontend Engineer per CTO deliverable.

---

## How to Open an Agent Session

1. Open a new Claude Code window in this project folder
2. Tell the session its role: **"You are the [Role Name]. Read your role and check your inbox."**
3. The session reads `team/[division]/[role]/role.md`
4. The session reads `tasks/[division]/[role]/` for open briefs
5. The session executes per Inbox Reaction Rules in CLAUDE.md

**Next sessions to open:**
- **CEO** (you are here) — commit this cleanup, then M0 device confirmation
- **COO** — cascade pre-launch ops commission to Product Manager
