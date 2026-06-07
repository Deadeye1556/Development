You have encountered a blocking dependency. Run through this decision tree to determine who acts and how — before writing any files.

---

## Step 1 — Identify the block

State clearly:
- **Who is blocked:** [role name]
- **What they are blocked on:** [specific output or action they need]
- **Where the blocker lives:** [which role or team can produce it]
- **P-level of the blocked work:** [P1–P5]

---

## Step 2 — Run the decision tree

```
Is the blocker in the SAME division as the blocked engineer/specialist?
(Tech blocking Tech, or Ops blocking Ops)

  YES → TIER 1: Manager resolves directly. No escalation needed.
        If you are the blocked engineer/specialist:
          → Write an escalation to your manager's inbox flagging the block.
            File: tasks/[division]/[manager-role]/escalation-[date]-[topic].md
            Include: what you need, from whom, by when.

        If you are the manager (TM or PM):
          → Write an Unblocking Brief to the solving engineer/specialist.
            File: tasks/[division]/[engineer]/brief-[date]-unblock-[feature].md
            Use the Unblocking Brief template from your role.md.
            Preserve the blocked role's P-level.

  NO → Is the blocker in the OTHER division?
  (Tech blocking Ops, or Ops blocking Tech)

    YES → TIER 2: Chief officers coordinate. No CEO needed.
          If you are TM or PM:
            → Escalate to CTO or COO respectively. Write to their inbox.

          If you are CTO (Tech team blocked by Ops):
            → Write a coordination brief to COO inbox.
              File: tasks/operations/coo/brief-[date]-tech-dependency-[topic].md

          If you are COO (Ops team blocked by Tech):
            → Write a coordination brief to CTO inbox.
              File: tasks/technology/cto/brief-[date]-ops-dependency-[topic].md

          Use the coordination brief template from your role.md.

    Does this cross-division block affect milestone timeline, product scope, or
    did CTO and COO disagree on priority?

      YES → TIER 3: Escalate to CEO.
            File: tasks/ceo/escalation-[date]-[topic].md
            Include: what's blocked, what both options are, your recommendation.

      NO → Stay at Tier 2.
```

---

## Step 3 — Write the correct file

**Unblocking Brief (Tier 1 — manager to engineer/specialist):**
```
UNBLOCKING BRIEF — [Solver Role] — [Date]
BLOCKING: [which role / which task is stalled]
TASK: [exactly what you need them to produce]
PRIORITY: P[match blocked role's level] — Unblocking [blocked role]'s [feature]
DUE: [date — before blocked role needs it]
RETURN TO: [blocked role resumes their work once this deliverable arrives]
```

**Coordination Brief (Tier 2 — CTO to COO or COO to CTO):**
```
[CTO/COO] COORDINATION BRIEF — [CTO/COO] — [Date]
BLOCKING: [which role / which task is stalled]
DEPENDENCY: [what your division needs from their division — be specific]
PRIORITY: P[match blocked role's level]
DUE: [when your team needs this — state the date]
SCOPE: [exactly what's needed — no more, no less]
```

**CEO Escalation (Tier 3):**
```
ESCALATION — [Your Role] → CEO — [Date]
BLOCKED ON: [what cannot proceed]
BLOCKING: [what work is stalled]
OPTIONS:
  A. [option with tradeoff]
  B. [option with tradeoff]
RECOMMENDATION: [A or B and why]
AWAITING: [specific decision needed]
```

---

## Step 4 — End with NEXT ACTION

Point to whoever needs to act next — the manager, the chief, or the CEO.

```
---
NEXT ACTION
Open:  [role]
Say:   "You are the [Role]. Check your inbox."
Why:   [blocked role] is stalled on [dependency] — [resolver role] has an unblocking brief waiting.
---
```

**Important:** The blocked engineer/specialist continues any non-blocked work while waiting. A block on one task is not a block on the full role. State this in your NEXT ACTION if relevant.
