"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { Plug, Brain, Workflow, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  { icon: Plug, number: "01", title: "Connect", description: "Link your tools in minutes. CRM, ERP, email, docs, calendars — 200+ connectors, no migration required." },
  { icon: Brain, number: "02", title: "Understand", description: "ZUUZ maps your data, permissions, and existing workflows. It learns how your teams actually work." },
  { icon: Workflow, number: "03", title: "Automate", description: "Copilots handle complete tasks. Flows execute multi-step processes. Humans approve what matters." },
  { icon: ShieldCheck, number: "04", title: "Prove", description: "Every action logged with evidence. Audit trails, compliance reports, and measurable time savings — out of the box." },
];

export function WeeksNotQuartersAnimated() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!isInView || prefersReduced) return;
    const iv = setInterval(() => setActiveStep((s) => (s + 1) % steps.length), 2500);
    return () => clearInterval(iv);
  }, [isInView, prefersReduced]);

  return (
    <section className="py-12 md:py-14 bg-section-alt" ref={ref}>
      <Container>
        <SectionHeading
          badge="How it works"
          title="What you get in weeks, not quarters"
          description="From connected to autonomous in four steps."
        />

        <div className="mt-10 relative">
          {/* Desktop progress line */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px bg-border" aria-hidden="true">
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[#A3F3FF] shadow-[0_0_12px_#A3F3FF]"
              animate={prefersReduced ? {} : { left: `${activeStep * 33.33}%` }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const isActive = i === activeStep;
              return (
                <motion.div
                  key={step.title}
                  initial={prefersReduced ? {} : { opacity: 0, y: 14 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={prefersReduced ? { duration: 0 } : { delay: i * 0.1, duration: 0.5 }}
                  className={cn(
                    "relative flex flex-col rounded-2xl border bg-white p-5 transition-all duration-500",
                    isActive && !prefersReduced
                      ? "border-primary/25 shadow-md"
                      : "border-border/70 shadow-sm",
                  )}
                  style={isActive && !prefersReduced ? { boxShadow: "0 0 20px rgba(163, 243, 255, 0.12), 0 4px 12px rgba(0,0,0,0.04)" } : undefined}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-primary/60 tracking-wider">{step.number}</span>
                    <step.icon className={cn("h-4 w-4 transition-colors duration-300", isActive ? "text-primary" : "text-primary/50")} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
