
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingPlans = () => {
  const [isYearly, setIsYearly] = useState(false);

  const tiers = [
    {
      id: "basic",
      name: "Basic",
      price: {
        monthly: 129,
        yearly: 99,
      },
      description: "Core features, email support",
      subtitle: "2–50 employees",
      features: [
        "Anonymous feedback collection",
        "Basic team analytics",
        "Email notifications",
        "Monthly reports",
        "Email support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      id: "standard",
      name: "Standard",
      price: {
        monthly: 299,
        yearly: 239,
      },
      description: "Analytics, onboarding tools",
      subtitle: "51–200 employees",
      features: [
        "Everything in Basic",
        "Advanced analytics dashboard",
        "Custom onboarding flows",
        "Weekly insights",
        "Priority email support",
        "Team collaboration tools",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      id: "pro",
      name: "Pro",
      price: {
        monthly: 599,
        yearly: 479,
      },
      description: "Advanced insights, priority support",
      subtitle: "201–500 employees",
      features: [
        "Everything in Standard",
        "AI-powered insights",
        "Real-time notifications",
        "Custom integrations",
        "Phone support",
        "Dedicated onboarding",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: {
        monthly: "Custom",
        yearly: "Custom",
      },
      description: "Dedicated manager, integrations",
      subtitle: "501+ employees",
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom integrations",
        "API access",
        "SLA guarantees",
        "On-premise deployment options",
      ],
      cta: "Contact Us",
      popular: false,
    },
  ];

  return (
    <div className="container mx-auto px-4">
      {/* Pricing Toggle */}
      <div className="flex items-center justify-center mb-12">
        <span className={`mr-3 transition-colors ${!isYearly ? 'text-[#B5828C] font-semibold' : 'text-[#E5989B]'}`}>
          Monthly
        </span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className={`relative w-16 h-8 rounded-full transition-colors ${
            isYearly ? 'bg-[#FFCDB2]' : 'bg-gray-300'
          }`}
        >
          <div
            className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
              isYearly ? 'translate-x-9' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`ml-3 transition-colors ${isYearly ? 'text-[#B5828C] font-semibold' : 'text-[#E5989B]'}`}>
          Yearly
          <span className="ml-1 text-sm text-green-600">(Save 20%)</span>
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-16">
        {tiers.map((tier, index) => (
          <Card
            key={tier.id}
            className={`relative bg-gradient-to-br from-[#FFCDB2] to-[#FFCDB2]/80 backdrop-blur-sm border-2 rounded-3xl transition-all duration-300 hover:scale-[1.04] shadow-lg hover:shadow-2xl group ${
              tier.popular 
                ? 'border-[#E5989B] scale-105 shadow-2xl animate-[fade-in_0.6s_ease-out_0.3s_both,bounce_0.8s_ease-out_0.5s_both]' 
                : 'border-[#E5989B] hover:border-[#E5989B] shadow-lg hover:shadow-2xl'
            }`}
            style={{
              animation: tier.popular 
                ? 'fade-in 0.6s ease-out 0.3s both, bounce 0.8s ease-out 0.5s both'
                : `fade-in 0.6s ease-out ${0.1 + index * 0.1}s both`
            }}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-[#FFCDB2] text-[#B5828C] px-6 py-2 rounded-full text-sm font-bold shadow-lg border-2 border-[#E5989B]">
                  Most Popular
                </span>
              </div>
            )}

            <CardHeader className="text-center pb-4 pt-8">
              <CardTitle className="text-[#B5828C] text-2xl font-bold">{tier.name}</CardTitle>
              <CardDescription className="text-sm text-[#B5828C] font-medium">{tier.subtitle}</CardDescription>
              <div className="mt-6">
                <span className="text-5xl font-bold text-[#B5828C]">
                  {typeof tier.price.monthly === 'number' 
                    ? `$${isYearly ? tier.price.yearly : tier.price.monthly}`
                    : tier.price.monthly
                  }
                </span>
                {typeof tier.price.monthly === 'number' && (
                  <span className="text-[#E5989B] ml-2 text-lg font-medium">/month</span>
                )}
              </div>
              <p className="text-sm text-[#B5828C] mt-3 font-medium">{tier.description}</p>
            </CardHeader>

            <CardContent className="space-y-6 px-6 pb-8">
              <ul className="space-y-4">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <Check className="w-5 h-5 text-[#E5989B] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-[#B5828C] leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full mt-8 h-12 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] ${
                  tier.popular
                    ? 'bg-[#FFCDB2] hover:bg-[#E5989B] text-[#B5828C] hover:text-white border-2 border-[#E5989B]'
                    : 'bg-[#FFCDB2] text-[#B5828C] border-2 border-[#E5989B] hover:bg-[#E5989B] hover:text-white'
                }`}
              >
                {tier.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Info */}
      <div className="text-center">
        <p className="text-[#B5828C] mb-4 font-bold text-lg">
          All plans include a 14-day free trial. No credit card required.
        </p>
        <p className="text-sm text-[#B5828C]">
          Need a custom solution? <a href="/contact" className="text-[#E5989B] underline hover:text-[#B5828C] transition-colors font-medium">Contact our sales team</a>
        </p>
      </div>
    </div>
  );
};

export default PricingPlans;
