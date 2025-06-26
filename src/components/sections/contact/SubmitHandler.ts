
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  name: string;
  company: string;
  email: string;
  teamSize: string;
  message: string;
}

export const submitLead = async (formData: FormData) => {
  // Save to Supabase
  const { error } = await supabase
    .from('leads')
    .insert([
      {
        full_name: formData.name,
        company_name: formData.company,
        work_email: formData.email,
        team_size: formData.teamSize,
        team_challenges: formData.message
      }
    ]);

  if (error) {
    console.error('Error saving lead:', error);
    throw new Error('Failed to save lead to database');
  }

  console.log('Lead successfully saved to Supabase');
  return true;
};
