import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";

interface Step {
  number: string;
  title: string;
  description: string;
}

interface WorkflowStripProps {
  badge?: string;
  title?: string;
  steps?: Step[];
}

const defaultSteps: Step[] = [
  { number: "01", title: "Step one", description: "Step description placeholder." },
  { number: "02", title: "Step two", description: "Step description placeholder." },
  { number: "03", title: "Step three", description: "Step description placeholder." },
  { number: "04", title: "Step four", description: "Step description placeholder." },
  { number: "05", title: "Step five", description: "Step description placeholder." },
];

export function WorkflowStrip({
  badge = "How it works",
  title = "Workflow section title",
  steps = defaultSteps,
}: WorkflowStripProps) {
  return (
    <section className="py-24 bg-muted/30">
      <Container>
        <FadeIn>
          <SectionHeading badge={badge} title={title} />
        </FadeIn>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.08}>
              <div className="flex flex-col bg-card p-6 h-full">
                <span className="text-xs font-bold text-primary/60 tracking-wider">{step.number}</span>
                <h3 className="mt-3 text-base font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
