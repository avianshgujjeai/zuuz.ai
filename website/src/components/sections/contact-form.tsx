"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "@/components/ui/fade-in";

export function ContactForm() {
  return (
    <section className="py-16">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-xl">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-6 rounded-2xl border border-border bg-card p-8 shadow-sm"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Input id="firstName" label="First name" placeholder="Jane" />
                <Input id="lastName" label="Last name" placeholder="Doe" />
              </div>
              <Input id="email" label="Work email" type="email" placeholder="jane@company.com" />
              <Input id="company" label="Company" placeholder="Acme Corp" />
              <Textarea id="message" label="Message" placeholder="Tell us about your use case…" />
              <Button type="submit" className="w-full">
                Send message
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Form submit placeholder — no backend connected.
              </p>
            </form>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
