import Link from "next/link";
import { Container } from "@/components/ui/container";

const footerLinks = [
  {
    heading: "Products",
    links: [
      { label: "AI Agents", href: "/products/agents" },
      { label: "Workflows", href: "/products/workflows" },
      { label: "Unified Search", href: "/products/unified-search" },
      { label: "Integrations", href: "/products/agents#integrations" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "IT Services", href: "/solutions/it-services" },
      { label: "Financial Services", href: "/solutions/financial-services" },
      { label: "Healthcare", href: "/solutions/healthcare" },
      { label: "Retail", href: "/solutions/retail" },
      { label: "All industries", href: "/solutions" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Guides", href: "/resources/guides" },
      { label: "Webinars", href: "/resources/webinars" },
      { label: "Documentation", href: "/resources/docs" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about/company" },
      { label: "Careers", href: "/about/careers" },
      { label: "Trust & Security", href: "/about/trust" },
      { label: "Contact", href: "/about/contact" },
      { label: "Customers", href: "/customers" },
    ],
  },
];

const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-slate-50/50">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white">
                  Z
                </div>
                ZUUZ
              </Link>
              <p className="mt-3 max-w-xs text-sm text-slate-500 leading-relaxed">
                The intelligent platform for enterprise automation. Agents, workflows, and search — unified.
              </p>
              <div className="mt-4 flex gap-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="text-xs font-medium text-slate-400 transition-colors hover:text-slate-600"
                    aria-label={s.label}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {footerLinks.map((col) => (
              <div key={col.heading}>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {col.heading}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-500 transition-colors hover:text-slate-900"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-xs text-slate-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} ZUUZ, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600">Terms of Service</a>
            <a href="#" className="hover:text-slate-600">Cookie Policy</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
