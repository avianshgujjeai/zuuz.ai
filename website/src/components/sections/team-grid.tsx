import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";

const placeholderTeam = [
  { name: "Name Placeholder", role: "Role placeholder" },
  { name: "Name Placeholder", role: "Role placeholder" },
  { name: "Name Placeholder", role: "Role placeholder" },
  { name: "Name Placeholder", role: "Role placeholder" },
  { name: "Name Placeholder", role: "Role placeholder" },
  { name: "Name Placeholder", role: "Role placeholder" },
];

export function TeamGrid() {
  return (
    <section className="py-24 bg-muted/30">
      <Container>
        <FadeIn>
          <SectionHeading
            badge="Team"
            title="Team section title"
            description="1–2 sentence section description placeholder."
          />
        </FadeIn>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {placeholderTeam.map((m, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 h-14 w-14 rounded-full bg-muted" />
                <h3 className="text-base font-semibold text-foreground">{m.name}</h3>
                <p className="text-sm font-medium text-primary">{m.role}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
