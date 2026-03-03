export interface ContextPackItem {
  slug: string;
  title: string;
  description: string;
  meta: { title: string; description: string };
}

export const contextPackItems: ContextPackItem[] = [
  {
    slug: "policy",
    title: "Policy Evidence",
    description: "ZUUZ attaches the relevant policy text, version, and applicability rules to every approval request. Approvers see exactly which policy applies and what it requires — no lookups needed.",
    meta: { title: "Policy Evidence — ZUUZ Context Pack", description: "How ZUUZ assembles policy evidence into every approval context pack." },
  },
  {
    slug: "budget",
    title: "Budget Context",
    description: "Every spend-related decision includes current budget allocation, remaining balance, prior commitments, and forecast impact. Budget context is pulled from your ERP and finance systems in real time.",
    meta: { title: "Budget Context — ZUUZ Context Pack", description: "How ZUUZ surfaces budget data for every approval decision." },
  },
  {
    slug: "contract-terms",
    title: "Contract Terms",
    description: "For vendor and procurement decisions, ZUUZ extracts and attaches the relevant contract clauses, pricing terms, SLA commitments, and renewal conditions from your CLM or document repository.",
    meta: { title: "Contract Terms — ZUUZ Context Pack", description: "How ZUUZ includes contract terms in approval context packs." },
  },
  {
    slug: "risk-flags",
    title: "Risk Flags",
    description: "ZUUZ evaluates each request against risk indicators — compliance violations, threshold breaches, vendor performance issues, and anomaly patterns — and surfaces them as flags in the context pack.",
    meta: { title: "Risk Flags — ZUUZ Context Pack", description: "How ZUUZ flags risks automatically in every approval context pack." },
  },
  {
    slug: "prior-history",
    title: "Prior History",
    description: "Each approval includes relevant precedents: past exceptions for the same rule, prior approvals for the same vendor, historical spend patterns, and previous decision outcomes.",
    meta: { title: "Prior History — ZUUZ Context Pack", description: "How ZUUZ surfaces prior approvals and precedent data." },
  },
  {
    slug: "compliance-docs",
    title: "Compliance Documentation",
    description: "Regulatory requirements, certification statuses, audit findings, and compliance checklists are attached automatically. For regulated industries, this ensures every decision meets documentation standards.",
    meta: { title: "Compliance Docs — ZUUZ Context Pack", description: "How ZUUZ attaches compliance documentation to every context pack." },
  },
];

export function getContextPackItem(slug: string): ContextPackItem | undefined {
  return contextPackItems.find((c) => c.slug === slug);
}

export function getAllContextPackSlugs(): string[] {
  return contextPackItems.map((c) => c.slug);
}
