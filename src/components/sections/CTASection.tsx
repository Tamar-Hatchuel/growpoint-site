import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  showSecondaryButton?: boolean;
}
const CTASection = ({
  title = "Ready to Transform Your Team?",
  description = "Join hundreds of teams already using GrowPoint to build stronger, more collaborative workplaces.",
  primaryButtonText = "Request Demo",
  primaryButtonLink = "/contact",
  showSecondaryButton = false
}: CTASectionProps) => {
  return <div className="container mx-auto px-4 text-center">
      <Card className="brand-card max-w-4xl mx-auto shadow-2xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-[#B5828C] text-4xl font-bold md:text-4xl">{title}</CardTitle>
          <CardDescription className="text-xl md:text-2xl text-[#22223B] leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex justify-center">
            <Link to={primaryButtonLink}>
              <Button size="lg" className="brand-button px-12 py-6 text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 min-h-[60px] touch-manipulation bg-[#ffb4a2]">
                {primaryButtonText}
              </Button>
            </Link>
          </div>
          <p className="text-[#B5828C] opacity-80 text-lg">
            No credit card required • 14-day free trial • Setup in minutes
          </p>
        </CardContent>
      </Card>
    </div>;
};
export default CTASection;