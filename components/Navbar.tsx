"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import LanguageToggle from "./LanguageToggle";

// ─────────────────────────────────────────────────────────────────────────────
// Navbar — sticky header with background blur on scroll, mobile hamburger
// overlay, and a language toggle.
// Layout: [Language toggle] [Nav links — center] [Logo image — right]
// ─────────────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.locations, href: "#locations" },
    { label: t.nav.book, href: "#booking" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <>
      {/* ── Desktop / tablet nav ───────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bg/80 backdrop-blur-[8px] border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">

          {/* Left — logo image */}
          <a href="#hero" aria-label="João Rosa Chinese Medicine — home">
            <Image
              src="/images/logo.png"
              alt="João Rosa Chinese Medicine"
              height={44}
              width={134}
              className="object-contain"
              priority
            />
          </a>

          {/* Centre — desktop nav links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right — language toggle (desktop) + hamburger (mobile) */}
          <div className="flex items-center gap-6">
            <div className="hidden md:block">
              <LanguageToggle variant="dark" />
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <span className="block w-5 h-px bg-dark" />
              <span className="block w-5 h-px bg-dark" />
              <span className="block w-3.5 h-px bg-dark" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile fullscreen overlay ──────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[60] bg-dark flex flex-col justify-center px-10 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <button
          className="absolute top-6 right-6 text-white font-dm-mono text-sm tracking-widest uppercase"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          Close
        </button>

        <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="mobile-menu-link"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-12">
          <LanguageToggle variant="light" />
        </div>
      </div>
    </>
  );
}
