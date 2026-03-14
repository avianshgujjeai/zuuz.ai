import Link from "next/link";
import Image from "next/image";

const PRODUCTS = [
  { label: "Persona Copilots",  href: "/products/ai-agents" },
  { label: "Execution Flows",   href: "/products/workflows" },
  { label: "Evidence Search",   href: "/products/unified-search" },
];

const SOLUTIONS = [
  { label: "IT Services",         href: "/solutions/it-services" },
  { label: "Financial Services",  href: "/solutions/financial-services" },
  { label: "Healthcare",          href: "/solutions/healthcare" },
  { label: "Distribution",        href: "/solutions/distribution" },
  { label: "Manufacturing",       href: "/solutions/manufacturing" },
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

function FooterCol({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p style={{
        fontSize: 11,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "#94a3b8",
        marginBottom: 14,
        fontFamily: "'Inter', sans-serif",
      }}>
        {heading}
      </p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              style={{
                fontSize: 13,
                color: "#64748B",
                textDecoration: "none",
                fontFamily: "'Inter', sans-serif",
                transition: "color 0.15s ease",
              }}
              className="zuuz-footer-link"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer style={{ background: "#fff", borderTop: "1px solid #DCE3F1" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "56px 24px 40px",
        }}
      >
        {/* Top grid */}
        <div
          className="zuuz-footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "240px 1fr 1fr 1fr 1fr",
            gap: 40,
            marginBottom: 48,
          }}
        >
          {/* Brand column */}
          <div style={{ maxWidth: 240 }}>
            <Link href="/" aria-label="ZUUZ home">
              <Image
                src="/brand/zuuz-logo.png"
                alt="ZUUZ"
                width={84}
                height={26}
                style={{ height: 26, width: "auto", marginBottom: 14 }}
              />
            </Link>
            <p style={{
              fontSize: 13,
              color: "#64748B",
              lineHeight: 1.6,
              maxWidth: 210,
              fontFamily: "'Inter', sans-serif",
              margin: "0 0 16px",
            }}>
              The Agentic AI execution layer for enterprise work. Decision. Execution. AI Workspace.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <a
                href="https://linkedin.com/company/zuuz-ai"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#64748B",
                  textDecoration: "none",
                  border: "1.5px solid #DCE3F1",
                  borderRadius: 8,
                  padding: "5px 10px",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.15s ease",
                }}
                className="zuuz-footer-social"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com/zuuz_ai"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#64748B",
                  textDecoration: "none",
                  border: "1.5px solid #DCE3F1",
                  borderRadius: 8,
                  padding: "5px 10px",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.15s ease",
                }}
                className="zuuz-footer-social"
              >
                X / Twitter
              </a>
            </div>
          </div>

          <FooterCol heading="Products"  links={PRODUCTS}  />
          <FooterCol heading="Solutions" links={SOLUTIONS} />
          <FooterCol heading="Company"   links={COMPANY}   />
          <FooterCol heading="Resources" links={RESOURCES} />
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid #DCE3F1",
            paddingTop: 24,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <p style={{ fontSize: 12, color: "#94a3b8", fontFamily: "'Inter', sans-serif", margin: 0 }}>
            © 2026 ZUUZ, Inc. All rights reserved. · 440N Wolfe Rd, Sunnyvale, CA 94085
          </p>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms",          href: "/terms" },
              { label: "Cookies",        href: "/cookies" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontSize: 12,
                  color: "#94a3b8",
                  textDecoration: "none",
                  fontFamily: "'Inter', sans-serif",
                  transition: "color 0.15s ease",
                }}
                className="zuuz-footer-link"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .zuuz-footer-link:hover  { color: #0B1324 !important; }
        .zuuz-footer-social:hover {
          border-color: #94a3b8 !important;
          color: #0B1324 !important;
          background: #F8FAFC;
        }
        @media (max-width: 900px) {
          .zuuz-footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 540px) {
          .zuuz-footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
