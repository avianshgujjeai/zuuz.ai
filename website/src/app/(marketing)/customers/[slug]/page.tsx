import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudy, getAllCaseStudySlugs } from "@/content/customers";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumbs";
import { Btn } from "@/components/ui/Btn";

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
      {/* ── 1. Breadcrumb + Hero ── */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-hero-glow">
        <div className="absolute inset-0 bg-grid opacity-[0.3]" aria-hidden="true" />
        <Container className="relative">
          <Breadcrumb
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Customers", href: "/customers" },
              { label: cs.name },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="primary">{cs.industry}</Badge>
              <span className="text-xs font-medium text-muted-foreground border border-border rounded-full px-3 py-1">
                {cs.stack}
              </span>
              <span className="text-xs font-medium text-muted-foreground border border-border rounded-full px-3 py-1">
                {cs.location}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance leading-[1.1]">
              {cs.name}
            </h1>
            <p className="mt-4 text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {cs.heroSub}
            </p>
          </div>
        </Container>
      </section>

      {/* ── 2. Results Bar ── */}
      <section className="py-14 border-y border-border bg-card">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {cs.results.map((r) => (
              <div key={r.label} className="flex flex-col items-center gap-1">
                <p className="text-4xl font-black text-primary">{r.metric}</p>
                <p className="text-sm font-semibold text-foreground">{r.label}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 3. Challenge → Solution ── */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-600 text-xs font-bold">1</span>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">The challenge</p>
              </div>
              <p className="text-base text-foreground leading-relaxed">{cs.challenge}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-primary text-xs font-bold">2</span>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">The solution</p>
              </div>
              <p className="text-base text-foreground leading-relaxed">{cs.solution}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 4. Pull Quote ── */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <svg className="h-10 w-10 text-primary/30 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.748-9.57 9-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.995zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
            </svg>
            <blockquote className="text-xl font-medium text-foreground leading-relaxed sm:text-2xl">
              &ldquo;{cs.quote}&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-border" />
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">{cs.quoteName}</p>
                <p className="text-xs text-muted-foreground">{cs.quoteCompany}</p>
              </div>
              <div className="h-px w-12 bg-border" />
            </div>
          </div>
        </Container>
      </section>

      {/* ── 5. Agents & Connectors ── */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">
                AI Agents used
              </p>
              <div className="flex flex-wrap gap-2">
                {cs.agents.map((agent) => (
                  <span
                    key={agent}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {agent}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">
                Systems connected
              </p>
              <div className="flex flex-wrap gap-2">
                {cs.connectors.map((connector) => (
                  <span
                    key={connector}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
                  >
                    {connector}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 6. CTA ── */}
      <section className="py-20 border-t border-border" style={{ background: "var(--bg-dark, #050D1F)" }}>
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              See what ZUUZ can do for your team
            </h2>
            <p className="text-blue-200/70 mb-8 text-lg">
              Book a 20-minute demo. Bring your messiest approval workflow — we&apos;ll show you what changes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Btn href="/about/contact" variant="primary" size="lg">Request a demo</Btn>
              <Btn href="/customers" variant="dark-outline" size="lg">View all case studies</Btn>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
