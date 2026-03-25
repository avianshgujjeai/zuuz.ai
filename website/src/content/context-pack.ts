export interface ContextPackItem {
  slug: string;
  title: string;
  description: string;
  bullets: string[];
  expandedContent: { heading: string; body: string };
  meta: { title: string; description: string };
}

export const contextPackItems: ContextPackItem[] = [
  {
    slug: "policy",
    title: "Policy Evidence",
    description: "ZUUZ attaches the relevant policy text, version, and applicability rules to every approval request.",
    bullets: [
      "Full policy text attached to the approval context — no separate lookups",
      "Version tracking ensures the current policy is always applied",
      "Applicability rules matched to the request type, amount, and department",
      "Policy exceptions flagged with prior precedent data",
      "Linked to compliance documentation for audit readiness",
    ],
    expandedContent: {
      heading: "Why Policy Evidence Is the Missing Link in Enterprise Approvals",
      body: "Every enterprise has policies. The problem is that policies live in one system while approvals happen in another. Approvers routinely make decisions without seeing the policy text — and when exceptions are challenged in an audit, no one can prove the policy was applied correctly. ZUUZ changes this by pulling the exact policy clause relevant to each request — the right version, the right applicability rule — and attaching it directly to the approval context. The approver sees the policy, the request, and the compliance linkage in one view. Every exception is flagged against prior precedent. Every decision is logged against the policy version that governed it. That's how ZUUZ turns policy from a filing cabinet into an active control layer.",
    },
    meta: { title: "Policy Evidence — ZUUZ Context Pack", description: "How ZUUZ assembles policy evidence into every approval context pack." },
  },
  {
    slug: "budget",
    title: "Budget Context",
    description: "Every spend-related decision includes current budget allocation, remaining balance, and forecast impact.",
    bullets: [
      "Current budget allocation and remaining balance pulled from ERP in real time",
      "Prior commitments and encumbrances included in available balance",
      "Forecast impact calculated before approval is routed",
      "Budget owner and approval chain identified automatically",
      "Historical spend patterns for the same category surfaced as context",
    ],
    expandedContent: {
      heading: "Why Budget Context Must Be Real-Time — Not a Snapshot",
      body: "Budget approvals fail silently all the time. A request gets approved on Monday using Tuesday's balance sheet — but three other requests were approved in parallel, and the budget was already committed. By the time finance reconciles, the overrun has happened. ZUUZ pulls available balance directly from your ERP at the moment of routing, accounting for encumbrances, pending approvals, and prior commitments. The approver sees the true available budget — not a stale export. Forecast impact is calculated before the approval, not after. And because every approval runs through the same system, parallel overspend is caught before it happens.",
    },
    meta: { title: "Budget Context — ZUUZ Context Pack", description: "How ZUUZ surfaces budget data for every approval decision." },
  },
  {
    slug: "contract-terms",
    title: "Contract Terms",
    description: "Relevant contract clauses, pricing terms, and SLA commitments extracted and attached automatically.",
    bullets: [
      "Key clauses extracted from contracts in your CLM or document repository",
      "Pricing terms and discount schedules matched to the approval request",
      "SLA commitments and performance history included",
      "Renewal dates, termination clauses, and obligations surfaced proactively",
      "Deviations from standard terms flagged for reviewer attention",
    ],
    expandedContent: {
      heading: "Why Contract Terms Matter for Approval Decisions",
      body: "Most enterprise approvals fail because the reviewer doesn't have the right contract context at the moment of decision. They open a separate CLM, search for the contract, read through clauses, cross-reference the pricing schedule — and by the time they have the full picture, hours or days have passed. ZUUZ assembles the relevant contract terms automatically: the pricing schedule that governs this request, the SLA commitments in scope, the deviation from standard terms that requires escalation. The approver sees everything in one view without leaving the approval workflow. Renewal deadlines surface proactively. Non-standard terms are flagged before they create liability. The result: faster approvals with better contract compliance — not slower approvals with more process.",
    },
    meta: { title: "Contract Terms — ZUUZ Context Pack", description: "How ZUUZ includes contract terms in approval context packs." },
  },
  {
    slug: "risk-flags",
    title: "Risk Flags",
    description: "Each request is evaluated against risk indicators and anomalies, with flags surfaced in the context pack.",
    bullets: [
      "Compliance violation indicators checked against your policy rules",
      "Spend threshold breaches flagged before routing to approver",
      "Vendor performance issues and scorecard data included",
      "Anomaly detection on request patterns (frequency, amount, timing)",
      "Risk severity scoring to prioritize reviewer attention",
    ],
    expandedContent: {
      heading: "How AI Risk Flagging Changes the Speed of Enterprise Decision-Making",
      body: "Reviewers can't manually check every approval against every risk dimension. They don't have time to pull vendor scorecards, cross-reference compliance watchlists, and run anomaly analysis on spending patterns — so most of them don't. ZUUZ runs all of this automatically, before the approval ever reaches a human. Risk flags aren't a separate report the reviewer has to go find — they're embedded directly in the approval context, ranked by severity. A spend threshold breach surfaces before the approver clicks approve. A vendor with an open compliance issue gets flagged before the PO is issued. Anomalous request frequency triggers an alert before the pattern becomes a problem. The result is faster approval for clean requests and automatic escalation for risky ones — without adding review steps.",
    },
    meta: { title: "Risk Flags — ZUUZ Context Pack", description: "How ZUUZ flags risks automatically in every approval context pack." },
  },
  {
    slug: "prior-history",
    title: "Prior History",
    description: "Past exceptions, approvals, and decision outcomes for the same rule, vendor, or category — assembled automatically.",
    bullets: [
      "Previous exceptions for the same policy rule with outcomes shown",
      "Prior approvals for the same vendor, category, or department",
      "Historical spend patterns and trends for the approval type",
      "Decision rationale from prior approvals (when documented)",
      "Precedent data helps maintain consistency across approvers",
    ],
    expandedContent: {
      heading: "Why Prior Approval History Is the Key to Consistent Enterprise Decisions",
      body: "Inconsistency in enterprise approvals is one of the most expensive invisible problems in operations. Two similar requests get different outcomes because different approvers applied the same policy differently. One department gets a discount approved that another department was denied. An exception gets granted for the tenth time while the policy still technically prohibits it. ZUUZ surfaces the full prior history for every approval: what was approved, what was denied, what exceptions were made, and what rationale was documented. Approvers see precedent before they decide — which means similar requests get consistent outcomes, pattern anomalies surface before they become audit findings, and institutional knowledge stops living only in individual approvers' heads.",
    },
    meta: { title: "Prior History — ZUUZ Context Pack", description: "How ZUUZ surfaces prior approvals and precedent data." },
  },
  {
    slug: "compliance-docs",
    title: "Compliance Documentation",
    description: "Regulatory requirements, certifications, and audit checklists attached for every decision in regulated contexts.",
    bullets: [
      "Regulatory requirements matched to the request type and jurisdiction",
      "Vendor and supplier certification statuses verified automatically",
      "Audit findings and open remediation items surfaced as context",
      "Documentation checklists pre-populated with required attachments",
      "Compliance status tracked across the approval lifecycle",
    ],
    expandedContent: {
      heading: "How ZUUZ Makes Compliance Documentation a Live Control Layer, Not a Checkbox",
      body: "Most enterprise compliance documentation lives in a folder that nobody checks until there's an audit. Vendor certifications expire unnoticed. Regulatory requirements change while old processes still run. Open audit findings sit in a spreadsheet while business continues as usual. ZUUZ connects compliance documentation to the approval workflow directly — so when a purchase request routes for approval, the vendor's current certification status is already verified, the relevant regulatory requirement is already attached, and any open remediation items are surfaced before the approval is granted. Documentation checklists are pre-populated with what's required for this specific request type and jurisdiction. Compliance isn't a gate that slows decisions — it's a layer that prevents non-compliant decisions from being made in the first place.",
    },
    meta: { title: "Compliance Docs — ZUUZ Context Pack", description: "How ZUUZ attaches compliance documentation to every context pack." },
  },
];

export function getContextPackItem(slug: string): ContextPackItem | undefined {
  return contextPackItems.find((c) => c.slug === slug);
}

export function getAllContextPackSlugs(): string[] {
  return contextPackItems.map((c) => c.slug);
}
