import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAboutPage, getAllAboutSlugs } from "@/content/about";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";
import { ValuesBento } from "@/components/sections/values-bento";
import { TeamGrid } from "@/components/sections/team-grid";
import { ContactForm } from "@/components/sections/contact-form";
import { TrustBar } from "@/components/sections/trust-bar";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllAboutSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getAboutPage(slug);
  if (!page) return {};
  return { title: page.meta.title, description: page.meta.description };
}

export default async function AboutSubPage({ params }: Props) {
  const { slug } = await params;
  const page = getAboutPage(slug);
  if (!page) notFound();

  return (
    <>
      <section className="relative overflow-hidden pt-12 pb-16 bg-hero-glow">
        <Container>
          <Breadcrumbs
            items={[
              { label: "About", href: "/about" },
              { label: page.title },
            ]}
          />
          <FadeIn>
            <Badge variant="primary" className="mb-4">{page.title}</Badge>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance max-w-3xl">
              {page.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-500 leading-relaxed">
              {page.description}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Conditional sections based on slug */}
      {slug === "company" && (
        <>
          <ValuesBento />
          <TeamGrid />
        </>
      )}

      {slug === "careers" && (
        <section className="py-24">
          <Container>
            <FadeIn>
              <div className="mx-auto max-w-2xl text-center">
                <div className="rounded-xl border border-dashed border-border bg-slate-50/50 p-12">
                  <p className="text-sm text-slate-400">
                    Open positions will be listed here.
                  </p>
                  <p className="mt-2 text-xs text-slate-300">
                    Connect your ATS or add job listings to the content config.
                  </p>
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>
      )}

      {slug === "trust" && (
        <>
          <TrustBar />
          <section className="py-24">
            <Container>
              <FadeIn>
                <div className="mx-auto max-w-2xl space-y-8">
                  {[
                    { title: "SOC 2 Type II", description: "Independently audited controls for security, availability, and confidentiality." },
                    { title: "HIPAA Compliance", description: "BAA available for healthcare customers. PHI handled according to HIPAA requirements." },
                    { title: "End-to-end Encryption", description: "Data encrypted in transit (TLS 1.3) and at rest (AES-256). Customer-managed keys available." },
                    { title: "SSO / SAML", description: "Enterprise SSO with SAML 2.0 and OIDC. SCIM provisioning for automated user management." },
                    { title: "Role-Based Access Control", description: "Granular permissions at the workspace, team, and resource level." },
                    { title: "On-premise Deployment", description: "Available for customers with strict data residency requirements. Full feature parity." },
                  ].map((item, i) => (
                    <FadeIn key={item.title} delay={i * 0.05}>
                      <div className="rounded-xl border border-border bg-white p-6">
                        <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                        <p className="mt-2 text-sm text-slate-500 leading-relaxed">{item.description}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </FadeIn>
            </Container>
          </section>
        </>
      )}

      {slug === "contact" && <ContactForm />}

      <CTA />
    </>
  );
}
