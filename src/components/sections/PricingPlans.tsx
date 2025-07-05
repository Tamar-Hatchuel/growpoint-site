import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
const PricingPlans = () => {
  const plans = [{
    name: "Basic",
    price: "$129",
    period: "/month",
    description: "Perfect for small to medium teams",
    features: ["2–50 employees", "Core sociometric features", "Basic team surveys", "Email support", "Standard analytics dashboard", "Monthly team reports"],
    cta: "Get Started",
    link: "/contact",
    popular: false
  }, {
    name: "Standard",
    price: "$299",
    period: "/month",
    description: "Ideal for growing organizations",
    features: ["51–200 employees", "Advanced analytics dashboard", "Team onboarding tools", "Custom survey templates", "Integration support", "Priority email support", "Weekly insights reports"],
    cta: "Get Started",
    link: "/contact",
    popular: true
  }, {
    name: "Pro",
    price: "$599",
    period: "/month",
    description: "For large teams needing advanced insights",
    features: ["201–500 employees", "Advanced AI-powered insights", "Priority support & onboarding", "Custom integrations", "Advanced reporting suite", "Dedicated success manager", "Real-time collaboration metrics"],
    cta: "Get Started",
    link: "/contact",
    popular: false
  }, {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For enterprises with complex requirements",
    features: ["501+ employees", "Dedicated account manager", "Enterprise compliance tools", "Custom feature development", "SLA guarantee", "24/7 priority support", "On-premise deployment options", "Advanced security features"],
    cta: "Contact Us",
    link: "/contact",
    popular: false
  }];
  return <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {plans.map((plan, index) => <div key={index} className="relative animate-fade-in-up h-full" style={{
        animationDelay: `${index * 0.1}s`
      }}>
            {plan.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-[#FFB4A2] text-[#B5828C] px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Most Popular
                </span>
              </div>}
            
            <Card className="brand-card pricing-card-hover h-full flex flex-col relative border-2 border-[#E5989B] rounded-3xl">
              <CardHeader className="text-center pb-4 pt-6">
                <CardTitle className="text-[#B5828C] mb-2 text-2xl lg:text-3xl font-extrabold">{plan.name}</CardTitle>
                <div className="mb-3">
                  <span className="text-[#B5828C] text-2xl lg:text-3xl font-bold">{plan.price}</span>
                  <span className="text-[#E5989B] text-sm lg:text-base">{plan.period}</span>
                </div>
                <CardDescription className="text-[#E5989B] text-sm lg:text-base">{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col px-4 lg:px-6">
                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((feature, idx) => <li key={idx} className="flex items-start">
                      <Check className="w-4 h-4 text-[#E5989B] mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-[#22223B] text-sm lg:text-base leading-relaxed">{feature}</span>
                    </li>)}
                </ul>
                
                <Link to={plan.link} className="w-full">
                  <Button className="w-full brand-button text-base lg:text-lg py-4 lg:py-5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-[#ffb4a2]">
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>)}
      </div>
    </div>;
};
export default PricingPlans;