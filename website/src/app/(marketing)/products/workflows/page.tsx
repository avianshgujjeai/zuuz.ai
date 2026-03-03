import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Scan, Map, Cpu, Scale } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";
import { FlowAnimator } from "@/components/sections/flow-animator";

export const metadata: Metadata = {
  title: "Workflows — ZUUZ",
  description:
    "Turn your existing processes into executable workflows. ZUUZ imports, maps, automates, and governs—without forcing you to rebuild.",
};

const intakeSteps = [
  { icon: Scan, title: "Discover", description: "ZUUZ observes how work actually happens today—across systems, email threads, and approval chains. No interviews required." },
  { icon: Map, title: "Map", description: "Steps, decision points, owners, and SLAs are visualized as an executable workflow graph. You see exactly what will change." },
  { icon: Cpu, title: "Automate", description: "Each step is assigned to an agent or a human. Agents handle the repetitive work. Humans handle the judgment calls." },
  { icon: Scale, title: "Govern", description: "Policies, approval gates, and SLA enforcement are built into every workflow. Every execution is logged with full evidence." },
];

const workflowLibrary = [
  { title: "Purchase request approvals", description: "Intake → validation → spend tier routing → approval → PO generation" },
  { title: "Deal desk approvals", description: "Non-standard terms → risk assessment → pricing review → legal sign-off" },
  { title: "New customer onboarding", description: "Contract signed → provisioning → welcome sequence → success assignment" },
  { title: "Invoice exceptions", description: "Mismatch detected → root cause analysis → correction → re-approval routing" },
  { title: "Employee onboarding", description: "Offer accepted → IT provisioning → orientation → 30/60/90 check-ins" },
  { title: "Contract review cycle", description: "Intake → playbook comparison → risk flagging → counsel review → e-sign" },
];

export default function WorkflowsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-hero-glow">
        <div className="absolute inset-0 bg-grid opacity-[0.3]" aria-hidden="true" />
        <Container className="relative">
          <Breadcrumbs items={[{ label: "Products", href: "/" }, { label: "Workflows" }]} />
          <FadeIn>
            <Badge variant="primary" className="mb-4">Workflows</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance max-w-3xl leading-[1.1]">
              Turn your existing processes into executable workflows
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              ZUUZ doesn&apos;t force you to reinvent your processes. We import your workflows from current systems, map every step and decision point, and run them with agents and human approvals—governed by your policies.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/about/contact">Request a demo <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#flow-demo">See workflow intake</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Workflow intake */}
      <section className="py-16">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Workflow intake"
              title="From observation to execution in four phases"
              description="We don't start with a blank canvas. We start with how your teams already work."
            />
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {intakeSteps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.1}>
                <div className="rounded-xl border border-border bg-card p-6 h-full">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Interactive Flow Animator */}
      <section id="flow-demo" className="py-16 bg-muted/30">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Interactive demo"
              title="Watch a workflow come to life"
              description="Source systems feed in. Steps execute in sequence. Outcomes are measured. Hover over each node to see the detail."
            />
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-16">
              <FlowAnimator />
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Workflow library */}
      <section className="py-16">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Library"
              title="Start from proven templates"
              description="Pre-built workflow templates for common enterprise processes. Customize steps, owners, and policies to match your org."
            />
          </FadeIn>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workflowLibrary.map((wf, i) => (
              <FadeIn key={wf.title} delay={i * 0.06}>
                <Card hover={false}>
                  <CardTitle className="text-base">{wf.title}</CardTitle>
                  <CardDescription className="mt-2 font-mono text-xs">{wf.description}</CardDescription>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        title="Bring your messiest process. We'll map it in a week."
        description="No rip-and-replace. No six-month implementation. Just your existing workflows, running faster and governed better."
        primaryLabel="Request a demo"
        primaryHref="/about/contact"
        secondaryLabel="See AI Agents"
        secondaryHref="/products/ai-agents"
      />
    </>
  );
}
