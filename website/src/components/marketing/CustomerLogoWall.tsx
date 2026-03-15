"use client";

import { useEffect, useRef, useState } from "react";

interface LogoDef {
  src: string;
  alt: string;
  industry: string;
  location: string;
  slug: string;
}

function LogoItem({
  logo,
  index,
  parentVisible,
}: {
  logo: LogoDef;
  index: number;
  parentVisible: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "32px 24px",
        border: "1px solid #F1F5F9",
        borderRadius: 16,
        background: "#fff",
        opacity: parentVisible ? 1 : 0,
        transform: parentVisible ? "scale(1)" : "scale(0.9)",
        transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms`,
      }}
    >
      {/* Logo image — fallback to styled name */}
      <div
        style={{
          minHeight: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {imgError ? (
          /* Text fallback */
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#111827",
              fontFamily: "Montserrat, sans-serif",
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            {logo.alt}
          </span>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={logo.src}
            alt={logo.alt}
            style={{
              maxWidth: 180,
              maxHeight: 64,
              objectFit: "contain",
              filter: "grayscale(20%)",
              display: imgLoaded ? "block" : "none",
            }}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}
        {/* Skeleton while loading */}
        {!imgLoaded && !imgError && (
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#94A3B8",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {logo.alt}
          </span>
        )}
      </div>

      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontSize: 11,
            color: "#94A3B8",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
          }}
        >
          {logo.industry} · {logo.location}
        </p>
      </div>
    </div>
  );
}

export function CustomerLogoWall({ logos }: { logos: LogoDef[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="logo-wall-grid">
      {logos.map((logo, i) => (
        <LogoItem key={logo.slug} logo={logo} index={i} parentVisible={visible} />
      ))}
      <style>{`
        .logo-wall-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 767px) {
          .logo-wall-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
