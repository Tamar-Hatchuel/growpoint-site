
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, BarChart3 } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import ProcessSteps from "@/components/sections/ProcessSteps";
import CTASection from "@/components/sections/CTASection";

const Demo = () => {
  return (
    <PageLayout>
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
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-xs text-gray-600">
                    📹 Upload your demo video here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <ProcessSteps />

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

        {/* Updated CTA Section with both buttons */}
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a 
              href="https://preview--growpoint-app.lovable.app/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                className="bg-[#B5828C] hover:bg-[#B5828C]/90 text-white px-8 py-3"
              >
                Try the Product Live
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <Button 
              size="lg" 
              variant="outline"
              className="border-[#B5828C] text-[#B5828C] hover:bg-[#B5828C] hover:text-white px-8 py-3"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us for a Custom Demo
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            No credit card required • 14-day free trial • Setup in minutes
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Demo;
