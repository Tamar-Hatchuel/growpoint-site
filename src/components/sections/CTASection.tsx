
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
      <Card className="bg-white/90 backdrop-blur-sm border-[#B5828C] max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-[#B5828C] text-3xl">{title}</CardTitle>
          <CardDescription className="text-lg text-gray-700">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={primaryButtonLink}>
              <Button 
                size="lg" 
                className="bg-[#B5828C] hover:bg-[#B5828C]/90 text-white px-8 py-3"
              >
                {primaryButtonText}
              </Button>
            </Link>
            {showSecondaryButton && (
              <Link to={secondaryButtonLink}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-[#B5828C] text-[#B5828C] hover:bg-[#B5828C] hover:text-white px-8 py-3"
                >
                  {secondaryButtonText}
                </Button>
              </Link>
            )}
          </div>
          <p className="text-sm text-gray-600">
            No credit card required • 14-day free trial • Setup in minutes
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CTASection;
