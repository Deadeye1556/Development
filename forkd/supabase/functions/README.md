# Forkd Edge Functions (OpenAI + USDA proxy)

These functions keep all AI provider keys **server-side**. The Expo client never
holds an OpenAI or USDA key — it calls these functions with the signed-in user's
Supabase session token (CTO-1 / FOR-19).

| Function | Purpose | Client caller |
|---|---|---|
| `analyze-nutrition` | Ingredients → per-serving nutrition (GPT-4o-mini, USDA fallback) | `src/services/ai/nutrition.js` |
| `analyze-photo` | Photo → structured recipe (GPT-4o vision) | `src/services/ai/photoSnap.js` |

Both require a valid user JWT (`verify_jwt = true` in `supabase/config.toml`), so
anonymous traffic cannot spend our OpenAI budget.

## Secrets (never committed)

```bash
supabase secrets set OPENAI_API_KEY=sk-...
supabase secrets set USDA_API_KEY=...        # optional; DEMO_KEY fallback
```

## Local dev

```bash
cp supabase/functions/.env.example supabase/functions/.env   # fill in real keys
supabase functions serve --env-file supabase/functions/.env
```

## Deploy

```bash
supabase functions deploy analyze-nutrition
supabase functions deploy analyze-photo
```

## Contract

`analyze-nutrition` — `POST { ingredients: [{quantity,unit,name}], servings? }`
→ `{ nutrition: {...} | null, error: string | null }`

`analyze-photo` — `POST { base64Image: string }`
→ `{ recipe: {...} | null, error: string | null }`
