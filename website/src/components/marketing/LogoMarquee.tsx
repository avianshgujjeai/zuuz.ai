"use client";

const LOGOS = [
  { name: "Salesforce",  color: "#00A1E0", abbr: "SF"  },
  { name: "SAP",         color: "#0070AD", abbr: "SAP" },
  { name: "Microsoft",   color: "#0078D4", abbr: "MS"  },
  { name: "Slack",       color: "#611f69", abbr: "SL"  },
  { name: "Jira",        color: "#0052CC", abbr: "JR"  },
  { name: "ServiceNow",  color: "#62D84E", abbr: "SN"  },
  { name: "Google",      color: "#4285F4", abbr: "GW"  },
  { name: "HubSpot",     color: "#FF7A59", abbr: "HS"  },
  { name: "Oracle",      color: "#C74634", abbr: "OR"  },
  { name: "Zoom",        color: "#2D8CFF", abbr: "ZM"  },
  { name: "Zendesk",     color: "#03363D", abbr: "ZD"  },
  { name: "NetSuite",    color: "#009EDB", abbr: "NS"  },
  { name: "Workday",     color: "#F5841F", abbr: "WD"  },
  { name: "GitHub",      color: "#24292F", abbr: "GH"  },
  { name: "Teams",       color: "#464EB8", abbr: "TM"  },
  { name: "SharePoint",  color: "#0078D4", abbr: "SP"  },
];

function LogoChip({ name, color, abbr }: { name: string; color: string; abbr: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "#fff",
        border: "1px solid #DCE3F1",
        borderRadius: 40,
        padding: "7px 14px",
        flexShrink: 0,
        userSelect: "none",
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 8,
            fontWeight: 800,
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          {abbr}
        </span>
      </div>
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#374151",
          fontFamily: "'Inter', sans-serif",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </span>
    </div>
  );
}

function MarqueeRow({
  logos,
  direction,
  speed,
}: {
  logos: typeof LOGOS;
  direction: "ltr" | "rtl";
  speed: number;
}) {
  const doubled = [...logos, ...logos];
  return (
    <div style={{ overflow: "hidden", position: "relative", width: "100%" }}>
      {/* Left fade */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 90,
          background: "linear-gradient(to right, #fff, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      {/* Right fade */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 90,
          background: "linear-gradient(to left, #fff, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          gap: 10,
          width: "max-content",
          animation: `${direction === "ltr" ? "zuuz-marquee" : "zuuz-marquee-r"} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((logo, i) => (
          <LogoChip key={`${logo.name}-${i}`} {...logo} />
        ))}
      </div>
    </div>
  );
}

export function LogoMarquee() {
  const row2Logos = [...LOGOS.slice(8), ...LOGOS.slice(0, 8)];

  return (
    <div style={{ padding: "32px 0" }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: "0.09em",
          textTransform: "uppercase",
          color: "#94a3b8",
          textAlign: "center",
          marginBottom: 20,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Connects with the tools your teams already use
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <MarqueeRow logos={LOGOS}      direction="ltr" speed={28} />
        <MarqueeRow logos={row2Logos}  direction="rtl" speed={34} />
      </div>
    </div>
  );
}

export default LogoMarquee;
