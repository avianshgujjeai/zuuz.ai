import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle,
  Wrench,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  PlugZap,
  FileOutput,
} from "lucide-react";
import { getAgent, getAllAgentSlugs } from "@/content/agents";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";
import { AgentWorkflowCard } from "@/components/sections/agent-workflow-card";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllAgentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) return {};
  return { title: agent.meta.title, description: agent.meta.description };
}

export default async function AgentDetailPage({ params }: Props) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) notFound();

  const painFixResult = [
    { icon: AlertTriangle, label: "The pain", color: "text-red-600 bg-red-50", content: agent.pain },
    { icon: Wrench, label: "What ZUUZ does", color: "text-primary bg-primary/10", content: agent.fix },
    { icon: TrendingUp, label: "The result", color: "text-emerald-600 bg-emerald-50", content: agent.result },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-hero-glow">
        <div className="absolute inset-0 bg-grid opacity-[0.3]" aria-hidden="true" />
        <Container className="relative">
          <Breadcrumbs
            items={[
              { label: "Products", href: "/" },
              { label: "AI Agents", href: "/products/ai-agents" },
              { label: agent.title },
            ]}
          />
          <FadeIn>
            <Badge variant="primary" className="mb-4">{agent.title}</Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance max-w-4xl leading-[1.1]">
              {agent.headline}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">{agent.oneLiner}</p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/about/contact">Request a demo</Link>
              </Button>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Typical savings: {agent.timeSaved}</span>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Pain → Fix → Result */}
      <section className="py-16">
        <Container>
          <FadeIn>
            <SectionHeading title="From manual work to autonomous execution" />
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {painFixResult.map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.1}>
                <div className="rounded-xl border border-border bg-card p-6 h-full">
                  <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${item.color}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">{item.label}</h3>
                  <p className="text-sm text-foreground leading-relaxed">{item.content}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Automations included */}
      <section className="py-16 bg-muted/30">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Automations"
              title="What this agent handles"
              description="Every automation runs with evidence, audit trails, and configurable approval gates."
            />
          </FadeIn>
          <div className="mt-16 grid gap-3 sm:grid-cols-2">
            {agent.automations.map((automation, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground">{automation}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Typical workflows */}
      <section className="py-16">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Workflows"
              title="Typical workflows"
              description="Real trigger → steps → output sequences. Hover over steps to follow the flow."
            />
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {agent.workflows.map((wf, i) => (
              <AgentWorkflowCard key={i} workflow={wf} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Inputs / Outputs / Controls */}
      <section className="py-16 bg-muted/30">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3">
            <FadeIn>
              <div className="rounded-xl border border-border bg-card p-6 h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <PlugZap className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-3">Inputs</h3>
                <ul className="space-y-2">
                  {agent.inputs.map((input, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                      {input}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="rounded-xl border border-border bg-card p-6 h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <FileOutput className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-3">Outputs</h3>
                <ul className="space-y-2">
                  {agent.outputs.map((output, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {output}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="rounded-xl border border-border bg-card p-6 h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-3">Controls</h3>
                <ul className="space-y-2">
                  {agent.controls.map((control, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                      {control}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Time & cost impact */}
      <section className="py-16">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 sm:p-12 text-center">
              <Badge variant="primary" className="mb-4">Impact estimate</Badge>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Time & cost impact</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Typical savings: <strong className="text-foreground">{agent.timeSaved}</strong> per user.
                Results depend on current process complexity and volume. We measure actual impact during your pilot—no guesswork.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { label: "Cycle time reduction", value: "Placeholder" },
                  { label: "Fewer handoffs", value: "Placeholder" },
                  { label: "Fewer follow-ups", value: "Placeholder" },
                ].map((m) => (
                  <div key={m.label} className="rounded-lg border border-dashed border-border p-4">
                    <p className="text-lg font-bold text-primary">{m.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                Metrics are measured during your pilot. No aggressive guarantees—just data from your own workflows.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <CTA
        title={`See the ${agent.title} in action on your workflows`}
        description="Bring your messiest process. We'll show you what changes in the first two weeks."
        primaryLabel="Request a demo"
        primaryHref="/about/contact"
        secondaryLabel="Browse all agents"
        secondaryHref="/products/ai-agents"
      />
    </>
  );
}
