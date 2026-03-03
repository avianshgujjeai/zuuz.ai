import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { getIndustryGuide, getAllIndustryGuideSlugs } from "@/content/resources";
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
  return getAllIndustryGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getIndustryGuide(slug);
  if (!guide) return {};
  return {
    title: `${guide.title} — ZUUZ Resources`,
    description: guide.summary,
  };
}

export default async function IndustryGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getIndustryGuide(slug);
  if (!guide) notFound();

  return (
    <>
      <section className="relative overflow-hidden pt-12 pb-16 bg-hero-glow">
        <div className="absolute inset-0 bg-grid opacity-[0.3]" aria-hidden="true" />
        <Container className="relative">
          <Breadcrumbs items={[
            { label: "Resources", href: "/resources" },
            { label: "Industry Guides", href: "/resources" },
            { label: guide.title },
          ]} />
          <FadeIn>
            <Badge variant="primary" className="mb-4">Industry Guide</Badge>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance max-w-3xl leading-[1.1]">
              {guide.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {guide.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {guide.tags.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
            <div className="mt-8">
              <Button size="lg" asChild>
                <a href={guide.pdfPath} download>
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-4xl rounded-2xl border border-border overflow-hidden shadow-sm bg-muted/30">
              <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{guide.title}</span>
                <a
                  href={guide.pdfPath}
                  download
                  className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </a>
              </div>
              <object
                data={guide.pdfPath}
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
                    <a href={guide.pdfPath} download>Download PDF</a>
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
