
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBarIncreasing, Users, Brain, BarChart3, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
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

  const testimonials = [
    {
      quote: "GrowPoint helped us identify communication gaps we didn't even know existed. Our team collaboration improved 40% in just 2 months.",
      author: "Sarah Chen",
      role: "VP of Engineering, TechFlow"
    },
    {
      quote: "The anonymous feedback feature gave our team members a safe space to share honest input. Game-changer for our HR strategy.",
      author: "Marcus Rodriguez", 
      role: "HR Director, InnovateCorp"
    },
    {
      quote: "Real-time insights into team dynamics helped us prevent conflicts before they escalated. Highly recommend for any growing team.",
      author: "Emily Watson",
      role: "Team Lead, DesignStudio"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFCDB2] via-[#FFB4A2] to-[#E5989B] pt-16">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
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
          <p className="text-xl text-[#B5828C] max-w-3xl mx-auto leading-relaxed mb-8">
            GrowPoint is a SaaS platform that helps organizations understand and improve team dynamics 
            through anonymous feedback, AI insights, and real-time analytics.
          </p>

          {/* Main CTA */}
          <Link to="/demo">
            <Button 
              size="lg" 
              className="bg-[#B5828C] hover:bg-[#B5828C]/90 text-white px-12 py-6 text-xl font-semibold"
            >
              Get Started Free
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-[#B5828C] text-center mb-12">Transform Your Team Dynamics</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-[#FFB4A2] hover:shadow-xl transition-all hover:scale-105">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-[#B5828C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-[#B5828C]" />
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

        {/* Testimonials Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-[#B5828C] text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-[#E5989B]">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-[#B5828C]">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-white/90 backdrop-blur-sm border-[#B5828C] max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-[#B5828C] text-3xl">Ready to Transform Your Team?</CardTitle>
              <CardDescription className="text-lg text-gray-700">
                Join hundreds of teams already using GrowPoint to build stronger, more collaborative workplaces.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/demo">
                  <Button 
                    size="lg" 
                    className="bg-[#B5828C] hover:bg-[#B5828C]/90 text-white px-8 py-3"
                  >
                    Watch Free Demo
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-[#B5828C] text-[#B5828C] hover:bg-[#B5828C] hover:text-white px-8 py-3"
                  >
                    Request Demo
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-gray-600">
                No credit card required • 14-day free trial • Setup in minutes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-[#E5989B]/30">
          <div className="text-center text-[#B5828C]">
            <p className="mb-4">© 2024 GrowPoint. All rights reserved.</p>
            <div className="flex justify-center space-x-6 text-sm">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="/contact" className="hover:underline">Contact</a>
              <a href="#" className="hover:underline">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
