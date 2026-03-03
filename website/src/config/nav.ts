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
}

export const navItems: NavItem[] = [
  {
    label: "Products",
    href: "/",
    groups: [
      {
        label: "Platform",
        links: [
          { label: "AI Agents", href: "/products/ai-agents", description: "End-to-end agents for sales, procurement, legal, and more" },
          { label: "Workflows", href: "/products/workflows", description: "Import and automate your existing business processes" },
          { label: "Unified Search", href: "/products/unified-search", description: "One search across every tool—with citations and actions" },
        ],
      },
      {
        label: "AI Agents",
        links: [
          { label: "Sales Agent", href: "/products/agents/sales" },
          { label: "Procurement Agent", href: "/products/agents/procurement" },
          { label: "Email Agent", href: "/products/agents/email" },
          { label: "Document Agent", href: "/products/agents/documents" },
          { label: "Meeting Agent", href: "/products/agents/meetings" },
          { label: "HR Agent", href: "/products/agents/hr" },
          { label: "Legal Agent", href: "/products/agents/legal" },
          { label: "Logistics Agent", href: "/products/agents/logistics" },
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
        label: "Learn",
        links: [
          { label: "Blog", href: "/resources/blog", description: "Latest insights and product updates" },
          { label: "Guides", href: "/resources/guides", description: "Step-by-step implementation guides" },
          { label: "Webinars", href: "/resources/webinars", description: "Live and on-demand sessions" },
        ],
      },
      {
        label: "Develop",
        links: [
          { label: "Documentation", href: "/resources/docs", description: "API reference and tutorials" },
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
