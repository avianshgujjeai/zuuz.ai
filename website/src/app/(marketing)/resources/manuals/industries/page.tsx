import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { industryManuals } from "@/content/industry-manuals";

export const metadata: Metadata = {
  title: "Industry Manuals — ZUUZ Resources",
  description: "Industry-specific solution documents and operational guides.",
};

export default function IndustryManualsPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-12 pb-14 bg-hero-glow">
        <Container className="relative">
          <Breadcrumbs items={[
            { label: "Resources", href: "/resources" },
            { label: "Manuals", href: "/resources" },
            { label: "Industries" },
          ]} />
          <FadeIn>
            <Badge variant="primary" className="mb-4">Industry Manuals</Badge>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl max-w-2xl">
              Industry solution documents
            </h1>
            <p className="mt-3 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Detailed guides for deploying ZUUZ in specific industries.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industryManuals.map((manual, i) => (
              <FadeIn key={manual.slug} delay={i * 0.06}>
                <Card href={`/resources/manuals/industries/${manual.slug}`} className="h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">PDF</Badge>
                    <Download className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-base">{manual.title}</CardTitle>
                  <CardDescription className="mt-2 flex-1">{manual.summary}</CardDescription>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
