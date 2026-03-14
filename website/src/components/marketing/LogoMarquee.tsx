"use client";

const LOGOS = [
  { name: "Salesforce", hex: "#00A1E0" },
  { name: "SAP",        hex: "#0070AD" },
  { name: "Microsoft",  hex: "#0078D4" },
  { name: "Slack",      hex: "#4A154B" },
  { name: "Jira",       hex: "#0052CC" },
  { name: "ServiceNow", hex: "#81B5A1" },
  { name: "Google",     hex: "#4285F4" },
  { name: "HubSpot",    hex: "#FF7A59" },
  { name: "Oracle",     hex: "#F80000" },
  { name: "Zoom",       hex: "#2D8CFF" },
  { name: "Zendesk",    hex: "#03363D" },
  { name: "NetSuite",   hex: "#009FDA" },
  { name: "Workday",    hex: "#F8A01C" },
  { name: "GitHub",     hex: "#24292F" },
  { name: "Teams",      hex: "#6264A7" },
  { name: "SharePoint", hex: "#0078D4" },
  { name: "BambooHR",   hex: "#73AC41" },
  { name: "Zoho",       hex: "#E42527" },
];

function Chip({ logo }: { logo: (typeof LOGOS)[0] }) {
  const abbr =
    logo.name.length <= 3
      ? logo.name
      : logo.name.slice(0, 2).toUpperCase();
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 16px",
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: 999,
        flexShrink: 0,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        userSelect: "none",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 22,
          height: 22,
          background: logo.hex,
          borderRadius: 5,
          flexShrink: 0,
          color: "#fff",
          fontSize: 9,
          fontWeight: 900,
          fontFamily: "var(--font-body)",
          letterSpacing: "0.01em",
        }}
      >
        {abbr}
      </span>
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#374151",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-body)",
        }}
      >
        {logo.name}
      </span>
    </div>
  );
}

export function LogoMarquee() {
  const row1 = [...LOGOS, ...LOGOS];
  const row2 = [
    ...LOGOS.slice(9),
    ...LOGOS.slice(0, 9),
    ...LOGOS.slice(9),
    ...LOGOS.slice(0, 9),
  ];

  return (
    <div style={{ padding: "32px 0", position: "relative" }}>
      <p
        style={{
          textAlign: "center",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#94A3B8",
          marginBottom: 24,
          fontFamily: "var(--font-body)",
        }}
      >
        Connects with the tools your teams already use
      </p>

      {/* Left mask */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 96,
          zIndex: 2,
          pointerEvents: "none",
          background: "linear-gradient(to right, #fff, transparent)",
        }}
      />
      {/* Right mask */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 96,
          zIndex: 2,
          pointerEvents: "none",
          background: "linear-gradient(to left, #fff, transparent)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 12, overflow: "hidden" }}>
        {/* Row 1 — forward */}
        <div
          style={{
            display: "flex",
            gap: 12,
            width: "max-content",
            animation: "marquee 30s linear infinite",
          }}
        >
          {row1.map((l, i) => (
            <Chip key={i} logo={l} />
          ))}
        </div>
        {/* Row 2 — reverse */}
        <div
          style={{
            display: "flex",
            gap: 12,
            width: "max-content",
            animation: "marqueeReverse 36s linear infinite",
          }}
        >
          {row2.map((l, i) => (
            <Chip key={i} logo={l} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LogoMarquee;
