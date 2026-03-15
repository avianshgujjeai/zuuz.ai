"use client";

const LOGOS = [
  { name:"Salesforce",  color:"#00A1E0", symbol:"☁",  size:14 },
  { name:"SAP",         color:"#0070AD", symbol:"SAP", size:8  },
  { name:"Microsoft",   color:"#0078D4", symbol:"⊞",  size:13 },
  { name:"Slack",       color:"#4A154B", symbol:"#",   size:14 },
  { name:"Jira",        color:"#0052CC", symbol:"◈",  size:13 },
  { name:"ServiceNow",  color:"#62D84E", symbol:"✦",  size:13 },
  { name:"Google",      color:"#4285F4", symbol:"G",   size:14 },
  { name:"HubSpot",     color:"#FF7A59", symbol:"⬡",  size:13 },
  { name:"Oracle",      color:"#F80000", symbol:"○",  size:14 },
  { name:"Zoom",        color:"#2D8CFF", symbol:"Z",   size:14 },
  { name:"Zendesk",     color:"#03363D", symbol:"Z",   size:14 },
  { name:"NetSuite",    color:"#009EDB", symbol:"N",   size:14 },
  { name:"Workday",     color:"#F8A01C", symbol:"W",   size:13 },
  { name:"GitHub",      color:"#24292F", symbol:"⌥",  size:13 },
  { name:"Teams",       color:"#5059C9", symbol:"T",   size:14 },
  { name:"SharePoint",  color:"#0078D4", symbol:"S",   size:14 },
  { name:"BambooHR",    color:"#73AC41", symbol:"⬡",  size:12 },
  { name:"Zoho",        color:"#E42527", symbol:"Z",   size:14 },
];

function Chip({ logo }: { logo: typeof LOGOS[0] }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 16px",
      background: "#ffffff",
      border: "1px solid #E5E7EB",
      borderRadius: 999,
      flexShrink: 0,
      userSelect: "none",
      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    }}>
      <span style={{
        width: 24,
        height: 24,
        borderRadius: 6,
        background: logo.color,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: logo.size,
        color: "#ffffff",
        fontWeight: 700,
        flexShrink: 0,
        lineHeight: 1,
        fontFamily: "Inter, sans-serif",
      }}>
        {logo.symbol}
      </span>
      <span style={{
        fontSize: 13,
        fontWeight: 500,
        color: "#374151",
        whiteSpace: "nowrap",
        fontFamily: "Inter, sans-serif",
      }}>
        {logo.name}
      </span>
    </div>
  );
}

export function LogoMarquee() {
  const row1 = [...LOGOS, ...LOGOS];
  const row2 = [...LOGOS.slice(9), ...LOGOS.slice(0, 9), ...LOGOS.slice(9), ...LOGOS.slice(0, 9)];

  return (
    <div style={{ padding: "28px 0", position: "relative", overflow: "hidden" }}>
      <p style={{
        textAlign: "center",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#9CA3AF",
        marginBottom: 18,
        fontFamily: "Inter, sans-serif",
      }}>
        Connects with the tools your teams already use
      </p>

      {/* Fade masks */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 10, pointerEvents: "none", background: "linear-gradient(to right, #ffffff, transparent)" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 10, pointerEvents: "none", background: "linear-gradient(to left, #ffffff, transparent)" }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", gap: 10, width: "max-content", animation: "marquee-left 30s linear infinite" }}>
          {row1.map((l, i) => <Chip key={i} logo={l} />)}
        </div>
        <div style={{ display: "flex", gap: 10, width: "max-content", animation: "marquee-right 36s linear infinite" }}>
          {row2.map((l, i) => <Chip key={i} logo={l} />)}
        </div>
      </div>
    </div>
  );
}

export default LogoMarquee;
