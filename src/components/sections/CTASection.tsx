
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  showSecondaryButton?: boolean;
}

const CTASection = ({ 
  title = "Ready to Transform Your Team?",
  description = "Join hundreds of teams already using GrowPoint to build stronger, more collaborative workplaces.",
  primaryButtonText = "Watch Free Demo",
  primaryButtonLink = "/demo",
  secondaryButtonText = "Request Demo",
  secondaryButtonLink = "/contact",
  showSecondaryButton = true
}: CTASectionProps) => {
  return (
    <div className="container mx-auto px-4 text-center">
      <Card className="bg-[#FFCDB2] border-2 border-[#E5989B] max-w-4xl mx-auto rounded-3xl shadow-2xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-[#B5828C] text-4xl md:text-5xl font-bold">{title}</CardTitle>
          <CardDescription className="text-xl md:text-2xl text-[#B5828C] leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to={primaryButtonLink}>
              <Button 
                size="lg" 
                className="bg-[#FFCDB2] hover:bg-[#E5989B] text-[#B5828C] font-semibold px-12 py-6 text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 min-h-[60px] touch-manipulation border-2 border-[#E5989B]"
              >
                {primaryButtonText}
              </Button>
            </Link>
            {showSecondaryButton && (
              <Link to={secondaryButtonLink}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-[#E5989B] text-[#B5828C] hover:bg-[#E5989B] hover:text-white font-semibold px-12 py-6 text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 min-h-[60px] touch-manipulation"
                >
                  {secondaryButtonText}
                </Button>
              </Link>
            )}
          </div>
          <p className="text-[#B5828C] opacity-80 text-lg">
            No credit card required • 14-day free trial • Setup in minutes
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CTASection;
