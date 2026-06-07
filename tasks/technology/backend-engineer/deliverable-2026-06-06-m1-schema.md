# DELIVERABLE — Backend Engineer — M1 Schema — 2026-06-06

**FROM:** Backend Engineer  
**TO:** Technology Manager  
**MILESTONE:** M1 — Authentication & User Profiles  
**CTO APPROVAL:** Confirmed — `tasks/technology/cto/deliverable-2026-06-06-m1-architecture.md`

---

## 1. Tables Created

### `profiles`

```sql
create table public.profiles (
  id              uuid references auth.users on delete cascade primary key,
  display_name    text,
  avatar_url      text,
  bio             text,
  follower_count  int         default 0,
  following_count int         default 0,
  creator_tier    text        default 'starter',
  lifetime_carts  int         default 0,
  created_at      timestamptz default now()
);
```

### `follows`

```sql
create table public.follows (
  follower_id  uuid references public.profiles(id) on delete cascade,
  following_id uuid references public.profiles(id) on delete cascade,
  created_at   timestamptz default now(),
  primary key (follower_id, following_id)
);

create index follows_following_id_idx on public.follows(following_id);
```

Index on `following_id` added — this column is not covered by the composite PK index and is used in `fetchFollowers` WHERE clause.

### `saves` (schema + RLS only — no service functions per CTO approval)

```sql
create table public.saves (
  user_id    uuid        references public.profiles(id) on delete cascade,
  recipe_id  uuid        not null,
  created_at timestamptz default now(),
  primary key (user_id, recipe_id)
);

create index saves_recipe_id_idx on public.saves(recipe_id);
```

**FK deferral note:** `recipe_id` FK constraint to `public.recipes(id)` cannot be applied in M1 — the `recipes` table does not yet exist. FK will be added in M2/M3 when recipes table is created:

```sql
-- Run in M2/M3 after recipes table exists
alter table public.saves
  add constraint saves_recipe_id_fkey
  foreign key (recipe_id) references public.recipes(id) on delete cascade;
```

---

## 2. RLS Policies

### Enable RLS on all three tables

```sql
alter table public.profiles enable row level security;
alter table public.follows  enable row level security;
alter table public.saves    enable row level security;
```

### `profiles` policies

```sql
-- Authenticated users can read any profile
create policy "profiles_select_authenticated"
  on public.profiles for select
  to authenticated
  using (true);

-- Users can only update their own row
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- INSERT is blocked at RLS level — profile is created via trigger only
-- (No INSERT policy = INSERT denied for all roles except service_role)
```

### `follows` policies

```sql
-- Authenticated users can read any follow relationship
create policy "follows_select_authenticated"
  on public.follows for select
  to authenticated
  using (true);

-- Users can only insert rows where they are the follower
create policy "follows_insert_own"
  on public.follows for insert
  to authenticated
  with check (auth.uid() = follower_id);

-- Users can only delete rows where they are the follower
create policy "follows_delete_own"
  on public.follows for delete
  to authenticated
  using (auth.uid() = follower_id);
```

### `saves` policies

```sql
-- Users can only read their own saves
create policy "saves_select_own"
  on public.saves for select
  to authenticated
  using (auth.uid() = user_id);

-- Users can only save for themselves
create policy "saves_insert_own"
  on public.saves for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Users can only remove their own saves
create policy "saves_delete_own"
  on public.saves for delete
  to authenticated
  using (auth.uid() = user_id);
```

---

## 3. Trigger — Auto-Create Profile on Signup

