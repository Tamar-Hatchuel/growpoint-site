
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
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
    <div className="container mx-auto px-4 mb-20">
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
  );
};

export default TestimonialsSection;
