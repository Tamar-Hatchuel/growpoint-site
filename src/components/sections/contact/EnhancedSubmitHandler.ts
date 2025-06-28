
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { verifySupabaseConnection } from './SupabaseVerifier';

interface FormData {
  name: string;
  company: string;
  email: string;
  teamSize: string;
  message: string;
}

export const submitLeadWithEnhancedDebugging = async (formData: FormData) => {
  console.log('=== ENHANCED LEAD SUBMISSION STARTING ===');
  console.log('Form data received:', formData);
  
  // Step 1: Verify Supabase connection
  const connectionCheck = verifySupabaseConnection();
  if (!connectionCheck.isConfiguredCorrectly) {
    throw new Error('Configuration error - please try again');
  }
  
  // Step 2: Input validation
  if (!formData.name?.trim()) {
    throw new Error('Name is required');
  }
  
  if (!formData.email?.trim()) {
    throw new Error('Email is required');
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email.trim())) {
    throw new Error('Please enter a valid email address');
  }
  
  if (!formData.company?.trim()) {
    throw new Error('Company name is required');
  }
  
  // Step 3: Prepare insert payload with sanitized data
  const insertPayload = {
    id: uuidv4(),
    full_name: formData.name.trim().substring(0, 255), // Limit length
    company_name: formData.company.trim().substring(0, 255),
    work_email: formData.email.trim().toLowerCase().substring(0, 255),
    team_size: formData.teamSize || null,
    team_challenges: formData.message?.trim().substring(0, 1000) || null // Limit message length
  };
  
  console.log('Insert payload prepared:', {
    ...insertPayload,
    id: insertPayload.id.substring(0, 8) + '...'
  });
  
  try {
    // Step 4: Execute insert with clean error handling
    const { data, error } = await supabase
      .from('leads')
      .insert([insertPayload])
      .select();
    
    if (error) {
      console.error('Database error details:', {
        code: error.code,
        message: error.message,
        details: error.details
      });
      
      // Return user-friendly error messages
      switch (error.code) {
        case '42501':
          throw new Error('Permission error - please try again or contact support');
        case '23505':
          throw new Error('This request has already been submitted');
        case '23502':
          throw new Error('Please fill in all required fields');
        case '23514':
          throw new Error('Invalid data format - please check your entries');
        default:
          throw new Error('Unable to submit request - please try again');
      }
    }
    
    console.log('=== INSERT SUCCESSFUL ===');
    console.log('Lead successfully saved:', {
      id: data?.[0]?.id,
      created_at: data?.[0]?.created_at,
      recordCount: data?.length || 0
    });
    
    return data;
    
  } catch (error) {
    console.error('Exception during insert:', {
      name: error.name,
      message: error.message
    });
    
    // Re-throw with sanitized message
    if (error.message.includes('fetch')) {
      throw new Error('Network error - please check your connection and try again');
    }
    
    throw error;
  }
};
