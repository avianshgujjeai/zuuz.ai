import type { Metadata } from "next";
import { HeroShell } from "@/components/sections/hero-shell";
import { PlaceholderSection } from "@/components/sections/placeholder-section";
import { CTA } from "@/components/ui/cta";
import { solutions } from "@/content/solutions";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata: Metadata = {
  title: "Solutions — ZUUZ",
  description: "Solutions page description placeholder.",
};

export default function SolutionsPage() {
  return (
    <>
      <HeroShell
        badge="Solutions"
        title="Solutions headline placeholder"
        description="1–2 sentence solutions description placeholder."
        primaryCta={{ label: "Primary action", href: "/about/contact" }}
      />

      <section className="py-24">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Industries"
              title="Industry grid section title"
              description="1–2 sentence placeholder."
            />
          </FadeIn>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((sol, i) => (
              <FadeIn key={sol.slug} delay={i * 0.05}>
                <Card href={`/solutions/${sol.slug}`} className="text-center">
                  <div className="mx-auto mb-3 h-10 w-10 rounded-lg bg-primary/10" />
                  <CardTitle className="text-base">{sol.industry}</CardTitle>
                  <CardDescription className="mt-1">{sol.description}</CardDescription>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <PlaceholderSection
        title="Additional section title"
        variant="muted"
      />

      <CTA />
    </>
  );
}
