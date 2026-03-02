import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getResourceType, getAllResourceTypeSlugs } from "@/content/resources";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { CTA } from "@/components/ui/cta";
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
  return { title: `${rt.label} — Resources`, description: rt.description };
}

export default async function ResourceTypePage({ params }: Props) {
  const { type } = await params;
  const rt = getResourceType(type);
  if (!rt) notFound();

  return (
    <>
      <section className="pt-12 pb-16 bg-hero-glow">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Resources", href: "/resources" },
              { label: rt.label },
            ]}
          />
          <FadeIn>
            <Badge variant="primary" className="mb-4">{rt.label}</Badge>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl max-w-2xl">
              {rt.label}
            </h1>
            <p className="mt-3 max-w-xl text-lg text-slate-500 leading-relaxed">{rt.description}</p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rt.items.map((item, i) => (
              <FadeIn key={item.slug} delay={i * 0.06}>
                <Card href={`/resources/${rt.slug}/${item.slug}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">{rt.label}</Badge>
                    {item.readTime && <span className="text-xs text-slate-400">{item.readTime}</span>}
                  </div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription className="mt-2">{item.description}</CardDescription>
                  <p className="mt-3 text-xs text-slate-400">{item.date}</p>
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
