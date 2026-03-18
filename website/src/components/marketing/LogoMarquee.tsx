"use client";

const LOGOS = [
  { name: "Slack",        file: "/brand-icons/slack-icon.svg"        },
  { name: "Teams",        file: "/brand-icons/microsoft-teams.svg"   },
  { name: "Jira",         file: "/brand-icons/jira.svg"              },
  { name: "SAP",          file: "/brand-icons/sap.svg"               },
  { name: "Oracle",       file: "/brand-icons/oracle.svg"            },
  { name: "HubSpot",      file: "/brand-icons/hubspot.svg"           },
  { name: "Zoho",         file: "/brand-icons/zoho.svg"              },
  { name: "Google Drive", file: "/brand-icons/google-drive.svg"      },
  { name: "OneDrive",     file: "/brand-icons/microsoft-onedrive.svg"},
  { name: "Notion",       file: "/brand-icons/notion-icon.svg"       },
  { name: "Zoom",         file: "/brand-icons/zoom-icon.svg"         },
  { name: "Monday",       file: "/brand-icons/monday-icon.svg"       },
  { name: "Zapier",       file: "/brand-icons/zapier.svg"            },
  { name: "Airtable",     file: "/brand-icons/airtable.svg"          },
  { name: "Box",          file: "/brand-icons/box.svg"               },
  { name: "Dropbox",      file: "/brand-icons/dropbox.svg"           },
  { name: "Google Meet",  file: "/brand-icons/google-meet.svg"       },
  { name: "Qlik",         file: "/brand-icons/qlik.svg"              },
];

function Chip({ logo }: { logo: typeof LOGOS[0] }) {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 9,
      height: 40,
      padding: "0 16px",
      background: "#ffffff",
      border: "1px solid #E8E8EE",
      borderRadius: 999,
      flexShrink: 0,
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      whiteSpace: "nowrap",
    }}>
      {/* Icon box — MUST have overflow:hidden and explicit dimensions */}
      <span style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 24,
        height: 24,
        minWidth: 24,
        maxWidth: 24,
        minHeight: 24,
        maxHeight: 24,
        flexShrink: 0,
        overflow: "hidden",
        borderRadius: 5,
      }}>
        <img
          src={logo.file}
          alt=""
          aria-hidden="true"
          style={{
            /* CSS width/height ARE respected for SVGs; HTML attrs are NOT */
            width: "20px",
            height: "20px",
            minWidth: "20px",
            maxWidth: "20px",
            minHeight: "20px",
            maxHeight: "20px",
            objectFit: "contain",
            display: "block",
            flexShrink: 0,
          }}
          onError={e => {
            (e.currentTarget.parentElement as HTMLElement).style.display = "none";
          }}
        />
      </span>
      <span style={{
        fontSize: 13,
        fontWeight: 500,
        color: "#222",
        fontFamily: "'Montserrat', sans-serif",
        lineHeight: 1,
        maxWidth: 110,
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}>
        {logo.name}
      </span>
    </div>
  );
}

export function LogoMarquee() {
  const row1 = [...LOGOS, ...LOGOS];
  const row2 = [
    ...LOGOS.slice(9), ...LOGOS.slice(0, 9),
    ...LOGOS.slice(9), ...LOGOS.slice(0, 9),
  ];

  return (
    <section
      style={{
        paddingTop: 28,
        paddingBottom: 28,
        position: "relative",
        overflow: "hidden",
        width: "100%",
        background: "#ffffff",
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#555555",
          marginBottom: 18,
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        Connects with the tools your teams already use
      </p>

      {/* Left fade mask */}
      <div
        style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 80,
          zIndex: 10, pointerEvents: "none",
          background: "linear-gradient(to right, #ffffff 20%, transparent)",
        }}
      />
      {/* Right fade mask */}
      <div
        style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 80,
          zIndex: 10, pointerEvents: "none",
          background: "linear-gradient(to left, #ffffff 20%, transparent)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Row 1 — scrolls left */}
        <div
          style={{
            display: "flex", gap: 10, alignItems: "center",
            width: "max-content",
            animation: "marquee-left 36s linear infinite",
            willChange: "transform",
          }}
        >
          {row1.map((l, i) => <Chip key={i} logo={l} />)}
        </div>
        {/* Row 2 — scrolls right */}
        <div
          style={{
            display: "flex", gap: 10, alignItems: "center",
            width: "max-content",
            animation: "marquee-right 42s linear infinite",
            willChange: "transform",
          }}
        >
          {row2.map((l, i) => <Chip key={i} logo={l} />)}
        </div>
      </div>
    </section>
  );
}

export default LogoMarquee;
