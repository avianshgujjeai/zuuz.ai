"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FlowDiagram } from "@/components/marketing/FlowDiagram";
import { LogoMarquee } from "@/components/marketing/LogoMarquee";
import { StatsTicker } from "@/components/marketing/StatsTicker";
import { VideoShowcase } from "@/components/marketing/VideoShowcase";
import { Btn } from "@/components/ui/Btn";

/* ─── Scroll Reveal Hook ─────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".sr,.sr-x,.sr-scale");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── Helpers ───────────────────────────────────────────── */
function GreenCheck({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="8" fill="#DCFCE7" />
      <path d="M4.5 8l2.5 2.5L11.5 5.5" stroke="#10B981" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      style={{
        fontSize: 12,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: light ? "#60A5FA" : "#2563EB",
        marginBottom: 12,
        fontFamily: "var(--font-body)",
      }}
    >
      {children}
    </p>
  );
}

/* ─── Metric card with scroll-triggered counter ─────────── */
function MetricCard({ number, label, desc, delay }: { number: string; label: string; desc: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        padding: "36px 24px",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      <p
        style={{
          fontSize: 48,
          fontWeight: 900,
          color: "#2563EB",
          fontFamily: "var(--font-display)",
          lineHeight: 1,
          marginBottom: 8,
          letterSpacing: "-0.03em",
        }}
      >
        {number}
      </p>
      <p
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: "#0A0F1E",
          fontFamily: "var(--font-body)",
          marginBottom: 4,
        }}
      >
        {label}
      </p>
      <p style={{ fontSize: 12, color: "#64748B", fontFamily: "var(--font-body)", maxWidth: 140, margin: "0 auto" }}>
        {desc}
      </p>
    </div>
  );
}

/* ─── How It Works ──────────────────────────────────────── */
const HOW_STEPS = [
  {
    title: "Connect your systems",
    body: "200+ pre-built connectors for email, CRM, ERP, ITSM, docs, and communication tools. No custom ETL or professional services required.",
    icon: "🔌",
    visual: "CRM · ERP · Email · Slack · Jira · ServiceNow",
  },
  {
    title: "Assemble context automatically",
    body: "ZUUZ pulls relevant signals across every connected system — contracts, emails, tickets, approvals — and packages them into decision-ready briefs.",
    icon: "📋",
    visual: "Contract context · Email thread · Budget approval · Stakeholder history",
  },
  {
    title: "Route decisions through policy",
    body: "Every action is identity-verified, permission-checked, and routed through your approval workflows before any execution.",
    icon: "🛡️",
    visual: "Policy check → Identity verified → Approval gate → Action cleared",
  },
  {
    title: "Write back with full audit trail",
    body: "Actions are safely written back to your systems of record. Every step is logged with evidence links and an immutable audit trail.",
    icon: "✅",
    visual: "CRM updated · Ticket closed · Audit entry created · Evidence archived",
  },
];

