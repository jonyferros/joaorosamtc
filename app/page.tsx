// ─────────────────────────────────────────────────────────────────────────────
// Root page — assembles all sections in order.
// Each section is a client component that reads from LanguageContext.
// ─────────────────────────────────────────────────────────────────────────────

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Locations from "@/components/Locations";
import BookingCTA from "@/components/BookingCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <HowItWorks />
        <Locations />
        <BookingCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
