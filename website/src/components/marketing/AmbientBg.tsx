export function AmbientBg() {
  return (
    <div
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: -1 }}
      aria-hidden="true"
    >
      {/* Blue orb — top right */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          top: -200,
          right: -150,
          background: "radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "orb1 24s ease-in-out infinite",
        }}
      />
      {/* Violet orb — center left */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          top: "30%",
          left: -100,
          background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orb2 30s ease-in-out infinite",
        }}
      />
      {/* Green orb — bottom right */}
      <div
        style={{
          position: "absolute",
          width: 450,
          height: 450,
          borderRadius: "50%",
          bottom: -100,
          right: "10%",
          background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "orb3 20s ease-in-out infinite",
        }}
      />
    </div>
  );
}
