
import PageLayout from "@/components/layout/PageLayout";
import HeroSection from "@/components/sections/HeroSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

const Index = () => {
  return (
    <PageLayout>
      <HeroSection />
      <BenefitsSection />
      <TestimonialsSection />
      <CTASection />
    </PageLayout>
  );
};

export default Index;
