"use client";
import Link from "next/link";
const B = "#0018FF";
const F = "'Montserrat',sans-serif";
const CUSTOMERS = [
  {name:"Western International Group",logo:"/logos/western-international.png",industry:"Distribution & Trading",region:"UAE",stat:"70%",statLabel:"faster procurement cycles",systems:"SAP + M365"},
  {name:"Nesto Group",logo:"/logos/nesto-group.png",industry:"Retail & Distribution",region:"UAE",stat:"100%",statLabel:"approval compliance coverage",systems:"SAP + M365"},
  {name:"RA Technologies LLC",logo:"/logos/ra-technologies.png",industry:"IT Services",region:"USA",stat:"4–6 hrs",statLabel:"saved per sales rep weekly",systems:"Zoho + M365"},
  {name:"Cloud Box Technologies",logo:"/logos/cloud-box.png",industry:"IT Services & Cloud",region:"UAE",stat:"60%",statLabel:"reduction in contract review time",systems:"Zoho + M365"},
];
export default function CustomersPage() {
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
      {/* TESTIMONIALS */}
      <section style={{padding:"72px 0",background:"#fff"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <p style={{fontSize:11,fontWeight:700,letterSpacing:"0.11em",textTransform:"uppercase",color:"#0018FF",fontFamily:"'Montserrat',sans-serif",marginBottom:14}}>What Our Customers Say</p>
            <h2 style={{fontFamily:"'Montserrat',sans-serif",marginBottom:14}}>Real outcomes. Real teams.</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:24}}>
            {[
              {
                quote:"Before ZUUZ, our procurement team was collecting supplier quotes manually and routing everything through email. Approvals happened informally — someone would log into SAP with different IDs just to generate a purchase order. Now every user logs into ZUUZ, sees the full context — multiple vendor codes, pricing, payment terms, quality history, budget alignment — and makes the right decision. Finance has complete visibility, every approval is logged, and SAP is updated automatically. We finally have a system that tells us why we chose a supplier, not just that we did.",
                name:"Finance Manager",
                company:"Nesto Group",
                industry:"Retail & Distribution · UAE",
                logo:"/logos/nesto-group.png",
              },
              {
                quote:"Our sales approval process used to take three to five days. The salesperson closes the deal, uploads to CRM, then accounts checks Zoho Books, tracks everything in Excel, then sales director calls around to check for pending projects or support cases, then it goes to the CEO. Now when anyone logs into ZUUZ, all that context is already assembled — open projects, pending cases, financial history, contract details. Accounts approves in minutes. Sales director sees everything without calling anyone. CEO sees exactly who approved what and why. The same process now completes in two to four hours.",
                name:"CEO",
                company:"Cloud Box Technologies LLC",
                industry:"IT Services & Cloud · UAE",
                logo:"/logos/cloud-box.png",
              },
              {
                quote:"We had the same challenge — approvals living in email, data dumped into the CRM just to have a record. Nobody had real context when they needed to make a decision. ZUUZ changed that. Every approval now starts with a full picture, and every decision is logged with the evidence behind it. Our team moves faster and our records are finally trustworthy.",
                name:"COO",
                company:"RA Technologies LLC",
                industry:"Cybersecurity & IT Services · USA",
                logo:"/logos/ra-technologies.png",
              },
              {
                quote:"Vendor onboarding used to be a slow, manual chain — our vendor specialist collected documents, emailed them to finance and compliance, waited for replies, then manually uploaded everything to SAP. With ZUUZ, when the email arrives, the documents are verified automatically, ZUUZ generates a recommendation using unified search, and the specialist sends a structured briefing to both compliance and finance in one action. Once they approve, it goes into the system with full audit trail. What used to take days now happens in hours. Our VP of Sales is particularly happy — faster vendor onboarding means faster deals.",
                name:"VP of Sales",
                company:"Western International Group",
                industry:"Distribution & Trading · UAE",
                logo:"/logos/western-international.png",
              },
            ].map(t=>(
              <div key={t.company} style={{background:"#F5F6FF",borderRadius:20,padding:"36px 32px",display:"flex",flexDirection:"column",justifyContent:"space-between",gap:24,border:"1px solid #E0E4F0"}}>
                <div>
                  <svg width="36" height="28" viewBox="0 0 36 28" fill="none" style={{marginBottom:20,flexShrink:0}}>
                    <path d="M0 28V16.8C0 12.32 1.12 8.49 3.36 5.32 5.65 2.15 9.05 0.28 13.44 0L15.12 3.08C11.76 3.83 9.24 5.32 7.56 7.56 5.97 9.71 5.23 12.04 5.32 14.56H11.2V28H0ZM20.88 28V16.8C20.88 12.32 22 8.49 24.24 5.32 26.53 2.15 29.93 0.28 34.32 0L36 3.08C32.64 3.83 30.12 5.32 28.44 7.56 26.85 9.71 26.11 12.04 26.2 14.56H32.08V28H20.88Z" fill="#0018FF" opacity="0.12"/>
                  </svg>
                  <p style={{fontSize:15,lineHeight:1.85,color:"#1a1a2e",fontFamily:"'Montserrat',sans-serif",fontWeight:500}}>{t.quote}</p>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:16,paddingTop:20,borderTop:"1px solid #D8DCF0"}}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.logo} alt={t.company} style={{maxWidth:90,maxHeight:36,objectFit:"contain",flexShrink:0}} onError={e=>{(e.currentTarget as HTMLImageElement).style.display="none"}}/>
                  <div>
                    <p style={{fontSize:14,fontWeight:700,color:"#000",fontFamily:"'Montserrat',sans-serif",marginBottom:2}}>{t.name}, {t.company}</p>
                    <p style={{fontSize:12,color:"#666",fontFamily:"'Montserrat',sans-serif"}}>{t.industry}</p>
                  </div>
                </div>
              </div>
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
            <Link href="/about/contact" style={{display:"inline-flex",alignItems:"center",padding:"14px 32px",background:B,color:"#FFFFFF",borderRadius:10,fontSize:15,fontWeight:700,fontFamily:F,textDecoration:"none",flexShrink:0}}>Request a demo →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
