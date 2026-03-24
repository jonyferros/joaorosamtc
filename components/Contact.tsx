"use client";

import { useState, FormEvent, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

// ─────────────────────────────────────────────────────────────────────────────
// Contact — editorial form with underline-only inputs.
// Validates required fields client-side before posting to /api/contact.
// Displays success/error messages without ever exposing stack traces.
// ─────────────────────────────────────────────────────────────────────────────

type FormStatus = "idle" | "submitting" | "success" | "error";

// ── Inline SVG icons — no external library needed ────────────────────────────
function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-muted">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.53 6.53l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  );
}

function IconEmail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-muted">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-muted">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Validate that a string looks like an email address
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Form field state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── Client-side validation ───────────────────────────────────────
  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Required";
    if (!email.trim()) next.email = "Required";
    else if (!isValidEmail(email)) next.email = "Invalid email";
    if (!message.trim()) next.message = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  // ── Form submission ──────────────────────────────────────────────
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      // Network failure — show generic error, never expose internals
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-bg py-24 lg:py-32" ref={ref}>
      <hr className="border-border max-w-7xl mx-auto mb-24" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── Form column ───────────────────────────────────────── */}
          <div>
            <motion.div
              className="section-label"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {c.label}
            </motion.div>

            <motion.h2
              className="font-cormorant font-light text-4xl md:text-5xl text-dark mt-4 leading-[1.1]"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            >
              {c.heading}
            </motion.h2>

            <motion.form
              onSubmit={handleSubmit}
              noValidate
              className="mt-10 flex flex-col gap-8"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            >
              {/* Name */}
              <div>
                <input
                  type="text"
                  className="form-input"
                  placeholder={c.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-label={c.namePlaceholder}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="mt-1 font-dm-mono text-[0.6rem] text-red-600 tracking-wide uppercase">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  className="form-input"
                  placeholder={c.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label={c.emailPlaceholder}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-1 font-dm-mono text-[0.6rem] text-red-600 tracking-wide uppercase">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject — optional dropdown */}
              <div>
                <select
                  className="form-input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  aria-label={c.subjectPlaceholder}
                >
                  <option value="">{c.subjectPlaceholder}</option>
                  {c.subjectOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <textarea
                  className="form-input resize-none"
                  placeholder={c.messagePlaceholder}
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-label={c.messagePlaceholder}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="mt-1 font-dm-mono text-[0.6rem] text-red-600 tracking-wide uppercase">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "…" : c.submit}
                </button>
              </div>

              {/* Feedback messages */}
              {status === "success" && (
                <p className="font-dm-sans font-light text-accent-green text-sm" role="status">
                  {c.success}
                </p>
              )}
              {status === "error" && (
                <p className="font-dm-sans font-light text-red-600 text-sm" role="alert">
                  {c.error}
                </p>
              )}
            </motion.form>
          </div>

          {/* ── Contact details column ────────────────────────────── */}
          <motion.div
            className="flex flex-col justify-start pt-2 lg:pt-24"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          >
            <div className="flex flex-col gap-6">
              {/* Cork phone */}
              <div>
                <p className="section-label mb-2">Cork</p>
                <a
                  href={`tel:${c.phoneCork.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 font-dm-sans font-light text-text hover:text-accent-green transition-colors group"
                >
                  <IconPhone />
                  {c.phoneCork}
                </a>
              </div>

              {/* Quarteira phone + WhatsApp */}
              <div>
                <p className="section-label mb-2">Quarteira</p>
                <a
                  href={`tel:${c.phoneQuarteira.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 font-dm-sans font-light text-text hover:text-accent-green transition-colors mb-3"
                >
                  <IconPhone />
                  {c.phoneQuarteira}
                </a>
                <a
                  href={c.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-dm-sans font-light text-accent-green hover:opacity-70 transition-opacity"
                >
                  <IconWhatsApp />
                  WhatsApp
                </a>
              </div>

              {/* Email */}
              <div>
                <p className="section-label mb-2">Email</p>
                <a
                  href={`mailto:${c.email}`}
                  className="flex items-center gap-3 font-dm-sans font-light text-text hover:text-accent-green transition-colors"
                >
                  <IconEmail />
                  {c.email}
                </a>
              </div>

              {/* Instagram */}
              <div>
                <p className="section-label mb-2">Instagram</p>
                <a
                  href="https://instagram.com/joaorosamtc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-dm-sans font-light text-text hover:text-accent-green transition-colors"
                >
                  <IconInstagram />
                  {c.instagram}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
