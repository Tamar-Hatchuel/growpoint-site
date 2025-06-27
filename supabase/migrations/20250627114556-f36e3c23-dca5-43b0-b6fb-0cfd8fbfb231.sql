
-- Clean reset of RLS policies for leads table
-- This will ensure anonymous users can insert leads through the contact form

-- Ensure RLS is enabled
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Drop all existing conflicting policies
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Allow public lead submissions" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;
DROP POLICY IF EXISTS "Allow service role to read leads" ON public.leads;
DROP POLICY IF EXISTS "allow_public_lead_inserts" ON public.leads;
DROP POLICY IF EXISTS "allow_service_role_read" ON public.leads;

-- Create the correct policy for anonymous inserts (using 'anon' role, not 'public')
CREATE POLICY "allow_public_lead_inserts" 
ON public.leads 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Create policy for service role to read leads (for admin purposes)
CREATE POLICY "allow_service_role_read" 
ON public.leads 
FOR SELECT 
TO service_role 
USING (true);

-- Verify the policies are created correctly
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'leads';
