import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudy, getAllCaseStudySlugs } from "@/content/customers";
import { HeroShell } from "@/components/sections/hero-shell";
import { PlaceholderSection } from "@/components/sections/placeholder-section";
import { CTA } from "@/components/ui/cta";

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
      <HeroShell
        badge={cs.industry}
        title={cs.company}
        description="Case study description placeholder."
        breadcrumbs={[{ label: "Customers", href: "/customers" }, { label: cs.company }]}
        compact
      />

      <PlaceholderSection title="Results section title" variant="cards" />
      <PlaceholderSection title="Problem → Solution → Results" variant="muted" />
      <PlaceholderSection title="Pull quote section" />

      <CTA />
    </>
  );
}
