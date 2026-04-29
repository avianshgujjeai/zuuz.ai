import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Lock, ShieldCheck, FileCheck, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";
import { EvidenceAnswerMock } from "@/components/sections/evidence-answer-mock";

export const metadata: Metadata = {
  title: "Enterprise AI Search — Permission-Safe Evidence Search Across All Systems",
  description:
    "ZUUZ Evidence Search lets you ask questions in plain language and get permission-safe, evidence-grounded answers with citations and source links across 200+ enterprise systems.",
  alternates: { canonical: "https://www.zuuz.ai/products/unified-search" },
};

const permissionFeatures = [
  { icon: Lock, title: "Query-time enforcement", description: "Every search result is filtered through the source system's permissions. If a user doesn't have access in Salesforce, they won't see it in ZUUZ." },
  { icon: ShieldCheck, title: "Audit trail per query", description: "Every search is logged—who searched, what was returned, and what actions were taken. Ready for compliance review at any time." },
  { icon: FileCheck, title: "Data residency controls", description: "Choose where your index lives. On-premise, single-tenant cloud, or regional deployments available for regulated industries." },
];

const searchToActions = [
  { label: "Create follow-up task", description: "Find a customer email → create a follow-up task in your project tool, pre-populated with context." },
  { label: "Open approval workflow", description: "Find a purchase request → launch the approval workflow with the right routing already set." },
  { label: "Draft response email", description: "Find a support thread → draft a reply using the relevant knowledge base article as source." },
  { label: "Trigger agent", description: "Find a stale deal → trigger the Sales AI Agent to assess and recommend next action." },
];

export default function UnifiedSearchPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-hero-glow">
        <div className="absolute inset-0 bg-grid opacity-[0.3]" aria-hidden="true" />
        <Container className="relative">
          <Breadcrumbs items={[{ label: "Products", href: "/" }, { label: "Unified Search" }]} />
          <FadeIn>
            <Badge variant="primary" className="mb-4">Unified Search</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance max-w-3xl leading-[1.1]">
              Find anything. Answer with proof.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              One search across emails, documents, chats, tickets, and business records. Every answer cites its sources. Every result respects permissions. And from any answer, you can act—launching workflows or triggering agents without switching tools.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="https://cal.com/avinashgujje/30min">Book a Demo →</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#search-demo">See example queries</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Connector band */}
      <section className="py-16 border-y border-border">
        <Container>
          <FadeIn>
            <LogoCloud title="Search across everything your teams use" />
          </FadeIn>
        </Container>
      </section>

      {/* From keywords to questions */}
      <section id="search-demo" className="py-16">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Evidence-based answers"
              title="From keywords to questions—with proof"
              description="Ask in plain language. Get answers that cite their sources. Every response links back to the original record."
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-16">
              <EvidenceAnswerMock />
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Permission-aware */}
      <section className="py-16 bg-muted/30">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Security"
              title="Permission-aware by design"
              description="Search results respect source-system permissions. No data leaks. No shadow access. Full audit trail."
            />
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {permissionFeatures.map((feat, i) => (
              <FadeIn key={feat.title} delay={i * 0.1}>
                <div className="rounded-xl border border-border bg-card p-6 h-full">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feat.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{feat.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Search to action */}
      <section className="py-16">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Search → Action"
              title="From result to action in one click"
              description="Don't just find information—act on it. Launch workflows, trigger agents, or draft communications directly from search results."
            />
          </FadeIn>
          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {searchToActions.map((action, i) => (
              <FadeIn key={action.label} delay={i * 0.08}>
                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{action.label}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{action.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        title="Stop searching across ten tabs. Start getting answers with proof."
        description="See how ZUUZ unifies your enterprise knowledge and turns search into action—with permissions and evidence built in."
        primaryLabel="Book a Demo →"
        primaryHref="/about/contact"
        secondaryLabel="See Workflows"
        secondaryHref="/products/workflows"
      />
      <Script id="schema-faq-search" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is enterprise AI search?",
            "acceptedAnswer": { "@type": "Answer", "text": "Enterprise AI search allows employees to ask questions in plain language and get answers drawn from all connected systems — ERP, CRM, documents, emails, and tickets — with permission-safe filtering so users only see data they're authorized to access. ZUUZ Evidence Search adds source citations and evidence links to every answer." }
          },
          {
            "@type": "Question",
            "name": "What makes ZUUZ Evidence Search different from other enterprise search tools?",
            "acceptedAnswer": { "@type": "Answer", "text": "ZUUZ Evidence Search is permission-aware by design — every answer respects source-system access controls. It provides evidence-grounded responses with citations and source links, not just keyword results. It searches across 200+ connected enterprise systems simultaneously and can be used directly within approval workflows." }
          }
        ]
      })}} />
    </>
  );
}
