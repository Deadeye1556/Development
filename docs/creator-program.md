# Forkd Creator Program — Full Specification

**Owner:** Growth Engineer | **Status:** Locked | **Activates:** Phase 2 (post-launch)
**Governing principle:** Your badge is forever. Your rate is earned every month. The ceiling doesn't exist.

---

## Core Mechanic

Creators earn a percentage of the grocery cart GMV their recipe content directly drives. Attribution is tracked via the `cart_events` table — every completed grocery order is linked to the recipe and creator that drove it.

**Lifetime carts** = cumulative total of attributed `cart_events` for this creator, across all time, never reset.

**Monthly rate** = determined by current tier status. Some tiers requalify monthly — the badge is permanent but the payout rate must be re-earned.

---

## Tier Structure

| Tier | Lifetime Carts | Monthly Rate | Requalifies Monthly? |
|---|---|---|---|
| Starter | 0 | 0.25% of cart GMV | No |
| Rising | 500 | 0.40% | No |
| Featured | 2,500 | 0.60% | No |
| Partner | 10,000 | 0.80% | No |
| Elite | 25,000 | 1.00% | Yes — maintain active status |
| Golden Goat 🐐 | 50,000 | 2.50% | Yes — badge permanent, rate requalifies |
| LEGENDARY ⚡ | 500,000 | 2.50% + platform bonus | Yes — badge permanent, rate requalifies |

---

## Tier Advancement Rules

- **Starter → Rising → Featured → Partner:** Automatic, permanent. Once the lifetime cart threshold is crossed, the tier upgrades and never reverts.
- **Elite:** Unlocked at 25,000 lifetime carts. To receive 1.00% rate each month, creator must remain active (definition: ≥1 recipe published in the calendar month). Inactive creators drop to Partner rate (0.80%) until active again. Badge retained.
- **Golden Goat 🐐:** Unlocked at 50,000 lifetime carts. Badge is permanent — it cannot be revoked. Rate of 2.50% requalifies monthly: creator must be in the top 0.1% of active cart drivers for the calendar month. If not in top 0.1%, receives Elite rate (1.00%) that month while keeping the badge.
- **LEGENDARY ⚡:** Unlocked at 500,000 lifetime carts. Badge is permanent. Rate requalifies monthly by same top 0.1% active cart driver threshold. This is a platform-wide event when first reached — push notification to all users, Discover feed banner.

---

## Payout Calculation

Monthly payout per creator:
```
payout = sum(cart_events.order_value WHERE creator_id = X AND month = current_month) × current_rate
```

Where `current_rate` is determined by the creator's tier status on the first day of the calendar month.

**Payout timing:** Calculated on the 1st of each month for the prior month. Paid via Stripe Connect (Phase 2 implementation).

**Minimum payout threshold:** $10. Earnings below $10 roll to next month.

---

## Platform Economics

At the Instacart affiliate rate (~3% of GMV), the platform receives:
- Starter/Rising/Featured creators: platform keeps 2.75–2.60% net
- Partner creators: platform keeps 2.20% net
- Elite creators: platform keeps 2.00% net
- Golden Goat/LEGENDARY creators: platform keeps 0.50% net

At Phase 3 negotiated retailer rates (10%+ target), the economics improve dramatically:
- Golden Goat/LEGENDARY creators: platform keeps 7.50%+ net at 10% retailer rate

Creator payouts are not a cost — they are funded by the GMV the creator drives. The program is self-financing.

---

## Creator Dashboard (Phase 2 Feature)

Each creator sees:
- Lifetime cart count (progress toward next tier)
- Current tier and monthly rate
- Monthly earnings (current month, real-time)
- Earnings history (by month)
- Top-performing recipes (by cart conversions)
- Progress bar to next permanent tier
- Requalification status for Elite/Golden Goat/LEGENDARY (if applicable)

---

## Behavioral Design Principles

This system is deliberately designed using variable reward mechanics:

1. **Early tiers are automatic** — creates momentum and first payout hit
2. **Permanent badges** — creators own their achievement identity even if rate drops
3. **Rate requalification** — loss aversion (fear of losing the rate) is more motivating than gain
4. **LEGENDARY is a public event** — social proof that the top is achievable, drives creator acquisition
5. **No ceiling** — the platform explicitly tells creators "earn more as you drive more, forever"

---

## Phase Timeline

- **Phase 1 (Launch):** Creator program announced, tiers visible on profiles, rates display as 0% (beta)
- **Phase 2 (Post-Launch):** Payouts activate, Stripe Connect live, creator dashboard ships
- **Phase 3 (Year 2):** Creator earnings increase as retailer rates negotiate up from ~3% to 10%+
- **Phase 4+:** Elite creator partnership deals, sponsored content integration

---

## Locked Decisions

These are final and require Board approval to change:
- Lifetime cart counts never reset
- Badge status is permanent once earned
- `cart_events` table is append-only (the audit trail cannot be modified)
- LEGENDARY unlock is a public platform event — not a quiet upgrade
