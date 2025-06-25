
import PageLayout from "@/components/layout/PageLayout";
import PricingPlans from "@/components/sections/PricingPlans";
import TimedPopup from "@/components/ui/TimedPopup";

const Pricing = () => {
  return (
    <PageLayout>
      <div className="py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#B5828C] mb-6">Choose Your Plan</h1>
          <p className="text-xl text-[#B5828C] max-w-3xl mx-auto">
            Select the perfect plan for your team size and collaboration needs. All plans include our core team dynamics features with varying levels of support and customization.
          </p>
        </div>

        <PricingPlans />
      </div>
      
      <TimedPopup
        message="Not sure which plan fits your team?"
        buttonText="Contact Us for Help"
        buttonLink="/contact"
        delay={4000}
        sessionKey="pricing-popup-shown"
      />
    </PageLayout>
  );
};

export default Pricing;
