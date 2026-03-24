"use client";

import { useLanguage } from "@/lib/LanguageContext";
import LanguageToggle from "./LanguageToggle";

// ─────────────────────────────────────────────────────────────────────────────
// Footer — 3-column layout: logo+tagline | nav links | language toggle + copyright.
// Includes medical disclaimer as required for a complementary health site.
// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;
  const nav = t.nav;

  const navLinks = [
    { label: nav.about, href: "#about" },
    { label: nav.services, href: "#services" },
    { label: nav.locations, href: "#locations" },
    { label: nav.contact, href: "#contact" },
  ];

  return (
    <footer className="bg-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Top: 3-column grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">

          {/* Column 1 — Logo + tagline */}
          <div>
            <div className="flex flex-col leading-none">
              <span className="font-cormorant text-2xl font-semibold tracking-wide text-white">
                {nav.logo}
              </span>
              <span className="font-dm-mono text-[0.55rem] tracking-[0.18em] uppercase text-white/40 mt-0.5">
                {nav.logoSub}
              </span>
            </div>
            <p className="mt-4 font-dm-sans font-light text-white/50 text-sm leading-relaxed">
              {f.tagline}
            </p>
          </div>

          {/* Column 2 — Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-dm-mono text-[0.65rem] tracking-[0.12em] uppercase text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Language toggle + copyright */}
          <div className="flex flex-col gap-4">
            <LanguageToggle variant="light" />
            <p className="font-dm-mono text-[0.6rem] tracking-[0.1em] uppercase text-white/30">
              {f.copyright}
            </p>
          </div>
        </div>

        {/* ── Disclaimer ─────────────────────────────────────────── */}
        <p className="mt-8 font-dm-sans font-light text-white/30 text-xs leading-relaxed max-w-2xl">
          {f.disclaimer}
        </p>
      </div>
    </footer>
  );
}
