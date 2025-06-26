
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
    const response = await supabase.functions.invoke('send-lead-confirmation', {
      body: {
        name: formData.name,
        email: formData.email,
        company: formData.company
      }
    });

    if (response.error) {
      console.error('Error sending confirmation email:', response.error);
      return false;
    }

    console.log('Confirmation email sent successfully');
    return true;
  } catch (error) {
    console.error('Error invoking confirmation email function:', error);
    return false;
  }
};

export const sendAdminNotification = async (formData: FormData) => {
  try {
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
      return false;
    }

    console.log('Admin notification sent successfully');
    return true;
  } catch (error) {
    console.error('Error invoking admin notification function:', error);
    return false;
  }
};
