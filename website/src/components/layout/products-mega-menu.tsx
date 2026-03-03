import Link from "next/link";
import {
  Mail, FileSpreadsheet, Share2, MessageSquare, Users2, Video,
  BarChart3, Globe, Building2, Database, Server, Ticket, ShieldCheck,
  CheckCircle2, ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type NavGroup } from "@/config/nav";

interface ProductsMegaMenuProps {
  groups: NavGroup[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const integrationIcons = [
  { label: "Microsoft 365", icon: Mail },
  { label: "Outlook", icon: Mail },
  { label: "SharePoint", icon: FileSpreadsheet },
  { label: "Slack", icon: MessageSquare },
  { label: "Teams", icon: Users2 },
  { label: "Zoom", icon: Video },
  { label: "Salesforce", icon: BarChart3 },
  { label: "HubSpot", icon: Globe },
  { label: "Zoho", icon: Building2 },
  { label: "SAP", icon: Database },
  { label: "Oracle", icon: Server },
  { label: "ServiceNow", icon: Ticket },
  { label: "Jira", icon: Share2 },
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
      <div
        role="menu"
        className="w-[52rem] rounded-xl border border-border bg-card p-5 shadow-lg animate-slide-down"
      >
        <div className="grid grid-cols-[1fr_1fr] gap-6">
          {/* Left: Platform */}
          <div role="group" aria-label="Platform">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Platform
            </p>
            <ul className="space-y-0.5">
              {platformGroup?.links.map((link) => (
                <li key={link.href} role="none">
                  <Link
                    href={link.href}
                    role="menuitem"
                    className={cn(
                      "group block rounded-lg px-3 py-2.5 transition-colors hover:bg-muted",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                    )}
                  >
                    <span className="block text-sm font-medium text-foreground group-hover:text-primary">
                      {link.label}
                    </span>
                    {link.description && (
                      <span className="block text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {link.description}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Integrations + Security */}
          <div className="space-y-5">
            {/* Integrations */}
            <div>
              <p className="mb-1 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Integrations
              </p>
              <p className="px-1 text-[11px] text-muted-foreground mb-3">
                Connect ZUUZ to the tools you already use — no rip-and-replace.
              </p>
              <div className="grid grid-cols-4 gap-1.5">
                {integrationIcons.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 rounded-md border border-border/60 bg-background px-2 py-1.5"
                  >
                    <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="text-[10px] font-medium text-muted-foreground truncate">{label}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/#integrations"
                className="mt-2 inline-flex items-center gap-1 px-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors"
              >
                View all integrations <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Security */}
            <div className="border-t border-border pt-4">
              <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Security
              </p>
              <ul className="space-y-1 mb-2">
                {securityBullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-1.5 px-1">
                    <CheckCircle2 className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                    <span className="text-[11px] text-muted-foreground leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/security"
                className="inline-flex items-center gap-1 px-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors"
              >
                <ShieldCheck className="h-3 w-3" />
                Trust & Security <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
