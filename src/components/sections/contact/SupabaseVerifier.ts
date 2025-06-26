
import { supabase } from "@/integrations/supabase/client";

export const verifySupabaseConnection = () => {
  console.log('=== SUPABASE CONNECTION VERIFICATION ===');
  
  // Verify configuration matches expected values
  const expectedUrl = 'https://ydtkmvnzaqncuytxqnwk.supabase.co';
  const expectedProjectId = 'ydtkmvnzaqncuytxqnwk';
  
  console.log('Supabase Configuration Check:', {
    expectedUrl,
    expectedProjectId,
    actualUrl: supabase.supabaseUrl,
    urlMatch: supabase.supabaseUrl === expectedUrl,
    projectIdFromUrl: supabase.supabaseUrl.split('//')[1]?.split('.')[0],
    projectIdMatch: supabase.supabaseUrl.includes(expectedProjectId),
    hasAnonKey: !!supabase.supabaseKey,
    anonKeyLength: supabase.supabaseKey?.length || 0
  });
  
  // Log role information
  console.log('Role Information:', {
    role: 'anon (public)',
    description: 'Anonymous/unauthenticated role',
    expectedCapabilities: ['INSERT into leads table with RLS policy']
  });
  
  return {
    isConfiguredCorrectly: supabase.supabaseUrl === expectedUrl,
    projectId: expectedProjectId
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
    team_challenges: 'Testing RLS functionality',
    submitted_at: new Date().toISOString()
  };
  
  console.log('Test payload:', testPayload);
  
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
