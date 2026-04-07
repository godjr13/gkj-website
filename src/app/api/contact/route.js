import nodemailer from "nodemailer";

export async function POST(req) {
    const body = await req.json();
    const { name, email, message } = body;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: `"Website Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Message`,
            text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
        });

        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ success: false, error: error.message });
    }
}