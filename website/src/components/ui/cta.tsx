import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Container } from "./container";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

export function CTA({
  title = "CTA headline placeholder",
  description = "1–2 sentence CTA description placeholder.",
  primaryLabel = "Primary action",
  primaryHref = "/about/contact",
  secondaryLabel = "Secondary action",
  secondaryHref = "/about/contact",
  className,
}: CTAProps) {
  return (
    <section className={cn("py-24", className)}>
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-[#0a0a14] px-6 py-16 sm:px-16 sm:py-20">
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,24,255,0.12),transparent)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-grid opacity-[0.06]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
              {title}
            </h2>
            <p className="mt-4 text-lg text-slate-400 leading-relaxed text-balance">
              {description}
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href={primaryHref}>
                  {primaryLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-slate-400 hover:text-white hover:bg-white/8"
                asChild
              >
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
