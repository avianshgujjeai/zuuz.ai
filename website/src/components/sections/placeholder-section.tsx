import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

interface PlaceholderSectionProps {
  badge?: string;
  title?: string;
  description?: string;
  variant?: "default" | "muted" | "cards" | "bento";
  className?: string;
}

function PlaceholderCard({ wide = false }: { wide?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-border bg-card p-6",
        wide && "sm:col-span-2",
      )}
    >
      <div className="h-3 w-24 rounded bg-muted mb-3" />
      <div className="h-2 w-full rounded bg-muted/60 mb-2" />
      <div className="h-2 w-3/4 rounded bg-muted/40" />
    </div>
  );
}

export function PlaceholderSection({
  badge,
  title = "Section title",
  description = "1–2 sentence section description placeholder.",
  variant = "default",
  className,
}: PlaceholderSectionProps) {
  const isMuted = variant === "muted";

  return (
    <section
      className={cn("py-24", isMuted && "bg-muted/30", className)}
    >
      <Container>
        <FadeIn>
          <SectionHeading badge={badge} title={title} description={description} />
        </FadeIn>
        <div className="mt-16">
          {variant === "bento" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <PlaceholderCard wide />
              <PlaceholderCard />
              <PlaceholderCard />
            </div>
          )}
          {variant === "cards" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))}
            </div>
          )}
          {(variant === "default" || variant === "muted") && (
            <FadeIn delay={0.1}>
              <div className="mx-auto max-w-2xl rounded-xl border border-dashed border-border bg-card p-12 text-center">
                <p className="text-sm text-muted-foreground">
                  Content placeholder — this section will be populated later.
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </Container>
    </section>
  );
}
