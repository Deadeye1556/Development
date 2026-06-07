# CTO Learning Log

*Raw CEO corrections and new decisions. Never modify role.md directly from this file — wait for a structured review cycle per `review.md`. Resets to blank after each review cycle. Archives saved to `archive/learning-YYYY-MM.md`.*

---

## Architecture Decisions

## Standards & Quality

### 2026-06-06 — Verify DevOps install claims before passing to CEO
**Rule:** When a DevOps deliverable claims a package is installed and a key is populated, verify it independently before issuing a CEO deliverable summary. A sign-off on an unverified env claim blocks engineers silently.
**Why:** CTO flagged the M2 OpenAI package sign-off as potentially unverified — CEO confirmed package was genuinely in node_modules and key was set. Escalation was correct behavior; outcome was clean. The habit of checking is what matters.
**How to apply:** On any DevOps deliverable that claims a live credential or package install, spot-check before writing the CEO summary. If you cannot verify directly, state the assumption explicitly in the deliverable.

## Stack & Dependency Decisions

## Security Decisions

## CEO Corrections
