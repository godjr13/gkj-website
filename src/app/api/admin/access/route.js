import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { getAdminContext, recordAdminAction } from "@/lib/admin";

export async function GET() {
  try {
    if (!await getAdminContext()) throw new Error("Unauthorized");
    const result = await db.execute(sql`SELECT a."userId", a."role", a."status", a."createdAt", u."name", u."email" FROM "admin_access" a JOIN "user" u ON u."id" = a."userId" ORDER BY a."createdAt" DESC`);
    return NextResponse.json(result.rows);
  } catch (error) { return NextResponse.json({ error: error.message === "Unauthorized" ? "Unauthorized" : "Could not load admin access." }, { status: error.message === "Unauthorized" ? 401 : 500 }); }
}

export async function PATCH(request) {
  try {
    const context = await getAdminContext();
    if (!context) throw new Error("Unauthorized");
    const body = await request.json();
    const userId = String(body.userId || "");
    const role = ["owner", "admin", "manager"].includes(body.role) ? body.role : "manager";
    const status = body.status === "revoked" ? "revoked" : "approved";
    if (!userId || (context.access.role !== "owner" && role === "owner")) return NextResponse.json({ error: "Only the owner can grant owner access." }, { status: 403 });
    if (userId === context.session.user.id && status === "revoked") return NextResponse.json({ error: "You cannot revoke your own access." }, { status: 400 });
    await db.execute(sql`UPDATE "admin_access" SET "role" = ${role}, "status" = ${status}, "updatedAt" = NOW() WHERE "userId" = ${userId}`);
    await recordAdminAction(context.session.user.id, status === "revoked" ? "revoked_admin" : "updated_admin_access", "admin_access", userId, { role, status });
    return NextResponse.json({ ok: true });
  } catch (error) { return NextResponse.json({ error: error.message === "Unauthorized" ? "Unauthorized" : "Could not update access." }, { status: error.message === "Unauthorized" ? 401 : 500 }); }
}
