"use client";

const LOGOS: { name: string; icon: string }[] = [
  {
    name: "Salesforce",
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#00A1E0"/><path d="M16 6c-2.8 0-5.2 1.6-6.4 4C8.8 9.6 8 9.4 7.2 9.4c-2.4 0-4.2 2-4.2 4.4 0 1 .3 1.9.8 2.6-.2.5-.3 1-.3 1.6 0 2.6 2 4.6 4.6 4.6.4 0 .8-.1 1.2-.2.9 1.4 2.5 2.4 4.3 2.4 1.2 0 2.3-.4 3.1-1.1.6.2 1.3.3 2 .3 3.3 0 6-2.7 6-6 0-.7-.1-1.3-.3-1.9.5-.7.8-1.6.8-2.5 0-2.4-1.8-4.4-4.2-4.6C19.8 7.2 18 6 16 6z" fill="white"/></svg>`,
  },
  {
    name: "SAP",
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#0070AD"/><text x="16" y="22" text-anchor="middle" fill="white" font-family="Arial" font-size="11" font-weight="bold">SAP</text></svg>`,
  },
  {
    name: "Microsoft",
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="13" height="13" fill="#F25022"/><rect x="17" y="2" width="13" height="13" fill="#7FBA00"/><rect x="2" y="17" width="13" height="13" fill="#00A4EF"/><rect x="17" y="17" width="13" height="13" fill="#FFB900"/></svg>`,
  },
  {
    name: "Slack",
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#4A154B"/><text x="16" y="21" text-anchor="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold">#</text></svg>`,
  },
  {
    name: "Jira",
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#0052CC"/><path d="M16 6 L26 16 L16 26 L6 16 Z" fill="none" stroke="white" stroke-width="2.5"/><circle cx="16" cy="16" r="3" fill="white"/></svg>`,
  },
  {
    name: "ServiceNow",
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#62D84E"/><text x="16" y="21" text-anchor="middle" fill="white" font-family="Arial" font-size="11" font-weight="bold">SN</text></svg>`,
  },
  {
    name: "Google",
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#ffffff" stroke="#E5E7EB" stroke-width="1"/><path d="M22 16.2c0-.6-.1-1.2-.2-1.8H16v3.4h3.4c-.1.8-.7 2-2 2.6v2.1h3.2C22.4 21 22 18.8 22 16.2z" fill="#4285F4"/><path d="M16 24c2.4 0 4.4-.8 5.9-2.1l-3.2-2.5c-.7.5-1.6.8-2.7.8-2.1 0-3.8-1.4-4.4-3.3H8.3v2.6C9.8 22.1 12.7 24 16 24z" fill="#34A853"/><path d="M11.6 16.9c-.2-.5-.3-1-.3-1.6s.1-1.1.3-1.6V11h-3.3C7.5 12.2 7 14 7 16s.5 3.8 1.3 5.5l3.3-2.6z" fill="#FBBC04"/><path d="M16 10.5c1.2 0 2.3.4 3.1 1.2l2.3-2.3C20.3 8.1 18.3 7.2 16 7.2c-3.3 0-6.2 1.9-7.7 4.8l3.3 2.6C12.2 12 14 10.5 16 10.5z" fill="#EA4335"/></svg>`,
  },
  {
    name: "HubSpot",
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#FF7A59"/><circle cx="20" cy="12" r="3.5" fill="white"/><rect x="17.5" y="12" width="2" height="8" fill="white"/><rect x="8" y="9" width="2.5" height="14" fill="white"/><rect x="8" y="15" width="8" height="2.5" fill="white"/><rect x="14" y="9" width="2.5" height="14" fill="white"/></svg>`,
  },
  {
    name: "Oracle",
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#F80000"/><ellipse cx="16" cy="16" rx="11" ry="7" fill="none" stroke="white" stroke-width="2"/><text x="16" y="19" text-anchor="middle" fill="white" font-family="Arial" font-size="6" font-weight="bold">ORACLE</text></svg>`,
  },
  {
    name: "Zoom",
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#2D8CFF"/><rect x="6" y="11" width="14" height="10" rx="2" fill="white"/><path d="M20 13.5 L26 10 L26 22 L20 18.5 Z" fill="white"/></svg>`,
  },
  {
    name: "Zendesk",
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#03363D"/><text x="16" y="21" text-anchor="middle" fill="#87CEAC" font-family="Arial" font-size="14" font-weight="bold">Z</text></svg>`,
  },
  {
    name: "NetSuite",
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#009EDB"/><text x="16" y="21" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">N</text></svg>`,
  },
  {
    name: "Workday",
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#F8A01C"/><path d="M7 16 L11 22 L16 10 L21 22 L25 16" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    name: "GitHub",
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#24292F"/><path fill-rule="evenodd" clip-rule="evenodd" d="M16 5C10 5 5 10.1 5 16.3c0 5 3.1 9.2 7.5 10.7.5.1.7-.2.7-.5v-1.9c-3 .7-3.6-1.5-3.6-1.5-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.4-.3-5-1.2-5-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-3 0 0 .9-.3 3 1.1a10.2 10.2 0 0 1 5.4 0c2.1-1.4 3-1.1 3-1.1.6 1.6.2 2.7.1 3 .7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.2-5 5.5.4.3.7 1 .7 2v3c0 .3.2.6.7.5A11.3 11.3 0 0 0 27 16.3C27 10.1 22 5 16 5z" fill="white"/></svg>`,
  },
  {
    name: "Teams",
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#5059C9"/><rect x="8" y="12" width="16" height="12" rx="3" fill="white"/><circle cx="16" cy="10" r="3.5" fill="white"/><circle cx="22" cy="9" r="2.5" fill="#7B83EB"/><rect x="19" y="12" width="9" height="8" rx="2" fill="#7B83EB"/></svg>`,
  },
  {
    name: "SharePoint",
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#0078D4"/><circle cx="20" cy="12" r="7" fill="#199BE2"/><circle cx="24" cy="20" r="8" fill="#37C6F4"/><circle cx="16" cy="22" r="8" fill="white"/><text x="16" y="26" text-anchor="middle" fill="#0078D4" font-family="Arial" font-size="9" font-weight="bold">S</text></svg>`,
  },
  {
    name: "BambooHR",
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#73AC41"/><rect x="10" y="8" width="4" height="16" rx="2" fill="white"/><rect x="10" y="14" width="12" height="4" rx="2" fill="white"/><rect x="18" y="8" width="4" height="16" rx="2" fill="white"/></svg>`,
  },
  {
    name: "Zoho",
    icon: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#E42527"/><text x="16" y="21" text-anchor="middle" fill="white" font-family="Arial" font-size="11" font-weight="bold">Zoho</text></svg>`,
  },
];

