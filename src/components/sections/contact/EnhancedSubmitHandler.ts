
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
    throw new Error('Supabase configuration mismatch - check URL and project ID');
  }
  
  // Step 2: Prepare insert payload - let Supabase handle created_at automatically
  const insertPayload = {
    id: uuidv4(),
    full_name: formData.name?.trim() || null,
    company_name: formData.company?.trim() || null,
    work_email: formData.email?.trim() || null,
    team_size: formData.teamSize || null,
    team_challenges: formData.message?.trim() || null
    // Removed submitted_at - let Supabase auto-populate created_at
  };
  
  console.log('Insert payload prepared (Supabase will auto-populate created_at):', {
    ...insertPayload,
    id: insertPayload.id.substring(0, 8) + '...'
  });
  
  // Step 3: Validate required fields
  if (!insertPayload.full_name || !insertPayload.work_email) {
    throw new Error('Name and email are required fields');
  }
  
  // Step 4: Log the exact request being made
  console.log('Making Supabase insert request:', {
    table: 'leads',
    operation: 'INSERT',
    role: 'anon',
    rlsPoliciesExpected: ['allow_public_lead_inserts'],
    payload: insertPayload
  });
  
  try {
    // Step 5: Execute insert with detailed error capture
    const { data, error } = await supabase
      .from('leads')
      .insert([insertPayload])
      .select();
    
    if (error) {
      console.error('=== SUPABASE INSERT ERROR DETAILS ===');
      console.error('Error object:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
        fullError: error
      });
      
      // Enhanced error analysis
      let userFriendlyMessage = 'Database error occurred';
      let technicalContext = '';
      
      switch (error.code) {
        case '42501':
          userFriendlyMessage = 'Permission denied - RLS policy issue';
          technicalContext = 'The anon role cannot INSERT into leads table. Check RLS policies.';
          console.error('🔒 RLS POLICY VIOLATION - anon role blocked from INSERT');
          break;
        case '23505':
          userFriendlyMessage = 'Duplicate entry detected';
          technicalContext = 'Unique constraint violation, likely duplicate ID';
          break;
        case '23502':
          userFriendlyMessage = 'Required field missing';
          technicalContext = 'NOT NULL constraint violation on required column';
          break;
        case '23514':
          userFriendlyMessage = 'Data validation failed';
          technicalContext = 'CHECK constraint violation';
          break;
        default:
          userFriendlyMessage = error.message;
          technicalContext = `Code: ${error.code}`;
      }
      
      throw new Error(`${userFriendlyMessage}\n\nTechnical: ${technicalContext}\nFull error: ${JSON.stringify(error)}`);
    }
    
    // Step 6: Log successful insertion
    console.log('=== INSERT SUCCESSFUL ===');
    console.log('Lead successfully saved:', {
      id: data?.[0]?.id,
      created_at: data?.[0]?.created_at, // Now using Supabase auto-populated timestamp
      recordCount: data?.length || 0
    });
    
    return data;
    
  } catch (error) {
    console.error('=== EXCEPTION DURING INSERT ===');
    console.error('Exception details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
};
