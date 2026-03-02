"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

export function ContactForm() {
  return (
    <section className="py-24">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-xl">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-6 rounded-2xl border border-border bg-white p-8 shadow-sm"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1.5">
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Jane"
                    className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="jane@company.com"
                  className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  placeholder="Acme Corp"
                  className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your use case..."
                  className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>
              <Button type="submit" className="w-full">
                Send message
              </Button>
              <p className="text-center text-xs text-slate-400">
                We&apos;ll get back to you within one business day.
              </p>
            </form>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
