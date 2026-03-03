export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  links: NavLink[];
}

export interface NavItem {
  label: string;
  href: string;
  groups?: NavGroup[];
  customMega?: "products";
}

export const navItems: NavItem[] = [
  {
    label: "Products",
    href: "/",
    customMega: "products",
    groups: [
      {
        label: "Platform",
        links: [
          { label: "Persona Copilots", href: "/products/ai-agents", description: "Role-based copilots for Sales, Procurement, Ops, HR, and Legal — grounded in your systems, governed by policy, and designed to take action (not just answer)." },
          { label: "Execution Flows", href: "/products/workflows", description: "Import your existing CRM/ERP/ITSM processes and run approvals end-to-end with guardrails, audit trails, and write-back to systems of record." },
          { label: "Evidence Search", href: "/products/unified-search", description: "One permission-aware search across every tool — answers with citations plus the next best action in the same workspace." },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    groups: [
      {
        label: "By Industry",
        links: [
          { label: "IT Services", href: "/solutions/it-services", description: "Speed up approvals for change requests, deal desk, onboarding, and customer delivery — with policy gates and audit trails." },
          { label: "Distribution", href: "/solutions/distribution", description: "Automate replenishment, pricing exceptions, vendor onboarding, and returns — with evidence packs for every decision." },
          { label: "Financial Services", href: "/solutions/financial-services", description: "Route spend, vendor, and policy exceptions safely — permission-aware, auditable, and ready for regulated environments." },
          { label: "Healthcare", href: "/solutions/healthcare", description: "Accelerate procurement and operations while reducing compliance gaps — with evidence automatically assembled for approvals." },
        ],
      },
      {
        label: "More Industries",
        links: [
          { label: "Insurance", href: "/solutions/insurance", description: "Resolve claims and policy exceptions faster — with evidence-backed decisions, human-in-the-loop controls, and audit logs." },
          { label: "Retail", href: "/solutions/retail", description: "Approve promotions, pricing, and vendor operations without slowing stores down — with real-time evidence and safe execution." },
          { label: "Logistics", href: "/solutions/logistics", description: "Run exception-first operations — delays, reroutes, claims, and escalations — with full context and controlled actions." },
          { label: "Manufacturing", href: "/solutions/manufacturing", description: "Prevent line stoppages and reduce procurement leakage — supplier onboarding, MRO approvals, and compliance checks with evidence packs." },
        ],
      },
    ],
  },
  {
    label: "Customers",
    href: "/customers",
  },
  {
    label: "Resources",
    href: "/resources",
    groups: [
      {
        label: "Browse",
        links: [
          { label: "Resource Hub", href: "/resources", description: "Browse articles, manuals, and industry guides — designed for operators, not just readers." },
          { label: "Blog", href: "/resources/blog/agentic-ai-explained", description: "Practical insights on execution-first AI, approvals, and enterprise operations." },
          { label: "Manuals", href: "/resources/manuals/industries", description: "Product manuals and quick-start guides for copilots, execution flows, and evidence search." },
          { label: "Industry Guides", href: "/resources/manuals/industries", description: "Industry-specific solution documents and playbooks (Healthcare, Finance, Manufacturing, Construction, etc.)." },
        ],
      },
      {
        label: "Popular",
        links: [
          { label: "Agentic AI Explained", href: "/resources/blog/agentic-ai-explained", description: "What it is, why it matters, and how enterprises use it safely." },
          { label: "Agentic AI vs AI Agents", href: "/resources/blog/agentic-ai-vs-ai-agents", description: "A clear differentiation for operators." },
          { label: "Top 7 Reasons Businesses Choose ZUUZ", href: "/resources/blog/top-7-reasons-businesses-choose-zuuz", description: "Why operators adopt ZUUZ for execution and governance." },
        ],
      },
    ],
  },
  {
    label: "About Us",
    href: "/about",
    groups: [
      {
        label: "Company",
        links: [
          { label: "Our Story", href: "/about/our-story", description: "Built from firsthand enterprise deployment experience — solving the gap between \"answers\" and \"executed outcomes.\"" },
          { label: "Careers", href: "/about/careers", description: "Join the team building the execution layer for enterprise work — engineering roles in India and GTM roles in the USA." },
          { label: "Trust & Security", href: "/about/trust-security", description: "Leadership credibility plus security posture — SOC 2 Type I aligned controls, audit trails, and on-prem/private deployments." },
          { label: "Contact", href: "/about/contact", description: "Talk to our team — headquarters in California with presence in UAE and India." },
        ],
      },
    ],
  },
];

export function getAllNavLinks(): NavLink[] {
  const links: NavLink[] = [];
  for (const item of navItems) {
    links.push({ label: item.label, href: item.href });
    if (item.groups) {
      for (const group of item.groups) {
        for (const link of group.links) {
          links.push(link);
        }
      }
    }
  }
  return links;
}
