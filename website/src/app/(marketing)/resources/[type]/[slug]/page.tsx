import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getResourceItem, getResourceType, getAllResourceItemParams } from "@/content/resources";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";

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
      <section className="pt-12 pb-8 bg-hero-glow">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Resources", href: "/resources" },
              { label: rt.label, href: `/resources/${rt.slug}` },
              { label: item.title },
            ]}
          />
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="primary">{rt.label}</Badge>
              {item.readTime && <span className="text-sm text-slate-400">{item.readTime}</span>}
              <span className="text-sm text-slate-400">{item.date}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance max-w-3xl">
              {item.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-500 leading-relaxed">
              {item.description}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Placeholder content area — MDX-ready */}
      <section className="py-24">
        <Container>
          <div className="prose prose-slate mx-auto max-w-2xl">
            <FadeIn>
              <div className="rounded-xl border border-dashed border-border bg-slate-50/50 p-12 text-center">
                <p className="text-sm text-slate-400">
                  Content placeholder — replace with MDX or CMS content.
                </p>
                <p className="mt-2 text-xs text-slate-300">
                  This layout is MDX-ready. Drop in your content source and this template will render it.
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
