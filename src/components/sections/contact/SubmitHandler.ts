
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
  console.log('=== ENHANCED SUBMIT HANDLER ===');
  console.log('Form data received:', formData);
  
  // Debug: Verify Supabase client configuration
  console.log('Supabase client config check:', {
    supabaseUrl: 'https://ydtkmvnzaqncuytxqnwk.supabase.co',
    hasClient: !!supabase,
    clientType: typeof supabase
  });
  
  // Debug: Check current session and user context
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  console.log('Session check:', {
    hasSession: !!sessionData?.session,
    sessionError: sessionError?.message || 'None',
    userRole: sessionData?.session?.user ? 'authenticated' : 'anonymous/public'
  });
  
  // Test basic table connectivity with correct syntax
  console.log('Testing database connectivity...');
  const { data: connectTest, error: connectError } = await supabase
    .from('leads')
    .select('id')
    .limit(1);
  
  console.log('Database connectivity test:', {
    success: !connectError,
    error: connectError ? {
      code: connectError.code,
      message: connectError.message,
      details: connectError.details,
      hint: connectError.hint
    } : 'None',
    sampleDataCount: connectTest?.length || 0
  });
  
  if (connectError) {
    console.error('❌ Database connectivity failed:', connectError);
    throw new Error(`Database connection failed: ${connectError.message} (Code: ${connectError.code})`);
  }
  
  // Prepare insert data with validation
  const insertData = {
    id: uuidv4(),
    full_name: formData.name?.trim() || null,
    company_name: formData.company?.trim() || null,
    work_email: formData.email?.trim() || null,
    team_size: formData.teamSize || null,
    team_challenges: formData.message?.trim() || null,
    submitted_at: new Date().toISOString()
  };
  
  console.log('Insert data prepared:', {
    ...insertData,
    id: insertData.id.substring(0, 8) + '...' // Truncate for logging
  });
  
  // Validate required fields
  if (!insertData.full_name || !insertData.work_email) {
    throw new Error('Name and email are required fields');
  }
  
  // Attempt the database insert with enhanced logging
  console.log('Attempting database insert with role: anonymous/public');
  const { data, error } = await supabase
    .from('leads')
    .insert([insertData])
    .select();

  // Enhanced error logging and handling
  if (error) {
    console.error('=== DATABASE INSERT ERROR ===');
    console.error('Full error object:', {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
      errorData: error
    });
    
    // Provide specific error messages based on error codes
    let userMessage = 'Database error occurred';
    
    switch (error.code) {
      case '42501':
        userMessage = 'Permission denied - RLS policy blocking anonymous inserts';
        console.error('🔒 RLS POLICY VIOLATION: Insert blocked by Row Level Security');
        console.error('💡 Check: "Allow public lead submissions" policy exists and allows public role');
        break;
      case '23505':
        userMessage = 'Duplicate entry detected';
        break;
      case '23502':
        userMessage = 'Required field missing or null constraint violation';
        break;
      case '23514':
        userMessage = 'Data validation failed - check constraint violation';
        break;
      case 'PGRST100':
        userMessage = 'Query parsing error - invalid SQL syntax';
        break;
      default:
        userMessage = `Database error: ${error.message}`;
    }
    
    throw new Error(`${userMessage} (Code: ${error.code})`);
  }

  // Success logging
  console.log('=== INSERT SUCCESS ===');
  console.log('Lead successfully saved:', {
    id: data?.[0]?.id,
    timestamp: data?.[0]?.submitted_at,
    recordCount: data?.length || 0,
    insertedData: data?.[0]
  });
  
  return data;
};
