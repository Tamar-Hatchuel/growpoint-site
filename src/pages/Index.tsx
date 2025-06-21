
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBarIncreasing } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFCDB2] via-[#FFB4A2] to-[#E5989B]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          {/* Logo and Brand */}
          <div className="flex justify-center items-center mb-8">
            <img 
              src="/lovable-uploads/43b0b874-e122-40e2-b660-a589c42b2368.png" 
              alt="GrowPoint Logo" 
              className="w-20 h-20 mr-4"
            />
            <div>
              <h1 className="text-6xl font-bold text-[#B5828C] mb-2">GrowPoint</h1>
              <p className="text-2xl text-[#B5828C] font-medium">"Empowering People. Accelerating Teams."</p>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-xl text-[#B5828C] max-w-3xl mx-auto leading-relaxed">
            GrowPoint is a SaaS platform that helps organizations understand and improve team dynamics 
            through anonymous feedback, AI insights, and real-time analytics.
          </p>
        </div>

        {/* Problem & Solution Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white/90 backdrop-blur-sm border-[#E5989B]">
            <CardHeader>
              <CardTitle className="text-[#B5828C]">The Problem</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Teams struggle with hidden friction, unclear feedback, and lack of data on cohesion. 
                Traditional approaches miss the nuanced interpersonal dynamics that drive performance.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-[#E5989B]">
            <CardHeader>
              <CardTitle className="text-[#B5828C]">Our Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                GrowPoint delivers anonymous check-ins, real-time analytics, and AI-generated feedback 
                to boost collaboration and performance through data-driven insights.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Features */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-[#B5828C] text-center mb-12">Core Features</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              "Sociometric Input",
              "Target Team Outcomes",
              "AI Feedback & Insights",
              "KPI Dashboard",
              "Actionable Suggestions"
            ].map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-[#FFB4A2] hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <ChartBarIncreasing className="w-8 h-8 text-[#B5828C] mx-auto mb-3" />
                  <h3 className="font-semibold text-[#B5828C]">{feature}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Target Audiences */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-[#B5828C] text-center mb-12">Who We Serve</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-[#FFB4A2]">
              <CardHeader>
                <CardTitle className="text-[#B5828C] text-lg">Tech Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">Fast-growing teams needing cohesion insights</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-[#FFB4A2]">
              <CardHeader>
                <CardTitle className="text-[#B5828C] text-lg">HR Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">Leaders tracking team morale and engagement</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-[#FFB4A2]">
              <CardHeader>
                <CardTitle className="text-[#B5828C] text-lg">Team Managers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">Managers resolving peer friction early</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-[#FFB4A2]">
              <CardHeader>
                <CardTitle className="text-[#B5828C] text-lg">Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">Individuals seeking growth feedback</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Personas */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-[#B5828C] text-center mb-12">Key Personas</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/90 backdrop-blur-sm border-[#E5989B]">
              <CardHeader>
                <CardTitle className="text-[#B5828C]">HR Director "Dana"</CardTitle>
                <CardDescription>Strategic Overview</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Tracks team morale weekly and implements organization-wide engagement strategies</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-[#E5989B]">
              <CardHeader>
                <CardTitle className="text-[#B5828C]">Team Lead "Alex"</CardTitle>
                <CardDescription>Tactical Management</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Resolves peer friction early and optimizes team collaboration dynamics</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-[#E5989B]">
              <CardHeader>
                <CardTitle className="text-[#B5828C]">Employee "Leah"</CardTitle>
                <CardDescription>Personal Growth</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Seeks constructive feedback for professional development and team contribution</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Business Model & Success Metrics */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/90 backdrop-blur-sm border-[#B5828C]">
            <CardHeader>
              <CardTitle className="text-[#B5828C]">Business Model</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p><strong>Type:</strong> SaaS Platform</p>
                <p><strong>Pricing:</strong> Subscription per team/organization</p>
                <p><strong>Technology:</strong> AI-powered insights with LLM integration</p>
                <p><strong>Delivery:</strong> Real-time analytics and feedback</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-[#B5828C]">
            <CardHeader>
              <CardTitle className="text-[#B5828C]">Success Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p>✅ Role-based dashboards functional</p>
                <p>✅ Real-time analytics visualized</p>
                <p>🎯 At least 3 teams onboarded</p>
                <p>📊 A/B testing on onboarding flows</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="bg-[#B5828C] hover:bg-[#B5828C]/90 text-white px-8 py-4 text-lg"
          >
            Get Started with GrowPoint
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
