// lib/useSend.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_APIKEY!);

export async function useSend({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
    console.log("Sending OTP to:", to);
  return await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    html,
  });
}