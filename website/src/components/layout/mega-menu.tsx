import Link from "next/link";
import { type NavGroup } from "@/config/nav";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  groups: NavGroup[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function MegaMenu({
  groups,
  onMouseEnter,
  onMouseLeave,
}: MegaMenuProps) {
  const hasDescriptions = groups.some((g) => g.links.some((l) => l.description));
  const colCount = groups.length;

  return (
    <div
      className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        role="menu"
        className={cn(
          "rounded-xl border border-border bg-card p-4 shadow-lg animate-slide-down",
          hasDescriptions && colCount > 1
            ? "w-[48rem]"
            : hasDescriptions
              ? "w-[30rem]"
              : colCount > 1
                ? "w-[36rem]"
                : "w-[28rem]",
        )}
      >
        <div
          className={cn(
            "grid gap-4",
            colCount > 1 ? "grid-cols-2" : "grid-cols-1",
          )}
        >
          {groups.map((group) => (
            <div key={group.label} role="group" aria-label={group.label}>
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.links.map((link) => (
                  <li key={link.href + link.label} role="none">
                    <Link
                      href={link.href}
                      role="menuitem"
                      className={cn(
                        "group block rounded-lg px-3 py-2 transition-colors hover:bg-muted",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                      )}
                    >
                      <span className="block text-sm font-medium text-foreground group-hover:text-primary">
                        {link.label}
                      </span>
                      {link.description && (
                        <span className="block text-[11px] text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
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
