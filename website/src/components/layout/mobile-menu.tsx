"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/config/nav";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => closeRef.current?.focus(), 100);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      clearTimeout(timer);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm animate-fade-in lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-background border-l border-border shadow-xl animate-drawer-in lg:hidden"
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <span className="text-sm font-semibold text-foreground">Menu</span>
          <button
            ref={closeRef}
            onClick={onClose}
            className="rounded-md p-2 text-muted-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav
          className="flex-1 overflow-y-auto px-4 py-4 space-y-1"
          aria-label="Mobile"
        >
          {navItems.map((item) => (
            <div key={item.label}>
              {item.groups ? (
                <>
                  <button
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-foreground",
                      "hover:bg-muted transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    )}
                    onClick={() =>
                      setExpanded(expanded === item.label ? null : item.label)
                    }
                    aria-expanded={expanded === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform duration-200",
                        expanded === item.label && "rotate-180",
                      )}
                    />
                  </button>
                  {expanded === item.label && (
                    <div className="ml-3 mt-1 space-y-0.5 border-l border-border pl-3">
                      {item.groups.map((group) =>
                        group.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            onClick={onClose}
                          >
                            {link.label}
                          </Link>
                        )),
                      )}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="border-t border-border p-4 space-y-2">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href="/about/contact" onClick={onClose}>
              Sign in
            </Link>
          </Button>
          <Button size="sm" className="w-full" asChild>
            <Link href="https://cal.com/avinashgujje/30min" onClick={onClose}>
              Book a Demo
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
