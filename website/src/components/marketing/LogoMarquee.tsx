"use client";

/* ── Real brand icons via dangerouslySetInnerHTML ─────────────────────── */
const LOGO_ICONS: Record<string, string> = {
  Salesforce: `<svg viewBox="0 0 66 46" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27 9.6C29.2 7.1 32.4 5.6 35.9 5.6c4.7 0 8.9 2.8 11.1 6.8 1.4-.7 2.9-1 4.4-1 5.6 0 10.2 4.6 10.2 10.2 0 5.7-4.6 10.3-10.2 10.3H8.7C4.5 31.9 1 28.4 1 24.2c0-4.2 3.4-7.6 7.6-7.6.4 0 .8 0 1.2.1C11.2 12.4 15.7 9 20.9 9c2.2 0 4.3.7 6 1.9l.1-1.3z" fill="#00A1E0"/></svg>`,

  SAP: `<svg viewBox="0 0 48 22" xmlns="http://www.w3.org/2000/svg"><text x="2" y="18" font-family="Arial Black,sans-serif" font-weight="900" font-size="20" fill="#0070AD">SAP</text></svg>`,

  Microsoft: `<svg viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" fill="#F25022"/><rect x="11" width="10" height="10" fill="#7FBA00"/><rect y="11" width="10" height="10" fill="#00A4EF"/><rect x="11" y="11" width="10" height="10" fill="#FFB900"/></svg>`,

  Slack: `<svg viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M19.7 31.9a4.45 4.45 0 0 1-4.4 4.5 4.45 4.45 0 0 1-4.5-4.5 4.45 4.45 0 0 1 4.5-4.4h4.4v4.4zm2.3 0a4.45 4.45 0 0 1 4.4-4.4 4.45 4.45 0 0 1 4.5 4.4v11a4.45 4.45 0 0 1-4.5 4.5A4.45 4.45 0 0 1 22 42.9v-11z" fill="#E01E5A"/><path d="M26.4 18.1a4.45 4.45 0 0 1-4.4-4.5 4.45 4.45 0 0 1 4.4-4.4 4.45 4.45 0 0 1 4.5 4.4v4.5h-4.5zm0 2.2a4.45 4.45 0 0 1 4.5 4.4 4.45 4.45 0 0 1-4.5 4.5H15.3a4.45 4.45 0 0 1-4.4-4.5 4.45 4.45 0 0 1 4.4-4.4h11.1z" fill="#36C5F0"/><path d="M38 24.7a4.45 4.45 0 0 1 4.5-4.4 4.45 4.45 0 0 1 4.4 4.4 4.45 4.45 0 0 1-4.4 4.5H38v-4.5zm-2.3 0a4.45 4.45 0 0 1-4.4 4.5 4.45 4.45 0 0 1-4.5-4.5V13.7a4.45 4.45 0 0 1 4.5-4.4 4.45 4.45 0 0 1 4.4 4.4v11z" fill="#2EB67D"/><path d="M33.3 37.5a4.45 4.45 0 0 1 4.4 4.5 4.45 4.45 0 0 1-4.4 4.4 4.45 4.45 0 0 1-4.5-4.4v-4.5h4.5zm0-2.2a4.45 4.45 0 0 1-4.5-4.4 4.45 4.45 0 0 1 4.5-4.5H44.4a4.45 4.45 0 0 1 4.4 4.5 4.45 4.45 0 0 1-4.4 4.4H33.3z" fill="#ECB22E"/></svg>`,

  Jira: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M15.9.8L.3 16.1l6.8 6.8 8.8-8.5 8.8 8.5 6.8-6.8L16 .8zm0 17.3l-6.5 6.3 6.5 6.2 6.5-6.2-6.5-6.3z" fill="#0052CC"/></svg>`,

  ServiceNow: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="38" fill="#62D84E"/><text x="40" y="52" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="26" fill="white">SN</text></svg>`,

  Google: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.8-2.1 5.1-4.4 6.6v5.5h7.1c4.2-3.8 6.6-9.5 6.6-16.1z"/><path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.6-5.3l-7.1-5.5c-2 1.3-4.5 2.1-7.5 2.1-5.7 0-10.6-3.9-12.3-9.1H4.3v5.7C7.9 41.1 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.7 28.2c-.4-1.3-.7-2.7-.7-4.2s.3-2.9.7-4.2v-5.7H4.3C2.8 17.1 2 20.4 2 24c0 3.6.8 6.9 2.3 9.9l7.4-5.7z"/><path fill="#EA4335" d="M24 10.8c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.2 29.9 2 24 2 15.4 2 7.9 6.9 4.3 14.1l7.4 5.7c1.7-5.2 6.6-9 12.3-9z"/></svg>`,

  HubSpot: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="22" r="13" fill="#FF7A59"/><circle cx="50" cy="22" r="6" fill="#fff"/><line x1="50" y1="35" x2="50" y2="62" stroke="#FF7A59" stroke-width="9" stroke-linecap="round"/><circle cx="74" cy="65" r="13" fill="#FF7A59"/><circle cx="74" cy="65" r="6" fill="#fff"/><circle cx="26" cy="65" r="13" fill="#FF7A59"/><circle cx="26" cy="65" r="6" fill="#fff"/><line x1="50" y1="62" x2="74" y2="65" stroke="#FF7A59" stroke-width="9" stroke-linecap="round"/><line x1="50" y1="62" x2="26" y2="65" stroke="#FF7A59" stroke-width="9" stroke-linecap="round"/></svg>`,

  Oracle: `<svg viewBox="0 0 110 44" xmlns="http://www.w3.org/2000/svg"><ellipse cx="55" cy="22" rx="52" ry="20" fill="none" stroke="#F80000" stroke-width="8"/></svg>`,

  Zoom: `<svg viewBox="0 0 80 52" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="8" width="52" height="36" rx="8" fill="#2D8CFF"/><polygon points="60,12 78,4 78,48 60,40" fill="#2D8CFF" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg>`,

  Zendesk: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="28" fill="#03363D"/><text x="30" y="40" text-anchor="middle" font-family="Arial Black,sans-serif" font-weight="900" font-size="30" fill="#fff">Z</text></svg>`,

  NetSuite: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="8" fill="#009FDA"/><text x="24" y="35" text-anchor="middle" font-family="Arial Black,sans-serif" font-weight="900" font-size="26" fill="white">N</text></svg>`,

  Workday: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="38" fill="#F8A01C"/><line x1="40" y1="12" x2="40" y2="68" stroke="white" stroke-width="7" stroke-linecap="round"/><line x1="12" y1="40" x2="68" y2="40" stroke="white" stroke-width="7" stroke-linecap="round"/><line x1="21.4" y1="21.4" x2="58.6" y2="58.6" stroke="white" stroke-width="7" stroke-linecap="round"/><line x1="58.6" y1="21.4" x2="21.4" y2="58.6" stroke="white" stroke-width="7" stroke-linecap="round"/></svg>`,

  GitHub: `<svg viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292F"/></svg>`,

  Teams: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="10" fill="#6264A7"/><text x="24" y="34" text-anchor="middle" font-family="Arial Black,sans-serif" font-weight="900" font-size="28" fill="white">T</text></svg>`,

  SharePoint: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="10" fill="#0078D4"/><text x="24" y="34" text-anchor="middle" font-family="Arial Black,sans-serif" font-weight="900" font-size="28" fill="white">S</text></svg>`,

  BambooHR: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg"><rect x="26" y="5" width="8" height="70" rx="4" fill="#73AC41"/><path d="M34 20 Q54 10 58 30 Q38 26 34 38" fill="#73AC41"/><path d="M26 45 Q6 35 2 55 Q22 48 26 62" fill="#73AC41"/></svg>`,

  Zoho: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg"><text x="2" y="34" font-family="Arial Black,sans-serif" font-weight="900" font-size="40" fill="#E42527">Z</text></svg>`,
};

