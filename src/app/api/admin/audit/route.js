import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { getAdminContext } from "@/lib/admin";

export async function GET() {
  try {
    if (!await getAdminContext()) throw new Error("Unauthorized");
    const result = await db.execute(sql`SELECT l."id", l."action", l."targetId", l."details", l."createdAt", u."name" AS "actorName", u."email" AS "actorEmail" FROM "admin_audit_log" l LEFT JOIN "user" u ON u."id" = l."actorId" ORDER BY l."createdAt" DESC LIMIT 100`);
    return NextResponse.json(result.rows);
  } catch (error) { return NextResponse.json({ error: error.message === "Unauthorized" ? "Unauthorized" : "Could not load audit history." }, { status: error.message === "Unauthorized" ? 401 : 500 }); }
}
