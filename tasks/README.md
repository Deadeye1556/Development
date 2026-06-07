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
CEO writes  → tasks/technology/cto/brief-2026-06-06-expo-fix.md
CTO reads   → writes tasks/technology/technology-manager/brief-2026-06-06-expo-fix.md
TM reads    → writes tasks/technology/devops-engineer/brief-2026-06-06-expo-fix.md
DevOps does the work → writes tasks/technology/devops-engineer/deliverable-2026-06-06-expo-fix.md
TM reviews  → writes tasks/technology/cto/signoff-2026-06-06-expo-fix.md
CTO reviews → writes tasks/ceo/deliverable-2026-06-06-expo-fix.md
CEO reviews → commits to git
```

## Active Tasks

| Task | Assigned to | Status |
|---|---|---|
| M0 — Expo Go connection fix | DevOps Engineer | Brief issued |
