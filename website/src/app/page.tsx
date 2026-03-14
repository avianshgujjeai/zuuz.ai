"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── Types ─────────────────────────────────────────── */
type StepStatus = "done" | "active" | "pending";
interface WStep { id: number; name: string; sub: string; status: StepStatus; }

/* ─── Data ──────────────────────────────────────────── */
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
  { num:"01", title:"Connect",    body:"Link your tools in minutes. CRM, ERP, email, docs, calendars — 200+ connectors, no migration required.", icon:"🔌" },
  { num:"02", title:"Understand", body:"ZUUZ maps your data, permissions, and existing workflows. It learns how your teams actually work.", icon:"🧠" },
  { num:"03", title:"Automate",   body:"Copilots handle complete tasks. Flows run multi-step processes. Humans approve what matters.", icon:"⚡" },
  { num:"04", title:"Prove",      body:"Every action logged with evidence. Audit trails, compliance reports, and measurable time savings.", icon:"✅" },
];

const INDUSTRIES = [
  { name:"IT Services",        href:"/solutions/it-services",        desc:"Change requests, exceptions, follow-through" },
  { name:"Financial Services", href:"/solutions/financial-services", desc:"Spend approvals, policy exceptions, vendor onboarding" },
  { name:"Healthcare",         href:"/solutions/healthcare",         desc:"Medical procurement, vendor renewals, staffing" },
  { name:"Distribution",       href:"/solutions/distribution",       desc:"POs, vendor decisions, credit exceptions" },
  { name:"Manufacturing",      href:"/solutions/manufacturing",      desc:"Supplier onboarding, MRO spend, urgent procurement" },
  { name:"Insurance",          href:"/solutions/insurance",          desc:"Claims and policy exceptions with evidence" },
  { name:"Construction",       href:"/solutions/construction",       desc:"Variation orders, subcontractor payments" },
  { name:"Retail",             href:"/solutions/retail",             desc:"Price, promotions, and vendor operations" },
];

const METRICS = [
  { val:"3×",   label:"Faster Decisions",     sub:"Avg across all workflows" },
  { val:"100%", label:"Audit Coverage",       sub:"Every action logged" },
  { val:"65%",  label:"Cycle Time Reduction", sub:"Procurement workflows" },
  { val:"$2M+", label:"Leakage Prevented",    sub:"Per year, per enterprise" },
];

const INIT_STEPS: WStep[] = [
  { id:1, name:"Request validated",       sub:"Evidence Search · Budget verified",  status:"done" },
  { id:2, name:"Context Pack assembled",  sub:"Prior contracts · Vendor scorecard", status:"done" },
  { id:3, name:"Routing to CFO approval", sub:"Above $25k threshold · Tier 2",      status:"active" },
  { id:4, name:"Safe write-back to SAP",  sub:"PO generation · Audit log",          status:"pending" },
];

/* ─── Connector SVG logos ───────────────────────────── */
const LOGO_ITEMS = [
  { name:"Salesforce", color:"#00A1E0", letter:"S" },
  { name:"SAP",        color:"#009FDA", letter:"SAP" },
  { name:"Microsoft",  color:"#00A4EF", letter:"M" },
  { name:"Slack",      color:"#4A154B", letter:"Sk" },
  { name:"Jira",       color:"#0052CC", letter:"J" },
  { name:"ServiceNow", color:"#81B5A1", letter:"SN" },
  { name:"Google",     color:"#4285F4", letter:"G" },
  { name:"HubSpot",    color:"#FF7A59", letter:"HS" },
  { name:"Oracle",     color:"#F80000", letter:"O" },
  { name:"Zoom",       color:"#2D8CFF", letter:"Z" },
  { name:"Zendesk",    color:"#03363D", letter:"Zd" },
  { name:"NetSuite",   color:"#009FDA", letter:"NS" },
  { name:"Workday",    color:"#F8A01C", letter:"W" },
  { name:"GitHub",     color:"#24292F", letter:"GH" },
  { name:"Teams",      color:"#6264A7", letter:"T" },
  { name:"SharePoint", color:"#0078D4", letter:"SP" },
];

/* ─── Reveal hook ───────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".rv,.rv2,.rv3").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── Sub-components ────────────────────────────────── */
function Check() {
  return (
    <span className="flex-shrink-0 inline-flex w-4 h-4 rounded items-center justify-center" style={{ background:"rgba(16,185,129,0.12)" }}>
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </span>
  );
}

function LiveDot() {
  return (
    <span className="relative flex h-2 w-2 flex-shrink-0">
      <span className="absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background:"#10b981", animation:"zuuz-ping 1.8s ease-in-out infinite" }}/>
      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background:"#10b981" }}/>
    </span>
  );
}

function ProgressDots() {
  return (
    <span className="flex gap-[3px] items-center">
      {[0,1,2].map(i => (
        <span key={i} className="w-1 h-1 rounded-full" style={{ background:"#2563eb", animation:`zuuz-blink 1.2s ${i*0.3}s ease-in-out infinite` }}/>
      ))}
    </span>
  );
}

function StatusBadge({ s }: { s: StepStatus }) {
  if (s === "done")   return <span style={{ fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:4, background:"rgba(16,185,129,0.1)", color:"#059669", border:"1px solid rgba(16,185,129,0.2)", whiteSpace:"nowrap" }}>Done</span>;
  if (s === "active") return <span style={{ fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:4, background:"rgba(37,99,235,0.08)", color:"#2563eb", border:"1px solid rgba(37,99,235,0.2)", whiteSpace:"nowrap", display:"inline-flex", alignItems:"center", gap:4 }}><ProgressDots/></span>;
  return <span style={{ fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:4, background:"rgba(0,0,0,0.04)", color:"#9ca3af", border:"1px solid rgba(0,0,0,0.08)", whiteSpace:"nowrap" }}>Pending</span>;
}

