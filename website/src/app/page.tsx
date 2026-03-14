"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

/* ── Types ───────────────────────────────────────────── */
type StepStatus = "done" | "active" | "pending";
interface WStep { id: number; name: string; sub: string; status: StepStatus; }

/* ── Data ────────────────────────────────────────────── */
const CONNECTORS = [
  "Salesforce","SAP","Microsoft 365","Slack","Jira","ServiceNow",
  "Google Workspace","HubSpot","Oracle","Zoom","Zendesk","NetSuite",
  "SharePoint","Azure DevOps","Workday","Zoho","Teams","GitHub","GitLab","BambooHR",
];

const AGENTS = [
  { tag:"Sales",       title:"Sales AI Agent",       body:"Keeps pipeline honest, follow-ups timely, forecasts grounded in real activity.",           stat:"4–8 hrs/week per rep",       href:"/products/agents/sales" },
  { tag:"Procurement", title:"Procurement AI Agent",  body:"Validates requests, compares vendors, routes approvals, generates POs automatically.",     stat:"5–10 hrs/week per buyer",    href:"/products/agents/procurement" },
  { tag:"Email",       title:"Email AI Agent",        body:"Classifies inbound email, summarizes threads, drafts replies, routes to systems of record.",stat:"3–6 hrs/week per user",     href:"/products/agents/email" },
  { tag:"Documents",   title:"Document AI Agent",     body:"Extracts clauses, surfaces risks, tracks versions, routes for approval without bottlenecks.",stat:"6–12 hrs/week per analyst", href:"/products/agents/documents" },
  { tag:"Meetings",    title:"Meeting AI Agent",      body:"Turns every meeting into structured outcomes: decisions logged, actions assigned.",          stat:"3–5 hrs/week per manager",  href:"/products/agents/meetings" },
  { tag:"HR",          title:"HR AI Agent",           body:"Automates onboarding, policy Q&A, leave workflows, and benefits routing at scale.",          stat:"8–15 hrs/week per HR",      href:"/products/agents/hr" },
  { tag:"Legal",       title:"Legal AI Agent",        body:"Handles intake, runs contracts against your playbook, flags deviations, routes approval.",   stat:"5–10 hrs/week per counsel", href:"/products/agents/legal" },
  { tag:"Logistics",   title:"Logistics AI Agent",    body:"Monitors shipments, flags exceptions before escalation, automates ETA communications.",     stat:"4–8 hrs/week per coord.",   href:"/products/agents/logistics" },
];

const HOW_STEPS = [
  { num:"01", title:"Connect",    body:"Link your tools in minutes. CRM, ERP, email, docs, calendars — 200+ connectors, no migration." },
  { num:"02", title:"Understand", body:"ZUUZ maps your data, permissions, and existing workflows. It learns how your teams actually work." },
  { num:"03", title:"Automate",   body:"Copilots handle complete tasks. Flows run multi-step processes. Humans approve what matters." },
  { num:"04", title:"Prove",      body:"Every action logged with evidence. Audit trails, compliance reports, and time savings — out of the box." },
];

const INDUSTRIES = [
  { name:"IT Services",       href:"/solutions/it-services" },
  { name:"Financial Services",href:"/solutions/financial-services" },
  { name:"Healthcare",        href:"/solutions/healthcare" },
  { name:"Distribution",      href:"/solutions/distribution" },
  { name:"Manufacturing",     href:"/solutions/manufacturing" },
  { name:"Insurance",         href:"/solutions/insurance" },
  { name:"Construction",      href:"/solutions/construction" },
  { name:"Retail",            href:"/solutions/retail" },
];

const METRICS = [
  { val:"3×",   label:"Faster decisions",      sub:"Avg across all workflows" },
  { val:"100%", label:"Audit coverage",        sub:"Every action logged" },
  { val:"65%",  label:"Cycle time reduction",  sub:"Procurement workflows" },
  { val:"$2M+", label:"Leakage prevented",     sub:"Per year, per enterprise" },
];

const TRUST = [
  "SOC 2 Type I", "SAML 2.0 / SSO", "Role-based access control",
  "Identity-verified actions", "Immutable audit trail", "On-prem option",
];

