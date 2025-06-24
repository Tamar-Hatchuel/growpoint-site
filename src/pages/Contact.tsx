
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    teamSize: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const teamSizeOptions = [
    '2-10 employees',
    '11-50 employees', 
    '51-200 employees',
    '201-500 employees',
    '500+ employees'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Lead form submitted:', formData);
      
      toast({
        title: "Demo Request Submitted!",
        description: "We'll contact you within 24 hours to schedule your personalized demo.",
      });

      // Reset form
      setFormData({
        name: '',
        company: '',
        email: '',
        teamSize: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFCDB2] via-[#FFB4A2] to-[#E5989B] pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#B5828C] mb-6">Request a Demo</h1>
          <p className="text-xl text-[#B5828C] max-w-2xl mx-auto">
            Get a personalized demonstration of how GrowPoint can transform your team dynamics and boost collaboration.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-[#E5989B]">
            <CardHeader>
              <CardTitle className="text-[#B5828C] text-2xl">Tell Us About Your Team</CardTitle>
              <CardDescription>
                We'll use this information to customize your demo and show you the most relevant features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="border-[#FFB4A2] focus:ring-[#B5828C] focus:border-[#B5828C]"
                    placeholder="Your full name"
                  />
                </div>

                {/* Company Field */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="border-[#FFB4A2] focus:ring-[#B5828C] focus:border-[#B5828C]"
                    placeholder="Your company name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Work Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="border-[#FFB4A2] focus:ring-[#B5828C] focus:border-[#B5828C]"
                    placeholder="your.email@company.com"
                  />
                </div>

                {/* Team Size Field */}
                <div>
                  <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-2">
                    Team Size *
                  </label>
                  <select
                    id="teamSize"
                    name="teamSize"
                    required
                    value={formData.teamSize}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[#FFB4A2] rounded-md focus:ring-[#B5828C] focus:border-[#B5828C] bg-white"
                  >
                    <option value="">Select your team size</option>
                    {teamSizeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us about your team challenges (optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[#FFB4A2] rounded-md focus:ring-[#B5828C] focus:border-[#B5828C] resize-none"
                    placeholder="What team dynamics challenges are you facing? What would you like to see in the demo?"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#B5828C] hover:bg-[#B5828C]/90 text-white py-3 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Request Demo
                    </>
                  )}
                </Button>

                <p className="text-sm text-gray-600 text-center">
                  We'll contact you within 24 hours to schedule your personalized demo.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <Card className="mt-8 bg-white/80 backdrop-blur-sm border-[#FFB4A2]">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-[#B5828C] mb-4">What you'll get in your demo:</h3>
              <div className="space-y-3">
                {[
                  "Personalized walkthrough of GrowPoint's features",
                  "Live demonstration with your team's use cases",
                  "Q&A session with our product experts", 
                  "Custom pricing proposal for your team size",
                  "Implementation timeline and onboarding overview"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
