
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, TestTube, Database, AlertCircle, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { testAnonymousInsert, testEndToEndFormSubmission, verifySupabaseConnection } from "./SupabaseVerifier";

const DatabaseConnectionTester = () => {
  const [testResults, setTestResults] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const runConnectionTest = async () => {
    setIsRunning(true);
    setTestResults(null);
    
    console.log('=== RUNNING COMPREHENSIVE DATABASE TESTS (POST-RLS-FIX) ===');
    
    try {
      // Step 1: Verify connection
      const connectionResult = verifySupabaseConnection();
      
      // Step 2: Test anonymous insert with new RLS policy
      console.log('Testing with newly applied RLS policy...');
      const anonymousInsertResult = await testAnonymousInsert();
      
      // Step 3: Test end-to-end form submission
      const endToEndResult = await testEndToEndFormSubmission();
      
      const results = {
        connection: connectionResult,
        anonymousInsert: anonymousInsertResult,
        endToEnd: endToEndResult,
        overallSuccess: anonymousInsertResult.success && endToEndResult.success,
        rlsPolicyFixed: anonymousInsertResult.success
      };
      
      setTestResults(results);
      
      toast({
        title: results.overallSuccess ? "🎉 All Tests Passed!" : "⚠️ Some Tests Failed",
        description: results.overallSuccess 
          ? "RLS policy fix successful! Contact form should now work correctly."
          : results.rlsPolicyFixed 
            ? "RLS is working but there may be other issues. Check console for details."
            : "RLS policy may need time to propagate. Try again in a moment.",
        variant: results.overallSuccess ? "default" : "destructive"
      });
      
    } catch (error) {
      console.error('Test suite failed:', error);
      toast({
        title: "Test Suite Failed",
        description: "An unexpected error occurred during testing",
        variant: "destructive"
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Card className="mt-6 bg-white/80 backdrop-blur-sm border-green-200">
      <CardHeader>
        <CardTitle className="text-green-700 flex items-center gap-2">
          <Database className="w-5 h-5" />
          Database Connection Tester
          <RefreshCw className="w-4 h-4 text-green-600" />
        </CardTitle>
        <CardDescription>
          Test database connectivity and verify RLS policy fix for contact form submissions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={runConnectionTest}
          disabled={isRunning}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isRunning ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Testing RLS Policy Fix...
            </>
          ) : (
            <>
              <TestTube className="w-4 h-4 mr-2" />
              Test RLS Policy Fix
            </>
          )}
        </Button>
        
        {testResults && (
          <div className="space-y-3">
            <Alert variant={testResults.overallSuccess ? "default" : "destructive"}>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Overall Status:</strong> {testResults.overallSuccess ? "✅ All tests passed - Contact form ready!" : "⚠️ Some tests failed"}
              </AlertDescription>
            </Alert>
            
            <div className="grid gap-2">
              <div className="flex items-center gap-2 text-sm">
                {testResults.connection.isConfiguredCorrectly ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-600" />
                )}
                <span>Supabase Connection: {testResults.connection.isConfiguredCorrectly ? "✅ OK" : "❌ Failed"}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                {testResults.anonymousInsert.success ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-600" />
                )}
                <span>RLS Policy (anon INSERT): {testResults.anonymousInsert.success ? "✅ FIXED" : "❌ Still blocked"}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                {testResults.endToEnd.success ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-600" />
                )}
                <span>End-to-End Form Test: {testResults.endToEnd.success ? "✅ Working" : "❌ Failed"}</span>
              </div>
            </div>
            
            {testResults.rlsPolicyFixed && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-sm text-green-700">
                  🎉 <strong>RLS Policy Successfully Fixed!</strong> The contact form should now accept submissions from anonymous users.
                </AlertDescription>
              </Alert>
            )}
            
            {!testResults.overallSuccess && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Check browser console for detailed error information and debugging steps
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DatabaseConnectionTester;
