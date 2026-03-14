import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

/* New Breadcrumb component with back link */
interface BreadcrumbItem {
  label: string;
  href: string;
}
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const parent = items.length >= 2 ? items[items.length - 2] : null;
  return (
    <div style={{ marginBottom: 20 }}>
      {parent && parent.href && (
        <Link href={parent.href} style={{ display:"inline-flex",alignItems:"center",gap:4,fontSize:13,color:"#64748B",textDecoration:"none",fontFamily:"'Inter',sans-serif",fontWeight:500,marginBottom:8,transition:"color 0.15s ease" }} className="zuuz-bc-back">
          ← Back to {parent.label}
        </Link>
      )}
      <nav aria-label="Breadcrumb">
        <ol style={{ display:"flex",alignItems:"center",flexWrap:"wrap",gap:4,listStyle:"none",margin:0,padding:0 }}>
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={i} style={{ display:"flex",alignItems:"center",gap:4 }}>
                {i > 0 && <span style={{ color:"#d1d5db",fontSize:13 }} aria-hidden="true">›</span>}
                {isLast || !item.href ? (
                  <span style={{ fontSize:13,color:"#0B1324",fontWeight:600,fontFamily:"'Inter',sans-serif" }}>{item.label}</span>
                ) : (
                  <Link href={item.href} style={{ fontSize:13,color:"#64748B",textDecoration:"none",fontFamily:"'Inter',sans-serif",transition:"color 0.15s ease" }} className="zuuz-bc-link">{item.label}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <style>{`.zuuz-bc-link:hover{color:#2457FF!important}.zuuz-bc-back:hover{color:#2457FF!important}`}</style>
    </div>
  );
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6", className)}>
      <ol className="flex items-center gap-1.5 text-sm text-slate-500">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-300" aria-hidden="true" />}
              {isLast || !item.href ? (
                <span className={isLast ? "font-medium text-slate-900" : ""}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-primary"
                >
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
