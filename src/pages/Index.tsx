
import PageLayout from "@/components/layout/PageLayout";
import HeroSection from "@/components/sections/HeroSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import ProcessSteps from "@/components/sections/ProcessSteps";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import TimedPopup from "@/components/ui/TimedPopup";

const Index = () => {
  // Enable debug mode by checking URL params or localStorage
  const debugMode = new URLSearchParams(window.location.search).has('debug') || 
                   localStorage.getItem('popup-debug') === 'true';

  console.log('[Index] Page loaded, debug mode:', debugMode);

  return (
    <PageLayout>
      <div className="space-y-20">
        <HeroSection />
        <BenefitsSection />
        <ProcessSteps />
        <TestimonialsSection />
        <CTASection />
      </div>
      
      <TimedPopup
        message="Start your free trial today!"
        buttonText="Try Free Demo"
        buttonLink="/demo"
        delay={2000} // Reduced from 5000 to 2000ms (2 seconds)
        sessionKey="home-popup-shown"
        debugMode={debugMode}
      />
    </PageLayout>
  );
};

export default Index;
