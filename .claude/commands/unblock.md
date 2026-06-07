A blocking dependency was discovered. This skill covers the full cycle: routing the block, resolving it, confirming the unblock, and deciding whether to escalate a pattern.

---

## PHASE 1 — Routing the Block

### Step 1 — Identify the block

State clearly:
- **Who is blocked:** [role name]
- **What they are blocked on:** [specific output or action they need]
- **Where the blocker lives:** [which role or team can produce it]
- **P-level of the blocked work:** [P1–P5]

### Step 2 — Run the decision tree

```
Is the blocker in the SAME division as the blocked engineer/specialist?
(Tech blocking Tech, or Ops blocking Ops)

  YES → TIER 1: Manager resolves directly. No escalation needed.
        If you are the blocked engineer/specialist:
          → Report the block to your manager's inbox.
            File: tasks/[division]/[manager-role]/escalation-[date]-unblock-[feature].md
            Include: what you need, from whom, by when.
            NEXT ACTION: point to your manager.

        If you are the manager (TM or PM):
          → Write an Unblocking Brief to the solving engineer/specialist.
            File: tasks/[division]/[solver-role]/brief-[date]-unblock-[feature].md
            Preserve the blocked role's P-level.
            NEXT ACTION: point to the SOLVER (not CTO, not CEO).

  NO → Is the blocker in the OTHER division?
  (Tech blocking Ops, or Ops blocking Tech)

    YES → TIER 2: Chief officers coordinate. No CEO needed.
          If you are TM or PM:
            → Escalate to your chief officer. Write to their inbox.
          If you are CTO (Tech team blocked by Ops):
            → Write coordination brief to COO inbox.
              File: tasks/operations/coo/brief-[date]-tech-dependency-[topic].md
          If you are COO (Ops team blocked by Tech):
            → Write coordination brief to CTO inbox.
              File: tasks/technology/cto/brief-[date]-ops-dependency-[topic].md
          NEXT ACTION: point to the chief receiving the coordination brief.

    Does this cross-division block affect milestone timeline, product scope,
    or did CTO and COO disagree on priority?

      YES → TIER 3: Escalate to CEO.
            File: tasks/ceo/escalation-[date]-[topic].md
      NO  → Stay at Tier 2.
```

### Step 3 — Write the correct file

**Unblocking Brief (Tier 1 — manager to solver):**
```
UNBLOCKING BRIEF — [Solver Role] — [Date]
BLOCKED ROLE: [who is waiting]
BLOCKED TASK: [what they cannot continue without this]
YOUR TASK: [exactly what you must produce]
PRIORITY: P[match blocked role's level] — Unblocking [blocked role]
DUE: [date — before blocked role needs it]
DELIVER TO: Technology Manager (or Product Manager)
NOTE: When your deliverable is reviewed and accepted, [Blocked Role] will be notified to resume.
```

**The blocked engineer/specialist continues any non-blocked parallel work while waiting. State this in your NEXT ACTION.**

---

## PHASE 2 — Resolution Routing (manager acts when solver delivers)

When the solver's deliverable arrives and the manager accepts it:

**The manager's NEXT ACTION is the previously-blocked engineer — not CTO.**

The manager writes a brief to the blocked engineer's inbox:

```
UNBLOCK NOTICE — [Blocked Role] — [Date]
YOU ARE NOW UNBLOCKED FOR: [task / feature]
RESOLVED BY: [solver role] — [what they delivered]
ACTION REQUIRED: Resume [specific task]. When complete, write an Unblock Confirmation (see below).
```

File: `tasks/[division]/[blocked-role]/brief-[date]-unblocked-[feature].md`

```
---
NEXT ACTION
Open:  [Previously Blocked Role]
Say:   "You are the [Role]. Check your inbox."
Why:   Your [feature] block is resolved — [solver] delivered [what]. Resume device verification / [task name].
---
```

---

## PHASE 3 — Unblock Confirmation (blocked role confirms and reports)

When the previously-blocked engineer/specialist resumes and confirms the dependency is working:

Write a brief Unblock Confirmation to the manager:

```
UNBLOCK CONFIRMATION — [Your Role] — [Date]
BLOCK RESOLVED: [what was missing]
RESOLVED BY: [solver role]
CONFIRMED WORKING: [how you verified it — one sentence]
RESUMING: [task name] — estimated completion: [date or condition]
PATTERN FLAG: [First occurrence / Second occurrence — if second, flag it explicitly]
```

File: `tasks/[division]/[manager-role]/escalation-[date]-unblock-confirmation-[feature].md`

```
---
NEXT ACTION
Open:  Technology Manager (or Product Manager)
Say:   "You are the [Manager Role]. Check your inbox."
Why:   Unblock confirmed — [feature] is now unblocked. Review for pattern escalation.
---
```

---

## PHASE 4 — Pattern Check (manager decides whether to escalate)

When the manager receives the Unblock Confirmation:

```
Is this the FIRST time this solver role caused this type of block?
  YES → No escalation. Note the block in your own learning.md and continue.
         Do NOT route to CTO/COO unless the block affected a milestone deadline.

  NO (second or more occurrence of the same pattern from the same role):
    → Flag to CTO (Tech) or COO (Ops).
      Write to: tasks/technology/cto/escalation-[date]-pattern-[role].md
             or tasks/operations/coo/escalation-[date]-pattern-[role].md

      Pattern Escalation format:
      PATTERN ESCALATION — [Date]
      ROLE WITH REPEATED GAPS: [solver role]
      PATTERN: [describe the repeated failure — missing packages, missing schema, etc.]
      OCCURRENCES: [list dates and features affected]
      IMPACT: [what was delayed]
      RECOMMENDATION: Update [role]'s role.md under Known Issues to Avoid

    CTO/COO decides whether to update the solver's role.md.
    CEO is NOT involved in pattern escalation unless it caused a milestone miss.
```

---

## Summary of NEXT ACTION routing per phase

| Phase | Who acts | NEXT ACTION points to |
|---|---|---|
| Block discovered (engineer) | Blocked engineer | Manager |
| Block routed (manager) | Manager → Solver | Solver |
| Solver delivers | Manager reviews | **Previously-blocked engineer** |
| Unblock confirmed (engineer) | Blocked engineer | Manager |
| Pattern check (manager, first occurrence) | Manager | Continue — no escalation |
| Pattern check (manager, 2nd+ occurrence) | Manager | CTO or COO |
