import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();
    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const cleanMessage = typeof message === "string" ? message.trim() : "";
    if (!cleanName || !cleanMessage || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json({ success: false, error: "Please complete every field with a valid email." }, { status: 400 });
    }
    await db.execute(sql`INSERT INTO contact_messages (name, email, message) VALUES (${cleanName}, ${cleanEmail}, ${cleanMessage})`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[v0] Contact database error:", error);
    return NextResponse.json({ success: false, error: "Unable to save your message right now." }, { status: 500 });
  }
}
