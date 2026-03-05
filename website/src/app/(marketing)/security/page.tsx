import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck, Lock, Users, FileCheck, Server, Eye,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata: Metadata = {
  title: "Trust & Security — ZUUZ",
  description: "SOC 2 Type I aligned. Permission-aware. Human-in-the-loop. Full audit trails. On-prem available.",
};

const securityCards = [
  { icon: ShieldCheck, title: "SOC 2 Type I aligned controls", description: "Independent assessment confirming security controls meet Trust Services Criteria for security, availability, and confidentiality." },
  { icon: Lock, title: "Permission-aware retrieval", description: "Every search result and agent action respects source-system permissions. RBAC and Separation of Duties enforced at query time." },
  { icon: Users, title: "Human-in-the-loop by design", description: "Sensitive actions require explicit human approval. Configurable gates by action type, spend threshold, and risk level." },
  { icon: FileCheck, title: "Full audit trail", description: "Every answer, action, and approval is timestamped, attributed, and immutable. Evidence links trace back to source data." },
  { icon: Server, title: "On-prem & private cloud", description: "Deploy ZUUZ within your infrastructure for strict data residency requirements. Full feature parity with cloud." },
  { icon: Eye, title: "Transparent by default", description: "Every AI-generated answer shows its sources. No black-box responses. Customers influence the roadmap directly." },
];

const faq = [
  { id: "soc2", question: "What does SOC 2 Type I cover?", answer: "SOC 2 Type I confirms that security controls are designed to meet Trust Services Criteria at a specific point in time. It covers infrastructure, data handling, access controls, and operational procedures." },
  { id: "permissions", question: "How does permission-aware retrieval work?", answer: "ZUUZ enforces permissions at query time. If a user doesn't have access to a record in the source system (CRM, HRIS, etc.), they won't see it in ZUUZ search results or agent outputs." },
  { id: "onprem", question: "Do you support on-premise deployments?", answer: "Yes. ZUUZ offers on-premise and private cloud deployment options for organizations with data residency or regulatory requirements. Full feature parity with cloud." },
  { id: "audit", question: "What's included in the audit trail?", answer: "Every action: searches performed, results returned, agent executions, approvals granted, and write-backs to systems. Each entry includes timestamp, user identity, evidence used, and what changed." },
  { id: "models", question: "Can we use our own AI models?", answer: "Yes. ZUUZ supports customer-managed and open model deployments. You control which models power your copilots and search — no vendor lock-in on the intelligence layer." },
];

export default function SecurityPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-16 sm:pb-20">
        <div className="absolute inset-0 bg-hero-glow" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid opacity-[0.3]" aria-hidden="true" />
        <Container className="relative">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="primary" className="mb-6">Trust & Security</Badge>
              <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance leading-[1.1]">
                Enterprise trust, built into every layer
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
                ZUUZ is built for organizations where security, compliance, and audit trails are non-negotiable. Every action is identity-verified, permission-checked, and evidence-linked.
              </p>
              <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link href="/about/contact">Request a security review</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Security posture"
              title="How we protect your data and operations"
            />
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {securityCards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-border bg-card p-6 h-full">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 bg-muted/30">
        <Container>
          <FadeIn>
            <SectionHeading badge="Principles" title="How we build trust" />
          </FadeIn>
          <div className="mt-16 mx-auto max-w-2xl space-y-3">
            {[
              "Security by design — threat modeling in every feature cycle",
              "Least-privilege access — agents and users access only what they need",
              "Evidence-based answers — every response cites its sources",
              "Human-in-the-loop — sensitive actions require explicit approval",
              "Immutable audit trails — timestamped, attributed, preserved",
              "Transparent roadmaps — customers shape what gets built",
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <FadeIn>
            <SectionHeading badge="FAQ" title="Common security questions" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-16 mx-auto max-w-2xl">
              <Accordion items={faq} />
            </div>
          </FadeIn>
        </Container>
      </section>

      <CTA
        title="Want to review our security documentation?"
        description="Our team walks through security posture, compliance controls, and deployment options."
        primaryLabel="Contact us"
        primaryHref="/about/contact"
        secondaryLabel="About ZUUZ"
        secondaryHref="/about"
      />
    </>
  );
}
