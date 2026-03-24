"use client";

// ─────────────────────────────────────────────────────────────────────────────
// GrainOverlay — CSS-only SVG noise texture overlay.
// Renders an absolutely-positioned div that sits above the hero background
// to give it an editorial film-grain feel without any external assets.
// ─────────────────────────────────────────────────────────────────────────────

export default function GrainOverlay() {
  return (
    <>
      {/* Inline SVG filter definition — referenced by the CSS below */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <defs>
          <filter id="grain-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      {/* The grain overlay itself — pointer-events: none so it doesn't block clicks */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          filter: "url(#grain-filter)",
          opacity: 0.045,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </>
  );
}
