import type { Metadata } from "next";
import Link from "next/link";
import * as icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";
import { aboutOverview } from "@/content/about";

export const metadata: Metadata = aboutOverview.meta;

function getIcon(name: string): LucideIcon {
  return (icons as unknown as Record<string, LucideIcon>)[name] ?? icons.Sparkles;
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-16 sm:pb-20">
        <div className="absolute inset-0 bg-hero-glow" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid opacity-[0.3]" aria-hidden="true" />
        <Container className="relative">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="primary" className="mb-6">{aboutOverview.hero.badge}</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance leading-[1.1]">
                {aboutOverview.hero.title}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
                {aboutOverview.hero.description}
              </p>
              <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link href="/about/our-story">Our Story <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about/trust-security">Trust & Security</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* 4-card grid */}
      <section className="py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {aboutOverview.cards.map((card, i) => {
              const Icon = getIcon(card.icon);
              return (
                <FadeIn key={card.href} delay={i * 0.08}>
                  <Card href={card.href} className="h-full">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription className="mt-2">{card.description}</CardDescription>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Credibility band */}
      <section className="py-16 border-y border-border">
        <Container>
          <FadeIn>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
              {aboutOverview.credibility.map((item) => (
                <div key={item.label}>
                  <p className="text-base font-semibold text-foreground">{item.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      <CTA
        title="Want to know how we think about enterprise AI?"
        description="Read our story — or jump straight to our security posture."
        primaryLabel="Our Story"
        primaryHref="/about/our-story"
        secondaryLabel="Trust & Security"
        secondaryHref="/about/trust-security"
      />
    </>
  );
}
