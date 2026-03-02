import * as icons from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import type { LucideIcon } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeatureGridProps {
  badge?: string;
  title: string;
  description?: string;
  features: Feature[];
}

function getIcon(name: string): LucideIcon {
  const Icon = (icons as unknown as Record<string, LucideIcon>)[name];
  return Icon ?? icons.Sparkles;
}

export function FeatureGrid({ badge, title, description, features }: FeatureGridProps) {
  return (
    <section className="py-24">
      <Container>
        <FadeIn>
          <SectionHeading badge={badge} title={title} description={description} />
        </FadeIn>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = getIcon(feature.icon);
            return (
              <FadeIn key={feature.title} delay={i * 0.06}>
                <div className="rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-md">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
