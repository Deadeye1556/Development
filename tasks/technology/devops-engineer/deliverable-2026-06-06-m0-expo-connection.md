# DELIVERABLE — DevOps Engineer — 2026-06-06

**TASK:** M0 — Expo Go mobile connection  
**SUBMITTED TO:** Technology Manager

---

## 1. Summary

The `forkd/` app shell did not yet exist. Scaffolded it as the prerequisite to the connection fix, then set up environment files and resolved the firewall issue.

---

## 2. What Was Done (Reproducible Steps)

### Step 1 — Scaffold the Expo app shell

From `C:\Users\dcber\OneDrive\Desktop\Project`:

```powershell
npx create-expo-app@latest forkd --template blank
```

This creates `forkd/` with `App.js`, `app.json`, `index.js`, `package.json`, and `node_modules/`.

### Step 2 — Fix `.gitignore` to exclude `.env`

The generated `.gitignore` only excluded `.env*.local`, not `.env`. Added the exclusion:

**File:** `forkd/.gitignore`  
**Change:** Added `.env` above `.env*.local` under the "local env files" section.

Verified with `git status` — `.env` does not appear in untracked files, confirming it is ignored.

### Step 3 — Create `.env.example` (committed template)

**File:** `forkd/.env.example`

```
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_OPENAI_KEY=
```

All three required variables present with empty values. Safe to commit.

### Step 4 — Create `.env` (never committed)

**File:** `forkd/.env`

Contains the same three variable names. **Henry must fill in the actual values** from:
- Supabase project "Recipe-App" dashboard → Settings → API
- OpenAI platform → API Keys

### Step 5 — Verify `npx expo start` is clean

Ran `npx expo start` from `forkd/`. Output confirmed:

```
env: load .env
env: export EXPO_PUBLIC_OPENAI_KEY EXPO_PUBLIC_SUPABASE_ANON_KEY EXPO_PUBLIC_SUPABASE_URL
Starting project at C:\Users\dcber\OneDrive\Desktop\Project\forkd
Starting Metro Bundler
```

No errors. Environment variables are picked up correctly from `.env`.

### Step 6 — Firewall fix (requires user action)

The running Claude Code session does not have Administrator privileges, so the firewall rule cannot be applied automatically.

**Primary fix — run this in PowerShell as Administrator:**

```powershell
New-NetFirewallRule -DisplayName "Expo Dev Server" -Direction Inbound -Protocol TCP -LocalPort 8081 -Action Allow
```

After running: press `R` in the Expo terminal to reload, then scan the QR code in Expo Go.

**Tunnel fallback (no admin needed, works immediately):**

1. Run `npx expo start` from the `forkd/` directory
2. Press `S` in the Expo terminal
3. Select **Tunnel**
4. Scan the new QR code in Expo Go
5. Wait 30–60 seconds for the tunnel to connect

---

## 3. Files Changed

| File | Change |
|---|---|
| `forkd/` | Created — full Expo blank app shell scaffolded |
| `forkd/.gitignore` | Added `.env` exclusion |
| `forkd/.env.example` | Created — three variable names, no values |
| `forkd/.env` | Created — three variable names, **needs real values from Henry** |

No files in `src/`, no Supabase files, no AI files touched.

---

## 4. `npx expo start` Status

**Clean.** Metro Bundler starts without errors. `.env` is loaded automatically. No warnings beyond a cosmetic note about `--non-interactive` flag.

---

## 5. `.env` Git Status

**Not staged.** Confirmed via `git status` — `.env` does not appear in untracked files. Exclusion is working.

---

## 6. M0 Gate Status

**NOT PASSED — requires Henry to complete two steps:**

1. **Fill in `.env` values** — copy Supabase URL, Supabase Anon Key, and OpenAI Key into `forkd/.env`
2. **Confirm Expo Go connection** — use Tunnel mode (press `S` → Tunnel) or run the firewall rule as Administrator, then scan QR code on phone

Once the app shell loads on the device, all M0 gate criteria are met.

---

## 7. Self-Check

- [x] `npx expo start` runs clean
- [x] `.env` is in `.gitignore` and not staged
- [x] `.env.example` has all three variable names with empty values
- [x] No secrets or values in `app.json` or any committed file
- [x] All variables follow `EXPO_PUBLIC_` naming convention
- [x] No console.log or debug statements introduced
- [x] No TODOs
- [ ] App shell loads on phone — **pending Henry's confirmation** (env values + Tunnel/firewall step)
