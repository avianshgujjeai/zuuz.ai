import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSolution, getAllSolutionSlugs } from "@/content/solutions";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";
import { Search } from "lucide-react";

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

export default async function IndustryPage({ params }: Props) {
  const { industry } = await params;
  const sol = getSolution(industry);
  if (!sol) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-hero-glow">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Solutions", href: "/solutions" },
              { label: sol.industry },
            ]}
          />
          <FadeIn>
            <Badge variant="primary" className="mb-4">{sol.industry}</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl text-balance max-w-3xl">
              {sol.tagline}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-500 leading-relaxed">
              {sol.description}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Agents */}
      <section className="py-24">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Agents"
              title={`Top agents for ${sol.industry}`}
              align="left"
            />
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {sol.agents.map((a, i) => (
              <FadeIn key={a.title} delay={i * 0.08}>
                <Card hover={false}>
                  <CardTitle className="text-base">{a.title}</CardTitle>
                  <CardDescription className="mt-2">{a.description}</CardDescription>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Workflows */}
      <section className="py-24 bg-slate-50/50">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Workflows"
              title="Top workflows"
              align="left"
            />
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {sol.workflows.map((w, i) => (
              <FadeIn key={w.title} delay={i * 0.08}>
                <Card hover={false}>
                  <CardTitle className="text-base">{w.title}</CardTitle>
                  <CardDescription className="mt-2">{w.description}</CardDescription>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Search examples */}
      <section className="py-24">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Unified Search"
              title="Search examples"
              description="See how your team can find answers instantly."
              align="left"
            />
          </FadeIn>
          <div className="mt-12 space-y-3 max-w-xl">
            {sol.searchExamples.map((ex, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-white px-4 py-3">
                  <Search className="h-4 w-4 text-slate-400 shrink-0" />
                  <span className="text-sm text-slate-600">{ex}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