function LogoChip({ logo }: { logo: typeof LOGOS[0] }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 9,
      padding: "8px 18px",
      background: "#ffffff",
      border: "1px solid #E5E7EB",
      borderRadius: 999,
      flexShrink: 0,
      userSelect: "none",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    }}>
      <span
        style={{ width: 26, height: 26, flexShrink: 0, display: "flex",
          alignItems: "center", justifyContent: "center" }}
        dangerouslySetInnerHTML={{ __html: logo.icon }}
      />
      <span style={{
        fontSize: 13, fontWeight: 500, color: "#222222",
        whiteSpace: "nowrap", fontFamily: "Montserrat, sans-serif",
      }}>
        {logo.name}
      </span>
    </div>
  );
}

export function LogoMarquee() {
  const row1 = [...LOGOS, ...LOGOS];
  const row2 = [...LOGOS.slice(9), ...LOGOS.slice(0, 9),
                 ...LOGOS.slice(9), ...LOGOS.slice(0, 9)];
  return (
    <div style={{ padding: "28px 0", position: "relative", overflow: "hidden" }}>
      <p style={{
        textAlign: "center", fontSize: 11, fontWeight: 600,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: "#AAAAAA", marginBottom: 18, fontFamily: "Montserrat, sans-serif",
      }}>
        Connects with the tools your teams already use
      </p>
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:80,
        zIndex:10, pointerEvents:"none",
        background:"linear-gradient(to right, #ffffff, transparent)" }}/>
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:80,
        zIndex:10, pointerEvents:"none",
        background:"linear-gradient(to left, #ffffff, transparent)" }}/>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        <div style={{ display:"flex", gap:10, width:"max-content",
          animation:"marquee-left 32s linear infinite" }}>
          {row1.map((l, i) => <LogoChip key={i} logo={l}/>)}
        </div>
        <div style={{ display:"flex", gap:10, width:"max-content",
          animation:"marquee-right 38s linear infinite" }}>
          {row2.map((l, i) => <LogoChip key={i} logo={l}/>)}
        </div>
      </div>
    </div>
  );
}

export default LogoMarquee;
