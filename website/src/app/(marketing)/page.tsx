import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Plug, Brain, Workflow,
  Lock, KeyRound, Users, FileCheck, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";
import { DemoVideos } from "@/components/sections/demo-videos";
import { LiveWorkShowcase } from "@/components/sections/live-work-showcase";
import { HeroAnimated, HeroItem, HeroBlobs, ShimmerSpan } from "@/components/sections/hero-animated";
import { HeroProductFrame } from "@/components/visual/hero-product-frame";
import { ThreePillars } from "@/components/sections/three-pillars";
import { ScrollAnimate } from "@/components/ui/scroll-animate";
import { AnimatedStroke } from "@/components/visual/animated-stroke";
import { Glow } from "@/components/visual/glow";
import { WorkflowTableMock } from "@/components/visual/workflow-table-mock";
import { ActivityConsole } from "@/components/visual/activity-console";
import { ArchitectureLayers } from "@/components/sections/architecture-layers";
import { RiveHero } from "@/components/visual/rive-hero";
import { AmbientBackground } from "@/components/visual/ambient-background";
import { ContextThreads } from "@/components/visual/context-threads";
import { LogoMarquee } from "@/components/visual/logo-marquee";
import { Reveal } from "@/components/motion/reveal";
import { agents } from "@/content/agents";

export const metadata: Metadata = {
  title: "ZUUZ — The execution layer for enterprise work",
  description: "ZUUZ connects your email, documents, meetings, CRM, ERP, and ITSM. It assembles evidence automatically, routes approvals through policy, and safely writes back to systems of record.",
};

const howSteps = [
  { icon: Plug, number: "01", title: "Connect", description: "Link your tools in minutes. CRM, ERP, email, docs, calendars — 200+ connectors, no migration required." },
  { icon: Brain, number: "02", title: "Understand", description: "ZUUZ maps your data, permissions, and existing workflows. It learns how your teams actually work." },
  { icon: Workflow, number: "03", title: "Automate", description: "Copilots handle complete tasks. Flows execute multi-step processes. Humans approve what matters." },
  { icon: ShieldCheck, number: "04", title: "Prove", description: "Every action logged with evidence. Audit trails, compliance reports, and measurable time savings — out of the box." },
];

const trustItems = [
  { icon: Lock, label: "Permission-aware by design" },
  { icon: KeyRound, label: "SSO & SAML 2.0" },
  { icon: Users, label: "Role-based access control" },
  { icon: FileCheck, label: "Audit trail for every action" },
  { icon: ShieldCheck, label: "SOC 2 Type I" },
  { icon: Clock, label: "Evidence links on all outputs" },
];

