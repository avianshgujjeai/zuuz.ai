export function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-multiply"
      aria-hidden="true"
    >
      <svg width="100%" height="100%">
        <filter id="zuuz-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#zuuz-noise)" />
      </svg>
    </div>
  );
}
