import Link from "next/link";
import { type NavGroup } from "@/config/nav";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  groups: NavGroup[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function MegaMenu({ groups, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  return (
    <div
      className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={cn(
          "w-[28rem] rounded-xl border border-border bg-white p-4 shadow-lg",
          "animate-fade-in",
          groups.length > 1 && "w-[36rem]",
        )}
      >
        <div className={cn("grid gap-4", groups.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
          {groups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group block rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-50"
                    >
                      <span className="block text-sm font-medium text-slate-900 group-hover:text-primary">
                        {link.label}
                      </span>
                      {link.description && (
                        <span className="block text-xs text-slate-500 mt-0.5 leading-relaxed">
                          {link.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
