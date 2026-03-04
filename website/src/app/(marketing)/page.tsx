import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Bot, GitBranch, Search, ShieldCheck,
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
import { IntegrationsWall } from "@/components/sections/integrations-wall";
import { HeroAnimated, HeroItem, HeroBlobs, ShimmerSpan } from "@/components/sections/hero-animated";
import { agents } from "@/content/agents";

export const metadata: Metadata = {
  title: "ZUUZ — The execution layer for enterprise work",
  description: "ZUUZ connects your email, documents, meetings, CRM, ERP, and ITSM. It assembles evidence automatically, routes approvals through policy, and safely writes back to systems of record.",
};

const capabilityCards = [
  { slug: "ai-agents", icon: Bot, title: "Persona Copilots", description: "Role-specific copilots for Sales, Procurement, HR, Legal, and Ops — designed to act, not just answer." },
  { slug: "workflows", icon: GitBranch, title: "Execution Flows", description: "Import your existing processes from CRM/ERP/ITSM and run them with policy gates, approvals, and audit trails." },
  { slug: "unified-search", icon: Search, title: "Evidence Search", description: "One search across every tool — with citations and a ready-to-share context pack behind every decision." },
];

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
      {/* Hero */}
      <section className="relative pt-14 pb-16 sm:pt-20 sm:pb-18 overflow-hidden dot-grid">
        <div className="absolute inset-0 bg-hero-glow" aria-hidden="true" />
        <HeroBlobs />
        <Container className="relative z-10">
          <HeroAnimated>
            <div className="mx-auto max-w-3xl text-center">
              <HeroItem>
                <span className="inline-block mb-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  DECISION &bull; EXECUTION &bull; AI WORKSPACE
                </span>
              </HeroItem>
              <HeroItem>
                <h1 className="font-display text-foreground text-balance leading-tight">
                  An AI workspace for decisions and execution — across tools, teams, and approvals
                </h1>
              </HeroItem>
              <HeroItem>
                <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground leading-relaxed text-balance">
                  ZUUZ assembles the full context from email, documents, meetings, CRM, ERP, and ITSM — then routes decisions through policy and safely writes back to systems of record. Every answer and action is permission-aware, identity-verified, and recorded with a complete audit trail.
                </p>
              </HeroItem>
              <HeroItem>
                <p className="mt-4 text-[12px] text-muted-foreground/70 tracking-wide">
                  Permission-safe &bull; Identity-aware &bull; Evidence-backed &bull; Audit logged &bull; Safe write-back
                </p>
              </HeroItem>
              <HeroItem>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Button size="lg" className="relative overflow-hidden group hover:shadow-[0_0_24px_rgba(0,24,255,0.25)] active:scale-[0.98] transition-all duration-200" asChild>
                    <Link href="/about/contact">
                      Request a demo <ArrowRight className="h-4 w-4 opacity-70" />
                      <ShimmerSpan />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/products/ai-agents">See how it works</Link>
                  </Button>
                </div>
              </HeroItem>
            </div>
          </HeroAnimated>
        </Container>
      </section>

      {/* Integrations */}
      <section id="integrations" className="py-10 border-y border-border">
        <Container>
          <FadeIn><IntegrationsWall /></FadeIn>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="py-12 md:py-14">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Platform"
              title="Three capabilities. One execution layer."
              description="Copilots that act. Flows that enforce. Search that proves."
            />
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilityCards.map((card, i) => (
              <FadeIn key={card.slug} delay={i * 0.08}>
                <Link
                  href={`/products/${card.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-md hover:border-primary/20 h-full"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{card.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                  <div className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Explore <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
          {/* Safe Write-back card */}
          <FadeIn delay={0.25}>
            <div className="mt-4 rounded-2xl border border-border bg-card p-6 flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">Safe Write-back</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Approved actions update Salesforce, HubSpot, SAP, ServiceNow, Jira, and more — with permissions enforced.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-12 md:py-14 bg-muted/30">
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

      {/* Demo */}
      <section className="py-12 md:py-14">
        <Container>
          <FadeIn>
            <SectionHeading badge="See it in action" title="Watch ZUUZ work" description="Each demo shows a real workflow — from signal to action to audit trail." />
          </FadeIn>
          <FadeIn delay={0.1}><div className="mt-8"><DemoVideos /></div></FadeIn>
        </Container>
      </section>

      {/* Live Work Showcase */}
      <section className="py-12 md:py-14 bg-muted/30">
        <Container>
          <FadeIn>
            <SectionHeading badge="Live Work" title="Live Work Showcase" description="See how ZUUZ turns everyday work into executed outcomes — with evidence, controls, and safe write-back." />
          </FadeIn>
          <FadeIn delay={0.1}><div className="mt-8"><LiveWorkShowcase /></div></FadeIn>
        </Container>
      </section>

      {/* Teams */}
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

      {/* Trust */}
      <section className="py-8 border-y border-border">
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

      <CTA
        title="Bring your workflows. We'll make them run themselves."
        description="See how ZUUZ turns your existing tools and processes into an autonomous operations layer — with guardrails built in."
        primaryLabel="Request a demo"
        primaryHref="/about/contact"
        secondaryLabel="See Persona Copilots"
        secondaryHref="/products/ai-agents"
      />
    </>
  );
}
