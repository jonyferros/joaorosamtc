"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { translations, type Language } from "./translations";

// ─────────────────────────────────────────────────────────────────────────────
// Language context — provides the current language and a toggle function
// to every component in the tree. Persists to localStorage so the user's
// preference survives page reloads.
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = "joaorosamtc_lang";

interface LanguageContextValue {
  lang: Language;
  t: (typeof translations)[Language];
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

// Detect browser language on first visit; default to English
function detectInitialLanguage(): Language {
  // During SSR there is no navigator — default to English
  if (typeof window === "undefined") return "en";

  // Honour a previously saved preference
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "en" || saved === "pt") return saved;

  // Fall back to browser language
  const browser = navigator.language.toLowerCase();
  return browser.startsWith("pt") ? "pt" : "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    setLang(detectInitialLanguage());
  }, []);

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next: Language = prev === "en" ? "pt" : "en";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value: LanguageContextValue = {
    lang,
    t: translations[lang],
    toggle,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook used by every component that needs translated strings
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return ctx;
}
