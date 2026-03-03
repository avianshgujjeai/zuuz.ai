import {
  BarChart3, Globe, Building2,
  Database, Server, Gauge,
  Ticket, Share2,
  Users2, MessageSquare, Video, Mail,
  GitBranch, Code2, AlertTriangle, Cloud,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

interface IntegrationItem {
  label: string;
  icon: typeof Mail;
}

interface IntegrationGroup {
  category: string;
  items: IntegrationItem[];
}

const groups: IntegrationGroup[] = [
  {
    category: "CRM",
    items: [
      { label: "Salesforce", icon: BarChart3 },
      { label: "HubSpot", icon: Globe },
      { label: "Zoho", icon: Building2 },
    ],
  },
  {
    category: "ERP",
    items: [
      { label: "SAP", icon: Database },
      { label: "Oracle", icon: Server },
      { label: "MS Dynamics", icon: Gauge },
    ],
  },
  {
    category: "ITSM / Tickets",
    items: [
      { label: "ServiceNow", icon: Ticket },
      { label: "Jira", icon: Share2 },
    ],
  },
  {
    category: "Comms",
    items: [
      { label: "Teams", icon: Users2 },
      { label: "Slack", icon: MessageSquare },
      { label: "Zoom", icon: Video },
      { label: "Outlook", icon: Mail },
    ],
  },
  {
    category: "Dev Tools",
    items: [
      { label: "GitHub", icon: GitBranch },
      { label: "GitLab", icon: Code2 },
      { label: "Azure DevOps", icon: Cloud },
      { label: "PagerDuty", icon: AlertTriangle },
    ],
  },
];

export function IntegrationsWall() {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8 text-center">
        Connects with the tools your teams already use
      </p>
      <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {groups.map((group, gi) => (
          <FadeIn key={group.category} delay={gi * 0.06}>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2">
                {group.category}
              </p>
              <div className="space-y-1.5">
                {group.items.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 transition-colors hover:border-primary/20"
                  >
                    <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="text-xs font-medium text-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
