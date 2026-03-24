"use client";

import { useLanguage } from "@/lib/LanguageContext";

// ─────────────────────────────────────────────────────────────────────────────
// LanguageToggle — EN | PT switcher rendered in the nav and footer.
// Reads current lang from context and calls toggle() on click.
// ─────────────────────────────────────────────────────────────────────────────

interface LanguageToggleProps {
  /** "light" for dark backgrounds (footer), "dark" for light backgrounds (nav) */
  variant?: "dark" | "light";
}

export default function LanguageToggle({ variant = "dark" }: LanguageToggleProps) {
  const { lang, toggle } = useLanguage();

  const baseClass =
    "font-dm-mono text-[0.65rem] tracking-[0.12em] uppercase transition-colors duration-150";
  const activeClass = variant === "dark" ? "text-dark" : "text-white";
  const inactiveClass =
    variant === "dark"
      ? "text-muted hover:text-dark"
      : "text-white/50 hover:text-white";
  const pipeClass = variant === "dark" ? "text-border" : "text-white/30";

  return (
    <div className="flex items-center gap-1.5" aria-label="Language toggle">
      <button
        onClick={lang !== "en" ? toggle : undefined}
        className={`${baseClass} ${lang === "en" ? activeClass : inactiveClass}`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <span className={`${pipeClass} font-dm-mono text-[0.65rem]`} aria-hidden="true">
        |
      </span>
      <button
        onClick={lang !== "pt" ? toggle : undefined}
        className={`${baseClass} ${lang === "pt" ? activeClass : inactiveClass}`}
        aria-pressed={lang === "pt"}
      >
        PT
      </button>
    </div>
  );
}
