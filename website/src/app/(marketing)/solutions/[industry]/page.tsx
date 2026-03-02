import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSolution, getAllSolutionSlugs } from "@/content/solutions";
import { HeroShell } from "@/components/sections/hero-shell";
import { PlaceholderSection } from "@/components/sections/placeholder-section";
import { CTA } from "@/components/ui/cta";

interface Props {
  params: Promise<{ industry: string }>;
}

export async function generateStaticParams() {
  return getAllSolutionSlugs().map((industry) => ({ industry }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  const sol = getSolution(industry);
  if (!sol) return {};
  return { title: sol.meta.title, description: sol.meta.description };
}

export default async function IndustryPage({ params }: Props) {
  const { industry } = await params;
  const sol = getSolution(industry);
  if (!sol) notFound();

  return (
    <>
      <HeroShell
        badge={sol.industry}
        title="Industry headline placeholder"
        description={sol.description}
        breadcrumbs={[{ label: "Solutions", href: "/solutions" }, { label: sol.industry }]}
        compact
      />

      <PlaceholderSection
        badge="Agents"
        title="Top agents section title"
        variant="cards"
      />

      <PlaceholderSection
        badge="Workflows"
        title="Top workflows section title"
        variant="muted"
      />

      <PlaceholderSection
        badge="Search"
        title="Search examples section title"
      />

      <CTA />
    </>
  );
}
