
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Users, BarChart3, Brain } from "lucide-react";

const Demo = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-[#FFCDB2] via-[#FFB4A2] to-[#E5989B] pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#B5828C] mb-6">See GrowPoint in Action</h1>
          <p className="text-xl text-[#B5828C] max-w-3xl mx-auto">
            Experience how GrowPoint transforms team dynamics through real-time feedback and AI-powered insights.
          </p>
        </div>

        {/* Video Section */}
        <div className="mb-16">
          <Card className="bg-white/90 backdrop-blur-sm border-[#E5989B] overflow-hidden">
            <CardContent className="p-0">
              <div className="relative bg-gray-100 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-[#B5828C] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#B5828C] mb-2">Product Demo Video</h3>
                  <p className="text-gray-600 mb-4">Watch a 3-minute overview of GrowPoint's key features</p>
                  <Button className="bg-[#B5828C] hover:bg-[#B5828C]/90 text-white">
                    <Play className="w-4 h-4 mr-2" />
                    Play Demo
                  </Button>
                </div>
                {/* Upload instruction overlay */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-xs text-gray-600">
                    📹 Upload your demo video here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3-Step Process */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-[#B5828C] text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
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
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-[#B5828C]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Screenshot Gallery Placeholder */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#B5828C] text-center mb-8">Product Interface</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="bg-white/80 backdrop-blur-sm border-[#FFB4A2] overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-[#FFCDB2] to-[#E5989B] flex items-center justify-center">
                    <div className="text-center text-[#B5828C]">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm font-medium">Screenshot {item}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-white/90 backdrop-blur-sm border-[#B5828C] max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-[#B5828C] text-2xl">Ready to Transform Your Team?</CardTitle>
              <CardDescription className="text-lg">
                Try GrowPoint with your team today and see the difference data-driven insights can make.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                size="lg" 
                className="bg-[#B5828C] hover:bg-[#B5828C]/90 text-white px-8 py-4 text-lg"
              >
                Try the Product Live
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-gray-600 mt-4">
                Opens the actual GrowPoint application in a new tab
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Demo;
