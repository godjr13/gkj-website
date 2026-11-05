import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const result = await db.execute(sql`SELECT id, name, email, message, created_at, read_at FROM contact_messages ORDER BY created_at DESC`);
  return NextResponse.json(result.rows);
}
