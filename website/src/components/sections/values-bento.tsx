import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";

const placeholderValues = [
  { title: "Value one", description: "Value description placeholder." },
  { title: "Value two", description: "Value description placeholder." },
  { title: "Value three", description: "Value description placeholder." },
  { title: "Value four", description: "Value description placeholder." },
  { title: "Value five", description: "Value description placeholder." },
  { title: "Value six", description: "Value description placeholder." },
];

export function ValuesBento() {
  return (
    <section className="py-16">
      <Container>
        <FadeIn>
          <SectionHeading
            badge="Values"
            title="Values section title"
            description="1–2 sentence section description placeholder."
          />
        </FadeIn>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {placeholderValues.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.06}>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-3 h-10 w-10 rounded-lg bg-primary/10" />
                <h3 className="text-base font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
