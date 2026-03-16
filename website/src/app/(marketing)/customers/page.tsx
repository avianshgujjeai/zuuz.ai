import type { Metadata } from "next";
import Link from "next/link";
import { customers } from "@/content/customers";
import { Breadcrumb } from "@/components/ui/breadcrumbs";
import { Btn } from "@/components/ui/Btn";
import { CustomerLogoWall } from "@/components/marketing/CustomerLogoWall";
import { CountUpBanner } from "@/components/marketing/CountUpBanner";

export const metadata: Metadata = {
  title: "Customers — ZUUZ",
  description:
    "See how enterprise teams at Western International, Nesto Group, RA Technologies, and Cloud Box Technologies use ZUUZ to close the gap between AI and action.",
};

/* ─── Testimonials ───────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: "ZUUZ gave us one place to see everything — our SAP data, our emails, our approvals — and act on it without switching systems. Procurement that used to take days now happens before lunch.",
    name: "Senior Operations Director",
    company: "Western International Group, UAE",
    initials: "WI",
    color: "#0018FF",
  },
  {
    quote: "Before ZUUZ, our procurement team was chasing approvals across SAP and Outlook separately. Now every decision arrives with full context — budget, vendor history, policy flags — all in one screen. It changed how we operate.",
    name: "Head of Procurement",
    company: "Nesto Group, UAE",
    initials: "NG",
    color: "#7C3AED",
  },
  {
    quote: "Our reps were spending hours every week updating Zoho after calls and chasing approvals on email. ZUUZ made that invisible. The CRM updates itself, approvals route automatically, and our team just sells.",
    name: "CEO",
    company: "RA Technologies LLC, USA",
    initials: "RA",
    color: "#10B981",
  },
  {
    quote: "ZUUZ connected our Zoho and Microsoft world in ways we didn't think were possible this fast. Proposals get reviewed, contracts get flagged, meetings turn into actions — all without anyone having to remember to do it.",
    name: "Managing Director",
    company: "Cloud Box Technologies, UAE",
    initials: "CB",
    color: "#F59E0B",
  },
];

/* ─── Logo wall data ─────────────────────────────────────── */
const LOGOS = [
  ...customers.map((c) => ({
    src: c.logo,
    alt: c.name,
    industry: c.industry,
    location: c.location,
    slug: c.slug,
  })),
  {
    src: "/logos/one-plus-one-tech.png",
    alt: "One + One Tech",
    industry: "Strategic Partner",
    location: "Central USA",
    slug: "one-plus-one-tech",
    isPartner: true,
  },
];

