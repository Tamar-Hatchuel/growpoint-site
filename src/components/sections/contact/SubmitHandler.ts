
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

interface FormData {
  name: string;
  company: string;
  email: string;
  teamSize: string;
  message: string;
}

export const submitLead = async (formData: FormData) => {
  // Save to Supabase with generated ID
  const { error } = await supabase
    .from('leads')
    .insert([
      {
        id: uuidv4(), // Generate a UUID for the required id field
        full_name: formData.name,
        company_name: formData.company,
        work_email: formData.email,
        team_size: formData.teamSize,
        team_challenges: formData.message,
        submitted_at: new Date().toISOString()
      }
    ]);

  if (error) {
    console.error('Error saving lead:', error);
    throw new Error('Failed to save lead to database');
  }

  console.log('Lead successfully saved to Supabase');
  return true;
};
