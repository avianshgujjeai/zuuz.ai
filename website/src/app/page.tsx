"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─────────────────────────────────────────────────────
   DESIGN TOKENS  (matches the brief's color system)
───────────────────────────────────────────────────── */
const T = {
  ink:     "#0B1324",
  navy:    "#0F1B3D",
  blue:    "#2457FF",
  blue2:   "#3B82F6",
  cyan:    "#60A5FA",
  bg:      "#F8FAFC",
  white:   "#FFFFFF",
  muted:   "#64748B",
  border:  "#DCE3F1",
  dark:    "#081225",
};

/* ─────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────── */
const NAV_LINKS = [
  ["Platform", "/products/ai-agents"],
  ["Solutions", "/solutions"],
  ["Customers", "/customers"],
  ["Resources", "/resources"],
  ["About", "/about"],
];

const LOGOS = [
  { name:"Salesforce",  color:"#00A1E0", abbr:"SF" },
  { name:"SAP",         color:"#0070AD", abbr:"SAP" },
  { name:"Microsoft",   color:"#0078D4", abbr:"MS" },
  { name:"Slack",       color:"#611f69", abbr:"SL" },
  { name:"Jira",        color:"#0052CC", abbr:"JR" },
  { name:"ServiceNow",  color:"#62D84E", abbr:"SN" },
  { name:"Google",      color:"#4285F4", abbr:"GW" },
  { name:"HubSpot",     color:"#FF7A59", abbr:"HS" },
  { name:"Oracle",      color:"#C74634", abbr:"OR" },
  { name:"Zoom",        color:"#2D8CFF", abbr:"ZM" },
  { name:"Zendesk",     color:"#03363D", abbr:"ZD" },
  { name:"NetSuite",    color:"#009EDB", abbr:"NS" },
  { name:"Workday",     color:"#F5841F", abbr:"WD" },
  { name:"GitHub",      color:"#24292F", abbr:"GH" },
  { name:"Teams",       color:"#464EB8", abbr:"TM" },
  { name:"SharePoint",  color:"#0078D4", abbr:"SP" },
];

const AGENTS = [
  { tag:"Sales",       title:"Sales AI Agent",       body:"Keeps pipeline honest, follow-ups timely, forecasts grounded in real activity.",             stat:"4–8 hrs/week per rep",       href:"/products/agents/sales" },
  { tag:"Procurement", title:"Procurement AI Agent",  body:"Validates requests, compares vendors, routes approvals, generates POs automatically.",       stat:"5–10 hrs/week per buyer",    href:"/products/agents/procurement" },
  { tag:"Email",       title:"Email AI Agent",        body:"Classifies inbound, summarizes threads, drafts replies, routes to systems of record.",       stat:"3–6 hrs/week per user",     href:"/products/agents/email" },
  { tag:"Documents",   title:"Document AI Agent",     body:"Extracts clauses, surfaces risks, tracks versions, routes for approval.",                    stat:"6–12 hrs/week per analyst", href:"/products/agents/documents" },
  { tag:"Meetings",    title:"Meeting AI Agent",      body:"Turns every meeting into structured outcomes: decisions logged, actions assigned.",            stat:"3–5 hrs/week per manager",  href:"/products/agents/meetings" },
  { tag:"HR",          title:"HR AI Agent",           body:"Automates onboarding, policy Q&A, leave workflows, and benefits routing at scale.",            stat:"8–15 hrs/week per HR",      href:"/products/agents/hr" },
  { tag:"Legal",       title:"Legal AI Agent",        body:"Handles intake, runs contracts against your playbook, flags deviations, routes approval.",     stat:"5–10 hrs/week per counsel", href:"/products/agents/legal" },
  { tag:"Logistics",   title:"Logistics AI Agent",    body:"Monitors shipments, flags exceptions before escalation, automates ETA comms.",               stat:"4–8 hrs/week per coord.",   href:"/products/agents/logistics" },
];

const INDUSTRIES = [
  { name:"IT Services",        href:"/solutions/it-services",        desc:"Change requests, ITSM approvals, vendor management" },
  { name:"Financial Services", href:"/solutions/financial-services", desc:"Spend approvals, policy exceptions, vendor onboarding" },
  { name:"Healthcare",         href:"/solutions/healthcare",         desc:"Medical procurement, vendor renewals, staffing" },
  { name:"Distribution",       href:"/solutions/distribution",       desc:"POs, vendor decisions, credit exceptions" },
  { name:"Manufacturing",      href:"/solutions/manufacturing",      desc:"Supplier onboarding, MRO spend, urgent procurement" },
  { name:"Insurance",          href:"/solutions/insurance",          desc:"Claims and policy exceptions with full evidence" },
  { name:"Construction",       href:"/solutions/construction",       desc:"Variation orders, subcontractor payments, BOQ" },
  { name:"Retail",             href:"/solutions/retail",             desc:"Price, promotions, and vendor operations" },
];

const METRICS = [
  { val:"3×",   label:"Faster Decisions",    desc:"Avg. across all enterprise workflows" },
  { val:"100%", label:"Audit Coverage",      desc:"Every action logged and traceable" },
  { val:"65%",  label:"Cycle Time Cut",      desc:"In procurement and approval workflows" },
  { val:"$2M+", label:"Leakage Prevented",   desc:"Per year, per enterprise deployment" },
];

const HOW_STEPS = [
  { n:"01", t:"Connect",    b:"Link your CRM, ERP, email, docs and calendars in minutes. 200+ connectors. No migration required." },
  { n:"02", t:"Understand", b:"ZUUZ maps your data, permissions, and existing workflows. It learns how your teams actually operate." },
  { n:"03", t:"Automate",   b:"Copilots handle complete tasks end-to-end. Flows run multi-step processes. Humans approve what matters." },
  { n:"04", t:"Prove",      b:"Every action is logged with full evidence. Audit trails, compliance reports, and measurable time savings." },
];

type WS = "done"|"active"|"pending";
interface Step { id:number; name:string; sub:string; status:WS; }
const INIT_STEPS:Step[] = [
  { id:1, name:"Request validated",       sub:"Evidence Search · Budget verified",  status:"done"    },
  { id:2, name:"Context Pack assembled",  sub:"Prior contracts · Vendor scorecard", status:"done"    },
  { id:3, name:"Routing to CFO approval", sub:"Above $25k threshold · Tier 2",      status:"active"  },
  { id:4, name:"Safe write-back to SAP",  sub:"PO generation · Audit log",          status:"pending" },
];

/* ─────────────────────────────────────────────────────
   MICRO COMPONENTS
───────────────────────────────────────────────────── */
function Pip() {
  return (
    <span style={{ position:"relative", display:"inline-flex", width:8, height:8 }}>
      <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:"#10b981", opacity:.7, animation:"z-ping 1.6s ease-in-out infinite" }}/>
      <span style={{ position:"relative", display:"inline-flex", borderRadius:"50%", width:8, height:8, background:"#10b981" }}/>
    </span>
  );
}

