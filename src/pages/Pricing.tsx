
import PageLayout from "@/components/layout/PageLayout";
import PricingPlans from "@/components/sections/PricingPlans";

const Pricing = () => {
  return (
    <PageLayout>
      <div className="py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#B5828C] mb-6">Simple Pricing</h1>
          <p className="text-xl text-[#B5828C] max-w-2xl mx-auto mb-12">
            Choose the best plan for your team size and needs. All plans include our core features with scalable options.
          </p>
        </div>

        <PricingPlans />
      </div>
    </PageLayout>
  );
};

export default Pricing;
