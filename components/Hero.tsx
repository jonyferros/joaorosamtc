"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import GrainOverlay from "./GrainOverlay";

// ─────────────────────────────────────────────────────────────────────────────
// Hero — full-viewport section with:
//   Left:  label, headline, sub-heading, CTA, location strip
//   Right: editorial stats fact strip + customer quote (desktop only)
// ─────────────────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function fadeIn(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay },
  };
}

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section
      id="hero"
      className="relative flex flex-col min-h-screen bg-bg overflow-hidden pt-16"
      aria-label="Hero"
    >
      {/* CSS-only SVG grain texture overlay */}
      <GrainOverlay />

      {/* ── Main content grid ──────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-6 lg:px-12 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 xl:gap-24 w-full items-center">

          {/* ── Left column — headline content ────────────────────── */}
          <div>
            <motion.div className="section-label mb-8" {...fadeIn(0.1)}>
              {h.label}
            </motion.div>

            <motion.h1
              className="font-cormorant font-light text-5xl md:text-7xl lg:text-8xl text-dark leading-[1.05] max-w-4xl"
              {...fadeIn(0.25)}
            >
              {h.headline1}
              <br />
              <em className="not-italic font-light italic">{h.headline2}</em>
            </motion.h1>

            <motion.p
              className="mt-8 font-dm-sans font-light text-base md:text-lg text-text max-w-xl leading-relaxed"
              {...fadeIn(0.45)}
            >
              {h.sub}
            </motion.p>

            <motion.div className="mt-10" {...fadeIn(0.6)}>
              <a href="#booking" className="btn-primary">
                {h.cta}
              </a>
            </motion.div>
          </div>

          {/* ── Right column — stats + quote (hidden on mobile) ────── */}
          <motion.aside
            className="hidden lg:flex flex-col gap-0 self-center"
            {...fadeIn(0.5)}
            aria-label="Key facts and patient testimonial"
          >
            {/* Stat rows — each has a thin top border */}
            {h.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="py-4 border-t border-border first:border-t-0"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.55 + i * 0.08 }}
              >
                <p className="font-dm-mono text-[0.6rem] tracking-[0.14em] uppercase text-muted mb-1">
                  {stat.label}
                </p>
                <p className="font-dm-sans font-light text-sm text-dark">
                  {stat.value}
                </p>
              </motion.div>
            ))}

            {/* Customer quote — separated by a thicker accent line */}
            <motion.blockquote
              className="mt-6 pt-6 border-t-2 border-accent-green"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
            >
              {/* Opening quote mark — decorative */}
              <span
                className="font-cormorant font-light text-5xl leading-none text-accent-green select-none"
                aria-hidden="true"
              >
                "
              </span>
              <p className="font-cormorant font-light text-lg italic text-dark leading-snug -mt-3">
                {h.quote.text}
              </p>
              <footer className="mt-3 font-dm-mono text-[0.6rem] tracking-[0.12em] uppercase text-muted">
                — {h.quote.author}, {h.quote.location}
              </footer>
            </motion.blockquote>
          </motion.aside>
        </div>
      </div>

      {/* ── Bottom strip — animated line + location ────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-10">
        {/* Line draws left-to-right on load via CSS animation in globals.css */}
        <div className="overflow-hidden mb-4">
          <div
            className="hero-line h-px bg-border"
            style={{ width: 0 }}
            aria-hidden="true"
          />
        </div>

        <motion.p
          className="font-dm-mono text-[0.65rem] tracking-[0.12em] uppercase text-muted"
          {...fadeIn(0.85)}
        >
          {h.location}
        </motion.p>
      </div>
    </section>
  );
}
