"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

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
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.93)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid #f1f5f9",
        height: 66,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
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
            width={90}
            height={28}
            priority
            style={{ height: 28, width: "auto" }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav
          className="navbar-desktop"
          style={{ display: "flex", alignItems: "center", gap: 4 }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={{
                color: isActive(href) ? "#2457FF" : "#4b5563",
                fontWeight: isActive(href) ? 700 : 600,
                fontSize: 13,
                fontFamily: "'Inter', sans-serif",
                padding: "6px 14px",
                borderRadius: 8,
                textDecoration: "none",
                transition: "color 0.15s ease",
              }}
              className="navbar-link"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div
          className="navbar-ctas"
          style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}
        >
          <Button variant="ghost" size="sm" href="/about/contact">
            Sign in
          </Button>
          <Button variant="nav" size="sm" href="/about/contact">
            Request demo →
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="navbar-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            display: "none",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "#0B1324",
              borderRadius: 2,
              transition: "all 0.2s ease",
              transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "#0B1324",
              borderRadius: 2,
              transition: "all 0.2s ease",
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "#0B1324",
              borderRadius: 2,
              transition: "all 0.2s ease",
              transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 66,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#fff",
            zIndex: 49,
            padding: "24px 24px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            overflowY: "auto",
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: isActive(href) ? "#2457FF" : "#0B1324",
                fontWeight: isActive(href) ? 700 : 600,
                fontSize: 17,
                fontFamily: "'Inter', sans-serif",
                padding: "14px 0",
                borderBottom: "1px solid #f1f5f9",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          ))}
          <div style={{ marginTop: 24 }}>
            <Button variant="primary" size="lg" href="/about/contact">
              Request a demo →
            </Button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .navbar-desktop { display: none !important; }
          .navbar-ctas    { display: none !important; }
          .navbar-hamburger { display: flex !important; }
        }
        .navbar-link:hover { color: #2457FF !important; }
      `}</style>
    </header>
  );
}

export default Navbar;
