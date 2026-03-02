import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

interface Step {
  number: string;
  title: string;
  description: string;
}

interface WorkflowStripProps {
  badge?: string;
  title?: string;
  description?: string;
  steps?: Step[];
}

const defaultSteps: Step[] = [
  { number: "01", title: "Connect", description: "Link your tools and data sources in minutes with pre-built connectors." },
  { number: "02", title: "Configure", description: "Set up agents, workflows, and search scopes using visual builders or code." },
  { number: "03", title: "Deploy", description: "Go live with approval gates, monitoring, and rollback built in." },
  { number: "04", title: "Learn", description: "Agents improve from feedback. Workflows adapt to changing conditions." },
  { number: "05", title: "Scale", description: "Roll out across teams and departments with enterprise-grade governance." },
];

export function WorkflowStrip({
  badge = "How it works",
  title = "From connected to intelligent in five steps",
  description,
  steps = defaultSteps,
}: WorkflowStripProps) {
  return (
    <section className="py-24 bg-slate-50/50">
      <Container>
        <FadeIn>
          <SectionHeading badge={badge} title={title} description={description} />
        </FadeIn>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.08}>
              <div
                className={cn(
                  "flex flex-col bg-white p-6 h-full",
                  i === 0 && "sm:rounded-tl-2xl lg:rounded-l-2xl",
                  i === steps.length - 1 && "sm:rounded-br-2xl lg:rounded-r-2xl",
                )}
              >
                <span className="text-xs font-bold text-primary/60 tracking-wider">
                  {step.number}
                </span>
                <h3 className="mt-3 text-base font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
