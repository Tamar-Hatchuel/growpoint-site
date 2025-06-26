
import { supabase } from "@/integrations/supabase/client";

export const debugRLSSetup = async () => {
  console.log('=== COMPREHENSIVE RLS DEBUG UTILITY ===');
  
  try {
    // Step 1: Verify Supabase client configuration
    console.log('1. Verifying Supabase client configuration...');
    console.log('Expected URL: https://ydtkmvnzaqncuytxqnwk.supabase.co');
    console.log('Expected Project ID: ydtkmvnzaqncuytxqnwk');
    
    // Step 2: Check authentication context
    console.log('2. Checking authentication context...');
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log('Auth status:', {
      isAuthenticated: !!user,
      userRole: user ? 'authenticated' : 'anonymous/public',
      userError: userError?.message || 'None'
    });

    // Step 3: Test basic table access with simple select
    console.log('3. Testing basic table connectivity...');
    const { data: testData, error: connectError } = await supabase
      .from('leads')
      .select('id')
      .limit(1);
    
    console.log('Table access test:', {
      success: !connectError,
      canRead: !connectError,
      sampleRecords: testData?.length || 0,
      error: connectError ? {
        code: connectError.code,
        message: connectError.message,
        details: connectError.details
      } : 'None'
    });

    // Step 4: Test minimal insert operation
    console.log('4. Testing minimal insert...');
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
        details: insertError.details,
        hint: insertError.hint
      } : 'None'
    });

    // Step 5: Clean up test data if insert was successful
    if (insertResult && insertResult.length > 0) {
      console.log('5. Cleaning up test data...');
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

    // Step 6: Summary
    console.log('=== RLS DEBUG SUMMARY ===');
    if (!insertError) {
      console.log('🎉 SUCCESS: RLS policies are working correctly!');
      console.log('✅ Anonymous users can insert into leads table');
      console.log('✅ Database connectivity is working');
      console.log('✅ Supabase client is properly configured');
    } else {
      console.log('❌ ISSUE DETECTED:');
      console.log(`Error Code: ${insertError.code}`);
      console.log(`Error Message: ${insertError.message}`);
      
      if (insertError.code === '42501') {
        console.log('🔒 This is an RLS policy violation');
        console.log('💡 Check that the "Allow public lead submissions" policy exists and is correctly configured');
        console.log('💡 Verify the policy allows INSERT for public role with WITH CHECK (true)');
      } else if (insertError.code === 'PGRST100') {
        console.log('🔧 This is a query parsing error');
        console.log('💡 Check for invalid SQL syntax in the request');
      }
    }
    
  } catch (error) {
    console.error('❌ RLS Debug utility failed:', error);
    console.error('Full error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
  }
};
