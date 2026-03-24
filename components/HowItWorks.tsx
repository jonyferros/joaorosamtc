"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";

// ─────────────────────────────────────────────────────────────────────────────
// HowItWorks — 3-step process: large muted numerals, titles, body text.
// Horizontal row on desktop, stacked on mobile. Staggered scroll animation.
// ─────────────────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HowItWorks() {
  const { t } = useLanguage();
  const h = t.howItWorks;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" className="bg-bg py-24 lg:py-32" ref={ref}>
      <hr className="border-border max-w-7xl mx-auto mb-24" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Label */}
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {h.label}
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="font-cormorant font-light text-4xl md:text-5xl text-dark mt-4 leading-[1.1]"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          {h.heading}
        </motion.h2>

        {/* Steps */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {h.steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 + index * 0.15 }}
            >
              {/* Large muted step numeral */}
              <span
                className="font-cormorant font-light text-[5rem] md:text-[6rem] leading-none select-none"
                style={{ color: "#D6CFC4" }}
                aria-hidden="true"
              >
                {step.number}
              </span>

              <h3 className="font-cormorant font-semibold text-2xl text-dark mt-2 mb-4">
                {step.title}
              </h3>

              <p className="font-dm-sans font-light text-text text-sm leading-[1.8]">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
