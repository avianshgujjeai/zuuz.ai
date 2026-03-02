import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ResourceHub } from "@/components/sections/resource-hub";
import { CTA } from "@/components/ui/cta";

export const metadata: Metadata = {
  title: "Resources",
  description: "Blog posts, guides, webinars, and documentation to help you get the most out of ZUUZ.",
};

export default function ResourcesPage() {
  return (
    <>
      <Hero
        badge="Resources"
        title="Learn, build, and grow"
        description="Everything you need to get the most out of ZUUZ — from quick-start guides to deep technical docs."
        primaryCta={{ label: "Browse docs", href: "/resources/docs" }}
        secondaryCta={{ label: "Read the blog", href: "/resources/blog" }}
      />
      <ResourceHub />
      <CTA />
    </>
  );
}
