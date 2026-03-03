"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { LocationCard } from "@/components/sections/location-card";
import { contact } from "@/content/about";

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-hero-glow">
        <div className="absolute inset-0 bg-grid opacity-[0.3]" aria-hidden="true" />
        <Container className="relative">
          <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Contact" }]} />
          <FadeIn>
            <Badge variant="primary" className="mb-4">{contact.hero.badge}</Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance max-w-3xl leading-[1.1]">
              {contact.hero.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {contact.hero.description}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Offices */}
      <section className="py-24">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Offices"
              title="Where to find us"
            />
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {contact.locations.map((loc, i) => (
              <FadeIn key={loc.label} delay={i * 0.1}>
                <LocationCard location={loc} />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact form */}
      <section className="py-24 bg-muted/30">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Get in touch"
              title="Send us a message"
              description="Whether you're exploring ZUUZ for your team, have a partnership inquiry, or want to learn more — we'd like to hear from you."
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-16 mx-auto max-w-xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = "mailto:hello@zuuz.ai?subject=Website Contact";
                }}
                className="space-y-6 rounded-2xl border border-border bg-card p-8 shadow-sm"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <Input id="name" label="Name" placeholder="Jane Doe" />
                  <Input id="role" label="Role" placeholder="VP Operations" />
                </div>
                <Input id="email" label="Work email" type="email" placeholder="jane@company.com" />
                <Input id="company" label="Company" placeholder="Acme Corp" />
                <Textarea id="message" label="Message" placeholder="Tell us about what you're looking to solve…" />
                <Button type="submit" className="w-full">
                  Send <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Sends via your default email client. We typically respond within one business day.
                </p>
              </form>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Quick links */}
      <section className="py-16 border-t border-border">
        <Container>
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/about/our-story">Our Story</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about/careers">Careers</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about/trust-security">Trust & Security</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
