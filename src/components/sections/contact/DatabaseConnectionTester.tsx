
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, TestTube, Database, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { testAnonymousInsert, testEndToEndFormSubmission, verifySupabaseConnection } from "./SupabaseVerifier";

const DatabaseConnectionTester = () => {
  const [testResults, setTestResults] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const runConnectionTest = async () => {
    setIsRunning(true);
    setTestResults(null);
    
    console.log('=== RUNNING COMPREHENSIVE DATABASE TESTS ===');
    
    try {
      // Step 1: Verify connection
      const connectionResult = verifySupabaseConnection();
      
      // Step 2: Test anonymous insert
      const anonymousInsertResult = await testAnonymousInsert();
      
      // Step 3: Test end-to-end form submission
      const endToEndResult = await testEndToEndFormSubmission();
      
      const results = {
        connection: connectionResult,
        anonymousInsert: anonymousInsertResult,
        endToEnd: endToEndResult,
        overallSuccess: anonymousInsertResult.success && endToEndResult.success
      };
      
      setTestResults(results);
      
      toast({
        title: results.overallSuccess ? "All Tests Passed!" : "Some Tests Failed",
        description: results.overallSuccess 
          ? "Database connection and RLS policies are working correctly"
          : "Check console for detailed error information",
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
    <Card className="mt-6 bg-white/80 backdrop-blur-sm border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-700 flex items-center gap-2">
          <Database className="w-5 h-5" />
          Database Connection Tester
        </CardTitle>
        <CardDescription>
          Test database connectivity, RLS policies, and form submission flow
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={runConnectionTest}
          disabled={isRunning}
          className="w-full"
          variant="outline"
        >
          {isRunning ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2" />
              Running Tests...
            </>
          ) : (
            <>
              <TestTube className="w-4 h-4 mr-2" />
              Run Database Tests
            </>
          )}
        </Button>
        
        {testResults && (
          <div className="space-y-3">
            <Alert variant={testResults.overallSuccess ? "default" : "destructive"}>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Overall Status:</strong> {testResults.overallSuccess ? "All tests passed" : "Some tests failed"}
              </AlertDescription>
            </Alert>
            
            <div className="grid gap-2">
              <div className="flex items-center gap-2 text-sm">
                {testResults.connection.isConfiguredCorrectly ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-600" />
                )}
                <span>Supabase Connection: {testResults.connection.isConfiguredCorrectly ? "OK" : "Failed"}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                {testResults.anonymousInsert.success ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-600" />
                )}
                <span>Anonymous Insert: {testResults.anonymousInsert.success ? "OK" : "Failed"}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                {testResults.endToEnd.success ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-600" />
                )}
                <span>End-to-End Test: {testResults.endToEnd.success ? "OK" : "Failed"}</span>
              </div>
            </div>
            
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
