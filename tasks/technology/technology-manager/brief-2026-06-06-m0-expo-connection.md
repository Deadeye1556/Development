# CTO TASK BRIEF — Technology Manager — 2026-06-06

**MILESTONE:** M0 — Foundation  
**ENGINEER:** DevOps Engineer  
**TASK:** Fix Expo Go connection — Windows Firewall blocking port 8081

## Context

CEO has assigned M0 gate closure as the top priority. The Expo dev server runs but mobile device cannot connect via Expo Go. Root cause is confirmed: Windows Firewall blocking inbound TCP on port 8081.

## Task Brief for DevOps Engineer

```
TASK BRIEF — DevOps Engineer — 2026-06-06
MILESTONE: M0 — Foundation
FEATURE: Expo Go mobile connection
ACCEPTANCE CRITERIA:
- [ ] App shell loads on mobile device via Expo Go OR Tunnel mode confirmed working
- [ ] npx expo start runs clean after fix
- [ ] Fix steps documented in deliverable
- [ ] No secrets or values committed to repo
FILES TO TOUCH: forkd/app.json (only if Tunnel mode default required), forkd/.gitignore, forkd/.env.example
FILES NOT TO TOUCH: Any file in src/, any Supabase/AI/navigation files
DEADLINE: M0 gate — top priority
```

## Fix Paths (Known)

**Primary — Windows Firewall Rule (run PowerShell as Administrator):**
```powershell
New-NetFirewallRule -DisplayName "Expo Dev Server" -Direction Inbound -Protocol TCP -LocalPort 8081 -Action Allow
```
Then press `R` in the Expo terminal to reload, retry QR code scan.

**Fallback — Expo Tunnel Mode:**
In the Expo terminal, press `S` → select **Tunnel**. Routes through Expo servers, bypasses local firewall. No file changes required unless setting as default.

## Technology Manager Checklist (after DevOps submits)

- [ ] Acceptance criteria passed — binary per criterion
- [ ] Domain compliance — only DevOps-owned files touched
- [ ] No credentials or secrets committed
- [ ] `npx expo start` confirmed clean
- [ ] Fix steps reproducible (someone else could follow them cold)
- [ ] M0 gate status clearly stated: PASSED or NOT PASSED with reason

## Instructions

1. Pass this brief to DevOps Engineer session
2. DevOps delivers to `tasks/technology/devops-engineer/deliverable-2026-06-06-m0-expo-connection.md`
3. You review against checklist above
4. Pass or return
5. Sign-off goes to `tasks/technology/cto/signoff-2026-06-06-m0-expo-connection.md`
