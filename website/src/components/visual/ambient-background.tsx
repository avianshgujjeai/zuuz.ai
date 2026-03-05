export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
      {/* Orb 1 — top-left, sky blue */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.12] orb-1"
        style={{ background: "radial-gradient(circle, #A3F3FF 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      {/* Orb 2 — bottom-right, electric blue */}
      <div
        className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full opacity-[0.08] orb-2"
        style={{ background: "radial-gradient(circle, #0018FF 0%, transparent 70%)", filter: "blur(100px)" }}
      />
      {/* Orb 3 — center, subtle blend */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full opacity-[0.06] orb-3"
        style={{ background: "radial-gradient(circle, #A3F3FF 0%, transparent 60%)", filter: "blur(70px)" }}
      />
      {/* Subtle dot overlay */}
      <div className="absolute inset-0 bg-dot opacity-[0.15]" />
    </div>
  );
}
