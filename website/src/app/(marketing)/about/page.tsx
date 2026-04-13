import Link from "next/link";
export const metadata = {
  title: "About ZUUZ — Forged by Insight. Driven by Precision.",
};
const B = "#0018FF";
const F = "'Montserrat',sans-serif";
export default function AboutPage() {
  return (
    <main style={{fontFamily:F}}>
      {/* HERO */}
      <section style={{background:"linear-gradient(155deg,#EEF2FF 0%,#fff 60%)",padding:"88px 0 72px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
          <p style={{fontSize:11,fontWeight:700,letterSpacing:"0.11em",textTransform:"uppercase",color:B,fontFamily:F,marginBottom:16}}>About ZUUZ</p>
          <h1 style={{maxWidth:640,marginBottom:22,fontFamily:F}}>Built by operators who lived the problem.</h1>
          <p style={{fontSize:18,lineHeight:1.75,color:"#333333",maxWidth:540,fontFamily:F}}>
            ZUUZ is the agentic AI execution layer for enterprise — persona-based agents that do real work
            across Email, Docs, Meetings, CRM and ERP, with governed workflows that enforce your policies
            and write back safely to every system of record.
          </p>
        </div>
      </section>
      {/* MISSION */}
      <section style={{padding:"80px 0",background:"#fff"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:56}}>
          <div>
            <p style={{fontSize:11,fontWeight:700,letterSpacing:"0.11em",textTransform:"uppercase",color:B,marginBottom:16,fontFamily:F}}>Our Mission</p>
            <h2 style={{marginBottom:18,fontFamily:F}}>Make enterprise work actually execute.</h2>
            <p style={{fontSize:16,lineHeight:1.78,color:"#333333",fontFamily:F}}>
              Most enterprise AI tools answer questions. ZUUZ does work. We connect to every system your
              teams use, assemble full context automatically, route decisions through your policies, and
              write outcomes back — with a complete audit trail on every action.
            </p>
          </div>
          <div>
            <p style={{fontSize:11,fontWeight:700,letterSpacing:"0.11em",textTransform:"uppercase",color:B,marginBottom:16,fontFamily:F}}>The Problem We Solve</p>
            <h2 style={{marginBottom:18,fontFamily:F}}>Work gets stuck between systems.</h2>
            <p style={{fontSize:16,lineHeight:1.78,color:"#333333",fontFamily:F}}>
              Email threads. Slack messages. ERP tickets. CRM updates. Most enterprise work lives across
              disconnected tools. ZUUZ unifies them — assembling context, routing decisions, and executing
              outcomes without anyone having to remember to do it.
            </p>
          </div>
        </div>
      </section>
      {/* STATS */}
      <section style={{padding:"72px 0",background:"#F5F6FF"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"#DDDDE8",borderRadius:16,overflow:"hidden"}}>
            {[
              {n:"4",      l:"Enterprise Deployments",d:"UAE & USA"},
              {n:"200+",   l:"Connected Systems",      d:"One platform"},
              {n:"3–4 hrs",l:"Saved Per User Daily",   d:"Avg across deployments"},
              {n:"100%",   l:"Audit Coverage",         d:"Every action logged"},
            ].map(s=>(
              <div key={s.l} style={{background:"#fff",padding:"36px 28px",textAlign:"center"}}>
                <p style={{fontSize:"clamp(28px,3.5vw,44px)",fontWeight:800,color:B,letterSpacing:"-0.03em",lineHeight:1,marginBottom:10,fontFamily:F}}>{s.n}</p>
                <p style={{fontSize:15,fontWeight:700,color:"#111111",marginBottom:4,fontFamily:F}}>{s.l}</p>
                <p style={{fontSize:13,color:"#555555",fontFamily:F}}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* OFFICES */}
      <section style={{padding:"72px 0",background:"#fff"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
          <div style={{textAlign:"center",marginBottom:44}}>
            <p style={{fontSize:11,fontWeight:700,letterSpacing:"0.11em",textTransform:"uppercase",color:B,fontFamily:F,marginBottom:14}}>Global Presence</p>
            <h2 style={{fontFamily:F}}>Where to find us</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {[
              {flag:"🇺🇸",role:"Global HQ",country:"United States",name:"Plug and Play Tech Center",line1:"440 N Wolfe Rd",line2:"Sunnyvale, CA 94085",email:"info@zuuz.ai",phone:"+1 469 347 3394",map:"https://www.google.com/maps/search/?api=1&query=440+N+Wolfe+Rd+Sunnyvale+CA+94085"},
              {flag:"🇦🇪",role:"Sales Office",country:"United Arab Emirates",name:"Latifa Tower",line1:"Tower 3807, Sheikh Zayed Road",line2:"Dubai, UAE · P.O Box 116287",email:"uae@zuuz.ai",phone:"",map:"https://www.google.com/maps/search/?api=1&query=Latifa+Tower+Sheikh+Zayed+Road+Dubai+UAE"},
              {flag:"🇮🇳",role:"R&D Centre",country:"India",name:"Dwaraka Starline Pvt Ltd",line1:"Plot No. 131, Dwaraka Icon Building, 4th Floor",line2:"Kavuri Hills, Hyderabad 500033",email:"india@zuuz.ai",phone:"",map:"https://www.google.com/maps/search/?api=1&query=Kavuri+Hills+Hyderabad+500033"},
            ].map(o=>(
              <div key={o.role} style={{padding:"28px 24px",border:"1px solid #E8E8EE",borderRadius:16,background:"#fff"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
                  <span style={{fontSize:28}}>{o.flag}</span>
                  <div>
                    <p style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B,fontFamily:F,marginBottom:2}}>{o.role}</p>
                    <p style={{fontSize:13,color:"#555555",fontFamily:F}}>{o.country}</p>
                  </div>
                </div>
                <p style={{fontSize:18,fontWeight:700,color:"#000000",fontFamily:F,marginBottom:8,lineHeight:1.3}}>{o.name}</p>
                <p style={{fontSize:14,color:"#333333",fontFamily:F,marginBottom:2}}>{o.line1}</p>
                <p style={{fontSize:14,color:"#333333",fontFamily:F,marginBottom:14}}>{o.line2}</p>
                {o.phone && <p style={{fontSize:13,color:"#555555",fontFamily:F,marginBottom:4}}>{o.phone}</p>}
                <p style={{fontSize:13,color:"#555555",fontFamily:F,marginBottom:16}}>{o.email}</p>
                <a href={o.map} target="_blank" rel="noopener noreferrer"
                  style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:13,fontWeight:600,color:B,fontFamily:F,textDecoration:"none"}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={B}>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  View on Google Maps →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* DARK CTA */}
      <section style={{padding:"72px 0 80px",background:"#000814"}}>
        <div style={{maxWidth:700,margin:"0 auto",padding:"0 24px",textAlign:"center"}}>
          <p style={{fontSize:"clamp(26px,4vw,46px)",fontWeight:800,color:"#FFFFFF",lineHeight:1.1,letterSpacing:"-0.022em",fontFamily:F,marginBottom:6}}>Forged by Insight.</p>
          <p style={{fontSize:"clamp(26px,4vw,46px)",fontWeight:800,color:B,lineHeight:1.1,letterSpacing:"-0.022em",fontFamily:F,marginBottom:36}}>Driven by Precision.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="https://cal.com/avinashgujje/30min" style={{display:"inline-flex",alignItems:"center",padding:"13px 28px",background:B,color:"#FFFFFF",borderRadius:10,fontSize:15,fontWeight:600,fontFamily:F,textDecoration:"none"}}>Request Trial →</Link>
            <Link href="/solutions" style={{display:"inline-flex",alignItems:"center",padding:"12px 26px",background:"transparent",color:"rgba(255,255,255,0.88)",border:"1.5px solid rgba(255,255,255,0.88)",borderRadius:10,fontSize:15,fontWeight:600,fontFamily:F,textDecoration:"none"}}>Explore solutions</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
