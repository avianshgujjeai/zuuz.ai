"use client";

const LOGOS = [
  { name:"Salesforce",  abbr:"S",   color:"#fff", bg:"#00A1E0" },
  { name:"SAP",         abbr:"SAP", color:"#fff", bg:"#0070AD", small:true },
  { name:"Microsoft",   abbr:"⊞",   color:"#fff", bg:"#0078D4" },
  { name:"Slack",       abbr:"#",   color:"#fff", bg:"#4A154B" },
  { name:"Jira",        abbr:"J",   color:"#fff", bg:"#0052CC" },
  { name:"ServiceNow",  abbr:"SN",  color:"#fff", bg:"#81B5A1", small:true },
  { name:"Google",      abbr:"G",   color:"#fff", bg:"#4285F4" },
  { name:"HubSpot",     abbr:"H",   color:"#fff", bg:"#FF7A59" },
  { name:"Oracle",      abbr:"O",   color:"#fff", bg:"#F80000" },
  { name:"Zoom",        abbr:"Z",   color:"#fff", bg:"#2D8CFF" },
  { name:"Zendesk",     abbr:"Z",   color:"#fff", bg:"#03363D" },
  { name:"NetSuite",    abbr:"N",   color:"#fff", bg:"#009EDB" },
  { name:"Workday",     abbr:"W",   color:"#fff", bg:"#F8A01C" },
  { name:"GitHub",      abbr:"GH",  color:"#fff", bg:"#24292F", small:true },
  { name:"Teams",       abbr:"T",   color:"#fff", bg:"#5059C9" },
  { name:"SharePoint",  abbr:"S",   color:"#fff", bg:"#0078D4" },
  { name:"BambooHR",    abbr:"B",   color:"#fff", bg:"#73AC41" },
  { name:"Zoho",        abbr:"Z",   color:"#fff", bg:"#E42527" },
];

function LogoChip({ logo }: { logo: typeof LOGOS[0] }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 9,
      padding: "9px 18px",
      background: "white",
      border: "1px solid #E5E7EB",
      borderRadius: 100,
      flexShrink: 0,
      userSelect: "none",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    }}>
      <span style={{
        width: 24,
        height: 24,
        borderRadius: 6,
        background: logo.bg,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: logo.small ? 8 : 11,
        fontWeight: 700,
        color: "white",
        flexShrink: 0,
        letterSpacing: "-0.02em",
        fontFamily: "Inter, sans-serif",
      }}>
        {logo.abbr}
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
    <div style={{ padding: "32px 0", position: "relative" }}>
      <p style={{
        textAlign: "center",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#9CA3AF",
        marginBottom: 24,
        fontFamily: "Inter, sans-serif",
      }}>
        Connects with the tools your teams already use
      </p>

      {/* Fade masks */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 80,
        zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(to right, #fff, transparent)",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 80,
        zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(to left, #fff, transparent)",
      }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
        {/* Row 1 — scroll left */}
        <div style={{
          display: "flex",
          gap: 10,
          width: "max-content",
          animation: "marquee-left 32s linear infinite",
        }}>
          {row1.map((l, i) => <LogoChip key={i} logo={l} />)}
        </div>
        {/* Row 2 — scroll right */}
        <div style={{
          display: "flex",
          gap: 10,
          width: "max-content",
          animation: "marquee-right 38s linear infinite",
        }}>
          {row2.map((l, i) => <LogoChip key={i} logo={l} />)}
        </div>
      </div>
    </div>
  );
}

export default LogoMarquee;