const INIT_STEPS: WStep[] = [
  { id:1, name:"Request validated",       sub:"Evidence Search · Budget verified",     status:"done" },
  { id:2, name:"Context Pack assembled",  sub:"Prior contracts · Vendor scorecard",    status:"done" },
  { id:3, name:"Routing to CFO approval", sub:"Above $25k threshold · Tier 2",         status:"active" },
  { id:4, name:"Safe write-back to SAP",  sub:"PO generation · Audit log",             status:"pending" },
];

/* ── Reveal hook ─────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-scale");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); } }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── Sub-components ──────────────────────────────────── */

function Check() {
  return (
    <span className="flex-shrink-0 w-4 h-4 rounded-[4px] flex items-center justify-center" style={{ background:"rgba(0,185,107,0.1)" }}>
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
        <path d="M1.5 4.5l2 2 4-4" stroke="#00b96b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}

function LiveDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" style={{ animation:"ping-slow 1.8s cubic-bezier(0,0,0.2,1) infinite" }} />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
    </span>
  );
}

function ProgressDots() {
  return (
    <span className="flex gap-[3px] items-center">
      {[0,1,2].map(i => (
        <span key={i} className="w-[4px] h-[4px] rounded-full bg-blue-500"
          style={{ animation:`blink 1.4s ${i*0.35}s ease-in-out infinite` }} />
      ))}
    </span>
  );
}

function StatusBadge({ status }: { status: StepStatus }) {
  if (status === "done")    return <span className="text-[10px] font-semibold px-[7px] py-[3px] rounded-[4px] bg-green-50 text-green-700 border border-green-100 whitespace-nowrap">Done</span>;
  if (status === "active")  return <span className="text-[10px] font-semibold px-[7px] py-[3px] rounded-[4px] bg-blue-50 text-blue-700 border border-blue-100 whitespace-nowrap flex items-center gap-1"><ProgressDots /></span>;
  return <span className="text-[10px] font-semibold px-[7px] py-[3px] rounded-[4px] bg-neutral-50 text-neutral-400 border border-neutral-100 whitespace-nowrap">Pending</span>;
}

