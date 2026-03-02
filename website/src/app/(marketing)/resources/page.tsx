import type { Metadata } from "next";
import { HeroShell } from "@/components/sections/hero-shell";
import { PlaceholderSection } from "@/components/sections/placeholder-section";
import { CTA } from "@/components/ui/cta";
import { resourceTypes } from "@/content/resources";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata: Metadata = {
  title: "Resources — ZUUZ",
  description: "Resources page description placeholder.",
};

export default function ResourcesPage() {
  return (
    <>
      <HeroShell
        badge="Resources"
        title="Resources headline placeholder"
        description="1–2 sentence resources description placeholder."
        primaryCta={{ label: "Browse docs", href: "/resources/docs" }}
        secondaryCta={{ label: "Read blog", href: "/resources/blog" }}
      />

      <section className="py-24">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Browse"
              title="Resource hub section title"
            />
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resourceTypes.map((rt, i) => (
              <FadeIn key={rt.slug} delay={i * 0.06}>
                <Card href={`/resources/${rt.slug}`}>
                  <Badge variant="primary" className="mb-3">{rt.label}</Badge>
                  <CardTitle className="text-base">{rt.label}</CardTitle>
                  <CardDescription className="mt-1">{rt.description}</CardDescription>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {rt.items.length} item{rt.items.length !== 1 ? "s" : ""}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <PlaceholderSection title="Featured content section" variant="muted" />

      <CTA />
    </>
  );
}
