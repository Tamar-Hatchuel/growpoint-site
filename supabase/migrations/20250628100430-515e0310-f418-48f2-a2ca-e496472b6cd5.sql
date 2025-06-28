
-- First, drop all existing policies on the leads table to start clean
DROP POLICY IF EXISTS "allow_public_lead_inserts" ON public.leads;
DROP POLICY IF EXISTS "Allow public lead submissions" ON public.leads;
DROP POLICY IF EXISTS "service_role_full_access" ON public.leads;

-- Create exactly two policies as recommended:
-- 1. Allow anonymous users to insert leads
CREATE POLICY "anon_can_insert_leads" 
ON public.leads 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- 2. Allow service role to select all leads (for admin functions and triggers)
CREATE POLICY "service_role_can_select_leads" 
ON public.leads 
FOR SELECT 
TO service_role 
USING (true);

-- Ensure RLS is enabled on the leads table
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
