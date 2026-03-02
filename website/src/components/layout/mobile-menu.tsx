"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/config/nav";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!open) return null;

  return (
    <div className="border-t border-border bg-white lg:hidden">
      <nav className="divide-y divide-border px-4 py-2" aria-label="Mobile">
        {navItems.map((item) => (
          <div key={item.label} className="py-2">
            {item.groups ? (
              <>
                <button
                  className="flex w-full items-center justify-between py-2 text-sm font-medium text-slate-900"
                  onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  aria-expanded={expanded === item.label}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-slate-400 transition-transform",
                      expanded === item.label && "rotate-180",
                    )}
                  />
                </button>
                {expanded === item.label && (
                  <div className="pb-2 pl-4 space-y-1">
                    {item.groups.map((group) =>
                      group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block rounded-md py-1.5 text-sm text-slate-600 hover:text-primary"
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
                className="block py-2 text-sm font-medium text-slate-900 hover:text-primary"
                onClick={onClose}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
        <div className="flex flex-col gap-2 py-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/about/contact" onClick={onClose}>Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/about/contact" onClick={onClose}>Request demo</Link>
          </Button>
        </div>
      </nav>
    </div>
  );
}
