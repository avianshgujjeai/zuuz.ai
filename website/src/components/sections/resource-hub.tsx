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
            title="Resource hub section title"
            description="1–2 sentence section description placeholder."
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
                      <Badge variant="outline" className="mb-3">{type.label}</Badge>
                      <CardTitle className="text-base">{item.title}</CardTitle>
                      <CardDescription className="mt-1">{item.description}</CardDescription>
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
