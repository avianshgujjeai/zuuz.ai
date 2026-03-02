import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ValuesBento } from "@/components/sections/values-bento";
import { TeamGrid } from "@/components/sections/team-grid";
import { CTA } from "@/components/ui/cta";

export const metadata: Metadata = {
  title: "About Us",
  description: "The story behind ZUUZ — our mission, values, and the team building the future of intelligent enterprise automation.",
};

export default function AboutPage() {
  return (
    <>
      <Hero
        badge="About ZUUZ"
        title="Making every organization intelligent"
        description="We started ZUUZ because enterprises are drowning in tools but starving for intelligence. We're building the unified platform that changes that."
        primaryCta={{ label: "View careers", href: "/about/careers" }}
        secondaryCta={{ label: "Contact us", href: "/about/contact" }}
      />
      <ValuesBento />
      <TeamGrid />
      <CTA />
    </>
  );
}
