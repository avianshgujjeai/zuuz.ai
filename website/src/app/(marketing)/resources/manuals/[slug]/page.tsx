import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { getManual, getAllManualSlugs } from "@/content/resources";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllManualSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const manual = getManual(slug);
  if (!manual) return {};
  return {
    title: `${manual.title} — ZUUZ Resources`,
    description: manual.summary,
  };
}

export default async function ManualPage({ params }: Props) {
  const { slug } = await params;
  const manual = getManual(slug);
  if (!manual) notFound();

  return (
    <>
      <section className="relative overflow-hidden pt-12 pb-16 bg-hero-glow">
        <div className="absolute inset-0 bg-grid opacity-[0.3]" aria-hidden="true" />
        <Container className="relative">
          <Breadcrumbs items={[
            { label: "Resources", href: "/resources" },
            { label: "Manuals", href: "/resources" },
            { label: manual.title },
          ]} />
          <FadeIn>
            <Badge variant="primary" className="mb-4">Manual</Badge>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance max-w-3xl leading-[1.1]">
              {manual.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {manual.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {manual.tags.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
            <div className="mt-8">
              <Button size="lg" asChild>
                <a href={manual.pdfPath} download>
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* PDF preview */}
      <section className="py-16">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-4xl rounded-2xl border border-border overflow-hidden shadow-sm bg-muted/30">
              <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{manual.title}</span>
                <a
                  href={manual.pdfPath}
                  download
                  className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </a>
              </div>
              <object
                data={manual.pdfPath}
                type="application/pdf"
                className="w-full"
                style={{ height: "70vh", minHeight: "500px" }}
              >
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground/40 mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    PDF preview is not available in your browser.
                  </p>
                  <Button size="sm" asChild>
                    <a href={manual.pdfPath} download>Download PDF</a>
                  </Button>
                </div>
              </object>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <Button variant="ghost" asChild>
            <Link href="/resources">
              <ArrowLeft className="h-4 w-4" />
              Back to Resources
            </Link>
          </Button>
        </Container>
      </section>

      <CTA />
    </>
  );
}
