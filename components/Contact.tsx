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
              <div>
                <p className="section-label mb-1">Cork</p>
                <a
                  href={`tel:${c.phoneCork.replace(/\s/g, "")}`}
                  className="font-dm-sans font-light text-text hover:text-accent-green transition-colors"
                >
                  {c.phoneCork}
                </a>
              </div>

              <div>
                <p className="section-label mb-1">Quarteira</p>
                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${c.phoneQuarteira.replace(/\s/g, "")}`}
                    className="font-dm-sans font-light text-text hover:text-accent-green transition-colors"
                  >
                    {c.phoneQuarteira}
                  </a>
                  <a
                    href={c.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="font-dm-mono text-[0.65rem] tracking-[0.12em] uppercase text-accent-green hover:opacity-70 transition-opacity"
                  >
                    WhatsApp ↗
                  </a>
                </div>
              </div>

              <div>
                <p className="section-label mb-1">Email</p>
                <a
                  href={`mailto:${c.email}`}
                  className="font-dm-sans font-light text-text hover:text-accent-green transition-colors"
                >
                  {c.email}
                </a>
              </div>

              <div>
                <p className="section-label mb-1">Instagram</p>
                <a
                  href="https://instagram.com/joaorosamtc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-dm-sans font-light text-text hover:text-accent-green transition-colors"
                >
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
