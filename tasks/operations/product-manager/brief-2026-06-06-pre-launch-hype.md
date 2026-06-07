# TASK BRIEF — Product Manager — 2026-06-06

**MILESTONE:** Pre-Launch — Advertising and Hype Generation
**PRIORITY:** P2 — High. Operations must build an audience before the app ships. Every week without a pre-launch presence is audience not being built. P2 inherits from CEO brief — cascade unchanged.
**TASK:** Commission Market Researcher, Growth Engineer, and Advertising Specialist on the pre-launch advertising track. Sequencing is mandatory — see below.
**DUE:** All initial deliverables by 2026-06-20. Market Researcher delivers first (June 11) to unblock Advertising Specialist's channel strategy.

---

## CEO Constraints — Pass Through Unchanged to Every Specialist

These are non-negotiable. Include them verbatim in every brief:

1. **Do not position Forkd as a recipe app.** It is the platform for people who make consumable things — recipes are one category, not the whole story.
2. **Creator revenue is the lead differentiator.** No other social food/drink app pays creators on grocery cart conversion. That is the hook in every message.
3. **Nothing launches publicly without CEO approval.** All deliverables are strategy and copy — execution of paid campaigns requires a separate CEO green light.
4. **Grocery integration is a feature, not the lead.** It supports the creator revenue story; it is not the headline.

---

## Sequencing — Mandatory

Three waves. Do not brief the next wave until the previous is complete — except Wave 1 and Wave 2 can overlap on independent work items noted below.

```
Wave 1 — due June 11
  Market Researcher: channel and competitor intelligence
  (Advertising Specialist may begin brand voice + creator list in parallel — see Wave 2 notes)

Wave 2 — due June 16
  Growth Engineer: waitlist and referral infrastructure plan
  Advertising Specialist (partial): brand voice document + seed creator outreach list
  (These do not depend on Market Researcher findings — brief them now)

Wave 3 — due June 20
  Advertising Specialist (final): full pre-launch advertising strategy
  (Requires Market Researcher Wave 1 findings as input — do not accept this deliverable without them)
```

---

## Priority Coordination With Existing Briefs

All three specialists have active P3 briefs from the pre-launch-ops commission. This P2 brief takes priority. Instruct each specialist accordingly:

- **Market Researcher:** Pause competitive landscape (P3, due June 16) until channel intelligence (P2, due June 11) is complete. Resume competitive landscape immediately after. Both deadlines are still valid.
- **Growth Engineer:** Complete waitlist/referral plan (P2, due June 16) before attribution spec (P3, due June 20). Both deadlines are still valid.
- **Advertising Specialist:** Complete pre-launch strategy (P2, due June 20) before App Store listing (P3, due July 15). App Store listing deadline unchanged.

---

## Track A — Market Researcher: Channel and Competitor Intelligence

