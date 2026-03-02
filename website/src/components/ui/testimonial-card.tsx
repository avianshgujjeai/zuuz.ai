import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  className?: string;
}

export function TestimonialCard({ quote, name, role, company, className }: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "rounded-xl border border-border bg-white p-6 shadow-xs",
        "transition-shadow duration-200 hover:shadow-md",
        className,
      )}
    >
      <Quote className="h-6 w-6 text-primary/30 mb-4" aria-hidden="true" />
      <blockquote className="text-sm leading-relaxed text-slate-700">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
          {name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{name}</p>
          <p className="text-xs text-slate-500">
            {role}, {company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
