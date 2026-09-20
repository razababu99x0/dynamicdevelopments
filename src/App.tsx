import { useEffect, useState } from "react";
import { initLenis } from "./lib/core";
import {
  Preloader, AmbientBackground, CustomCursor, WhatsAppButton,
  BrandMarquee, ScrollProgress, SpotlightSystem,
} from "./components/Effects";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServicesSection from "./components/Services";
import PortfolioSection from "./components/Portfolio";
import ProcessSection from "./components/Process";
import PricingSection from "./components/Pricing";
import UniverseSection from "./components/Universe";
import CodeExperience from "./components/CodeExperience";
import FAQ from "./components/FAQ";
import ContactSection from "./components/Contact";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => { initLenis(); }, []);

  return (
    <div className="relative min-h-screen overflow-clip bg-[#060a18] text-soft">
      <Preloader onDone={() => setIntroDone(true)} />
      <AmbientBackground />
      <CustomCursor />
      <WhatsAppButton />
      <ScrollProgress />
      <SpotlightSystem />
      <div className="noise-overlay" />
      <Navbar />

      <main className="relative">
        <Hero active={introDone} />
        <BrandMarquee />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <PricingSection />
        <UniverseSection />
        <CodeExperience />
        <FAQ />
        <ContactSection />
      </main>
    </div>
  );
}
