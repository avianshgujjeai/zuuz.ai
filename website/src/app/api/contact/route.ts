import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY || "");
  try {
    const { name, email, company, role, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    await resend.emails.send({
      from: "ZUUZ Website <noreply@zuuz.ai>",
      to: ["info@zuuz.ai"],
      replyTo: email,
      subject: `New demo request from ${name} — ${company || "Unknown Company"}`,
      html: `
        <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0018FF; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Demo Request</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 14px;">From zuuz.ai website contact form</p>
          </div>
          <div style="background: white; padding: 32px; border: 1px solid #E8E8EE; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F5; width: 120px;">
                  <strong style="color: #0018FF; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Name</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F5; color: #111; font-size: 15px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F5;">
                  <strong style="color: #0018FF; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Email</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F5; color: #111; font-size: 15px;">
                  <a href="mailto:${email}" style="color: #0018FF;">${email}</a>
                </td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F5;">
                  <strong style="color: #0018FF; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Company</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F5; color: #111; font-size: 15px;">${company}</td>
              </tr>` : ""}
              ${role ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F5;">
                  <strong style="color: #0018FF; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Role</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F5; color: #111; font-size: 15px;">${role}</td>
              </tr>` : ""}
              ${phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F5;">
                  <strong style="color: #0018FF; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Phone</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #F0F0F5; color: #111; font-size: 15px;">${phone}</td>
              </tr>` : ""}
            </table>
            <div style="margin-top: 20px;">
              <p style="color: #0018FF; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Message</p>
              <p style="color: #333; font-size: 15px; line-height: 1.7; background: #F5F6FF; padding: 16px; border-radius: 8px; margin: 0;">
                ${message.replace(/\n/g, "<br/>")}
              </p>
            </div>
            <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #E8E8EE; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; padding: 12px 28px; background: #0018FF; color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                Reply to ${name} →
              </a>
            </div>
          </div>
        </div>
      `,
    });

    await resend.emails.send({
      from: "ZUUZ Team <info@zuuz.ai>",
      to: [email],
      subject: "We received your request — ZUUZ",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0018FF; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Thank you, ${name}.</h1>
          </div>
          <div style="background: white; padding: 32px; border: 1px solid #E8E8EE; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="color: #333; font-size: 15px; line-height: 1.7;">We've received your message and will be in touch within 24 hours.</p>
            <p style="color: #333; font-size: 15px; line-height: 1.7;">In the meantime, explore how ZUUZ works:</p>
            <a href="https://zuuz.ai/solutions" style="display: inline-block; margin-top: 8px; padding: 12px 24px; background: #0018FF; color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
              See Solutions →
            </a>
            <p style="margin-top: 32px; color: #888; font-size: 13px;">ZUUZ · 440 N Wolfe Rd, Sunnyvale, CA 94085 · info@zuuz.ai</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}
