import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseStudy, getAllCaseStudySlugs } from "@/content/customers";
import { Breadcrumb } from "@/components/ui/breadcrumbs";
import { Btn } from "@/components/ui/Btn";
import { CountUpBanner } from "@/components/marketing/CountUpBanner";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return { title: cs.meta.title, description: cs.meta.description };
}

/* ─── Industry badge colors ─────────────────────────────── */
const INDUSTRY_COLORS: Record<string, { bg: string; color: string }> = {
  "Distribution & Trading": { bg: "#FEF3C7", color: "#D97706" },
  "Retail & Distribution":  { bg: "#F5F3FF", color: "#7C3AED" },
  "IT Services":            { bg: "#EFF6FF", color: "#0018FF" },
  "IT Services & Cloud":    { bg: "#ECFDF5", color: "#10B981" },
};

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const industryStyle = INDUSTRY_COLORS[cs.industry] ?? { bg: "#F1F5F9", color: "#64748B" };

  /* Build CountUpBanner stats from results */
  const bannerStats = cs.results.map((r) => ({
    target: 0,
    suffix: "",
    label: r.label,
    sublabel: r.desc,
    static: r.metric,
  }));

  return (
    <>
      {/* ── 1. Breadcrumb + Hero ── */}
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
          <Breadcrumb
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Customers", href: "/customers" },
              { label: cs.name },
            ]}
          />

          <div style={{ marginTop: 24 }} className="case-hero-grid">
            {/* Left */}
            <div className="sr">
              {/* Badges row */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: 999,
                    fontFamily: "var(--font-body)",
                    background: industryStyle.bg,
                    color: industryStyle.color,
                  }}
                >
                  {cs.industry}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "4px 12px",
                    borderRadius: 999,
                    background: "#F1F5F9",
                    color: "#475569",
                    fontFamily: "var(--font-body)",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  {cs.stack}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "4px 12px",
                    borderRadius: 999,
                    background: "#F1F5F9",
                    color: "#475569",
                    fontFamily: "var(--font-body)",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  📍 {cs.location}
                </span>
              </div>

              <h1 style={{ marginBottom: 16 }}>{cs.name}</h1>
              <p
                style={{
                  fontSize: 18,
                  color: "#64748B",
                  lineHeight: 1.75,
                  marginBottom: 32,
                  maxWidth: 520,
                  fontFamily: "var(--font-body)",
                }}
              >
                {cs.heroSub}
              </p>
              <Btn href="/about/contact" size="lg">
                Request a similar demo →
              </Btn>
            </div>

            {/* Right — logo / visual */}
            <div
              className="sr-x d1"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: 24,
                padding: 40,
                minHeight: 200,
              }}
            >
              <div style={{ textAlign: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cs.logo}
                  alt={cs.name}
                  style={{
                    maxWidth: 160,
                    maxHeight: 60,
                    objectFit: "contain",
                    marginBottom: 12,
                    filter: "grayscale(10%)",
                  }}
                />
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#111827",
                    fontFamily: "Montserrat, sans-serif",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    marginBottom: 6,
                  }}
                >
                  {cs.name}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "#94A3B8",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {cs.industry} · {cs.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .case-hero-grid {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            gap: 56px;
            align-items: center;
          }
          @media (max-width: 767px) {
            .case-hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
        `}</style>
      </section>

      {/* ── 2. Results Bar ── */}
      <CountUpBanner stats={bannerStats} />

      {/* ── 3. Challenge → Solution ── */}
      <section style={{ padding: "88px 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="challenge-grid">
            <div className="sr">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "#FEE2E2",
                    color: "#DC2626",
                    fontSize: 13,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-body)",
                    flexShrink: 0,
                  }}
                >
                  1
                </span>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#DC2626",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  The Challenge
                </p>
              </div>
              <p
                style={{
                  fontSize: 16,
                  color: "#334155",
                  lineHeight: 1.8,
                  fontFamily: "var(--font-body)",
                }}
              >
                {cs.challenge}
              </p>
            </div>
            <div className="sr d2">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "#EFF6FF",
                    color: "#0018FF",
                    fontSize: 13,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-body)",
                    flexShrink: 0,
                  }}
                >
                  2
                </span>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#0018FF",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  The ZUUZ Solution
                </p>
              </div>
              <p
                style={{
                  fontSize: 16,
                  color: "#334155",
                  lineHeight: 1.8,
                  fontFamily: "var(--font-body)",
                }}
              >
                {cs.solution}
              </p>
            </div>
          </div>
        </div>
        <style>{`
          .challenge-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
          @media (max-width: 767px) { .challenge-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
        `}</style>
      </section>

      {/* ── 4. Pull Quote ── */}
      <section
        style={{
          padding: "88px 0",
          background: "#F8FAFC",
          borderTop: "1px solid #F1F5F9",
          borderBottom: "1px solid #F1F5F9",
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sr" style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <p
              style={{
                fontSize: 72,
                lineHeight: 0.8,
                color: "#BFDBFE",
                fontFamily: "Georgia, serif",
                marginBottom: 20,
                userSelect: "none",
              }}
            >
              &ldquo;
            </p>
            <p
              style={{
                fontSize: 22,
                fontStyle: "italic",
                fontWeight: 500,
                color: "#1E293B",
                lineHeight: 1.7,
                marginBottom: 40,
                fontFamily: "var(--font-body)",
              }}
            >
              {cs.quote}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <div style={{ height: 1, width: 48, background: "#E2E8F0" }} />
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#0A0F1E",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {cs.quoteName}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#64748B",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {cs.quoteCompany}
                </p>
              </div>
              <div style={{ height: 1, width: 48, background: "#E2E8F0" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Agents & Connectors ── */}
      <section style={{ padding: "88px 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="chips-grid">
            <div className="sr">
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#94A3B8",
                  fontFamily: "var(--font-body)",
                  marginBottom: 20,
                }}
              >
                AI Agents Used
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cs.agents.map((agent) => (
                  <span
                    key={agent}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "#EFF6FF",
                      border: "1px solid rgba(37,99,235,0.15)",
                      borderRadius: 999,
                      padding: "8px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#0018FF",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#0018FF",
                        flexShrink: 0,
                      }}
                    />
                    {agent}
                  </span>
                ))}
              </div>
            </div>
            <div className="sr d2">
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#94A3B8",
                  fontFamily: "var(--font-body)",
                  marginBottom: 20,
                }}
              >
                Systems Connected
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cs.connectors.map((connector) => (
                  <span
                    key={connector}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      background: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                      borderRadius: 999,
                      padding: "8px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#334155",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {connector}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Back link */}
          <div style={{ marginTop: 56, textAlign: "center" }}>
            <Link
              href="/customers"
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#64748B",
                fontFamily: "var(--font-body)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              ← Back to all customers
            </Link>
          </div>
        </div>
        <style>{`
          .chips-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; }
          @media (max-width: 767px) { .chips-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
        `}</style>
      </section>

      {/* ── 6. CTA ── */}
      <section style={{ padding: "88px 0", background: "var(--bg-dark)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div className="sr" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", marginBottom: 16 }}>
              See what ZUUZ can do for your team
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
              Book a 20-minute demo. Bring your messiest approval workflow — we&apos;ll show you what
              changes.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <Btn variant="primary" size="lg" href="/about/contact">
                Request a demo
              </Btn>
              <Btn variant="dark-outline" size="lg" href="/customers">
                View all case studies
              </Btn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
