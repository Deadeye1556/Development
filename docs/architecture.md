# Forkd — System Architecture

**Owner:** CTO | **Last updated:** June 2026

---

## Stack Overview

```
Mobile App (React Native + Expo)
    ↕ HTTPS
Supabase (PostgreSQL + Auth + Storage + Realtime)
    ↕ REST/SDK calls
OpenAI GPT-4o (photo snap + nutrition analysis)
USDA FoodData Central (nutrition fallback — free)
Instacart Developer API (grocery cart)
```

---

## Mobile App Structure

```
forkd/
├── app.json                  Expo configuration
├── eas.json                  EAS Build (App Store / Play Store)
├── .env                      Environment variables (never committed)
├── .env.example              Variable names only (always committed)
├── .gitignore
└── src/
    ├── lib/
    │   └── supabase.js       Supabase client initialization
    ├── services/
    │   ├── recipes.js        Recipe CRUD operations
    │   ├── profiles.js       Profile and follow operations
    │   ├── cart.js           Cart event logging
    │   └── ai/
    │       ├── photoSnap.js  GPT-4o vision pipeline
    │       └── nutrition.js  Nutrition analysis pipeline
    ├── screens/
    │   ├── HomeScreen.js
    │   ├── DiscoverScreen.js
    │   ├── UploadScreen.js
    │   ├── RecipeDetailScreen.js
    │   ├── ProfileScreen.js
    │   ├── ShoppingListScreen.js
    │   └── AuthScreen.js
    ├── components/
    │   ├── RecipeCard.js
    │   ├── NutritionPanel.js
    │   ├── IngredientInput.js
    │   ├── CreatorBadge.js
    │   └── ...
    ├── navigation/
    │   └── index.js          Tab + stack navigator definitions
    └── styles/
        └── theme.js          Colors, fonts, spacing constants
```

---

## Database Schema

All tables have RLS enabled. All foreign keys have cascade behavior defined.

### profiles
```sql
id              uuid references auth.users (primary key)
display_name    text
avatar_url      text
bio             text
follower_count  int     default 0
following_count int     default 0
creator_tier    text    default 'starter'
lifetime_carts  int     default 0
created_at      timestamptz default now()
```

### recipes
```sql
id              uuid    primary key default gen_random_uuid()
creator_id      uuid    references profiles(id)
title           text    not null
description     text
cover_photo_url text
cover_video_url text
cuisine_tags    text[]
dietary_tags    text[]
content_type    text    -- recipe | ferment | mead | spirit | cider | homebrew | other
media_type      text    -- photo | video | text
status          text    default 'draft'  -- draft | published
nutrition       jsonb   -- {calories, protein_g, carbs_g, fat_g, fiber_g, sugar_g, sodium_mg, servings, confidence}
view_count      int     default 0
save_count      int     default 0
created_at      timestamptz default now()
```

### ingredients
```sql
id          uuid    primary key default gen_random_uuid()
recipe_id   uuid    references recipes(id) on delete cascade
quantity    numeric
unit        text
name        text    not null
sort_order  int
```

### steps
```sql
id          uuid    primary key default gen_random_uuid()
recipe_id   uuid    references recipes(id) on delete cascade
description text    not null
photo_url   text
video_url   text
sort_order  int
```

### follows
```sql
follower_id     uuid references profiles(id)
following_id    uuid references profiles(id)
created_at      timestamptz default now()
primary key (follower_id, following_id)
```

### saves
```sql
user_id     uuid references profiles(id)
recipe_id   uuid references recipes(id)
created_at  timestamptz default now()
primary key (user_id, recipe_id)
```

### cart_events *(append-only — never update or delete)*
```sql
id          uuid    primary key default gen_random_uuid()
recipe_id   uuid    references recipes(id)
creator_id  uuid    references profiles(id)
user_id     uuid    references profiles(id)
retailer    text    -- 'instacart' | 'heb' | 'kroger' | etc.
order_value numeric
cart_items  jsonb
timestamp   timestamptz default now()
```

---

## AI Pipeline Architecture

### Photo Snap Pipeline

```
User takes photo
    → Expo ImagePicker returns base64 image
    → photoSnap.js sends to GPT-4o Vision with structured prompt
    → GPT-4o returns JSON: {title, ingredients[], steps[], cuisine_tags[], dietary_tags[], content_type}
    → Schema validation
    → If valid: auto-fill upload form
    → If invalid/error: prompt user for manual entry
```

Cost target: <$0.02 per call | Model: gpt-4o

### Nutrition Analysis Pipeline

```
User completes ingredient list
    → nutrition.js sends ingredients[] to OpenAI with structured prompt
    → OpenAI returns JSON: {calories, protein_g, carbs_g, fat_g, fiber_g, sugar_g, sodium_mg, servings, confidence}
    → If OpenAI fails: USDA FoodData Central lookup for individual ingredients
    → If USDA partial: return partial data with confidence: 'low'
    → Display NutritionPanel component with result
```

Cost target: <$0.005 per call | Model: gpt-4o-mini

---

## Data Flow — Cart Attribution

```
User views recipe (recipe_id, creator_id known)
    → Taps "Add to Cart"
    → Shopping list screen aggregates ingredients
    → User checks off pantry items
    → Taps "Send to Instacart"
    → Instacart API call made
    → On success: log cart_event {recipe_id, creator_id, user_id, retailer: 'instacart', timestamp}
    → This row is the attribution record for creator payout calculation
```

`cart_events` is the single source of truth for: creator tier progression, creator payout calculation, and retailer negotiation data.

---

## Environment Variables

```
EXPO_PUBLIC_SUPABASE_URL          Supabase project URL
EXPO_PUBLIC_SUPABASE_ANON_KEY     Supabase anon (public) key
EXPO_PUBLIC_OPENAI_KEY            OpenAI API key
```

`service_role` key is stored in Supabase dashboard only — never in app code or `.env`.

---

## Security Rules

1. All Supabase tables have RLS — users can only access their own data unless explicitly allowed
2. `service_role` key never appears in app code
3. All API keys via environment variables only
4. `.env` is in `.gitignore` — never committed
5. OpenAI calls never log user content (recipe photos, ingredient data)
