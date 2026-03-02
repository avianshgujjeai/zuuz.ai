import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getAllProductSlugs } from "@/content/products";
import { HeroShell } from "@/components/sections/hero-shell";
import { PlaceholderSection } from "@/components/sections/placeholder-section";
import { CTA } from "@/components/ui/cta";

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
      <HeroShell
        badge={product.title}
        title="Product headline placeholder"
        description={product.description}
        breadcrumbs={[{ label: "Products", href: "/" }, { label: product.title }]}
        compact
      />

      <PlaceholderSection
        badge="Features"
        title="Feature grid section title"
        variant="bento"
      />

      <PlaceholderSection
        badge="Use cases"
        title="Workflows section title"
        variant="cards"
        className="bg-muted/30"
      />

      <PlaceholderSection title="FAQ section title" />

      <CTA />
    </>
  );
}
