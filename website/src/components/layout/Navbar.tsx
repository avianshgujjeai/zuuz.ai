"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Btn } from "@/components/ui/Btn";

const NAV_LINKS = [
  { label: "Platform",  href: "/products/ai-agents" },
  { label: "Solutions", href: "/solutions" },
  { label: "Customers", href: "/customers" },
  { label: "Resources", href: "/resources" },
  { label: "About",     href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
          height: 68,
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "0 24px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
          }}
        >
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
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={`navbar-link ${isActive(href) ? "navbar-link-active" : ""}`}
                style={{
                  fontSize: 14,
                  fontWeight: isActive(href) ? 600 : 500,
                  color: isActive(href) ? "#2563EB" : "#475569",
                  padding: "6px 14px",
                  borderRadius: 10,
                  textDecoration: "none",
                  transition: "color 0.15s ease",
                  fontFamily: "var(--font-body)",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="navbar-ctas" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <Btn variant="ghost" size="sm" href="/about/contact">Sign in</Btn>
            <Btn variant="primary" size="sm" href="/about/contact">Request demo →</Btn>
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
        <div
          style={{
            position: "fixed",
            top: 68,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#fff",
            zIndex: 49,
            padding: "24px 24px 40px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            overflowY: "auto",
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: isActive(href) ? "#2563EB" : "#0A0F1E",
                fontWeight: isActive(href) ? 700 : 500,
                fontSize: 18,
                fontFamily: "var(--font-body)",
                padding: "14px 0",
                borderBottom: "1px solid #F1F5F9",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          ))}
          <div style={{ marginTop: 24 }}>
            <Btn variant="primary" size="lg" href="/about/contact" className="w-full justify-center">
              Request a demo →
            </Btn>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .navbar-desktop { display: none !important; }
          .navbar-ctas    { display: none !important; }
          .navbar-hamburger { display: flex !important; }
        }
        .navbar-link:hover { color: #2563EB !important; }
      `}</style>
    </>
  );
}

export default Navbar;