/* ─── Animated Workflow Card ────────────────────────── */
function WorkflowCard() {
  const [steps, setSteps] = useState<WStep[]>(INIT_STEPS);

  useEffect(() => {
    let idx = 2;
    const t = setInterval(() => {
      idx = idx >= 3 ? 0 : idx + 1;
      const i = idx;
      setSteps(INIT_STEPS.map((s, j) => ({ ...s, status: j < i ? "done" : j === i ? "active" : "pending" })));
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:20, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.06)" }}>
      {/* Window bar */}
      <div style={{ display:"flex", alignItems:"center", gap:6, padding:"12px 16px", background:"#f9fafb", borderBottom:"1px solid #f3f4f6" }}>
        <span style={{ width:9, height:9, borderRadius:"50%", background:"#ff5f57" }}/>
        <span style={{ width:9, height:9, borderRadius:"50%", background:"#febc2e" }}/>
        <span style={{ width:9, height:9, borderRadius:"50%", background:"#28c840" }}/>
        <span style={{ marginLeft:8, fontSize:11, color:"#9ca3af", fontWeight:500, letterSpacing:"0.02em" }}>ZUUZ Workspace · Procurement · REQ-2841</span>
      </div>
      <div style={{ padding:"18px 18px 0" }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
          <div>
            <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"#9ca3af", marginBottom:4 }}>Active Workflow</p>
            <p style={{ fontSize:14, fontWeight:700, color:"#111827", lineHeight:1.3 }}>AWS Enterprise Renewal — $48,000</p>
            <p style={{ fontSize:11, color:"#9ca3af", marginTop:2 }}>Acme Corp · Initiated by J. Martinez</p>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, fontWeight:600, color:"#059669", background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.15)", padding:"4px 10px", borderRadius:20 }}>
            <LiveDot/> Live
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:14 }}>
          {steps.map(step => (
            <div key={step.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:12, border: step.status === "active" ? "1px solid rgba(37,99,235,0.25)" : "1px solid #f3f4f6", background: step.status === "active" ? "rgba(37,99,235,0.03)" : "#fff", transition:"all 0.4s ease", boxShadow: step.status === "active" ? "0 0 0 3px rgba(37,99,235,0.06)" : "none" }}>
              <span style={{ fontSize:11, fontWeight:700, color:"#d1d5db", width:20, flexShrink:0 }}>0{step.id}</span>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontSize:13, fontWeight:600, color:"#111827", lineHeight:1.3 }}>{step.name}</p>
                <p style={{ fontSize:11, color:"#9ca3af", marginTop:2 }}>{step.sub}</p>
              </div>
              <StatusBadge s={step.status}/>
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:6, marginBottom:14 }}>
          {[{v:"3×",l:"Faster"},{v:"100%",l:"Audited"},{v:"0",l:"Manual"},{v:"65%",l:"Cycle↓"}].map(m => (
            <div key={m.l} style={{ background:"#f9fafb", borderRadius:10, padding:"10px 8px", textAlign:"center" }}>
              <p style={{ fontSize:17, fontWeight:800, color:"#111827", lineHeight:1 }}>{m.v}</p>
              <p style={{ fontSize:10, color:"#9ca3af", marginTop:3, fontWeight:500 }}>{m.l}</p>
            </div>
          ))}
        </div>
        <div style={{ background:"#f9fafb", borderRadius:12, padding:"12px 14px", marginBottom:0 }}>
          <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"#9ca3af", marginBottom:10 }}>Context Pack</p>
          {[
            {k:"Budget remaining Q1",    v:"$142,000",           c:"#059669"},
            {k:"Vendor SOC 2 status",    v:"Certified ✓",        c:"#059669"},
            {k:"Prior exceptions (12mo)",v:"2 approved",         c:"#374151"},
            {k:"Contract auto-renew",    v:"Jun 30 · 90d notice",c:"#d97706"},
          ].map(r => (
            <div key={r.k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
              <span style={{ fontSize:11, color:"#6b7280" }}>{r.k}</span>
              <span style={{ fontSize:11, fontWeight:700, color:r.c }}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Logo marquee */}
      <div style={{ borderTop:"1px solid #f3f4f6", overflow:"hidden", padding:"10px 0" }}>
        <div style={{ display:"flex", gap:8, animation:"zuuz-marquee 22s linear infinite", width:"max-content" }}>
          {[...LOGO_ITEMS, ...LOGO_ITEMS].map((l, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:5, padding:"4px 10px", background:"#fff", border:"1px solid #f3f4f6", borderRadius:8, flexShrink:0 }}>
              <span style={{ width:18, height:18, borderRadius:4, background:l.color, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:800, color:"#fff", lineHeight:1 }}>{l.letter.slice(0,2)}</span>
              <span style={{ fontSize:10, fontWeight:600, color:"#6b7280", whiteSpace:"nowrap" }}>{l.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── SVG Architecture Diagram ──────────────────────── */
function ArchDiagram() {
  return (
    <svg viewBox="0 0 540 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", maxWidth:540 }}>
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0"/>
          <stop offset="50%" stopColor="#2563eb" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* Input lines */}
      {[[85,60,210,145],[85,150,210,155],[85,240,210,165]].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(37,99,235,0.2)" strokeWidth="1.5" strokeDasharray="5 4"/>
      ))}
      {/* Output lines */}
      {[[330,150,455,60],[330,155,455,150],[330,160,455,240]].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(16,185,129,0.25)" strokeWidth="1.5" strokeDasharray="5 4"/>
      ))}
      {/* Input boxes */}
      {[["Email","#eff6ff","#bfdbfe","#1d4ed8",55,42],["Docs","#f0fdf4","#bbf7d0","#15803d",55,132],["CRM/ERP","#fdf4ff","#e9d5ff","#7e22ce",35,222]].map(([label,bg,border,text,x,y]) => (
        <g key={String(label)}>
          <rect x={Number(x)} y={Number(y)} width={Number(label === "CRM/ERP" ? 76 : 66)} height={32} rx={8} fill={String(bg)} stroke={String(border)} strokeWidth="1"/>
          <text x={Number(x) + (Number(label === "CRM/ERP" ? 76 : 66))/2} y={Number(y)+20} textAnchor="middle" fontSize="11" fontWeight="600" fill={String(text)}>{String(label)}</text>
        </g>
      ))}
      {/* Central ZUUZ node */}
      <rect x={210} y={115} width={120} height={72} rx={16} fill="#1d4ed8"/>
      <rect x={210} y={115} width={120} height={72} rx={16} fill="url(#lineGrad)" opacity="0.3"/>
      <text x="270" y="149" textAnchor="middle" fontSize="20" fontWeight="800" fill="white">ZUUZ</text>
      <text x="270" y="167" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.65)" letterSpacing="0.1em">EXECUTION LAYER</text>
      {/* Output boxes */}
      {[["CRM Update","#f0fdf4","#bbf7d0","#15803d",455,44],["Audit Log","#eff6ff","#bfdbfe","#1d4ed8",455,134],["Write-back","#fff7ed","#fed7aa","#c2410c",455,224]].map(([label,bg,border,text,x,y]) => (
        <g key={String(label)}>
          <rect x={Number(x)} y={Number(y)} width={78} height={32} rx={8} fill={String(bg)} stroke={String(border)} strokeWidth="1"/>
          <text x={Number(x)+39} y={Number(y)+20} textAnchor="middle" fontSize="10" fontWeight="600" fill={String(text)}>{String(label)}</text>
        </g>
      ))}
      {/* Animated flow dots */}
      {[
        {path:"M 85,76 L 210,145", delay:"0s", color:"#2563eb"},
        {path:"M 85,166 L 210,155", delay:"0.9s", color:"#2563eb"},
        {path:"M 330,150 L 455,60", delay:"0.3s", color:"#10b981"},
        {path:"M 330,157 L 455,166", delay:"1.2s", color:"#10b981"},
      ].map((d, i) => (
        <circle key={i} r="4.5" fill={d.color} opacity="0.85">
          <animateMotion dur="2.4s" begin={d.delay} repeatCount="indefinite" path={d.path}/>
        </circle>
      ))}
    </svg>
  );
}

