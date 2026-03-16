import type { Metadata } from "next";
import Link from "next/link";
import { Bot, GitBranch, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";
import { ContextPackChips } from "@/components/sections/context-pack-chips";
import { solutions } from "@/content/solutions";
import { WorkflowPipeline } from "@/components/marketing/WorkflowPipeline";

export const metadata: Metadata = {
  title: "Solutions — ZUUZ",
  description:
    "Industry-ready AI Agents and ApprovalOps workflows. Built for real operations across IT services, distribution, finance, healthcare, insurance, retail, logistics, and manufacturing.",
};

const pillars = [
  {
    icon: Bot,
    title: "AI Agents",
    description: "Department-level agents that handle complete tasks — reading signals, applying policies, and taking action with human oversight.",
    href: "/products/ai-agents",
  },
  {
    icon: GitBranch,
    title: "Workflows",
    description: "Connect your existing CRM, ERP, and ITSM workflows. Run them in ZUUZ with approvals, policy gates, and safe write-back.",
    href: "/products/workflows",
  },
  {
    icon: Search,
    title: "Unified Search",
    description: "Permission-safe, evidence-backed answers with citations. Search across email, docs, meetings, CRM, and ERP in one query.",
    href: "/products/unified-search",
  },
];

const contextChips = ["Policy", "Budget", "Contract Terms", "Risk Flags", "Prior History", "Compliance Docs"];

const metricsFromPdfs = solutions.flatMap((s) => s.metrics).filter((m) => m.source);


export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{ background: "linear-gradient(160deg, #EFF6FF 0%, #F9FAFB 60%, #ECFDF5 100%)" }}
        className="relative overflow-hidden pt-16 pb-20 sm:pt-20 sm:pb-28"
      >
        <Container className="relative">
          <FadeIn>
            <div style={{ maxWidth: 680 }}>
              {/* Plain uppercase eyebrow */}
              <p style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.11em",
                textTransform: "uppercase",
                color: "#0018FF",
                fontFamily: "Montserrat, sans-serif",
                marginBottom: 16,
              }}>
                Solutions
              </p>
              <h1 style={{
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "#111827",
                marginBottom: 20,
              }}>
                Industry-ready AI Agents + ApprovalOps workflows.
              </h1>
              <p style={{
                fontSize: 17,
                color: "#6B7280",
                lineHeight: 1.7,
                maxWidth: 560,
                marginBottom: 32,
                fontFamily: "Montserrat, sans-serif",
              }}>
                ZUUZ connects to your systems, assembles the Context Pack, routes approvals safely, and writes back only when identity, permissions, and audit trail are verified.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <Link href="/about/contact" style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "12px 28px",
                  background: "#0018FF",
                  color: "#FFFFFF",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: "Montserrat, sans-serif",
                  textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(0,24,255,0.25)",
                }}>
                  Request a demo →
                </Link>
                <Link href="#industries" style={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: "1px solid #E5E7EB",
                  borderRadius: 10,
                  padding: "11px 24px",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#374151",
                  textDecoration: "none",
                  fontFamily: "Montserrat, sans-serif",
                  background: "white",
                }}>
                  See industries
                </Link>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <WorkflowPipeline />
          </FadeIn>
        </Container>
      </section>

      {/* Industries Grid */}
      <section id="industries" className="py-16">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="8 industries"
              title="Purpose-built for your industry"
              description="Every industry gets tailored use cases, context packs, and agent configurations. Same platform, different expertise."
            />
          </FadeIn>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((sol, i) => (
              <FadeIn key={sol.slug} delay={i * 0.05}>
                <Card href={`/solutions/${sol.slug}`} className="h-full flex flex-col">
                  <CardTitle className="text-base">{sol.industry}</CardTitle>
                  <CardDescription className="mt-2 flex-1">{sol.outcomeOneLiner}</CardDescription>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {sol.tags.map((tag) => (
                      <span key={tag} className="inline-flex rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* 3 Pillars */}
      <section className="py-16 bg-muted/30">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Platform"
              title="What you get in every industry"
              description="Three capabilities that work together — agents that do work, workflows that enforce process, and search that proves its answers."
            />
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <Link
                  href={p.href}
                  className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:border-primary/20 h-full"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </Link>
              </FadeIn>
            ))}
          </div>

          {/* Context Pack */}
          <FadeIn delay={0.3}>
            <div className="mt-16">
              <ContextPackChips chips={contextChips} />
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Proof / Metrics band (only if PDFs provided metrics) */}
      {metricsFromPdfs.length > 0 && (
        <section className="py-16 border-y border-border">
          <Container>
            <FadeIn>
              <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
                Measured outcomes from early deployments
              </p>
              <div className="flex flex-wrap items-center justify-center gap-12">
                {metricsFromPdfs.map((m) => (
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

      {/* CTA */}
      <CTA
        title="Book a 20-minute demo"
        description="See how ZUUZ brings AI Agents, ApprovalOps workflows, and Unified Search to your industry — with evidence and audit trails built in."
        primaryLabel="Request a demo"
        primaryHref="/about/contact"
        secondaryLabel="Talk to an expert"
        secondaryHref="/about/contact"
      />
    </>
  );
}
