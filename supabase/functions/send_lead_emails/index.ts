import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  if (req.method !== "POST") return new Response(null, { status: 405 });
  const { record: newLead } = await req.json();
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) throw new Error("Missing RESEND_API_KEY");

  async function sendEmail(to:string, subject:string, html:string) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ from:"no-reply@growpoint.com", to, subject, html }),
    });
    if (!res.ok) throw new Error(`Resend error: ${await res.text()}`);
  }

  await sendEmail(
    newLead.work_email,
    "Your GrowPoint Demo Request!",
    `<p>Hi ${newLead.full_name}, thanks for requesting a demo. We’ll contact you shortly!</p>`
  );
  await sendEmail(
    "growpointsales@gmail.com",
    `New Demo Request: ${newLead.full_name}`,
    `<p>${newLead.full_name} from ${newLead.company_name} requested a demo.<br/>
     Email: ${newLead.work_email}<br/>
     Team Size: ${newLead.team_size}<br/>
     Challenges: ${newLead.team_challenges || "None"}</p>`
  );

  return new Response("Emails sent", { status:200 });
});
