# TASK BRIEF — DevOps Engineer — 2026-06-06

**MILESTONE:** M0 — Foundation  
**FEATURE:** Expo Go mobile connection  
**ASSIGNED BY:** Technology Manager  
**PRIORITY:** Blocking all M0 progress

---

## What Needs to Be Done

The Expo dev server starts (`npx expo start`) but Expo Go on the mobile device cannot connect to it. Windows Firewall is blocking inbound TCP traffic on port 8081. You need to resolve this so the app shell loads on the device.

---

## Acceptance Criteria

- [ ] App shell loads on mobile device via Expo Go
- [ ] OR Tunnel mode is confirmed working as the connection method
- [ ] `npx expo start` runs without errors after any changes
- [ ] Any config changes do not commit secrets or values
- [ ] Fix steps documented so they can be reproduced cold

---

## Files You May Touch

- `forkd/app.json` — only if setting Tunnel mode as default
- `forkd/.env.example` — only if a new variable is introduced
- `forkd/.gitignore` — only if a new exclusion is needed

**Do not touch:** Any file in `src/`, any Supabase files, any AI files, navigation, components.

---

## Fix Paths

**Try Primary First:**

Run PowerShell **as Administrator**:
```powershell
New-NetFirewallRule -DisplayName "Expo Dev Server" -Direction Inbound -Protocol TCP -LocalPort 8081 -Action Allow
```
After running: press `R` in the Expo terminal → retry QR code scan on device.

**If Primary Fails — Tunnel Fallback:**

In the Expo terminal, press `S` → select **Tunnel**.  
Expo routes traffic through its servers — bypasses local firewall entirely.  
Test: QR code scan on device should connect within 30–60 seconds.

---

## Deliverable

Write your deliverable to `tasks/technology/devops-engineer/deliverable-2026-06-06-m0-expo-connection.md`.

Include:
1. Which fix path was used (Primary / Fallback / Both)
2. Exact steps taken (reproducible from scratch)
3. Result: did the app shell load on the device? (Yes / No)
4. `npx expo start` status after fix (clean / warnings — list them)
5. Any files changed (list or "none")
6. M0 gate status: **PASSED** or **NOT PASSED — [reason]**

---

## Self-Check Before Submitting

- [ ] App shell loads OR Tunnel confirmed working
- [ ] `npx expo start` runs clean
- [ ] `.env` not staged (`git status` check)
- [ ] Fix steps written out in full — not summarized
- [ ] M0 gate status explicitly stated
- [ ] No TODOs in deliverable
