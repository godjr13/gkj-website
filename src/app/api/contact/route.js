import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();
    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const cleanMessage = typeof message === "string" ? message.trim() : "";

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return NextResponse.json({ success: false, error: "All fields are required." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
      console.error("Contact email configuration is missing.");
      return NextResponse.json({ success: false, error: "Email service is not configured." }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "Contact Form <notifications@gkjproductions.com>",
      to: [process.env.CONTACT_EMAIL],
      subject: `New message from ${cleanName}`,
      replyTo: cleanEmail,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
    });

    if (error) {
      console.error("Resend contact form error:", error);
      return NextResponse.json({ success: false, error: "Email could not be sent. Please try again later." }, { status: 502 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to send." }, { status: 500 });
  }
}
