"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";

// ─────────────────────────────────────────────────────────────────────────────
// Services / Conditions — flowing tag grid with staggered scroll animation.
// Tags use 1px accent-green border; hover fills to green.
// ─────────────────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Services() {
  const { t } = useLanguage();
  const s = t.services;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="bg-surface py-24 lg:py-32" ref={ref}>
      <hr className="border-border max-w-7xl mx-auto mb-24" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Label */}
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {s.label}
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="font-cormorant font-light text-4xl md:text-5xl text-dark mt-4 leading-[1.1]"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          {s.heading}
        </motion.h2>

        {/* Intro */}
        <motion.p
          className="mt-6 font-dm-sans font-light text-text text-base leading-relaxed max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        >
          {s.intro}
        </motion.p>

        {/* Conditions tag grid — staggered reveal on scroll */}
        <div className="mt-12 flex flex-wrap gap-2">
          {s.conditions.map((condition, index) => (
            <motion.span
              key={condition}
              className="condition-tag"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{
                duration: 0.5,
                ease: EASE,
                delay: 0.3 + index * 0.05,
              }}
            >
              {condition}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
