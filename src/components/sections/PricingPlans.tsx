
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
            isYearly ? 'bg-[#FFB4A2]' : 'bg-gray-300'
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
        {tiers.map((tier) => (
          <Card
            key={tier.id}
            className={`relative bg-white/90 backdrop-blur-sm border-2 hover:shadow-xl transition-all duration-300 hover:scale-105 ${
              tier.popular 
                ? 'border-[#FFB4A2] scale-105 shadow-lg shadow-[#B5828C]/20' 
                : 'border-[#E5989B] hover:border-[#FFB4A2] shadow-md shadow-[#B5828C]/10'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#FFB4A2] text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
                  Most Popular
                </span>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <CardTitle className="text-[#B5828C] text-xl">{tier.name}</CardTitle>
              <CardDescription className="text-sm text-[#E5989B]">{tier.subtitle}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-[#B5828C]">
                  {typeof tier.price.monthly === 'number' 
                    ? `$${isYearly ? tier.price.yearly : tier.price.monthly}`
                    : tier.price.monthly
                  }
                </span>
                {typeof tier.price.monthly === 'number' && (
                  <span className="text-[#E5989B] ml-1">/month</span>
                )}
              </div>
              <p className="text-sm text-[#E5989B] mt-2">{tier.description}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-[#FFB4A2] mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full mt-6 transition-all duration-300 ${
                  tier.popular
                    ? 'bg-[#FFB4A2] hover:bg-[#E5989B] text-white shadow-md hover:shadow-lg'
                    : 'bg-white text-[#FFB4A2] border-2 border-[#FFB4A2] hover:bg-[#FFB4A2] hover:text-white shadow-sm hover:shadow-md'
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
        <p className="text-[#B5828C] mb-4 font-medium">
          All plans include a 14-day free trial. No credit card required.
        </p>
        <p className="text-sm text-[#E5989B]">
          Need a custom solution? <a href="/contact" className="text-[#FFB4A2] underline hover:text-[#E5989B] transition-colors">Contact our sales team</a>
        </p>
      </div>
    </div>
  );
};

export default PricingPlans;
