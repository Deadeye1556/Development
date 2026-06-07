You are about to escalate a decision or blocker to your superior. Use this when you cannot proceed without a decision that is above your authority.

**When to escalate:**
- You are blocked and cannot complete your work without a decision from above
- Two or more valid options exist and the choice has strategic or architectural consequences
- A new constraint has emerged that conflicts with your current brief
- You received a correction that conflicts with your role.md or an existing CEO brief

**When NOT to escalate:**
- You can make the decision yourself within your role's authority
- The blocker is your own missing work — complete it
- The issue is tactical (tooling, environment) — solve it and log it

**Step 1 — Identify your escalation path.**
- Engineers and Specialists → escalate to Technology Manager or Product Manager (via your inbox file)
- Technology Manager → escalate to CTO
- Product Manager → escalate to COO
- CTO and COO → escalate to CEO
- CEO → escalate to Board (document in `team/ceo/learning.md` under Board Corrections, then await direction)

**Step 2 — Write the escalation file to your SUPERIOR's inbox.**

File path:
- To Technology Manager → `tasks/technology/technology-manager/escalation-[YYYY-MM-DD]-[topic].md`
- To Product Manager → `tasks/operations/product-manager/escalation-[YYYY-MM-DD]-[topic].md`
- To CTO → `tasks/technology/cto/escalation-[YYYY-MM-DD]-[topic].md`
- To COO → `tasks/operations/coo/escalation-[YYYY-MM-DD]-[topic].md`
- To CEO → `tasks/ceo/escalation-[YYYY-MM-DD]-[topic].md`

**Escalation template:**

```
# ESCALATION — [Your Role] → [Superior Role] — [Date]

BLOCKED ON: [one sentence — what you cannot decide or do]
BLOCKING: [what work is stalled until this is resolved]

OPTIONS:
A. [Option A — one sentence]
   Tradeoff: [what this gains / what this risks]

B. [Option B — one sentence]
   Tradeoff: [what this gains / what this risks]

RECOMMENDATION: [A or B, and one sentence why]

AWAITING: [specific decision or approval needed]
```

**Step 3 — End with the NEXT ACTION block.**

```
---
NEXT ACTION
Open:  [superior role]
Say:   "You are the [Role]. Check your inbox."
Why:   Escalation filed for [topic] — decision needed before [blocked work] can continue.
---
```

**Do not proceed with blocked work** while awaiting an escalation response. Document your status as blocked in your own notes. Resume when the decision comes back via a brief or response in your inbox.
