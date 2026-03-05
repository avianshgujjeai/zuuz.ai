"use client";

import { useState } from "react";
import Link from "next/link";
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
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-10 pb-12 bg-hero-glow">
        <Container className="relative">
          <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Contact" }]} />
          <FadeIn>
            <Badge variant="primary" className="mb-4">{contact.hero.badge}</Badge>
            <h1 className="font-display text-foreground max-w-2xl">{contact.hero.title}</h1>
            <p className="mt-3 max-w-xl text-base text-muted-foreground leading-relaxed">{contact.hero.description}</p>
          </FadeIn>
        </Container>
      </section>

      {/* Offices */}
      <section className="py-14">
        <Container>
          <FadeIn><SectionHeading badge="Offices" title="Where to find us" /></FadeIn>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {contact.locations.map((loc, i) => (
              <FadeIn key={loc.label} delay={i * 0.1}><LocationCard location={loc} /></FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact form */}
      <section className="py-14 bg-muted/30">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Get in touch"
              title="Send us a message"
              description="Whether you're exploring ZUUZ for your team, have a partnership inquiry, or want to learn more — we'd like to hear from you."
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-12 mx-auto max-w-xl">
              {status === "success" ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                  <p className="text-lg font-semibold text-emerald-800">Thank you!</p>
                  <p className="mt-2 text-sm text-emerald-700">Your message has been received. We typically respond within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-white p-8 shadow-sm">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input id="name" name="name" label="Full name" placeholder="Jane Doe" required />
                    <Input id="role" name="role" label="Role" placeholder="VP Operations" />
                  </div>
                  <Input id="email" name="email" label="Work email" type="email" placeholder="jane@company.com" required />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input id="company" name="company" label="Company" placeholder="Acme Corp" required />
                    <Input id="phone" name="phone" label="Phone (optional)" type="tel" placeholder="+1 555 0100" />
                  </div>
                  <Textarea id="message" name="message" label="Message" placeholder="Tell us about what you're looking to solve…" required />
                  {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
                  <Button type="submit" className="w-full" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : "Send message"}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    We typically respond within one business day.
                  </p>
                </form>
              )}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Quick links */}
      <section className="py-12 border-t border-border">
        <Container>
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="outline" asChild><Link href="/about/our-story">Our Story</Link></Button>
              <Button variant="outline" asChild><Link href="/about/careers">Careers</Link></Button>
              <Button variant="outline" asChild><Link href="/about/trust-security">Trust & Security</Link></Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
