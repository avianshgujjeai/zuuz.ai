"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const B = "#0018FF";
const F = "'Montserrat',sans-serif";

const CUSTOMERS = [
  {name:"Western International Group",logo:"/logos/western-international.png",industry:"Distribution & Trading",region:"UAE",stat:"70%",statLabel:"faster procurement cycles",systems:"SAP + M365"},
  {name:"Nesto Group",logo:"/logos/nesto-group.png",industry:"Retail & Distribution",region:"UAE",stat:"100%",statLabel:"approval compliance coverage",systems:"SAP + M365"},
  {name:"RA Technologies LLC",logo:"/logos/ra-technologies.png",industry:"IT Services",region:"USA",stat:"4–6 hrs",statLabel:"saved per sales rep weekly",systems:"Zoho + M365"},
  {name:"Cloud Box Technologies",logo:"/logos/cloud-box.png",industry:"IT Services & Cloud",region:"UAE",stat:"60%",statLabel:"reduction in contract review time",systems:"Zoho + M365"},
];

const TESTIMONIALS = [
  {
    company: "Nesto Group",
    logo: "/logos/nesto-group.png",
    industry: "Retail",
    useCase: "Procurement approvals",
    headline: "Procurement decisions with complete supplier context",
    quote: "ZUUZ helped us replace fragmented email-based procurement approvals with a structured workflow where teams can review supplier options, budget fit, payment terms, and decision history in one place — with audit-backed updates to systems of record.",
  },
  {
    company: "Cloud Box Technologies",
    logo: "/logos/cloud-box.png",
    industry: "IT Services",
    useCase: "Sales & contract approvals",
    headline: "Faster contract approvals with complete business visibility",
    quote: "ZUUZ gave every approver the full context behind each deal — from finance to customer history to project and support status — helping us reduce approval cycles from days to just a few hours.",
  },
  {
    company: "RA Technologies",
    logo: "/logos/ra-technologies.png",
    industry: "Cybersecurity / IT",
    useCase: "Internal business approvals",
    headline: "Structured approvals instead of manual email dependency",
    quote: "ZUUZ brought our approval process into a single governed system, replacing manual email-driven workflows with better visibility, faster decisions, and stronger control.",
  },
  {
    company: "Western International",
    logo: "/logos/western-international.png",
    industry: "Distribution & Retail",
    useCase: "Vendor onboarding",
    headline: "Smarter vendor onboarding with less manual work",
    quote: "ZUUZ streamlined our vendor onboarding by validating documents, organizing recommendations, and helping teams move from email-heavy coordination to faster and more controlled approvals.",
  },
];

