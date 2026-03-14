"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FlowDiagram } from "@/components/marketing/FlowDiagram";
import { LogoMarquee } from "@/components/marketing/LogoMarquee";
import { Button } from "@/components/ui/button";

/* ─── useReveal ───────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-x");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Small helpers ───────────────────────────────────── */
function GreenCheck() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <rect width={16} height={16} rx={4} fill="#dcfce7" />
      <path d="M4 8l2.5 2.5L12 5.5" stroke="#10B981" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Eyebrow({ children, color = "#2457FF" }: { children: React.ReactNode; color?: string }) {
  return (
    <p style={{
      fontSize: 12,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      color,
      marginBottom: 12,
      fontFamily: "'Inter', sans-serif",
    }}>
      {children}
    </p>
  );
}

/* ─── Metrics counter ────────────────────────────────── */
function MetricCard({ number, label, desc, delay }: { number: string; label: string; desc: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        textAlign: "center",
        padding: "32px 20px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      <p style={{
        fontSize: 44,
        fontWeight: 900,
        color: "#2457FF",
        fontFamily: "'Manrope', sans-serif",
        lineHeight: 1,
        marginBottom: 8,
      }}>{number}</p>
      <p style={{
        fontSize: 15,
        fontWeight: 800,
        color: "#0B1324",
        fontFamily: "'Inter', sans-serif",
        marginBottom: 4,
      }}>{label}</p>
      <p style={{
        fontSize: 12,
        color: "#64748B",
        fontFamily: "'Inter', sans-serif",
        maxWidth: 140,
        margin: "0 auto",
      }}>{desc}</p>
    </div>
  );
}

/* ─── How It Works ───────────────────────────────────── */
const HOW_STEPS = [
  {
    title: "Connect your systems",
    body: "200+ pre-built connectors for email, CRM, ERP, ITSM, docs, and communication tools. No custom ETL required.",
    visual: "🔌 CRM · ERP · Email · Slack · Jira · ServiceNow",
  },
  {
    title: "Assemble context automatically",
    body: "ZUUZ pulls relevant signals across your connected systems — contracts, emails, tickets, approvals — and packages them into decision-ready briefs.",
    visual: "📋 Context assembled: Contract · Emails · Budget · Approvals",
  },
  {
    title: "Route decisions through policy",
    body: "Every action is identity-verified, permission-checked, and routed through your approval workflows before execution.",
    visual: "🛡️ Policy check → Approval gate → Identity verified",
  },
  {
    title: "Write back with full audit trail",
    body: "Actions are safely written back to your systems of record. Every step is logged with evidence links and an immutable audit trail.",
    visual: "✅ CRM updated · Ticket closed · Audit logged · Evidence saved",
  },
];

function HowItWorks() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % HOW_STEPS.length);
    }, 3200);
  }

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 48,
      alignItems: "start",
    }} className="how-grid">
      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {HOW_STEPS.map((step, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); resetTimer(); }}
            style={{
              textAlign: "left",
              background: active === i ? "rgba(36,87,255,0.04)" : "transparent",
              border: active === i ? "1.5px solid rgba(36,87,255,0.25)" : "1.5px solid #DCE3F1",
              borderRadius: 14,
              padding: "16px 20px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: active === i ? 10 : 0,
            }}>
              <span style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: active === i ? "#2457FF" : "#DCE3F1",
                color: active === i ? "#fff" : "#64748B",
                fontSize: 12,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontFamily: "'Inter', sans-serif",
                transition: "all 0.2s ease",
              }}>
                {i + 1}
              </span>
              <span style={{
                fontWeight: 700,
                fontSize: 14,
                color: active === i ? "#0B1324" : "#64748B",
                fontFamily: "'Inter', sans-serif",
                transition: "color 0.2s ease",
              }}>
                {step.title}
              </span>
            </div>
            {active === i && (
              <p style={{
                fontSize: 13,
                color: "#64748B",
                lineHeight: 1.6,
                fontFamily: "'Inter', sans-serif",
                margin: 0,
                paddingLeft: 34,
              }}>
                {step.body}
              </p>
            )}
          </button>
        ))}
      </div>

      {/* Visual panel */}
      <div style={{
        background: "#F8FAFC",
        border: "1px solid #DCE3F1",
        borderRadius: 20,
        padding: "40px 32px",
        minHeight: 240,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <p style={{
          fontSize: 14,
          color: "#64748B",
          fontFamily: "'Inter', sans-serif",
          textAlign: "center",
          lineHeight: 1.8,
        }}>
          {HOW_STEPS[active].visual}
        </p>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .how-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  );
}

