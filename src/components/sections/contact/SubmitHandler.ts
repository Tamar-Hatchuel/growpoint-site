
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

interface FormData {
  name: string;
  company: string;
  email: string;
  teamSize: string;
  message: string;
}

export const submitLead = async (formData: FormData) => {
  console.log('=== DEBUGGING RLS ISSUE ===');
  console.log('Attempting to submit lead:', formData);
  
  // Debug: Check current session and user
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  console.log('Current session:', sessionData);
  console.log('Session error:', sessionError);
  console.log('Current user:', sessionData?.session?.user || 'No user (anonymous)');
  
  // Debug: Test table access first with a simple select
  console.log('Testing table access with SELECT...');
  const { data: testData, error: testError } = await supabase
    .from('leads')
    .select('id')
    .limit(1);
  
  console.log('Test SELECT result:', testData);
  console.log('Test SELECT error:', testError);
  
  // Prepare the insert data
  const insertData = {
    id: uuidv4(), // Generate a UUID for the required id field
    full_name: formData.name,
    company_name: formData.company,
    work_email: formData.email,
    team_size: formData.teamSize,
    team_challenges: formData.message,
    submitted_at: new Date().toISOString()
  };
  
  console.log('Insert data prepared:', insertData);
  
  // Try the insert with detailed error logging
  console.log('Attempting INSERT into leads table...');
  const { data, error } = await supabase
    .from('leads')
    .insert([insertData])
    .select(); // Add select to get the inserted data

  console.log('INSERT result data:', data);
  console.log('INSERT error (full):', error);
  
  if (error) {
    console.error('=== DETAILED ERROR ANALYSIS ===');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error details:', error.details);
    console.error('Error hint:', error.hint);
    
    // Try to provide more specific error information
    if (error.code === '42501') {
      console.error('RLS VIOLATION DETECTED:');
      console.error('- This means the current role does not have permission to insert');
      console.error('- Current role appears to be:', sessionData?.session?.user ? 'authenticated' : 'anon/public');
      console.error('- Check if policies are correctly applied to the right role');
    }
    
    throw new Error(`Database error: ${error.message} (Code: ${error.code})`);
  }

  console.log('=== SUCCESS ===');
  console.log('Lead successfully saved to Supabase:', data);
  return data;
};
