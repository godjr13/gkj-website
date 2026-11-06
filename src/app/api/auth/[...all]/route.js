import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { toNextJsHandler } from "better-auth/next-js";
import { sql } from "drizzle-orm";

const handler = toNextJsHandler(auth);

export const GET = handler.GET;

export async function POST(request) {
  if (new URL(request.url).pathname.endsWith("/sign-up/email")) {
    const body = await request.clone().json().catch(() => ({}));
    const token = String(body.inviteToken || "");
    const email = String(body.email || "").trim().toLowerCase();
    const result = await db.execute(sql`SELECT "id" FROM "admin_invitation" WHERE "token" = ${token} AND LOWER("email") = ${email} AND "status" = 'pending' AND "expiresAt" > NOW() LIMIT 1`);
    if (!result.rows[0]) return Response.json({ error: { message: "A valid admin invitation is required." } }, { status: 403 });
  }
  return handler.POST(request);
}
