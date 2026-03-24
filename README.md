# João Rosa MTC — Website

Personal practitioner website for João Rosa, licensed Acupuncturist and Traditional Chinese Medicine practitioner. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

**Domain:** joaorosamtc.com
**Deployment:** Vercel

---

## Local development

### 1. Clone and install

```bash
git clone <repo-url>
cd joaorosaacupuncture
npm install
```

### 2. Environment variables

Copy the example file and fill in your Resend API key:

```bash
cp .env.example .env.local
```

Open `.env.local` and set:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

> Get your API key at https://resend.com/api-keys
> `.env.local` is listed in `.gitignore` — it will never be committed.

### 3. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000.

---

## Project structure

```
/app
  layout.tsx              Google Fonts, LanguageProvider wrapper
  page.tsx                Assembles all page sections
  /api/contact/route.ts   POST handler — sends email via Resend

/components
  Navbar.tsx              Sticky nav, mobile overlay, language toggle
  Hero.tsx                Full-viewport hero with grain texture & animations
  About.tsx               2-col layout: portrait photo + bio
  Services.tsx            Conditions tag grid with stagger animation
  HowItWorks.tsx          3-step process with large numerals
  Locations.tsx           Two clinic cards (Cork + Quarteira)
  BookingCTA.tsx          Dark full-width CTA section
  Contact.tsx             Contact form → /api/contact + contact details
  Footer.tsx              3-col footer with nav, lang toggle, disclaimer
  GrainOverlay.tsx        CSS-only SVG noise texture overlay
  LanguageToggle.tsx      EN | PT switcher (reads from LanguageContext)

/lib
  translations.ts         All EN and PT strings — single source of truth
  LanguageContext.tsx     React context: lang state, toggle, localStorage

/public/images
  joao-rosa.jpg           Practitioner portrait photo
```

---

## Language system

All user-facing text lives in `/lib/translations.ts` in two keys: `en` and `pt`. Components import `useLanguage()` from `LanguageContext` and reference `t.section.key`.

The selected language persists to `localStorage` under the key `joaorosamtc_lang`. On first visit the browser language is detected and PT is used for `pt-*` locales; otherwise defaults to EN.

**No i18n libraries are used** — the system is intentionally minimal.

---

## Contact form

The form at `/api/contact` uses the [Resend](https://resend.com) SDK.

- Required fields: `name`, `email`, `message`
- Optional field: `subject` (dropdown)
- Validated client-side (before submission) and server-side (in the API route)
- Raw errors are never exposed to the user — only generic messages
- `RESEND_API_KEY` must be set in `.env.local` (or Vercel environment variables)

**After DNS is configured for joaorosamtc.com**, update the `from:` address in `app/api/contact/route.ts` from `onboarding@resend.dev` to a verified domain address (e.g. `hello@joaorosamtc.com`).

---

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import the project at https://vercel.com/new.
3. In **Settings → Environment Variables**, add:
   - `RESEND_API_KEY` → your Resend key
4. Click **Deploy**.

Vercel automatically detects Next.js — no build configuration needed.

---

## Pre-launch checklist

- [ ] `RESEND_API_KEY` set in Vercel environment variables
- [ ] Resend domain verified for `joaorosamtc.com` and `from:` address updated
- [ ] Custom domain `joaorosamtc.com` added in Vercel → Domains
- [ ] Instagram link updated once the account handle is confirmed
- [ ] Portugal clinic address confirmed with the practitioner
- [ ] Test contact form end-to-end on staging URL before go-live
- [ ] Review medical disclaimer text with practitioner
