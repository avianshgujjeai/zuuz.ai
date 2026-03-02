import type { Metadata } from "next";
import { HeroShell } from "@/components/sections/hero-shell";
import { PlaceholderSection } from "@/components/sections/placeholder-section";
import { CTA } from "@/components/ui/cta";

export const metadata: Metadata = {
  title: "About — ZUUZ",
  description: "About page description placeholder.",
};

export default function AboutPage() {
  return (
    <>
      <HeroShell
        badge="About"
        title="About headline placeholder"
        description="1–2 sentence about description placeholder."
        primaryCta={{ label: "View careers", href: "/about/careers" }}
        secondaryCta={{ label: "Contact us", href: "/about/contact" }}
      />

      <PlaceholderSection
        badge="Values"
        title="Values bento section title"
        variant="bento"
      />

      <PlaceholderSection
        badge="Team"
        title="Team grid section title"
        variant="cards"
        className="bg-muted/30"
      />

      <CTA />
    </>
  );
}
