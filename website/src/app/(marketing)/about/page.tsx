import Link from "next/link";

export const metadata = {
  title: "About ZUUZ — Forged by Insight. Driven by Precision.",
};

const BLUE = "#0018FF";
const F = "'Montserrat', sans-serif";

export default function AboutPage() {
  return (
    <main style={{ fontFamily: F }}>
      {/* HERO */}
      <section style={{
        background: "linear-gradient(155deg,#EEF0FF 0%,#ffffff 55%)",
        padding: "88px 0 72px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.11em",
            textTransform: "uppercase", color: BLUE, marginBottom: 16,
            fontFamily: F }}>
            About ZUUZ
          </p>
          <h1 style={{ maxWidth: 620, marginBottom: 22 }}>
            Built by operators who lived the problem.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.75, color: "#444",
            maxWidth: 540, fontFamily: F, margin: "0 0 32px" }}>
            ZUUZ is the agentic AI execution layer for enterprise —
            persona-based agents that do real work across Email, Docs,
            Meetings, CRM and ERP, with governed workflows that enforce
            your policies and write back safely to every system of record.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section style={{ padding: "80px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 56, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.11em",
              textTransform: "uppercase", color: BLUE, marginBottom: 16,
              fontFamily: F }}>
              Our Mission
            </p>
            <h2 style={{ marginBottom: 18 }}>Make enterprise work actually execute.</h2>
            <p style={{ fontSize: 16, lineHeight: 1.78, color: "#444", fontFamily: F }}>
              Most enterprise AI tools answer questions. ZUUZ does work. We
              connect to every system your teams use, assemble full context
              automatically, route decisions through your policies, and write
              outcomes back — with a complete audit trail on every action.
            </p>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.11em",
              textTransform: "uppercase", color: BLUE, marginBottom: 16,
              fontFamily: F }}>
              The Problem We Solve
            </p>
            <h2 style={{ marginBottom: 18 }}>Work gets stuck between systems.</h2>
            <p style={{ fontSize: 16, lineHeight: 1.78, color: "#444", fontFamily: F }}>
              Email threads. Slack messages. ERP tickets. CRM updates. Most
              enterprise work lives across disconnected tools. ZUUZ unifies
              them — assembling context, routing decisions, and executing
              outcomes without anyone having to remember to do it.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "72px 0", background: "#F5F6FF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)",
            gap: 1, background: "#DDDDE8", borderRadius: 16, overflow: "hidden" }}>
            {[
              { n: "4",       l: "Enterprise Deployments", d: "UAE & USA"              },
              { n: "200+",    l: "Connected Systems",       d: "One platform"           },
              { n: "3–4 hrs", l: "Saved Per User Daily",    d: "Avg across deployments" },
              { n: "100%",    l: "Audit Coverage",          d: "Every action logged"    },
            ].map(s => (
              <div key={s.l} style={{ background: "#fff", padding: "36px 28px",
                textAlign: "center" }}>
                <p style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800,
                  color: BLUE, letterSpacing: "-0.03em", lineHeight: 1,
                  marginBottom: 10, fontFamily: F }}>{s.n}</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#111",
                  marginBottom: 4, fontFamily: F }}>{s.l}</p>
                <p style={{ fontSize: 12, color: "#888", fontFamily: F }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section style={{ padding: "72px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="offices-grid">
            {([
              {
                flag: "🇺🇸", role: "Global HQ", country: "United States",
                name: "Plug and Play Tech Center",
                line1: "440 N Wolfe Rd", line2: "Sunnyvale, CA 94085",
                phone: "+1 469 347 3394", email: "info@zuuz.ai",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=440+N+Wolfe+Rd+Sunnyvale+CA+94085",
              },
              {
                flag: "🇦🇪", role: "Sales Office", country: "United Arab Emirates",
                name: "Latifa Tower",
                line1: "Tower 3807, Sheikh Zayed Road", line2: "Dubai, UAE · P.O Box 116287",
                phone: "", email: "uae@zuuz.ai",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Latifa+Tower+Sheikh+Zayed+Road+Dubai+UAE",
              },
              {
                flag: "🇮🇳", role: "R&D Centre", country: "India",
                name: "Dwaraka Starline Pvt Ltd",
                line1: "Plot No. 131, Dwaraka Icon Building, 4th Floor",
                line2: "Kavuri Hills, Hyderabad 500033",
                phone: "", email: "india@zuuz.ai",
                mapUrl: "https://www.google.com/maps/search/?api=1&query=Kavuri+Hills+Hyderabad+500033+India",
              },
            ]).map(office => (
              <div key={office.country} style={{
                padding: "32px 28px", border: "1px solid #E8E8EE",
                borderRadius: 16, background: "white",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <span style={{ fontSize: 32 }}>{office.flag}</span>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                      textTransform: "uppercase", color: BLUE, fontFamily: F, marginBottom: 2 }}>
                      {office.role}
                    </p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#444", fontFamily: F }}>
                      {office.country}
                    </p>
                  </div>
                </div>
                <p style={{ fontSize: 17, fontWeight: 700, color: "#000", fontFamily: F,
                  marginBottom: 8, lineHeight: 1.3 }}>{office.name}</p>
                <p style={{ fontSize: 14, color: "#333", fontFamily: F, marginBottom: 2, lineHeight: 1.6 }}>
                  {office.line1}
                </p>
                <p style={{ fontSize: 14, color: "#333", fontFamily: F, marginBottom: 16, lineHeight: 1.6 }}>
                  {office.line2}
                </p>
                {office.phone && <p style={{ fontSize: 13, color: "#555", fontFamily: F, marginBottom: 3 }}>{office.phone}</p>}
                <p style={{ fontSize: 13, color: "#555", fontFamily: F, marginBottom: 20 }}>{office.email}</p>
                <a href={office.mapUrl} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6,
                    fontSize: 13, fontWeight: 600, color: BLUE, fontFamily: F, textDecoration: "none" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={BLUE}>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  View on Google Maps →
                </a>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .offices-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
          @media (max-width: 768px) { .offices-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* BRAND TAGLINE + CTA */}
      <section style={{ padding: "72px 0 80px", background: "#000814" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px",
          textAlign: "center" }}>
          <p style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 800,
            color: "#fff", lineHeight: 1.1, letterSpacing: "-0.022em",
            fontFamily: F, marginBottom: 6 }}>Forged by Insight.</p>
          <p style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 800,
            color: BLUE, lineHeight: 1.1, letterSpacing: "-0.022em",
            fontFamily: F, marginBottom: 36 }}>Driven by Precision.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center",
            flexWrap: "wrap" }}>
            <Link href="/about/contact" style={{ display: "inline-flex",
              alignItems: "center", padding: "13px 28px", background: BLUE,
              color: "#fff", borderRadius: 10, fontSize: 15, fontWeight: 600,
              fontFamily: F, textDecoration: "none" }}>Request a demo →</Link>
            <Link href="/solutions" style={{ display: "inline-flex",
              alignItems: "center", padding: "12px 26px", background: "transparent",
              color: "rgba(255,255,255,0.65)", border: "1.5px solid rgba(255,255,255,0.18)",
              borderRadius: 10, fontSize: 15, fontWeight: 600,
              fontFamily: F, textDecoration: "none" }}>Explore solutions</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
