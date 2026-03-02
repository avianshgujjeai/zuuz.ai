import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";

interface Feature {
  title: string;
  description: string;
}

interface FeatureGridProps {
  badge?: string;
  title: string;
  description?: string;
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  { title: "Feature one", description: "Feature description placeholder." },
  { title: "Feature two", description: "Feature description placeholder." },
  { title: "Feature three", description: "Feature description placeholder." },
  { title: "Feature four", description: "Feature description placeholder." },
  { title: "Feature five", description: "Feature description placeholder." },
  { title: "Feature six", description: "Feature description placeholder." },
];

export function FeatureGrid({
  badge,
  title,
  description,
  features = defaultFeatures,
}: FeatureGridProps) {
  return (
    <section className="py-24">
      <Container>
        <FadeIn>
          <SectionHeading badge={badge} title={title} description={description} />
        </FadeIn>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.06}>
              <div className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
                <div className="mb-4 h-10 w-10 rounded-lg bg-primary/10" />
                <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