/* ─── Agent cards data ───────────────────────────────── */
const AGENTS = [
  { tag: "Sales", title: "Deal Desk Copilot", body: "Auto-assembles deal summaries, flags risks, routes approvals.", stat: "3× faster quote cycles", slug: "deal-desk" },
  { tag: "HR",    title: "HR Ops Copilot", body: "Handles onboarding, policy queries, and offboarding workflows.", stat: "80% ticket deflection", slug: "hr-ops" },
  { tag: "IT",    title: "IT Service Copilot", body: "Triage incidents, auto-resolve common issues, write back to ITSM.", stat: "65% auto-resolution", slug: "it-service" },
  { tag: "Legal", title: "Contract Copilot", body: "Surface contract terms, flag renewals, route for approval.", stat: "90% faster contract review", slug: "contract-review" },
  { tag: "Finance", title: "AP / AR Copilot", body: "Match invoices, flag discrepancies, route for payment approval.", stat: "$2M+ leakage prevented", slug: "ap-ar" },
  { tag: "Ops",   title: "Procurement Copilot", body: "Evaluate vendors, track POs, enforce policy gates.", stat: "40% cycle time reduction", slug: "procurement" },
  { tag: "CS",    title: "Support Copilot", body: "Auto-draft responses, escalate intelligently, close faster.", stat: "55% CSAT improvement", slug: "support" },
  { tag: "Data",  title: "Analytics Copilot", body: "Pull reports, surface anomalies, brief stakeholders in seconds.", stat: "8h → 12min reporting", slug: "analytics" },
];

/* ─── Industries data ────────────────────────────────── */
const INDUSTRIES = [
  { name: "IT Services",        desc: "Incident management, change approvals, asset governance.", slug: "it-services" },
  { name: "Financial Services", desc: "Compliance workflows, audit trails, risk decisioning.",    slug: "financial-services" },
  { name: "Healthcare",         desc: "Prior auth, care coordination, regulatory compliance.",     slug: "healthcare" },
  { name: "Distribution",       desc: "Order management, supplier approvals, logistics ops.",      slug: "distribution" },
  { name: "Manufacturing",      desc: "Quality gates, production scheduling, vendor management.",  slug: "manufacturing" },
  { name: "Professional Services", desc: "Engagement delivery, resource allocation, billing.",    slug: "professional-services" },
  { name: "Retail",             desc: "Inventory ops, vendor contracts, returns workflows.",       slug: "retail" },
  { name: "Insurance",          desc: "Claims processing, underwriting support, policy ops.",      slug: "insurance" },
];

