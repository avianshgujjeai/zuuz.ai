import * as icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { values } from "@/content/about";

function getIcon(name: string): LucideIcon {
  return (icons as unknown as Record<string, LucideIcon>)[name] ?? icons.Sparkles;
}

export function ValuesBento() {
  return (
    <section className="py-24">
      <Container>
        <FadeIn>
          <SectionHeading
            badge="Values"
            title="What drives us"
            description="The principles that shape how we build, sell, and support ZUUZ."
          />
        </FadeIn>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => {
            const Icon = getIcon(v.icon);
            return (
              <FadeIn key={v.title} delay={i * 0.06}>
                <div className="rounded-xl border border-border bg-white p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">{v.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">{v.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
