import { FadeIn } from "@/components/ui/fade-in";
import { FileText } from "lucide-react";

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
        {chips.map((chip, i) => (
          <FadeIn key={chip} delay={i * 0.05}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
              <FileText className="h-3 w-3" />
              {chip}
            </span>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
