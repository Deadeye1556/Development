# DELIVERABLE — DevOps Engineer — 2026-06-06

**TASK:** M1 — Missing package install (expo-web-browser, expo-image-picker)
**SUBMITTED TO:** Technology Manager

---

## 1. Status

Both packages were already installed as part of the M1 nav packages task
(deliverable-2026-06-06-m1-nav-packages.md). No reinstall was required.

---

## 2. Installed Versions (confirmed from package.json)

| Package | Version |
|---|---|
| `expo-web-browser` | `~56.0.5` |
| `expo-image-picker` | `~56.0.16` |

Both pinned to SDK 56 — consistent with the rest of the Expo dependency set.

---

## 3. `npx expo start` Status

**Clean.** Confirmed in the previous deliverable. Metro Bundler starts without errors, `.env` loads all three variables, no warnings from either package.

---

## 4. Scope Compliance

- No `forkd/src/` files modified
- `forkd/app.json`, `.env`, `.env.example` unchanged
- No credentials introduced

---

## 5. Acceptance Criteria

- [x] `expo-web-browser` present in `forkd/package.json` at `~56.0.5`
- [x] `expo-image-picker` present in `forkd/package.json` at `~56.0.16`
- [x] `npx expo start` runs clean
- [x] No `forkd/src/` files modified
- [x] No credentials introduced
- [x] `package.json` and `package-lock.json` already updated
