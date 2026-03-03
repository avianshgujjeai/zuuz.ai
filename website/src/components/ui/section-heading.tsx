import { cn } from "@/lib/utils";
import { Badge } from "./badge";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {badge && (
        <Badge variant="primary" className="mb-4">
          {badge}
        </Badge>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
