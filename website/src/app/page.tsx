"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SignalTower } from "@/components/marketing/SignalTower";
import { ArchDiagram } from "@/components/marketing/ArchDiagram";
import { LogoMarquee } from "@/components/marketing/LogoMarquee";
import { StatsBanner } from "@/components/marketing/StatsBanner";
import { VideoDemo } from "@/components/marketing/VideoDemo";
import { Btn } from "@/components/ui/Btn";

/* ─── Shared layout constant ─────────────────────────────── */
const W: React.CSSProperties = { maxWidth: 1200, margin: "0 auto", padding: "0 24px" };

/* ─── Small helpers ──────────────────────────────────────── */
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
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: light ? "#60A5FA" : "#0018FF",
        marginBottom: 10,
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      {children}
    </p>
  );
}

/* ─── How It Works ──────────────────────────────────────── */
const HOW_STEPS = [
  {
    title: "Connect your systems",
    body: "Link your CRM, ERP, email, docs and calendars. 200+ connectors. Live in minutes, no migration needed.",
    visual: "CRM · ERP · Email · Slack · Jira · ServiceNow",
  },
  {
    title: "Assemble context automatically",
    body: "ZUUZ pulls signals across every connected system — contracts, emails, tickets, approvals — and packages them into decision-ready briefs.",
    visual: "Contract context · Email thread · Budget approval · Stakeholder history",
  },
  {
    title: "Route decisions through policy",
    body: "Every decision routes to the right approver with full context. Policy gates enforced automatically. No back-and-forth.",
    visual: "Policy check → Identity verified → Approval gate → Action cleared",
  },
  {
    title: "Write back with full audit trail",
    body: "Approved actions execute back to your systems of record. Every step identity-verified, logged, and auditable.",
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
    <>
      <div className="how-grid">
        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {HOW_STEPS.map((step, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); resetTimer(); }}
              style={{
                textAlign: "left",
                background: active === i ? "white" : "transparent",
                border: active === i ? "1px solid #BFDBFE" : "1px solid #E5E7EB",
                borderRadius: 12,
                padding: "14px 18px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: active === i ? 8 : 0 }}>
                <span
                  style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: active === i ? "#0018FF" : "#F3F4F6",
                    color: active === i ? "#fff" : "#555555",
                    fontSize: 11, fontWeight: active === i ? 600 : 500,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, fontFamily: "Montserrat, sans-serif",
                    transition: "all 0.2s ease",
                  }}
                >
                  {i + 1}
                </span>
                <span
                  style={{
                    fontWeight: 600, fontSize: 14,
                    color: active === i ? "#0C111D" : "#667085",
                    fontFamily: "Montserrat, sans-serif",
                    transition: "color 0.2s ease",
                  }}
                >
                  {step.title}
                </span>
              </div>
              {active === i && (
                <p style={{
                  fontSize: 13, color: "#667085", lineHeight: 1.65,
                  margin: 0, paddingLeft: 36,
                  fontFamily: "Montserrat, sans-serif",
                }}>
                  {step.body}
                </p>
              )}
            </button>
          ))}
        </div>

        {/* Visual panel — unique per step */}
        <div
          style={{
            background: "#F9FAFB",
            border: "1px solid #E4E7EC",
            borderRadius: 16,
            padding: "36px 28px",
            minHeight: 220,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          {active === 0 && (
            <div style={{ width: "100%" }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#555555", textAlign: "center", marginBottom: 14, fontFamily: "Montserrat, sans-serif" }}>200+ connectors · Live in minutes</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {[
                  { name: "SAP",   color: "#0070AD" },
                  { name: "M365",  color: "#0078D4" },
                  { name: "Slack", color: "#4A154B" },
                  { name: "Zoho",  color: "#E42527" },
                  { name: "Jira",  color: "#0052CC" },
                  { name: "Teams", color: "#5059C9" },
                ].map(s => (
                  <div key={s.name} style={{ padding: "8px 10px", background: "white", border: `1.5px solid ${s.color}22`, borderRadius: 8, textAlign: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: s.color, fontFamily: "Montserrat, sans-serif" }}>{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {active === 1 && (
            <div style={{ width: "100%", maxWidth: 260 }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#555555", marginBottom: 14, fontFamily: "Montserrat, sans-serif" }}>Context Pack assembled</p>
              {[
                "Contract context",
                "Email thread",
                "Budget approval",
                "Stakeholder history",
              ].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #F3F4F6" }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                    <rect width="18" height="18" rx="4" fill="#EFF6FF" />
                    <path d="M4.5 9l3 3L13.5 6" stroke="#0018FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#0018FF", fontFamily: "Montserrat, sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
          )}
          {active === 2 && (
            <div style={{ width: "100%" }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#555555", textAlign: "center", marginBottom: 16, fontFamily: "Montserrat, sans-serif" }}>Decision routing</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap", rowGap: 10 }}>
                {[
                  { label: "Request",       color: "#374151", bg: "#F9FAFB",  border: "#D1D5DB" },
                  { label: "Policy Gate ⚡", color: "#92400E", bg: "#FEF3C7",  border: "#F59E0B" },
                  { label: "CFO Approval",  color: "#1E40AF", bg: "#EFF6FF",  border: "#3B82F6" },
                  { label: "Approved ✓",    color: "#065F46", bg: "#ECFDF5",  border: "#10B981" },
                ].map((box, i, arr) => (
                  <div key={box.label} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ padding: "7px 11px", border: `1.5px solid ${box.border}`, borderRadius: 8, background: box.bg }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: box.color, fontFamily: "Montserrat, sans-serif", whiteSpace: "nowrap" }}>{box.label}</span>
                    </div>
                    {i < arr.length - 1 && <div style={{ width: 16, height: 2, background: "#D1D5DB", margin: "0 3px" }} />}
                  </div>
                ))}
              </div>
            </div>
          )}
          {active === 3 && (
            <div style={{ width: "100%", maxWidth: 280 }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#555555", marginBottom: 14, fontFamily: "Montserrat, sans-serif" }}>Audit trail</p>
              {[
                { entry: "REQ-2841 approved", time: "09:42:18 UTC" },
                { entry: "SAP write-back",    time: "09:42:21 UTC" },
                { entry: "PO #4892 generated",time: "09:42:22 UTC" },
              ].map(log => (
                <div key={log.entry} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid #F3F4F6" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="8" cy="8" r="8" fill="#DCFCE7" />
                    <path d="M4.5 8l2.5 2.5L11.5 5.5" stroke="#059669" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: 12, color: "#059669", fontFamily: "'Courier New', monospace", fontWeight: 600 }}>{log.entry}</span>
                  <span style={{ fontSize: 10, color: "#555555", fontFamily: "'Courier New', monospace", marginLeft: "auto" }}>{log.time}</span>
                </div>
              ))}
              <p style={{ fontSize: 11, color: "#555555", marginTop: 10, textAlign: "center", fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}>100% audit coverage · Every action logged</p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .how-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
        @media (max-width: 767px) { .how-grid { grid-template-columns: 1fr !important; gap: 24px !important; } }
      `}</style>
    </>
  );
}

/* ─── Agents ────────────────────────────────────────────── */
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

/* ─── Industries ────────────────────────────────────────── */
const INDUSTRIES = [
  { name: "IT Services",           desc: "Incident management, change approvals, asset governance.", slug: "it-services" },
  { name: "Financial Services",    desc: "Compliance workflows, audit trails, risk decisioning.",    slug: "financial-services" },
  { name: "Healthcare",            desc: "Prior auth, care coordination, regulatory compliance.",     slug: "healthcare" },
  { name: "Distribution",          desc: "Order management, supplier approvals, logistics ops.",      slug: "distribution" },
  { name: "Manufacturing",         desc: "Quality gates, production scheduling, vendor management.",  slug: "manufacturing" },
  { name: "Professional Services", desc: "Engagement delivery, resource allocation, billing.",        slug: "professional-services" },
  { name: "Retail",                desc: "Inventory ops, vendor contracts, returns workflows.",        slug: "retail" },
  { name: "Insurance",             desc: "Claims processing, underwriting support, policy ops.",      slug: "insurance" },
];

/* ─── Page ──────────────────────────────────────────────── */
export default function HomePage() {
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
                  border: "1px solid #E4E7EC",
                  borderRadius: 999,
                  padding: "5px 14px",
                  marginBottom: 24,
                  animation: "fadeIn 0.6s 0.1s both",
                }}
              >
                <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
                  <span
                    style={{
                      position: "absolute", inset: 0, borderRadius: "50%",
                      background: "#10B981", animation: "ping 1.5s ease-out infinite",
                    }}
                  />
                  <span style={{ position: "relative", width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
                </span>
                <span
                  style={{
                    fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.1em", color: "#667085", fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  Agentic AI Execution Layer for your Business
                </span>
              </div>

              {/* H1 */}
              <h1 style={{ marginBottom: 20 }}>
                AI That Gets Business
                <br />
                <span className="gradient-text">Work Done.</span>
              </h1>

              {/* Sub */}
              <p
                style={{
                  fontSize: 18,
                  color: "#6B7280",
                  maxWidth: 490,
                  lineHeight: 1.7,
                  marginBottom: 32,
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                ZUUZ connects to your systems, assembles full context, routes
                decisions through policy, and executes — every action verified,
                logged, and audited.
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
                  See it in action
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
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#667085", fontFamily: "Montserrat, sans-serif" }}>
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — SignalTower */}
            <div
              className="hero-right"
              style={{ animation: "fadeIn 0.8s 0.4s both, floatSlow 8s ease-in-out 1.2s infinite" }}
            >
              <SignalTower />
            </div>
          </div>

          {/* Logo Marquee */}
          <div style={{ borderTop: "1px solid #F2F4F7" }}>
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

      {/* ═══ 2. STATS BANNER ════════════════════════════════ */}
      <StatsBanner />

      {/* ═══ 3. THREE PILLARS ═══════════════════════════════ */}
      <section style={{ padding: "80px 0", borderTop: "1px solid #F2F4F7" }}>
        <div style={W}>
          <div style={{ textAlign: "center", marginBottom: 48 }} className="reveal">
            <Eyebrow>Platform</Eyebrow>
            <h2 style={{ color: "#0C111D", marginBottom: 14 }}>
              Three capabilities. One execution layer.
            </h2>
            <p style={{ fontSize: 18, color: "#475467", maxWidth: 520, margin: "0 auto", fontFamily: "Montserrat, sans-serif" }}>
              Copilots that act. Flows that enforce. Search that proves.
            </p>
          </div>

          <div className="pillars-grid">
            {[
              {
                iconBg: "#EFF6FF",
                iconStroke: "#0018FF",
                title: "Persona Copilots",
                body: "AI agents built for specific enterprise roles. Each one handles a complete job — not just a chat response.",
                link: "Learn more →",
                href: "/products/ai-agents",
                linkColor: "#0018FF",
                delay: "delay-0",
              },
              {
                iconBg: "#F5F3FF",
                iconStroke: "#7C3AED",
                title: "Execution Flows",
                body: "Automated multi-step workflows that enforce policy, route approvals, and write back to your systems of record.",
                link: "Learn more →",
                href: "/products/workflows",
                linkColor: "#7C3AED",
                delay: "delay-1",
              },
              {
                iconBg: "#ECFDF5",
                iconStroke: "#059669",
                title: "Evidence Search",
                body: "Ask questions in plain language. Get permission-safe, evidence-grounded answers with citations and source links.",
                link: "Learn more →",
                href: "/products/unified-search",
                linkColor: "#059669",
                delay: "delay-2",
              },
            ].map((cap) => (
              <div
                key={cap.title}
                className={`z-card reveal ${cap.delay}`}
                style={{
                  background: "#fff",
                  border: "1px solid #E4E7EC",
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <div
                  style={{
                    width: 40, height: 40, borderRadius: 10, background: cap.iconBg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="7.5" stroke={cap.iconStroke} strokeWidth="1.5"/>
                    <path d="M5.5 9l2.5 2.5L12.5 6" stroke={cap.iconStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: 17, color: "#0C111D", marginBottom: 8, letterSpacing: "-0.02em" }}>{cap.title}</h3>
                <p style={{ fontSize: 14, color: "#667085", lineHeight: 1.7, marginBottom: 18, fontFamily: "Montserrat, sans-serif" }}>
                  {cap.body}
                </p>
                <Link
                  href={cap.href}
                  style={{ fontSize: 13, fontWeight: 600, color: cap.linkColor, textDecoration: "none", fontFamily: "Montserrat, sans-serif" }}
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

      {/* ═══ 3b. ARCH DIAGRAM ════════════════════════════════ */}
      <section style={{ padding: "80px 0", background: "#F5F6FF" }}>
        <div style={W}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.11em",
              textTransform: "uppercase", color: "#0018FF", marginBottom: 14,
              fontFamily: "Montserrat, sans-serif" }}>
              Platform Architecture
            </p>
            <h2 style={{ maxWidth: 520, margin: "0 auto 16px", lineHeight: 1.2 }}>
              One layer. Every system. Full control.
            </h2>
            <p style={{ fontSize: 16, color: "#444", lineHeight: 1.75, maxWidth: 480,
              margin: "0 auto", fontFamily: "Montserrat, sans-serif" }}>
              ZUUZ sits between your data sources and actions — assembling context,
              enforcing policy, and writing back with a complete audit trail.
            </p>
          </div>
          <ArchDiagram />
        </div>
      </section>

      {/* ═══ 4. DARK ARCHITECTURE (SignalTower) ═════════════ */}
      <section style={{ padding: "80px 0", background: "#0C111D" }}>
        <div style={W}>
          <div className="arch-grid">
            {/* Left copy */}
            <div className="reveal">
              <Eyebrow light>Architecture</Eyebrow>
              <h2 style={{ color: "#fff", marginBottom: 18 }}>
                Signal in. Decision out.{" "}
                <span style={{ color: "#475467" }}>Audit logged.</span>
              </h2>
              <p style={{ fontSize: 17, color: "#98A2B3", lineHeight: 1.75, marginBottom: 28, fontFamily: "Montserrat, sans-serif" }}>
                ZUUZ sits between your data and your systems of action. It assembles
                context, routes through your approval logic, and writes back with full
                identity and audit coverage.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }} className="reveal delay-1">
                {[
                  "Context assembled from 200+ enterprise sources",
                  "Every action identity-verified and permission-checked",
                  "Approval gates enforced before any write-back",
                  "Immutable audit trail on every decision and action",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <GreenCheck />
                    <span style={{ fontSize: 14, color: "#98A2B3", fontFamily: "Montserrat, sans-serif" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right — SignalTower */}
            <div className="reveal delay-2">
              <SignalTower />
            </div>
          </div>
        </div>
        <style>{`
          .arch-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
          @media (max-width: 767px) { .arch-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
        `}</style>
      </section>

      {/* ═══ 5. HOW IT WORKS ════════════════════════════════ */}
      <section style={{ padding: "80px 0", background: "linear-gradient(135deg, #F0F4FF 0%, #F9FAFB 50%, #EFF6FF 100%)" }}>
        <div style={W}>
          <div style={{ textAlign: "center", marginBottom: 48 }} className="reveal">
            <Eyebrow>How it works</Eyebrow>
            <h2 style={{ color: "#0C111D" }}>Weeks, not quarters</h2>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* ═══ 6. VIDEO DEMO ══════════════════════════════════ */}
      <section style={{ padding: "80px 0", background: "#0C111D" }}>
        <div style={W}>
          <div style={{ textAlign: "center", marginBottom: 48 }} className="reveal">
            <Eyebrow light>Product demo</Eyebrow>
            <h2 style={{ color: "#fff", marginBottom: 14 }}>See ZUUZ in action</h2>
            <p style={{ fontSize: 17, color: "#98A2B3", maxWidth: 480, margin: "0 auto", fontFamily: "Montserrat, sans-serif" }}>
              Real copilots. Real workflows. Actual enterprise scenarios.
            </p>
          </div>
          <div className="reveal delay-1">
            <VideoDemo />
          </div>
        </div>
      </section>

      {/* ═══ 7. METRICS ═════════════════════════════════════ */}
      <section style={{ padding: "80px 0", background: "#F9FAFB", borderTop: "1px solid #F2F4F7" }}>
        <div style={W}>
          <div style={{ textAlign: "center", marginBottom: 48 }} className="reveal">
            <Eyebrow>Results</Eyebrow>
            <h2 style={{ color: "#0C111D" }}>Measurable ROI from day one</h2>
          </div>
          <div
            className="metrics-grid reveal delay-1"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              border: "1px solid #E4E7EC",
              borderRadius: 20,
              overflow: "hidden",
              background: "#fff",
            }}
          >
            {[
              { number: "3×",    label: "Faster Decisions",   desc: "Decision cycles from weeks to days",   delay: 0   },
              { number: "100%",  label: "Audit Coverage",     desc: "Every action logged with evidence",    delay: 60  },
              { number: "65%",   label: "Cycle Time Cut",     desc: "From context assembly to execution",   delay: 120 },
              { number: "$2M+",  label: "Leakage Prevented",  desc: "Catch errors before systems of record",delay: 180 },
            ].map(({ number, label, desc, delay }) => (
              <MetricCard key={label} number={number} label={label} desc={desc} delay={delay} />
            ))}
          </div>
        </div>
        <style>{`
          .metrics-grid > div + div { border-left: 1px solid #E4E7EC; }
          @media (max-width: 767px) {
            .metrics-grid { grid-template-columns: repeat(2,1fr) !important; }
            .metrics-grid > div:nth-child(odd) { border-left: none !important; }
            .metrics-grid > div:nth-child(3),
            .metrics-grid > div:nth-child(4) { border-top: 1px solid #E4E7EC; }
          }
        `}</style>
      </section>

      {/* ═══ 8. AGENTS GRID ═════════════════════════════════ */}
      <section style={{ padding: "80px 0", borderTop: "1px solid #F2F4F7" }}>
        <div style={W}>
          <div
            className="reveal"
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
              <h2 style={{ color: "#0C111D", margin: 0 }}>An agent for every operational team</h2>
            </div>
            <Link
              href="/products/ai-agents"
              style={{ fontSize: 14, fontWeight: 600, color: "#0018FF", textDecoration: "none", fontFamily: "Montserrat, sans-serif" }}
            >
              Browse all agents →
            </Link>
          </div>

          <div className="agents-grid">
            {AGENTS.map((a, i) => (
              <Link
                key={a.slug}
                href={`/products/agents/${a.slug}`}
                className={`z-card reveal delay-${i % 4}`}
                style={{
                  display: "block",
                  background: "#fff",
                  border: "1px solid #E4E7EC",
                  borderRadius: 14,
                  padding: 20,
                  textDecoration: "none",
                }}
              >
                <p
                  style={{
                    fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.08em", color: "#0018FF",
                    fontFamily: "Montserrat, sans-serif", marginBottom: 6,
                  }}
                >
                  {a.tag}
                </p>
                <h3 style={{ fontSize: 15, color: "#0C111D", marginBottom: 8, lineHeight: 1.3, letterSpacing: "-0.02em" }}>{a.title}</h3>
                <p style={{ fontSize: 12, color: "#667085", lineHeight: 1.65, marginBottom: 12, fontFamily: "Montserrat, sans-serif" }}>
                  {a.body}
                </p>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#059669", fontFamily: "Montserrat, sans-serif" }}>{a.stat}</p>
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

      {/* ═══ 9. INDUSTRIES ══════════════════════════════════ */}
      <section style={{ padding: "80px 0", background: "#F9FAFB", borderTop: "1px solid #F2F4F7" }}>
        <div style={W}>
          <div style={{ textAlign: "center", marginBottom: 48 }} className="reveal">
            <Eyebrow>Solutions</Eyebrow>
            <h2 style={{ color: "#0C111D" }}>Purpose-built for your industry</h2>
          </div>
          <div className="industries-grid">
            {INDUSTRIES.map((ind, i) => (
              <Link
                key={ind.slug}
                href={`/solutions/${ind.slug}`}
                className={`z-card reveal delay-${i % 4}`}
                style={{
                  display: "block",
                  background: "#fff",
                  border: "1px solid #E4E7EC",
                  borderRadius: 14,
                  padding: 20,
                  textDecoration: "none",
                }}
              >
                <h3 style={{
                  fontSize: 14, fontWeight: 600, color: "#0C111D",
                  marginBottom: 6, fontFamily: "Montserrat, sans-serif",
                  letterSpacing: "-0.02em",
                }}>
                  {ind.name}
                </h3>
                <p style={{ fontSize: 12, color: "#667085", lineHeight: 1.65, marginBottom: 12, fontFamily: "Montserrat, sans-serif" }}>
                  {ind.desc}
                </p>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#0018FF", fontFamily: "Montserrat, sans-serif" }}>
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

      {/* ═══ 10. SECURITY ═══════════════════════════════════ */}
      <section style={{ padding: "80px 0", borderTop: "1px solid #F2F4F7" }}>
        <div style={W}>
          <div style={{ textAlign: "center", marginBottom: 48 }} className="reveal">
            <Eyebrow>Security &amp; Trust</Eyebrow>
            <h2 style={{ color: "#0C111D" }}>Permission-aware by design</h2>
          </div>
          <div className="security-grid">
            {[
              { label: "SOC 2 Type I",     desc: "Independently audited security controls" },
              { label: "SAML 2.0 / SSO",   desc: "Enterprise identity federation" },
              { label: "Role-based access", desc: "Granular permission management" },
              { label: "Audit trail",       desc: "Immutable log of every action" },
              { label: "Evidence links",    desc: "Every decision has a source citation" },
              { label: "On-prem option",    desc: "Deploy in your own environment" },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`reveal delay-${i}`}
                style={{
                  background: "#fff",
                  border: "1px solid #E4E7EC",
                  borderRadius: 14,
                  padding: "20px 16px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 36, height: 36, borderRadius: 10, background: "#DCFCE7",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 10px",
                  }}
                >
                  <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                    <path d="M3.5 8l3 3L12.5 5" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#0C111D", marginBottom: 3, fontFamily: "Montserrat, sans-serif" }}>
                  {item.label}
                </p>
                <p style={{ fontSize: 11, color: "#667085", fontFamily: "Montserrat, sans-serif" }}>{item.desc}</p>
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

      {/* ═══ 11. CTA BANNER ═════════════════════════════════ */}
      <section style={{ padding: "80px 0", borderTop: "1px solid #F2F4F7" }}>
        <div style={W}>
          <div
            className="reveal"
            style={{
              background: "#0C111D",
              borderRadius: 24,
              padding: "64px 56px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Blue glow */}
            <div
              style={{
                position: "absolute", top: -80, right: -80,
                width: 360, height: 360, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(37,99,235,0.3), transparent 70%)",
                pointerEvents: "none",
              }}
            />
            {/* Green glow */}
            <div
              style={{
                position: "absolute", bottom: -60, left: -60,
                width: 280, height: 280, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(5,150,105,0.2), transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
              <h2 style={{ color: "#fff", marginBottom: 14 }}>
                Bring your workflows.{" "}
                <span style={{ color: "#475467" }}>We&apos;ll make them run themselves.</span>
              </h2>
              <p style={{
                fontSize: 17, color: "#98A2B3", lineHeight: 1.75, marginBottom: 40,
                fontFamily: "Montserrat, sans-serif",
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

/* ─── Metric card (scroll-triggered counter) ─────────────── */
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
          fontSize: 46,
          fontWeight: 700,
          color: "#0018FF",
          fontFamily: "Montserrat, sans-serif",
          lineHeight: 1,
          marginBottom: 8,
          letterSpacing: "-0.04em",
        }}
      >
        {number}
      </p>
      <p style={{ fontSize: 14, fontWeight: 600, color: "#0C111D", fontFamily: "Montserrat, sans-serif", marginBottom: 4 }}>
        {label}
      </p>
      <p style={{ fontSize: 12, color: "#667085", fontFamily: "Montserrat, sans-serif", maxWidth: 140, margin: "0 auto" }}>
        {desc}
      </p>
    </div>
  );
}
