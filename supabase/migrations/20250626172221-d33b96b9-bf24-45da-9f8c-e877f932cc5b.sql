
-- First, let's make sure RLS is enabled on the leads table
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Drop any conflicting policies that might exist
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;
DROP POLICY IF EXISTS "Allow public lead submissions" ON public.leads;
DROP POLICY IF EXISTS "Allow service role to read leads" ON public.leads;

-- Create the correct policy to allow public insertions
CREATE POLICY "Allow public lead submissions" 
ON public.leads 
FOR INSERT 
TO public
WITH CHECK (true);

-- Create policy to allow service role to read leads (for admin purposes)
CREATE POLICY "Allow service role to read leads" 
ON public.leads 
FOR SELECT 
TO service_role
USING (true);
