import type { Metadata } from "next";
import { HeroShell } from "@/components/sections/hero-shell";
import { CTA } from "@/components/ui/cta";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { customers } from "@/content/customers";

export const metadata: Metadata = {
  title: "Customers — ZUUZ",
  description: "Customers page description placeholder.",
};

export default function CustomersPage() {
  return (
    <>
      <HeroShell
        badge="Customers"
        title="Customers headline placeholder"
        description="1–2 sentence customers description placeholder."
      />

      <section className="py-16 border-y border-border">
        <Container>
          <FadeIn>
            <LogoCloud
              title="Logo wall placeholder"
              logos={customers.map((c) => c.company)}
            />
          </FadeIn>
        </Container>
      </section>

      <section className="py-24 bg-muted/30">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Testimonials"
              title="Testimonials section title"
            />
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {customers.slice(0, 3).map((c, i) => (
              <FadeIn key={c.slug} delay={i * 0.1}>
                <TestimonialCard
                  quote={c.quote}
                  name={c.quotee}
                  role={c.quoteeRole}
                  company={c.company}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Case studies"
              title="Case study grid section title"
            />
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {customers.map((cs, i) => (
              <FadeIn key={cs.slug} delay={i * 0.06}>
                <Card href={`/customers/${cs.slug}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-sm font-bold text-muted-foreground">
                      {cs.logo}
                    </div>
                    <Badge variant="outline">{cs.industry}</Badge>
                  </div>
                  <CardTitle>{cs.company}</CardTitle>
                  <CardDescription className="mt-2">
                    Case study card description placeholder.
                  </CardDescription>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
