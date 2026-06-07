TASK BRIEF — Growth Engineer — 2026-06-06

MILESTONE: M5 — Grocery Cart Integration (schema locks early)
PRIORITY: P3 — Medium. Schema must be confirmed before M5 backend work begins; no M1 or M2 dependency. Note: attribution spec also interlocks with M1 — if your audit reveals a schema gap requiring Backend Engineer changes in M1 (not M5), escalate immediately.
OBJECTIVE: Produce an attribution spec answering: Is the cart_events schema complete enough to support all creator payout calculations?
DELIVERABLE FORMAT: Spec document with worked example and schema gap analysis

ACCEPTANCE CRITERIA:
- [ ] Audits /docs/architecture.md cart_events table — every field listed, purpose documented
- [ ] Audits /docs/creator-program.md payout formula — every input variable identified
- [ ] Confirms (or denies) that every field needed for payout calculation exists in the schema
- [ ] Provides complete payout formula as a worked example using real numbers (not variables)
- [ ] Defines monthly requalification check logic for Elite, Golden Goat, and LEGENDARY tiers
- [ ] Flags any schema gap that would prevent payout from being reproducible from raw cart_events data alone
- [ ] Attribution logic is traceable to a specific data event per field (not narrative)
- [ ] Creator tier calculations documented with formula, not prose

DATA REQUIRED: /docs/architecture.md, /docs/creator-program.md. No external sources needed — this is an internal audit.
DEADLINE: 2026-06-20

---

ESCALATION TRIGGER: Escalate immediately to Product Manager (do not hold) if the audit reveals any schema gap requiring Backend Engineer changes in M1 (not M5). M1 is targeted for June 22 — a schema change discovered late costs engineering cycles.
