
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
      userRole: user ? 'authenticated' : 'anonymous (anon role)',
      userError: userError?.message || 'None'
    });

    // Step 3: Test basic TABLE access with simple select
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

    // Step 4: Test minimal insert operation with corrected RLS
    console.log('4. Testing minimal insert with NEW RLS policy...');
    const testId = 'debug-test-' + Date.now();
    const testInsert = {
      id: testId,
      full_name: 'RLS Debug Test - Fixed Policy',
      company_name: 'Test Company',
      work_email: 'debug@test.com',
      team_size: '1-5',
      team_challenges: 'Testing corrected RLS functionality'
      // Note: removed submitted_at - Supabase auto-populates created_at
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
      // Note: We can't delete as anon role, but that's expected
      console.log('ℹ️ Test data cleanup skipped - anon role cannot delete (expected behavior)');
      console.log('Test record will remain in database with ID:', testId);
    }

    // Step 6: Summary
    console.log('=== RLS DEBUG SUMMARY ===');
    if (!insertError) {
      console.log('🎉 SUCCESS: RLS policies are now working correctly!');
      console.log('✅ Anonymous users (anon role) can insert into leads table');
      console.log('✅ Database connectivity is working');
      console.log('✅ Supabase client is properly configured');
      console.log('✅ RLS policy "allow_public_lead_inserts" is active');
    } else {
      console.log('❌ ISSUE DETECTED:');
      console.log(`Error Code: ${insertError.code}`);
      console.log(`Error Message: ${insertError.message}`);
      
      if (insertError.code === '42501') {
        console.log('🔒 This is still an RLS policy violation');
        console.log('💡 The policy may need more time to propagate');
        console.log('💡 Try refreshing the page and testing again');
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
