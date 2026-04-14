"use client";

const F = "'Montserrat', sans-serif";

const PROOF = [
  { n: "70%",      label: "Faster approval cycles",     desc: "Procurement and commercial approvals that took 3–5 days now close in hours." },
  { n: "8–12 hrs", label: "Saved per manager weekly",   desc: "Management time no longer spent chasing status updates and missing sign-offs." },
  { n: "4 hrs",    label: "Vendor onboarding",          desc: "End-to-end from request to sign-off, with full context and audit trail." },
  { n: "200+",     label: "Systems connected",          desc: "Salesforce, SAP, Workday, ServiceNow — no rip and replace required." },
  { n: "Weeks",    label: "Time to go live",            desc: "No IT project. No migration. Deployed on your real workflows, not a demo environment." },
  { n: "SOC 2",    label: "Type I Certified",           desc: "Enterprise security baseline with identity-verified execution and immutable logs." },
];

export function StatsBanner() {
  return (
    <section style={{ background: "#000814", padding: "80px 0", width: "100%" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 24px",
        display: "grid", gridTemplateColumns: "repeat(3,1fr)",
      }}>
        {PROOF.map((s, i) => (
          <div key={s.label} style={{
            padding: "44px 32px",
            borderRight: i % 3 !== 2 ? "1px solid rgba(255,255,255,0.10)" : "none",
            borderBottom: i < 3      ? "1px solid rgba(255,255,255,0.10)" : "none",
          }}>
            <p style={{
              fontFamily: F, fontSize: "clamp(34px,3.5vw,50px)", fontWeight: 800,
              color: "#FFFFFF", letterSpacing: "-0.03em", lineHeight: 1,
              margin: "0 0 10px 0",
            }}>
              {s.n}
            </p>
            <p style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: "#FFFFFF", margin: "0 0 8px 0", lineHeight: 1.3 }}>
              {s.label}
            </p>
            <p style={{ fontFamily: F, fontSize: 13, color: "rgba(255,255,255,0.60)", margin: 0, lineHeight: 1.55 }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
