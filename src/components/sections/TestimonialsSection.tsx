
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
    <div className="container mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-[#B5828C] text-center mb-16">What Our Users Say</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card 
            key={index} 
            className="bg-[#FFCDB2] border-2 border-[#E5989B] hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-3xl"
          >
            <CardContent className="pt-8">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#E5989B] text-[#E5989B]" />
                ))}
              </div>
              <p className="text-[#B5828C] mb-6 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
              <div>
                <p className="font-bold text-[#B5828C] text-lg">{testimonial.author}</p>
                <p className="text-[#B5828C] opacity-80">{testimonial.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
