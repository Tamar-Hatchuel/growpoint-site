
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const { record: newLead } = await req.json();
    
    // Input validation - check for required fields and email format
    if (!newLead.work_email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      console.error('Invalid email format:', newLead.work_email);
      return new Response('Invalid email format', { status: 400, headers: corsHeaders });
    }
    
    if (!newLead.full_name || !newLead.company_name) {
      console.error('Missing required fields:', { full_name: newLead.full_name, company_name: newLead.company_name });
      return new Response('Missing required fields', { status: 400, headers: corsHeaders });
    }

    // Input sanitization - escape HTML characters
    const sanitize = (str) => str ? str.replace(/[<>&"']/g, (char) => {
      const escapeChars = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#x27;' };
      return escapeChars[char];
    }) : '';

    const sanitizedLead = {
      full_name: sanitize(newLead.full_name),
      company_name: sanitize(newLead.company_name),
      work_email: newLead.work_email, // Email already validated
      team_size: sanitize(newLead.team_size || ''),
      team_challenges: sanitize(newLead.team_challenges || '')
    };

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY environment variable");
      throw new Error("Email service configuration error");
    }

    async function sendEmail(to: string, subject: string, html: string) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ 
          from: "GrowPoint Team <growpointsales@gmail.com>", // Use verified Gmail address
          to, 
          subject, 
          html 
        }),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Resend API error: ${res.status} - ${errorText}`);
        throw new Error(`Email service error: ${res.status}`);
      }
      
      return await res.json();
    }

    // Send confirmation email to user
    const confirmationResult = await sendEmail(
      sanitizedLead.work_email,
      "Your GrowPoint Demo Request!",
      `<p>Hi ${sanitizedLead.full_name}, thanks for requesting a demo. We'll contact you shortly!</p>`
    );
    console.log('Confirmation email sent successfully:', confirmationResult.id);

    // Send notification email to admin
    const adminResult = await sendEmail(
      "growpointsales@gmail.com",
      `New Demo Request: ${sanitizedLead.full_name}`,
      `<p>${sanitizedLead.full_name} from ${sanitizedLead.company_name} requested a demo.<br/>
       Email: ${sanitizedLead.work_email}<br/>
       Team Size: ${sanitizedLead.team_size}<br/>
       Challenges: ${sanitizedLead.team_challenges || "None"}</p>`
    );
    console.log('Admin notification sent successfully:', adminResult.id);

    return new Response(
      JSON.stringify({ message: "Emails sent successfully" }), 
      { 
        status: 200, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    
    // Return sanitized error message to client
    return new Response(
      JSON.stringify({ error: "Email service temporarily unavailable" }), 
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  }
});
