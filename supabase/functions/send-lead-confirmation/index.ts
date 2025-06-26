
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LeadConfirmationRequest {
  name: string;
  email: string;
  company: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company }: LeadConfirmationRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "GrowPoint <Growpointsales@gmail.com>",
      to: [email],
      subject: "Thank you for contacting GrowPoint!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #B5828C; font-size: 32px; margin: 0;">GrowPoint</h1>
            <p style="color: #B5828C; font-size: 16px; margin: 5px 0;">Transform Your Team Dynamics</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 30px; border-radius: 10px; border-left: 4px solid #B5828C;">
            <h2 style="color: #B5828C; margin-top: 0;">Thank you for reaching out, ${name}!</h2>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              We've received your inquiry about GrowPoint and how we can help transform your team dynamics at <strong>${company}</strong>.
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              <strong>What happens next:</strong>
            </p>
            <ul style="color: #333; font-size: 16px; line-height: 1.6;">
              <li>A GrowPoint representative will contact you within 24 hours</li>
              <li>We'll schedule a personalized demo tailored to your team's needs</li>
              <li>You'll see exactly how GrowPoint can boost your team's collaboration</li>
            </ul>
            
            <div style="margin: 30px 0; padding: 20px; background-color: white; border-radius: 8px;">
              <p style="color: #B5828C; font-weight: bold; margin: 0;">In the meantime, feel free to explore:</p>
              <p style="color: #333; margin: 10px 0 0 0;">
                📈 <a href="https://yoursite.lovable.app/pricing" style="color: #B5828C; text-decoration: none;">View our pricing plans</a><br>
                🎯 <a href="https://yoursite.lovable.app/demo" style="color: #B5828C; text-decoration: none;">Try our interactive demo</a>
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
            <p>Best regards,<br><strong>The GrowPoint Team</strong></p>
            <p>
              <a href="mailto:Growpointsales@gmail.com" style="color: #B5828C;">Growpointsales@gmail.com</a>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-lead-confirmation function:", error);
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
