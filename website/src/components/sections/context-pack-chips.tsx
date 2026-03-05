import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import {
  FileText, DollarSign, ScrollText,
  AlertTriangle, History, ShieldCheck,
} from "lucide-react";

const chipConfig: Record<string, { slug: string; icon: React.ReactNode }> = {
  "Policy": { slug: "policy", icon: <ScrollText className="h-6 w-6" /> },
  "Budget": { slug: "budget", icon: <DollarSign className="h-6 w-6" /> },
  "Contract Terms": { slug: "contract-terms", icon: <FileText className="h-6 w-6" /> },
  "Risk Flags": { slug: "risk-flags", icon: <AlertTriangle className="h-6 w-6" /> },
  "Prior History": { slug: "prior-history", icon: <History className="h-6 w-6" /> },
  "Compliance Docs": { slug: "compliance-docs", icon: <ShieldCheck className="h-6 w-6" /> },
};

interface ContextPackChipsProps {
  chips: string[];
  title?: string;
}

export function ContextPackChips({
  chips,
  title = "Context Pack — evidence assembled automatically",
}: ContextPackChipsProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6 text-center">{title}</p>
      <div className="flex flex-wrap justify-center gap-3">
        {chips.map((chip, i) => {
          const config = chipConfig[chip];
          const icon = config?.icon ?? <FileText className="h-6 w-6" />;
          const slug = config?.slug;

          return (
            <FadeIn key={chip} delay={i * 0.05}>
              {slug ? (
                <Link
                  href={`/resources/context-pack/${slug}`}
                  className="inline-flex items-center gap-2.5 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm font-medium text-primary transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:-translate-y-px hover:shadow-sm"
                >
                  {icon}
                  {chip}
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2.5 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm font-medium text-primary">
                  {icon}
                  {chip}
                </span>
              )}
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
