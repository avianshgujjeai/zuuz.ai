import { cn } from "@/lib/utils";

interface LogoCloudProps {
  title?: string;
  logos?: string[];
  className?: string;
}

const defaultLogos = [
  "Logo A", "Logo B", "Logo C", "Logo D",
  "Logo E", "Logo F", "Logo G", "Logo H",
];

export function LogoCloud({
  title = "Trusted by leading teams",
  logos = defaultLogos,
  className,
}: LogoCloudProps) {
  return (
    <div className={cn("text-center", className)}>
      {title && (
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
          {title}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {logos.map((logo) => (
          <div
            key={logo}
            className="flex h-10 items-center justify-center rounded-md border border-dashed border-border px-5 text-xs font-medium text-muted-foreground"
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}
