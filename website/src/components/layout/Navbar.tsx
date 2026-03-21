"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const BLUE = "#0018FF";
const F = "'Montserrat', sans-serif";

interface DropItem {
  label: string;
  href: string;
  desc: string;
  icon: string;
}

interface DropGroup {
  heading?: string;
  items: DropItem[];
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: DropGroup[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Platform",
    href: "/products/ai-agents",
    dropdown: [
      {
        heading: "AI Agents",
        items: [
          { label: "Sales Agent",       href: "/products/ai-agents", icon: "💼", desc: "Pipeline updates, follow-ups, CRM write-back."     },
          { label: "Finance Agent",     href: "/products/ai-agents", icon: "📊", desc: "Invoice processing, approvals, ERP reconciliation." },
          { label: "HR Agent",          href: "/products/ai-agents", icon: "👥", desc: "Onboarding, policy routing, HRIS write-back."       },
          { label: "IT Agent",          href: "/products/ai-agents", icon: "🖥", desc: "Ticket triage, resolution routing, ITSM updates."   },
          { label: "Procurement Agent", href: "/products/ai-agents", icon: "📦", desc: "PO creation, vendor routing, ERP updates."          },
          { label: "Legal Agent",       href: "/products/ai-agents", icon: "⚖", desc: "Contract review, clause flagging, approval routing." },
          { label: "Ops Agent",         href: "/products/ai-agents", icon: "⚙", desc: "Cross-system task execution with policy gates."      },
          { label: "Executive Agent",   href: "/products/ai-agents", icon: "🎯", desc: "Briefings, reports, strategic context assembly."    },
        ],
      },
      {
        heading: "Platform",
        items: [
          { label: "Workflows",      href: "/products/workflows",      icon: "🔄", desc: "Governed workflows with approval gates and audit trails."       },
          { label: "Unified Search", href: "/products/unified-search", icon: "🔍", desc: "Search email, docs, CRM, ERP in one permission-safe query." },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    dropdown: [
      {
        heading: "By Industry",
        items: [
          { label: "IT Services",   href: "/solutions/it-services",   icon: "💻", desc: "Ticket automation, SLA enforcement, ITSM write-back." },
          { label: "Distribution",  href: "/solutions/distribution",  icon: "🚚", desc: "Order processing, vendor coordination, ERP sync."     },
          { label: "Finance",       href: "/solutions/finance",       icon: "🏦", desc: "Invoice workflows, compliance routing, audit trails."  },
          { label: "Healthcare",    href: "/solutions/healthcare",    icon: "🏥", desc: "Credentialing, scheduling, EHR write-back."            },
          { label: "Insurance",     href: "/solutions/insurance",     icon: "🛡", desc: "Claims routing, policy review, carrier integration."  },
          { label: "Retail",        href: "/solutions/retail",        icon: "🛍", desc: "Store ops, inventory, supplier coordination."         },
          { label: "Logistics",     href: "/solutions/logistics",     icon: "📍", desc: "Fleet routing, carrier updates, delivery exceptions." },
          { label: "Manufacturing", href: "/solutions/manufacturing", icon: "🏭", desc: "Production scheduling, quality gates, ERP sync."      },
        ],
      },
    ],
  },
  {
    label: "Customers",
    href: "/customers",
    dropdown: [
      {
        heading: "Case Studies",
        items: [
          { label: "Western International", href: "/customers", icon: "🏢", desc: "SAP + M365 automation across UAE operations." },
          { label: "Nesto Group",           href: "/customers", icon: "🛒", desc: "Retail ops automation with SAP + M365."        },
          { label: "RA Technologies",       href: "/customers", icon: "💡", desc: "Zoho + M365 workflows for US SMB ops."         },
          { label: "Cloud Box",             href: "/customers", icon: "☁", desc: "Zoho + M365 deployment for UAE MSP."           },
        ],
      },
      {
        heading: "Partners",
        items: [
          { label: "Become a Partner", href: "/about/contact", icon: "🤝", desc: "Join the ZUUZ partner ecosystem." },
        ],
      },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    dropdown: [
      {
        items: [
          { label: "Blog",         href: "/resources", icon: "📝", desc: "Insights on enterprise AI and agentic workflows." },
          { label: "Docs",         href: "/resources", icon: "📚", desc: "Technical guides, API docs, integration manuals."  },
          { label: "Case Studies", href: "/customers", icon: "📈", desc: "Real deployments, real outcomes."                 },
          { label: "Webinars",     href: "/resources", icon: "🎥", desc: "Live and recorded sessions with the ZUUZ team."   },
        ],
      },
    ],
  },
  {
    label: "About",
    href: "/about",
    dropdown: [
      {
        items: [
          { label: "Company", href: "/about",         icon: "🏛", desc: "Our mission, team, and story."                 },
          { label: "Contact", href: "/about/contact", icon: "✉", desc: "Get in touch with our team."                   },
          { label: "Careers", href: "/about",         icon: "🚀", desc: "Join us to build the future of enterprise AI." },
          { label: "Press",   href: "/about",         icon: "📰", desc: "Media kit, logos, and press inquiries."        },
        ],
      },
    ],
  },
];

function DropdownPanel({ groups }: { groups: DropGroup[] }) {
  const totalItems = groups.reduce((a, g) => a + g.items.length, 0);
  return (
    <div style={{
      position: "absolute",
      top: "calc(100% + 6px)",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#ffffff",
      border: "1px solid #E8E8EE",
      borderRadius: 14,
      boxShadow: "0 16px 48px rgba(0,0,0,0.11), 0 4px 16px rgba(0,0,0,0.06)",
      padding: "10px 12px",
      minWidth: totalItems > 5 ? 520 : 200,
      zIndex: 100,
      display: "grid",
      gridTemplateColumns: groups.length > 1 ? `repeat(${groups.length}, 1fr)` : "1fr",
      gap: 12,
    }}>
      {groups.map((g, gi) => (
        <div key={gi}>
          {g.heading && (
            <p style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#AAAAAA",
              fontFamily: F,
              marginBottom: 8,
              paddingBottom: 4,
              borderBottom: "1px solid #F0F0F5",
            }}>{g.heading}</p>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {g.items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  display: "block",
                  padding: "3px 6px",
                  borderRadius: 6,
                  textDecoration: "none",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#F5F6FF")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <p style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#111111",
                  fontFamily: F,
                  marginBottom: 1,
                  lineHeight: 1.3,
                  margin: "0 0 1px",
                }}>
                  {item.label}
                </p>
                <p style={{
                  fontSize: 10,
                  color: "#666666",
                  fontFamily: F,
                  lineHeight: 1.3,
                  margin: 0,
                }}>
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setActiveNav(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function handleMouseEnter(label: string) {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveNav(label);
  }

  function handleMouseLeave() {
    timerRef.current = setTimeout(() => setActiveNav(null), 120);
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid #EEEEF5",
        height: 68,
      }}>
        <div style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 24px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
        }}>
          {/* Logo */}
          <Link href="/" aria-label="ZUUZ home" style={{ flexShrink: 0 }}>
            <Image
              src="/brand/zuuz-logo.png"
              alt="ZUUZ"
              width={92}
              height={30}
              priority
              style={{ height: 30, width: "auto", display: "block" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="navbar-desktop" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                style={{ position: "relative" }}
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 14,
                    fontWeight: isActive(item.href) ? 600 : 500,
                    color: isActive(item.href) ? BLUE : "#475569",
                    padding: "6px 14px",
                    borderRadius: 10,
                    textDecoration: "none",
                    transition: "color 0.15s ease",
                    fontFamily: F,
                  }}
                >
                  {item.label}
                  {item.dropdown && (
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{
                      transition: "transform 0.15s ease",
                      transform: activeNav === item.label ? "rotate(180deg)" : "none",
                      opacity: 0.5,
                    }}>
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </Link>
                {item.dropdown && activeNav === item.label && (
                  <div
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <DropdownPanel groups={item.dropdown} />
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="navbar-ctas" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <Link href="/about/contact" style={{
              padding: "8px 18px",
              background: "transparent",
              color: "#475569",
              border: "1px solid #DDD",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: F,
              textDecoration: "none",
            }}>
              Sign in
            </Link>
            <Link href="/about/contact" style={{
              padding: "9px 20px",
              background: BLUE,
              color: "#FFFFFF",
              border: "none",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: F,
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(0,24,255,0.25)",
            }}>
              Request demo →
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="navbar-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              flexDirection: "column",
              gap: 5,
            }}
          >
            <span style={{
              display: "block", width: 22, height: 2, background: "#0A0F1E", borderRadius: 2,
              transition: "all 0.2s ease",
              transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none",
            }} />
            <span style={{
              display: "block", width: 22, height: 2, background: "#0A0F1E", borderRadius: 2,
              transition: "all 0.2s ease",
              opacity: mobileOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block", width: 22, height: 2, background: "#0A0F1E", borderRadius: 2,
              transition: "all 0.2s ease",
              transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{
          position: "fixed",
          top: 68,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#fff",
          zIndex: 49,
          padding: "16px 24px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 0,
          overflowY: "auto",
        }}>
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <div
                onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 0",
                  borderBottom: "1px solid #F1F5F9",
                  cursor: "pointer",
                }}
              >
                <span style={{
                  color: isActive(item.href) ? BLUE : "#0A0F1E",
                  fontWeight: isActive(item.href) ? 700 : 500,
                  fontSize: 17,
                  fontFamily: F,
                }}>{item.label}</span>
                {item.dropdown && (
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{
                    transform: mobileExpanded === item.label ? "rotate(180deg)" : "none",
                    transition: "transform 0.15s ease",
                  }}>
                    <path d="M1 1l4 4 4-4" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              {item.dropdown && mobileExpanded === item.label && (
                <div style={{ padding: "8px 0 4px 16px" }}>
                  {item.dropdown.flatMap(g => g.items).map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 0",
                        color: "#334155",
                        fontSize: 14,
                        fontFamily: F,
                        textDecoration: "none",
                        borderBottom: "1px solid #F8FAFC",
                      }}
                    >
                      <span style={{ fontSize: 14 }}>{subItem.icon}</span>
                      <span style={{ fontWeight: 500 }}>{subItem.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div style={{ marginTop: 24 }}>
            <Link href="/about/contact" style={{
              display: "flex",
              justifyContent: "center",
              padding: "14px",
              background: BLUE,
              color: "#FFFFFF",
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 600,
              fontFamily: F,
              textDecoration: "none",
            }}>
              Request a demo →
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .navbar-desktop { display: none !important; }
          .navbar-ctas    { display: none !important; }
          .navbar-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

export default Navbar;
