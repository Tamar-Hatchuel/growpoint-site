
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface UserSignupData {
  user_id: string;
  email: string;
  created_at: string;
  raw_user_meta_data: any;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_id, email, created_at, raw_user_meta_data }: UserSignupData = await req.json();

    // Extract user details from metadata if available
    const firstName = raw_user_meta_data?.first_name || 'Not provided';
    const lastName = raw_user_meta_data?.last_name || 'Not provided';
    const fullName = `${firstName} ${lastName}`.trim() || 'Not provided';

    const emailResponse = await resend.emails.send({
      from: "GrowPoint User Alerts <Growpointsales@gmail.com>",
      to: ["Growpointsales@gmail.com"],
      subject: "🎉 New User Signup – GrowPoint",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #B5828C; font-size: 32px; margin: 0;">🎉 New User Signup</h1>
            <p style="color: #B5828C; font-size: 16px; margin: 5px 0;">GrowPoint Platform</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 30px; border-radius: 10px; border-left: 4px solid #B5828C;">
            <h2 style="color: #B5828C; margin-top: 0;">New User Registration</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #B5828C; width: 140px;">User ID:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333; font-family: monospace; font-size: 12px;">${user_id}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #B5828C;">Email:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">
                    <a href="mailto:${email}" style="color: #B5828C; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #B5828C;">Full Name:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; color: #B5828C;">Signup Time:</td>
                  <td style="padding: 10px; color: #333;">${new Date(created_at).toLocaleString()}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #FFB4A2; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p style="color: #333; font-weight: bold; margin: 0;">📈 User Engagement Actions:</p>
              <ul style="color: #333; margin: 10px 0 0 0; padding-left: 20px;">
                <li>Send welcome email sequence</li>
                <li>Monitor user onboarding progress</li>
                <li>Schedule follow-up for product adoption</li>
                <li>Add to email marketing lists</li>
              </ul>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
            <p>This notification was generated automatically when a new user signed up for GrowPoint.</p>
            <p>Signup completed at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });

    console.log("User signup notification sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in user-signup-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
