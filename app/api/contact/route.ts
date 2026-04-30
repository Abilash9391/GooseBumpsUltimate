import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      toEmail,
    } = body;

    if (!firstName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Admin email
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: toEmail,
      replyTo: email,
      subject: subject,
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>📩 New Contact Message</h2>
          <p><b>Name:</b> ${firstName} ${lastName}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone || "N/A"}</p>
          <p><b>Subject:</b> ${subject}</p>
          <hr/>
          <p>${message}</p>
        </div>
      `,
    });

    // Auto reply
    await transporter.sendMail({
      to: email,
      subject: "We received your message",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Thanks ${firstName}! 🙌</h2>
          <p>We received your message and will get back to you soon.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Email failed to send" },
      { status: 500 }
    );
  }
}