**MILESTONE:** Pre-Launch — Advertising and Hype Generation
**PRIORITY:** P2 — High. Advertising Specialist cannot finalize channel strategy without this. Delivers first.
**OBJECTIVE:** Answer three questions: (1) Where does the homebrewing, craft ferment, and food creator audience actually live online? (2) What are competitors advertising and what angles are unclaimed? (3) What is a realistic pre-launch audience-building timeline for an app in this category?
**DELIVERABLE FORMAT:** Intelligence report — headline findings first, sourced claims, confidence levels on each major finding
**ACCEPTANCE CRITERIA:**
- [ ] Identifies top 3–5 online communities where homebrewing/craft ferment/food creator audience is concentrated — platform, community name, estimated size, and engagement character (passive consumers vs. active creators)
- [ ] Documents what Yummly, Tasty, Allrecipes, BrewFather, and Meadist are currently advertising — channels used, messaging angles, what is NOT being said (unclaimed angles)
- [ ] States a realistic audience-building timeline for a pre-launch app in the Food & Drink category — with a sourced comparable (another app's documented pre-launch growth, not invented)
- [ ] Each major finding states confidence level (Verified / Estimated / Assumption)
- [ ] Headline finding is the single most actionable channel or angle recommendation — stated first
- [ ] No advocacy disguised as research — findings neutral, channel recommendations labeled as such

**DATA REQUIRED:** Reddit community data (subscriber counts, post frequency), App Store category rankings, competitor social profiles and ad libraries (Meta Ad Library is public), industry pre-launch case studies. No paid tools required.
**DEADLINE:** 2026-06-11 — hard. Advertising Specialist is blocked on channel selection until this delivers.

---

## Track B — Growth Engineer: Waitlist and Referral Infrastructure Plan

**MILESTONE:** Pre-Launch — Advertising and Hype Generation
**PRIORITY:** P2 — High. Pre-launch hype generates traffic with nowhere to go unless capture infrastructure is planned now.
**OBJECTIVE:** Produce a spec answering: How do we capture, track, and activate pre-launch audience interest? Covers three mechanisms: waitlist/email capture, launch-day attribution, and seed creator incentive framing.
**DELIVERABLE FORMAT:** Spec document — each mechanism defined with implementation requirements and success metric
**ACCEPTANCE CRITERIA:**
- [ ] Waitlist/email capture mechanism defined — recommended tool or approach (e.g., simple landing page, Typeform, Supabase table), what data is captured per signup, and how signups are activated at launch
- [ ] Attribution plan defined — how do we know which channel (Reddit post, creator referral, Instagram, TikTok) drove which installs at launch? Specific tracking approach named (UTM parameters, branch.io, App Store campaign tokens, etc.)
- [ ] Creator referral framing defined — what do we offer seed creators to bring their audience? Framing must be consistent with the creator revenue model (badge + monthly requalifying rate + no ceiling)
- [ ] Each mechanism includes: implementation complexity estimate (low / medium / high) and one measurable success metric
- [ ] Attribution logic is traceable to a specific data event — not narrative
- [ ] Creator tier calculations or incentive framing documented with specifics, not prose

**DATA REQUIRED:** `/docs/creator-program.md`, `/docs/architecture.md`. No external data required — this is an internal planning spec.
**DEADLINE:** 2026-06-16

---

## Track C (Wave 2) — Advertising Specialist: Brand Voice + Seed Creator List

**MILESTONE:** Pre-Launch — Advertising and Hype Generation
**PRIORITY:** P2 — High. This partial deliverable does not require Market Researcher input — begin immediately in parallel with Wave 1.
**OBJECTIVE:** Produce two standalone documents that do not depend on channel intelligence: (1) Forkd brand voice guide, and (2) seed creator outreach list of 10–20 targets.
**DELIVERABLE FORMAT:** Two documents — brand voice guide and creator outreach list
**ACCEPTANCE CRITERIA:**
- [ ] Brand voice guide: defines tone, vocabulary, and 2–3 approved content angles for Forkd — written against the constraint that Forkd is NOT a recipe app, it is the platform for consumable crafters
- [ ] Brand voice guide: includes 3 example headline/caption pairs showing the creator revenue hook — "you make things people can eat, drink, or brew — Forkd pays you when your audience buys the ingredients"
- [ ] Brand voice guide: explicitly flags language to avoid (e.g., "recipe app," "food app," grocery-first framing)
- [ ] Seed creator list: 10–20 individual creators identified — name/handle, platform, audience size (estimated), content type (food / homebrew / ferments / spirits / mead), and one sentence on why they are a fit
- [ ] Seed creator list: prioritizes creators whose audience overlaps with Forkd's craft consumables positioning — not generic food influencers
- [ ] All copy is benefit-focused; success metric defined for the outreach goal (e.g., X creators confirmed before launch)

**DATA REQUIRED:** Public creator profiles on Instagram, TikTok, YouTube, Reddit. No paid tools required.
**DEADLINE:** 2026-06-16

---

## Track C (Wave 3) — Advertising Specialist: Full Pre-Launch Advertising Strategy

**MILESTONE:** Pre-Launch — Advertising and Hype Generation
**PRIORITY:** P2 — High. This is the primary deliverable. Do not accept without Market Researcher channel intelligence (Wave 1) in hand.
**OBJECTIVE:** Produce a complete pre-launch advertising strategy that answers: where do we show up, what do we say, and how do we build an audience before the app is live?
**DELIVERABLE FORMAT:** Strategy document — channel plan, content angle, creator outreach plan, App Store pre-order plan, and messaging hierarchy
**ACCEPTANCE CRITERIA:**
- [ ] Channel selection justified by Market Researcher intelligence — names specific communities and platforms with rationale
- [ ] Content angle defined and consistent with CEO constraints — creator revenue is the lead, Forkd is not a recipe app
- [ ] Creator outreach plan built from Wave 2 seed creator list — outreach sequence and message framing included
- [ ] App Store pre-order or early access page plan — copy strategy and screenshot recommendations (M1 gives enough to screenshot)
- [ ] Messaging hierarchy defined: lead message, supporting message, proof point — one version for each primary channel
- [ ] Incorporates Growth Engineer attribution plan (how each channel's performance will be measured)
- [ ] Every channel has a defined success metric (follower target, signup count, etc.)
- [ ] Nothing proposed requires CEO green light before strategy is submitted — execution is separated from planning

**DATA REQUIRED:** Market Researcher Wave 1 intelligence (required input), Growth Engineer waitlist/attribution spec, Advertising Specialist Wave 2 brand voice + creator list. All must be in hand before this brief is issued.
**DEADLINE:** 2026-06-20

---

## PM Sequencing Responsibility

You are responsible for the handoffs:
1. When Market Researcher delivers Wave 1 (June 11): review immediately, pass to Advertising Specialist as input for Wave 3 brief.
2. When Growth Engineer delivers (June 16): review immediately, pass attribution plan to Advertising Specialist as input for Wave 3.
3. When Advertising Specialist delivers Wave 2 (June 16): review immediately.
4. Issue Wave 3 brief to Advertising Specialist only after Wave 1 (MR) and Wave 2 (partial AS) are reviewed and passed.
5. When Advertising Specialist delivers Wave 3 (June 20): review and sign off to COO.

Do not issue the Wave 3 brief before Wave 1 intelligence is in hand. The Advertising Specialist's channel strategy will be wrong without it.