function TestimonialCard({
  t,
  index,
  visible,
}: {
  t: (typeof TESTIMONIALS)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `1px solid ${hovered ? "#C7CFFF" : "#E5E7EB"}`,
        borderRadius: 16,
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        boxShadow: hovered
          ? "0 12px 40px rgba(0,24,255,0.07)"
          : "0 1px 4px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.25s ease, border-color 0.25s ease, transform 0.3s ease, opacity 0.4s ease",
        transform: visible ? (hovered ? "translateY(-4px)" : "translateY(0)") : "translateY(20px)",
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 90}ms` : "0ms",
        cursor: "default",
      }}
    >
      {/* Industry + Use Case tags */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
        <span style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B,background:"#EEF2FF",padding:"4px 10px",borderRadius:5,fontFamily:F}}>
          {t.industry}
        </span>
        <span style={{fontSize:10,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:"#666",background:"#F3F4F6",padding:"4px 10px",borderRadius:5,fontFamily:F}}>
          {t.useCase}
        </span>
      </div>
      {/* Headline */}
      <p style={{fontSize:16,fontWeight:700,color:"#0A0A14",lineHeight:1.45,fontFamily:F,marginBottom:14}}>
        {t.headline}
      </p>
      {/* Quote */}
      <p style={{fontSize:14,lineHeight:1.85,color:"#4B5563",fontFamily:F,fontStyle:"italic",flexGrow:1,marginBottom:24}}>
        &ldquo;{t.quote}&rdquo;
      </p>
      {/* Footer */}
      <div style={{borderTop:"1px solid #F0F1F5",paddingTop:20,display:"flex",alignItems:"center",gap:14}}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.logo}
          alt={t.company}
          style={{maxWidth:80,maxHeight:32,objectFit:"contain",flexShrink:0}}
          onError={e=>{(e.currentTarget as HTMLImageElement).style.display="none"}}
        />
        <span style={{fontSize:13,fontWeight:700,color:"#111",fontFamily:F}}>{t.company}</span>
      </div>
    </div>
  );
}

export default function CustomersPage() {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);

  useEffect(() => {
    const el = testimonialsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTestimonialsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main style={{fontFamily:F}}>
      {/* HERO */}
      <section style={{background:"linear-gradient(155deg,#EEF2FF 0%,#fff 60%)",padding:"88px 0 72px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
          <p style={{fontSize:11,fontWeight:700,letterSpacing:"0.11em",textTransform:"uppercase",color:B,fontFamily:F,marginBottom:16}}>Customers</p>
          <h1 style={{maxWidth:680,marginBottom:20,fontFamily:F}}>Enterprise teams running ZUUZ in production.</h1>
          <p style={{fontSize:18,lineHeight:1.75,color:"#333333",maxWidth:540,fontFamily:F}}>
            Deployed across UAE and USA — real operations teams using ZUUZ to unify their systems,
            automate approvals, and execute with a full audit trail.
          </p>
        </div>
      </section>

      {/* DEPLOYED AT */}
      <section style={{padding:"72px 0",background:"#fff"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
          <p style={{textAlign:"center",fontSize:11,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"#888888",fontFamily:F,marginBottom:40}}>Deployed at</p>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:20}}>
            {CUSTOMERS.map(c=>(
              <div key={c.name} style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,padding:"36px 32px",background:"white",border:"1px solid #E8E8EE",borderRadius:16,minWidth:220,minHeight:170,flex:"0 0 auto",boxShadow:"0 2px 12px rgba(0,0,0,0.05)"}}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.logo} alt={c.name}
                  style={{maxWidth:180,maxHeight:72,objectFit:"contain",display:"block"}}
                  onError={e=>{(e.currentTarget as HTMLImageElement).style.display="none"}}/>
                <p style={{fontSize:14,color:"#333333",textAlign:"center",fontFamily:F,lineHeight:1.4}}>{c.industry} · {c.region}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section style={{padding:"72px 0",background:"#F5F6FF"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <p style={{fontSize:11,fontWeight:700,letterSpacing:"0.11em",textTransform:"uppercase",color:B,fontFamily:F,marginBottom:14}}>Results</p>
            <h2 style={{marginBottom:14,fontFamily:F}}>Measurable outcomes, not promises.</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:20}}>
            {CUSTOMERS.map(c=>(
              <div key={c.name} style={{background:"white",borderRadius:16,padding:"28px 24px",border:"1px solid #E8E8EE"}}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.logo} alt={c.name} style={{maxWidth:120,maxHeight:40,objectFit:"contain",display:"block",marginBottom:20}}/>
                <p style={{fontSize:38,fontWeight:800,color:B,fontFamily:F,lineHeight:1,marginBottom:6,letterSpacing:"-0.02em"}}>{c.stat}</p>
                <p style={{fontSize:15,fontWeight:600,color:"#111111",fontFamily:F,marginBottom:8}}>{c.statLabel}</p>
                <p style={{fontSize:13,color:"#555555",fontFamily:F}}>{c.systems} · {c.industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER SUCCESS */}
      <section style={{padding:"88px 0",background:"#FAFAFA"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
          {/* Section header — left-aligned for enterprise feel */}
          <div style={{maxWidth:600,marginBottom:56}}>
            <p style={{fontSize:11,fontWeight:700,letterSpacing:"0.11em",textTransform:"uppercase",color:B,fontFamily:F,marginBottom:12}}>
              Customer Success
            </p>
            <h2 style={{fontFamily:F,marginBottom:16,color:"#0A0A14"}}>
              From manual workflows to faster, context-aware decisions.
            </h2>
            <p style={{fontSize:16,lineHeight:1.78,color:"#555",fontFamily:F}}>
              See how ZUUZ helps enterprises move from manual, email-driven approvals and fragmented
              workflows to faster, context-aware decisions with audit-backed execution.
            </p>
          </div>
          {/* Cards grid — auto-responsive: 2-col on desktop, 1-col on tablet/mobile */}
          <div
            ref={testimonialsRef}
            style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(380px,1fr))",gap:24}}
          >
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.company} t={t} index={i} visible={testimonialsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* DARK CTA */}
      <section style={{padding:"72px 0 80px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
          <div style={{background:"#000814",borderRadius:24,padding:"64px 56px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:32}}>
            <div>
              <h2 style={{color:"#FFFFFF",marginBottom:12,maxWidth:420,fontFamily:F}}>Ready to join them?</h2>
              <p style={{fontSize:16,color:"rgba(255,255,255,0.85)",fontFamily:F,maxWidth:380,lineHeight:1.75}}>
                See ZUUZ running on your own workflows — not a canned demo.
              </p>
            </div>
            <Link href="https://cal.com/avinashgujje/30min" style={{display:"inline-flex",alignItems:"center",padding:"14px 32px",background:B,color:"#FFFFFF",borderRadius:10,fontSize:15,fontWeight:700,fontFamily:F,textDecoration:"none",flexShrink:0}}>Book a Demo →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
