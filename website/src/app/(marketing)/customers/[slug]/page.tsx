import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudy, getAllCaseStudySlugs } from "@/content/customers";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";
import { Quote } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return { title: cs.meta.title, description: cs.meta.description };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-hero-glow">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Customers", href: "/customers" },
              { label: cs.company },
            ]}
          />
          <FadeIn>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white border border-border text-lg font-bold text-slate-600 shadow-xs">
                {cs.logo}
              </div>
              <div>
                <Badge variant="outline">{cs.industry}</Badge>
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance max-w-3xl">
              {cs.company}
            </h1>
          </FadeIn>
        </Container>
      </section>

      {/* Results */}
      <section className="py-12 border-b border-border">
        <Container>
          <FadeIn>
            <div className="grid gap-8 sm:grid-cols-3">
              {cs.results.map((r) => (
                <div key={r.metric} className="text-center">
                  <p className="text-3xl font-bold text-primary">{r.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{r.metric}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Story */}
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-2xl space-y-16">
            <FadeIn>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">The Problem</h2>
                <p className="text-lg text-slate-700 leading-relaxed">{cs.problem}</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">The Solution</h2>
                <p className="text-lg text-slate-700 leading-relaxed">{cs.solution}</p>
              </div>
            </FadeIn>

            {/* Pull quote */}
            <FadeIn delay={0.15}>
              <figure className="rounded-2xl bg-slate-50 p-8 border border-border">
                <Quote className="h-8 w-8 text-primary/30 mb-4" aria-hidden="true" />
                <blockquote className="text-lg font-medium text-slate-900 leading-relaxed">
                  &ldquo;{cs.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm text-slate-500">
                  — {cs.quotee}, {cs.quoteeRole}
                </figcaption>
              </figure>
            </FadeIn>
          </div>
        </Container>
      </section>

      <CTA title={`See how ZUUZ can help your team`} />
    </>
  );
}
