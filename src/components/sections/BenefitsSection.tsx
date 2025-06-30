
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BarChart3, Brain } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Users,
      title: "Real-Time Feedback",
      description: "Anonymous surveys and instant insights into team dynamics and collaboration patterns."
    },
    {
      icon: BarChart3,
      title: "Team Analytics", 
      description: "Comprehensive dashboards showing engagement, cohesion metrics, and performance trends."
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Smart recommendations and actionable strategies based on team data and behavioral patterns."
    }
  ];

  return (
    <div className="container mx-auto px-4 mb-20">
      <h2 className="text-4xl font-bold text-[#B5828C] text-center mb-12">Transform Your Team Dynamics</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <Card key={index} className="bg-[#F1F4F5] backdrop-blur-sm border-[#E5989B] hover:shadow-xl transition-all hover:scale-105">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-[#B5828C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-[#E5989B]" />
              </div>
              <CardTitle className="text-[#B5828C] text-xl">{benefit.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-center">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
