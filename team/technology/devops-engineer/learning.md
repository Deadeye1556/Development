# DevOps Engineer Learning Log

*Raw Technology Manager corrections and new standards. Never modify role.md directly from this file — wait for a structured review cycle per `review.md`. Resets to blank after each review cycle. Archives saved to `archive/learning-YYYY-MM.md`.*

---

## Environment & Build Config

## Expo & EAS Build

## Secret Management

## Local Dev Environment

## Technology Manager Corrections

### 2026-06-06 — Return: `.env.example` duplicate variable

**Correction:** When writing `.env.example` content into a deliverable document, verify the variable list matches the actual file exactly — no duplicates, no omissions. The file `forkd/.env.example` was correct, but the deliverable text contained a duplicate `EXPO_PUBLIC_SUPABASE_ANON_KEY` line. The deliverable claimed "all three required variables present" which was factually wrong.

**Rule:** Before submitting, read back any file contents written into a deliverable and count variables. Three required variables = exactly three lines in the template block.
