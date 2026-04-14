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
const W: React.CSSProperties = { maxWidth: 1200, margin: "0 auto", padding: "0 24px" };

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section style={{ background: "#F9FAFF", padding: "96px 0 80px" }}>
        <div style={W}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>

            <div>
              <h1 style={{
                fontFamily: F,
                fontSize: "clamp(32px,4vw,52px)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                color: "#000",
                marginBottom: 24,
              }}>
                Your margin is leaking.<br />
                <span style={{ color: B }}>It happens before</span><br />
                the decision is made.
              </h1>

              <p style={{ fontSize: 18, lineHeight: 1.75, color: "#444", maxWidth: 460, marginBottom: 36, fontFamily: F }}>
                ZUUZ gives your teams the full picture before they approve, commit, or execute — so decisions move faster, with less risk and a complete audit trail.
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
                <a
                  href="/request-trial"
                  style={{ display: "inline-flex", alignItems: "center", padding: "14px 28px", background: B, color: "#fff", borderRadius: 8, fontSize: 15, fontWeight: 700, fontFamily: F, textDecoration: "none" }}
                >
                  Book a walkthrough →
                </a>
                <Link
                  href="/customers"
                  style={{ display: "inline-flex", alignItems: "center", padding: "13px 24px", color: "#333", border: "1.5px solid #D0D0D8", borderRadius: 8, fontSize: 15, fontWeight: 600, fontFamily: F, textDecoration: "none" }}
                >
                  Customer results
                </Link>
              </div>

              <p style={{ fontSize: 13, color: "#999", fontFamily: F, letterSpacing: "0.01em" }}>
                SOC 2 Type I &nbsp;·&nbsp; No IT project needed &nbsp;·&nbsp; Live in weeks
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <SignalTower />
            </div>

          </div>
        </div>
      </section>

      {/* ─── CUSTOMER BANNER ───────────────────────────────────────── */}
      <CustomerBanner />

      {/* ─── CONNECTOR LOGOS ───────────────────────────────────────── */}
      <LogoMarquee />

      {/* ─── WHAT ZUUZ FIXES ───────────────────────────────────────── */}
      <section style={{ padding: "88px 0", background: "#fff" }}>
        <div style={W}>
          <div style={{ maxWidth: 560, marginBottom: 60 }}>
            <h2 style={{ fontFamily: F, fontSize: "clamp(22px,2.8vw,36px)", fontWeight: 800, lineHeight: 1.15, color: "#000", marginBottom: 16 }}>
              Three operational costs your business is already carrying
            </h2>
            <p style={{ fontSize: 16, color: "#666", lineHeight: 1.75, fontFamily: F }}>
              None of them show up on a single report. All of them compound.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: "1px solid #EAEAF0" }}>
            {[
              {
                num: "01",
                title: "Approval delays cost more than you track",
                body: "A procurement decision that sits for three days is three days of blocked execution. Most organisations have no idea how many approvals are in someone's inbox right now.",
                proof: "70% faster approval cycles with ZUUZ.",
              },
              {
                num: "02",
                title: "Management time is your most expensive overhead",
                body: "Operations managers spend 8–12 hours a week chasing emails, status updates, and missing documents. That is not coordination — that is waste with a salary attached.",
                proof: "8–12 hours saved per manager, per week.",
              },
              {
                num: "03",
                title: "Decisions without full context create margin risk",
                body: "When a commercial sign-off happens without complete financials, open commitments, or supplier history, the cost shows up later — in disputes, rework, or deals gone wrong.",
                proof: "Full context assembled before every approval.",
              },
            ].map((p, i) => (
              <div key={p.num} style={{
                padding: "40px 32px",
                borderLeft: i > 0 ? "1px solid #EAEAF0" : "none",
              }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#C0C0D0", fontFamily: F, letterSpacing: "0.08em", marginBottom: 20 }}>{p.num}</p>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#000", fontFamily: F, marginBottom: 14, lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: 15, color: "#555", lineHeight: 1.75, fontFamily: F, marginBottom: 20 }}>{p.body}</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: B, fontFamily: F }}>{p.proof}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────────────────────────── */}
      <section style={{ padding: "88px 0", background: "#F8F9FE" }}>
        <div style={W}>
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 56px" }}>
            <h2 style={{ fontFamily: F, fontSize: "clamp(22px,2.8vw,36px)", fontWeight: 800, lineHeight: 1.15, color: "#000", marginBottom: 16 }}>
              Full context before the decision. Automatic record after.
            </h2>
            <p style={{ fontSize: 16, color: "#666", lineHeight: 1.75, fontFamily: F }}>
              ZUUZ connects to your existing systems and handles the full cycle — from request to approval to write-back — without replacing anything.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 64 }}>
            {[
              { n: "01", title: "Request enters ZUUZ", body: "A vendor onboarding. A contract for sign-off. A purchase approval. It enters from email, your system, or directly — whichever fits your workflow." },
              { n: "02", title: "Context assembled automatically", body: "ZUUZ pulls the full picture: financial history, open commitments, previous decisions, policy flags. Nothing reaches the approver half-assembled." },
              { n: "03", title: "Right person, complete information", body: "The decision goes to the right approver with everything they need in one brief. No chasing. No back-and-forth. No waiting for someone to gather data." },
              { n: "04", title: "Decision recorded. Systems updated.", body: "Approval happens. ZUUZ writes back to your systems of record. The full record — who decided, what they had, when — is permanent and searchable." },
            ].map(s => (
              <div key={s.n} style={{ background: "#fff", borderRadius: 10, padding: "28px 22px", border: "1px solid #E4E8F2" }}>
                <p style={{ fontSize: 12, fontWeight: 800, color: B, fontFamily: F, letterSpacing: "0.06em", marginBottom: 14 }}>{s.n}</p>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#000", fontFamily: F, marginBottom: 10, lineHeight: 1.35 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, fontFamily: F }}>{s.body}</p>
              </div>
            ))}
          </div>

          <ArchDiagram />
        </div>
      </section>

      {/* ─── PROOF (STATIC METRICS) ────────────────────────────────── */}
      <StatsBanner />

      {/* ─── INDUSTRIES ────────────────────────────────────────────── */}
      <section style={{ padding: "88px 0", background: "#fff" }}>
        <div style={W}>
          <div style={{ maxWidth: 520, marginBottom: 52 }}>
            <h2 style={{ fontFamily: F, fontSize: "clamp(22px,2.8vw,36px)", fontWeight: 800, lineHeight: 1.15, color: "#000", marginBottom: 16 }}>
              Built for companies where decisions move money
            </h2>
            <p style={{ fontSize: 16, color: "#666", lineHeight: 1.75, fontFamily: F }}>
              Not a general-purpose AI tool. Purpose-built for operational workflows where context gaps and approval delays have a real cost.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
            {[
              {
                industry: "IT Services & Managed Services",
                outcome: "Vendor onboarding, project approvals, and service contracts closed in hours — not the weeks your clients are currently waiting on.",
              },
              {
                industry: "Professional Services",
                outcome: "Commercial sign-offs, scope changes, and resource commitments made with full client history, open commitments, and financials in view.",
              },
              {
                industry: "Insurance, Brokerages & Claims",
                outcome: "Every claims and policy decision documented with full context. Compliance records created automatically at the point of approval — not reconstructed after the fact.",
              },
              {
                industry: "Distribution & Multi-Branch Operations",
                outcome: "Procurement approvals with complete supplier history, budget position, and payment terms visible before any sign-off — at every branch.",
              },
            ].map(ind => (
              <div key={ind.industry} style={{ padding: "32px", border: "1px solid #E8EAF0", borderRadius: 10 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#000", fontFamily: F, marginBottom: 12 }}>{ind.industry}</h3>
                <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, fontFamily: F }}>{ind.outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VIDEO DEMO ────────────────────────────────────────────── */}
      <section style={{ background: "#F8F9FE", padding: "80px 0" }}>
        <div style={W}>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>
            <h2 style={{ fontFamily: F, fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 800, lineHeight: 1.2, color: "#000" }}>
              See it run on a real enterprise workflow
            </h2>
          </div>
          <VideoDemo />
        </div>
      </section>

      {/* ─── WHY NOT EMAIL / ERP / DOING NOTHING ──────────────────── */}
      <section style={{ padding: "88px 0", background: "#fff" }}>
        <div style={W}>
          <div style={{ maxWidth: 540, marginBottom: 52 }}>
            <h2 style={{ fontFamily: F, fontSize: "clamp(22px,2.8vw,36px)", fontWeight: 800, lineHeight: 1.15, color: "#000" }}>
              What most teams use instead — and what it costs them
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[
              {
                vs: "Email approvals",
                problem: "Email has no memory. When something goes wrong and you need to find what was approved, by whom, with what information — it is not there. The audit trail does not exist.",
                fix: "Every decision has a permanent record: who approved, what they saw, when it happened. Searchable and auditable without any manual effort.",
              },
              {
                vs: "Your ERP or CRM",
                problem: "ERPs record outcomes. They were not built for decisions. They cannot assemble context, route to approvers, or produce a decision brief before sign-off.",
                fix: "ZUUZ sits alongside your ERP. It handles the decision layer, then writes the outcome back when done. No replacement required.",
              },
              {
                vs: "Manual coordination",
                problem: "Every day of approval delay is a real cost. Untracked does not mean free — it means the cost is hidden in salary, chasing, and missed execution windows.",
                fix: "Approval cycles that take 3–5 days move to under 4 hours. The time your managers spend coordinating gets systematically eliminated.",
              },
            ].map(w => (
              <div key={w.vs} style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #E8EAF0" }}>
                <div style={{ padding: "18px 24px", background: "#F8F9FE", borderBottom: "1px solid #E8EAF0" }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#444", fontFamily: F, margin: 0 }}>{w.vs}</p>
                </div>
                <div style={{ padding: "20px 24px", borderBottom: "1px solid #F0F0F5" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#DC2626", fontFamily: F, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>The cost</p>
                  <p style={{ fontSize: 14, color: "#555", lineHeight: 1.65, fontFamily: F }}>{w.problem}</p>
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#059669", fontFamily: F, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>With ZUUZ</p>
                  <p style={{ fontSize: 14, color: "#333", lineHeight: 1.65, fontFamily: F }}>{w.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CUSTOMER QUOTES ───────────────────────────────────────── */}
      <section style={{ padding: "88px 0", background: "#F8F9FE" }}>
        <div style={W}>
          <div style={{ maxWidth: 440, marginBottom: 52 }}>
            <h2 style={{ fontFamily: F, fontSize: "clamp(22px,2.8vw,36px)", fontWeight: 800, lineHeight: 1.15, color: "#000" }}>
              In their own words
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
            {[
              { quote: "Before ZUUZ, our approvals lived in inboxes and spreadsheets. Now every decision starts with a full context pack and ends with a clean audit trail. We went from days of chasing people to minutes of confident approvals.", name: "COO", company: "RA Technologies LLC", tag: "Cybersecurity & IT · USA" },
              { quote: "Our procurement process was fully manual. Now every user sees the full picture — vendor history, payment terms, budget alignment — before they approve. Finance finally has visibility. The system updates automatically.", name: "Finance Manager", company: "Nesto Group", tag: "Retail & Distribution · UAE" },
              { quote: "What used to take three to five days now happens in two to four hours. The CEO can see who approved what and why. Nobody is calling around for information anymore.", name: "CEO", company: "Cloud Box Technologies", tag: "IT Services & Cloud · UAE" },
              { quote: "Vendor onboarding used to take days of manual coordination. Now ZUUZ assembles the documents, generates the recommendation, and routes it for sign-off automatically. What took days now takes hours.", name: "VP of Sales", company: "Western International Group", tag: "Distribution & Trading · UAE" },
            ].map(t => (
              <figure key={t.company} style={{ background: "#fff", borderRadius: 10, padding: "32px", border: "1px solid #E4E8F2", margin: 0, display: "flex", flexDirection: "column", gap: 20 }}>
                <blockquote style={{ fontSize: 15, lineHeight: 1.8, color: "#1a1a2e", fontFamily: F, fontWeight: 400, margin: 0, fontStyle: "italic" }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption style={{ borderTop: "1px solid #EAECF4", paddingTop: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#000", fontFamily: F, margin: "0 0 2px" }}>{t.name}, {t.company}</p>
                  <p style={{ fontSize: 12, color: "#888", fontFamily: F, margin: 0 }}>{t.tag}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────── */}
      <section style={{ padding: "96px 0", background: "#000814" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <h2 style={{ fontFamily: F, fontSize: "clamp(24px,3.2vw,42px)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: 20 }}>
            See it on your actual workflows.<br />Not a canned demo.
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.70)", fontFamily: F, lineHeight: 1.8, maxWidth: 500, margin: "0 auto 36px" }}>
            Bring your most painful approval process. We connect to your systems and show you exactly what changes — not a generic product tour.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
            <a
              href="/request-trial"
              style={{ display: "inline-flex", alignItems: "center", padding: "15px 32px", background: B, color: "#fff", borderRadius: 8, fontSize: 16, fontWeight: 700, fontFamily: F, textDecoration: "none" }}
            >
              Book a walkthrough →
            </a>
            <Link
              href="/customers"
              style={{ display: "inline-flex", alignItems: "center", padding: "14px 24px", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 8, fontSize: 15, fontWeight: 600, fontFamily: F, textDecoration: "none" }}
            >
              Read customer stories
            </Link>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.30)", fontFamily: F }}>
            No commitment &nbsp;·&nbsp; SOC 2 Type I &nbsp;·&nbsp; Live in weeks
          </p>
        </div>
      </section>

    </>
  );
}
