
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle } from "lucide-react";
import LeadInputForm from "./contact/LeadInputForm";
import { submitLead } from "./contact/SubmitHandler";
import { sendConfirmationEmail, sendAdminNotification } from "./contact/EmailTrigger";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Supabase
      await submitLead(formData);

      // Send emails (don't block on email failures)
      await Promise.allSettled([
        sendConfirmationEmail(formData),
        sendAdminNotification(formData)
      ]);

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
              <LeadInputForm formData={formData} onChange={handleChange} />

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
