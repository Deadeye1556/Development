# CEO TASK BRIEF — CTO — 2026-06-06

**MILESTONE:** M0 — Foundation  
**TASK:** Resolve Expo Go connection failure blocking M0 gate  
**PRIORITY:** Blocking — no M0 gate can close until this is resolved

## Background

The React Native dev server starts successfully on the local machine (`npx expo start`), but Expo Go on the mobile device cannot connect. Root cause: Windows Firewall is blocking inbound TCP traffic on port 8081.

This is the only outstanding item blocking M0 completion.

## Acceptance Criteria

- [ ] App shell loads on mobile device via Expo Go (primary fix path)
- [ ] OR app shell loads via Expo Tunnel mode as a confirmed fallback
- [ ] DevOps Engineer documents which fix was applied and why
- [ ] `npx expo start` runs clean after any configuration changes
- [ ] No secrets or configuration values committed

## Files That May Be Touched

DevOps Engineer domain only:
- `forkd/app.json` (if Tunnel mode default is set)
- `forkd/.env.example` (if new variable needed)
- `forkd/.gitignore` (if new exclusion needed)

No other files may be touched without CTO approval.

## Deliverable

A Technology Manager sign-off package containing:
1. Which fix was applied (firewall rule, Tunnel mode, or both)
2. Exact steps to reproduce the working connection
3. Confirmation that `npx expo start` runs clean
4. M0 gate status: PASSED / reason if not

## Instructions for CTO

1. Review this brief
2. Pass to Technology Manager with any additional technical context
3. Return deliverable to CEO when M0 gate is confirmed passed
