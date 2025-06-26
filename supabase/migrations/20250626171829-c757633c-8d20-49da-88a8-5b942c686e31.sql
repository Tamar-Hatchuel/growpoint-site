
-- Create RLS policy to allow anyone to insert leads (for public contact form)
CREATE POLICY "Allow public lead submissions" 
ON public.leads 
FOR INSERT 
TO public
WITH CHECK (true);

-- Create policy to allow service role to select leads (for admin purposes)
CREATE POLICY "Allow service role to read leads" 
ON public.leads 
FOR SELECT 
TO service_role
USING (true);
