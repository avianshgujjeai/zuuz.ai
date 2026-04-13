import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Container } from "./container";

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
  title = "See ZUUZ in Action — Book a 20-Minute Demo",
  description = "Bring your messiest approval workflow. We'll show you what ZUUZ changes in the first two weeks.",
  primaryLabel = "Request Trial →",
  primaryHref = "https://cal.com/avinashgujje/30min",
  secondaryLabel = "Explore the Platform",
  secondaryHref = "/products/ai-agents",
  className,
}: CTAProps) {
  return (
    <section className={cn("py-16", className)}>
      <Container>
        <div className="relative overflow-hidden rounded-[20px] bg-[#07071a] px-6 py-14 sm:px-16 sm:py-18 shadow-elevated">
          {/* Glow */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,24,255,0.15),transparent)]"
            aria-hidden="true"
          />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 dot-grid opacity-30"
            aria-hidden="true"
          />
          {/* Top edge highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
              {title}
            </h2>
            <p className="mt-4 text-base text-slate-200 leading-relaxed text-balance">
              {description}
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" className="shadow-[0_2px_8px_rgb(0_24_255/0.3)]" asChild>
                <Link href={primaryHref}>
                  {primaryLabel}
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-slate-200 hover:text-white hover:bg-white/8"
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
