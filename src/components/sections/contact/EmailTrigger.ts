
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  name: string;
  company: string;
  email: string;
  teamSize: string;
  message: string;
}

export const sendConfirmationEmail = async (formData: FormData) => {
  try {
    console.log('Sending confirmation email to:', formData.email);
    
    const response = await supabase.functions.invoke('send-lead-confirmation', {
      body: {
        name: formData.name,
        email: formData.email,
        company: formData.company
      }
    });

    if (response.error) {
      console.error('Error sending confirmation email:', response.error);
      throw new Error(`Confirmation email failed: ${response.error.message}`);
    }

    console.log('Confirmation email sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error invoking confirmation email function:', error);
    throw error; // Re-throw to let the caller handle it
  }
};

export const sendAdminNotification = async (formData: FormData) => {
  try {
    console.log('Sending admin notification for lead:', formData.name);
    
    const response = await supabase.functions.invoke('send-admin-notification', {
      body: {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        teamSize: formData.teamSize,
        message: formData.message
      }
    });

    if (response.error) {
      console.error('Error sending admin notification:', response.error);
      throw new Error(`Admin notification failed: ${response.error.message}`);
    }

    console.log('Admin notification sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error invoking admin notification function:', error);
    throw error; // Re-throw to let the caller handle it
  }
};
