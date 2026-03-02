import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FadeIn } from "@/components/ui/fade-in";

interface HeroShellProps {
  badge?: string;
  title?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  breadcrumbs?: { label: string; href?: string }[];
  compact?: boolean;
}

export function HeroShell({
  badge = "Badge placeholder",
  title = "Headline placeholder",
  description = "1–2 sentence description placeholder for this page.",
  primaryCta,
  secondaryCta,
  breadcrumbs,
  compact = false,
}: HeroShellProps) {
  return (
    <section
      className={`relative overflow-hidden bg-hero-glow ${compact ? "pt-12 pb-16" : "pt-16 pb-24 sm:pt-24 sm:pb-32"}`}
    >
      <div className="absolute inset-0 bg-grid opacity-[0.35]" aria-hidden="true" />
      <Container className="relative">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <FadeIn>
          <div className={breadcrumbs ? "" : "mx-auto max-w-3xl text-center"}>
            {badge && (
              <Badge variant="primary" className="mb-4">
                {badge}
              </Badge>
            )}
            <h1
              className={`font-bold tracking-tight text-foreground text-balance leading-[1.1] ${
                compact
                  ? "text-3xl sm:text-4xl max-w-3xl"
                  : "text-4xl sm:text-5xl lg:text-6xl"
              }`}
            >
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
              {description}
            </p>
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
                {primaryCta && (
                  <Button size="lg" asChild>
                    <Link href={primaryCta.href}>
                      {primaryCta.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
                {secondaryCta && (
                  <Button variant="outline" size="lg" asChild>
                    <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