/* ─── Logo pill for marquee ─────────────────────────── */
function LogoPill({ item }: { item: typeof LOGO_ITEMS[0] }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:7, padding:"7px 14px", background:"#fff", border:"1px solid #e5e7eb", borderRadius:40, flexShrink:0, boxShadow:"0 1px 3px rgba(0,0,0,0.05)" }}>
      <span style={{ width:20, height:20, borderRadius:5, background:item.color, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:800, color:"#fff", flexShrink:0 }}>{item.letter.slice(0,2)}</span>
      <span style={{ fontSize:12, fontWeight:600, color:"#374151", whiteSpace:"nowrap" }}>{item.name}</span>
    </div>
  );
}

/* ─── How It Works stepper ──────────────────────────── */
function HowSection() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p+1)%4), 3200);
    return () => clearInterval(t);
  }, []);

  const panels = [
    <div key="c" style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center" }}>
      {["Salesforce","SAP","Slack","Oracle","Jira","Teams","Gmail","HubSpot","Zoom","NetSuite"].map(n => (
        <span key={n} style={{ fontSize:12, fontWeight:600, padding:"6px 14px", background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:20, color:"#475569" }}>{n}</span>
      ))}
      <p style={{ width:"100%", textAlign:"center", fontSize:12, color:"#94a3b8", marginTop:8 }}>200+ connectors · No migration · Live in minutes</p>
    </div>,
    <div key="u" style={{ display:"flex", flexDirection:"column", gap:8 }}>
      {["Email threads → Action items","CRM deals → Risk signals","Documents → Key obligations","Meetings → Decisions & owners"].map((item,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:10 }}>
          <span style={{ width:20, height:20, borderRadius:"50%", background:"#dbeafe", display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <span style={{ fontSize:13, color:"#374151", fontWeight:500 }}>{item}</span>
        </div>
      ))}
    </div>,
    <div key="a" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
      {["Email Agent","Document Agent","Meeting Agent","Search Agent"].map((a,i) => (
        <div key={i} style={{ padding:"14px 12px", borderRadius:12, border:"1px solid #dbeafe", background:"rgba(37,99,235,0.03)", textAlign:"center" }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:"#dbeafe", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 8px", fontSize:10, fontWeight:800, color:"#1d4ed8" }}>AI</div>
          <p style={{ fontSize:12, fontWeight:600, color:"#1e293b" }}>{a}</p>
        </div>
      ))}
      <p style={{ gridColumn:"1/-1", textAlign:"center", fontSize:11, color:"#94a3b8", fontWeight:500 }}>Humans approve what matters</p>
    </div>,
    <div key="p" style={{ display:"flex", flexDirection:"column" }}>
      {[
        {label:"REQ-2841 approved",  time:"09:42:18 UTC", user:"S. Chen (VP Finance)"},
        {label:"SAP write-back",     time:"09:42:21 UTC", user:"System verified"},
        {label:"PO #4892 generated", time:"09:42:22 UTC", user:"Automated"},
      ].map((e,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderBottom: i < 2 ? "1px solid #f3f4f6" : "none" }}>
          <span style={{ width:20, height:20, borderRadius:"50%", background:"rgba(16,185,129,0.1)", display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <div style={{ flex:1 }}>
            <p style={{ fontSize:12, fontWeight:600, color:"#111827" }}>{e.label}</p>
            <p style={{ fontSize:10, color:"#9ca3af" }}>{e.user} · {e.time}</p>
          </div>
        </div>
      ))}
      <p style={{ textAlign:"center", fontSize:11, fontWeight:700, color:"#059669", marginTop:10 }}>100% audit coverage · Every action logged</p>
    </div>,
  ];

  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"center" }}>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {HOW_STEPS.map((step,i) => (
          <button key={step.num} onClick={() => setActive(i)} style={{ textAlign:"left", display:"flex", gap:16, padding:"16px 20px", borderRadius:16, border: active===i ? "1px solid #bfdbfe" : "1px solid #f3f4f6", background: active===i ? "rgba(37,99,235,0.03)" : "#fff", cursor:"pointer", transition:"all 0.25s ease", boxShadow: active===i ? "0 0 0 4px rgba(37,99,235,0.05)" : "none" }}>
            <span style={{ fontSize:11, fontWeight:800, letterSpacing:"0.08em", color: active===i ? "#2563eb" : "#d1d5db", flexShrink:0, paddingTop:2 }}>{step.num}</span>
            <div>
              <p style={{ fontSize:15, fontWeight:700, marginBottom:2, color: active===i ? "#111827" : "#6b7280", transition:"color 0.2s" }}>{step.title}</p>
              {active===i && <p style={{ fontSize:13, color:"#6b7280", lineHeight:1.6 }}>{step.body}</p>}
            </div>
          </button>
        ))}
      </div>
      <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:20, padding:28, minHeight:260, boxShadow:"0 8px 32px rgba(0,0,0,0.06)", display:"flex", alignItems:"center", justifyContent:"center" }}>
        {panels[active]}
      </div>
    </div>
  );
}

