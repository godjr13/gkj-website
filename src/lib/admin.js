import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { sql } from "drizzle-orm";
import { randomUUID } from "node:crypto";

export async function getAdminContext() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return null;
  const result = await db.execute(sql`SELECT "userId", "role", "status" FROM "admin_access" WHERE "userId" = ${session.user.id} AND "status" = 'approved' LIMIT 1`);
  const access = result.rows[0];
  return access ? { session, access } : null;
}

export async function requireAdmin() {
  const context = await getAdminContext();
  if (!context) throw new Error("Unauthorized");
  return context;
}

export async function recordAdminAction(actorId, action, entityType, entityId = null, details = null) {
  await db.execute(sql`INSERT INTO "admin_audit_log" ("id", "actorId", "action", "entityType", "entityId", "details") VALUES (${randomUUID()}, ${actorId}, ${action}, ${entityType}, ${entityId}, ${details ? JSON.stringify(details) : null})`);
}
