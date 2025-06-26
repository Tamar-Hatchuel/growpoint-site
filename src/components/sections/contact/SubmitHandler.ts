
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
  console.log('Attempting to submit lead:', formData);
  
  // Save to Supabase with generated ID
  const { data, error } = await supabase
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
    ])
    .select(); // Add select to get the inserted data

  if (error) {
    console.error('Supabase error details:', error);
    throw new Error(`Database error: ${error.message} (Code: ${error.code})`);
  }

  console.log('Lead successfully saved to Supabase:', data);
  return data;
};
