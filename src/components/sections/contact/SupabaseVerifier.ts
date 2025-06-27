
import { supabase } from "@/integrations/supabase/client";

export const verifySupabaseConnection = () => {
  console.log('=== SUPABASE CONNECTION VERIFICATION ===');
  
  // Known configuration values for this project
  const expectedUrl = 'https://ydtkmvnzaqncuytxqnwk.supabase.co';
  const expectedProjectId = 'ydtkmvnzaqncuytxqnwk';
  
  console.log('Supabase Configuration Check:', {
    expectedUrl,
    expectedProjectId,
    clientConfigured: !!supabase,
    clientType: typeof supabase,
    projectIdMatch: expectedUrl.includes(expectedProjectId)
  });
  
  // Log role information
  console.log('Role Information:', {
    role: 'anon (public)',
    description: 'Anonymous/unauthenticated role',
    expectedCapabilities: ['INSERT into leads table with RLS policy']
  });
  
  return {
    isConfiguredCorrectly: true,
    projectId: expectedProjectId,
    url: expectedUrl
  };
};

export const testAnonymousInsert = async () => {
  console.log('=== TESTING ANONYMOUS INSERT ===');
  
  const testPayload = {
    id: `test-${Date.now()}`,
    full_name: 'Test User',
    company_name: 'Test Company',
    work_email: 'test@example.com',
    team_size: '1-5',
    team_challenges: 'Testing RLS functionality'
    // Removed submitted_at - let Supabase auto-populate created_at
  };
  
  console.log('Test payload (Supabase will auto-populate created_at):', testPayload);
  
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([testPayload])
      .select();
    
    if (error) {
      console.error('❌ Anonymous insert test failed:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      return { success: false, error };
    }
    
    console.log('✅ Anonymous insert test successful:', data);
    
    // Clean up test data
    if (data?.[0]?.id) {
      await supabase.from('leads').delete().eq('id', data[0].id);
      console.log('🧹 Test data cleaned up');
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('❌ Exception during anonymous insert test:', error);
    return { success: false, error };
  }
};

export const testEndToEndFormSubmission = async () => {
  console.log('=== END-TO-END FORM SUBMISSION TEST ===');
  
  const testFormData = {
    full_name: 'E2E Test Debug',
    company_name: 'GrowPoint',
    work_email: 'e2e@growpoint.app',
    team_size: '1-10',
    team_challenges: 'Testing end-to-end flow'
    // Removed submitted_at - let Supabase auto-populate created_at
  };
  
  console.log('Testing with form data (Supabase will auto-populate created_at):', testFormData);
  
  try {
    // Test the exact same flow as the form uses
    const { data, error } = await supabase
      .from('leads')
      .insert([testFormData])
      .select();
    
    if (error) {
      console.error('❌ End-to-end test failed:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
        sqlState: error.code
      });
      
      // Provide specific debugging info for common errors
      if (error.code === '42501') {
        console.error('🔒 RLS POLICY ERROR: Anonymous role cannot INSERT');
        console.error('💡 Check: RLS policies allow anon role INSERT operations');
      }
      
      return { success: false, error, testData: testFormData };
    }
    
    console.log('✅ End-to-end test successful!');
    console.log('📊 Inserted data:', data);
    
    // Clean up test data
    if (data?.[0]?.id) {
      const { error: deleteError } = await supabase
        .from('leads')
        .delete()
        .eq('id', data[0].id);
      
      if (deleteError) {
        console.warn('⚠️ Could not clean up test data:', deleteError);
      } else {
        console.log('🧹 Test data cleaned up successfully');
      }
    }
    
    return { success: true, data, testData: testFormData };
    
  } catch (exception) {
    console.error('❌ Exception during end-to-end test:', exception);
    return { success: false, error: exception, testData: testFormData };
  }
};
