
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AdminNotificationRequest {
  name: string;
  email: string;
  company: string;
  teamSize: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, teamSize, message }: AdminNotificationRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "GrowPoint Lead Alerts <Growpointsales@gmail.com>",
      to: ["Growpointsales@gmail.com"],
      subject: "🚨 New Lead Submitted – GrowPoint",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #B5828C; font-size: 32px; margin: 0;">🚨 New Lead Alert</h1>
            <p style="color: #B5828C; font-size: 16px; margin: 5px 0;">GrowPoint Sales Team</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 30px; border-radius: 10px; border-left: 4px solid #B5828C;">
            <h2 style="color: #B5828C; margin-top: 0;">New Demo Request Submitted</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #B5828C; width: 140px;">Full Name:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #B5828C;">Company:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${company}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #B5828C;">Work Email:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">
                    <a href="mailto:${email}" style="color: #B5828C; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #B5828C;">Team Size:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${teamSize || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; color: #B5828C; vertical-align: top;">Team Challenges:</td>
                  <td style="padding: 10px; color: #333;">${message || 'Not provided'}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #FFB4A2; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p style="color: #333; font-weight: bold; margin: 0;">🎯 Next Steps:</p>
              <ul style="color: #333; margin: 10px 0 0 0; padding-left: 20px;">
                <li>Contact the lead within 24 hours</li>
                <li>Schedule a personalized demo</li>
                <li>Prepare team-specific use cases</li>
                <li>Follow up with pricing proposal</li>
              </ul>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
            <p>This alert was generated automatically from the GrowPoint contact form.</p>
            <p>Submitted at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });

    console.log("Admin notification sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-admin-notification function:", error);
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
