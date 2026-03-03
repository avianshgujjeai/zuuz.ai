import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { SiSalesforce, SiSlack, SiSap, SiJirasoftware, SiGithub } from "react-icons/si";
import { cn } from "@/lib/utils";
import { type NavGroup } from "@/config/nav";

interface ProductsMegaMenuProps {
  groups: NavGroup[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const integrationLogos = [
  { label: "Microsoft 365", icon: <Mail className="h-3.5 w-3.5" /> },
  { label: "Salesforce", icon: <SiSalesforce className="h-3.5 w-3.5" /> },
  { label: "SAP", icon: <SiSap className="h-3.5 w-3.5" /> },
  { label: "Slack", icon: <SiSlack className="h-3.5 w-3.5" /> },
  { label: "Jira", icon: <SiJirasoftware className="h-3.5 w-3.5" /> },
  { label: "GitHub", icon: <SiGithub className="h-3.5 w-3.5" /> },
];

const securityBullets = [
  "SOC 2 Type I aligned controls",
  "Permission-aware retrieval (RBAC/SoD)",
  "Human-in-the-loop by design",
  "Full audit trail on answers + actions",
  "On-prem and private cloud deployments",
];

export function ProductsMegaMenu({ groups, onMouseEnter, onMouseLeave }: ProductsMegaMenuProps) {
  const platformGroup = groups[0];

  return (
    <div
      className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div role="menu" className="w-[54rem] rounded-xl border border-border bg-card p-5 shadow-lg animate-slide-down">
        <div className="grid grid-cols-3 gap-5">
          {/* Capabilities */}
          <div role="group" aria-label="Capabilities">
            <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Capabilities</p>
            <ul className="space-y-0.5">
              {platformGroup?.links.map((link) => (
                <li key={link.href} role="none">
                  <Link href={link.href} role="menuitem" className={cn("group block rounded-lg px-2 py-2 transition-colors hover:bg-muted", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset")}>
                    <span className="block text-sm font-medium text-foreground group-hover:text-primary">{link.label}</span>
                    {link.description && <span className="block text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{link.description}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Integrations */}
          <div>
            <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Integrations</p>
            <p className="px-2 text-[10px] text-muted-foreground mb-3">Connect to the tools you already use.</p>
            <div className="grid grid-cols-2 gap-1.5">
              {integrationLogos.map(({ label, icon }) => (
                <div key={label} className="flex items-center gap-2 rounded-md border border-border/60 bg-background px-2.5 py-1.5">
                  <span className="text-muted-foreground">{icon}</span>
                  <span className="text-[10px] font-medium text-muted-foreground truncate">{label}</span>
                </div>
              ))}
            </div>
            <Link href="/#integrations" className="mt-2 inline-flex items-center gap-1 px-2 text-xs font-medium text-primary hover:text-primary-dark transition-colors">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Security */}
          <div>
            <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Security</p>
            <ul className="space-y-1 mb-3">
              {securityBullets.map((b) => (
                <li key={b} className="flex items-start gap-1.5 px-2">
                  <CheckCircle2 className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                  <span className="text-[10px] text-muted-foreground leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
            <Link href="/security" className="inline-flex items-center gap-1 px-2 text-xs font-medium text-primary hover:text-primary-dark transition-colors">
              <ShieldCheck className="h-3 w-3" /> Trust & Security <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
