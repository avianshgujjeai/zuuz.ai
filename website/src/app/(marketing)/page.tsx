import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { BentoGrid } from "@/components/sections/bento-grid";
import { WorkflowStrip } from "@/components/sections/workflow-strip";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { TrustBar } from "@/components/sections/trust-bar";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/ui/cta";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata: Metadata = {
  title: "ZUUZ — The Intelligent Enterprise Platform",
  description:
    "Deploy AI agents, orchestrate workflows, and search across every tool — all from one unified platform built for the enterprise.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="py-16 border-y border-border">
        <Container>
          <FadeIn>
            <LogoCloud title="Powering the world's best teams" />
          </FadeIn>
        </Container>
      </section>
      <BentoGrid />
      <WorkflowStrip />
      <TrustBar />
      <Testimonials />
      <CTA />
    </>
  );
}
