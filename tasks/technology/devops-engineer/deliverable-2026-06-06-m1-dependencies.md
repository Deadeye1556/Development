# DELIVERABLE — DevOps Engineer — 2026-06-06

**TASK:** M1 — App scheme and auth package installation
**SUBMITTED TO:** Technology Manager

---

## 1. `"scheme": "forkd"` in app.json

Confirmed. Added as a top-level field under the `expo` key in `forkd/app.json`:

```json
{
  "expo": {
    "name": "forkd",
    "slug": "forkd",
    "version": "1.0.0",
    "scheme": "forkd",
    ...
  }
}
```

No other fields in `app.json` were modified.

---

## 2. Installed Packages and Versions

Installed using `npx expo install` from `forkd/` — Expo resolved SDK-compatible versions automatically.

| Package | Installed Version |
|---|---|
| `@supabase/supabase-js` | `^2.107.0` |
| `@react-native-async-storage/async-storage` | `2.2.0` |
| `react-native-url-polyfill` | `^3.0.0` |
| `expo-auth-session` | `~56.0.13` |

All four packages present in `forkd/package.json` under `dependencies`. `package-lock.json` updated by the install.

---

## 3. `npx expo start` Status

**Clean.** Metro Bundler starts without errors. `.env` loads all three variables. No new warnings introduced by the installs.

---

## 4. Scope Compliance

- No files in `forkd/src/` modified (directory does not yet exist)
- `.env` and `.env.example` unchanged — no new variables were needed
- No screen, service, navigation, or Supabase files touched
- No secrets or values introduced into any committed file

---

## 5. Acceptance Criteria

- [x] `"scheme": "forkd"` added to `forkd/app.json` under `expo` key
- [x] `@supabase/supabase-js` installed (`^2.107.0`)
- [x] `@react-native-async-storage/async-storage` installed (`2.2.0`)
- [x] `react-native-url-polyfill` installed (`^3.0.0`)
- [x] `expo-auth-session` installed (`~56.0.13`)
- [x] `npx expo start` runs clean after installs
- [x] No new secrets or values committed
- [x] `package.json` and `package-lock.json` updated
