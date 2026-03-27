"use client";

import { useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BookingPage() {
  const { t } = useLanguage();

  useEffect(() => {
    // Inject Cal.eu inline embed script
    const script = document.createElement("script");
    script.id = "cal-eu-embed";
    script.innerHTML = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal; let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {}; cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["-queued", ar]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://cal.eu/embed/embed.js", "init");
      Cal("init", "booking", { origin: "https://cal.eu" });
      Cal.ns["booking"]("inline", {
        elementOrSelector: "#cal-booking-inline",
        calLink: "joaorosamtc",
        config: { layout: "month_view" },
      });
      Cal.ns["booking"]("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#3D5A36" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    `;
    document.head.appendChild(script);

    return () => {
      // Clean up on unmount so the Cal script doesn't interfere with other pages
      const el = document.getElementById("cal-eu-embed");
      if (el) el.remove();
      delete (window as any).Cal;
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-bg min-h-screen">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 pt-32 pb-16">
          <h1 className="font-cormorant font-light text-5xl md:text-6xl text-dark leading-[1.1] mb-12">
            {t.bookingPage.heading}
          </h1>
          <div
            id="cal-booking-inline"
            style={{ width: "100%", height: "700px", overflow: "scroll" }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
