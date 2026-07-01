import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "All fields are required." }, { status: 400 });
    }

    await resend.emails.send({
      from: "Contact Form <gkjproductions@gmail.com>", 
      to: process.env.CONTACT_EMAIL,
      subject: `New message from ${name}`,
      reply_to: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to send." }, { status: 500 });
  }
}