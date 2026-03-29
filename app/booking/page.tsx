"use client";

import { useLanguage } from "@/lib/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BookingPage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="bg-bg min-h-screen">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 pt-32 pb-16">
          <h1 className="font-cormorant font-light text-5xl md:text-6xl text-dark leading-[1.1] mb-12">
            {t.bookingPage.heading}
          </h1>
          <iframe
            src="https://cal.eu/joaorosamtc"
            width="100%"
            height="700"
            style={{ border: 0 }}
            title="Book a session"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
