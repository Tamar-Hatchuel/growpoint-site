
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, BarChart3, Brain } from "lucide-react";

const ProcessSteps = () => {
  const steps = [
    {
      icon: Users,
      title: "Take the Test",
      description: "Team members complete anonymous sociometric surveys about collaboration and communication preferences."
    },
    {
      icon: Brain,
      title: "Get AI Feedback", 
      description: "Our AI analyzes responses and generates personalized insights about team dynamics and potential friction points."
    },
    {
      icon: BarChart3,
      title: "View Dashboard",
      description: "Access real-time analytics, actionable recommendations, and track team cohesion metrics over time."
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-[#B5828C] text-center mb-16 animate-fade-in-up">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="text-center relative">
            <Card className="brand-card card-hover h-full group animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/40 transition-colors">
                  <step.icon className="w-10 h-10 text-[#E5989B]" />
                </div>
                <CardTitle className="text-[#B5828C] text-xl font-semibold">
                  Step {index + 1}: {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#22223B] text-base leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-1/2 -translate-y-1/2 z-10">
                <ArrowRight className="w-8 h-8 text-[#E5989B]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessSteps;
