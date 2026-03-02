import * as icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { solutions } from "@/content/solutions";

function getIcon(name: string): LucideIcon {
  return (icons as unknown as Record<string, LucideIcon>)[name] ?? icons.Building2;
}

export function IndustryGrid() {
  return (
    <section className="py-24">
      <Container>
        <FadeIn>
          <SectionHeading
            badge="Solutions"
            title="Built for your industry"
            description="Purpose-built agents, workflows, and search experiences for the challenges your industry faces every day."
          />
        </FadeIn>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((sol, i) => {
            const Icon = getIcon(sol.icon);
            return (
              <FadeIn key={sol.slug} delay={i * 0.05}>
                <Card href={`/solutions/${sol.slug}`} className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-base">{sol.industry}</CardTitle>
                  <CardDescription className="mt-1">{sol.tagline}</CardDescription>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
