
-- Step 1: Clean Reset of RLS Policies for leads table
-- This will drop all existing policies and recreate them cleanly

-- Ensure RLS is enabled
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to prevent conflicts
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Allow public lead submissions" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;
DROP POLICY IF EXISTS "Allow service role to read leads" ON public.leads;

-- Create clean policy for public insertions
CREATE POLICY "Allow public lead submissions" 
ON public.leads 
FOR INSERT 
TO public
WITH CHECK (true);

-- Create policy for service role to read leads (for admin purposes)
CREATE POLICY "Allow service role to read leads" 
ON public.leads 
FOR SELECT 
TO service_role
USING (true);
