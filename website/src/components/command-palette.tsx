"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllNavLinks } from "@/config/nav";

const allLinks = getAllNavLinks();

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = query
    ? allLinks.filter((l) => l.label.toLowerCase().includes(query.toLowerCase()))
    : allLinks;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    },
    [],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  function navigate(href: string) {
    router.push(href);
    setOpen(false);
  }

  function handleInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      navigate(filtered[selectedIndex].href);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Quick navigation">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />

      {/* Panel */}
      <div className="fixed left-1/2 top-[20%] w-full max-w-lg -translate-x-1/2 px-4">
        <div className="overflow-hidden rounded-xl border border-border bg-white shadow-xl animate-slide-up">
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Search pages..."
              className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
              aria-label="Search pages"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-72 overflow-y-auto py-2">
            {filtered.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-slate-400">No results found.</p>
            ) : (
              <ul role="listbox">
                {filtered.map((link, i) => (
                  <li key={link.href} role="option" aria-selected={i === selectedIndex}>
                    <button
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors",
                        i === selectedIndex
                          ? "bg-primary/5 text-primary"
                          : "text-slate-700 hover:bg-slate-50",
                      )}
                      onClick={() => navigate(link.href)}
                      onMouseEnter={() => setSelectedIndex(i)}
                    >
                      <span className="font-medium">{link.label}</span>
                      <span className="ml-auto text-xs text-slate-400">{link.href}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4 border-t border-border px-4 py-2 text-[10px] text-slate-400">
            <span>↑↓ navigate</span>
            <span>↵ open</span>
            <span>esc close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
