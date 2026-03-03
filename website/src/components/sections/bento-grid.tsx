import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

export interface BentoItem {
  title: string;
  description: string;
  href: string;
  span?: "wide" | "normal";
}

interface BentoGridProps {
  badge?: string;
  title?: string;
  description?: string;
  items?: BentoItem[];
}

const defaultItems: BentoItem[] = [
  { title: "Card title placeholder", description: "1–2 sentence card description placeholder.", href: "#", span: "wide" },
  { title: "Card title placeholder", description: "1–2 sentence card description placeholder.", href: "#" },
  { title: "Card title placeholder", description: "1–2 sentence card description placeholder.", href: "#" },
];

export function BentoGrid({
  badge = "Platform",
  title = "Section title placeholder",
  description = "1–2 sentence section description placeholder.",
  items = defaultItems,
}: BentoGridProps) {
  return (
    <section className="py-16">
      <Container>
        <FadeIn>
          <SectionHeading badge={badge} title={title} description={description} />
        </FadeIn>
        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <Link
                href={item.href}
                className={cn(
                  "group relative flex flex-col rounded-2xl border border-border bg-card p-8 transition-all duration-200",
                  "hover:shadow-lg hover:border-primary/20",
                  item.span === "wide" && "sm:col-span-2",
                )}
              >
                <div className="mb-4 h-10 w-10 rounded-lg bg-primary/10" />
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-lg">
                  {item.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