export default function CustomersPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: 72,
          paddingBottom: 72,
          background: "#fff",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Customers" }]} />
          <div className="sr" style={{ marginTop: 24, maxWidth: 720 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#EFF6FF",
                borderRadius: 999,
                padding: "6px 16px",
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#0018FF",
                  fontFamily: "var(--font-body)",
                }}
              >
                Customer Stories
              </span>
            </div>
            <h1 style={{ marginBottom: 20 }}>
              Trusted by enterprise
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #0018FF 0%, #7C3AED 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                operations teams
              </span>
            </h1>
            <p
              style={{
                fontSize: 18,
                color: "#64748B",
                lineHeight: 1.75,
                marginBottom: 32,
                maxWidth: 580,
                fontFamily: "var(--font-body)",
              }}
            >
              ZUUZ is deployed across enterprises in the UAE and USA, unifying SAP, Zoho, and
              Microsoft 365 into a single agentic execution layer.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
              {["4 Enterprises in Production", "UAE & USA"].map((chip) => (
                <span
                  key={chip}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    border: "1px solid #E2E8F0",
                    borderRadius: 999,
                    padding: "6px 16px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#0A0F1E",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#10B981",
                      flexShrink: 0,
                    }}
                  />
                  {chip}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Btn href="/about/contact" size="lg">
                Request a demo
              </Btn>
              <Btn href="#case-studies" variant="secondary" size="lg">
                See case studies
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Logo Wall ── */}
      <section
        style={{
          padding: "64px 0",
          borderTop: "1px solid #F1F5F9",
          borderBottom: "1px solid #F1F5F9",
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <p
            style={{
              textAlign: "center",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#94A3B8",
              fontFamily: "var(--font-body)",
              marginBottom: 32,
            }}
          >
            Deployed at
          </p>
          <CustomerLogoWall logos={LOGOS} />
        </div>
      </section>

      {/* ── 3. Use Case Cards 2×2 ── */}
      <section id="case-studies" style={{ padding: "88px 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sr" style={{ textAlign: "center", marginBottom: 52 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#0018FF",
                fontFamily: "var(--font-body)",
                marginBottom: 12,
              }}
            >
              Case Studies
            </p>
            <h2 style={{ color: "#0A0F1E", marginBottom: 14 }}>
              From messy approvals to governed outcomes
            </h2>
            <p
              style={{
                fontSize: 18,
                color: "#64748B",
                maxWidth: 540,
                margin: "0 auto",
                fontFamily: "var(--font-body)",
              }}
            >
              Each deployment is a live integration — SAP, Zoho, Microsoft 365 — with AI Agents
              acting on real data and writing back to source systems.
            </p>
          </div>
          <div className="cs-cards-grid">
            {customers.map((c, i) => (
              <Link
                key={c.slug}
                href={`/customers/${c.slug}`}
                className={`card-lift sr d${i + 1}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "#fff",
                  border: "1px solid #E2E8F0",
                  borderRadius: 20,
                  padding: 28,
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 12,
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "#64748B",
                        fontFamily: "var(--font-body)",
                        marginBottom: 4,
                      }}
                    >
                      {c.industry} · {c.location}
                    </p>
                    <h3
                      style={{
                        fontSize: 20,
                        color: "#0A0F1E",
                        fontFamily: "var(--font-display)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {c.name}
                    </h3>
                    <p
                      style={{
                        fontSize: 12,
                        color: "#94A3B8",
                        fontFamily: "var(--font-body)",
                        marginTop: 4,
                      }}
                    >
                      {c.stack}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      background: "#EFF6FF",
                      color: "#0018FF",
                      padding: "4px 10px",
                      borderRadius: 999,
                      fontFamily: "var(--font-body)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.location}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: 14,
                    color: "#64748B",
                    lineHeight: 1.7,
                    marginBottom: 24,
                    flex: 1,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {c.heroSub}
                </p>

                {/* Top 2 results */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                  {c.results.slice(0, 2).map((r) => (
                    <div
                      key={r.label}
                      style={{
                        background: "#EFF6FF",
                        borderRadius: 12,
                        padding: "12px 14px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 24,
                          fontWeight: 900,
                          color: "#0018FF",
                          fontFamily: "var(--font-display)",
                          letterSpacing: "-0.03em",
                          lineHeight: 1,
                        }}
                      >
                        {r.metric}
                      </p>
                      <p
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#1E293B",
                          fontFamily: "var(--font-body)",
                          marginTop: 4,
                        }}
                      >
                        {r.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#0018FF",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Read case study
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <style>{`
          .cs-cards-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
          @media (max-width: 767px) { .cs-cards-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── 4. Results Bar ── */}
      <CountUpBanner
        stats={[
          { target: 70,  suffix: "%+", label: "Faster Procurement",     sublabel: "vs. pre-ZUUZ baseline" },
          { target: 100, suffix: "%",  label: "Audit Coverage",         sublabel: "on every transaction" },
          { target: 0,   suffix: "",   label: "Saved per User / Week",  static: "5+ hrs" },
          { target: 4,   suffix: "",   label: "Enterprises in Production", sublabel: "UAE & USA" },
        ]}
      />

      {/* ── 5. Testimonials 2×2 ── */}
      <section style={{ padding: "88px 0", background: "#F8FAFC" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sr" style={{ textAlign: "center", marginBottom: 52 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#0018FF",
                fontFamily: "var(--font-body)",
                marginBottom: 12,
              }}
            >
              What customers say
            </p>
            <h2 style={{ color: "#0A0F1E" }}>In their own words</h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.company}
                className={`sr d${i + 1}`}
                style={{
                  background: "#fff",
                  border: "1px solid #F1F5F9",
                  borderRadius: 20,
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Opening quote mark */}
                <p
                  style={{
                    fontSize: 72,
                    lineHeight: 0.8,
                    color: "#BFDBFE",
                    fontFamily: "Georgia, serif",
                    marginBottom: 16,
                    userSelect: "none",
                  }}
                >
                  &ldquo;
                </p>
                <p
                  style={{
                    fontSize: 16,
                    fontStyle: "italic",
                    color: "#334155",
                    lineHeight: 1.75,
                    flex: 1,
                    marginBottom: 24,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {t.quote}
                </p>
                {/* Attribution */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: t.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: "#fff",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#0A0F1E",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: "#64748B",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .testimonials-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
          @media (max-width: 767px) { .testimonials-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── 6. Strategic Partner ── */}
      <section style={{ padding: "88px 0", background: "#F8FAFC", borderTop: "1px solid #F1F5F9" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sr" style={{ textAlign: "center", marginBottom: 40 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#0018FF",
                fontFamily: "var(--font-body)",
                marginBottom: 12,
              }}
            >
              Strategic Partnership
            </p>
            <h2 style={{ color: "#0A0F1E" }}>Expanding across the US market</h2>
          </div>

          <div
            className="sr d1"
            style={{
              maxWidth: 760,
              margin: "0 auto",
              background: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: 24,
              padding: "40px 48px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#ECFDF5",
                borderRadius: 999,
                padding: "6px 16px",
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#10B981",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#10B981",
                  fontFamily: "var(--font-body)",
                }}
              >
                Strategic Partner · Central USA
              </span>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/one-plus-one-tech.png"
              alt="One + One Tech"
              style={{ maxWidth: 220, maxHeight: 80, objectFit: "contain", marginBottom: 16 }}
            />
            <h3
              style={{
                fontSize: 26,
                color: "#0A0F1E",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
                marginBottom: 14,
              }}
            >
              One + One Tech
            </h3>

            <p
              style={{
                fontSize: 16,
                color: "#64748B",
                lineHeight: 1.75,
                maxWidth: 540,
                margin: "0 auto 24px",
                fontFamily: "var(--font-body)",
              }}
            >
              Delivering ZUUZ&apos;s agentic AI execution platform to enterprise accounts in the
              Central United States, bringing intelligent workflow automation to mid-market and
              enterprise operations teams.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                color: "#64748B",
                fontFamily: "var(--font-body)",
                marginBottom: 24,
              }}
            >
              📍 Central United States
            </div>

            <div>
              <Btn href="/about/contact" variant="secondary">
                Contact us about partnerships →
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Dark CTA ── */}
      <section style={{ padding: "88px 0", background: "var(--bg-dark)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sr" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", marginBottom: 16 }}>
              Ready to see ZUUZ in action?
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "#94A3B8",
                lineHeight: 1.75,
                marginBottom: 40,
                fontFamily: "var(--font-body)",
              }}
            >
              Book a 20-minute demo. Bring your messiest approval workflow — we&apos;ll show you
              what changes.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <Btn variant="primary" size="lg" href="/about/contact">
                Request a demo
              </Btn>
              <Btn variant="dark-outline" size="lg" href="/about/contact">
                Talk to an expert
              </Btn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