```sql
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'display_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

**Verification required (dashboard):** After applying the SQL above, go to Supabase Auth → Add user → create a test user with `display_name` in metadata. Confirm a row appears in `public.profiles` with the matching `id`.

---

## 4. Service Functions — `forkd/src/services/profiles.js`

All 7 functions written at `forkd/src/services/profiles.js`:

| Function | Returns |
|---|---|
| `fetchProfile(userId)` | `{ profile, error }` — profile row or null |
| `updateProfile(userId, data)` | `{ success, error }` — updates display_name, avatar_url, bio only |
| `followUser(followerId, followingId)` | `{ success, error }` |
| `unfollowUser(followerId, followingId)` | `{ success, error }` |
| `checkIfFollowing(followerId, followingId)` | `{ isFollowing, error }` — boolean |
| `fetchFollowers(userId)` | `{ followers, error }` — array of profile rows |
| `fetchFollowing(userId)` | `{ following, error }` — array of profile rows |

All functions: try/catch, typed return objects, no raw `.data` pass-through, no `service_role` key.

`fetchFollowers` and `fetchFollowing` use Supabase FK hint syntax (`follower:follower_id(*)` / `following:following_id(*)`) to join profiles via the correct FK when multiple FKs point to the same table.

Also created `forkd/src/lib/supabase.js` (Backend Engineer domain — client initialization):
- Uses `@supabase/supabase-js` with `AsyncStorage` storage adapter
- `detectSessionInUrl: false` (required for React Native)
- Reads `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` from env

---

## 5. Google OAuth — Notes for DevOps Engineer

**Supabase Auth dashboard steps (Board/user applies):**
1. Supabase → Auth → Providers → Google → Enable
2. Copy the Supabase OAuth callback URL: `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`
3. This URL goes into Google Cloud Console → OAuth 2.0 credentials → Authorized redirect URIs

**DevOps Engineer must:**
- Add `"scheme": "forkd"` to `app.json` under `expo` key (CTO-specified deep link scheme)
- Register `forkd://` as an authorized redirect URI in the Supabase Auth Google provider settings
- Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to Supabase Auth Google provider (values from Google Cloud Console)
- Install required packages: `@supabase/supabase-js`, `@react-native-async-storage/async-storage`, `react-native-url-polyfill`, `expo-auth-session`

**CTO flag:** Google OAuth must be tested on a physical device — simulator deep link handling is unreliable and will mask failures.

---

## 6. How to Verify (Cold Start)

1. **Apply SQL** — Open Supabase dashboard → SQL Editor → run all CREATE TABLE, CREATE INDEX, ALTER TABLE (RLS), CREATE POLICY, and CREATE FUNCTION/TRIGGER statements from sections 1–3 above in order.

2. **Verify tables** — Supabase → Table Editor → confirm `profiles`, `follows`, `saves` exist with correct columns.

3. **Verify RLS** — Supabase → Authentication → Policies → confirm each table shows RLS enabled and lists the expected policies.

4. **Test trigger** — Supabase → Auth → Users → Add user (set `display_name` in user metadata). Navigate to Table Editor → `profiles` → confirm a new row exists with the matching UUID and display_name.

5. **Test RLS on profiles** — Run in SQL Editor as anon role:
   ```sql
   set role anon;
   select * from public.profiles;
   -- Expected: 0 rows (no SELECT policy for anon)
   ```

6. **Test follow RLS** — In SQL Editor, attempt to insert a follow with a mismatched `follower_id`:
   ```sql
   -- As authenticated user A, try to insert a row with follower_id = user B's UUID
   -- Expected: RLS violation error
   ```

7. **Verify service functions** — Once `@supabase/supabase-js` is installed, import and call `fetchProfile` with the test user's UUID from step 4. Expect `{ profile: { id, display_name, ... }, error: null }`.

---

## 7. M1 Gate Progress

| Gate item | Status |
|---|---|
| `profiles` table with exact schema | Done — SQL provided |
| `follows` table with exact schema | Done — SQL provided |
| `saves` table (CTO-expanded scope) | Done — SQL provided, FK deferred to M2 |
| RLS enabled on all three tables | Done — policies provided for all three |
| Trigger: profile auto-created on signup | Done — SQL provided, dashboard test required |
| All 7 service functions in `profiles.js` | Done — file written |
| Each function has try/catch + typed response | Done |
| `supabase.js` client initialized | Done — file written |
| Google OAuth callback URL noted for DevOps | Done — see section 5 |
| No `service_role` key in app code | Confirmed |
| No console.log, no TODOs, no dead code | Confirmed |

**Blocked items (not Backend Engineer scope):**
- Package installation (`@supabase/supabase-js` etc.) → DevOps Engineer
- `"scheme": "forkd"` in `app.json` → DevOps Engineer
- Google Cloud Console OAuth setup → DevOps Engineer / Board
- Physical device OAuth test → Frontend + DevOps coordination per CTO requirement

---

## Self-Check

- [x] Every new table has RLS enabled
- [x] `service_role` key not referenced anywhere in app code
- [x] All foreign keys have cascade behavior defined (except `saves.recipe_id` — deferred, documented)
- [x] Indexes on `follows(following_id)` and `saves(recipe_id)` for WHERE/JOIN performance
- [x] Service functions return typed, predictable responses
- [x] No raw SQL in UI code — all queries go through service functions
- [x] No console.log or debug statements
- [x] No TODOs or dead code
