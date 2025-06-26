
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ContactForm = () => {
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

    try {
      // First, save to Supabase
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            full_name: formData.name,
            company_name: formData.company,
            work_email: formData.email,
            team_size: formData.teamSize,
            team_challenges: formData.message
          }
        ]);

      if (error) {
        console.error('Error saving lead:', error);
        toast({
          title: "Submission Error",
          description: "There was a problem submitting your request. Please try again.",
          variant: "destructive"
        });
        return;
      }

      console.log('Lead successfully saved to Supabase');

      // Send confirmation email to lead
      try {
        const confirmationResponse = await supabase.functions.invoke('send-lead-confirmation', {
          body: {
            name: formData.name,
            email: formData.email,
            company: formData.company
          }
        });

        if (confirmationResponse.error) {
          console.error('Error sending confirmation email:', confirmationResponse.error);
        } else {
          console.log('Confirmation email sent successfully');
        }
      } catch (emailError) {
        console.error('Error invoking confirmation email function:', emailError);
      }

      // Send admin notification
      try {
        const adminResponse = await supabase.functions.invoke('send-admin-notification', {
          body: {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            teamSize: formData.teamSize,
            message: formData.message
          }
        });

        if (adminResponse.error) {
          console.error('Error sending admin notification:', adminResponse.error);
        } else {
          console.log('Admin notification sent successfully');
        }
      } catch (emailError) {
        console.error('Error invoking admin notification function:', emailError);
      }

      // Show success message
      toast({
        title: "Demo Request Submitted!",
        description: "We'll contact you within 24 hours to schedule your personalized demo. Check your email for confirmation.",
      });

      // Reset form
      setFormData({
        name: '',
        company: '',
        email: '',
        teamSize: '',
        message: ''
      });

    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4">
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
  );
};

export default ContactForm;
