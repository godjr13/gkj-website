import { NextResponse } from "next/server";
import { randomBytes, randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { getAdminContext, recordAdminAction } from "@/lib/admin";

export async function GET() {
  try {
    await getAdminContext().then((context) => { if (!context) throw new Error("Unauthorized"); });
    const result = await db.execute(sql`SELECT i."id", i."email", i."role", i."status", i."expiresAt", i."createdAt", u."email" AS "inviterEmail" FROM "admin_invitation" i LEFT JOIN "user" u ON u."id" = i."invitedBy" ORDER BY i."createdAt" DESC`);
    return NextResponse.json(result.rows);
  } catch (error) { return NextResponse.json({ error: error.message === "Unauthorized" ? "Unauthorized" : "Could not load invitations." }, { status: error.message === "Unauthorized" ? 401 : 500 }); }
}

export async function POST(request) {
  try {
    const context = await getAdminContext();
    if (!context) throw new Error("Unauthorized");
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const role = body.role === "manager" ? "manager" : "admin";
    if (!email || !email.includes("@")) return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    const token = randomBytes(32).toString("hex");
    const id = randomUUID();
    await db.execute(sql`INSERT INTO "admin_invitation" ("id", "token", "email", "role", "invitedBy", "expiresAt") VALUES (${id}, ${token}, ${email}, ${role}, ${context.session.user.id}, NOW() + INTERVAL '7 days')`);
    await recordAdminAction(context.session.user.id, "invited_admin", "invitation", id, { email, role });
    return NextResponse.json({ id, inviteUrl: `/admin/sign-up?invite=${token}` }, { status: 201 });
  } catch (error) { return NextResponse.json({ error: error.message === "Unauthorized" ? "Unauthorized" : "Could not create invitation." }, { status: error.message === "Unauthorized" ? 401 : 500 }); }
}
