import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { recordAdminAction } from "@/lib/admin";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) throw new Error("Unauthorized");
    const { token } = await request.json();
    const result = await db.execute(sql`SELECT "id", "email", "role", "status" FROM "admin_invitation" WHERE "token" = ${String(token || "")} AND "expiresAt" > NOW() LIMIT 1`);
    const invite = result.rows[0];
    if (!invite || invite.status !== "pending" || invite.email.toLowerCase() !== context.session.user.email.toLowerCase()) return NextResponse.json({ error: "This invitation is invalid, expired, or belongs to another email." }, { status: 400 });
    await db.execute(sql`INSERT INTO "admin_access" ("userId", "role", "status") VALUES (${session.user.id}, ${invite.role}, 'pending') ON CONFLICT ("userId") DO UPDATE SET "role" = EXCLUDED."role", "status" = 'pending', "updatedAt" = NOW()`);
    await db.execute(sql`UPDATE "admin_invitation" SET "status" = 'pending_approval' WHERE "id" = ${invite.id}`);
    await recordAdminAction(session.user.id, "submitted_invitation", "invitation", invite.id, { role: invite.role });
    return NextResponse.json({ ok: true });
  } catch (error) { return NextResponse.json({ error: error.message === "Unauthorized" ? "Unauthorized" : "Could not accept invitation." }, { status: error.message === "Unauthorized" ? 401 : 500 }); }
}
