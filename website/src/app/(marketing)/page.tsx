import type { Metadata } from "next";
import { HeroShell } from "@/components/sections/hero-shell";
import { BentoGrid } from "@/components/sections/bento-grid";
import { PlaceholderSection } from "@/components/sections/placeholder-section";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { CTA } from "@/components/ui/cta";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata: Metadata = {
  title: "ZUUZ — Page title placeholder",
  description: "Page description placeholder.",
};

export default function HomePage() {
  return (
    <>
      <HeroShell
        badge="Badge placeholder"
        title="Headline placeholder"
        description="1–2 sentence hero description placeholder."
        primaryCta={{ label: "Primary action", href: "/about/contact" }}
        secondaryCta={{ label: "Secondary action", href: "/products/agents" }}
      />

      <section className="py-16 border-y border-border">
        <Container>
          <FadeIn>
            <LogoCloud />
          </FadeIn>
        </Container>
      </section>

      <BentoGrid
        badge="Platform"
        title="Bento grid section title"
        description="1–2 sentence section description placeholder."
        items={[
          { title: "Pillar one", description: "1–2 sentence placeholder.", href: "/products/agents", span: "wide" },
          { title: "Pillar two", description: "1–2 sentence placeholder.", href: "/products/workflows" },
          { title: "Pillar three", description: "1–2 sentence placeholder.", href: "/products/unified-search" },
        ]}
      />

      <PlaceholderSection
        badge="How it works"
        title="Workflow section title"
        description="1–2 sentence placeholder."
        variant="muted"
      />

      <PlaceholderSection
        badge="Customers"
        title="Testimonials section title"
        variant="cards"
      />

      <CTA />
    </>
  );
}
