"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BookingPage() {
  const { t } = useLanguage();

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "booking", calOrigin: "https://cal.eu" });
      cal("ui", { theme: "light", styles: { branding: { brandColor: "#3D5A36" } } });
    })();
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-bg min-h-screen">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 pt-32 pb-16">
          <h1 className="font-cormorant font-light text-5xl md:text-6xl text-dark leading-[1.1] mb-12">
            {t.bookingPage.heading}
          </h1>
          <Cal
            namespace="booking"
            calLink="joaorosamtc"
            calOrigin="https://cal.eu"
            style={{ width: "100%", height: "700px", overflow: "scroll" }}
            config={{ layout: "month_view" }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
