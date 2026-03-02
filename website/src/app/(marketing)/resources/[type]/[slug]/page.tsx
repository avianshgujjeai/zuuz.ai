import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getResourceItem, getResourceType, getAllResourceItemParams } from "@/content/resources";
import { HeroShell } from "@/components/sections/hero-shell";
import { PlaceholderSection } from "@/components/sections/placeholder-section";
import { CTA } from "@/components/ui/cta";

interface Props {
  params: Promise<{ type: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllResourceItemParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, slug } = await params;
  const item = getResourceItem(type, slug);
  if (!item) return {};
  return { title: item.meta.title, description: item.meta.description };
}

export default async function ResourceDetailPage({ params }: Props) {
  const { type, slug } = await params;
  const rt = getResourceType(type);
  const item = getResourceItem(type, slug);
  if (!rt || !item) notFound();

  return (
    <>
      <HeroShell
        badge={rt.label}
        title={item.title}
        description={item.description}
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: rt.label, href: `/resources/${rt.slug}` },
          { label: item.title },
        ]}
        compact
      />

      <PlaceholderSection
        title="Article content area"
        description="MDX or CMS content will render here."
      />

      <CTA />
    </>
  );
}
