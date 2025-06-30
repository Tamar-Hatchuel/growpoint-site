
import PageLayout from "@/components/layout/PageLayout";
import HeroSection from "@/components/sections/HeroSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import ProcessSteps from "@/components/sections/ProcessSteps";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import TimedPopup from "@/components/ui/TimedPopup";

const Index = () => {
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
        delay={5000}
        sessionKey="home-popup-shown"
      />
    </PageLayout>
  );
};

export default Index;
