import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";
import { Timeline } from "@/components/sections/timeline";
import { ourStory } from "@/content/about";

export const metadata: Metadata = ourStory.meta;

export default function OurStoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-hero-glow">
        <div className="absolute inset-0 bg-grid opacity-[0.3]" aria-hidden="true" />
        <Container className="relative">
          <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Our Story" }]} />
          <FadeIn>
            <Badge variant="primary" className="mb-4">{ourStory.hero.badge}</Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance max-w-3xl leading-[1.1]">
              {ourStory.hero.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {ourStory.hero.description}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Founder narrative */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl space-y-16">
            {ourStory.founderNarrative.map((section, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{section.heading}</h2>
                  <p className="mt-4 text-base text-muted-foreground leading-relaxed">{section.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Why now */}
      <section className="py-16 bg-muted/30">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-3xl">
              <Badge variant="primary" className="mb-4">Why now</Badge>
              <h2 className="text-2xl font-bold text-foreground">{ourStory.whyNow.heading}</h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">{ourStory.whyNow.body}</p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Timeline"
              title="From observation to execution"
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-16 mx-auto max-w-3xl">
              <Timeline items={ourStory.timeline} />
            </div>
          </FadeIn>
        </Container>
      </section>

      <CTA
        title="Want to be part of this story?"
        description="We're hiring engineers, AI researchers, and customer-facing roles."
        primaryLabel="View open roles"
        primaryHref="/about/careers"
        secondaryLabel="Contact us"
        secondaryHref="/about/contact"
      />
    </>
  );
}
