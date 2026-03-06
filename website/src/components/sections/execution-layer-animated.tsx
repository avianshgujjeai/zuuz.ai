"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot, GitBranch, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

const capabilities = [
  {
    icon: Bot,
    title: "Persona Copilots",
    description: "Role-specific copilots for Sales, Procurement, HR, Legal, and Ops — designed to act, not just answer.",
    href: "/products/ai-agents",
    pathD: "M 280 60 C 320 60, 360 100, 400 120",
  },
  {
    icon: GitBranch,
    title: "Execution Flows",
    description: "Import your existing processes from CRM/ERP/ITSM and run them with policy gates, approvals, and audit trails.",
    href: "/products/workflows",
    pathD: "M 280 160 C 320 160, 360 140, 400 130",
  },
  {
    icon: Search,
    title: "Evidence Search",
    description: "One search across every tool — with citations and a ready-to-share context pack behind every decision.",
    href: "/products/unified-search",
    pathD: "M 280 260 C 320 260, 360 180, 400 140",
  },
];

export function ExecutionLayerAnimated() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-14 md:py-16">
      <Container>
        <Reveal>
          <SectionHeading
            badge="Platform"
            title="Three capabilities. One execution layer."
            description="Copilots that act. Flows that enforce. Search that proves."
          />
        </Reveal>

        <div className="mt-12 relative">
          {/* Desktop: grid with SVG connectors */}
          <div className="hidden md:grid md:grid-cols-[1fr_200px] gap-8 items-center">
            {/* Left: capability cards */}
            <div className="space-y-4">
              {capabilities.map((cap, i) => (
                <Reveal key={cap.title} delay={i * 0.1}>
                  <Link
                    href={cap.href}
                    className={cn(
                      "group flex items-start gap-4 rounded-2xl border bg-white p-5 transition-all duration-300",
                      hovered === i
                        ? "border-primary/25 shadow-md -translate-y-px"
                        : "border-border/70 shadow-sm hover:shadow-md hover:border-primary/15 hover:-translate-y-px",
                    )}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                      <cap.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{cap.title}</h3>
                      <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">{cap.description}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            {/* Right: hub + connectors */}
            <div className="relative flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 320" fill="none">
                {capabilities.map((cap, i) => (
                  <g key={i}>
                    <path
                      d={`M 0 ${60 + i * 100} Q 60 ${60 + i * 100}, 100 160`}
                      stroke="#0018FF"
                      strokeWidth="1"
                      fill="none"
                      opacity={hovered === i ? 0.4 : 0.15}
                      className="transition-opacity duration-300"
                    />
                    <circle
                      r="3"
                      fill="#A3F3FF"
                      className="connector-dot"
                      style={{
                        offsetPath: `path("M 0 ${60 + i * 100} Q 60 ${60 + i * 100}, 100 160")`,
                        animation: `dot-move 3.5s ease-in-out infinite`,
                        animationDelay: `${i * 1.2}s`,
                      }}
                    />
                  </g>
                ))}
              </svg>
              <Reveal delay={0.3}>
                <div className="relative z-10 rounded-2xl border border-primary/20 bg-white px-5 py-6 text-center shadow-elevated">
                  <div
                    className="absolute inset-0 rounded-2xl opacity-[0.08] -z-10"
                    style={{ background: "radial-gradient(circle, #A3F3FF, transparent 70%)" }}
                  />
                  <p className="text-xs font-bold text-primary uppercase tracking-wider">Execution</p>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider">Layer</p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Mobile: stacked cards */}
          <div className="md:hidden space-y-4">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={i * 0.1}>
                <Link
                  href={cap.href}
                  className="group flex items-start gap-4 rounded-2xl border border-border/70 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/15"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <cap.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{cap.title}</h3>
                    <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">{cap.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        .connector-dot { offset-rotate: 0deg; }
        @media (prefers-reduced-motion: reduce) {
          html:not([data-motion="force"]) .connector-dot { animation: none !important; offset-distance: 50%; }
        }
      `}</style>
    </section>
  );
}
