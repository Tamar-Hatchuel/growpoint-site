import PageLayout from "@/components/layout/PageLayout";
import PricingPlans from "@/components/sections/PricingPlans";
import TimedPopup from "@/components/ui/TimedPopup";
const Pricing = () => {
  return <PageLayout>
      <div className="py-16">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl font-bold text-[#B5828C] mb-6">Choose Your Plan</h1>
          <p className="text-[#E5989B] max-w-3xl mx-auto text-lg font-medium">
            Select the perfect plan for your team size and collaboration needs. All plans include our core team dynamics features with varying levels of support and customization.
          </p>
        </div>

        {/* Animated Grid Background Wrapper */}
        <div className="relative flex justify-center items-center w-full mt-20">
          {/* Background Layer */}
          <div className="absolute inset-0 -z-10">
            <div className="h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_35px] opacity-30 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          </div>
          
          <PricingPlans />
        </div>
      </div>
      
      <TimedPopup message="Not sure which plan fits your team?" buttonText="Contact Us for Help" buttonLink="/contact" delay={5000} sessionKey="pricing-popup-shown" />
    </PageLayout>;
};
export default Pricing;