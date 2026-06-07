# TASK BRIEF — DevOps Engineer — 2026-06-06

MILESTONE: M2 prep
FEATURE: Install openai npm package
PRIORITY: High — AI Engineer is actively writing pipeline files and cannot run live API tests until this is installed.

## INSTALL COMMAND

Run from the `forkd/` directory:

```powershell
npx expo install openai
```

Use `npx expo install` — Expo resolves the SDK-compatible version.

## ACCEPTANCE CRITERIA

- [ ] `openai` present in `forkd/package.json` at Expo-resolved version
- [ ] `npx expo start` runs clean after install
- [ ] `package.json` and `package-lock.json` updated
- [ ] No `forkd/src/` files modified
- [ ] No credentials introduced

## FILES TO TOUCH

- `forkd/package.json`
- `forkd/package-lock.json`

## FILES NOT TO TOUCH

- Any file in `forkd/src/` → AI Engineer domain
- `forkd/.env` or `.env.example` — `EXPO_PUBLIC_OPENAI_KEY` is already in both

## DELIVERABLE

Write to `tasks/technology/devops-engineer/deliverable-2026-06-06-m2-openai-package.md`:
- Installed version from `package.json`
- `npx expo start` clean confirmation

## DEADLINE

Immediate — AI Engineer is blocked on live API testing.

---
NEXT ACTION
Open:  Technology Manager
Say:   "You are the Technology Manager. Check your inbox."
Why:   DevOps Engineer deliverable for openai package is ready for your review.
---