function ChkIcon({ color="#10b981" }: { color?:string }) {
  return (
    <span style={{ flexShrink:0, display:"inline-flex", width:16, height:16, borderRadius:4, background:`${color}18`, alignItems:"center", justifyContent:"center" }}>
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </span>
  );
}

function Dots3({ color="#2457FF" }: { color?:string }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:3 }}>
      {[0,1,2].map(i => (
        <span key={i} style={{ width:4, height:4, borderRadius:"50%", background:color, animation:`z-blink 1.1s ${i*0.28}s ease-in-out infinite` }}/>
      ))}
    </span>
  );
}

function StepBadge({ s }: { s:WS }) {
  const styles: Record<WS, React.CSSProperties> = {
    done:    { background:"#d1fae5", color:"#065f46", border:"1px solid #a7f3d0" },
    active:  { background:"#dbeafe", color:"#1e40af", border:"1px solid #bfdbfe" },
    pending: { background:"#f1f5f9", color:"#94a3b8", border:`1px solid ${T.border}` },
  };
  return (
    <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:4, whiteSpace:"nowrap", display:"inline-flex", alignItems:"center", gap:4, ...styles[s] }}>
      {s === "active" ? <Dots3 color="#1e40af"/> : s === "done" ? "Done" : "Pending"}
    </span>
  );
}

