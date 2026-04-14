"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { SignalTower } from "@/components/marketing/SignalTower";
import { ArchDiagram } from "@/components/marketing/ArchDiagram";
import { LogoMarquee } from "@/components/marketing/LogoMarquee";
import { StatsBanner } from "@/components/marketing/StatsBanner";
import { CustomerBanner } from "@/components/marketing/CustomerBanner";
import { VideoDemo } from "@/components/marketing/VideoDemo";
import { Btn } from "@/components/ui/Btn";

const F = "'Montserrat',sans-serif";
const B = "#0018FF";

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(155deg,#EEF2FF 0%,#ffffff 60%)",
        padding: "96px 0 80px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>

            {/* Left — copy */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "#EEF0FF", borderRadius: 999, marginBottom: 24 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: B, display: "inline-block" }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: B, fontFamily: F }}>
                  For IT Services · Professional Services · Insurance · Distribution
                </span>
              </div>

              <h1 style={{ fontFamily: F, fontSize: "clamp(34px,4.2vw,54px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em", color: "#000", marginBottom: 24 }}>
                Your margin is leaking.<br />
                <span style={{ color: B }}>It happens before</span><br />
                the decision is made.
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.75, color: "#444", maxWidth: 480, marginBottom: 36, fontFamily: F }}>
                ZUUZ gives your operations and management teams the full picture before they approve, commit, or execute — so you stop losing money to incomplete information, chased emails, and delayed sign-offs.
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="/request-trial" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 30px", background: B, color: "#fff", borderRadius: 10, fontSize: 15, fontWeight: 700, fontFamily: F, textDecoration: "none", boxShadow: "0 4px 20px rgba(0,24,255,0.25)" }}>
                  Request a Trial →
                </a>
                <Link href="/customers" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "transparent", color: "#333", border: "1.5px solid #CCC", borderRadius: 10, fontSize: 15, fontWeight: 600, fontFamily: F, textDecoration: "none" }}>
                  See customer results
                </Link>
              </div>

              {/* Trust row */}
              <div style={{ display: "flex", gap: 24, marginTop: 32, flexWrap: "wrap" }}>
                {["SOC 2 Type I", "No IT project needed", "Live in weeks"].map(t => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#DCFCE7"/><path d="M4.5 8l2.5 2.5L11.5 5.5" stroke="#10B981" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#555", fontFamily: F }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Signal Tower visual */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <SignalTower />
            </div>

          </div>
        </div>
      </section>

      {/* ── CUSTOMER BANNER ──────────────────────────────────────── */}
      <CustomerBanner />

      {/* ── LOGO MARQUEE ─────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid #F2F4F7" }}>
        <LogoMarquee />
      </div>

      {/* ── 3 VALUE PILLARS ──────────────────────────────────────── */}
      <section style={{ padding: "88px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: B, fontFamily: F, marginBottom: 14 }}>Why it matters</p>
            <h2 style={{ fontFamily: F, maxWidth: 560, margin: "0 auto", lineHeight: 1.18 }}>Three things ZUUZ fixes that your business is already paying for</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              {
                icon: "⏱",
                title: "Decisions in hours, not days",
                body: "Cut approval time from 3–5 days to under 4 hours across procurement, vendor onboarding, commercial sign-offs, and project starts. Every hour of delay has a cost. Now you can measure and eliminate it.",
                metric: "70%",
                metricLabel: "reduction in approval cycle time",
              },
              {
                icon: "👥",
                title: "Stop paying for management time wasted on follow-up",
                body: "The average operations manager spends 8–12 hours a week chasing emails, status updates, and missing documents. ZUUZ eliminates that coordination tax entirely — for every manager, every week.",
                metric: "10 hrs",
                metricLabel: "saved per manager per week",
              },
              {
                icon: "💰",
                title: "Protect your margin at every decision",
                body: "Decisions made without full context — missing financials, open disputes, undisclosed commitments — cost you money after the fact. ZUUZ puts every relevant fact in front of the right person before they approve.",
                metric: "100%",
                metricLabel: "of decisions made with full context",
              },
            ].map(p => (
              <div key={p.title} style={{ background: "#F5F6FF", borderRadius: 20, padding: "36px 28px", border: "1px solid #E8E8EE" }}>
                <div style={{ fontSize: 32, marginBottom: 20 }}>{p.icon}</div>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: "#000", fontFamily: F, marginBottom: 14, lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: 15, color: "#444", lineHeight: 1.75, fontFamily: F, marginBottom: 24 }}>{p.body}</p>
                <div style={{ borderTop: "1px solid #DDE0F0", paddingTop: 20 }}>
                  <p style={{ fontSize: 32, fontWeight: 800, color: B, fontFamily: F, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 4 }}>{p.metric}</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#10B981", fontFamily: F }}>{p.metricLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ─────────────────────────────────────────── */}
      <StatsBanner />

      {/* ── PROBLEM SECTION ──────────────────────────────────────── */}
      <section style={{ padding: "88px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#EF4444", fontFamily: F, marginBottom: 16 }}>The problem</p>
              <h2 style={{ fontFamily: F, marginBottom: 20, lineHeight: 1.18 }}>The cost of scattered decisions is invisible — until it shows up in your margins</h2>
              <p style={{ fontSize: 17, color: "#444", lineHeight: 1.8, fontFamily: F }}>
                Every week, your business loses money in ways that never appear on a single report. Approvals that take too long. Decisions made on incomplete information. Managers spending half their time coordinating instead of deciding. It adds up.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { cost: "3–5 days",  label: "Average approval cycle for procurement, onboarding, and commercial decisions", sub: "Each day of delay is a day of lost execution speed." },
                { cost: "8–12 hrs",  label: "Management time lost per week per person on chasing emails and status updates", sub: "That time costs you salary. And opportunity." },
                { cost: "High risk", label: "Decisions approved without full financial or operational context", sub: "Disputes, rework, and margin erosion come after." },
                { cost: "No record", label: "Approvals that live only in email threads and memory", sub: "When something goes wrong, the audit trail is missing." },
              ].map(r => (
                <div key={r.label} style={{ display: "flex", gap: 20, alignItems: "flex-start", padding: "20px 24px", background: "#FFF5F5", borderRadius: 14, border: "1px solid #FDE8E8" }}>
                  <div style={{ flexShrink: 0 }}>
                    <p style={{ fontSize: 20, fontWeight: 800, color: "#EF4444", fontFamily: F, lineHeight: 1 }}>{r.cost}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#111", fontFamily: F, marginBottom: 4 }}>{r.label}</p>
                    <p style={{ fontSize: 13, color: "#888", fontFamily: F }}>{r.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION SECTION ─────────────────────────────────────── */}
      <section style={{ padding: "88px 0", background: "#F5F6FF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: B, fontFamily: F, marginBottom: 14 }}>How ZUUZ fixes it</p>
            <h2 style={{ fontFamily: F, maxWidth: 620, margin: "0 auto 20px", lineHeight: 1.18 }}>ZUUZ puts every relevant fact in front of the right person — before they decide</h2>
            <p style={{ fontSize: 17, color: "#555", lineHeight: 1.8, maxWidth: 580, margin: "0 auto", fontFamily: F }}>
              When an approval needs to happen — a vendor onboard, a contract sign-off, a purchase request — ZUUZ assembles every piece of relevant information automatically. Financials, history, open commitments, risk signals. The right person sees everything. They decide. The record is created without manual entry.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {[
              { n: "1", title: "Request comes in", body: "A vendor needs onboarding. A contract needs sign-off. A purchase needs approval. It enters ZUUZ — from email, your system, or directly." },
              { n: "2", title: "Context assembled automatically", body: "ZUUZ pulls financial history, open commitments, previous decisions, risk flags, and policy rules. Nothing is missing when it reaches the approver." },
              { n: "3", title: "Right person. Right information.", body: "The decision goes to the right approver with a complete brief. No chasing. No back-and-forth. No waiting for someone to gather data." },
              { n: "4", title: "Decision recorded. Systems updated.", body: "Once approved, ZUUZ writes back to your systems of record automatically. Full audit trail. No manual entry. Permanent record." },
            ].map(s => (
              <div key={s.n} style={{ background: "#fff", borderRadius: 16, padding: "28px 24px", border: "1px solid #E0E4F0" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: B, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, fontFamily: F, marginBottom: 16 }}>{s.n}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#000", fontFamily: F, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, fontFamily: F }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARCH DIAGRAM ─────────────────────────────────────────── */}
      <ArchDiagram />

      {/* ── INDUSTRIES ───────────────────────────────────────────── */}
      <section style={{ padding: "88px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: B, fontFamily: F, marginBottom: 14 }}>Built for your industry</p>
            <h2 style={{ fontFamily: F, maxWidth: 520, margin: "0 auto", lineHeight: 1.18 }}>ZUUZ is designed for companies where decisions move money</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
            {[
              {
                icon: "🖥",
                industry: "IT Services & Managed Services",
                pain: "Delayed project approvals, vendor onboarding backlogs, and service contracts that sit unsigned for weeks.",
                outcome: "Cut onboarding from weeks to hours. Start projects on time. Approve vendor contracts without chasing.",
              },
              {
                icon: "📋",
                industry: "Professional Services",
                pain: "Commercial approvals, scope changes, and resource commitments decided on incomplete information.",
                outcome: "Every commercial decision made with full client history, financials, and open commitment data in view.",
              },
              {
                icon: "🛡",
                industry: "Insurance, Brokerages & Claims Operations",
                pain: "Claims and policy decisions that move through email. No audit trail. No standard process. High compliance risk.",
                outcome: "Every decision documented with full context. Compliance-ready records created automatically at point of approval.",
              },
              {
                icon: "📦",
                industry: "Distribution & Multi-Branch Operations",
                pain: "Purchase approvals, supplier selections, and procurement decisions happening without financial or operational context.",
                outcome: "Procurement approvals with full supplier history, budget position, and payment terms visible before any sign-off.",
              },
            ].map(ind => (
              <div key={ind.industry} style={{ background: "#F5F6FF", borderRadius: 20, padding: "36px 32px", border: "1px solid #E0E4F0", display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ fontSize: 32 }}>{ind.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#000", fontFamily: F }}>{ind.industry}</h3>
                <div style={{ padding: "16px", background: "#FFF5F5", borderRadius: 10, borderLeft: "3px solid #FCA5A5" }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#991B1B", fontFamily: F, marginBottom: 4 }}>The cost you are carrying now</p>
                  <p style={{ fontSize: 14, color: "#444", fontFamily: F }}>{ind.pain}</p>
                </div>
                <div style={{ padding: "16px", background: "#F0FDF4", borderRadius: 10, borderLeft: "3px solid #86EFAC" }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#166534", fontFamily: F, marginBottom: 4 }}>What changes with ZUUZ</p>
                  <p style={{ fontSize: 14, color: "#444", fontFamily: F }}>{ind.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO DEMO ───────────────────────────────────────────── */}
      <VideoDemo />

      {/* ── WHY ZUUZ ─────────────────────────────────────────────── */}
      <section style={{ padding: "88px 0", background: "#F5F6FF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: B, fontFamily: F, marginBottom: 14 }}>Why ZUUZ</p>
            <h2 style={{ fontFamily: F, maxWidth: 540, margin: "0 auto", lineHeight: 1.18 }}>Your current process has a hidden cost. Most companies only see it in hindsight.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              {
                vs: "vs. Email approvals",
                problem: "Email has no memory. Every thread is a dead end. When you need to find what was approved, why, and by whom — it is not there.",
                zuuz: "Every decision has a permanent record. Who approved. What information they had. When it happened. Searchable. Auditable. Instant.",
              },
              {
                vs: "vs. Your ERP or CRM",
                problem: "ERPs record what happened. They were not built for decisions. They cannot pull context, route to approvers, or produce a brief.",
                zuuz: "ZUUZ works with your ERP — it does not replace it. It handles the decision layer and writes the outcome back when it is done.",
              },
              {
                vs: "vs. Doing nothing",
                problem: "Every day of delay in your approval process is a measurable cost. It just goes untracked. That does not make it free.",
                zuuz: "ZUUZ makes the cost of delay visible — then eliminates it. Most companies recover the implementation cost in the first 30 days.",
              },
            ].map(w => (
              <div key={w.vs} style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", border: "1px solid #E0E4F0" }}>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#888", fontFamily: F, marginBottom: 20 }}>{w.vs}</p>
                <div style={{ marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #EEE" }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#EF4444", fontFamily: F, marginBottom: 6 }}>Without ZUUZ</p>
                  <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, fontFamily: F }}>{w.problem}</p>
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#10B981", fontFamily: F, marginBottom: 6 }}>With ZUUZ</p>
                  <p style={{ fontSize: 14, color: "#333", lineHeight: 1.7, fontFamily: F }}>{w.zuuz}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF METRICS ────────────────────────────────────────── */}
      <section style={{ padding: "88px 0", background: "#000814" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#60A5FA", fontFamily: F, marginBottom: 14 }}>Real results</p>
            <h2 style={{ fontFamily: F, color: "#fff", maxWidth: 520, margin: "0 auto", lineHeight: 1.18 }}>The numbers our customers talk about</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
            {[
              { n: "70%",              label: "Reduction in approval cycle time",    desc: "Procurement and commercial decisions that took days now close in hours." },
              { n: "8–12 hrs",         label: "Saved per manager per week",          desc: "Eliminated entirely from chasing, coordinating, and following up." },
              { n: "3–5 days → 4 hrs", label: "Vendor onboarding cycle",             desc: "Full context assembled automatically. No manual coordination required." },
              { n: "100%",             label: "Audit trail on every decision",        desc: "Complete record of who decided, what information they had, and when." },
              { n: "Zero",             label: "Decisions made without full context",  desc: "Financial history, open commitments, and risk signals visible before every approval." },
              { n: "Weeks",            label: "Time to go live",                      desc: "No IT project. No migration. No disruption. Live on your real workflows fast." },
            ].map((m, i) => (
              <div key={m.label} style={{
                padding: "40px 32px",
                borderRight: i % 3 !== 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}>
                <p style={{ fontSize: "clamp(28px,3.5vw,44px)" as React.CSSProperties["fontSize"], fontWeight: 800, color: "#fff", fontFamily: F, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 10 }}>{m.n}</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: F, marginBottom: 8 }}>{m.label}</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontFamily: F, lineHeight: 1.6 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CUSTOMER PROOF ───────────────────────────────────────── */}
      <section style={{ padding: "88px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: B, fontFamily: F, marginBottom: 14 }}>From the companies using it</p>
            <h2 style={{ fontFamily: F, maxWidth: 480, margin: "0 auto", lineHeight: 1.18 }}>In their own words</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
            {[
              { quote: "Before ZUUZ, our approvals lived in inboxes and spreadsheets. Now every decision starts with a full context pack and ends with a clean audit trail. We went from days of chasing people to minutes of confident approvals.", name: "COO", company: "RA Technologies LLC", industry: "Cybersecurity & IT · USA" },
              { quote: "Our procurement process was fully manual. Now every user sees the full picture — vendor history, payment terms, budget alignment — before they approve. Finance finally has visibility. The system updates automatically.", name: "Finance Manager", company: "Nesto Group", industry: "Retail & Distribution · UAE" },
              { quote: "What used to take three to five days now happens in two to four hours. The CEO can see who approved what and why. Nobody is calling around for information anymore.", name: "CEO", company: "Cloud Box Technologies", industry: "IT Services & Cloud · UAE" },
              { quote: "Vendor onboarding used to take days of manual coordination. Now ZUUZ assembles the documents, generates the recommendation, and routes it for sign-off automatically. What took days now takes hours.", name: "VP of Sales", company: "Western International Group", industry: "Distribution & Trading · UAE" },
            ].map(t => (
              <div key={t.company} style={{ background: "#F5F6FF", borderRadius: 20, padding: "36px 32px", border: "1px solid #E0E4F0", display: "flex", flexDirection: "column", gap: 20 }}>
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                  <path d="M0 24V14.4C0 10.56 0.96 7.28 2.88 4.56 4.88 1.84 7.76.24 11.52 0L12.96 2.64C10.08 3.28 7.92 4.56 6.48 6.48 5.12 8.32 4.48 10.32 4.56 12.48H9.6V24H0ZM19.04 24V14.4C19.04 10.56 20 7.28 21.92 4.56 23.92 1.84 26.8.24 30.56 0L32 2.64C29.12 3.28 26.96 4.56 25.52 6.48 24.16 8.32 23.52 10.32 23.6 12.48H28.64V24H19.04Z" fill={B} opacity="0.12"/>
                </svg>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "#1a1a2e", fontFamily: F, fontWeight: 500 }}>{t.quote}</p>
                <div style={{ paddingTop: 16, borderTop: "1px solid #D8DCF0" }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#000", fontFamily: F, marginBottom: 2 }}>{t.name}, {t.company}</p>
                  <p style={{ fontSize: 12, color: "#666", fontFamily: F }}>{t.industry}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section style={{ padding: "88px 0 96px", background: "#000814" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#60A5FA", fontFamily: F, marginBottom: 20 }}>Start your trial</p>
          <h2 style={{ fontFamily: F, color: "#fff", marginBottom: 20, lineHeight: 1.18 }}>
            See it on your actual workflows.<br />Not a canned demo.
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.80)", fontFamily: F, lineHeight: 1.8, maxWidth: 520, margin: "0 auto 36px" }}>
            Bring your most painful approval process. We will show you exactly what it looks like when ZUUZ runs it — with your systems, your context, your team.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/request-trial" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 36px", background: B, color: "#fff", borderRadius: 10, fontSize: 16, fontWeight: 700, fontFamily: F, textDecoration: "none", boxShadow: "0 4px 24px rgba(0,24,255,0.4)" }}>
              Request a Trial →
            </a>
            <Link href="/customers" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "transparent", color: "rgba(255,255,255,0.85)", border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: 10, fontSize: 15, fontWeight: 600, fontFamily: F, textDecoration: "none" }}>
              See customer results
            </Link>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontFamily: F, marginTop: 20 }}>
            No commitment · SOC 2 Type I · Live in weeks
          </p>
        </div>
      </section>

    </>
  );
}