/* ── Animated Workflow Card ──────────────────────────── */
function WorkflowCard() {
  const [steps, setSteps] = useState<WStep[]>(INIT_STEPS);
  const [activeIdx, setActiveIdx] = useState(2);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIdx(prev => {
        const next = prev >= 3 ? 0 : prev + 1;
        setSteps(INIT_STEPS.map((s, i) => ({
          ...s,
          status: i < next ? "done" : i === next ? "active" : "pending"
        })));
        return next;
      });
    }, 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-2xl shadow-neutral-200/60">
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-neutral-50 border-b border-neutral-100">
        <span className="w-[9px] h-[9px] rounded-full bg-[#ff5f57]" />
        <span className="w-[9px] h-[9px] rounded-full bg-[#febc2e]" />
        <span className="w-[9px] h-[9px] rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[11px] text-neutral-400 font-medium tracking-wide">ZUUZ Workspace · Procurement · REQ-2841</span>
      </div>

      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.08em] uppercase text-neutral-400 mb-1">Active workflow</p>
            <p className="text-[14px] font-semibold text-neutral-900">AWS Enterprise Renewal — $48,000</p>
            <p className="text-[12px] text-neutral-400">Acme Corp · initiated by J. Martinez</p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-green-600 font-medium bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
            <LiveDot /> Live
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-2 mb-4">
          {steps.map(step => (
            <div key={step.id}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-500 ${step.status === "active" ? "step-active" : "border-neutral-100"}`}>
              <span className="text-[11px] font-semibold text-neutral-300 w-5 flex-shrink-0">0{step.id}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-neutral-800 leading-tight">{step.name}</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">{step.sub}</p>
              </div>
              <StatusBadge status={step.status} />
            </div>
          ))}
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { v:"3×",   l:"Faster" },
            { v:"100%", l:"Audited" },
            { v:"0",    l:"Manual" },
            { v:"65%",  l:"Cycle↓" },
          ].map(m => (
            <div key={m.l} className="bg-neutral-50 rounded-xl p-2.5 text-center">
              <p className="text-[17px] font-semibold text-neutral-900">{m.v}</p>
              <p className="text-[10px] text-neutral-400 mt-0.5">{m.l}</p>
            </div>
          ))}
        </div>

        {/* Context pack */}
        <div className="rounded-xl border border-neutral-100 p-3 bg-neutral-50/50">
          <p className="text-[10px] font-semibold tracking-[0.08em] uppercase text-neutral-400 mb-2.5">Context Pack</p>
          <div className="flex flex-col gap-1.5">
            {[
              { k:"Budget remaining Q1",    v:"$142,000",           c:"text-green-600" },
              { k:"Vendor SOC 2 status",    v:"Certified ✓",        c:"text-green-600" },
              { k:"Prior exceptions (12mo)",v:"2 approved",         c:"text-neutral-700" },
              { k:"Contract auto-renew",    v:"Jun 30 · 90d notice",c:"text-amber-600" },
            ].map(r => (
              <div key={r.k} className="flex justify-between items-center">
                <span className="text-[11px] text-neutral-500">{r.k}</span>
                <span className={`text-[11px] font-semibold ${r.c}`}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee connector strip */}
      <div className="border-t border-neutral-100 overflow-hidden py-2.5">
        <div className="flex gap-3 animate-marquee-ltr" style={{ width:"max-content" }}>
          {[...CONNECTORS, ...CONNECTORS].map((n, i) => (
            <span key={i} className="text-[10px] font-medium text-neutral-400 px-2.5 py-1 border border-neutral-100 rounded-md whitespace-nowrap bg-white">
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Architecture SVG Diagram ────────────────────────── */
function ArchDiagram() {
  return (
    <div className="relative w-full" style={{ maxWidth: 560 }}>
      <svg viewBox="0 0 560 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
        {/* Connector lines */}
        <line x1="90" y1="70" x2="220" y2="155" stroke="rgba(0,85,255,0.15)" strokeWidth="1.5" strokeDasharray="5 4"/>
        <line x1="90" y1="160" x2="220" y2="160" stroke="rgba(0,85,255,0.15)" strokeWidth="1.5" strokeDasharray="5 4"/>
        <line x1="90" y1="250" x2="220" y2="165" stroke="rgba(0,85,255,0.15)" strokeWidth="1.5" strokeDasharray="5 4"/>
        <line x1="340" y1="160" x2="470" y2="70" stroke="rgba(0,185,107,0.2)" strokeWidth="1.5" strokeDasharray="5 4"/>
        <line x1="340" y1="160" x2="470" y2="160" stroke="rgba(0,185,107,0.2)" strokeWidth="1.5" strokeDasharray="5 4"/>
        <line x1="340" y1="160" x2="470" y2="250" stroke="rgba(0,185,107,0.2)" strokeWidth="1.5" strokeDasharray="5 4"/>

        {/* Input nodes */}
        {[["Email",30,50],["Docs",30,140],["Meetings",10,230]].map(([label,x,y]) => (
          <g key={String(label)}>
            <rect x={Number(x)} y={Number(y)} width={90} height={36} rx={8} fill="#f7f7f9" stroke="rgba(0,0,0,0.08)" strokeWidth="1"/>
            <text x={Number(x)+45} y={Number(y)+22} textAnchor="middle" fontSize="11" fontWeight="500" fill="#6b6b7a">{String(label)}</text>
          </g>
        ))}

        {/* Central ZUUZ node */}
        <rect x={220} y={120} width={120} height={80} rx={14} fill="#0055ff" stroke="rgba(0,85,255,0.3)" strokeWidth="1.5"/>
        <text x={280} y={156} textAnchor="middle" fontSize="16" fontWeight="700" fill="white" letterSpacing="-0.5">ZUUZ</text>
        <text x={280} y={174} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.7)" letterSpacing="0.08em">EXECUTION LAYER</text>

        {/* Output nodes */}
        {[["CRM Update",430,50],["Audit Log",440,140],["Write-back",440,230]].map(([label,x,y]) => (
          <g key={String(label)}>
            <rect x={Number(x)} y={Number(y)} width={100} height={36} rx={8} fill="#f0fdf4" stroke="rgba(0,185,107,0.2)" strokeWidth="1"/>
            <text x={Number(x)+50} y={Number(y)+22} textAnchor="middle" fontSize="11" fontWeight="500" fill="#059669">{String(label)}</text>
          </g>
        ))}

        {/* Animated dots on lines */}
        <circle r="4" fill="#0055ff" opacity="0.7">
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M 90,70 L 220,155"/>
        </circle>
        <circle r="4" fill="#0055ff" opacity="0.7">
          <animateMotion dur="3s" begin="0.8s" repeatCount="indefinite" path="M 90,160 L 220,160"/>
        </circle>
        <circle r="4" fill="#00b96b" opacity="0.7">
          <animateMotion dur="2.8s" begin="0.4s" repeatCount="indefinite" path="M 340,160 L 470,70"/>
        </circle>
        <circle r="4" fill="#00b96b" opacity="0.7">
          <animateMotion dur="2.2s" begin="1.2s" repeatCount="indefinite" path="M 340,160 L 470,160"/>
        </circle>
      </svg>
    </div>
  );
}

/* ── Ambient Background ──────────────────────────────── */
function AmbientBg() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="animate-orb-1 absolute rounded-full opacity-[0.06]"
        style={{ width:600, height:600, top:-200, right:-100, background:"radial-gradient(circle, #0055ff 0%, transparent 70%)", filter:"blur(60px)" }} />
      <div className="animate-orb-2 absolute rounded-full opacity-[0.05]"
        style={{ width:500, height:500, bottom:-100, left:-80, background:"radial-gradient(circle, #00b96b 0%, transparent 70%)", filter:"blur(60px)" }} />
      <div className="animate-orb-3 absolute rounded-full opacity-[0.04]"
        style={{ width:400, height:400, top:"40%", left:"40%", background:"radial-gradient(circle, #0055ff 0%, transparent 70%)", filter:"blur(80px)" }} />
    </div>
  );
}

/* ── Scrolling Marquee ───────────────────────────────── */
function Marquee({ reverse = false }) {
  const items = [...CONNECTORS, ...CONNECTORS];
  return (
    <div className="overflow-hidden">
      <div className={`flex gap-3 ${reverse ? "animate-marquee-rtl" : "animate-marquee-ltr"}`} style={{ width:"max-content" }}>
        {items.map((name, i) => (
          <span key={i} className="text-[12px] font-medium text-neutral-500 px-4 py-2 border border-neutral-100 rounded-full bg-white whitespace-nowrap shadow-sm">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── How it works — animated stepper ────────────────── */
function HowItWorks() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % 4), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left: step list */}
      <div className="flex flex-col gap-4">
        {HOW_STEPS.map((step, i) => (
          <button key={step.num} onClick={() => setActive(i)}
            className={`text-left flex gap-5 p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
              active === i
                ? "border-blue-200 bg-blue-50/50 shadow-md shadow-blue-100/50"
                : "border-neutral-100 bg-white hover:border-neutral-200"
            }`}>
            <span className={`text-[11px] font-bold tracking-widest mt-0.5 flex-shrink-0 transition-colors ${active===i?"text-blue-500":"text-neutral-300"}`}>
              {step.num}
            </span>
            <div>
              <p className={`text-[15px] font-semibold mb-1 transition-colors ${active===i?"text-neutral-900":"text-neutral-500"}`}>
                {step.title}
              </p>
              {active === i && (
                <p className="text-[13px] text-neutral-500 leading-relaxed">{step.body}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Right: visual */}
      <div className="relative">
        <div className="rounded-2xl border border-neutral-100 bg-white p-8 shadow-xl shadow-neutral-100/80 min-h-[280px] flex items-center justify-center">
          {active === 0 && (
            <div className="text-center">
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {["Salesforce","SAP","Slack","Oracle","Jira","Teams","Gmail","HubSpot"].map(n => (
                  <span key={n} className="text-[11px] font-medium px-3 py-1.5 bg-neutral-50 border border-neutral-100 rounded-full text-neutral-600">{n}</span>
                ))}
              </div>
              <p className="text-[13px] text-neutral-400">200+ connectors · No migration · Live in minutes</p>
            </div>
          )}
          {active === 1 && (
            <div className="w-full">
              <div className="flex flex-col gap-2">
                {["Email threads → Action items","CRM deals → Risk signals","Documents → Key obligations","Meetings → Decisions & owners"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                    <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="#0055ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="text-[12px] text-neutral-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {active === 2 && (
            <div className="w-full">
              <div className="grid grid-cols-2 gap-3">
                {["Email Agent","Document Agent","Meeting Agent","Search Agent"].map((a, i) => (
                  <div key={i} className="p-3 rounded-xl border border-blue-100 bg-blue-50/40 text-center">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-600 text-[10px] font-bold">AI</span>
                    </div>
                    <p className="text-[11px] font-medium text-neutral-700">{a}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-[11px] text-neutral-400 mt-4">Humans approve what matters</p>
            </div>
          )}
          {active === 3 && (
            <div className="w-full">
              {[
                { label:"REQ-2841 approved",  time:"09:42:18 UTC", user:"S. Chen (VP Finance)", ok:true },
                { label:"SAP write-back",     time:"09:42:21 UTC", user:"System verified",     ok:true },
                { label:"PO #4892 generated", time:"09:42:22 UTC", user:"Automated",            ok:true },
              ].map((e, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border-b border-neutral-50 last:border-0">
                  <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <path d="M1.5 4.5l2 2 4-4" stroke="#00b96b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <div className="flex-1">
                    <p className="text-[12px] font-medium text-neutral-800">{e.label}</p>
                    <p className="text-[10px] text-neutral-400">{e.user} · {e.time}</p>
                  </div>
                </div>
              ))}
              <p className="text-center text-[11px] text-green-600 font-medium mt-3">100% audit coverage · Every action logged</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Metrics counter ─────────────────────────────────── */
function MetricsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-100">
      {METRICS.map((m, i) => (
        <div key={m.label} className="bg-white p-8 text-center" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: `opacity 0.6s ease ${i*100}ms, transform 0.6s ease ${i*100}ms` }}>
          <p className="text-4xl font-bold text-neutral-900 mb-1 tracking-tight">{m.val}</p>
          <p className="text-[14px] font-semibold text-neutral-700 mb-1">{m.label}</p>
          <p className="text-[12px] text-neutral-400">{m.sub}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────── */
export default function HomePage() {
  useReveal();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes blink { 0%,100%{opacity:.2} 50%{opacity:1} }
        @keyframes ping-slow { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(2.2);opacity:0} }
      `}</style>

      <AmbientBg />

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-[62px]">
          <Link href="/" className="flex items-center">
            <Image src="/brand/zuuz-logo.png" alt="ZUUZ" width={90} height={28} priority />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {[["Products","/"],["Solutions","/solutions"],["Customers","/customers"],["Resources","/resources"],["About","/about"]].map(([l,h]) => (
              <Link key={l} href={h} className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors font-medium">{l}</Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <Link href="/about/contact" className="text-[13px] text-neutral-500 px-3 py-[6px] rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">Sign in</Link>
            <Link href="/about/contact" className="text-[13px] font-semibold text-white bg-neutral-900 px-4 py-[7px] rounded-lg hover:bg-neutral-700 transition-colors">Request demo →</Link>
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-neutral-100 px-5 py-4 flex flex-col gap-4">
            {["Products","Solutions","Customers","Resources","About"].map(l => (
              <Link key={l} href="/" className="text-[14px] text-neutral-600 font-medium">{l}</Link>
            ))}
            <Link href="/about/contact" className="text-[13px] font-semibold text-white bg-neutral-900 px-4 py-2 rounded-lg text-center">Request demo →</Link>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-60" />
        <div className="absolute inset-0" style={{ background:"radial-gradient(ellipse 80% 60% at 50% -10%, transparent 40%, white 100%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 pt-20 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">

            {/* Left copy */}
            <div>
              {/* Badge */}
              <div className="reveal delay-0 inline-flex items-center gap-2 border border-neutral-200 rounded-full px-3 py-1.5 mb-7 bg-white/80">
                <LiveDot />
                <span className="text-[11px] font-semibold tracking-[0.06em] uppercase text-neutral-500">The AI Execution Layer for Enterprise</span>
              </div>

              <h1 className="reveal delay-1 text-[42px] lg:text-[54px] font-bold leading-[1.08] tracking-[-0.03em] text-neutral-900 mb-5">
                Your enterprise<br />runs on decisions.{" "}
                <span className="text-neutral-400 font-medium">ZUUZ makes sure they execute.</span>
              </h1>

              <p className="reveal delay-2 text-[16px] text-neutral-500 leading-[1.7] max-w-[480px] mb-9">
                Context assembled from email, docs, meetings, CRM and ERP. Decisions routed through policy. Actions written back to systems of record — every step identity-verified, permission-checked, and audit-logged.
              </p>

              <div className="reveal delay-3 flex flex-wrap gap-3 mb-10">
                <Link href="/about/contact" className="text-[14px] font-bold text-white bg-neutral-900 px-7 py-3 rounded-xl hover:bg-neutral-700 transition-colors shadow-lg shadow-neutral-900/10">
                  Request a demo
                </Link>
                <Link href="/products/ai-agents" className="text-[14px] font-semibold text-neutral-700 border border-neutral-200 px-6 py-3 rounded-xl hover:border-neutral-400 transition-colors bg-white">
                  See how it works →
                </Link>
              </div>

              {/* Trust badges */}
              <div className="reveal delay-4 flex flex-wrap gap-x-5 gap-y-2">
                {["SOC 2 Type I","SAML 2.0 / SSO","Identity-verified","200+ connectors","Immutable audit trail"].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-[12px] text-neutral-400 font-medium">
                    <Check />{item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: live card */}
            <div className="reveal-left delay-1">
              <WorkflowCard />
            </div>
          </div>

          {/* Integration logos */}
          <div className="relative mt-16 border-t border-neutral-100 pt-8 pb-4">
            <div className="text-center mb-5">
              <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-neutral-400">Connects with the tools your teams already use</p>
            </div>
            <div className="flex flex-col gap-3 overflow-hidden">
              <Marquee />
              <Marquee reverse />
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent" />
          </div>
        </div>
      </section>

      {/* ── THREE CAPABILITIES ── */}
      <section className="py-24 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-5">
          <div className="reveal text-center mb-16">
            <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-blue-500 mb-3">Platform</p>
            <h2 className="text-4xl font-bold tracking-[-0.02em] mb-4">Three capabilities.<br />One execution layer.</h2>
            <p className="text-[16px] text-neutral-500 max-w-md mx-auto">Copilots that act. Flows that enforce. Search that proves.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title:"Persona Copilots",  body:"Role-specific copilots for Sales, Procurement, HR, Legal, and Ops — designed to act, not just answer.", href:"/products/ai-agents",    icon:"👤", accent:"blue" },
              { title:"Execution Flows",   body:"Import your existing processes from CRM/ERP/ITSM and run them with policy gates, approvals, and audit trails.", href:"/products/workflows",   icon:"⚡", accent:"violet" },
              { title:"Evidence Search",   body:"One search across every tool — with citations and a ready-to-share context pack behind every decision.", href:"/products/unified-search",icon:"🔍", accent:"green" },
            ].map((cap, i) => (
              <Link key={cap.title} href={cap.href}
                className={`reveal delay-${i} card-lift group block bg-white border border-neutral-200 rounded-2xl p-7`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5 ${
                  cap.accent==="blue"?"bg-blue-50":"cap.accent==="violet"?"bg-violet-50":"bg-green-50"}`}
                  style={{ background: cap.accent==="blue"?"rgba(0,85,255,0.06)":cap.accent==="violet"?"rgba(109,40,217,0.06)":"rgba(0,185,107,0.06)" }}>
                  {cap.icon}
                </div>
                <h3 className="text-[17px] font-bold mb-2">{cap.title}</h3>
                <p className="text-[13px] text-neutral-500 leading-relaxed">{cap.body}</p>
                <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-blue-600 mt-4 group-hover:gap-2 transition-all">Learn more <span>→</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE DIAGRAM ── */}
      <section className="py-24 bg-neutral-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-blue-400 mb-4">Architecture</p>
              <h2 className="text-4xl font-bold tracking-[-0.02em] text-white mb-5">Signal in.<br />Decision out.<br /><span className="text-neutral-400">Audit logged.</span></h2>
              <p className="text-[15px] text-neutral-400 leading-relaxed mb-8 max-w-md">
                ZUUZ assembles full context from every connected system, routes it through your policies, takes action — and writes back only when identity, permissions, and evidence are verified.
              </p>
              <div className="flex flex-col gap-3">
                {["Permission-safe execution","Identity verified on every write-back","Evidence-backed every decision","Complete immutable audit trail"].map(item => (
                  <div key={item} className="flex items-center gap-3 text-[13px] text-neutral-300 font-medium">
                    <span className="w-5 h-5 rounded-full bg-green-900/50 flex items-center justify-center flex-shrink-0">
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#00b96b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal-left flex items-center justify-center">
              <ArchDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-5">
          <div className="reveal text-center mb-16">
            <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-blue-500 mb-3">How it works</p>
            <h2 className="text-4xl font-bold tracking-[-0.02em] mb-4">Weeks, not quarters</h2>
            <p className="text-[16px] text-neutral-500 max-w-md mx-auto">From connected to autonomous in four steps. No rip-and-replace.</p>
          </div>
          <div className="reveal">
            <HowItWorks />
          </div>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section className="py-24 bg-neutral-50/80 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-5">
          <div className="reveal text-center mb-12">
            <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-blue-500 mb-3">Results</p>
            <h2 className="text-4xl font-bold tracking-[-0.02em]">Measurable ROI from day one</h2>
          </div>
          <MetricsSection />
        </div>
      </section>

      {/* ── AGENTS GRID ── */}
      <section className="py-24 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-5">
          <div className="reveal mb-16">
            <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-blue-500 mb-3">Persona Copilots</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="text-4xl font-bold tracking-[-0.02em] max-w-sm">An agent for every operational team</h2>
              <Link href="/products/ai-agents" className="text-[14px] font-semibold text-blue-600 hover:text-blue-800 transition-colors whitespace-nowrap">Browse all agents →</Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AGENTS.map((agent, i) => (
              <Link key={agent.title} href={agent.href}
                className={`reveal delay-${i % 8} card-lift group block bg-white border border-neutral-200 rounded-2xl p-6`}>
                <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-neutral-400 mb-3">{agent.tag}</p>
                <h3 className="text-[15px] font-bold mb-2">{agent.title}</h3>
                <p className="text-[12px] text-neutral-500 leading-relaxed mb-4">{agent.body}</p>
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-bold text-green-600">{agent.stat}</p>
                  <span className="text-neutral-300 group-hover:text-neutral-600 transition-colors text-sm">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="py-24 bg-neutral-50/80 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-5">
          <div className="reveal text-center mb-14">
            <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-blue-500 mb-3">Solutions</p>
            <h2 className="text-4xl font-bold tracking-[-0.02em] mb-4">Purpose-built for your industry</h2>
            <p className="text-[16px] text-neutral-500 max-w-md mx-auto">Same platform. Tailored use cases, context packs, and agent configurations.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {INDUSTRIES.map((ind, i) => (
              <Link key={ind.name} href={ind.href}
                className={`reveal delay-${i % 8} card-lift group flex items-center justify-between p-5 border border-neutral-200 bg-white rounded-2xl`}>
                <span className="text-[14px] font-semibold text-neutral-700">{ind.name}</span>
                <span className="text-neutral-300 group-hover:text-neutral-700 transition-colors">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="py-24 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-5">
          <div className="reveal text-center mb-14">
            <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-blue-500 mb-3">Security & Trust</p>
            <h2 className="text-4xl font-bold tracking-[-0.02em] mb-4">Permission-aware by design</h2>
            <p className="text-[16px] text-neutral-500 max-w-md mx-auto">Every action verified. Every decision logged. Built for enterprise security review.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {TRUST.map((item, i) => (
              <div key={item} className={`reveal delay-${i} flex flex-col items-center text-center p-5 bg-white border border-neutral-200 rounded-2xl`}>
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3 3 7-7" stroke="#00b96b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-[12px] font-semibold text-neutral-700 leading-tight">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-5">
          <div className="reveal">
            <div className="relative overflow-hidden rounded-3xl bg-neutral-950 px-10 py-16 lg:px-16">
              {/* Background orbs */}
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10" style={{ background:"radial-gradient(circle, #0055ff 0%, transparent 70%)", filter:"blur(60px)", transform:"translate(30%,-30%)" }} />
              <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-10" style={{ background:"radial-gradient(circle, #00b96b 0%, transparent 70%)", filter:"blur(60px)", transform:"translate(-30%,30%)" }} />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold tracking-[-0.02em] text-white mb-3 max-w-lg">
                    Bring your workflows.<br />
                    <span className="text-neutral-400 font-medium">We&apos;ll make them run themselves.</span>
                  </h2>
                  <p className="text-[15px] text-neutral-400 max-w-md">
                    No migration required. No six-month implementation. Connect, automate, and prove — in weeks.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                  <Link href="/about/contact" className="text-[14px] font-bold text-neutral-900 bg-white px-7 py-3.5 rounded-xl hover:bg-neutral-100 transition-colors whitespace-nowrap shadow-lg">
                    Request a demo →
                  </Link>
                  <Link href="/products/ai-agents" className="text-[14px] font-semibold text-neutral-300 border border-neutral-700 px-6 py-3.5 rounded-xl hover:border-neutral-500 hover:text-white transition-colors whitespace-nowrap">
                    See Persona Copilots
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto px-5 py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">
            <div className="col-span-2">
              <Image src="/brand/zuuz-logo.png" alt="ZUUZ" width={80} height={26} className="mb-4" />
              <p className="text-[13px] text-neutral-500 leading-relaxed max-w-[200px] mb-5">
                The AI execution layer for enterprise work. Decision. Execution. AI Workspace.
              </p>
              <div className="flex gap-2">
                {[["LinkedIn","https://linkedin.com/company/zuuz-ai"],["Twitter","https://twitter.com/zuuz_ai"]].map(([l,h]) => (
                  <a key={l} href={h} target="_blank" rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-neutral-400 hover:text-neutral-700 transition-colors border border-neutral-200 rounded-lg px-3 py-1.5">{l}</a>
                ))}
              </div>
            </div>
            {[
              { head:"Products", links:[["Persona Copilots","/products/ai-agents"],["Execution Flows","/products/workflows"],["Evidence Search","/products/unified-search"]] },
              { head:"Solutions", links:[["IT Services","/solutions/it-services"],["Financial Services","/solutions/financial-services"],["Healthcare","/solutions/healthcare"],["Distribution","/solutions/distribution"],["Manufacturing","/solutions/manufacturing"],["Construction","/solutions/construction"]] },
              { head:"Company", links:[["Our Story","/about/our-story"],["Careers","/about/careers"],["Trust & Security","/about/trust-security"],["Contact","/about/contact"],["Customers","/customers"]] },
              { head:"Resources", links:[["Resource Hub","/resources"],["Blog","/resources/blog/agentic-ai-explained"],["Industry Guides","/resources/manuals/industries"],["Agentic AI Explained","/resources/blog/agentic-ai-explained"]] },
            ].map(col => (
              <div key={col.head}>
                <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-neutral-400 mb-4">{col.head}</p>
                <ul className="flex flex-col gap-3">
                  {col.links.map(([l,h]) => (
                    <li key={l}><Link href={h} className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors">{l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-neutral-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-neutral-400">© 2026 ZUUZ, Inc. All rights reserved. · 440N Wolfe Rd, Sunnyvale, CA 94085</p>
            <div className="flex gap-5">
              {[["Privacy Policy","/privacy"],["Terms","/terms"],["Cookies","/cookies"]].map(([l,h]) => (
                <Link key={l} href={h} className="text-[12px] text-neutral-400 hover:text-neutral-700 transition-colors">{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
