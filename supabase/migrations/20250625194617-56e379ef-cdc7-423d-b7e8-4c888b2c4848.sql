
-- Create leads table to store contact form submissions
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  work_email TEXT NOT NULL,
  team_size TEXT,
  team_challenges TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (making it public for now since this is a lead form)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert leads (public form)
CREATE POLICY "Anyone can insert leads" 
  ON public.leads 
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Create policy to allow authenticated users to view leads (for admin purposes)
CREATE POLICY "Authenticated users can view leads" 
  ON public.leads 
  FOR SELECT 
  TO authenticated
  USING (true);