function HowItWorks() {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setActive((p) => (p + 1) % HOW_STEPS.length);
    }, 3400);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timer.current) clearInterval(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="how-grid sr">
      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {HOW_STEPS.map((step, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); resetTimer(); }}
            style={{
              textAlign: "left",
              background: active === i ? "rgba(37,99,235,0.04)" : "transparent",
              border: active === i ? "1.5px solid rgba(37,99,235,0.3)" : "1.5px solid #E2E8F0",
              borderRadius: 14,
              padding: "16px 20px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: active === i ? 10 : 0 }}>
              <span
                style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: active === i ? "#2563EB" : "#E2E8F0",
                  color: active === i ? "#fff" : "#64748B",
                  fontSize: 12, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, fontFamily: "var(--font-body)",
                  transition: "all 0.2s ease",
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  fontWeight: 600, fontSize: 14,
                  color: active === i ? "#0A0F1E" : "#64748B",
                  fontFamily: "var(--font-body)",
                  transition: "color 0.2s ease",
                }}
              >
                {step.title}
              </span>
            </div>
            {active === i && (
              <p style={{
                fontSize: 13, color: "#64748B", lineHeight: 1.65,
                margin: 0, paddingLeft: 38,
                fontFamily: "var(--font-body)",
              }}>
                {step.body}
              </p>
            )}
          </button>
        ))}
      </div>

      {/* Visual panel */}
      <div
        style={{
          background: "#F8FAFC",
          border: "1px solid #E2E8F0",
          borderRadius: 20,
          padding: "48px 32px",
          minHeight: 220,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 36 }}>{HOW_STEPS[active].icon}</span>
        <p style={{
          fontSize: 14, color: "#64748B",
          fontFamily: "var(--font-body)", textAlign: "center", lineHeight: 1.8,
        }}>
          {HOW_STEPS[active].visual}
        </p>
      </div>

      <style>{`
        .how-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (max-width: 767px) {
          .how-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  );
}

/* ─── Agents Data ───────────────────────────────────────── */
const AGENTS = [
  { tag: "Sales",   title: "Deal Desk Copilot",   body: "Auto-assembles deal summaries, flags risks, routes approvals.",      stat: "3× faster quote cycles",     slug: "deal-desk" },
  { tag: "HR",      title: "HR Ops Copilot",       body: "Handles onboarding, policy queries, and offboarding workflows.",     stat: "80% ticket deflection",      slug: "hr-ops" },
  { tag: "IT",      title: "IT Service Copilot",   body: "Triage incidents, auto-resolve common issues, write back to ITSM.", stat: "65% auto-resolution",        slug: "it-service" },
  { tag: "Legal",   title: "Contract Copilot",     body: "Surface contract terms, flag renewals, route for approval.",        stat: "90% faster contract review", slug: "contract-review" },
  { tag: "Finance", title: "AP / AR Copilot",      body: "Match invoices, flag discrepancies, route for payment approval.",   stat: "$2M+ leakage prevented",     slug: "ap-ar" },
  { tag: "Ops",     title: "Procurement Copilot",  body: "Evaluate vendors, track POs, enforce policy gates.",               stat: "40% cycle time reduction",   slug: "procurement" },
  { tag: "CS",      title: "Support Copilot",      body: "Auto-draft responses, escalate intelligently, close faster.",      stat: "55% CSAT improvement",       slug: "support" },
  { tag: "Data",    title: "Analytics Copilot",    body: "Pull reports, surface anomalies, brief stakeholders in seconds.",  stat: "8h → 12min reporting",       slug: "analytics" },
];

/* ─── Industries Data ───────────────────────────────────── */
const INDUSTRIES = [
  { name: "IT Services",          desc: "Incident management, change approvals, asset governance.", slug: "it-services" },
  { name: "Financial Services",   desc: "Compliance workflows, audit trails, risk decisioning.",    slug: "financial-services" },
  { name: "Healthcare",           desc: "Prior auth, care coordination, regulatory compliance.",     slug: "healthcare" },
  { name: "Distribution",         desc: "Order management, supplier approvals, logistics ops.",      slug: "distribution" },
  { name: "Manufacturing",        desc: "Quality gates, production scheduling, vendor management.",  slug: "manufacturing" },
  { name: "Professional Services",desc: "Engagement delivery, resource allocation, billing.",       slug: "professional-services" },
  { name: "Retail",               desc: "Inventory ops, vendor contracts, returns workflows.",       slug: "retail" },
  { name: "Insurance",            desc: "Claims processing, underwriting support, policy ops.",      slug: "insurance" },
];

/* ─── Page ──────────────────────────────────────────────── */
export default function HomePage() {
  useReveal();

  const W: React.CSSProperties = { maxWidth: 1240, margin: "0 auto", padding: "0 24px" };

  return (
    <>
      {/* ═══ 1. HERO ════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: 80,
          paddingBottom: 0,
          background: "#fff",
        }}
      >
        {/* Dot grid */}
        <div
          className="dot-grid"
          style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none" }}
        />
        {/* Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent, #fff)",
            pointerEvents: "none",
          }}
        />
        {/* Ambient orb 1 */}
        <div
          style={{
            position: "fixed",
            top: -100,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.12), transparent 70%)",
            pointerEvents: "none",
            zIndex: -1,
            animation: "orb-1 22s ease-in-out infinite",
          }}
        />
        {/* Ambient orb 2 */}
        <div
          style={{
            position: "fixed",
            bottom: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.10), transparent 70%)",
            pointerEvents: "none",
            zIndex: -1,
            animation: "orb-2 28s ease-in-out infinite",
          }}
        />

        <div style={{ ...W, position: "relative" }}>
          {/* Hero 2-col */}
          <div className="hero-2col" style={{ paddingBottom: 24 }}>
            {/* Left */}
            <div>
              {/* Live badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  border: "1px solid #E2E8F0",
                  borderRadius: 999,
                  padding: "6px 16px",
                  marginBottom: 24,
                  animation: "fadeIn 0.6s 0.1s both",
                }}
              >
                {/* Pulsing green dot */}
                <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
                  <span
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background: "#10B981",
                      animation: "ping 1.5s ease-out infinite",
                    }}
                  />
                  <span style={{ position: "relative", width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#64748B",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  The Agentic AI Execution Layer for Enterprise
                </span>
              </div>

              {/* H1 */}
              <h1 style={{ marginBottom: 20, animation: "fadeUp 0.7s 0.2s both" }}>
                Your enterprise runs
                <br />
                on decisions.
                <br />
                <span className="gradient-text">ZUUZ executes them.</span>
              </h1>

              {/* Sub */}
              <p
                style={{
                  fontSize: 18,
                  color: "#64748B",
                  maxWidth: 490,
                  lineHeight: 1.75,
                  marginBottom: 32,
                  animation: "fadeUp 0.7s 0.35s both",
                  fontFamily: "var(--font-body)",
                }}
              >
                Context assembled from email, docs, meetings, CRM and ERP.
                Decisions routed through policy. Every action identity-verified,
                permission-checked, and audit-logged.
              </p>

              {/* CTAs */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  marginBottom: 32,
                  animation: "fadeUp 0.7s 0.5s both",
                }}
              >
                <Btn variant="primary" size="lg" href="/about/contact">
                  Request a demo
                </Btn>
                <Btn variant="secondary" size="lg" href="/products/ai-agents">
                  See how it works →
                </Btn>
              </div>

              {/* Trust strip */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px 24px",
                  animation: "fadeUp 0.7s 0.65s both",
                }}
              >
                {[
                  "SOC 2 Type I",
                  "SAML 2.0 / SSO",
                  "Identity-verified",
                  "200+ connectors",
                  "Immutable audit trail",
                ].map((badge) => (
                  <div key={badge} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <GreenCheck />
                    <span style={{
                      fontSize: 12, fontWeight: 600, color: "#64748B",
                      fontFamily: "var(--font-body)",
                    }}>
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — FlowDiagram */}
            <div
              className="hero-right animate-float-slow"
              style={{ animation: "fadeIn 0.8s 0.4s both, floatSlow 8s ease-in-out 1.2s infinite" }}
            >
              <FlowDiagram />
            </div>
          </div>

          {/* Logo Marquee */}
          <div style={{ borderTop: "1px solid #F1F5F9" }}>
            <LogoMarquee />
          </div>
        </div>

        <style>{`
          .hero-2col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 56px;
            align-items: center;
          }
          @media (max-width: 767px) {
            .hero-2col { grid-template-columns: 1fr !important; gap: 40px !important; }
            .hero-right { order: -1; }
          }
        `}</style>
      </section>

      {/* ═══ 2. STATS TICKER ════════════════════════════════ */}
      <StatsTicker />

      {/* ═══ 3. THREE PILLARS ═══════════════════════════════ */}
      <section style={{ padding: "80px 0", borderTop: "1px solid #F1F5F9" }}>
        <div style={W}>
          <div style={{ textAlign: "center", marginBottom: 52 }} className="sr">
            <Eyebrow>Platform</Eyebrow>
            <h2 style={{ color: "#0A0F1E", marginBottom: 16 }}>
              Three capabilities. One execution layer.
            </h2>
            <p style={{ fontSize: 18, color: "#64748B", maxWidth: 520, margin: "0 auto", fontFamily: "var(--font-body)" }}>
              Copilots that act. Flows that enforce. Search that proves.
            </p>
          </div>

          <div className="pillars-grid">
            {[
              {
                icon: "👤",
                iconBg: "#EFF6FF",
                title: "Persona Copilots",
                body: "AI agents built for specific enterprise roles. Each one handles a complete job — not just a chat response.",
                link: "Learn more →",
                href: "/products/ai-agents",
                linkColor: "#2563EB",
                d: "d1",
              },
              {
                icon: "⚡",
                iconBg: "#F5F3FF",
                title: "Execution Flows",
                body: "Automated multi-step workflows that enforce policy, route approvals, and write back to your systems of record.",
                link: "Learn more →",
                href: "/products/workflows",
                linkColor: "#7C3AED",
                d: "d2",
              },
              {
                icon: "🔍",
                iconBg: "#ECFDF5",
                title: "Evidence Search",
                body: "Ask questions in plain language. Get permission-safe, evidence-grounded answers with citations and source links.",
                link: "Learn more →",
                href: "/products/unified-search",
                linkColor: "#10B981",
                d: "d3",
              },
            ].map((cap) => (
              <div
                key={cap.title}
                className={`card-lift sr ${cap.d}`}
                style={{
                  background: "#fff",
                  border: "1px solid #E2E8F0",
                  borderRadius: 20,
                  padding: 28,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: cap.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    marginBottom: 16,
                  }}
                >
                  {cap.icon}
                </div>
                <h3 style={{ fontSize: 18, color: "#0A0F1E", marginBottom: 10 }}>{cap.title}</h3>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7, marginBottom: 20, fontFamily: "var(--font-body)" }}>
                  {cap.body}
                </p>
                <Link
                  href={cap.href}
                  style={{
                    fontSize: 13, fontWeight: 700, color: cap.linkColor,
                    textDecoration: "none", fontFamily: "var(--font-body)",
                  }}
                >
                  {cap.link}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .pillars-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
          @media (max-width: 767px) { .pillars-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ═══ 3. DARK ARCHITECTURE ═══════════════════════════ */}
      <section style={{ padding: "80px 0", background: "var(--bg-dark)" }}>
        <div style={W}>
          <div className="arch-grid">
            {/* Left copy */}
            <div className="sr">
              <Eyebrow light>Architecture</Eyebrow>
              <h2 style={{ color: "#fff", marginBottom: 20 }}>
                Signal in. Decision out.{" "}
                <span style={{ color: "#475569" }}>Audit logged.</span>
              </h2>
              <p style={{
                fontSize: 17, color: "#94A3B8", lineHeight: 1.75, marginBottom: 28,
                fontFamily: "var(--font-body)",
              }}>
                ZUUZ sits between your data and your systems of action. It assembles
                context, routes through your approval logic, and writes back with full
                identity and audit coverage.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }} className="sr d1">
                {[
                  "Context assembled from 200+ enterprise sources",
                  "Every action identity-verified and permission-checked",
                  "Approval gates enforced before any write-back",
                  "Immutable audit trail on every decision and action",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <GreenCheck />
                    <span style={{ fontSize: 14, color: "#94A3B8", fontFamily: "var(--font-body)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right */}
            <div className="sr-x d2">
              <FlowDiagram />
            </div>
          </div>
        </div>
        <style>{`
          .arch-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
          @media (max-width: 767px) { .arch-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
        `}</style>
      </section>

      {/* ═══ 4. HOW IT WORKS ════════════════════════════════ */}
      <section style={{ padding: "80px 0", borderTop: "1px solid #F1F5F9" }}>
        <div style={W}>
          <div style={{ textAlign: "center", marginBottom: 52 }} className="sr">
            <Eyebrow>How it works</Eyebrow>
            <h2 style={{ color: "#0A0F1E" }}>Weeks, not quarters</h2>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* ═══ 5. VIDEO SHOWCASE ══════════════════════════════ */}
      <VideoShowcase />

      {/* ═══ 6. METRICS ═════════════════════════════════════ */}
      <section style={{ padding: "80px 0", background: "#F8FAFC", borderTop: "1px solid #F1F5F9" }}>
        <div style={W}>
          <div style={{ textAlign: "center", marginBottom: 48 }} className="sr">
            <Eyebrow>Results</Eyebrow>
            <h2 style={{ color: "#0A0F1E" }}>Measurable ROI from day one</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              border: "1px solid #E2E8F0",
              borderRadius: 24,
              overflow: "hidden",
              background: "#fff",
            }}
            className="metrics-grid"
          >
            <MetricCard number="3×"   label="Faster Decisions"     desc="Decision cycles from weeks to days"   delay={0}   />
            <MetricCard number="100%" label="Audit Coverage"        desc="Every action logged with evidence"     delay={80}  />
            <MetricCard number="65%"  label="Cycle Time Cut"        desc="From context assembly to execution"    delay={160} />
            <MetricCard number="$2M+" label="Leakage Prevented"     desc="Catch errors before systems of record" delay={240} />
          </div>
        </div>
        <style>{`
          .metrics-grid > div + div { border-left: 1px solid #E2E8F0; }
          @media (max-width: 767px) {
            .metrics-grid { grid-template-columns: repeat(2,1fr) !important; }
            .metrics-grid > div:nth-child(odd) { border-left: none !important; }
            .metrics-grid > div:nth-child(3),
            .metrics-grid > div:nth-child(4) { border-top: 1px solid #E2E8F0; }
          }
        `}</style>
      </section>

      {/* ═══ 6. AGENTS GRID ═════════════════════════════════ */}
      <section style={{ padding: "80px 0", borderTop: "1px solid #F1F5F9" }}>
        <div style={W}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 36,
              flexWrap: "wrap",
              gap: 16,
            }}
            className="sr"
          >
            <div>
              <Eyebrow>Persona Copilots</Eyebrow>
              <h2 style={{ color: "#0A0F1E", margin: 0 }}>An agent for every operational team</h2>
            </div>
            <Link
              href="/products/ai-agents"
              style={{ fontSize: 14, fontWeight: 700, color: "#2563EB", textDecoration: "none", fontFamily: "var(--font-body)" }}
            >
              Browse all agents →
            </Link>
          </div>

          <div className="agents-grid">
            {AGENTS.map((a, i) => (
              <Link
                key={a.slug}
                href={`/products/agents/${a.slug}`}
                className={`card-lift sr d${(i % 4) + 1}`}
                style={{
                  display: "block",
                  background: "#fff",
                  border: "1px solid #E2E8F0",
                  borderRadius: 16,
                  padding: "20px",
                  textDecoration: "none",
                }}
              >
                <p
                  style={{
                    fontSize: 10, fontWeight: 800, textTransform: "uppercase",
                    letterSpacing: "0.08em", color: "#2563EB",
                    fontFamily: "var(--font-body)", marginBottom: 6,
                  }}
                >
                  {a.tag}
                </p>
                <h3 style={{ fontSize: 15, color: "#0A0F1E", marginBottom: 8, lineHeight: 1.3 }}>{a.title}</h3>
                <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.65, marginBottom: 12, fontFamily: "var(--font-body)" }}>
                  {a.body}
                </p>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#10B981", fontFamily: "var(--font-body)" }}>{a.stat}</p>
              </Link>
            ))}
          </div>
        </div>
        <style>{`
          .agents-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
          @media (max-width: 960px) { .agents-grid { grid-template-columns: repeat(2,1fr) !important; } }
          @media (max-width: 480px) { .agents-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ═══ 7. INDUSTRIES ══════════════════════════════════ */}
      <section style={{ padding: "80px 0", background: "#F8FAFC", borderTop: "1px solid #F1F5F9" }}>
        <div style={W}>
          <div style={{ textAlign: "center", marginBottom: 48 }} className="sr">
            <Eyebrow>Solutions</Eyebrow>
            <h2 style={{ color: "#0A0F1E" }}>Purpose-built for your industry</h2>
          </div>
          <div className="industries-grid">
            {INDUSTRIES.map((ind, i) => (
              <Link
                key={ind.slug}
                href={`/solutions/${ind.slug}`}
                className={`card-lift sr d${(i % 4) + 1}`}
                style={{
                  display: "block",
                  background: "#fff",
                  border: "1px solid #E2E8F0",
                  borderRadius: 16,
                  padding: "20px",
                  textDecoration: "none",
                }}
              >
                <h3 style={{
                  fontSize: 14, fontWeight: 700, color: "#0A0F1E",
                  marginBottom: 6, fontFamily: "var(--font-display)",
                  letterSpacing: "-0.02em",
                }}>
                  {ind.name}
                </h3>
                <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.65, marginBottom: 12, fontFamily: "var(--font-body)" }}>
                  {ind.desc}
                </p>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#2563EB", fontFamily: "var(--font-body)" }}>
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
        <style>{`
          .industries-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
          @media (max-width: 960px) { .industries-grid { grid-template-columns: repeat(2,1fr) !important; } }
          @media (max-width: 480px) { .industries-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ═══ 8. SECURITY ════════════════════════════════════ */}
      <section style={{ padding: "80px 0", borderTop: "1px solid #F1F5F9" }}>
        <div style={W}>
          <div style={{ textAlign: "center", marginBottom: 48 }} className="sr">
            <Eyebrow>Security &amp; Trust</Eyebrow>
            <h2 style={{ color: "#0A0F1E" }}>Permission-aware by design</h2>
          </div>
          <div className="security-grid">
            {[
              { label: "SOC 2 Type I",      desc: "Independently audited security controls" },
              { label: "SAML 2.0 / SSO",    desc: "Enterprise identity federation" },
              { label: "Role-based access",  desc: "Granular permission management" },
              { label: "Audit trail",        desc: "Immutable log of every action" },
              { label: "Evidence links",     desc: "Every decision has a source citation" },
              { label: "On-prem option",     desc: "Deploy in your own environment" },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`sr d${i + 1}`}
                style={{
                  background: "#fff",
                  border: "1px solid #E2E8F0",
                  borderRadius: 16,
                  padding: "20px 18px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 40, height: 40, borderRadius: 12, background: "#DCFCE7",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 12px",
                  }}
                >
                  <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
                    <path d="M4 9l3.5 3.5L14 6" stroke="#10B981" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#0A0F1E", marginBottom: 4, fontFamily: "var(--font-body)" }}>
                  {item.label}
                </p>
                <p style={{ fontSize: 11, color: "#64748B", fontFamily: "var(--font-body)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .security-grid { display: grid; grid-template-columns: repeat(6,1fr); gap: 12px; }
          @media (max-width: 960px) { .security-grid { grid-template-columns: repeat(3,1fr) !important; } }
          @media (max-width: 540px) { .security-grid { grid-template-columns: repeat(2,1fr) !important; } }
        `}</style>
      </section>

      {/* ═══ 9. CTA BANNER ══════════════════════════════════ */}
      <section style={{ padding: "80px 0", borderTop: "1px solid #F1F5F9" }}>
        <div style={W}>
          <div
            className="sr"
            style={{
              background: "var(--bg-dark)",
              borderRadius: 32,
              padding: "64px 56px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Grid lines */}
            <div
              className="grid-lines"
              style={{ position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none" }}
            />
            {/* Blue glow top-right */}
            <div
              style={{
                position: "absolute", top: -80, right: -80,
                width: 360, height: 360, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(37,99,235,0.3), transparent 70%)",
                pointerEvents: "none",
              }}
            />
            {/* Green glow bottom-left */}
            <div
              style={{
                position: "absolute", bottom: -80, left: -80,
                width: 300, height: 300, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(16,185,129,0.2), transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
              <h2 style={{ color: "#fff", marginBottom: 16 }}>
                Bring your workflows.{" "}
                <span style={{ color: "#475569" }}>We&apos;ll make them run themselves.</span>
              </h2>
              <p style={{
                fontSize: 17, color: "#94A3B8", lineHeight: 1.75, marginBottom: 40,
                fontFamily: "var(--font-body)",
              }}>
                Book a 20-minute demo. Bring your messiest approval workflow —
                we&apos;ll show you what changes in the first two weeks.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                <Btn variant="primary" size="lg" href="/about/contact">
                  Request a demo →
                </Btn>
                <Btn variant="dark-outline" size="lg" href="/products/ai-agents">
                  See Persona Copilots
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
