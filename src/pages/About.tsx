
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Brain, Building } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-[#FFCDB2] via-[#FFB4A2] to-[#E5989B] pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#B5828C] mb-6">About GrowPoint</h1>
          <p className="text-2xl text-[#B5828C] font-medium mb-8">"Empowering teams through better feedback."</p>
        </div>

        {/* Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white/90 backdrop-blur-sm border-[#E5989B]">
            <CardHeader>
              <CardTitle className="text-[#B5828C]">The Problem</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Current feedback systems are outdated and miss real-time team dynamics. Teams struggle with 
                hidden friction, unclear communication, and lack of actionable insights into what actually 
                drives performance and collaboration.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-[#E5989B]">
            <CardHeader>
              <CardTitle className="text-[#B5828C]">Our Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Sociometric tests, live dashboards, and AI insights that provide real-time visibility into 
                team dynamics. Get anonymous feedback, data-driven recommendations, and actionable strategies 
                to improve collaboration and performance.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Audience Cards */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-[#B5828C] text-center mb-12">Who We Serve</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {audienceCards.map((audience, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-[#FFB4A2] hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <audience.icon className="w-8 h-8 text-[#B5828C] mx-auto mb-3" />
                  <CardTitle className="text-[#B5828C] text-lg">{audience.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 text-center">{audience.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Persona Cards */}
        <div>
          <h2 className="text-4xl font-bold text-[#B5828C] text-center mb-12">Key Personas</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {personas.map((persona, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-[#E5989B]">
                <CardHeader>
                  <CardTitle className="text-[#B5828C]">{persona.role} "{persona.name}"</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{persona.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
