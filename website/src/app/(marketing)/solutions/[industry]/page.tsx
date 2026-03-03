import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import * as icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Search, ExternalLink } from "lucide-react";
import { getSolution, getAllSolutionSlugs } from "@/content/solutions";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";
import { WorkflowTimeline } from "@/components/sections/workflow-timeline";
import { ContextPackChips } from "@/components/sections/context-pack-chips";
import { SecurityCards } from "@/components/sections/security-cards";

interface Props {
  params: Promise<{ industry: string }>;
}

export async function generateStaticParams() {
  return getAllSolutionSlugs().map((industry) => ({ industry }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  const sol = getSolution(industry);
  if (!sol) return {};
  return { title: sol.meta.title, description: sol.meta.description };
}

function getIcon(name: string): LucideIcon {
  return (icons as unknown as Record<string, LucideIcon>)[name] ?? icons.Sparkles;
}

export default async function IndustryPage({ params }: Props) {
  const { industry } = await params;
  const sol = getSolution(industry);
  if (!sol) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-hero-glow">
        <div className="absolute inset-0 bg-grid opacity-[0.3]" aria-hidden="true" />
        <Container className="relative">
          <Breadcrumbs items={[{ label: "Solutions", href: "/solutions" }, { label: sol.industry }]} />
          <FadeIn>
            <Badge variant="primary" className="mb-4">ZUUZ for {sol.industry}</Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance max-w-3xl leading-[1.1]">
              {sol.heroHeadline}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">{sol.heroDescription}</p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/about/contact">Request a demo <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#use-cases">See use cases</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-24">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Use cases"
              title={`Top use cases for ${sol.industry}`}
              description="Each use case is powered by AI Agents, governed by ApprovalOps workflows, and supported by Unified Search."
            />
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {sol.useCases.map((uc, i) => {
              const Icon = getIcon(uc.icon);
              return (
                <FadeIn key={uc.title} delay={i * 0.08}>
                  <div className="rounded-xl border border-border bg-card p-6 h-full">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{uc.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{uc.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Context Pack */}
      <section className="py-16 border-y border-border">
        <Container>
          <FadeIn>
            <ContextPackChips
              chips={sol.contextPackChips}
              title={`Context Pack for ${sol.industry} — assembled automatically`}
            />
          </FadeIn>
        </Container>
      </section>

      {/* Recommended Agents */}
      <section className="py-24 bg-muted/30">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Persona Copilots"
              title="Recommended Copilots"
              description="Pre-configured for this industry. Each copilot handles a complete job — not just a chat response."
            />
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sol.agentCategories.map((cat, i) => (
              <FadeIn key={cat.category} delay={i * 0.08}>
                <div className="rounded-xl border border-border bg-card p-6 h-full">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">{cat.category}</h3>
                  <ul className="space-y-2">
                    {cat.agents.map((agent) => (
                      <li key={agent.slug}>
                        <Link
                          href={`/products/agents/${agent.slug}`}
                          className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors group"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          {agent.name}
                          <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Workflow Timeline */}
      <section className="py-24">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="How it works"
              title="From connected systems to governed outcomes"
              description="Five steps. Full audit trail. Human approval where it matters."
            />
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-16">
              <WorkflowTimeline />
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Unified Search */}
      <section className="py-24 bg-muted/30">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Unified Search"
              title={`Search across ${sol.industry} systems`}
              description="Ask questions in plain language. Get permission-safe, evidence-grounded answers with citations and source links."
            />
          </FadeIn>
          <div className="mt-12 mx-auto max-w-2xl space-y-3">
            {sol.searchExamples.map((ex, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-shadow hover:shadow-sm">
                  <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-foreground flex-1">{ex}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-primary shrink-0" />
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Metrics (if available) */}
      {sol.metrics.length > 0 && (
        <section className="py-16 border-y border-border">
          <Container>
            <FadeIn>
              <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
                Measured outcomes
              </p>
              <div className="flex flex-wrap items-center justify-center gap-12">
                {sol.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <p className="text-3xl font-bold text-primary">{m.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </Container>
        </section>
      )}

      {/* Security */}
      <section className="py-24">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Security & governance"
              title="Built for control"
              description="Identity verification, permission-safe execution, and immutable audit trails — at every step."
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-16">
              <SecurityCards />
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* CTA */}
      <CTA
        title={`See ZUUZ for ${sol.industry} in action`}
        description="Book a 20-minute demo. Bring your messiest approval workflow — we'll show you what changes."
        primaryLabel="Request a demo"
        primaryHref="/about/contact"
        secondaryLabel="Talk to an expert"
        secondaryHref="/about/contact"
      />
    </>
  );
}
