import type { Metadata } from "next";
import * as icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Award } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";
import { trustSecurity } from "@/content/about";

export const metadata: Metadata = trustSecurity.meta;

function getIcon(name: string): LucideIcon {
  return (icons as unknown as Record<string, LucideIcon>)[name] ?? icons.ShieldCheck;
}

export default function TrustSecurityPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-hero-glow">
        <div className="absolute inset-0 bg-grid opacity-[0.3]" aria-hidden="true" />
        <Container className="relative">
          <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Trust & Security" }]} />
          <FadeIn>
            <Badge variant="primary" className="mb-4">{trustSecurity.hero.badge}</Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance max-w-3xl leading-[1.1]">
              {trustSecurity.hero.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {trustSecurity.hero.description}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Leadership credibility */}
      <section className="py-16">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Leadership"
              title="Built by people who take trust personally"
            />
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {trustSecurity.leadership.map((person, i) => (
              <FadeIn key={person.role} delay={i * 0.1}>
                <div className="rounded-xl border border-border bg-card p-6 h-full">
                  <div className="mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold text-primary">{person.role}</span>
                  </div>
                  <p className="text-base font-semibold text-foreground">{person.credential}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{person.detail}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Security posture */}
      <section className="py-16 bg-muted/30">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Security"
              title="Enterprise-grade security posture"
              description="Compliance, infrastructure, and access controls designed for the most demanding environments."
            />
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {trustSecurity.securityPosture.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <FadeIn key={item.title} delay={i * 0.08}>
                  <div className="rounded-xl border border-border bg-card p-6 h-full">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>

      {/* How we build trust */}
      <section className="py-16">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Principles"
              title="How we build trust"
            />
          </FadeIn>
          <div className="mt-16 mx-auto max-w-2xl space-y-3">
            {trustSecurity.howWeBuildTrust.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="FAQ"
              title="Common questions about trust & security"
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-16 mx-auto max-w-2xl">
              <Accordion
                items={trustSecurity.faq.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))}
              />
            </div>
          </FadeIn>
        </Container>
      </section>

      <CTA
        title="Want to review our security documentation?"
        description="Our team is available to walk through our security posture, compliance certifications, and deployment options."
        primaryLabel="Contact us"
        primaryHref="/about/contact"
        secondaryLabel="View careers"
        secondaryHref="/about/careers"
      />
    </>
  );
}
