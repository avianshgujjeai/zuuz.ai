import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getResourceType, getAllResourceTypeSlugs } from "@/content/resources";
import { HeroShell } from "@/components/sections/hero-shell";
import { CTA } from "@/components/ui/cta";
import { Container } from "@/components/ui/container";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";

interface Props {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  return getAllResourceTypeSlugs().map((type) => ({ type }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const rt = getResourceType(type);
  if (!rt) return {};
  return { title: `${rt.label} — Resources — ZUUZ`, description: rt.description };
}

export default async function ResourceTypePage({ params }: Props) {
  const { type } = await params;
  const rt = getResourceType(type);
  if (!rt) notFound();

  return (
    <>
      <HeroShell
        badge={rt.label}
        title={`${rt.label} headline placeholder`}
        description={rt.description}
        breadcrumbs={[{ label: "Resources", href: "/resources" }, { label: rt.label }]}
        compact
      />

      <section className="py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rt.items.map((item, i) => (
              <FadeIn key={item.slug} delay={i * 0.06}>
                <Card href={`/resources/${rt.slug}/${item.slug}`}>
                  <Badge variant="outline" className="mb-3">{rt.label}</Badge>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription className="mt-2">{item.description}</CardDescription>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