/* ─────────────────────────────────────────────────────
   HERO FLOW DIAGRAM  (SVG + animateMotion)
───────────────────────────────────────────────────── */
function HeroFlowDiagram() {
  const sources = [
    {label:"Email",  x:60,  y:40,  color:"#0078D4" },
    {label:"CRM",    x:160, y:20,  color:"#00A1E0" },
    {label:"ERP",    x:260, y:40,  color:"#C74634" },
    {label:"Docs",   x:360, y:20,  color:"#0052CC" },
    {label:"ITSM",   x:460, y:40,  color:"#62D84E" },
  ];
  const outputs = [
    {label:"AI Agents",      x:60,  y:280, color:"#2457FF" },
    {label:"Unified Search", x:175, y:300, color:"#3B82F6" },
    {label:"Workflows",      x:300, y:280, color:"#6366f1" },
    {label:"Safe Write-back",x:420, y:300, color:"#10b981" },
  ];
  const coreX = 260, coreY = 160;

  return (
    <div style={{ width:"100%", maxWidth:560, margin:"0 auto" }}>
      <svg viewBox="0 0 540 340" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", overflow:"visible" }}>
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2457FF" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#2457FF" stopOpacity="0"/>
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        {/* Source → Core lines */}
        {sources.map((s,i) => (
          <g key={`si-${i}`}>
            <line x1={s.x+30} y1={s.y+16} x2={coreX} y2={coreY}
              stroke={`${s.color}40`} strokeWidth="1.2" strokeDasharray="4 4"/>
            <circle r="5" fill={s.color} opacity="0.9">
              <animateMotion dur={`${2.2+i*0.35}s`} begin={`${i*0.4}s`} repeatCount="indefinite"
                path={`M ${s.x+30},${s.y+16} L ${coreX},${coreY}`}/>
            </circle>
          </g>
        ))}

        {/* Core → Output lines */}
        {outputs.map((o,i) => (
          <g key={`oi-${i}`}>
            <line x1={coreX} y1={coreY+28} x2={o.x+55} y2={o.y+14}
              stroke={`${o.color}50`} strokeWidth="1.2" strokeDasharray="4 4"/>
            <circle r="5" fill={o.color} opacity="0.9">
              <animateMotion dur={`${2.4+i*0.3}s`} begin={`${0.8+i*0.45}s`} repeatCount="indefinite"
                path={`M ${coreX},${coreY+28} L ${o.x+55},${o.y+14}`}/>
            </circle>
          </g>
        ))}

        {/* Core glow */}
        <circle cx={coreX} cy={coreY} r={44} fill="url(#coreGlow)"/>
        <circle cx={coreX} cy={coreY} r={44} fill="none" stroke="#2457FF" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="44;50;44" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.3;0.12;0.3" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx={coreX} cy={coreY} r={34} fill="#0F1B3D" stroke="#2457FF" strokeWidth="1.5" filter="url(#glow)"/>
        <text x={coreX} y={coreY-6} textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff" fontFamily="Manrope, Inter, sans-serif">ZUUZ</text>
        <text x={coreX} y={coreY+9} textAnchor="middle" fontSize="7.5" fill="#60A5FA" fontFamily="Inter, sans-serif" letterSpacing="0.08em">EXECUTION</text>

        {/* Source chips */}
        {sources.map((s,i) => (
          <g key={`sc-${i}`}>
            <rect x={s.x} y={s.y} width={60} height={28} rx={8}
              fill="#fff" stroke={T.border} strokeWidth="1"/>
            <rect x={s.x} y={s.y} width={5} height={28} rx={8} fill={s.color} opacity="0.8"/>
            <text x={s.x+14} y={s.y+18} fontSize="10.5" fontWeight="600" fill={T.ink} fontFamily="Inter, sans-serif">{s.label}</text>
          </g>
        ))}

        {/* Output chips */}
        {outputs.map((o,i) => (
          <g key={`oc-${i}`}>
            <rect x={o.x} y={o.y} width={110} height={28} rx={8}
              fill="#fff" stroke={o.color} strokeWidth="1" opacity="0.9"/>
            <text x={o.x+12} y={o.y+18} fontSize="10" fontWeight="700" fill={o.color} fontFamily="Inter, sans-serif">{o.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   LOGO CHIP
───────────────────────────────────────────────────── */
function LogoChip({ item }: { item:typeof LOGOS[0] }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 16px", background:T.white, border:`1px solid ${T.border}`, borderRadius:40, flexShrink:0, userSelect:"none" }}>
      <span style={{ width:22, height:22, borderRadius:6, background:item.color, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:800, color:"#fff", flexShrink:0, letterSpacing:"-0.01em" }}>{item.abbr.slice(0,2)}</span>
      <span style={{ fontSize:13, fontWeight:600, color:"#374151", whiteSpace:"nowrap" }}>{item.name}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   WORKFLOW CARD
───────────────────────────────────────────────────── */
function WorkflowCard() {
  const [steps, setSteps] = useState<Step[]>(INIT_STEPS);

  useEffect(() => {
    let i = 2;
    const t = setInterval(() => {
      i = i >= 3 ? 0 : i + 1;
      const cur = i;
      setSteps(INIT_STEPS.map((s,j) => ({ ...s, status: j < cur ? "done" : j === cur ? "active" : "pending" })));
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="z-card-shadow" style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:20, overflow:"hidden" }}>
      {/* Chrome */}
      <div style={{ display:"flex", alignItems:"center", gap:6, padding:"12px 16px", background:T.bg, borderBottom:`1px solid ${T.border}` }}>
        {["#FF5F57","#FEBC2E","#28C840"].map(c => <span key={c} style={{ width:10, height:10, borderRadius:"50%", background:c }}/>)}
        <span style={{ marginLeft:8, fontSize:11, color:T.muted, fontWeight:500 }}>ZUUZ Workspace · Procurement · REQ-2841</span>
      </div>

      <div style={{ padding:"18px 18px 0" }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
          <div>
            <p style={{ fontSize:10, fontWeight:800, letterSpacing:"0.09em", textTransform:"uppercase", color:T.muted, marginBottom:3 }}>Active Workflow</p>
            <p style={{ fontSize:14, fontWeight:800, color:T.ink }}>AWS Enterprise Renewal — $48,000</p>
            <p style={{ fontSize:11, color:T.muted, marginTop:2 }}>Acme Corp · Initiated by J. Martinez</p>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, color:"#059669", background:"#d1fae5", border:"1px solid #a7f3d0", padding:"4px 10px", borderRadius:20 }}>
            <Pip/> Live
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:14 }}>
          {steps.map(s => (
            <div key={s.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:12, border: s.status==="active" ? "1px solid #bfdbfe" : `1px solid ${T.border}`, background: s.status==="active" ? "#eff6ff" : T.white, transition:"all 0.45s ease" }}>
              <span style={{ fontSize:11, fontWeight:700, color:"#d1d5db", width:18, flexShrink:0 }}>0{s.id}</span>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontSize:13, fontWeight:700, color:T.ink }}>{s.name}</p>
                <p style={{ fontSize:11, color:T.muted, marginTop:2 }}>{s.sub}</p>
              </div>
              <StepBadge s={s.status}/>
            </div>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:6, marginBottom:14 }}>
          {[{v:"3×",l:"Faster"},{v:"100%",l:"Audited"},{v:"0",l:"Manual"},{v:"65%",l:"Cycle↓"}].map(m => (
            <div key={m.l} style={{ background:T.bg, borderRadius:10, padding:"10px 6px", textAlign:"center", border:`1px solid ${T.border}` }}>
              <p style={{ fontSize:18, fontWeight:900, color:T.ink, lineHeight:1 }}>{m.v}</p>
              <p style={{ fontSize:10, color:T.muted, marginTop:3, fontWeight:600 }}>{m.l}</p>
            </div>
          ))}
        </div>

        <div style={{ background:T.bg, borderRadius:12, padding:"12px 14px", border:`1px solid ${T.border}` }}>
          <p style={{ fontSize:10, fontWeight:800, letterSpacing:"0.09em", textTransform:"uppercase", color:T.muted, marginBottom:10 }}>Context Pack</p>
          {[
            {k:"Budget remaining Q1",    v:"$142,000",           c:"#059669" },
            {k:"Vendor SOC 2 status",    v:"Certified ✓",        c:"#059669" },
            {k:"Prior exceptions (12mo)",v:"2 approved",         c:T.ink     },
            {k:"Contract auto-renew",    v:"Jun 30 · 90d notice",c:"#b45309" },
          ].map(r => (
            <div key={r.k} style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
              <span style={{ fontSize:11, color:T.muted }}>{r.k}</span>
              <span style={{ fontSize:11, fontWeight:700, color:r.c }}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Logo strip */}
      <div style={{ borderTop:`1px solid ${T.border}`, overflow:"hidden", padding:"10px 0" }}>
        <div style={{ display:"flex", gap:8, animation:"z-marquee 22s linear infinite", width:"max-content" }}>
          {[...LOGOS,...LOGOS].map((l,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:5, padding:"4px 10px", background:T.white, border:`1px solid ${T.border}`, borderRadius:7, flexShrink:0 }}>
              <span style={{ width:16, height:16, borderRadius:4, background:l.color, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:7, fontWeight:800, color:"#fff" }}>{l.abbr.slice(0,2)}</span>
              <span style={{ fontSize:10, fontWeight:600, color:"#6b7280" }}>{l.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   HOW IT WORKS — interactive stepper
───────────────────────────────────────────────────── */
function HowSection() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p+1)%4), 3400);
    return () => clearInterval(t);
  }, []);

  const visuals = [
    <div key="c" style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", padding:8 }}>
      {["Salesforce","SAP","Slack","Oracle","Jira","Teams","Gmail","HubSpot","Zoom","NetSuite"].map(n => (
        <span key={n} style={{ fontSize:12, fontWeight:600, padding:"6px 14px", background:T.bg, border:`1px solid ${T.border}`, borderRadius:20, color:"#475569" }}>{n}</span>
      ))}
      <p style={{ width:"100%", textAlign:"center", fontSize:12, color:T.muted, marginTop:6 }}>200+ connectors · No migration · Live in minutes</p>
    </div>,
    <div key="u" style={{ display:"flex", flexDirection:"column", gap:8, padding:4 }}>
      {["Email threads → Action items","CRM activity → Risk signals","Documents → Key obligations","Meetings → Decisions & owners"].map((t,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:T.bg, border:`1px solid ${T.border}`, borderRadius:10 }}>
          <ChkIcon color={T.blue}/><span style={{ fontSize:13, color:"#374151", fontWeight:500 }}>{t}</span>
        </div>
      ))}
    </div>,
    <div key="a" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
      {["Email Agent","Document Agent","Meeting Agent","Search Agent"].map((a,i) => (
        <div key={i} style={{ padding:"14px 12px", borderRadius:12, border:"1px solid #dbeafe", background:"rgba(37,99,235,0.03)", textAlign:"center" }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:"#dbeafe", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 8px", fontSize:10, fontWeight:900, color:T.blue }}>AI</div>
          <p style={{ fontSize:12, fontWeight:700, color:T.ink }}>{a}</p>
        </div>
      ))}
      <p style={{ gridColumn:"1/-1", textAlign:"center", fontSize:11, color:T.muted, fontWeight:500 }}>Humans approve what matters</p>
    </div>,
    <div key="p" style={{ display:"flex", flexDirection:"column" }}>
      {[
        {l:"REQ-2841 approved",  u:"S. Chen · VP Finance",    t:"09:42:18 UTC"},
        {l:"SAP write-back",     u:"System · Identity verified",t:"09:42:21 UTC"},
        {l:"PO #4892 generated", u:"Automated",               t:"09:42:22 UTC"},
      ].map((e,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderBottom:i<2?`1px solid ${T.border}`:"none" }}>
          <ChkIcon color="#10b981"/>
          <div style={{ flex:1 }}>
            <p style={{ fontSize:13, fontWeight:700, color:T.ink }}>{e.l}</p>
            <p style={{ fontSize:10, color:T.muted }}>{e.u} · {e.t}</p>
          </div>
        </div>
      ))}
      <p style={{ textAlign:"center", fontSize:11, fontWeight:800, color:"#059669", marginTop:10 }}>100% audit coverage · Every action logged</p>
    </div>,
  ];

  return (
    <div className="z-how-grid">
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {HOW_STEPS.map((s,i) => (
          <button key={s.n} onClick={() => setActive(i)}
            style={{ textAlign:"left", display:"flex", gap:16, padding:"16px 20px", borderRadius:16,
              border: active===i ? `1px solid ${T.blue}40` : `1px solid ${T.border}`,
              background: active===i ? `${T.blue}06` : T.white,
              cursor:"pointer", transition:"all 0.2s ease",
              boxShadow: active===i ? `0 0 0 4px ${T.blue}0a` : "none",
              fontFamily:"inherit" }}>
            <span style={{ fontSize:11, fontWeight:900, letterSpacing:"0.08em", color:active===i?T.blue:"#d1d5db", flexShrink:0, paddingTop:2 }}>{s.n}</span>
            <div>
              <p style={{ fontSize:15, fontWeight:800, marginBottom:active===i?6:0, color:active===i?T.ink:T.muted, transition:"color 0.2s" }}>{s.t}</p>
              {active===i && <p style={{ fontSize:13, color:T.muted, lineHeight:1.65 }}>{s.b}</p>}
            </div>
          </button>
        ))}
      </div>
      <div style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:20, padding:28, minHeight:240, boxShadow:"0 8px 28px rgba(0,0,0,0.06)", display:"flex", alignItems:"center", justifyContent:"center" }}>
        {visuals[active]}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   METRICS COUNTER
