"use client";

import {
  SiSalesforce, SiHubspot,
  SiSap, SiOracle,
  SiJirasoftware, SiZendesk,
  SiSlack, SiZoom, SiGooglecloud,
  SiGithub, SiGitlab,
} from "react-icons/si";
import { Mail, Users2, FileSpreadsheet, Database, Ticket, Cloud, Building2 } from "lucide-react";

interface IconItem { label: string; icon: React.ReactNode; }

const row1: IconItem[] = [
  { label: "Microsoft 365", icon: <Mail className="h-4 w-4" /> },
  { label: "Salesforce", icon: <SiSalesforce className="h-4 w-4" /> },
  { label: "SAP", icon: <SiSap className="h-4 w-4" /> },
  { label: "Slack", icon: <SiSlack className="h-4 w-4" /> },
  { label: "Jira", icon: <SiJirasoftware className="h-4 w-4" /> },
  { label: "Google Workspace", icon: <SiGooglecloud className="h-4 w-4" /> },
  { label: "HubSpot", icon: <SiHubspot className="h-4 w-4" /> },
  { label: "Oracle", icon: <SiOracle className="h-4 w-4" /> },
];

const row2: IconItem[] = [
  { label: "Teams", icon: <Users2 className="h-4 w-4" /> },
  { label: "Zoom", icon: <SiZoom className="h-4 w-4" /> },
  { label: "ServiceNow", icon: <Ticket className="h-4 w-4" /> },
  { label: "Zendesk", icon: <SiZendesk className="h-4 w-4" /> },
  { label: "GitHub", icon: <SiGithub className="h-4 w-4" /> },
  { label: "GitLab", icon: <SiGitlab className="h-4 w-4" /> },
  { label: "SharePoint", icon: <FileSpreadsheet className="h-4 w-4" /> },
  { label: "Azure DevOps", icon: <Cloud className="h-4 w-4" /> },
  { label: "NetSuite", icon: <Database className="h-4 w-4" /> },
  { label: "Zoho", icon: <Building2 className="h-4 w-4" /> },
];

function MarqueeRow({ items, direction }: { items: IconItem[]; direction: "left" | "right" }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      <div className={`flex gap-3 w-max hover:[animation-play-state:paused] ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}>
        {doubled.map(({ label, icon }, i) => (
          <div
            key={`${label}-${i}`}
            className="flex items-center gap-2 rounded-lg border border-border/40 bg-white px-3 py-2 transition-colors hover:border-primary/20 group/tile"
          >
            <span className="text-muted-foreground shrink-0 transition-colors group-hover/tile:text-primary">{icon}</span>
            <span className="text-[11px] font-medium text-foreground whitespace-nowrap">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function IntegrationsWall() {
  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6 text-center">
        Connects with the tools your teams already use
      </p>
      <div className="space-y-3">
        <MarqueeRow items={row1} direction="left" />
        <MarqueeRow items={row2} direction="right" />
      </div>
    </div>
  );
}
