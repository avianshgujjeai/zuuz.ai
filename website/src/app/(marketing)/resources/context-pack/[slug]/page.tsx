import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle2, Download } from "lucide-react";
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

  const pdfPath = `/resources/context-pack/${slug}.pdf`;

  return (
    <>
      <section className="relative overflow-hidden pt-10 pb-12 bg-hero-glow">
        <Container className="relative">
          <Breadcrumbs items={[
            { label: "Resources", href: "/resources" },
            { label: "Context Pack" },
            { label: item.title },
          ]} />
          <FadeIn>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-4 w-4" />
              </div>
              <Badge variant="primary">Context Pack</Badge>
            </div>
            <h1 className="font-display text-foreground max-w-2xl">{item.title}</h1>
            <p className="mt-3 max-w-xl text-base text-muted-foreground leading-relaxed">{item.description}</p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl">
              <h2 className="text-lg font-semibold text-foreground mb-4">What gets assembled automatically</h2>
              <ul className="space-y-2.5">
                {item.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
                <Download className="h-6 w-6 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Sample PDF</p>
                <p className="text-[11px] text-muted-foreground/60">
                  Upload a sample to <code className="font-mono">website/public/resources/context-pack/{slug}.pdf</code>
                </p>
                <Button variant="outline" size="sm" className="mt-3" asChild>
                  <a href={pdfPath} download>Download sample PDF</a>
                </Button>
              </div>
            </div>
          </FadeIn>

          <div className="mt-8">
            <Button variant="ghost" asChild>
              <Link href="/resources"><ArrowLeft className="h-4 w-4" /> Back to Resources</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
