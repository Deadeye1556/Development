You are about to log a learning entry. Every role logs corrections and corrections from superiors immediately — before continuing any other work.

**Step 1 — Identify what happened.**
What were you corrected on? What was the expected behavior vs. what you did? Who corrected you (superior, return report, Board)?

**Step 2 — Distill to a single rule.**
A learning entry is not a narrative — it is a rule. Format:
- What the rule is (one sentence, stated as a positive directive)
- Why it matters (one sentence, referencing the actual incident or reason given)

**Step 3 — Find your learning.md file.**
- CEO → `team/ceo/learning.md`
- CTO → `team/technology/cto/learning.md`
- Technology Manager → `team/technology/technology-manager/learning.md`
- Frontend Engineer → `team/technology/frontend-engineer/learning.md`
- Backend Engineer → `team/technology/backend-engineer/learning.md`
- AI Engineer → `team/technology/ai-engineer/learning.md`
- DevOps Engineer → `team/technology/devops-engineer/learning.md`
- COO → `team/operations/coo/learning.md`
- Product Manager → `team/operations/product-manager/learning.md`
- Growth Engineer → `team/operations/growth-engineer/learning.md`
- Market Researcher → `team/operations/market-researcher/learning.md`
- Product Researcher → `team/operations/product-researcher/learning.md`
- Advertising Specialist → `team/operations/advertising-specialist/learning.md`
- CFO → `team/cfo/learning.md`

**Step 4 — Append the entry under the correct category.**

Use this format:
```
## [Category]

### [Date] — [One-line summary]
**Rule:** [Positive directive — what to do or not do]
**Why:** [Reason — reference the incident or correction source]
```

Common categories by role:
- All technology roles: Architecture, Standards, Scope, CEO/TM/CTO Corrections
- All operations roles: Research, Scope, Methodology, COO/PM Corrections
- CEO: Technology, Operations, Git & Repository, Product & Business, Board Corrections

**Step 5 — Note if this is a repeat.**
If this is the second learning entry for the same issue, flag it: append `⚠️ SECOND INSTANCE` to the entry header. Two instances for the same pattern triggers a role.md update by the superior.

Do not modify role.md yourself — only your superior can update your role.md.