───────────────────────────────────────────────────── */
function Metrics() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold:0.25 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:T.border, borderRadius:20, overflow:"hidden", border:`1px solid ${T.border}` }}>
      {METRICS.map((m,i) => (
        <div key={m.label} style={{ background:T.white, padding:"36px 24px", textAlign:"center", opacity:vis?1:0, transform:vis?"none":"translateY(18px)", transition:`opacity 0.65s ease ${i*110}ms, transform 0.65s ease ${i*110}ms` }}>
          <p style={{ fontSize:44, fontWeight:900, color:T.ink, lineHeight:1, letterSpacing:"-0.03em", marginBottom:8 }}>{m.val}</p>
          <p style={{ fontSize:15, fontWeight:800, color:"#374151", marginBottom:5 }}>{m.label}</p>
          <p style={{ fontSize:12, color:T.muted }}>{m.desc}</p>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   AMBIENT BACKGROUND BLOBS
───────────────────────────────────────────────────── */
function AmbientBg() {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:-1, overflow:"hidden", pointerEvents:"none" }} aria-hidden>
      <div style={{ position:"absolute", width:680, height:680, borderRadius:"50%", top:-220, right:-120, background:`radial-gradient(circle, ${T.blue}0b 0%, transparent 70%)`, filter:"blur(60px)", animation:"z-orb1 24s ease-in-out infinite" }}/>
      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", bottom:-80, left:-60, background:"radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)", filter:"blur(60px)", animation:"z-orb2 30s ease-in-out infinite" }}/>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   REVEAL HOOK
───────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("zv"); }),
      { threshold:0.07, rootMargin:"0px 0px -36px 0px" }
    );
    document.querySelectorAll(".zr,.zr2").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────── */
