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
          { label: "AI Agents", href: "/products/agents", description: "Autonomous agents that handle complex tasks end-to-end" },
          { label: "Workflows", href: "/products/workflows", description: "Automate multi-step processes with intelligent orchestration" },
          { label: "Unified Search", href: "/products/unified-search", description: "Search across every tool and data source in one query" },
        ],
      },
      {
        label: "Capabilities",
        links: [
          { label: "Integrations", href: "/products/agents#integrations", description: "Connect to 200+ enterprise tools" },
          { label: "Security", href: "/about/trust", description: "Enterprise-grade security & compliance" },
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
          { label: "Our Story", href: "/about/company", description: "Mission, vision, and team" },
          { label: "Careers", href: "/about/careers", description: "Join the team building the future of work" },
          { label: "Trust & Security", href: "/about/trust", description: "Compliance, privacy, and security" },
          { label: "Contact", href: "/about/contact", description: "Get in touch with our team" },
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
