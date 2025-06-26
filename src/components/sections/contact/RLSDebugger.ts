
import { supabase } from "@/integrations/supabase/client";

export const debugRLSSetup = async () => {
  console.log('=== COMPREHENSIVE RLS DEBUG UTILITY ===');
  
  try {
    // Step 1: Check authentication context
    console.log('1. Checking authentication context...');
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log('Auth status:', {
      isAuthenticated: !!user,
      userRole: user ? 'authenticated' : 'anonymous/public',
      userError: userError?.message || 'None'
    });

    // Step 2: Test basic table access
    console.log('2. Testing basic table connectivity...');
    const { data: countData, error: countError } = await supabase
      .from('leads')
      .select('count(*)', { count: 'exact' });
    
    console.log('Table access test:', {
      success: !countError,
      count: countData?.[0]?.count || 'Unknown',
      error: countError?.message || 'None'
    });

    // Step 3: Test minimal insert operation
    console.log('3. Testing minimal insert...');
    const testId = 'debug-test-' + Date.now();
    const testInsert = {
      id: testId,
      full_name: 'RLS Debug Test',
      company_name: 'Test Company',
      work_email: 'debug@test.com',
      team_size: '1-5',
      team_challenges: 'Testing RLS functionality',
      submitted_at: new Date().toISOString()
    };
    
    const { data: insertResult, error: insertError } = await supabase
      .from('leads')
      .insert([testInsert])
      .select();
    
    console.log('Insert test result:', {
      success: !insertError,
      recordsInserted: insertResult?.length || 0,
      insertError: insertError ? {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details
      } : 'None'
    });

    // Step 4: Clean up test data if insert was successful
    if (insertResult && insertResult.length > 0) {
      console.log('4. Cleaning up test data...');
      const { error: deleteError } = await supabase
        .from('leads')
        .delete()
        .eq('id', testId);
      
      if (deleteError) {
        console.warn('⚠️ Could not clean up test data:', deleteError.message);
      } else {
        console.log('✅ Test data cleaned up successfully');
      }
    }

    // Step 5: Summary
    console.log('=== RLS DEBUG SUMMARY ===');
    if (!insertError) {
      console.log('🎉 SUCCESS: RLS policies are working correctly!');
      console.log('✅ Anonymous users can insert into leads table');
      console.log('✅ Database connectivity is working');
    } else {
      console.log('❌ ISSUE DETECTED:');
      console.log(`Error Code: ${insertError.code}`);
      console.log(`Error Message: ${insertError.message}`);
      
      if (insertError.code === '42501') {
        console.log('🔒 This is an RLS policy violation');
        console.log('💡 Check that the "Allow public lead submissions" policy exists and is correctly configured');
      }
    }
    
  } catch (error) {
    console.error('❌ RLS Debug utility failed:', error);
  }
};
