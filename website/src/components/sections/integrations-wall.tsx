import {
  SiSalesforce, SiHubspot,
  SiSap, SiOracle,
  SiJirasoftware, SiZendesk,
  SiSlack, SiZoom, SiGooglecloud,
  SiGithub, SiGitlab,
} from "react-icons/si";
import { Mail, Users2, FileSpreadsheet, Database, Ticket, Cloud, Building2 } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

interface IconItem { label: string; icon: React.ReactNode; }
interface Group { category: string; items: IconItem[]; }

const groups: Group[] = [
  {
    category: "Collaboration",
    items: [
      { label: "Microsoft 365", icon: <Mail className="h-4 w-4" /> },
      { label: "Teams", icon: <Users2 className="h-4 w-4" /> },
      { label: "Outlook", icon: <Mail className="h-4 w-4" /> },
      { label: "SharePoint", icon: <FileSpreadsheet className="h-4 w-4" /> },
      { label: "Slack", icon: <SiSlack className="h-4 w-4" /> },
      { label: "Zoom", icon: <SiZoom className="h-4 w-4" /> },
      { label: "Google Workspace", icon: <SiGooglecloud className="h-4 w-4" /> },
    ],
  },
  {
    category: "CRM",
    items: [
      { label: "Salesforce", icon: <SiSalesforce className="h-4 w-4" /> },
      { label: "HubSpot", icon: <SiHubspot className="h-4 w-4" /> },
      { label: "Zoho", icon: <Building2 className="h-4 w-4" /> },
    ],
  },
  {
    category: "ERP",
    items: [
      { label: "SAP", icon: <SiSap className="h-4 w-4" /> },
      { label: "Oracle", icon: <SiOracle className="h-4 w-4" /> },
      { label: "NetSuite", icon: <Database className="h-4 w-4" /> },
    ],
  },
  {
    category: "ITSM",
    items: [
      { label: "ServiceNow", icon: <Ticket className="h-4 w-4" /> },
      { label: "Jira", icon: <SiJirasoftware className="h-4 w-4" /> },
      { label: "Zendesk", icon: <SiZendesk className="h-4 w-4" /> },
    ],
  },
  {
    category: "Dev Tools",
    items: [
      { label: "GitHub", icon: <SiGithub className="h-4 w-4" /> },
      { label: "GitLab", icon: <SiGitlab className="h-4 w-4" /> },
      { label: "Azure DevOps", icon: <Cloud className="h-4 w-4" /> },
    ],
  },
];

export function IntegrationsWall() {
  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6 text-center">
        Connects with the tools your teams already use
      </p>
      <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {groups.map((group, gi) => (
          <FadeIn key={group.category} delay={gi * 0.05}>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1.5">{group.category}</p>
              <div className="space-y-1">
                {group.items.map(({ label, icon }) => (
                  <div key={label} className="flex items-center gap-2 rounded-lg border border-border/40 bg-white/70 px-2.5 py-1.5 transition-all duration-200 hover:border-primary/20 hover:shadow-xs group/tile">
                    <span className="text-muted-foreground shrink-0 transition-all duration-200 group-hover/tile:text-primary group-hover/tile:scale-110">{icon}</span>
                    <span className="text-[11px] font-medium text-foreground">{label}</span>
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
