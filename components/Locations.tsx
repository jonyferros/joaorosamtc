"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";

// ─────────────────────────────────────────────────────────────────────────────
// Locations — two clinic cards side by side on desktop, stacked on mobile.
// Cards: --surface background, 2px left border in accent-green, sharp corners.
// ─────────────────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Locations() {
  const { t } = useLanguage();
  const l = t.locations;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="locations" className="bg-surface py-24 lg:py-32" ref={ref}>
      <hr className="border-border max-w-7xl mx-auto mb-24" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Label */}
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {l.label}
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="font-cormorant font-light text-4xl md:text-5xl text-dark mt-4 leading-[1.1]"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          {l.heading1}
          <br />
          <em className="italic font-light">{l.heading2}</em>
        </motion.h2>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ── Ireland card ──────────────────────────────────────── */}
          <motion.div
            className="bg-bg border-l-2 border-l-accent-green overflow-hidden"
            style={{
              borderTop: "1px solid #D6CFC4",
              borderRight: "1px solid #D6CFC4",
              borderBottom: "1px solid #D6CFC4",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          >
            <div className="flex gap-0">
              {/* Info */}
              <div className="flex-1 p-8">
                <div className="text-2xl mb-4" aria-label="Ireland" role="img">
                  {l.ireland.flag}
                </div>

                <h3 className="font-cormorant font-semibold text-2xl text-dark mb-2">
                  {l.ireland.clinic}
                </h3>

                <p className="font-dm-sans font-light text-text text-sm leading-relaxed mb-1">
                  {l.ireland.address}
                </p>

                <a
                  href={`https://${l.ireland.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-dm-mono text-[0.65rem] tracking-[0.12em] uppercase text-muted hover:text-accent-green transition-colors"
                >
                  {l.ireland.website}
                </a>

                <div className="mt-3 flex items-center gap-3">
                  <a
                    href={`tel:${l.ireland.phone.replace(/\s/g, "")}`}
                    className="font-dm-mono text-[0.65rem] tracking-[0.12em] uppercase text-muted hover:text-accent-green transition-colors"
                  >
                    {l.ireland.phone}
                  </a>
                  <a
                    href={l.ireland.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="font-dm-mono text-[0.65rem] tracking-[0.12em] uppercase text-accent-green hover:opacity-70 transition-opacity"
                  >
                    WhatsApp ↗
                  </a>
                </div>

                <p className="mt-6 font-dm-sans font-light text-muted text-sm">
                  {l.ireland.note}
                </p>

                <div className="mt-6">
                  <a
                    href={l.ireland.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-block text-sm"
                  >
                    {l.ireland.cta}
                  </a>
                </div>
              </div>

              {/* Square map */}
              <div className="shrink-0 p-8 pl-0 flex items-start">
                <div style={{ width: 120, height: 120, overflow: "hidden", flexShrink: 0 }}>
                  <iframe
                    title="The Natural Clinic, Cork"
                    src="https://maps.google.com/maps?q=The+Natural+Clinic,+23+Sullivans+Quay,+Cork,+Ireland&output=embed"
                    width="120"
                    height="120"
                    style={{ border: 0, display: "block" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Portugal card ─────────────────────────────────────── */}
          <motion.div
            className="bg-bg border-l-2 border-l-accent-green overflow-hidden"
            style={{
              borderTop: "1px solid #D6CFC4",
              borderRight: "1px solid #D6CFC4",
              borderBottom: "1px solid #D6CFC4",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
          >
            <div className="flex gap-0">
              {/* Info */}
              <div className="flex-1 p-8">
                <div className="text-2xl mb-4" aria-label="Portugal" role="img">
                  {l.portugal.flag}
                </div>

                <h3 className="font-cormorant font-semibold text-2xl text-dark mb-2">
                  {l.portugal.clinic}
                </h3>

                <p className="font-dm-sans font-light text-text text-sm leading-relaxed mb-1">
                  {l.portugal.address}
                </p>

                {/* Phone + WhatsApp shortcut side by side */}
                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${l.portugal.phone.replace(/\s/g, "")}`}
                    className="font-dm-mono text-[0.65rem] tracking-[0.12em] uppercase text-muted hover:text-accent-green transition-colors"
                  >
                    {l.portugal.phone}
                  </a>
                  <a
                    href={l.portugal.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="font-dm-mono text-[0.65rem] tracking-[0.12em] uppercase text-accent-green hover:opacity-70 transition-opacity"
                  >
                    WhatsApp ↗
                  </a>
                </div>

                <p className="mt-6 font-dm-sans font-light text-muted text-sm">
                  {l.portugal.note}
                </p>

                <div className="mt-6">
                  <a
                    href="/booking"
                    className="btn-primary inline-block text-sm"
                  >
                    {l.portugal.cta}
                  </a>
                </div>
              </div>

              {/* Square map */}
              <div className="shrink-0 p-8 pl-0 flex items-start">
                <div style={{ width: 120, height: 120, overflow: "hidden", flexShrink: 0 }}>
                  <iframe
                    title="Natursol, Quarteira"
                    src="https://maps.google.com/maps?q=Rua+Infante+Santo+Loja+4,+8125-224+Quarteira,+Portugal&output=embed&z=16"
                    width="120"
                    height="120"
                    style={{ border: 0, display: "block" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