/* ─── Metrics with count-up ─────────────────────────── */
function Metrics() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold:0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:1, background:"#e5e7eb", borderRadius:20, overflow:"hidden", border:"1px solid #e5e7eb" }}>
      {METRICS.map((m,i) => (
        <div key={m.label} style={{ background:"#fff", padding:"32px 24px", textAlign:"center", opacity: vis?1:0, transform: vis?"none":"translateY(16px)", transition:`opacity 0.6s ease ${i*120}ms, transform 0.6s ease ${i*120}ms` }}>
          <p style={{ fontSize:40, fontWeight:800, color:"#111827", lineHeight:1, letterSpacing:"-0.03em", marginBottom:6 }}>{m.val}</p>
          <p style={{ fontSize:14, fontWeight:700, color:"#374151", marginBottom:4 }}>{m.label}</p>
          <p style={{ fontSize:12, color:"#9ca3af" }}>{m.sub}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Ambient SVG background ────────────────────────── */
function AmbientBg() {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:-1, overflow:"hidden", pointerEvents:"none" }} aria-hidden>
      <div style={{ position:"absolute", width:700, height:700, borderRadius:"50%", top:-200, right:-150, background:"radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)", filter:"blur(60px)", animation:"zuuz-orb1 22s ease-in-out infinite" }}/>
      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", bottom:-100, left:-80, background:"radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)", filter:"blur(60px)", animation:"zuuz-orb2 28s ease-in-out infinite" }}/>
      <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", top:"45%", left:"38%", background:"radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)", filter:"blur(80px)", animation:"zuuz-orb3 18s ease-in-out infinite" }}/>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────── */
