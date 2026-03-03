import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  GitBranch,
  Search,
  Plug,
  Brain,
  Workflow,
  ShieldCheck,
  Lock,
  KeyRound,
  Users,
  FileCheck,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";
import { DemoVideos } from "@/components/sections/demo-videos";
import { LiveWorkShowcase } from "@/components/sections/live-work-showcase";
import { IntegrationsWall } from "@/components/sections/integrations-wall";
import { pillars } from "@/content/products";
import { agents } from "@/content/agents";

export const metadata: Metadata = {
  title: "ZUUZ — AI that runs your operations",
  description:
    "The AI layer across Email, Docs, Meetings, CRM, and ERP. Permission-aware agents, workflow automation, and unified search for the enterprise.",
};

const pillarIcons: Record<string, React.ReactNode> = {
  "ai-agents": <Bot className="h-6 w-6" />,
  workflows: <GitBranch className="h-6 w-6" />,
  "unified-search": <Search className="h-6 w-6" />,
};

const pillarDisplayNames: Record<string, string> = {
  "ai-agents": "Persona Copilots",
  workflows: "Execution Flows",
  "unified-search": "Evidence Search",
};

const howSteps = [
  { icon: Plug, number: "01", title: "Connect", description: "Link your tools in minutes. CRM, ERP, email, docs, calendars—200+ connectors, no migration required." },
  { icon: Brain, number: "02", title: "Understand", description: "ZUUZ maps your data, permissions, and existing workflows. It learns how your teams actually work." },
  { icon: Workflow, number: "03", title: "Automate", description: "Agents handle complete tasks. Workflows execute multi-step processes. Humans approve what matters." },
  { icon: ShieldCheck, number: "04", title: "Prove", description: "Every action logged with evidence. Audit trails, compliance reports, and measurable time savings—out of the box." },
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
      {/* Hero */}
      <section className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div className="absolute inset-0 bg-hero-glow" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid opacity-[0.35]" aria-hidden="true" />
        <Container className="relative">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="primary" className="mb-5">Now generally available</Badge>
              <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance leading-[1.08]">
                AI that runs your operations—across tools, teams, and approvals
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
                ZUUZ is the intelligence layer across Email, Docs, Meetings, CRM, and ERP. Permission-aware agents that do real work. Workflows that enforce your policies. Search that proves its answers.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link href="/about/contact">
                    Request a demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/products/ai-agents">See how it works</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Integrations wall */}
      <section id="integrations" className="py-12 border-y border-border">
        <Container>
          <FadeIn>
            <IntegrationsWall />
          </FadeIn>
        </Container>
      </section>

      {/* 3 Pillars */}
      <section className="py-14 md:py-18">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Platform"
              title="Three pillars. One intelligent layer."
              description="Agents that do the work. Workflows that enforce your process. Search that proves its answers."
            />
          </FadeIn>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, i) => (
              <FadeIn key={pillar.slug} delay={i * 0.1}>
                <Link
                  href={`/products/${pillar.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-200 hover:shadow-lg hover:border-primary/20 h-full"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {pillarIcons[pillar.slug]}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{pillarDisplayNames[pillar.slug] ?? pillar.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{pillar.summary}</p>
                  <ul className="mt-3 space-y-1.5">
                    {pillar.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {b.text}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Explore {pillarDisplayNames[pillar.slug] ?? pillar.title} <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-14 md:py-18 bg-muted/30">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="How it works"
              title="What you get in weeks, not quarters"
              description="From connected to autonomous in four steps. No rip-and-replace. No six-month implementation."
            />
          </FadeIn>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {howSteps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.08}>
                <div className="flex flex-col bg-card p-5 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-primary/60 tracking-wider">{step.number}</span>
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Demo videos */}
      <section className="py-14 md:py-18">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="See it in action"
              title="Watch ZUUZ work"
              description="Each demo shows a real workflow — from signal to action to audit trail."
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-10">
              <DemoVideos />
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Live Work Showcase */}
      <section className="py-14 md:py-18 bg-muted/30">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Live Work"
              title="Live Work Showcase"
              description="See how ZUUZ turns everyday work into executed outcomes — with evidence, controls, and safe write-back."
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-10">
              <LiveWorkShowcase />
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Teams we automate */}
      <section className="py-14 md:py-18">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Persona Copilots"
              title="Teams we automate"
              description="Purpose-built copilots for every operational function. Each one handles a complete job—not just a chat response."
            />
          </FadeIn>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {agents.map((agent, i) => (
              <FadeIn key={agent.slug} delay={i * 0.05}>
                <Card href={`/products/agents/${agent.slug}`} className="h-full flex flex-col">
                  <CardTitle className="text-base">{agent.title}</CardTitle>
                  <CardDescription className="mt-2 flex-1">{agent.oneLiner}</CardDescription>
                  <div className="mt-3 flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-medium text-primary">{agent.timeSaved}</span>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Trust bar */}
      <section className="py-10 border-y border-border">
        <Container>
          <FadeIn>
            <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
              Enterprise-grade security & governance
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  {label}
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Final CTA */}
      <CTA
        title="Bring your workflows. We'll make them run themselves."
        description="See how ZUUZ turns your existing tools and processes into an autonomous operations layer—with guardrails built in."
        primaryLabel="Request a demo"
        primaryHref="/about/contact"
        secondaryLabel="See AI Agents"
        secondaryHref="/products/ai-agents"
      />
    </>
  );
}
