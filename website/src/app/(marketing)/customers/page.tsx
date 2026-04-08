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
            <p style={{fontSize:11,fontWeight:700,letterSpacing:"0.11em",textTransform:"uppercase",color:B,fontFamily:F,marginBottom:14}}>What Customers Say</p>
            <h2 style={{fontFamily:F}}>In their own words.</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:24}}>
            <div style={{background:"#F8F9FF",border:"1px solid #E0E4F8",borderRadius:16,padding:"36px 32px"}}>
              <p style={{fontSize:17,lineHeight:1.75,color:"#111111",fontFamily:F,marginBottom:28}}>&ldquo;ZUUZ cut our contract review cycle by 60%. What used to take days of back-and-forth across email threads now routes, gets approved, and closes inside the same afternoon. The audit trail alone made our compliance team stop asking for manual reports.&rdquo;</p>
              <div>
                <p style={{fontSize:14,fontWeight:700,color:"#111111",fontFamily:F,marginBottom:2}}>CEO, Cloud Box Technologies LLC</p>
                <p style={{fontSize:13,color:"#666666",fontFamily:F}}>IT Services &amp; Cloud · UAE</p>
              </div>
            </div>
            <div style={{background:"#F8F9FF",border:"1px solid #E0E4F8",borderRadius:16,padding:"36px 32px"}}>
              <p style={{fontSize:17,lineHeight:1.75,color:"#111111",fontFamily:F,marginBottom:28}}>&ldquo;We&apos;re a high-volume retail operation — hundreds of purchase approvals a week across multiple categories. ZUUZ gave us 100% compliance coverage without adding headcount. Every approval now runs through the right policy with the right budget context attached.&rdquo;</p>
              <div>
                <p style={{fontSize:14,fontWeight:700,color:"#111111",fontFamily:F,marginBottom:2}}>Finance Manager, Nesto Group</p>
                <p style={{fontSize:13,color:"#666666",fontFamily:F}}>Retail &amp; Distribution · UAE</p>
              </div>
            </div>
            <div style={{background:"#F8F9FF",border:"1px solid #E0E4F8",borderRadius:16,padding:"36px 32px"}}>
              <p style={{fontSize:17,lineHeight:1.75,color:"#111111",fontFamily:F,marginBottom:28}}>&ldquo;Our procurement team was spending more time chasing approvals than sourcing. ZUUZ connected our SAP instance and M365 environment, automated the routing, and we saw 70% faster cycle times within the first quarter. The ops team didn&apos;t need retraining — it just worked inside the tools they already used.&rdquo;</p>
              <div>
                <p style={{fontSize:14,fontWeight:700,color:"#111111",fontFamily:F,marginBottom:2}}>CTO, Western International Group</p>
                <p style={{fontSize:13,color:"#666666",fontFamily:F}}>Distribution &amp; Trading · UAE</p>
              </div>
            </div>
            <div style={{background:"#F8F9FF",border:"1px solid #E0E4F8",borderRadius:16,padding:"36px 32px"}}>
              <p style={{fontSize:17,lineHeight:1.75,color:"#111111",fontFamily:F,marginBottom:28}}>&ldquo;Our sales reps were losing 4 to 6 hours a week just chasing deal desk approvals and contract status. ZUUZ automated the entire loop — from quote to signed approval — and that time came back immediately. It&apos;s the highest-ROI tool we deployed last year, and it took less than a week to go live.&rdquo;</p>
              <div>
                <p style={{fontSize:14,fontWeight:700,color:"#111111",fontFamily:F,marginBottom:2}}>COO, RA Technologies LLC</p>
                <p style={{fontSize:13,color:"#666666",fontFamily:F}}>IT Services · USA</p>
              </div>
            </div>
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
