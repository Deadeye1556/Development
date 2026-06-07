# TASK BRIEF — Backend Engineer — 2026-06-06

**FROM:** Technology Manager (pending CTO architecture approval)  
**MILESTONE:** M1 — Authentication & User Profiles  
**FEATURE:** Supabase schema, RLS, triggers, and service functions  
**START CONDITION:** Confirm CTO approval in `tasks/technology/cto/deliverable-2026-06-06-m1-architecture.md` before beginning schema changes. This brief is pre-issued so you are ready to start immediately upon approval.  
**NOTE:** All schema work happens in the Supabase dashboard — Expo does not need to be running.

---

## What to Build

### 1. `profiles` Table (Supabase Dashboard)

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

RLS policies required:
- `SELECT`: authenticated users can read any profile
- `UPDATE`: users can only update their own row (`auth.uid() = id`)
- `INSERT`: blocked — row created via trigger only

### 2. Auto-Create Profile on Signup (Supabase Trigger)

In Supabase → Database → Functions, create:
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

### 3. `follows` Table (Supabase Dashboard)

```sql
follower_id     uuid references profiles(id)
following_id    uuid references profiles(id)
created_at      timestamptz default now()
primary key (follower_id, following_id)
```

RLS policies required:
- `SELECT`: authenticated users can read any follow relationship
- `INSERT`: user can only insert rows where `follower_id = auth.uid()`
- `DELETE`: user can only delete rows where `follower_id = auth.uid()`

### 4. Google OAuth Setup

In Supabase Auth → Providers → Google:
- Enable Google provider
- Copy the Supabase callback URL and provide to DevOps Engineer (they configure in Google Cloud Console)
- Confirm redirect URI format for Expo: `exp://[local-ip]:8081`

### 5. Service Functions — `forkd/src/services/profiles.js`

Write all of these:
```
fetchProfile(userId)           → returns profile row or null
updateProfile(userId, data)    → updates display_name, avatar_url, bio
followUser(followerId, followingId) → inserts follow row
unfollowUser(followerId, followingId) → deletes follow row
checkIfFollowing(followerId, followingId) → returns boolean
fetchFollowers(userId)         → returns array of profile rows
fetchFollowing(userId)         → returns array of profile rows
```

Each function must:
- Have try/catch
- Return typed predictable response (not raw Supabase `.data`)
- Not use `service_role` key

---

## Acceptance Criteria

- [ ] `profiles` table exists with exact schema above
- [ ] `follows` table exists with exact schema above
- [ ] RLS enabled and policies applied on both tables (verify in Supabase dashboard)
- [ ] Trigger creates profile row on new auth.users insert — test by creating a test user
- [ ] All 7 service functions written in `forkd/src/services/profiles.js`
- [ ] Each function has try/catch and returns typed response
- [ ] Google OAuth callback URL provided to DevOps Engineer
- [ ] No `service_role` key in app code
- [ ] No console.log, no TODOs, no dead code

---

## Self-Check Before Submitting

- [ ] Create a test user in Supabase Auth → confirm profiles row auto-created
- [ ] Test `followUser` and `unfollowUser` in the Supabase SQL editor
- [ ] RLS: try reading profiles as anonymous → should be blocked
- [ ] No service_role key visible in `profiles.js`

---

## Deliverable

Write to `tasks/technology/devops-engineer/deliverable-2026-06-06-m1-schema.md`

Wait — write to `tasks/technology/backend-engineer/deliverable-2026-06-06-m1-schema.md`

Include:
1. Tables created (confirm schema matches spec above)
2. RLS policies applied (list them)
3. Trigger: confirmed working? (yes/no + test result)
4. Service functions written (list all 7)
5. Google OAuth: callback URL noted for DevOps
6. How to verify (exact steps — someone cold should be able to follow them)
7. M1 gate progress: which gate items this closes
