import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { LogoWall } from "@/components/sections/logo-wall";
import { Testimonials } from "@/components/sections/testimonials";
import { CaseStudyGrid } from "@/components/sections/case-study-grid";
import { CTA } from "@/components/ui/cta";

export const metadata: Metadata = {
  title: "Customers",
  description: "See how leading organizations use ZUUZ to automate operations and unlock productivity.",
};

export default function CustomersPage() {
  return (
    <>
      <Hero
        badge="Customers"
        title="Trusted by teams that ship"
        description="From startups to enterprises, teams use ZUUZ to automate operations, reduce toil, and unlock new levels of productivity."
        primaryCta={{ label: "Request a demo", href: "/about/contact" }}
        secondaryCta={{ label: "Read case studies", href: "#case-studies" }}
      />
      <LogoWall />
      <Testimonials limit={6} />
      <div id="case-studies">
        <CaseStudyGrid />
      </div>
      <CTA />
    </>
  );
}
