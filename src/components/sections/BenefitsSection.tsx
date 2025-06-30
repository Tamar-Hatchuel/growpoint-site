
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
    <div className="container mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-[#B5828C] text-center mb-16">Transform Your Team Dynamics</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <Card 
            key={index} 
            className="bg-[#FFCDB2] border-2 border-[#E5989B] hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-3xl group"
          >
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors">
                <benefit.icon className="w-10 h-10 text-[#E5989B]" />
              </div>
              <CardTitle className="text-[#B5828C] text-2xl font-bold">{benefit.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#B5828C] text-center text-lg leading-relaxed">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
