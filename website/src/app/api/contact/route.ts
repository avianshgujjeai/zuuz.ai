import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, role, phone, message } = body;

    if (!name || !email || !company || !message) {
      return NextResponse.json(
        { error: "Name, email, company, and message are required." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || "ZUUZ <no-reply@zuuz.ai>";

    if (smtpHost && smtpUser && smtpPass) {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort) || 587,
        secure: Number(smtpPort) === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: smtpFrom,
        to: "info@zuuz.ai",
        subject: `New demo request — ${company} — ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company}`,
          `Role: ${role || "Not provided"}`,
          `Phone: ${phone || "Not provided"}`,
          `Message:\n${message}`,
        ].join("\n"),
        html: `
          <h2>New Demo Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Role:</strong> ${role || "Not provided"}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });

      return NextResponse.json({ success: true, message: "Demo request sent successfully." });
    }

    console.log("[Contact Form] Submission received (SMTP not configured):", {
      name,
      email,
      company,
      role,
      phone,
      message: message.substring(0, 100),
    });

    return NextResponse.json({
      success: true,
      message: "Received. Email delivery pending SMTP configuration.",
    });
  } catch (error) {
    console.error("[Contact Form] Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    );
  }
}
