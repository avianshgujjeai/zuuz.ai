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

      {/* DETAILS */}
      <section style={{ padding: "72px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px",
          display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {[
            { h: "Headquarters", b: "Sunnyvale, CA 94085", s: "440N Wolfe Rd"        },
            { h: "Coverage",     b: "UAE & USA",           s: "Enterprise ops teams" },
            { h: "Contact",      b: "info@zuuz.ai",        s: "+1 469 347 3394"      },
          ].map(item => (
            <div key={item.h} style={{ padding: "28px 24px",
              border: "1px solid #E8E8EE", borderRadius: 14, background: "#fff" }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.11em",
                textTransform: "uppercase", color: BLUE, marginBottom: 12,
                fontFamily: F }}>{item.h}</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: "#000",
                marginBottom: 6, lineHeight: 1.3, fontFamily: F }}>{item.b}</p>
              <p style={{ fontSize: 13, color: "#888", fontFamily: F }}>{item.s}</p>
            </div>
          ))}
        </div>
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
