import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── New Breadcrumb (Section 7 spec) ─────────────────────── */
interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-slate-300">›</span>}
          {c.href && i < crumbs.length - 1 ? (
            <Link href={c.href} className="hover:text-blue-600 transition-colors">
              {c.label}
            </Link>
          ) : (
            <span className="text-slate-800 font-semibold">{c.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

/* ── Legacy Breadcrumbs (kept for existing inner pages) ─── */
interface LegacyCrumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: LegacyCrumb[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6", className)}>
      <ol className="flex items-center gap-1.5 text-sm text-slate-500">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" aria-hidden="true" />
              )}
              {isLast || !item.href ? (
                <span className={isLast ? "font-medium text-slate-900" : ""}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-blue-600">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
