"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";

// ─────────────────────────────────────────────────────────────────────────────
// About — 2-column desktop layout: portrait photo left, bio text right.
// Photo has a 1px forest-green offset frame via CSS translate technique.
// ─────────────────────────────────────────────────────────────────────────────

// Shared easing for all scroll animations
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function fadeIn(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay },
  };
}

export default function About() {
  const { t } = useLanguage();
  const a = t.about;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="bg-bg py-24 lg:py-32" ref={ref}>
      <hr className="border-border max-w-7xl mx-auto mb-24" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Photo column ──────────────────────────────────────── */}
          <motion.div
            {...(isInView ? fadeIn(0) : { initial: { opacity: 0, y: 24 } })}
            className="relative"
          >
            {/*
              Offset frame technique:
              - A sibling div behind the image is offset 12px right + down
                and carries the 1px accent-green border.
              - The image wrapper itself has the same 1px border on top.
            */}
            <div className="relative inline-block">
              {/* Offset decorative border — sits behind the image */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3"
                style={{ border: "1px solid #3D5A36" }}
              />

              {/* Portrait image with its own border */}
              <div style={{ border: "1px solid #3D5A36" }}>
                <Image
                  src="/images/joao-rosa.jpg"
                  alt="João Rosa — Licensed Acupuncturist and TCM Practitioner"
                  width={480}
                  height={600}
                  className="block w-full max-w-sm lg:max-w-none object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* ── Text column ───────────────────────────────────────── */}
          <div className="flex flex-col justify-center">
            <motion.div
              className="section-label"
              {...(isInView ? fadeIn(0.1) : { initial: { opacity: 0, y: 24 } })}
            >
              {a.label}
            </motion.div>

            <motion.h2
              className="font-cormorant font-light text-4xl md:text-5xl text-dark leading-[1.1] mt-4"
              {...(isInView ? fadeIn(0.2) : { initial: { opacity: 0, y: 24 } })}
            >
              {a.heading1}
              <br />
              <em className="italic font-light">{a.heading2}</em>
            </motion.h2>

            <motion.p
              className="mt-8 font-dm-sans font-light text-text text-base leading-[1.8] max-w-lg"
              {...(isInView ? fadeIn(0.35) : { initial: { opacity: 0, y: 24 } })}
            >
              {a.body}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
