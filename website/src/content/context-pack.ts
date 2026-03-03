export interface ContextPackItem {
  slug: string;
  title: string;
  description: string;
  bullets: string[];
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
    meta: { title: "Compliance Docs — ZUUZ Context Pack", description: "How ZUUZ attaches compliance documentation to every context pack." },
  },
];

export function getContextPackItem(slug: string): ContextPackItem | undefined {
  return contextPackItems.find((c) => c.slug === slug);
}

export function getAllContextPackSlugs(): string[] {
  return contextPackItems.map((c) => c.slug);
}
