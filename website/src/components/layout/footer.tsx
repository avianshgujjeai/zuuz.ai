import Link from "next/link";
import Image from "next/image";

const PRODUCTS = [
  { label: "Persona Copilots", href: "/products/ai-agents" },
  { label: "Execution Flows",  href: "/products/workflows" },
  { label: "Evidence Search",  href: "/products/unified-search" },
];

const SOLUTIONS = [
  { label: "IT Services",        href: "/solutions/it-services" },
  { label: "Financial Services", href: "/solutions/financial-services" },
  { label: "Healthcare",         href: "/solutions/healthcare" },
  { label: "Distribution",       href: "/solutions/distribution" },
  { label: "Manufacturing",      href: "/solutions/manufacturing" },
];

const COMPANY = [
  { label: "Our Story",        href: "/about/our-story" },
  { label: "Careers",          href: "/about/careers" },
  { label: "Trust & Security", href: "/about/trust-security" },
  { label: "Contact",          href: "/about/contact" },
  { label: "Customers",        href: "/customers" },
];

const RESOURCES = [
  { label: "Resource Hub",    href: "/resources" },
  { label: "Blog",            href: "/resources/blog/agentic-ai-explained" },
  { label: "Industry Guides", href: "/resources/manuals/industries" },
];

function Col({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="footer-col-heading">{heading}</p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 9 }}>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="footer-col-link">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer style={{ background: "#fff", borderTop: "1px solid var(--border)" }}>
      <div className="footer-inner">
        {/* Top */}
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" aria-label="ZUUZ home">
              <Image
                src="/brand/zuuz-logo.png"
                alt="ZUUZ"
                width={88}
                height={28}
                style={{ height: 28, width: "auto", marginBottom: 14, display: "block" }}
              />
            </Link>
            <p style={{
              fontSize: 13,
              color: "var(--muted)",
              lineHeight: 1.65,
              maxWidth: 200,
              marginBottom: 16,
              fontFamily: "var(--font-body)",
            }}>
              Forged by Insight. Driven by Precision.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <a href="https://linkedin.com/company/zuuz-ai" target="_blank" rel="noopener noreferrer" className="footer-social-btn">
                LinkedIn
              </a>
              <a href="https://twitter.com/zuuz_ai" target="_blank" rel="noopener noreferrer" className="footer-social-btn">
                Twitter
              </a>
            </div>
          </div>

          <Col heading="Products"  links={PRODUCTS}  />
          <Col heading="Solutions" links={SOLUTIONS} />
          <Col heading="Company"   links={COMPANY}   />
          <Col heading="Resources" links={RESOURCES} />
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p style={{ fontSize: 12, color: "var(--faint)", fontFamily: "var(--font-body)", margin: 0 }}>
            © 2026 ZUUZ Inc. · 440 N Wolfe Rd, Sunnyvale CA 94085 | Dubai, UAE | Hyderabad, India
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms",   href: "/terms" },
              { label: "Cookies", href: "/cookies" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="footer-legal-link">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 56px 24px 36px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 200px 1fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 48px;
        }
        .footer-col-heading {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: var(--faint);
          margin-bottom: 14px;
          font-family: var(--font-body);
        }
        .footer-col-link {
          font-size: 13px;
          color: var(--muted);
          text-decoration: none;
          font-family: var(--font-body);
          transition: color 0.15s ease;
          display: block;
        }
        .footer-col-link:hover { color: var(--ink); }
        .footer-brand { max-width: 220px; }
        .footer-social-btn {
          font-size: 12px;
          font-weight: 600;
          color: var(--muted);
          text-decoration: none;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 5px 11px;
          font-family: var(--font-body);
          transition: all 0.15s ease;
          display: inline-block;
        }
        .footer-social-btn:hover {
          color: var(--ink);
          border-color: #CBD5E1;
          background: var(--bg-subtle);
        }
        .footer-bottom {
          border-top: 1px solid var(--border);
          padding-top: 24px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .footer-legal-link {
          font-size: 12px;
          color: var(--faint);
          text-decoration: none;
          font-family: var(--font-body);
          transition: color 0.15s ease;
        }
        .footer-legal-link:hover { color: var(--ink); }
        @media (max-width: 960px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-inner { padding: 40px 20px 28px; }
        }
      `}</style>
    </footer>
  );
}
