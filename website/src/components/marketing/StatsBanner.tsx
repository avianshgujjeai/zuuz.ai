"use client";
const F = "'Montserrat', sans-serif";
const STATS = [
  {
    number: "2.4M+",
    label: "Emails Processed",
    desc: "across enterprise inboxes",
  },
  {
    number: "840,000+",
    label: "Documents Reviewed",
    desc: "contracts, SOWs, invoices",
  },
  {
    number: "320,000+",
    label: "Meeting Outcomes Captured",
    desc: "decisions logged automatically",
  },
  {
    number: "1.1M+",
    label: "Workflows Executed",
    desc: "with policy gates & audit trail",
  },
  {
    number: "4.8M+",
    label: "Audit Log Entries",
    desc: "immutable, timestamped",
  },
  {
    number: "2.4s",
    label: "Avg Processing Time",
    desc: "signal to executed action",
  },
];
export function StatsBanner() {
  return (
    <section
      style={{
        background: "#000814",
        padding: "80px 0",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              padding: "40px 32px",
              borderRight:
                i % 3 !== 2
                  ? "1px solid rgba(255,255,255,0.10)"
                  : "none",
              borderBottom:
                i < 3
                  ? "1px solid rgba(255,255,255,0.10)"
                  : "none",
            }}
          >
            {/* Big number — pure white */}
            <p
              style={{
                fontSize: "clamp(38px, 4vw, 54px)",
                fontWeight: 800,
                color: "#FFFFFF",
                fontFamily: F,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: 12,
                margin: "0 0 12px 0",
              }}
            >
              {stat.number}
            </p>
            {/* Label — white, bold */}
            <p
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#FFFFFF",
                fontFamily: F,
                lineHeight: 1.3,
                margin: "0 0 6px 0",
              }}
            >
              {stat.label}
            </p>
            {/* Description — clearly readable */}
            <p
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "rgba(255, 255, 255, 0.80)",
                fontFamily: F,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {stat.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
