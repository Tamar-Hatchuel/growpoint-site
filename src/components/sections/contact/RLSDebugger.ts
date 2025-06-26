
import { supabase } from "@/integrations/supabase/client";

export const debugRLSSetup = async () => {
  console.log('=== RLS DEBUG UTILITY ===');
  
  try {
    // Check if we can access the table at all
    console.log('1. Testing basic table access...');
    const { data: tableTest, error: tableError } = await supabase
      .from('leads')
      .select('count(*)')
      .single();
    
    console.log('Table access result:', tableTest);
    console.log('Table access error:', tableError);
    
    // Check current user context
    console.log('2. Checking authentication context...');
    const { data: { user } } = await supabase.auth.getUser();
    console.log('Current user:', user ? 'Authenticated user' : 'Anonymous/Public user');
    
    // Test a minimal insert
    console.log('3. Testing minimal insert...');
    const testInsert = {
      id: 'test-' + Date.now(),
      full_name: 'Test User',
      company_name: 'Test Company',
      work_email: 'test@example.com',
      team_size: '1-5',
      team_challenges: 'Testing RLS',
      submitted_at: new Date().toISOString()
    };
    
    const { data: insertResult, error: insertError } = await supabase
      .from('leads')
      .insert([testInsert])
      .select();
    
    console.log('Test insert result:', insertResult);
    console.log('Test insert error:', insertError);
    
    if (insertResult) {
      console.log('SUCCESS: RLS is working correctly!');
      // Clean up test data
      await supabase
        .from('leads')
        .delete()
        .eq('id', testInsert.id);
      console.log('Test data cleaned up');
    }
    
  } catch (error) {
    console.error('RLS Debug failed:', error);
  }
};
