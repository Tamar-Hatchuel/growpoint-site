
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle, Bug, AlertCircle, TestTube } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LeadInputForm from "./contact/LeadInputForm";
import { submitLeadWithEnhancedDebugging } from "./contact/EnhancedSubmitHandler";
import { sendConfirmationEmail, sendAdminNotification } from "./contact/EmailTrigger";
import { debugRLSSetup } from "./contact/RLSDebugger";
import { testAnonymousInsert } from "./contact/SupabaseVerifier";
import DatabaseConnectionTester from "./contact/DatabaseConnectionTester";

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

  const handleDebugRLS = async () => {
    console.log('=== MANUAL RLS DEBUG TRIGGERED ===');
    await debugRLSSetup();
  };

  const handleTestAnonymousInsert = async () => {
    console.log('=== MANUAL ANONYMOUS INSERT TEST ===');
    const result = await testAnonymousInsert();
    
    toast({
      title: result.success ? "Test Successful!" : "Test Failed",
      description: result.success 
        ? "Anonymous insert test passed - RLS is working correctly"
        : `Test failed: ${result.error?.message || 'Unknown error'}`,
      variant: result.success ? "default" : "destructive"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      console.log('=== FORM SUBMISSION STARTING ===');
      console.log('Form data:', formData);
      
      // Use enhanced submit handler with detailed debugging
      console.log('Step 1: Saving lead to database with enhanced debugging...');
      const savedLead = await submitLeadWithEnhancedDebugging(formData);
      console.log('✅ Lead saved successfully:', savedLead);

      // Send emails (don't block on email failures)
      console.log('Step 2: Sending emails...');
      const emailResults = await Promise.allSettled([
        sendConfirmationEmail(formData),
        sendAdminNotification(formData)
      ]);

      // Log email results with detailed status
      let emailWarnings = [];
      emailResults.forEach((result, index) => {
        const emailType = index === 0 ? 'confirmation' : 'admin notification';
        if (result.status === 'fulfilled') {
          console.log(`✅ ${emailType} email sent successfully:`, result.value);
        } else {
          console.error(`❌ ${emailType} email failed:`, result.reason);
          emailWarnings.push(`${emailType} email failed: ${result.reason?.message || 'Unknown error'}`);
        }
      });

      // Show success message
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
      console.error('Full error object:', error);
      
      let userErrorMessage = 'Unknown error occurred';
      let technicalDetails = '';
      
      if (error instanceof Error) {
        userErrorMessage = error.message.split('\n')[0]; // Get first line for user
        technicalDetails = error.message;
        
        // Check for specific error patterns
        if (error.message.includes('42501') || error.message.includes('Permission denied')) {
          userErrorMessage = 'Database permission error. Our team has been notified.';
        } else if (error.message.includes('connection')) {
          userErrorMessage = 'Unable to connect to database. Please try again.';
        }
      }
      
      console.error('Technical details for debugging:', technicalDetails);
      
      // Set detailed error for display in UI
      setSubmitError(technicalDetails);
      
      toast({
        title: "Submission Failed",
        description: userErrorMessage,
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
            {submitError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="whitespace-pre-line text-sm">
                  {submitError}
                </AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <LeadInputForm formData={formData} onChange={handleChange} />

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#B5828C] hover:bg-[#B5828C]/90 text-white py-3 text-lg"
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

                <Button
                  type="button"
                  onClick={handleDebugRLS}
                  variant="outline"
                  className="px-3 py-3"
                  title="Debug RLS Setup"
                >
                  <Bug className="w-4 h-4" />
                </Button>

                <Button
                  type="button"
                  onClick={handleTestAnonymousInsert}
                  variant="outline"
                  className="px-3 py-3"
                  title="Test Anonymous Insert"
                >
                  <TestTube className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-sm text-gray-600 text-center">
                We'll contact you within 24 hours to schedule your personalized demo.
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Database Connection Tester - New debugging component */}
        <DatabaseConnectionTester />

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
