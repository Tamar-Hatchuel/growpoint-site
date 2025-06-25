
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Users, BarChart3, MessageSquare, Target, ExternalLink } from "lucide-react";
import TimedPopup from "@/components/ui/TimedPopup";

const Demo = () => {
  return (
    <PageLayout>
      <div className="py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#B5828C] mb-6">Experience GrowPoint Live</h1>
          <p className="text-xl text-[#B5828C] max-w-3xl mx-auto">
            See how GrowPoint transforms team dynamics in real-time. Watch our interactive demo and try the actual product yourself.
          </p>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Video Demo Section */}
            <Card className="mb-12 bg-white/90 backdrop-blur-sm border-[#E5989B]">
              <CardHeader>
                <CardTitle className="text-[#B5828C] text-2xl flex items-center">
                  <Play className="w-6 h-6 mr-2" />
                  Interactive Product Demo
                </CardTitle>
                <CardDescription>
                  Watch a 3-minute walkthrough of GrowPoint's key features and see real team transformations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-[#FFCDB2] to-[#FFB4A2] rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-[#B5828C] mx-auto mb-4" />
                    <p className="text-[#B5828C] font-medium">Demo Video Coming Soon</p>
                    <p className="text-[#B5828C]/70 text-sm">Interactive product walkthrough</p>
                  </div>
                </div>
                
                <div className="text-center space-y-4">
                  <Button 
                    size="lg"
                    className="bg-[#B5828C] hover:bg-[#B5828C]/90 text-white"
                    onClick={() => window.open('https://preview--growpoint-app.lovable.app/', '_blank')}
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Try the Product Live
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-[#B5828C] text-[#B5828C] hover:bg-[#B5828C] hover:text-white ml-4"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Contact Us for a Custom Demo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Feature Highlights */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white/80 backdrop-blur-sm border-[#FFB4A2]">
                <CardHeader>
                  <CardTitle className="text-[#B5828C] flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Team Collaboration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    See how teams work together more effectively with real-time collaboration tools and structured feedback systems.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-[#FFB4A2]">
                <CardHeader>
                  <CardTitle className="text-[#B5828C] flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Analytics Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Track team performance, engagement levels, and collaboration patterns with comprehensive analytics.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-[#FFB4A2]">
                <CardHeader>
                  <CardTitle className="text-[#B5828C] flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Feedback System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Structured feedback collection and analysis helps identify improvement areas and celebrate successes.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-[#FFB4A2]">
                <CardHeader>
                  <CardTitle className="text-[#B5828C] flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Goal Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Set, monitor, and achieve team objectives with built-in goal tracking and progress visualization.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#B5828C] mb-4">Ready to Transform Your Team?</h2>
              <p className="text-[#B5828C] mb-8 max-w-2xl mx-auto">
                Join hundreds of teams who have already improved their collaboration and productivity with GrowPoint.
              </p>
              <Button 
                size="lg"
                className="bg-[#B5828C] hover:bg-[#B5828C]/90 text-white"
                onClick={() => window.location.href = '/contact'}
              >
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <TimedPopup
        message="Let's find the right plan for your company"
        buttonText="View Pricing"
        buttonLink="/pricing"
        delay={5000}
        sessionKey="demo-popup-shown"
      />
    </PageLayout>
  );
};

export default Demo;
