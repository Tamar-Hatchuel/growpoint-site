import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Brain, Building } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
const About = () => {
  const audienceCards = [{
    title: "Tech Companies",
    description: "Fast-growing teams needing cohesion insights",
    icon: Building
  }, {
    title: "HR Professionals",
    description: "Leaders tracking team morale and engagement",
    icon: Users
  }, {
    title: "Team Managers",
    description: "Managers resolving peer friction early",
    icon: Target
  }, {
    title: "Employees",
    description: "Individuals seeking growth feedback",
    icon: Brain
  }];
  const personas = [{
    name: "Dana",
    role: "HR Director",
    description: "Tracks team morale weekly and implements organization-wide engagement strategies"
  }, {
    name: "Alex",
    role: "Team Lead",
    description: "Resolves peer friction early and optimizes team collaboration dynamics"
  }, {
    name: "Leah",
    role: "Employee",
    description: "Seeks constructive feedback for professional development and team contribution"
  }];
  return <PageLayout>
      <div className="container mx-auto px-4 py-20">
        {/* Mission Section */}
        <div className="text-center mb-20 animate-fade-in-up">
          <h1 className="text-5xl font-bold text-[#B5828C] mb-8 md:text-5xl">About GrowPoint</h1>
          
        </div>

        {/* Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <Card className="brand-card card-hover animate-fade-in-up">
            <CardHeader className="pb-4">
              <CardTitle className="text-[#B5828C] text-xl font-semibold">The Problem</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#22223B] text-base leading-relaxed">
                Current feedback systems are outdated and miss real-time team dynamics. Teams struggle with 
                hidden friction, unclear communication, and lack of actionable insights into what actually 
                drives performance and collaboration.
              </p>
            </CardContent>
          </Card>

          <Card className="brand-card card-hover animate-fade-in-up animate-delay-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-[#B5828C] text-xl font-semibold">Our Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#22223B] text-base leading-relaxed">
                Sociometric tests, live dashboards, and AI insights that provide real-time visibility into 
                team dynamics. Get anonymous feedback, data-driven recommendations, and actionable strategies 
                to improve collaboration and performance.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Audience Cards */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-[#B5828C] text-center mb-16 animate-fade-in-up md:text-4xl">Who We Serve</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {audienceCards.map((audience, index) => <Card key={index} className="brand-card card-hover animate-fade-in-up group" style={{
            animationDelay: `${index * 0.15}s`
          }}>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/40 transition-colors">
                    <audience.icon className="w-8 h-8 text-[#E5989B]" />
                  </div>
                  <CardTitle className="text-[#B5828C] text-lg font-semibold">{audience.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#22223B] text-center text-sm leading-relaxed">{audience.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Persona Cards */}
        <div>
          <h2 className="text-4xl font-bold text-[#B5828C] text-center mb-16 animate-fade-in-up md:text-4xl">Key Personas</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {personas.map((persona, index) => <Card key={index} className="brand-card card-hover animate-fade-in-up" style={{
            animationDelay: `${index * 0.2}s`
          }}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-[#B5828C] text-xl font-semibold">{persona.role} "{persona.name}"</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#22223B] text-base leading-relaxed">{persona.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>
    </PageLayout>;
};
export default About;