import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { getContextPackItem, getAllContextPackSlugs } from "@/content/context-pack";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllContextPackSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getContextPackItem(slug);
  if (!item) return {};
  return { title: item.meta.title, description: item.meta.description };
}

export default async function ContextPackPage({ params }: Props) {
  const { slug } = await params;
  const item = getContextPackItem(slug);
  if (!item) notFound();

  return (
    <>
      <section className="relative overflow-hidden pt-12 pb-14 bg-hero-glow">
        <Container className="relative">
          <Breadcrumbs items={[
            { label: "Resources", href: "/resources" },
            { label: "Context Pack" },
            { label: item.title },
          ]} />
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <Badge variant="primary">Context Pack</Badge>
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl max-w-2xl">
              {item.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <Button variant="ghost" asChild>
            <Link href="/resources">
              <ArrowLeft className="h-4 w-4" />
              Back to Resources
            </Link>
          </Button>
        </Container>
      </section>
    </>
  );
}
