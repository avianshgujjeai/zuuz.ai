import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { solutions } from "@/content/solutions";

export function IndustryGrid() {
  return (
    <section className="py-24">
      <Container>
        <FadeIn>
          <SectionHeading
            badge="Solutions"
            title="Industry grid section title"
            description="1–2 sentence section description placeholder."
          />
        </FadeIn>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((sol, i) => (
            <FadeIn key={sol.slug} delay={i * 0.05}>
              <Card href={`/solutions/${sol.slug}`} className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-primary/10" />
                <CardTitle className="text-base">{sol.industry}</CardTitle>
                <CardDescription className="mt-1">{sol.description}</CardDescription>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
