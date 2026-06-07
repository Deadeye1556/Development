You are about to cascade a brief down the chain of command. Follow these steps exactly.

**Step 1 — Identify the source brief.**
Read the brief in your inbox. Note: the originating role, the priority level, the milestone, and the due date.

**Step 2 — Preserve the priority.**
The priority passes through unchanged. You may only lower the priority if you document a specific named blocking dependency — a task that must complete first, identified by file name or feature name. An undocumented priority change is a chain violation.

If you need to add context or split the work, do so in the body — not by changing the priority field.

**Step 3 — Determine the cascade target.**
- CEO brief → CTO and/or COO (your choice, based on domain)
- CTO brief → Technology Manager only
- COO brief → Product Manager only
- Technology Manager brief → one or more engineers (Frontend, Backend, AI, DevOps)
- Product Manager brief → one or more specialists (Growth, Market Researcher, Product Researcher, Advertising Specialist)

**Step 4 — Write the cascade brief to the subordinate's inbox.**

File path:
- To CTO → `tasks/technology/cto/brief-[YYYY-MM-DD]-[feature].md`
- To COO → `tasks/operations/coo/brief-[YYYY-MM-DD]-[feature].md`
- To Technology Manager → `tasks/technology/technology-manager/brief-[YYYY-MM-DD]-[feature].md`
- To Product Manager → `tasks/operations/product-manager/brief-[YYYY-MM-DD]-[feature].md`
- To Frontend Engineer → `tasks/technology/frontend-engineer/brief-[YYYY-MM-DD]-[feature].md`
- To Backend Engineer → `tasks/technology/backend-engineer/brief-[YYYY-MM-DD]-[feature].md`
- To AI Engineer → `tasks/technology/ai-engineer/brief-[YYYY-MM-DD]-[feature].md`
- To DevOps Engineer → `tasks/technology/devops-engineer/brief-[YYYY-MM-DD]-[feature].md`
- To Growth Engineer → `tasks/operations/growth-engineer/brief-[YYYY-MM-DD]-[feature].md`
- To Market Researcher → `tasks/operations/market-researcher/brief-[YYYY-MM-DD]-[feature].md`
- To Product Researcher → `tasks/operations/product-researcher/brief-[YYYY-MM-DD]-[feature].md`
- To Advertising Specialist → `tasks/operations/advertising-specialist/brief-[YYYY-MM-DD]-[feature].md`

**Brief template:**

```
# [YOUR ROLE] TASK BRIEF — [RECIPIENT ROLE] — [DATE]

**MILESTONE:** [same as source brief]
**TASK:** [one sentence — what the recipient must do]
**PRIORITY:** P[1–5] — [label]. [One sentence reason — if unchanged from source, say "Preserved from [source role] brief."]
**DUE:** [date or condition]

## Context
[Add your context here — what the recipient needs to know to execute. Reference the source brief if needed.]

## Acceptance Criteria
[List what a passing deliverable must include — specific and verifiable.]

## Constraints
[List any non-negotiables the recipient must not deviate from.]
```

**Step 5 — End your response with the NEXT ACTION block.**

```
---
NEXT ACTION
Open:  [recipient role]
Say:   "You are the [Role]. Check your inbox."
Why:   [Feature] brief cascaded — [one sentence on what's waiting and why it's time-sensitive].
---
```
