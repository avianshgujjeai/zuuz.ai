"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/config/nav";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MegaMenu } from "./mega-menu";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  function handleMouseEnter(label: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(label);
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "border-b border-border bg-white/95 backdrop-blur-md shadow-xs"
          : "bg-white/80 backdrop-blur-sm",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white">
              Z
            </div>
            ZUUZ
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label="Main">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.groups && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isActive(item.href)
                      ? "text-primary"
                      : "text-slate-600 hover:text-slate-900",
                  )}
                >
                  {item.label}
                </Link>
                {item.groups && openMenu === item.label && (
                  <MegaMenu groups={item.groups} onMouseEnter={() => handleMouseEnter(item.label)} onMouseLeave={handleMouseLeave} />
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
              <Link href="/about/contact">Sign in</Link>
            </Button>
            <Button size="sm" className="hidden sm:inline-flex" asChild>
              <Link href="/about/contact">Request demo</Link>
            </Button>
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
