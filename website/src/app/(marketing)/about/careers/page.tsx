import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTA } from "@/components/ui/cta";
import { FadeIn } from "@/components/ui/fade-in";
import { JobCard } from "@/components/sections/job-card";
import { careers } from "@/content/about";

export const metadata: Metadata = careers.meta;

export default function CareersPage() {
  const indiaJobs = careers.jobs.filter((j) => j.region === "India");
  const usaJobs = careers.jobs.filter((j) => j.region === "USA");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-hero-glow">
        <div className="absolute inset-0 bg-grid opacity-[0.3]" aria-hidden="true" />
        <Container className="relative">
          <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Careers" }]} />
          <FadeIn>
            <Badge variant="primary" className="mb-4">{careers.hero.badge}</Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance max-w-3xl leading-[1.1]">
              {careers.hero.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {careers.hero.description}
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="#open-roles">View open roles <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Culture */}
      <section className="py-16">
        <Container>
          <FadeIn>
            <SectionHeading title={careers.culture.heading} />
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {careers.culture.values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <div className="rounded-xl border border-border bg-card p-6 h-full">
                  <h3 className="text-base font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Open roles */}
      <section id="open-roles" className="py-16 bg-muted/30">
        <Container>
          <FadeIn>
            <SectionHeading
              badge={`${careers.jobs.length} open roles`}
              title="Join us"
              description="We're hiring across engineering, AI, and go-to-market. Click a role to see details."
            />
          </FadeIn>

          {indiaJobs.length > 0 && (
            <div className="mt-16">
              <FadeIn>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">India</h3>
              </FadeIn>
              <div className="space-y-4">
                {indiaJobs.map((job, i) => (
                  <FadeIn key={job.id} delay={i * 0.06}>
                    <JobCard job={job} />
                  </FadeIn>
                ))}
              </div>
            </div>
          )}

          {usaJobs.length > 0 && (
            <div className="mt-12">
              <FadeIn>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">United States</h3>
              </FadeIn>
              <div className="space-y-4">
                {usaJobs.map((job, i) => (
                  <FadeIn key={job.id} delay={i * 0.06}>
                    <JobCard job={job} />
                  </FadeIn>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      <CTA
        title="Don't see a role that fits?"
        description="We're always looking for exceptional people. Send us a note and tell us what you'd build."
        primaryLabel="Email us"
        primaryHref="mailto:careers@zuuz.ai"
        secondaryLabel="Learn about ZUUZ"
        secondaryHref="/about/our-story"
      />
    </>
  );
}
