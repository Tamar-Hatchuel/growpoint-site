
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
    <div className="container mx-auto px-4 mb-16">
      <h2 className="text-4xl font-bold text-[#B5828C] text-center mb-12">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="text-center relative">
            <Card className="bg-white/80 backdrop-blur-sm border-[#FFB4A2] hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <div className="w-16 h-16 bg-[#B5828C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-[#B5828C]" />
                </div>
                <CardTitle className="text-[#B5828C]">
                  Step {index + 1}: {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{step.description}</p>
              </CardContent>
            </Card>
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-1/2 -translate-y-1/2 z-10">
                <ArrowRight className="w-6 h-6 text-[#B5828C]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessSteps;
