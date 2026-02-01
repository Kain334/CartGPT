import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServiceIntro from "@/components/ServiceIntro";
import HowItWorks from "@/components/HowItWorks";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import { trackEvent, EVENTS } from "@/lib/analytics";

const LandingTemplate = () => {
  useEffect(() => {
    // Track landing page view on mount
    trackEvent(EVENTS.LANDING_PAGE);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServiceIntro />
      <HowItWorks />
      <Reviews />
      <Footer />
    </div>
  );
};

export default LandingTemplate;
