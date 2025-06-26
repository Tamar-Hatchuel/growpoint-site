
-- 1. Enable RLS and check existing policies
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Check existing policies
SELECT policyname, cmd, permissive, roles, qual, with_check
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'leads';

-- 2. Drop any existing policies that might conflict
DROP POLICY IF EXISTS "Allow public lead submissions" ON public.leads;
DROP POLICY IF EXISTS "Allow service role to read leads" ON public.leads;

-- 3. Create clean RLS policy for anonymous inserts
CREATE POLICY "allow_public_lead_inserts" 
ON public.leads 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- 4. Create policy for service role to read (for admin functions)
CREATE POLICY "allow_service_role_read" 
ON public.leads 
FOR SELECT 
TO service_role 
USING (true);

-- 5. Verify table schema
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'leads'
ORDER BY ordinal_position;
