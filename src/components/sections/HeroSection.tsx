
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        {/* Centered Logo and Brand */}
        <div className="flex flex-col items-center justify-center mb-8">
          <img 
            src="/lovable-uploads/43b0b874-e122-40e2-b660-a589c42b2368.png" 
            alt="GrowPoint Logo" 
            className="w-20 h-20 mb-4"
          />
          <div className="text-center">
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
            className="bg-[#FFCDB2] hover:bg-[#E5989B] text-white px-12 py-6 text-xl font-semibold transition-all duration-300"
          >
            Get Started Free
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
