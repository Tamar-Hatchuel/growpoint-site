
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
      <Card className="bg-gradient-to-br from-[#FFCDB2] to-[#FFCDB2]/80 backdrop-blur-sm border-2 border-[#E5989B] rounded-3xl max-w-4xl mx-auto shadow-2xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-[#B5828C] text-4xl font-bold mb-4">{title}</CardTitle>
          <CardDescription className="text-xl text-[#B5828C] leading-relaxed max-w-2xl mx-auto">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={primaryButtonLink}>
              <Button 
                size="lg" 
                className="bg-[#FFCDB2] hover:bg-[#E5989B] text-[#B5828C] hover:text-white px-8 py-4 h-12 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] border-2 border-[#E5989B] min-w-[200px]"
              >
                {primaryButtonText}
              </Button>
            </Link>
            {showSecondaryButton && (
              <Link to={secondaryButtonLink}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-[#E5989B] text-[#B5828C] hover:bg-[#E5989B] hover:text-white px-8 py-4 h-12 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] bg-white hover:bg-[#E5989B] min-w-[200px]"
                >
                  {secondaryButtonText}
                </Button>
              </Link>
            )}
          </div>
          <p className="text-sm text-[#B5828C] font-medium">
            No credit card required • 14-day free trial • Setup in minutes
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CTASection;
