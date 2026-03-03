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
          { label: "IT Services", href: "/solutions/it-services" },
          { label: "Financial Services", href: "/solutions/financial-services" },
          { label: "Healthcare", href: "/solutions/healthcare" },
          { label: "Insurance", href: "/solutions/insurance" },
        ],
      },
      {
        label: "More Industries",
        links: [
          { label: "Distribution", href: "/solutions/distribution" },
          { label: "Retail", href: "/solutions/retail" },
          { label: "Logistics", href: "/solutions/logistics" },
          { label: "Manufacturing", href: "/solutions/manufacturing" },
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
        label: "Content",
        links: [
          { label: "Blog", href: "/resources", description: "Insights on enterprise AI, agents, and operations" },
          { label: "Product Manuals", href: "/resources", description: "Agent one-pagers and product guides (PDF)" },
          { label: "Industry Guides", href: "/resources", description: "Industry-specific solution documents (PDF)" },
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
          { label: "Our Story", href: "/about/our-story", description: "How a repeating enterprise pain became a platform" },
          { label: "Careers", href: "/about/careers", description: "Build the operating layer for modern enterprises" },
          { label: "Trust & Security", href: "/about/trust-security", description: "SOC 2 Type I. On-prem. Immutable audit trails." },
          { label: "Contact", href: "/about/contact", description: "Offices in California, UAE, and India" },
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
