import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { getIndustryManual, getAllIndustryManualSlugs } from "@/content/industry-manuals";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllIndustryManualSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const manual = getIndustryManual(slug);
  if (!manual) return {};
  return { title: manual.meta.title, description: manual.meta.description };
}

export default async function IndustryManualPage({ params }: Props) {
  const { slug } = await params;
  const manual = getIndustryManual(slug);
  if (!manual) notFound();

  return (
    <>
      <section className="relative overflow-hidden pt-12 pb-14 bg-hero-glow">
        <Container className="relative">
          <Breadcrumbs items={[
            { label: "Resources", href: "/resources" },
            { label: "Industry Manuals", href: "/resources/manuals/industries" },
            { label: manual.title },
          ]} />
          <FadeIn>
            <Badge variant="primary" className="mb-4">Industry Manual</Badge>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl max-w-3xl">
              {manual.title}
            </h1>
            <p className="mt-3 max-w-xl text-lg text-muted-foreground leading-relaxed">{manual.summary}</p>
            <div className="mt-6">
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

      <section className="py-14">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-4xl rounded-2xl border border-border overflow-hidden shadow-sm bg-muted/30">
              <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{manual.title}</span>
                <a href={manual.pdfPath} download className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark transition-colors">
                  <Download className="h-3.5 w-3.5" /> Download
                </a>
              </div>
              <object data={manual.pdfPath} type="application/pdf" className="w-full" style={{ height: "70vh", minHeight: "500px" }}>
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground/40 mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">PDF preview not available in this browser.</p>
                  <Button size="sm" asChild><a href={manual.pdfPath} download>Download PDF</a></Button>
                </div>
              </object>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <Button variant="ghost" asChild>
            <Link href="/resources/manuals/industries"><ArrowLeft className="h-4 w-4" /> Back to Industry Manuals</Link>
          </Button>
        </Container>
      </section>
    </>
  );
}
