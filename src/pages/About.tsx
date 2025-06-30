
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Brain, Building } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

const About = () => {
  const audienceCards = [
    { title: "Tech Companies", description: "Fast-growing teams needing cohesion insights", icon: Building },
    { title: "HR Professionals", description: "Leaders tracking team morale and engagement", icon: Users },
    { title: "Team Managers", description: "Managers resolving peer friction early", icon: Target },
    { title: "Employees", description: "Individuals seeking growth feedback", icon: Brain },
  ];

  const personas = [
    {
      name: "Dana",
      role: "HR Director",
      description: "Tracks team morale weekly and implements organization-wide engagement strategies"
    },
    {
      name: "Alex", 
      role: "Team Lead",
      description: "Resolves peer friction early and optimizes team collaboration dynamics"
    },
    {
      name: "Leah",
      role: "Employee", 
      description: "Seeks constructive feedback for professional development and team contribution"
    }
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        {/* Mission Section with slide-in animation */}
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-5xl font-bold text-[#B5828C] mb-6 animate-[slide-in-right_0.6s_ease-out]">
            About GrowPoint
          </h1>
          <p className="text-2xl text-[#B5828C] font-medium mb-8 animate-[fade-in_0.8s_ease-out_0.2s_both]">
            "Empowering teams through better feedback."
          </p>
        </div>

        {/* Problem & Solution with staggered animations */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <Card className="bg-gradient-to-br from-[#FFCDB2] to-[#FFCDB2]/80 backdrop-blur-sm border-2 border-[#E5989B] rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] animate-[fade-in_0.6s_ease-out_0.4s_both] group">
            <CardHeader className="pb-4">
              <CardTitle className="text-[#B5828C] text-2xl font-bold">The Problem</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-[#B5828C] leading-relaxed">
                Current feedback systems are outdated and miss real-time team dynamics. Teams struggle with 
                hidden friction, unclear communication, and lack of actionable insights into what actually 
                drives performance and collaboration.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#FFCDB2] to-[#FFCDB2]/80 backdrop-blur-sm border-2 border-[#E5989B] rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] animate-[fade-in_0.6s_ease-out_0.6s_both] group">
            <CardHeader className="pb-4">
              <CardTitle className="text-[#B5828C] text-2xl font-bold">Our Solution</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-[#B5828C] leading-relaxed">
                Sociometric tests, live dashboards, and AI insights that provide real-time visibility into 
                team dynamics. Get anonymous feedback, data-driven recommendations, and actionable strategies 
                to improve collaboration and performance.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Background glow effect for cards */}
        <div className="relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,205,178,0.15),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(229,152,155,0.12),transparent_70%)]" />
          </div>

          {/* Audience Cards with slide-in animation */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-[#B5828C] text-center mb-16 animate-[slide-in-right_0.6s_ease-out_0.8s_both]">
              Who We Serve
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {audienceCards.map((audience, index) => (
                <Card 
                  key={index} 
                  className="bg-gradient-to-br from-[#FFCDB2] to-[#FFCDB2]/80 backdrop-blur-sm border-2 border-[#E5989B] rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] group"
                  style={{
                    animation: `fade-in 0.6s ease-out ${1 + index * 0.1}s both`
                  }}
                >
                  <CardHeader className="text-center pb-4">
                    <audience.icon className="w-10 h-10 text-[#E5989B] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <CardTitle className="text-[#B5828C] text-lg font-bold">{audience.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-[#B5828C] text-center leading-relaxed">{audience.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Persona Cards with staggered animations */}
          <div>
            <h2 className="text-4xl font-bold text-[#B5828C] text-center mb-16 animate-[slide-in-right_0.6s_ease-out_1.4s_both]">
              Key Personas
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {personas.map((persona, index) => (
                <Card 
                  key={index} 
                  className="bg-gradient-to-br from-[#FFCDB2] to-[#FFCDB2]/80 backdrop-blur-sm border-2 border-[#E5989B] rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] group"
                  style={{
                    animation: `fade-in 0.6s ease-out ${1.6 + index * 0.1}s both`
                  }}
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="text-[#B5828C] text-xl font-bold">
                      {persona.role} "{persona.name}"
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-[#B5828C] leading-relaxed">{persona.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
