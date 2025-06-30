
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LeadInputForm from "./contact/LeadInputForm";
import { submitLeadWithEnhancedDebugging } from "./contact/EnhancedSubmitHandler";
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
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      console.log('=== FORM SUBMISSION STARTING ===');
      console.log('Form data:', formData);
      
      // Use enhanced submit handler with security improvements
      console.log('Step 1: Saving lead to database...');
      const savedLead = await submitLeadWithEnhancedDebugging(formData);
      console.log('✅ Lead saved successfully:', savedLead);

      // Send emails with improved error handling
      console.log('Step 2: Sending emails...');
      const emailResults = await Promise.allSettled([
        sendConfirmationEmail(formData),
        sendAdminNotification(formData)
      ]);

      // Process email results
      let emailWarnings = [];
      emailResults.forEach((result, index) => {
        const emailType = index === 0 ? 'confirmation' : 'admin notification';
        if (result.status === 'fulfilled') {
          console.log(`✅ ${emailType} email sent successfully`);
        } else {
          console.error(`❌ ${emailType} email failed:`, result.reason);
          emailWarnings.push(`${emailType} email delivery delayed`);
        }
      });

      // Show success message with sanitized feedback
      toast({
        title: "Demo Request Submitted!",
        description: emailWarnings.length > 0 
          ? `Request saved successfully! ${emailWarnings.join(', ')} - We'll still contact you within 24 hours.`
          : "We'll contact you within 24 hours to schedule your personalized demo. Check your email for confirmation.",
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
      console.error('=== FORM SUBMISSION ERROR ===');
      console.error('Full error details:', error);
      
      // Show user-friendly error message
      const userMessage = error instanceof Error 
        ? error.message 
        : 'Something went wrong. Please try again.';
      
      setSubmitError(userMessage);
      
      toast({
        title: "Submission Failed",
        description: userMessage,
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
        <Card className="bg-[#F1F4F5] backdrop-blur-sm border-[#E5989B]">
          <CardHeader>
            <CardTitle className="text-[#B5828C] text-2xl">Tell Us About Your Team</CardTitle>
            <CardDescription>
              We'll use this information to customize your demo and show you the most relevant features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {submitError}
                </AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <LeadInputForm formData={formData} onChange={handleChange} />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FFCDB2] hover:bg-[#E5989B] text-white py-3 text-lg transition-all duration-300"
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
        <Card className="mt-8 bg-[#F1F4F5] backdrop-blur-sm border-[#E5989B]">
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
                  <CheckCircle className="w-5 h-5 text-[#E5989B] mr-3" />
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
