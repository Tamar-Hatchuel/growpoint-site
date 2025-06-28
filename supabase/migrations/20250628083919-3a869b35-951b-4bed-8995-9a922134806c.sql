
-- Create a trigger function that calls the user-signup-notification Edge Function
CREATE OR REPLACE FUNCTION public.trigger_user_signup_notification()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the user-signup-notification Edge Function with the new user data
  PERFORM
    net.http_post(
      url := 'https://ydtkmvnzaqncuytxqnwk.supabase.co/functions/v1/user-signup-notification',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
      ),
      body := jsonb_build_object(
        'user_id', NEW.id::text,
        'email', NEW.email,
        'created_at', NEW.created_at::text,
        'raw_user_meta_data', NEW.raw_user_meta_data
      )
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger that fires after INSERT on auth.users table
CREATE OR REPLACE TRIGGER user_signup_notification_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_user_signup_notification();
