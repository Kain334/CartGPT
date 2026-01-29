import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServiceIntro from "@/components/ServiceIntro";
import HowItWorks from "@/components/HowItWorks";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

const Index = () => {
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

export default Index;
