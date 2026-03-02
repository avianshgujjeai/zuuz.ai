import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAboutPage, getAllAboutSlugs } from "@/content/about";
import { HeroShell } from "@/components/sections/hero-shell";
import { PlaceholderSection } from "@/components/sections/placeholder-section";
import { CTA } from "@/components/ui/cta";

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
      <HeroShell
        badge={page.title}
        title={`${page.title} headline placeholder`}
        description={page.description}
        breadcrumbs={[{ label: "About", href: "/about" }, { label: page.title }]}
        compact
      />

      <PlaceholderSection
        title="Primary content section"
        variant="bento"
      />

      <PlaceholderSection
        title="Secondary content section"
        variant="muted"
      />

      <CTA />
    </>
  );
}