/* ─── Main Page ──────────────────────────────────────── */
export default function HomePage() {
  useReveal();

  const W = { maxWidth: 1200, margin: "0 auto", padding: "0 24px" };
  const INK = "#0B1324";
  const MUTED = "#64748B";
  const BORDER = "#DCE3F1";
  const BG = "#F8FAFC";
  const DARK = "#081225";
  const BRAND = "#2457FF";
  const SUCCESS = "#10B981";

  return (
    <>
      {/* ═══ 1. HERO ═══════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: 76,
          paddingBottom: 0,
          background: "#fff",
        }}
      >
        {/* Dot grid bg */}
        <div
          className="dot-grid"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.55,
            pointerEvents: "none",
          }}
        />
        {/* Radial vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(36,87,255,0.06), transparent)",
            pointerEvents: "none",
          }}
        />

        <div style={{ ...W, position: "relative" }}>
          {/* Hero 2-col */}
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 56,
              alignItems: "center",
              paddingBottom: 64,
            }}
          >
            {/* LEFT */}
            <div>
              {/* Badge */}
              <div
                className="reveal"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  border: "1px solid #e2e8f0",
                  borderRadius: 40,
                  padding: "6px 14px",
                  marginBottom: 24,
                }}
              >
                {/* Pulsing green dot */}
                <span style={{ position: "relative", width: 8, height: 8, display: "inline-flex" }}>
                  <span
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background: SUCCESS,
                      animation: "zuuz-ping 1.5s ease-out infinite",
                    }}
                  />
                  <span style={{
                    position: "relative",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: SUCCESS,
                  }} />
                </span>
                <span style={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  color: "#475569",
                  fontFamily: "'Inter', sans-serif",
                }}>
                  The Agentic AI Execution Layer for Enterprise
                </span>
              </div>

              {/* H1 */}
              <h1 className="reveal d1" style={{ color: INK, marginBottom: 20 }}>
                Your enterprise runs on decisions.{" "}
                <span style={{ color: "#94a3b8", fontWeight: 700 }}>
                  ZUUZ ensures they execute.
                </span>
              </h1>

              {/* Sub */}
              <p
                className="reveal d2"
                style={{
                  fontSize: 18,
                  color: MUTED,
                  lineHeight: 1.75,
                  maxWidth: 490,
                  marginBottom: 32,
                }}
              >
                Context assembled from email, docs, meetings, CRM and ERP.
                Decisions routed through policy. Actions written back — every step
                identity-verified, permission-checked, and audit-logged.
              </p>

              {/* CTAs */}
              <div
                className="reveal d3"
                style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}
              >
                <Button variant="primary" size="lg" href="/about/contact">
                  Request a demo
                </Button>
                <Button variant="secondary" size="lg" href="/products/ai-agents">
                  See how it works →
                </Button>
              </div>

              {/* Trust badges */}
              <div
                className="reveal d4"
                style={{ display: "flex", flexWrap: "wrap", gap: 12 }}
              >
                {[
                  "SOC 2 Type I",
                  "SAML 2.0 / SSO",
                  "Identity-verified",
                  "200+ connectors",
                  "Immutable audit trail",
                ].map((badge) => (
                  <div
                    key={badge}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <GreenCheck />
                    <span style={{ fontSize: 12, color: MUTED, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — FlowDiagram */}
            <div
              className="hero-right reveal-x d2"
              style={{ animation: "zuuz-float 7s ease-in-out infinite" }}
            >
              <FlowDiagram />
            </div>
          </div>

          {/* Logo Marquee */}
          <div style={{ borderTop: `1px solid #f1f5f9` }}>
            <LogoMarquee />
          </div>
        </div>

        <style>{`
          @media (max-width: 767px) {
            .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .hero-right { animation: none !important; }
          }
        `}</style>
      </section>

      {/* ═══ 2. THREE CAPABILITIES ══════════════════════════ */}
      <section style={{ padding: "80px 0" }}>
        <div style={W}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Eyebrow>Platform</Eyebrow>
            <h2 className="reveal" style={{ color: INK, marginBottom: 16 }}>
              Three capabilities. One execution layer.
            </h2>
            <p className="reveal d1" style={{ fontSize: 18, color: MUTED, maxWidth: 520, margin: "0 auto" }}>
              Copilots that act. Flows that enforce. Search that proves.
            </p>
          </div>

          <div
            className="caps-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}
          >
            {[
              {
                icon: "👤",
                title: "Persona Copilots",
                body: "AI agents built for specific enterprise roles. Each one handles a complete job — not just a chat response.",
                cta: "Learn more →",
                href: "/products/ai-agents",
                accent: BRAND,
                d: "d1",
              },
              {
                icon: "⚡",
                title: "Execution Flows",
                body: "Automated multi-step workflows that enforce policy, route approvals, and write back to your systems of record.",
                cta: "Learn more →",
                href: "/products/workflows",
                accent: "#7c3aed",
                d: "d2",
              },
              {
                icon: "🔍",
                title: "Evidence Search",
                body: "Ask questions in plain language. Get permission-safe, evidence-grounded answers with citations and source links.",
                cta: "Learn more →",
                href: "/products/unified-search",
                accent: SUCCESS,
                d: "d3",
              },
            ].map((cap) => (
              <div
                key={cap.title}
                className={`reveal card-hover ${cap.d}`}
                style={{
                  background: "#fff",
                  border: `1px solid ${BORDER}`,
                  borderRadius: 20,
                  padding: 28,
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 14 }}>{cap.icon}</div>
                <h3 style={{ fontSize: 18, color: INK, marginBottom: 10 }}>{cap.title}</h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.65, marginBottom: 16 }}>{cap.body}</p>
                <Link
                  href={cap.href}
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: cap.accent,
                    textDecoration: "none",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {cap.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 767px) {
            .caps-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ═══ 3. DARK ARCHITECTURE ═══════════════════════════ */}
      <section style={{ background: DARK, padding: "80px 0" }}>
        <div style={W}>
          <div
            className="arch-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}
          >
            {/* Left copy */}
            <div>
              <Eyebrow color="#60A5FA">Architecture</Eyebrow>
              <h2 className="reveal" style={{ color: "#fff", marginBottom: 20 }}>
                Signal in. Decision out.{" "}
                <span style={{ color: "#475569" }}>Audit logged.</span>
              </h2>
              <p className="reveal d1" style={{ fontSize: 17, color: "#94a3b8", lineHeight: 1.7, marginBottom: 28 }}>
                ZUUZ sits between your data and your systems of action. It assembles
                context, routes through your approval logic, and writes back with
                full identity and audit coverage.
              </p>
              <div className="reveal d2" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Context assembled from 200+ enterprise sources",
                  "Every action is identity-verified and permission-checked",
                  "Approval gates enforced before any write-back",
                  "Immutable audit trail on every decision and action",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <GreenCheck />
                    <span style={{ fontSize: 14, color: "#94a3b8", fontFamily: "'Inter', sans-serif" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — FlowDiagram (dark bg version) */}
            <div className="arch-right reveal-x d2">
              <FlowDiagram />
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 767px) {
            .arch-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>

      {/* ═══ 4. HOW IT WORKS ════════════════════════════════ */}
      <section style={{ padding: "80px 0" }}>
        <div style={W}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="reveal" style={{ color: INK }}>Weeks, not quarters</h2>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* ═══ 5. METRICS ═════════════════════════════════════ */}
      <section style={{ background: BG, padding: "80px 0" }}>
        <div style={W}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Eyebrow>Results</Eyebrow>
            <h2 className="reveal" style={{ color: INK }}>Measurable ROI from day one</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              border: `1px solid ${BORDER}`,
              borderRadius: 20,
              overflow: "hidden",
              background: "#fff",
            }}
            className="metrics-grid"
          >
            <MetricCard number="3×"    label="Faster Decisions"        desc="Reduce decision cycles from weeks to days"    delay={0}   />
            <MetricCard number="100%"  label="Audit Coverage"          desc="Every action logged with evidence links"       delay={80}  />
            <MetricCard number="65%"   label="Cycle Time Cut"          desc="From context assembly through execution"       delay={160} />
            <MetricCard number="$2M+"  label="Leakage Prevented"       desc="Catch errors before they reach systems"        delay={240} />
          </div>
        </div>
        <style>{`
          @media (max-width: 767px) {
            .metrics-grid { grid-template-columns: repeat(2,1fr) !important; }
          }
        `}</style>
      </section>

      {/* ═══ 6. AGENTS GRID ═════════════════════════════════ */}
      <section style={{ padding: "80px 0" }}>
        <div style={W}>
          {/* Header row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 32,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <Eyebrow>Persona Copilots</Eyebrow>
              <h2 style={{ color: INK, margin: 0 }}>An agent for every operational team</h2>
            </div>
            <Link
              href="/products/ai-agents"
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: BRAND,
                textDecoration: "none",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Browse all agents →
            </Link>
          </div>

          <div
            className="agents-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}
          >
            {AGENTS.map((agent, i) => (
              <Link
                key={agent.slug}
                href={`/products/agents/${agent.slug}`}
                className={`reveal card-hover d${(i % 4) + 1}`}
                style={{
                  display: "block",
                  background: "#fff",
                  border: `1px solid ${BORDER}`,
                  borderRadius: 16,
                  padding: "20px 20px 16px",
                  textDecoration: "none",
                }}
              >
                <p style={{
                  fontSize: 10,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: BRAND,
                  fontFamily: "'Inter', sans-serif",
                  marginBottom: 6,
                }}>
                  {agent.tag}
                </p>
                <h3 style={{ fontSize: 15, color: INK, marginBottom: 8, lineHeight: 1.3 }}>{agent.title}</h3>
                <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.6, marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>
                  {agent.body}
                </p>
                <p style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: SUCCESS,
                  fontFamily: "'Inter', sans-serif",
                }}>
                  {agent.stat}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .agents-grid { grid-template-columns: repeat(2,1fr) !important; }
          }
          @media (max-width: 480px) {
            .agents-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ═══ 7. INDUSTRIES ══════════════════════════════════ */}
      <section style={{ background: BG, padding: "80px 0" }}>
        <div style={W}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Eyebrow>Solutions</Eyebrow>
            <h2 className="reveal" style={{ color: INK }}>Purpose-built for your industry</h2>
          </div>

          <div
            className="industries-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}
          >
            {INDUSTRIES.map((ind, i) => (
              <Link
                key={ind.slug}
                href={`/solutions/${ind.slug}`}
                className={`reveal card-hover d${(i % 4) + 1}`}
                style={{
                  display: "block",
                  background: "#fff",
                  border: `1px solid ${BORDER}`,
                  borderRadius: 16,
                  padding: "20px",
                  textDecoration: "none",
                }}
              >
                <h3 style={{ fontSize: 14, fontWeight: 800, color: INK, marginBottom: 6, fontFamily: "'Inter', sans-serif" }}>
                  {ind.name}
                </h3>
                <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.6, marginBottom: 10, fontFamily: "'Inter', sans-serif" }}>
                  {ind.desc}
                </p>
                <span style={{ fontSize: 12, fontWeight: 700, color: BRAND, fontFamily: "'Inter', sans-serif" }}>
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .industries-grid { grid-template-columns: repeat(2,1fr) !important; }
          }
          @media (max-width: 480px) {
            .industries-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ═══ 8. TRUST / SECURITY ════════════════════════════ */}
      <section style={{ padding: "80px 0" }}>
        <div style={W}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Eyebrow>Security &amp; Trust</Eyebrow>
            <h2 className="reveal" style={{ color: INK }}>Permission-aware by design</h2>
          </div>

          <div
            className="trust-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12 }}
          >
            {[
              { label: "SOC 2 Type I",       desc: "Independently audited security controls" },
              { label: "SAML 2.0 / SSO",     desc: "Enterprise identity federation" },
              { label: "Role-based access",  desc: "Granular permission management" },
              { label: "Audit trail",         desc: "Immutable log of every action" },
              { label: "Evidence links",      desc: "Every decision has a source citation" },
              { label: "On-prem option",      desc: "Deploy in your own environment" },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`reveal d${i + 1}`}
                style={{
                  background: "#fff",
                  border: `1px solid ${BORDER}`,
                  borderRadius: 16,
                  padding: "20px 16px",
                  textAlign: "center",
                }}
              >
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "#dcfce7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                }}>
                  <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                    <path d="M3.5 8l3 3L12.5 5" stroke="#10B981" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ fontSize: 12, fontWeight: 800, color: INK, marginBottom: 4, fontFamily: "'Inter', sans-serif" }}>
                  {item.label}
                </p>
                <p style={{ fontSize: 11, color: MUTED, fontFamily: "'Inter', sans-serif" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .trust-grid { grid-template-columns: repeat(3,1fr) !important; }
          }
          @media (max-width: 540px) {
            .trust-grid { grid-template-columns: repeat(2,1fr) !important; }
          }
        `}</style>
      </section>

      {/* ═══ 9. FINAL CTA BANNER ════════════════════════════ */}
      <section style={{ padding: "80px 0" }}>
        <div style={W}>
          <div
            style={{
              background: DARK,
              borderRadius: 28,
              padding: "64px 56px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Grid lines bg */}
            <div
              className="grid-lines"
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.07,
                pointerEvents: "none",
              }}
            />
            {/* Blue glow top-right */}
            <div style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(36,87,255,0.25), transparent 70%)",
              pointerEvents: "none",
            }} />
            {/* Green glow bottom-left */}
            <div style={{
              position: "absolute",
              bottom: -60,
              left: -60,
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(16,185,129,0.18), transparent 70%)",
              pointerEvents: "none",
            }} />

            <div style={{ position: "relative", textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
              <h2 style={{ color: "#fff", marginBottom: 16 }}>
                Bring your workflows.{" "}
                <span style={{ color: "#475569" }}>We&apos;ll make them run themselves.</span>
              </h2>
              <p style={{ fontSize: 17, color: "#94a3b8", lineHeight: 1.7, marginBottom: 36, fontFamily: "'Inter', sans-serif" }}>
                Book a 20-minute demo. Bring your messiest approval workflow —
                we&apos;ll show you what changes in the first two weeks.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                <Button variant="primary" size="lg" href="/about/contact">
                  Request a demo →
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  href="/products/ai-agents"
                >
                  See Persona Copilots
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
