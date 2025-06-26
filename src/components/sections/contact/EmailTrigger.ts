
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
    // Check if RESEND_API_KEY is configured
    console.log('Checking Resend configuration...');
    
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
      console.error('❌ Confirmation email failed:', {
        error: error,
        message: error.message,
        context: error.context || 'No additional context'
      });
      
      if (error.message?.includes('RESEND_API_KEY')) {
        throw new Error('⛔ Missing or invalid RESEND_API_KEY – cannot send confirmation email');
      }
      
      throw new Error(`Confirmation email failed: ${error.message}`);
    }

    console.log('✅ Confirmation email sent successfully:', {
      success: true,
      response: data,
      recipient: formData.email
    });
    return data;
  } catch (error) {
    console.error('❌ Exception in confirmation email:', {
      error: error,
      message: error.message,
      recipient: formData.email
    });
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
      console.error('❌ Admin notification failed:', {
        error: error,
        message: error.message,
        context: error.context || 'No additional context'
      });
      
      if (error.message?.includes('RESEND_API_KEY')) {
        throw new Error('⛔ Missing or invalid RESEND_API_KEY – cannot send admin notification');
      }
      
      throw new Error(`Admin notification failed: ${error.message}`);
    }

    console.log('✅ Admin notification sent successfully:', {
      success: true,
      response: data,
      leadInfo: { name: formData.name, company: formData.company }
    });
    return data;
  } catch (error) {
    console.error('❌ Exception in admin notification:', {
      error: error,
      message: error.message,
      leadInfo: { name: formData.name, company: formData.company }
    });
    throw error;
  }
};
