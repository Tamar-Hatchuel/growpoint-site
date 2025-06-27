
-- Create a trigger function that calls the send_lead_emails Edge Function
CREATE OR REPLACE FUNCTION public.trigger_send_lead_emails()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the send_lead_emails Edge Function with the new lead data
  PERFORM
    net.http_post(
      url := 'https://ydtkmvnzaqncuytxqnwk.supabase.co/functions/v1/send_lead_emails',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
      ),
      body := jsonb_build_object('record', to_jsonb(NEW))
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger that fires after INSERT on leads table
CREATE OR REPLACE TRIGGER send_lead_emails_trigger
  AFTER INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_send_lead_emails();
