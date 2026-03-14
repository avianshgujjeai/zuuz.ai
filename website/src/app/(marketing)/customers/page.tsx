import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumbs";
import { Btn } from "@/components/ui/Btn";
import { customers } from "@/content/customers";

export const metadata: Metadata = {
  title: "Customers — ZUUZ",
  description:
    "See how enterprise teams at Western International, Nesto Group, RA Technologies, and Cloud Box Technologies use ZUUZ to close the gap between AI and action.",
};

const PARTNER = {
  name: "One + One Tech",
  role: "Strategic Partner & Systems Integrator",
  description:
    "One + One Tech partners with ZUUZ to deliver enterprise AI deployments across the UAE and GCC. Their team handles implementation, change management, and ongoing optimisation for customers on SAP, Microsoft 365, and Zoho stacks.",
  location: "UAE",
  website: "https://oneplusontech.com",
};

export default function CustomersPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-hero-glow">
        <div className="absolute inset-0 bg-grid opacity-[0.3]" aria-hidden="true" />
        <Container className="relative">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Customers" }]} />
          <div className="sr mt-6 max-w-3xl">
            <Badge variant="primary" className="mb-4">Customer Stories</Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance leading-[1.1]">
              Real teams. Real workflows.<br />Measurable results.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Enterprise deployments across distribution, retail, IT services, and cloud — all powered by ZUUZ AI Agents, ApprovalOps, and Unified Search.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Btn href="/about/contact" size="lg">Request a demo</Btn>
              <Btn href="#case-studies" variant="secondary" size="lg">See case studies</Btn>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Customer Logo Wall ── */}
      <section className="py-12 border-y border-border">
        <Container>
          <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-10">
            Trusted by enterprise teams across the GCC and USA
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {customers.map((c) => (
              <Link
                key={c.slug}
                href={`/customers/${c.slug}`}
                className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-md card-lift"
              >
                <span className="text-base font-semibold text-foreground">{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.industry}</span>
                <span className="text-xs text-muted-foreground">{c.location}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Case Study Cards 2×2 ── */}
      <section id="case-studies" className="py-20">
        <Container>
          <div className="sr text-center mb-14">
            <Badge variant="outline" className="mb-3">Case Studies</Badge>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              From messy approvals to governed outcomes
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Each deployment is a live integration — SAP, Zoho, Microsoft 365 — with AI Agents acting on real data and writing back to source systems.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {customers.map((c, i) => (
              <Link
                key={c.slug}
                href={`/customers/${c.slug}`}
                className={`sr d${i + 1} card-lift rounded-2xl border border-border bg-card p-8 flex flex-col h-full`}
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                      {c.industry} · {c.location}
                    </p>
                    <h3 className="text-xl font-bold text-foreground">{c.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{c.stack}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0">{c.location}</Badge>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  {c.heroSub}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {c.results.slice(0, 2).map((r) => (
                    <div key={r.label} className="rounded-lg bg-primary/5 p-3">
                      <p className="text-2xl font-black text-primary">{r.metric}</p>
                      <p className="text-xs font-medium text-foreground mt-0.5">{r.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  Read case study
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Testimonials 2×2 ── */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <Container>
          <div className="sr text-center mb-14">
            <Badge variant="outline" className="mb-3">What customers say</Badge>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              In their own words
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {customers.map((c, i) => (
              <div
                key={c.slug}
                className={`sr d${i + 1} rounded-2xl border border-border bg-card p-8 flex flex-col`}
              >
                <svg className="h-8 w-8 text-primary/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.748-9.57 9-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.995zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
                <blockquote className="text-base text-foreground leading-relaxed flex-1 mb-6">
                  &ldquo;{c.quote}&rdquo;
                </blockquote>
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-foreground">{c.quoteName}</p>
                  <p className="text-xs text-muted-foreground">{c.quoteCompany}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Strategic Partner ── */}
      <section className="py-20">
        <Container>
          <div className="sr rounded-2xl border border-primary/20 bg-primary/5 p-10 sm:p-14 flex flex-col sm:flex-row items-start gap-10">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                Strategic Partner
              </p>
              <h2 className="text-2xl font-bold text-foreground mb-4">{PARTNER.name}</h2>
              <p className="text-sm font-medium text-muted-foreground mb-1">{PARTNER.role} · {PARTNER.location}</p>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-xl">
                {PARTNER.description}
              </p>
            </div>
            <div className="shrink-0 flex flex-col gap-4">
              <div className="rounded-xl border border-border bg-card p-5 text-sm">
                <p className="font-semibold text-foreground mb-2">Capabilities</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>· Enterprise implementation &amp; rollout</li>
                  <li>· SAP, Microsoft 365 &amp; Zoho expertise</li>
                  <li>· Change management &amp; training</li>
                  <li>· Ongoing optimisation &amp; support</li>
                </ul>
              </div>
              <Btn href="/about/contact" variant="secondary" size="sm">
                Partner with us
              </Btn>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 border-t border-border" style={{ background: "var(--bg-dark, #050D1F)" }}>
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              Ready to see ZUUZ in action?
            </h2>
            <p className="text-blue-200/70 mb-8 text-lg">
              Book a 20-minute demo. Bring your messiest approval workflow — we&apos;ll show you what changes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Btn href="/about/contact" variant="primary" size="lg">Request a demo</Btn>
              <Btn href="/about/contact" variant="dark-outline" size="lg">Talk to an expert</Btn>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
