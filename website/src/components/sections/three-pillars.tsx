"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const pillars = [
  {
    title: "Persona Copilots",
    subtitle: "Role-specific copilots for Sales, Procurement, HR, Legal, and Ops — designed to act, not just answer.",
    href: "/products/ai-agents",
    accent: "#7c3aed",
    entrance: "pillar-enter-left" as const,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="20" cy="14" r="6" stroke="#7c3aed" strokeWidth="1.5" opacity="0.8" />
        <path d="M10 30c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <circle cx="20" cy="14" r="3" fill="#7c3aed" opacity="0.3" />
        <path d="M14 10l-2-3M26 10l2-3M20 7V4" stroke="#a78bfa" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "Execution Flows",
    subtitle: "Import your existing processes from CRM/ERP/ITSM and run them with policy gates, approvals, and audit trails.",
    href: "/products/workflows",
    accent: "#0018FF",
    entrance: "pillar-enter-bottom" as const,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="8" cy="20" r="4" stroke="#0018FF" strokeWidth="1.5" opacity="0.8" />
        <circle cx="20" cy="10" r="4" stroke="#0018FF" strokeWidth="1.5" opacity="0.8" />
        <circle cx="20" cy="30" r="4" stroke="#0018FF" strokeWidth="1.5" opacity="0.8" />
        <circle cx="32" cy="20" r="4" stroke="#0018FF" strokeWidth="1.5" opacity="0.8" />
        <path d="M12 18l5-5M12 22l5 5M25 13l4 4M25 27l4-4" stroke="#60a5fa" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "Evidence Search",
    subtitle: "One search across every tool — with citations and a ready-to-share context pack behind every decision.",
    href: "/products/unified-search",
    accent: "#0891b2",
    entrance: "pillar-enter-right" as const,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="18" cy="18" r="9" stroke="#0891b2" strokeWidth="1.5" opacity="0.8" />
        <path d="M25 25l8 8" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <circle cx="18" cy="18" r="4" fill="#0891b2" opacity="0.15" />
        <path d="M15 15l6 6M21 15l-6 6" stroke="#22d3ee" strokeWidth="0.8" opacity="0.4" />
      </svg>
    ),
  },
];

export function ThreePillars() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(99,38,255,0.25) 0%, rgba(6,6,20,1) 60%)",
      }}
    >
      {/* Particle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Three capabilities. One execution layer.
          </h2>
          <p className="mt-3 text-base text-purple-300/60">
            Copilots that act. Flows that enforce. Search that proves.
          </p>
        </div>

        {/* Cards — entrance wrapper + float inner */}
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-stretch">
          {pillars.map((pillar, i) => (
            /* Entrance wrapper — handles staggered slide-in */
            <div
              key={pillar.title}
              className={cn(
                "flex-1",
                visible ? `${pillar.entrance} pillar-entered` : pillar.entrance,
              )}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Float wrapper — continuous animation, pauses on hover */}
              <div className={cn("h-full", visible && "pillar-float")} style={{ animationDelay: `${i * 0.8}s` }}>
                <Link
                  href={pillar.href}
                  className="pillar-card group flex flex-col h-full rounded-[20px] p-8 sm:p-10 no-underline"
                  style={{
                    ["--pillar-accent" as string]: pillar.accent,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 0 40px rgba(124,58,237,0.12), 0 8px 32px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="mb-5 w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `${pillar.accent}15`,
                      boxShadow: `0 0 24px ${pillar.accent}25`,
                    }}
                  >
                    {pillar.icon}
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">{pillar.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-5">{pillar.subtitle}</p>

                  <span
                    className="mt-auto inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200"
                    style={{ color: pillar.accent }}
                  >
                    Explore
                    <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Safe Write-back */}
        <div
          className="mt-6 rounded-[16px] p-5 flex items-start gap-4"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(16,185,129,0.1)", boxShadow: "0 0 16px rgba(16,185,129,0.15)" }}
          >
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
              <path d="M10 2l7 4v6c0 3.5-3 6.5-7 8-4-1.5-7-4.5-7-8V6l7-4z" stroke="#10b981" strokeWidth="1.5" opacity="0.8" />
              <path d="M7 10l2 2 4-4" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Safe Write-back</h3>
            <p className="mt-0.5 text-sm text-slate-400 leading-relaxed">
              Approved actions update Salesforce, HubSpot, SAP, ServiceNow, Jira, and more — with permissions enforced.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Entrance animations ── */
        .pillar-enter-left {
          opacity: 0;
          transform: translateX(-60px);
          transition: opacity 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                      transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .pillar-enter-bottom {
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                      transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .pillar-enter-right {
          opacity: 0;
          transform: translateX(60px);
          transition: opacity 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                      transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .pillar-entered {
          opacity: 1 !important;
          transform: translateX(0) translateY(0) !important;
        }

        /* ── Continuous float ── */
        @keyframes float-card {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .pillar-float {
          animation: float-card 5s ease-in-out infinite;
        }

        /* ── Hover: pause float, lift card, glow border ── */
        .pillar-float:hover {
          animation-play-state: paused;
        }
        .pillar-card {
          transition: border-color 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                      box-shadow 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                      transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .pillar-card:hover {
          border-color: var(--pillar-accent) !important;
          box-shadow: 0 0 60px color-mix(in srgb, var(--pillar-accent) 40%, transparent),
                      0 12px 40px rgba(0,0,0,0.5) !important;
          transform: translateY(-8px);
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .pillar-float { animation: none; }
          .pillar-enter-left,
          .pillar-enter-bottom,
          .pillar-enter-right {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
