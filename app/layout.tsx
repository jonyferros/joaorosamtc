import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
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
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        {/* Language context wraps the entire app so any component can read/toggle lang */}
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
