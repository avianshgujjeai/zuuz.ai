import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { FileText } from "lucide-react";

const chipToSlug: Record<string, string> = {
  "Policy": "policy",
  "Budget": "budget",
  "Contract Terms": "contract-terms",
  "Risk Flags": "risk-flags",
  "Prior History": "prior-history",
  "Compliance Docs": "compliance-docs",
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
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 text-center">{title}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {chips.map((chip, i) => {
          const slug = chipToSlug[chip];
          const inner = (
            <>
              <FileText className="h-3 w-3" />
              {chip}
            </>
          );

          return (
            <FadeIn key={chip} delay={i * 0.05}>
              {slug ? (
                <Link
                  href={`/resources/context-pack/${slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10 hover:border-primary/30"
                >
                  {inner}
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
                  {inner}
                </span>
              )}
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