export default function HomePage() {
  useReveal();
  const [mob, setMob] = useState(false);

  return (
    <>
      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');

        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
        body{font-family:'Inter',system-ui,sans-serif;background:#fff;color:#0B1324;overflow-x:hidden;line-height:1.6}

        /* keyframes */
        @keyframes z-ping{0%{transform:scale(1);opacity:.8}100%{transform:scale(2.6);opacity:0}}
        @keyframes z-blink{0%,100%{opacity:.2}50%{opacity:1}}
        @keyframes z-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes z-marquee-r{from{transform:translateX(-50%)}to{transform:translateX(0)}}
        @keyframes z-orb1{0%,100%{transform:translate(0,0) scale(1)}45%{transform:translate(55px,-45px) scale(1.06)}75%{transform:translate(-25px,25px) scale(.97)}}
        @keyframes z-orb2{0%,100%{transform:translate(0,0)}40%{transform:translate(-55px,40px)}70%{transform:translate(28px,-22px)}}
        @keyframes z-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes z-fadein{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}

        /* reveal */
        .zr{opacity:0;transform:translateY(22px);transition:opacity 0.65s ease,transform 0.65s ease}
        .zr2{opacity:0;transform:translateX(26px);transition:opacity 0.65s ease,transform 0.65s ease}
        .zr.zv,.zr2.zv{opacity:1;transform:none}
        .zd1{transition-delay:70ms}.zd2{transition-delay:140ms}.zd3{transition-delay:210ms}
        .zd4{transition-delay:280ms}.zd5{transition-delay:350ms}.zd6{transition-delay:420ms}
        .zd7{transition-delay:490ms}.zd8{transition-delay:560ms}

        /* typography */
        h1,h2,h3,h4{font-family:'Manrope',sans-serif;letter-spacing:-0.025em;line-height:1.1}
        h1{font-size:clamp(40px,5.5vw,70px);font-weight:900}
        h2{font-size:clamp(28px,4vw,46px);font-weight:800}
        h3{font-size:clamp(18px,2.4vw,26px);font-weight:800}
        p{font-family:'Inter',sans-serif}

        /* dot grid bg */
        .z-dot{background-image:radial-gradient(circle,rgba(0,0,0,0.055) 1px,transparent 1px);background-size:26px 26px}
        .z-card-shadow{box-shadow:0 20px 60px rgba(0,0,0,0.09),0 4px 16px rgba(0,0,0,0.05)}

        /* button system — one source of truth */
        .zbtn-primary{
          display:inline-flex;align-items:center;justify-content:center;gap:7px;
          padding:13px 28px;background:#2457FF;color:#fff;border:none;
          border-radius:12px;font-size:15px;font-weight:700;font-family:'Inter',sans-serif;
          cursor:pointer;text-decoration:none;line-height:1;letter-spacing:-0.01em;
          transition:background 0.16s ease,transform 0.16s ease,box-shadow 0.16s ease;
          white-space:nowrap
        }
        .zbtn-primary:hover{background:#1a44e8;transform:translateY(-1px);box-shadow:0 8px 24px rgba(36,87,255,0.32)}
        .zbtn-primary:active{transform:translateY(0);box-shadow:none}
        .zbtn-primary:focus-visible{outline:2px solid #60A5FA;outline-offset:2px}

        .zbtn-secondary{
          display:inline-flex;align-items:center;justify-content:center;gap:7px;
          padding:13px 26px;background:#fff;color:#0B1324;
          border:1.5px solid #DCE3F1;border-radius:12px;font-size:15px;font-weight:700;
          font-family:'Inter',sans-serif;cursor:pointer;text-decoration:none;line-height:1;
          letter-spacing:-0.01em;transition:all 0.16s ease;white-space:nowrap
        }
        .zbtn-secondary:hover{border-color:#94a3b8;background:#F8FAFC;transform:translateY(-1px)}
        .zbtn-secondary:focus-visible{outline:2px solid #60A5FA;outline-offset:2px}

        .zbtn-ghost{
          display:inline-flex;align-items:center;justify-content:center;gap:6px;
          padding:8px 16px;background:transparent;color:#64748B;
          border:1.5px solid #DCE3F1;border-radius:10px;font-size:13px;font-weight:700;
          font-family:'Inter',sans-serif;cursor:pointer;text-decoration:none;line-height:1;
          transition:all 0.15s ease;white-space:nowrap
        }
        .zbtn-ghost:hover{border-color:#94a3b8;color:#0B1324;background:#F8FAFC}

        .zbtn-nav{
          display:inline-flex;align-items:center;justify-content:center;gap:6px;
          padding:8px 18px;background:#2457FF;color:#fff;border:none;
          border-radius:10px;font-size:13px;font-weight:700;font-family:'Inter',sans-serif;
          cursor:pointer;text-decoration:none;line-height:1;
          transition:background 0.15s ease,box-shadow 0.15s ease;white-space:nowrap
        }
        .zbtn-nav:hover{background:#1a44e8;box-shadow:0 4px 12px rgba(36,87,255,0.28)}

        /* nav links */
        .znl{font-size:13px;font-family:'Inter',sans-serif;color:#4b5563;font-weight:600;text-decoration:none;transition:color 0.15s ease;padding:4px 0}
        .znl:hover{color:#2457FF}

        /* card lift */
        .zcard{transition:transform 0.2s ease,box-shadow 0.2s ease,border-color 0.2s ease}
        .zcard:hover{transform:translateY(-3px);box-shadow:0 14px 40px rgba(0,0,0,0.09) !important;border-color:#b0bcd4 !important}

        /* how-section grid */
        .z-how-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start}

        /* section layout */
        .zsec{padding:80px 0}
        .zsec-alt{padding:80px 0;background:#F8FAFC}
        .zsec-dark{padding:80px 0;background:#081225}
        .zwrap{max-width:1200px;margin:0 auto;padding:0 24px}

        /* eyebrow */
        .zeyebrow{font-size:12px;font-family:'Inter',sans-serif;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#2457FF;margin-bottom:14px}

        /* section center */
        .zsec-head{text-align:center;margin-bottom:52px}

        /* responsive */
        @media(max-width:900px){
          .z-hero-grid{grid-template-columns:1fr !important}
          .z-how-grid{grid-template-columns:1fr !important}
          .z-3col{grid-template-columns:1fr !important}
          .z-4col{grid-template-columns:1fr 1fr !important}
          .z-agents{grid-template-columns:1fr 1fr !important}
          .z-metrics{grid-template-columns:1fr 1fr !important}
          .z-nav-links,.z-nav-ctas{display:none !important}
          .z-mob-btn{display:flex !important}
          .z-trust6{grid-template-columns:repeat(3,1fr) !important}
        }
        @media(max-width:520px){
          .z-agents{grid-template-columns:1fr !important}
          .z-4col{grid-template-columns:1fr !important}
          .z-metrics{grid-template-columns:1fr !important}
          .z-trust6{grid-template-columns:repeat(2,1fr) !important}
        }

        /* scrollbar */
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.12);border-radius:3px}
        ::selection{background:rgba(36,87,255,0.14)}
      `}</style>

      <AmbientBg/>

      {/* ══════════ NAV ══════════ */}
      <header style={{ position:"sticky", top:0, zIndex:50, background:"rgba(255,255,255,0.93)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", borderBottom:"1px solid #f1f5f9" }}>
        <div className="zwrap" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:66 }}>
          <Link href="/" style={{ display:"flex", alignItems:"center", textDecoration:"none", flexShrink:0 }}>
            <Image src="/brand/zuuz-logo.png" alt="ZUUZ" width={90} height={28} priority/>
          </Link>

          <nav className="z-nav-links" style={{ display:"flex", alignItems:"center", gap:30 }}>
            {NAV_LINKS.map(([l,h]) => <Link key={l} href={h} className="znl">{l}</Link>)}
          </nav>

          <div className="z-nav-ctas" style={{ display:"flex", alignItems:"center", gap:8 }}>
            <Link href="/about/contact" className="zbtn-ghost">Sign in</Link>
            <Link href="/about/contact" className="zbtn-nav">Request demo →</Link>
          </div>

          <button className="z-mob-btn" onClick={() => setMob(o=>!o)}
            style={{ display:"none", padding:8, background:"none", border:"none", cursor:"pointer", flexShrink:0 }} aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="#374151" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {mob && (
          <div style={{ background:"#fff", borderTop:"1px solid #f1f5f9", padding:"16px 24px", display:"flex", flexDirection:"column", gap:16 }}>
            {NAV_LINKS.map(([l,h]) => (
              <Link key={l} href={h} onClick={() => setMob(false)}
                style={{ fontSize:15, fontWeight:700, color:"#374151", fontFamily:"Inter,sans-serif", textDecoration:"none" }}>{l}</Link>
            ))}
            <Link href="/about/contact" className="zbtn-primary" style={{ textAlign:"center", marginTop:4 }}>Request demo →</Link>
          </div>
        )}
      </header>

      {/* ══════════ HERO ══════════ */}
      <section style={{ position:"relative", overflow:"hidden", paddingBottom:0 }}>
        <div className="z-dot" style={{ position:"absolute", inset:0, opacity:0.55 }}/>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 85% 55% at 50% -8%, transparent 42%, #fff 100%)" }}/>

        <div className="zwrap" style={{ position:"relative", zIndex:2 }}>
          <div className="z-hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"48px 60px", alignItems:"center", paddingTop:76, paddingBottom:0 }}>

            {/* Left */}
            <div>
              <div className="zr" style={{ display:"inline-flex", alignItems:"center", gap:8, border:"1px solid #e2e8f0", borderRadius:40, padding:"6px 14px", marginBottom:24, background:"rgba(255,255,255,0.85)" }}>
                <Pip/>
                <span style={{ fontSize:11, fontFamily:"Inter,sans-serif", fontWeight:800, letterSpacing:"0.07em", textTransform:"uppercase", color:"#475569" }}>
                  The Agentic AI Execution Layer for Enterprise
                </span>
              </div>

              <h1 className="zr zd1" style={{ marginBottom:22, color:T.ink }}>
                Your enterprise<br/>runs on decisions.{" "}
                <span style={{ color:"#94a3b8", fontWeight:700 }}>ZUUZ ensures<br/>they execute.</span>
              </h1>

              <p className="zr zd2" style={{ fontSize:18, color:T.muted, lineHeight:1.75, maxWidth:490, marginBottom:38, fontFamily:"Inter,sans-serif" }}>
                Context assembled from email, docs, meetings, CRM and ERP. Decisions routed through policy. Actions written back — every step identity-verified, permission-checked, and audit-logged.
              </p>

              <div className="zr zd3" style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:38 }}>
                <Link href="/about/contact" className="zbtn-primary" style={{ fontSize:16, padding:"14px 32px" }}>Request a demo</Link>
                <Link href="/products/ai-agents" className="zbtn-secondary" style={{ fontSize:16, padding:"14px 28px" }}>See how it works →</Link>
              </div>

              <div className="zr zd4" style={{ display:"flex", flexWrap:"wrap", gap:"8px 20px" }}>
                {["SOC 2 Type I","SAML 2.0 / SSO","Identity-verified","200+ connectors","Immutable audit trail"].map(t => (
                  <div key={t} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:T.muted, fontWeight:600, fontFamily:"Inter,sans-serif" }}>
                    <ChkIcon/>{t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — card floats */}
            <div className="zr2 zd1" style={{ animation:"z-float 7s ease-in-out infinite" }}>
              <WorkflowCard/>
            </div>
          </div>

          {/* ── Flow diagram ── */}
          <div className="zr" style={{ paddingTop:60, paddingBottom:20 }}>
            <p style={{ textAlign:"center", fontSize:12, fontFamily:"Inter,sans-serif", fontWeight:800, letterSpacing:"0.09em", textTransform:"uppercase", color:T.muted, marginBottom:32 }}>
              From every signal to a safe, audited action
            </p>
            <HeroFlowDiagram/>
          </div>

          {/* ── Dual marquee ── */}
          <div style={{ borderTop:`1px solid #f1f5f9`, paddingTop:28, paddingBottom:28, position:"relative" }}>
            <p style={{ textAlign:"center", fontSize:11, fontFamily:"Inter,sans-serif", fontWeight:800, letterSpacing:"0.09em", textTransform:"uppercase", color:"#94a3b8", marginBottom:18 }}>
              Connects with the tools your teams already use
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:10, overflow:"hidden" }}>
              <div style={{ display:"flex", gap:10, animation:"z-marquee 28s linear infinite", width:"max-content" }}>
                {[...LOGOS,...LOGOS].map((l,i) => <LogoChip key={i} item={l}/>)}
              </div>
              <div style={{ display:"flex", gap:10, animation:"z-marquee-r 34s linear infinite", width:"max-content" }}>
                {[...LOGOS.slice(8),...LOGOS.slice(0,8),...LOGOS.slice(8),...LOGOS.slice(0,8)].map((l,i) => <LogoChip key={i} item={l}/>)}
              </div>
            </div>
            <div style={{ position:"absolute", top:0, left:0, bottom:0, width:90, background:"linear-gradient(to right,#fff,transparent)", pointerEvents:"none" }}/>
            <div style={{ position:"absolute", top:0, right:0, bottom:0, width:90, background:"linear-gradient(to left,#fff,transparent)", pointerEvents:"none" }}/>
          </div>
        </div>
      </section>

      {/* ══════════ THREE PILLARS ══════════ */}
      <section className="zsec" style={{ borderTop:"1px solid #f1f5f9" }}>
        <div className="zwrap">
          <div className="zr zsec-head">
            <p className="zeyebrow">Platform</p>
            <h2 style={{ marginBottom:16 }}>Three capabilities.<br/>One execution layer.</h2>
            <p style={{ fontSize:18, color:T.muted, maxWidth:480, margin:"0 auto", fontFamily:"Inter,sans-serif" }}>Copilots that act. Flows that enforce. Search that proves.</p>
          </div>
          <div className="z-3col" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {[
              { t:"Persona Copilots",  b:"Role-specific copilots for Sales, Procurement, HR, Legal, and Ops — designed to act, not just answer.", href:"/products/ai-agents",     acc:"#2457FF", bg:"#EFF6FF", ico:"👤" },
              { t:"Execution Flows",   b:"Import your existing CRM/ERP/ITSM processes and run them with policy gates, approvals, and audit trails.", href:"/products/workflows",    acc:"#7c3aed", bg:"#F5F3FF", ico:"⚡" },
              { t:"Evidence Search",   b:"One search across every tool — with citations and a ready-to-share context pack behind every decision.", href:"/products/unified-search", acc:"#059669", bg:"#ECFDF5", ico:"🔍" },
            ].map((c,i) => (
              <Link key={c.t} href={c.href} className={`zr zd${i+1} zcard`}
                style={{ display:"block", background:T.white, border:`1px solid ${T.border}`, borderRadius:20, padding:28, textDecoration:"none" }}>
                <div style={{ width:46, height:46, borderRadius:13, background:c.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:18 }}>{c.ico}</div>
                <h3 style={{ marginBottom:10, color:T.ink }}>{c.t}</h3>
                <p style={{ fontSize:14, color:T.muted, lineHeight:1.65, marginBottom:18, fontFamily:"Inter,sans-serif" }}>{c.b}</p>
                <span style={{ fontSize:13, fontWeight:800, color:c.acc, fontFamily:"Inter,sans-serif" }}>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ ARCHITECTURE (dark) ══════════ */}
      <section className="zsec-dark">
        <div className="zwrap">
          <div className="z-hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }}>
            <div>
              <p className="zr zeyebrow" style={{ color:"#60A5FA" }}>Architecture</p>
              <h2 className="zr zd1" style={{ color:"#F8FAFC", marginBottom:20 }}>
                Signal in.<br/>Decision out.<br/><span style={{ color:"#475569", fontWeight:700 }}>Audit logged.</span>
              </h2>
              <p className="zr zd2" style={{ fontSize:17, color:"#94a3b8", lineHeight:1.75, maxWidth:420, marginBottom:30, fontFamily:"Inter,sans-serif" }}>
                ZUUZ assembles full context from every connected system, routes through your policies, takes action — and writes back only when identity, permissions, and evidence are verified.
              </p>
              <div className="zr zd3" style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {["Permission-safe execution on every action","Identity verified before every system write-back","Evidence-backed on every single decision","Complete immutable audit trail by default"].map(t => (
                  <div key={t} style={{ display:"flex", alignItems:"center", gap:10, fontSize:14, color:"#cbd5e1", fontWeight:500, fontFamily:"Inter,sans-serif" }}>
                    <ChkIcon color="#10b981"/>{t}
                  </div>
                ))}
              </div>
            </div>
            <div className="zr2 zd1"><HeroFlowDiagram/></div>
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section className="zsec" style={{ borderTop:"1px solid #f1f5f9" }}>
        <div className="zwrap">
          <div className="zr zsec-head">
            <p className="zeyebrow">How it works</p>
            <h2 style={{ marginBottom:16 }}>Weeks, not quarters</h2>
            <p style={{ fontSize:18, color:T.muted, maxWidth:440, margin:"0 auto", fontFamily:"Inter,sans-serif" }}>From connected to autonomous in four steps. No rip-and-replace.</p>
          </div>
          <div className="zr"><HowSection/></div>
        </div>
      </section>

      {/* ══════════ METRICS ══════════ */}
      <section className="zsec-alt" style={{ borderTop:"1px solid #f1f5f9" }}>
        <div className="zwrap">
          <div className="zr zsec-head">
            <p className="zeyebrow">Results</p>
            <h2>Measurable ROI from day one</h2>
          </div>
          <div className="zr z-metrics" style={{ display:"contents" }}><Metrics/></div>
        </div>
      </section>

      {/* ══════════ AGENTS ══════════ */}
      <section className="zsec" style={{ borderTop:"1px solid #f1f5f9" }}>
        <div className="zwrap">
          <div className="zr" style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:44, flexWrap:"wrap", gap:16 }}>
            <div>
              <p className="zeyebrow">Persona Copilots</p>
              <h2 style={{ maxWidth:380 }}>An agent for every operational team</h2>
            </div>
            <Link href="/products/ai-agents" className="zbtn-secondary">Browse all agents →</Link>
          </div>
          <div className="z-agents" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
            {AGENTS.map((a,i) => (
              <Link key={a.title} href={a.href} className={`zr zd${(i%8)+1} zcard`}
                style={{ display:"block", background:T.white, border:`1px solid ${T.border}`, borderRadius:18, padding:22, textDecoration:"none" }}>
                <p style={{ fontSize:10, fontWeight:900, letterSpacing:"0.1em", textTransform:"uppercase", color:T.muted, marginBottom:12, fontFamily:"Inter,sans-serif" }}>{a.tag}</p>
                <h3 style={{ fontSize:15, marginBottom:8 }}>{a.title}</h3>
                <p style={{ fontSize:12, color:T.muted, lineHeight:1.65, marginBottom:16, fontFamily:"Inter,sans-serif" }}>{a.body}</p>
                <p style={{ fontSize:12, fontWeight:800, color:"#059669", fontFamily:"Inter,sans-serif" }}>{a.stat}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ INDUSTRIES ══════════ */}
      <section className="zsec-alt" style={{ borderTop:"1px solid #f1f5f9" }}>
        <div className="zwrap">
          <div className="zr zsec-head">
            <p className="zeyebrow">Solutions</p>
            <h2 style={{ marginBottom:16 }}>Purpose-built for your industry</h2>
            <p style={{ fontSize:18, color:T.muted, maxWidth:460, margin:"0 auto", fontFamily:"Inter,sans-serif" }}>Same platform. Tailored use cases, context packs, and agent configurations for your sector.</p>
          </div>
          <div className="z-4col" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
            {INDUSTRIES.map((ind,i) => (
              <Link key={ind.name} href={ind.href} className={`zr zd${(i%8)+1} zcard`}
                style={{ display:"flex", flexDirection:"column", gap:6, padding:"20px 18px", border:`1px solid ${T.border}`, background:T.white, borderRadius:16, textDecoration:"none" }}>
                <span style={{ fontSize:14, fontWeight:800, color:T.ink, fontFamily:"Manrope,sans-serif" }}>{ind.name}</span>
                <span style={{ fontSize:12, color:T.muted, lineHeight:1.5, fontFamily:"Inter,sans-serif" }}>{ind.desc}</span>
                <span style={{ fontSize:12, fontWeight:800, color:T.blue, marginTop:6, fontFamily:"Inter,sans-serif" }}>Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TRUST / SECURITY ══════════ */}
      <section className="zsec" style={{ borderTop:"1px solid #f1f5f9" }}>
        <div className="zwrap">
          <div className="zr zsec-head">
            <p className="zeyebrow">Security & Trust</p>
            <h2 style={{ marginBottom:16 }}>Permission-aware by design</h2>
            <p style={{ fontSize:18, color:T.muted, maxWidth:460, margin:"0 auto", fontFamily:"Inter,sans-serif" }}>Every action verified. Every decision logged. Built for enterprise security review.</p>
          </div>
          <div className="z-trust6" style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:10 }}>
            {["SOC 2 Type I","SAML 2.0 / SSO","Role-based access","Audit trail","Evidence links","On-prem option"].map((item,i) => (
              <div key={item} className={`zr zd${i+1}`}
                style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", padding:"22px 12px", background:T.white, border:`1px solid ${T.border}`, borderRadius:16 }}>
                <div style={{ width:42, height:42, borderRadius:12, background:"rgba(16,185,129,0.09)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <p style={{ fontSize:12, fontWeight:800, color:"#374151", lineHeight:1.4, fontFamily:"Inter,sans-serif" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA BANNER ══════════ */}
      <section className="zsec" style={{ borderTop:"1px solid #f1f5f9" }}>
        <div className="zwrap">
          <div className="zr" style={{ position:"relative", overflow:"hidden", background:T.dark, borderRadius:28, padding:"64px 56px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:40, flexWrap:"wrap" }}>
            {/* bg grid */}
            <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"40px 40px", pointerEvents:"none" }}/>
            {/* blue glow */}
            <div style={{ position:"absolute", top:-80, right:-80, width:320, height:320, borderRadius:"50%", background:`radial-gradient(circle, ${T.blue}25 0%, transparent 70%)`, filter:"blur(40px)", pointerEvents:"none" }}/>
            <div style={{ position:"absolute", bottom:-60, left:-60, width:240, height:240, borderRadius:"50%", background:"radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)", filter:"blur(40px)", pointerEvents:"none" }}/>

            <div style={{ position:"relative", zIndex:1 }}>
              <h2 style={{ color:"#F8FAFC", marginBottom:16, maxWidth:500 }}>
                Bring your workflows.<br/>
                <span style={{ color:"#475569", fontWeight:700 }}>We&apos;ll make them run themselves.</span>
              </h2>
              <p style={{ fontSize:17, color:"#94a3b8", maxWidth:440, lineHeight:1.7, fontFamily:"Inter,sans-serif" }}>
                No migration. No six-month implementation. Connect, automate, and prove — in weeks, not quarters.
              </p>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:12, flexShrink:0, position:"relative", zIndex:1 }}>
              <Link href="/about/contact" className="zbtn-primary" style={{ fontSize:16, padding:"15px 32px", boxShadow:"0 6px 20px rgba(36,87,255,0.35)" }}>
                Request a demo →
              </Link>
              <Link href="/products/ai-agents" style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", padding:"14px 28px", background:"transparent", color:"#94a3b8", border:"1.5px solid rgba(255,255,255,0.1)", borderRadius:12, fontSize:14, fontWeight:700, fontFamily:"Inter,sans-serif", textDecoration:"none", transition:"all 0.16s ease", whiteSpace:"nowrap" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.borderColor="rgba(255,255,255,0.25)";(e.currentTarget as HTMLAnchorElement).style.color="#e2e8f0"}}
                onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.borderColor="rgba(255,255,255,0.1)";(e.currentTarget as HTMLAnchorElement).style.color="#94a3b8"}}>
                See Persona Copilots
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{ borderTop:`1px solid ${T.border}`, background:T.white }}>
        <div className="zwrap" style={{ paddingTop:56, paddingBottom:40 }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr", gap:40, marginBottom:48, flexWrap:"wrap" }}>
            <div>
              <Image src="/brand/zuuz-logo.png" alt="ZUUZ" width={84} height={26} style={{ marginBottom:18 }}/>
              <p style={{ fontSize:14, color:T.muted, lineHeight:1.75, maxWidth:210, marginBottom:22, fontFamily:"Inter,sans-serif" }}>
                The Agentic AI execution layer for enterprise. Decision. Execution. AI Workspace.
              </p>
              <div style={{ display:"flex", gap:8 }}>
                {[["LinkedIn","https://linkedin.com/company/zuuz-ai"],["Twitter","https://twitter.com/zuuz_ai"]].map(([l,h]) => (
                  <a key={l} href={h} target="_blank" rel="noopener noreferrer" className="zbtn-ghost" style={{ fontSize:12, padding:"6px 14px" }}>{l}</a>
                ))}
              </div>
            </div>
            {[
              { head:"Products", links:[["Persona Copilots","/products/ai-agents"],["Execution Flows","/products/workflows"],["Evidence Search","/products/unified-search"]] },
              { head:"Solutions",links:[["IT Services","/solutions/it-services"],["Financial Services","/solutions/financial-services"],["Healthcare","/solutions/healthcare"],["Distribution","/solutions/distribution"],["Manufacturing","/solutions/manufacturing"]] },
              { head:"Company",  links:[["Our Story","/about/our-story"],["Careers","/about/careers"],["Trust & Security","/about/trust-security"],["Contact","/about/contact"],["Customers","/customers"]] },
              { head:"Resources",links:[["Resource Hub","/resources"],["Blog","/resources/blog/agentic-ai-explained"],["Industry Guides","/resources/manuals/industries"],["Agentic AI Explained","/resources/blog/agentic-ai-explained"]] },
            ].map(col => (
              <div key={col.head}>
                <p style={{ fontSize:10, fontWeight:900, letterSpacing:"0.1em", textTransform:"uppercase", color:"#94a3b8", marginBottom:18, fontFamily:"Inter,sans-serif" }}>{col.head}</p>
                <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
                  {col.links.map(([l,h]) => (
                    <Link key={l} href={h} style={{ fontSize:13, color:T.muted, textDecoration:"none", fontWeight:500, fontFamily:"Inter,sans-serif", transition:"color 0.15s" }}
                      onMouseEnter={e=>(e.currentTarget.style.color=T.blue)} onMouseLeave={e=>(e.currentTarget.style.color=T.muted)}>{l}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:24, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
            <p style={{ fontSize:12, color:"#94a3b8", fontFamily:"Inter,sans-serif" }}>© 2026 ZUUZ, Inc. All rights reserved. · 440N Wolfe Rd, Sunnyvale, CA 94085</p>
            <div style={{ display:"flex", gap:22 }}>
              {[["Privacy Policy","/privacy"],["Terms","/terms"],["Cookies","/cookies"]].map(([l,h]) => (
                <Link key={l} href={h} style={{ fontSize:12, color:"#94a3b8", textDecoration:"none", fontWeight:500, fontFamily:"Inter,sans-serif" }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
