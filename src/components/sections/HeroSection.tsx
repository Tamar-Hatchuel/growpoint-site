
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center">
      {/* Hero background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD6C9] to-[#FFFFFF] opacity-60" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16">
          {/* Centered Logo and Brand */}
          <div className="flex flex-col items-center justify-center mb-12">
            <img 
              src="/lovable-uploads/43b0b874-e122-40e2-b660-a589c42b2368.png" 
              alt="GrowPoint Logo" 
              className="w-24 h-24 mb-6 filter drop-shadow-lg"
            />
            <div className="text-center">
              <h1 className="text-6xl md:text-7xl font-bold text-[#B5828C] mb-4">GrowPoint</h1>
              <p className="text-2xl md:text-3xl text-[#B5828C] font-medium">"Empowering People. Accelerating Teams."</p>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-[#B5828C] max-w-4xl mx-auto leading-relaxed mb-12">
            GrowPoint is a SaaS platform that helps organizations understand and improve team dynamics 
            through anonymous feedback, AI insights, and real-time analytics.
          </p>

          {/* Main CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/demo">
              <Button 
                size="lg" 
                className="bg-[#FFCDB2] hover:bg-[#E5989B] text-[#B5828C] font-semibold px-12 py-6 text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 min-h-[60px] touch-manipulation"
              >
                Start Your Survey
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
            
            <Link to="/demo">
              <Button 
                variant="outline"
                size="lg" 
                className="border-2 border-[#E5989B] text-[#B5828C] hover:bg-[#E5989B] hover:text-white font-semibold px-12 py-6 text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 min-h-[60px] touch-manipulation"
              >
                Watch Free Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
