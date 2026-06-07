# TASK BRIEF — Growth Engineer — 2026-06-06

**FROM:** Product Manager  
**MILESTONE:** M5 prep — attribution schema must be locked well before M5 begins  
**OBJECTIVE:** Validate the cart attribution schema, document the complete payout formula, and surface any ambiguity that requires a CEO decision  
**DEADLINE:** 2026-06-20

---

## Why This Matters Now

M5 (Grocery Cart Integration) does not begin until September 2026, but the Backend Engineer who implements `cart_events` needs a schema spec they can trust. If the schema is wrong, payout calculations are wrong forever — `cart_events` is append-only and cannot be modified retroactively. Get it right before a single row is written.

---

## Task 1 — Schema Audit

Read `/docs/architecture.md` (cart_events table) and `/docs/creator-program.md` (payout formula).

For each field in `cart_events`, confirm:
- Is it present in the current schema?
- Is it used in payout calculation?
- Is it used in requalification logic?
- Is it used in retailer negotiation data?

Flag any calculation that requires data NOT in the current schema.

**Current schema to audit:**
```
id, recipe_id, creator_id, user_id, retailer, order_value, cart_items, timestamp
```

---

## Task 2 — Payout Formula (Worked Example)

Write the complete monthly payout calculation as a step-by-step worked example using real-looking numbers.

**Scenario:** Golden Goat creator, month of October 2026
- They had 47 cart_events in October
- order_values range from $23.00 to $89.00
- They are in the top 0.1% of active cart drivers for October
- Previous month they were NOT in top 0.1% (received Elite rate)

Show:
1. How you identify which rows belong to this creator and this month
2. How you calculate total order GMV
3. How you determine the rate (2.50% because top 0.1% for October)
4. The payout dollar amount
5. How the $10 minimum threshold applies
6. What Stripe Connect would receive as the payout instruction

---

## Task 3 — Requalification Logic

Document the exact logic for each tier that requalifies monthly:

**Elite tier:**
- What counts as "active"? The spec says "≥1 recipe published in calendar month"
- How is this checked? What table/field proves a recipe was published in a given month?
- What happens if a creator publishes on Oct 31 vs. Oct 1 — same result?

**Golden Goat / LEGENDARY:**
- "Top 0.1% of active cart drivers" — how is this calculated?
- What is "active"? Does the creator need to have published a recipe that month, or just have a cart event attributed to them?
- 0.1% of what pool? All users? All creators? All creators with at least 1 cart event that month?
- What data is needed to run this calculation? Is it in the schema?

**Flag any ambiguity** as a question for CEO decision. Do not guess.

---

## Task 4 — Tier Advancement Logic

Confirm the timing for automatic tier advancement (Starter → Rising → Featured → Partner):
- Does the tier column in `profiles` update in real-time as lifetime_carts increments?
- Or does it update in a batch job at the start of each month?
- What triggers `lifetime_carts` to increment? Is it the cart_event timestamp or when the order is confirmed?
- Flag any logic gap.

---

## Acceptance Criteria

- [ ] Schema audit complete — every field in cart_events mapped to its purpose
- [ ] Schema gaps identified — any missing field flagged with the impact
- [ ] Payout worked example complete — shows full calculation from raw rows to dollar amount
- [ ] Elite requalification logic documented — exact check defined
- [ ] Golden Goat/LEGENDARY requalification logic documented — pool and threshold defined
- [ ] Tier advancement timing documented — real-time vs. batch
- [ ] All ambiguities flagged as CEO decision questions (not guessed at)
- [ ] All calculations validated with worked examples showing the math
- [ ] Attribution definition restated: completed grocery order + specific recipe + creator linked via cart_events

---

## Self-Check Before Submitting

- [ ] Can a developer reproduce the monthly payout calculation from the worked example alone?
- [ ] Is every ambiguity surfaced, not silently resolved?
- [ ] Did you trace every formula input back to a specific cart_events field?

---

## Deliverable Location

Write to `tasks/operations/growth-engineer/deliverable-2026-06-20-attribution-spec.md`

Structure:
1. Schema audit table (field → purpose → present? → gap?)
2. Payout worked example (full calculation)
3. Requalification logic — Elite
4. Requalification logic — Golden Goat/LEGENDARY
5. Tier advancement timing
6. CEO decision questions (numbered list — answer-ready format)
