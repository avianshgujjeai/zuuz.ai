import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { IndustryGrid } from "@/components/sections/industry-grid";
import { CTA } from "@/components/ui/cta";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Purpose-built AI automation for every industry — from IT services to manufacturing.",
};

export default function SolutionsPage() {
  return (
    <>
      <Hero
        badge="Solutions"
        title="Built for your industry"
        description="Purpose-built agents, workflows, and search experiences for the challenges your industry faces every day."
        primaryCta={{ label: "Request a demo", href: "/about/contact" }}
        secondaryCta={{ label: "View customers", href: "/customers" }}
      />
      <IndustryGrid />
      <CTA />
    </>
  );
}
