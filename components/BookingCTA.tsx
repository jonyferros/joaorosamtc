"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";

// ─────────────────────────────────────────────────────────────────────────────
// BookingCTA — full-width dark section with two outlined CTA buttons.
// ─────────────────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function BookingCTA() {
  const { t } = useLanguage();
  const b = t.bookingCta;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="booking" className="bg-dark py-24 lg:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.h2
          className="font-cormorant font-light text-4xl md:text-6xl text-white leading-[1.1]"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {b.heading}
        </motion.h2>

        <motion.p
          className="mt-6 font-dm-sans font-light text-white/70 text-base leading-relaxed max-w-md"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          {b.body}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        >
          <a
            href="https://thenaturalclinic.ie/appointment/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-light"
          >
            {b.ctaCork}
          </a>

          <a href="mailto:info@joaorosamtc.com" className="btn-outline-light">
            {b.ctaPortugal}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
