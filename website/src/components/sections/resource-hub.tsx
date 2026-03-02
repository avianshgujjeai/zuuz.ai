"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs } from "@/components/ui/tabs";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { resourceTypes } from "@/content/resources";

export function ResourceHub() {
  const tabs = resourceTypes.map((rt) => ({ id: rt.slug, label: rt.label }));

  return (
    <section className="py-24">
      <Container>
        <FadeIn>
          <SectionHeading
            badge="Resources"
            title="Learn, build, and grow"
            description="Everything you need to get the most out of ZUUZ — from quick-start guides to deep technical docs."
          />
        </FadeIn>
        <FadeIn delay={0.1}>
          <Tabs tabs={tabs} className="mt-12">
            {(activeTab) => {
              const type = resourceTypes.find((r) => r.slug === activeTab);
              if (!type) return null;
              return (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {type.items.map((item) => (
                    <Card key={item.slug} href={`/resources/${type.slug}/${item.slug}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline">{type.label}</Badge>
                        {item.readTime && <span className="text-xs text-slate-400">{item.readTime}</span>}
                      </div>
                      <CardTitle className="text-base">{item.title}</CardTitle>
                      <CardDescription className="mt-1">{item.description}</CardDescription>
                      <p className="mt-3 text-xs text-slate-400">{item.date}</p>
                    </Card>
                  ))}
                </div>
              );
            }}
          </Tabs>
        </FadeIn>
      </Container>
    </section>
  );
}
