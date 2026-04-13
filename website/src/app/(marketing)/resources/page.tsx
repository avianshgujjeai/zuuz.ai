import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";
import { ResourcesHub } from "@/components/sections/resources-hub";

export const metadata: Metadata = {
  title: "Resources — ZUUZ",
  description: "Blog posts, product manuals, and industry solution guides. Everything you need to evaluate and implement ZUUZ.",
};

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-16 sm:pb-16">
        <div className="absolute inset-0 bg-hero-glow" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid opacity-[0.3]" aria-hidden="true" />
        <Container className="relative">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="primary" className="mb-6">Resources</Badge>
              <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance leading-[1.1]">
                Learn, evaluate, implement
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-balance">
                Blog posts on enterprise AI, product manuals for every agent, and industry-specific solution guides — all in one place.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Resources hub */}
      <section className="py-16">
        <Container>
          <FadeIn>
            <ResourcesHub />
          </FadeIn>
        </Container>
      </section>

      <CTA
        title="Ready to see ZUUZ in action?"
        description="Book a demo and bring your messiest workflow. We'll show you what changes in the first two weeks."
        primaryLabel="Request Trial →"
        primaryHref="https://cal.com/avinashgujje/30min"
        secondaryLabel="Talk to an expert"
        secondaryHref="/about/contact"
      />
    </>
  );
}
