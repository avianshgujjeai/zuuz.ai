import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Ear, BrainCircuit, Zap, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";
import { agents } from "@/content/agents";

export const metadata: Metadata = {
  title: "AI Agents — ZUUZ",
  description:
    "Purpose-built AI agents that handle complete jobs across your enterprise tools. Not chatbots—agents that listen, decide, and act with human oversight.",
};

const howColumns = [
  {
    icon: Ear,
    title: "Listen",
    description: "Agents continuously monitor signals from your connected tools—new emails, updated deal records, filed requests, completed meetings. No polling. No manual triggers.",
  },
  {
    icon: BrainCircuit,
    title: "Decide",
    description: "Every action is evaluated against your policies, org context, and approval rules. Agents know what they can do autonomously and when to ask for human approval.",
  },
  {
    icon: Zap,
    title: "Act",
    description: "Create records, draft communications, update systems, route approvals, and close out tasks—all with a complete evidence trail linking back to the triggering signal.",
  },
];

export default function AIAgentsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-hero-glow">
        <div className="absolute inset-0 bg-grid opacity-[0.3]" aria-hidden="true" />
        <Container className="relative">
          <Breadcrumbs items={[{ label: "Products", href: "/" }, { label: "AI Agents" }]} />
          <FadeIn>
            <Badge variant="primary" className="mb-4">AI Agents</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance max-w-3xl leading-[1.1]">
              Agents that do work end-to-end—not chatbots that suggest it
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              ZUUZ agents read signals from your tools, apply your policies, take real action across systems, and loop in humans only when judgment is needed. Every action logged. Every decision explainable.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/about/contact">Request a demo</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#agent-grid">Browse all agents</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* How agents work */}
      <section className="py-16">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Architecture"
              title="How ZUUZ Agents work"
              description="A continuous loop: signals in, decisions made, actions taken, evidence stored."
            />
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {howColumns.map((col, i) => (
              <FadeIn key={col.title} delay={i * 0.1}>
                <div className="rounded-xl border border-border bg-card p-8 h-full">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <col.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{col.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{col.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Agent grid */}
      <section id="agent-grid" className="py-16 bg-muted/30">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="8 purpose-built agents"
              title="An agent for every operational team"
              description="Each agent is tailored to a specific function. Real automations, real workflows, real controls."
            />
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {agents.map((agent, i) => (
              <FadeIn key={agent.slug} delay={i * 0.06}>
                <Link
                  href={`/products/agents/${agent.slug}`}
                  className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:border-primary/20 h-full"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{agent.title}</h3>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs font-medium text-primary">{agent.timeSaved}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{agent.oneLiner}</p>

                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">What it automates</p>
                    <ul className="space-y-1">
                      {agent.automations.slice(0, 3).map((a, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs mt-auto pt-4 border-t border-border">
                    <div>
                      <p className="font-semibold text-muted-foreground uppercase tracking-wider mb-1">Inputs</p>
                      <p className="text-muted-foreground">{agent.inputs.slice(0, 2).join(", ")}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-muted-foreground uppercase tracking-wider mb-1">Outputs</p>
                      <p className="text-muted-foreground">{agent.outputs.slice(0, 2).join(", ")}</p>
                    </div>
                  </div>

                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    View details <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        title="Put agents to work on the tasks your teams shouldn't be doing manually"
        description="See ZUUZ agents in action on your own workflows. Bring your messiest process—we'll show you what changes."
        primaryLabel="Request a demo"
        primaryHref="/about/contact"
        secondaryLabel="See Workflows"
        secondaryHref="/products/workflows"
      />
    </>
  );
}
