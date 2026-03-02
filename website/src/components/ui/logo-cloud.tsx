import { cn } from "@/lib/utils";

interface LogoCloudProps {
  title?: string;
  logos?: string[];
  className?: string;
}

const defaultLogos = [
  "Salesforce", "Slack", "Jira", "Google Workspace",
  "Microsoft 365", "Notion", "Confluence", "ServiceNow",
  "Zendesk", "HubSpot", "SAP", "Workday",
];

export function LogoCloud({ title = "Integrates with your stack", logos = defaultLogos, className }: LogoCloudProps) {
  return (
    <div className={cn("text-center", className)}>
      {title && (
        <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-8">
          {title}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {logos.map((logo) => (
          <div
            key={logo}
            className="flex h-10 items-center justify-center rounded-md px-4 text-sm font-semibold text-slate-400 transition-colors hover:text-slate-600"
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}