export default function HomePage() {
  useReveal();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
        body{font-family:'Inter',system-ui,sans-serif;background:#fff;color:#111827;overflow-x:hidden}
        @keyframes zuuz-ping{0%{transform:scale(1);opacity:.7}100%{transform:scale(2.4);opacity:0}}
        @keyframes zuuz-blink{0%,100%{opacity:.2}50%{opacity:1}}
        @keyframes zuuz-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes zuuz-marquee-r{from{transform:translateX(-50%)}to{transform:translateX(0)}}
        @keyframes zuuz-orb1{0%,100%{transform:translate(0,0)}40%{transform:translate(50px,-40px)}70%{transform:translate(-30px,20px)}}
        @keyframes zuuz-orb2{0%,100%{transform:translate(0,0)}35%{transform:translate(-60px,35px)}65%{transform:translate(30px,-20px)}}
        @keyframes zuuz-orb3{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,45px)}}
        @keyframes zuuz-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes zuuz-draw{from{stroke-dashoffset:400}to{stroke-dashoffset:0}}
        @keyframes zuuz-fadein{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes zuuz-fadeinr{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:translateX(0)}}
        .rv{opacity:0;transform:translateY(22px);transition:opacity 0.65s ease,transform 0.65s ease}
        .rv2{opacity:0;transform:translateX(26px);transition:opacity 0.65s ease,transform 0.65s ease}
        .rv3{opacity:0;transform:scale(0.96);transition:opacity 0.55s ease,transform 0.55s ease}
        .rv.vis,.rv2.vis,.rv3.vis{opacity:1;transform:none}
        .d1{transition-delay:80ms}.d2{transition-delay:160ms}.d3{transition-delay:240ms}.d4{transition-delay:320ms}
        .d5{transition-delay:400ms}.d6{transition-delay:480ms}.d7{transition-delay:560ms}.d8{transition-delay:640ms}
        .dot-grid{background-image:radial-gradient(circle,rgba(0,0,0,0.055) 1px,transparent 1px);background-size:26px 26px}
        .btn-primary{display:inline-flex;align-items:center;gap:6px;padding:11px 24px;background:#1d4ed8;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.18s ease;font-family:inherit;text-decoration:none;line-height:1}
        .btn-primary:hover{background:#1e40af;transform:translateY(-1px);box-shadow:0 8px 20px rgba(29,78,216,0.3)}
        .btn-secondary{display:inline-flex;align-items:center;gap:6px;padding:11px 22px;background:#fff;color:#374151;border:1.5px solid #d1d5db;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.18s ease;font-family:inherit;text-decoration:none;line-height:1}
        .btn-secondary:hover{border-color:#6b7280;background:#f9fafb;transform:translateY(-1px)}
        .btn-ghost-nav{display:inline-flex;align-items:center;padding:7px 14px;background:transparent;color:#4b5563;border:1.5px solid #e5e7eb;border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.15s ease;font-family:inherit;text-decoration:none;line-height:1}
        .btn-ghost-nav:hover{border-color:#9ca3af;color:#111827;background:#f9fafb}
        .btn-nav-cta{display:inline-flex;align-items:center;padding:7px 16px;background:#1d4ed8;color:#fff;border:none;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.15s ease;font-family:inherit;text-decoration:none;line-height:1}
        .btn-nav-cta:hover{background:#1e40af;box-shadow:0 4px 12px rgba(29,78,216,0.25)}
        .card-lift{transition:transform 0.2s ease,box-shadow 0.2s ease,border-color 0.2s ease}
        .card-lift:hover{transform:translateY(-3px);box-shadow:0 12px 36px rgba(0,0,0,0.09);border-color:#d1d5db!important}
        .nav-link{font-size:13px;color:#4b5563;font-weight:600;text-decoration:none;transition:color 0.15s ease;padding:4px 2px}
        .nav-link:hover{color:#1d4ed8}
        h1,h2,h3{letter-spacing:-0.025em}
        ::selection{background:rgba(37,99,235,0.12)}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.12);border-radius:3px}
      `}</style>
      <AmbientBg/>

      {/* ── NAV ── */}
      <header style={{ position:"sticky", top:0, zIndex:50, background:"rgba(255,255,255,0.92)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", borderBottom:"1px solid #f3f4f6" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
          <Link href="/" style={{ display:"flex", alignItems:"center", textDecoration:"none" }}>
            <Image src="/brand/zuuz-logo.png" alt="ZUUZ" width={88} height={28} priority/>
          </Link>
          <nav style={{ display:"flex", alignItems:"center", gap:28 }} className="hidden-mobile">
            {[["Products","/"],["Solutions","/solutions"],["Customers","/customers"],["Resources","/resources"],["About","/about"]].map(([l,h]) => (
              <Link key={l} href={h} className="nav-link">{l}</Link>
            ))}
          </nav>
          <div style={{ display:"flex", alignItems:"center", gap:8 }} className="hidden-mobile">
            <Link href="/about/contact" className="btn-ghost-nav">Sign in</Link>
            <Link href="/about/contact" className="btn-nav-cta">Request demo →</Link>
          </div>
          <button onClick={() => setMobileOpen(o=>!o)} style={{ display:"none", padding:8, background:"none", border:"none", cursor:"pointer" }} className="show-mobile" aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
        {mobileOpen && (
          <div style={{ background:"#fff", borderTop:"1px solid #f3f4f6", padding:"16px 24px", display:"flex", flexDirection:"column", gap:16 }}>
            {["Products","Solutions","Customers","Resources","About"].map(l => (
              <Link key={l} href="/" style={{ fontSize:15, fontWeight:600, color:"#374151", textDecoration:"none" }}>{l}</Link>
            ))}
            <Link href="/about/contact" className="btn-primary" style={{ textAlign:"center", justifyContent:"center" }}>Request demo →</Link>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section style={{ position:"relative", overflow:"hidden", paddingBottom:0 }}>
        <div className="dot-grid" style={{ position:"absolute", inset:0, opacity:0.6 }}/>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 55% at 50% -5%, transparent 45%, #fff 100%)" }}/>
        <div style={{ position:"relative", zIndex:2, maxWidth:1200, margin:"0 auto", padding:"0 24px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"48px 56px", alignItems:"center", paddingTop:72, paddingBottom:0 }}>

            {/* Left */}
            <div>
              <div className="rv" style={{ display:"inline-flex", alignItems:"center", gap:8, border:"1px solid #e5e7eb", borderRadius:40, padding:"6px 14px", marginBottom:24, background:"rgba(255,255,255,0.8)" }}>
                <LiveDot/>
                <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.07em", textTransform:"uppercase", color:"#4b5563" }}>The Agentic AI Execution Layer for Enterprise</span>
              </div>

              <h1 className="rv d1" style={{ fontSize:"clamp(34px,4vw,52px)", fontWeight:900, lineHeight:1.06, color:"#0f172a", marginBottom:20 }}>
                Your enterprise<br/>runs on decisions.{" "}
                <span style={{ color:"#94a3b8", fontWeight:600 }}>ZUUZ makes sure<br/>they execute.</span>
              </h1>

              <p className="rv d2" style={{ fontSize:17, color:"#475569", lineHeight:1.7, maxWidth:480, marginBottom:36 }}>
                Context assembled from email, docs, meetings, CRM and ERP. Decisions routed through policy. Actions written back to systems of record — every step identity-verified and audit-logged.
              </p>

              <div className="rv d3" style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:36 }}>
                <Link href="/about/contact" className="btn-primary" style={{ fontSize:15, padding:"13px 28px" }}>Request a demo</Link>
                <Link href="/products/ai-agents" className="btn-secondary" style={{ fontSize:15, padding:"13px 26px" }}>See how it works →</Link>
              </div>

              <div className="rv d4" style={{ display:"flex", flexWrap:"wrap", gap:"8px 20px" }}>
                {["SOC 2 Type I","SAML 2.0 / SSO","Identity-verified","200+ connectors","Immutable audit trail"].map(item => (
                  <div key={item} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"#6b7280", fontWeight:600 }}>
                    <Check/>{item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="rv2 d1" style={{ animation:"zuuz-float 6s ease-in-out infinite" }}>
              <WorkflowCard/>
            </div>
          </div>

          {/* Integration marquee */}
          <div style={{ borderTop:"1px solid #f3f4f6", paddingTop:28, paddingBottom:28, marginTop:40, position:"relative" }}>
            <p style={{ textAlign:"center", fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"#9ca3af", marginBottom:18 }}>Connects with the tools your teams already use</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10, overflow:"hidden" }}>
              <div style={{ display:"flex", gap:10, animation:"zuuz-marquee 26s linear infinite", width:"max-content" }}>
                {[...LOGO_ITEMS, ...LOGO_ITEMS].map((l,i) => <LogoPill key={i} item={l}/>)}
              </div>
              <div style={{ display:"flex", gap:10, animation:"zuuz-marquee-r 30s linear infinite", width:"max-content" }}>
                {[...LOGO_ITEMS.slice(8), ...LOGO_ITEMS.slice(0,8), ...LOGO_ITEMS.slice(8), ...LOGO_ITEMS.slice(0,8)].map((l,i) => <LogoPill key={i} item={l}/>)}
              </div>
            </div>
            <div style={{ position:"absolute", top:0, left:0, bottom:0, width:80, background:"linear-gradient(to right, #fff, transparent)", pointerEvents:"none" }}/>
            <div style={{ position:"absolute", top:0, right:0, bottom:0, width:80, background:"linear-gradient(to left, #fff, transparent)", pointerEvents:"none" }}/>
          </div>
        </div>
      </section>

      {/* ── THREE CAPABILITIES ── */}
      <section style={{ padding:"80px 0", borderTop:"1px solid #f3f4f6" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px" }}>
          <div className="rv" style={{ textAlign:"center", marginBottom:52 }}>
            <p style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#2563eb", marginBottom:12 }}>Platform</p>
            <h2 style={{ fontSize:"clamp(28px,3.5vw,42px)", fontWeight:900, color:"#0f172a", marginBottom:14 }}>Three capabilities.<br/>One execution layer.</h2>
            <p style={{ fontSize:17, color:"#64748b", maxWidth:480, margin:"0 auto" }}>Copilots that act. Flows that enforce. Search that proves.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {[
              { title:"Persona Copilots",  body:"Role-specific copilots for Sales, Procurement, HR, Legal, and Ops — designed to act, not just answer.", href:"/products/ai-agents",     accent:"#2563eb", bg:"#eff6ff", icon:"👤" },
              { title:"Execution Flows",   body:"Import your existing processes from CRM/ERP/ITSM and run them with policy gates, approvals, and audit trails.", href:"/products/workflows",    accent:"#7c3aed", bg:"#f5f3ff", icon:"⚡" },
              { title:"Evidence Search",   body:"One search across every tool — with citations and a ready-to-share context pack behind every decision.", href:"/products/unified-search", accent:"#059669", bg:"#ecfdf5", icon:"🔍" },
            ].map((cap,i) => (
              <Link key={cap.title} href={cap.href} className={`rv d${i+1} card-lift`} style={{ display:"block", background:"#fff", border:"1px solid #e5e7eb", borderRadius:20, padding:28, textDecoration:"none" }}>
                <div style={{ width:44, height:44, borderRadius:12, background:cap.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, marginBottom:18 }}>{cap.icon}</div>
                <h3 style={{ fontSize:18, fontWeight:800, color:"#0f172a", marginBottom:10 }}>{cap.title}</h3>
                <p style={{ fontSize:14, color:"#64748b", lineHeight:1.65, marginBottom:18 }}>{cap.body}</p>
                <span style={{ fontSize:13, fontWeight:700, color:cap.accent }}>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE — dark section ── */}
      <section style={{ background:"#0f172a", padding:"80px 0", overflow:"hidden" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }}>
            <div>
              <p className="rv" style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#60a5fa", marginBottom:14 }}>Architecture</p>
              <h2 className="rv d1" style={{ fontSize:"clamp(26px,3vw,40px)", fontWeight:900, color:"#f8fafc", lineHeight:1.1, marginBottom:18 }}>
                Signal in.<br/>Decision out.<br/><span style={{ color:"#64748b" }}>Audit logged.</span>
              </h2>
              <p className="rv d2" style={{ fontSize:16, color:"#94a3b8", lineHeight:1.7, marginBottom:28, maxWidth:420 }}>
                ZUUZ assembles full context from every connected system, routes through your policies, takes action — and writes back only when identity, permissions, and evidence are verified.
              </p>
              <div className="rv d3" style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {["Permission-safe execution on every action","Identity verified before every write-back","Evidence-backed every single decision","Complete immutable audit trail by default"].map(item => (
                  <div key={item} style={{ display:"flex", alignItems:"center", gap:10, fontSize:14, color:"#cbd5e1", fontWeight:500 }}>
                    <span style={{ width:20, height:20, borderRadius:"50%", background:"rgba(16,185,129,0.15)", display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rv2 d1">
              <ArchDiagram/>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding:"80px 0", borderTop:"1px solid #f3f4f6" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px" }}>
          <div className="rv" style={{ textAlign:"center", marginBottom:52 }}>
            <p style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#2563eb", marginBottom:12 }}>How it works</p>
            <h2 style={{ fontSize:"clamp(28px,3.5vw,42px)", fontWeight:900, color:"#0f172a", marginBottom:14 }}>Weeks, not quarters</h2>
            <p style={{ fontSize:17, color:"#64748b", maxWidth:440, margin:"0 auto" }}>From connected to autonomous in four steps. No rip-and-replace.</p>
          </div>
          <div className="rv"><HowSection/></div>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section style={{ padding:"80px 0", background:"#f8fafc", borderTop:"1px solid #f3f4f6" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px" }}>
          <div className="rv" style={{ textAlign:"center", marginBottom:40 }}>
            <p style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#2563eb", marginBottom:12 }}>Results</p>
            <h2 style={{ fontSize:"clamp(28px,3.5vw,42px)", fontWeight:900, color:"#0f172a" }}>Measurable ROI from day one</h2>
          </div>
          <div className="rv"><Metrics/></div>
        </div>
      </section>

      {/* ── AGENTS GRID ── */}
      <section style={{ padding:"80px 0", borderTop:"1px solid #f3f4f6" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px" }}>
          <div className="rv" style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:40, flexWrap:"wrap", gap:16 }}>
            <div>
              <p style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#2563eb", marginBottom:12 }}>Persona Copilots</p>
              <h2 style={{ fontSize:"clamp(26px,3.5vw,40px)", fontWeight:900, color:"#0f172a", maxWidth:360 }}>An agent for every operational team</h2>
            </div>
            <Link href="/products/ai-agents" className="btn-secondary">Browse all agents →</Link>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
            {AGENTS.map((agent,i) => (
              <Link key={agent.title} href={agent.href} className={`rv d${(i%8)+1} card-lift`} style={{ display:"block", background:"#fff", border:"1px solid #e5e7eb", borderRadius:18, padding:22, textDecoration:"none" }}>
                <p style={{ fontSize:10, fontWeight:800, letterSpacing:"0.09em", textTransform:"uppercase", color:"#9ca3af", marginBottom:12 }}>{agent.tag}</p>
                <h3 style={{ fontSize:15, fontWeight:800, color:"#0f172a", marginBottom:8, lineHeight:1.3 }}>{agent.title}</h3>
                <p style={{ fontSize:12, color:"#64748b", lineHeight:1.6, marginBottom:16 }}>{agent.body}</p>
                <p style={{ fontSize:12, fontWeight:800, color:"#059669" }}>{agent.stat}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section style={{ padding:"80px 0", background:"#f8fafc", borderTop:"1px solid #f3f4f6" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px" }}>
          <div className="rv" style={{ textAlign:"center", marginBottom:48 }}>
            <p style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#2563eb", marginBottom:12 }}>Solutions</p>
            <h2 style={{ fontSize:"clamp(28px,3.5vw,42px)", fontWeight:900, color:"#0f172a", marginBottom:14 }}>Purpose-built for your industry</h2>
            <p style={{ fontSize:17, color:"#64748b", maxWidth:460, margin:"0 auto" }}>Same platform. Tailored use cases, context packs, and agent configurations.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
            {INDUSTRIES.map((ind,i) => (
              <Link key={ind.name} href={ind.href} className={`rv d${(i%8)+1} card-lift`} style={{ display:"flex", flexDirection:"column", gap:6, padding:"20px 20px", border:"1px solid #e5e7eb", background:"#fff", borderRadius:16, textDecoration:"none" }}>
                <span style={{ fontSize:14, fontWeight:800, color:"#0f172a" }}>{ind.name}</span>
                <span style={{ fontSize:12, color:"#94a3b8", lineHeight:1.4 }}>{ind.desc}</span>
                <span style={{ fontSize:12, fontWeight:700, color:"#2563eb", marginTop:4 }}>Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section style={{ padding:"80px 0", borderTop:"1px solid #f3f4f6" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px" }}>
          <div className="rv" style={{ textAlign:"center", marginBottom:48 }}>
            <p style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#2563eb", marginBottom:12 }}>Security & Trust</p>
            <h2 style={{ fontSize:"clamp(28px,3.5vw,42px)", fontWeight:900, color:"#0f172a", marginBottom:14 }}>Permission-aware by design</h2>
            <p style={{ fontSize:17, color:"#64748b", maxWidth:460, margin:"0 auto" }}>Every action verified. Every decision logged. Built for enterprise security review.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:10 }}>
            {["SOC 2 Type I","SAML 2.0 / SSO","Role-based access","Audit trail","Evidence links","On-prem option"].map((item,i) => (
              <div key={item} className={`rv d${i+1}`} style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", padding:"20px 12px", background:"#fff", border:"1px solid #e5e7eb", borderRadius:16 }}>
                <div style={{ width:40, height:40, borderRadius:12, background:"rgba(16,185,129,0.08)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <p style={{ fontSize:12, fontWeight:700, color:"#374151", lineHeight:1.4 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding:"80px 0", borderTop:"1px solid #f3f4f6" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px" }}>
          <div className="rv" style={{ position:"relative", overflow:"hidden", background:"#0f172a", borderRadius:28, padding:"60px 56px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:40, flexWrap:"wrap" }}>
            {/* BG orbs */}
            <div style={{ position:"absolute", top:-60, right:-60, width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)", filter:"blur(40px)", pointerEvents:"none" }}/>
            <div style={{ position:"absolute", bottom:-60, left:-60, width:240, height:240, borderRadius:"50%", background:"radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)", filter:"blur(40px)", pointerEvents:"none" }}/>
            {/* Grid lines */}
            <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize:"40px 40px", pointerEvents:"none" }}/>
            <div style={{ position:"relative", zIndex:1 }}>
              <h2 style={{ fontSize:"clamp(24px,3vw,38px)", fontWeight:900, color:"#f8fafc", lineHeight:1.15, marginBottom:14, maxWidth:480 }}>
                Bring your workflows.<br/>
                <span style={{ color:"#64748b", fontWeight:600 }}>We&apos;ll make them run themselves.</span>
              </h2>
              <p style={{ fontSize:16, color:"#94a3b8", maxWidth:440, lineHeight:1.65 }}>
                No migration. No six-month implementation. Connect, automate, and prove — in weeks.
              </p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, flexShrink:0, position:"relative", zIndex:1 }}>
              <Link href="/about/contact" style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", padding:"13px 28px", background:"#fff", color:"#0f172a", borderRadius:11, fontSize:15, fontWeight:800, textDecoration:"none", transition:"all 0.18s ease", boxShadow:"0 4px 14px rgba(255,255,255,0.15)", whiteSpace:"nowrap" }}>
                Request a demo →
              </Link>
              <Link href="/products/ai-agents" style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", padding:"13px 26px", background:"transparent", color:"#94a3b8", border:"1.5px solid rgba(255,255,255,0.12)", borderRadius:11, fontSize:14, fontWeight:600, textDecoration:"none", transition:"all 0.18s ease", whiteSpace:"nowrap" }}>
                See Persona Copilots
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:"1px solid #f3f4f6", background:"#fff" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"56px 24px 40px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr", gap:40, marginBottom:48 }}>
            <div>
              <Image src="/brand/zuuz-logo.png" alt="ZUUZ" width={80} height={26} style={{ marginBottom:16 }}/>
              <p style={{ fontSize:13, color:"#64748b", lineHeight:1.7, maxWidth:200, marginBottom:20 }}>
                The Agentic AI execution layer for enterprise work. Decision. Execution. AI Workspace.
              </p>
              <div style={{ display:"flex", gap:8 }}>
                {[["LinkedIn","https://linkedin.com/company/zuuz-ai"],["Twitter","https://twitter.com/zuuz_ai"]].map(([l,h]) => (
                  <a key={l} href={h} target="_blank" rel="noopener noreferrer" className="btn-ghost-nav" style={{ fontSize:11, padding:"5px 12px" }}>{l}</a>
                ))}
              </div>
            </div>
            {[
              { head:"Products", links:[["Persona Copilots","/products/ai-agents"],["Execution Flows","/products/workflows"],["Evidence Search","/products/unified-search"]] },
              { head:"Solutions", links:[["IT Services","/solutions/it-services"],["Financial Services","/solutions/financial-services"],["Healthcare","/solutions/healthcare"],["Distribution","/solutions/distribution"],["Manufacturing","/solutions/manufacturing"]] },
              { head:"Company",  links:[["Our Story","/about/our-story"],["Careers","/about/careers"],["Trust & Security","/about/trust-security"],["Contact","/about/contact"],["Customers","/customers"]] },
              { head:"Resources",links:[["Resource Hub","/resources"],["Blog","/resources/blog/agentic-ai-explained"],["Industry Guides","/resources/manuals/industries"],["Agentic AI Explained","/resources/blog/agentic-ai-explained"]] },
            ].map(col => (
              <div key={col.head}>
                <p style={{ fontSize:10, fontWeight:800, letterSpacing:"0.09em", textTransform:"uppercase", color:"#9ca3af", marginBottom:16 }}>{col.head}</p>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {col.links.map(([l,h]) => (
                    <Link key={l} href={h} style={{ fontSize:13, color:"#64748b", textDecoration:"none", fontWeight:500, transition:"color 0.15s" }} onMouseEnter={e=>(e.currentTarget.style.color="#1d4ed8")} onMouseLeave={e=>(e.currentTarget.style.color="#64748b")}>{l}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid #f3f4f6", paddingTop:24, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
            <p style={{ fontSize:12, color:"#9ca3af" }}>© 2026 ZUUZ, Inc. All rights reserved. · 440N Wolfe Rd, Sunnyvale, CA 94085</p>
            <div style={{ display:"flex", gap:20 }}>
              {[["Privacy Policy","/privacy"],["Terms","/terms"],["Cookies","/cookies"]].map(([l,h]) => (
                <Link key={l} href={h} style={{ fontSize:12, color:"#9ca3af", textDecoration:"none", fontWeight:500 }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
      `}</style>
    </>
  );
}