export default function HomePage() {
  return (
    <>
      <AmbientBackground />

      {/* Hero — dark gradient, split layout */}
      <section className="relative pt-14 pb-16 sm:pt-20 sm:pb-18 overflow-hidden bg-hero-dark noise-overlay">
        <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />
        <RiveHero />
        <HeroBlobs />
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-center">
            {/* LEFT — text (unchanged) */}
            <HeroAnimated>
              <div>
                <HeroItem>
                  <span className="hero-animate inline-block mb-5 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-white/80">
                    DECISION &bull; EXECUTION &bull; AI WORKSPACE
                  </span>
                </HeroItem>
                <HeroItem>
                  <h1 className="hero-animate font-display text-white text-balance leading-tight">
                    An AI workspace for decisions and execution — across tools, teams, and approvals
                  </h1>
                </HeroItem>
                <HeroItem>
                  <p className="hero-animate mt-5 max-w-xl text-base text-slate-300/80 leading-relaxed text-balance">
                    ZUUZ assembles the full context from email, documents, meetings, CRM, ERP, and ITSM — then routes decisions through policy and safely writes back to systems of record. Every answer and action is permission-aware, identity-verified, and recorded with a complete audit trail.
                  </p>
                </HeroItem>
                <HeroItem>
                  <p className="hero-animate mt-4 text-[12px] text-slate-400/60 tracking-wide">
                    Permission-safe &bull; Identity-aware &bull; Evidence-backed &bull; Audit logged &bull; Safe write-back
                  </p>
                </HeroItem>
                <HeroItem>
                  <div className="hero-animate mt-8 flex flex-col items-start gap-3 sm:flex-row">
                    <Button size="lg" className="relative overflow-hidden group animate-breathe" asChild>
                      <Link href="/about/contact">
                        Request a demo
                        <ShimmerSpan />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:border-white/30" asChild>
                      <Link href="/products/ai-agents">See how it works</Link>
                    </Button>
                  </div>
                </HeroItem>
              </div>
            </HeroAnimated>

            {/* RIGHT — product frame + context threads behind it */}
            <div className="hidden lg:block relative">
              <ContextThreads className="absolute inset-0 w-full h-full opacity-40 -z-10" />
              <HeroProductFrame />
            </div>
          </div>

          {/* Context threads — visible on mobile (below text), hidden on desktop (shown in frame) */}
          <FadeIn delay={0.4}>
            <div className="mt-10 max-w-2xl mx-auto opacity-60 lg:hidden">
              <AnimatedStroke />
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Integrations */}
      <div className="section-separator" aria-hidden="true" />
      <Reveal>
        <section id="integrations" className="py-10">
          <Container>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6 text-center">
              Connects with the tools your teams already use
            </p>
            <LogoMarquee />
          </Container>
        </section>
      </Reveal>

      {/* Capabilities — 3 Pillars */}
      <ThreePillars />

      {/* Architecture — clickable layers */}
      <ScrollAnimate>
        <ArchitectureLayers />
      </ScrollAnimate>

      {/* How it works */}
      <div className="section-separator" aria-hidden="true" />
      <ScrollAnimate>
      <section className="py-12 md:py-14 bg-section-alt">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="How it works"
              title="What you get in weeks, not quarters"
              description="From connected to autonomous in four steps."
            />
          </FadeIn>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {howSteps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.06}>
                <div className="flex flex-col bg-card p-5 h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-primary/60 tracking-wider">{step.number}</span>
                    <step.icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
      </ScrollAnimate>

      {/* Demo */}
      <ScrollAnimate>
      <section className="py-12 md:py-14">
        <Container>
          <FadeIn>
            <SectionHeading badge="See it in action" title="Watch ZUUZ work" description="Each demo shows a real workflow — from signal to action to audit trail." />
          </FadeIn>
          <FadeIn delay={0.1}><div className="mt-8"><DemoVideos /></div></FadeIn>
        </Container>
      </section>
      </ScrollAnimate>

      {/* Product UI Mocks */}
      <div className="section-separator" aria-hidden="true" />
      <ScrollAnimate>
      <section className="py-12 md:py-14 relative">
        <Glow className="-top-40 left-1/4" size={400} opacity={0.03} />
        <Container className="relative z-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <FadeIn><WorkflowTableMock /></FadeIn>
            <FadeIn delay={0.15}><ActivityConsole /></FadeIn>
          </div>
        </Container>
      </section>
      </ScrollAnimate>

      {/* Live Work Showcase */}
      <div className="section-separator" aria-hidden="true" />
      <ScrollAnimate>
      <section className="py-12 md:py-14 bg-section-alt">
        <Container>
          <FadeIn>
            <SectionHeading badge="Live Work" title="Live Work Showcase" description="See how ZUUZ turns everyday work into executed outcomes — with evidence, controls, and safe write-back." />
          </FadeIn>
          <FadeIn delay={0.1}><div className="mt-8"><LiveWorkShowcase /></div></FadeIn>
        </Container>
      </section>
      </ScrollAnimate>

      {/* Teams */}
      <ScrollAnimate>
      <section className="py-12 md:py-14">
        <Container>
          <FadeIn>
            <SectionHeading badge="Persona Copilots" title="Teams we automate" description="Purpose-built copilots for every operational function." />
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {agents.map((agent, i) => (
              <FadeIn key={agent.slug} delay={i * 0.04}>
                <Card href={`/products/agents/${agent.slug}`} className="h-full flex flex-col">
                  <CardTitle className="text-sm">{agent.title}</CardTitle>
                  <CardDescription className="mt-1.5 flex-1 text-[13px]">{agent.oneLiner}</CardDescription>
                  <div className="mt-3 flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-primary" />
                    <span className="text-[11px] font-medium text-primary">{agent.timeSaved}</span>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
      </ScrollAnimate>

      {/* Trust */}
      <div className="section-separator" aria-hidden="true" />
      <ScrollAnimate>
      <section className="py-8">
        <Container>
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" /> {label}
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>
      </ScrollAnimate>

      <ScrollAnimate>
      <CTA
        title="Bring your workflows. We'll make them run themselves."
        description="See how ZUUZ turns your existing tools and processes into an autonomous operations layer — with guardrails built in."
        primaryLabel="Request a demo"
        primaryHref="/about/contact"
        secondaryLabel="See Persona Copilots"
        secondaryHref="/products/ai-agents"
      />
      </ScrollAnimate>
    </>
  );
}
