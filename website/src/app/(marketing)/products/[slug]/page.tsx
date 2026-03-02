import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getAllProductSlugs } from "@/content/products";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.meta.title, description: product.meta.description };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-hero-glow">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Products", href: "/" },
              { label: product.title },
            ]}
          />
          <FadeIn>
            <Badge variant="primary" className="mb-4">{product.title}</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl text-balance max-w-3xl">
              {product.tagline}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-500 leading-relaxed">
              {product.description}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Features */}
      <FeatureGrid
        badge="Features"
        title={`What makes ${product.title} different`}
        features={product.features}
      />

      {/* Workflows */}
      <section className="py-24 bg-slate-50/50">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center mb-16">
              <Badge variant="primary" className="mb-4">Use cases</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Typical workflows</h2>
            </div>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.workflows.map((w, i) => (
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

      {/* FAQ */}
      <section className="py-24">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Frequently asked questions</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mx-auto max-w-2xl">
              <Accordion
                items={product.faqs.map((f, i) => ({ id: String(i), question: f.question, answer: f.answer }))}
              />
            </div>
          </FadeIn>
        </Container>
      </section>

      <CTA />
    </>
  );
}
