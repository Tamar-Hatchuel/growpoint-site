
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  name: string;
  company: string;
  email: string;
  teamSize: string;
  message: string;
}

export const sendConfirmationEmail = async (formData: FormData) => {
  console.log('=== SENDING CONFIRMATION EMAIL ===');
  console.log('Email target:', formData.email);
  
  try {
    const { data, error } = await supabase.functions.invoke('send-lead-confirmation', {
      body: {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        teamSize: formData.teamSize,
        message: formData.message
      }
    });

    if (error) {
      console.error('❌ Confirmation email failed:', error);
      throw new Error(`Confirmation email failed: ${error.message}`);
    }

    console.log('✅ Confirmation email sent successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ Exception in confirmation email:', error);
    throw error;
  }
};

export const sendAdminNotification = async (formData: FormData) => {
  console.log('=== SENDING ADMIN NOTIFICATION ===');
  console.log('Notification for lead:', formData.name);
  
  try {
    const { data, error } = await supabase.functions.invoke('send-admin-notification', {
      body: {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        teamSize: formData.teamSize,
        message: formData.message
      }
    });

    if (error) {
      console.error('❌ Admin notification failed:', error);
      throw new Error(`Admin notification failed: ${error.message}`);
    }

    console.log('✅ Admin notification sent successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ Exception in admin notification:', error);
    throw error;
  }
};
