
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
      <div className="flex items-center justify-center mb-16">
        <span className={`mr-4 text-xl transition-colors ${!isYearly ? 'text-[#B5828C] font-bold' : 'text-[#E5989B]'}`}>
          Monthly
        </span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className={`relative w-20 h-10 rounded-full transition-colors ${
            isYearly ? 'bg-[#FFCDB2]' : 'bg-gray-300'
          }`}
        >
          <div
            className={`absolute top-1 w-8 h-8 bg-white rounded-full transition-transform shadow-lg ${
              isYearly ? 'translate-x-10' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`ml-4 text-xl transition-colors ${isYearly ? 'text-[#B5828C] font-bold' : 'text-[#E5989B]'}`}>
          Yearly
          <span className="ml-2 text-base text-green-600 font-semibold">(Save 20%)</span>
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-20">
        {tiers.map((tier) => (
          <Card
            key={tier.id}
            className={`relative bg-[#FFCDB2] border-2 border-[#E5989B] rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-102 ${
              tier.popular 
                ? 'scale-105 shadow-2xl ring-4 ring-[#FFB4A2] ring-opacity-50' 
                : 'hover:border-[#FFB4A2] shadow-lg'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#FFB4A2] text-[#B5828C] px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
                </span>
              </div>
            )}

            <CardHeader className="text-center pb-6">
              <CardTitle className="text-[#B5828C] text-2xl font-bold">{tier.name}</CardTitle>
              <CardDescription className="text-[#E5989B] font-medium">{tier.subtitle}</CardDescription>
              <div className="mt-6">
                <span className="text-5xl font-bold text-[#B5828C]">
                  {typeof tier.price.monthly === 'number' 
                    ? `$${isYearly ? tier.price.yearly : tier.price.monthly}`
                    : tier.price.monthly
                  }
                </span>
                {typeof tier.price.monthly === 'number' && (
                  <span className="text-[#E5989B] ml-1 text-lg">/month</span>
                )}
              </div>
              <p className="text-[#B5828C] mt-2 font-medium">{tier.description}</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <ul className="space-y-4">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-[#E5989B] mr-3 flex-shrink-0" />
                    <span className="text-[#B5828C]">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full mt-8 font-bold text-lg py-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl min-h-[60px] ${
                  tier.popular
                    ? 'bg-[#FFCDB2] hover:bg-[#E5989B] text-[#B5828C] border-2 border-[#E5989B]'
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
        <p className="text-[#B5828C] mb-6 font-bold text-xl">
          All plans include a 14-day free trial. No credit card required.
        </p>
        <p className="text-[#E5989B] text-lg">
          Need a custom solution? <a href="/contact" className="text-[#B5828C] underline hover:text-[#E5989B] transition-colors font-semibold">Contact our sales team</a>
        </p>
      </div>
    </div>
  );
};

export default PricingPlans;