const LOGOS = [
  { name: "Salesforce", hex: "#00A1E0", bg: "#E6F6FD" },
  { name: "SAP",        hex: "#0070AD", bg: "#E6F2F9" },
  { name: "Microsoft",  hex: "#0078D4", bg: "#E6F2FD" },
  { name: "Slack",      hex: "#4A154B", bg: "#F3E8F7" },
  { name: "Jira",       hex: "#0052CC", bg: "#E6EEFA" },
  { name: "ServiceNow", hex: "#62D84E", bg: "#EBF9E8" },
  { name: "Google",     hex: "#4285F4", bg: "#EAF0FE" },
  { name: "HubSpot",    hex: "#FF7A59", bg: "#FFF0EC" },
  { name: "Oracle",     hex: "#F80000", bg: "#FEE9E9" },
  { name: "Zoom",       hex: "#2D8CFF", bg: "#EAF3FF" },
  { name: "Zendesk",    hex: "#03363D", bg: "#E6EFF0" },
  { name: "NetSuite",   hex: "#009FDA", bg: "#E6F5FB" },
  { name: "Workday",    hex: "#F8A01C", bg: "#FEF6E6" },
  { name: "GitHub",     hex: "#24292F", bg: "#EBEBEC" },
  { name: "Teams",      hex: "#6264A7", bg: "#EEEEF5" },
  { name: "SharePoint", hex: "#0078D4", bg: "#E6F2FD" },
  { name: "BambooHR",   hex: "#73AC41", bg: "#EEF5E8" },
  { name: "Zoho",       hex: "#E42527", bg: "#FEE9E9" },
];

function Chip({ logo }: { logo: (typeof LOGOS)[0] }) {
  const svgHtml = LOGO_ICONS[logo.name];
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 16px",
        background: "#fff",
        border: "1px solid #E4E7EC",
        borderRadius: 999,
        flexShrink: 0,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
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
          background: logo.bg,
          borderRadius: 5,
          flexShrink: 0,
          overflow: "hidden",
        }}
        dangerouslySetInnerHTML={svgHtml ? { __html: svgHtml } : undefined}
      />
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#344054",
          whiteSpace: "nowrap",
          fontFamily: "Inter, sans-serif",
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
          color: "#98A2B3",
          marginBottom: 24,
          fontFamily: "Inter, sans-serif",
        }}
      >
        Connects with the tools your teams already use
      </p>

      {/* Left fade mask */}
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
      {/* Right fade mask */}
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
        {/* Row 1 — left */}
        <div
          style={{
            display: "flex",
            gap: 12,
            width: "max-content",
            animation: "marquee-left 32s linear infinite",
          }}
        >
          {row1.map((l, i) => (
            <Chip key={i} logo={l} />
          ))}
        </div>
        {/* Row 2 — right */}
        <div
          style={{
            display: "flex",
            gap: 12,
            width: "max-content",
            animation: "marquee-right 38s linear infinite",
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
