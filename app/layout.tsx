import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";

// ── Google Fonts ────────────────────────────────────────────────────
// Cormorant Garamond: editorial serif for headings
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// DM Sans: clean humanist sans for body text
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-dm-sans",
  display: "swap",
});

// DM Mono: monospace for labels, nav, tags
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "João Rosa MTC — Acupuncture & Traditional Chinese Medicine",
  description:
    "Licensed acupuncturist and TCM practitioner offering evidence-informed treatment in Cork, Ireland and Quarteira, Portugal.",
  keywords: [
    "acupuncture",
    "TCM",
    "traditional chinese medicine",
    "Cork",
    "Portugal",
    "Quarteira",
    "João Rosa",
  ],
  openGraph: {
    title: "João Rosa MTC — Acupuncture & Traditional Chinese Medicine",
    description:
      "Licensed acupuncturist and TCM practitioner in Cork, Ireland and Quarteira, Portugal.",
    type: "website",
    locale: "en_IE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TZJS85DS');
        `}</Script>
        {/* Google Ads tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-479064585"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-479064585');
        `}</Script>
      </head>
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TZJS85DS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Language context wraps the entire app so any component can read/toggle lang */}
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
