import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { getAdminContext, recordAdminAction } from "@/lib/admin";

async function requireAdmin() { return getAdminContext(); }

export async function PATCH(request, { params }) {
  try {
    const context = await requireAdmin();
    const id = Number((await params).id);
    const p = await request.json();
    const result = await db.execute(sql`UPDATE products SET name=${String(p.name || "").trim()}, description=${String(p.description || "")}, price=${Math.max(0, Math.round(Number(p.price) || 0))}, image_url=${p.image_url || null}, datasheet_url=${p.datasheet_url || null}, category=${String(p.category || "General")}, inventory=${Math.max(0, Math.round(Number(p.inventory) || 0))}, featured=${Boolean(p.featured)}, updated_at=now() WHERE id=${id} RETURNING *`);
    if (result.rows[0]) await recordAdminAction(context.session.user.id, "updated_product", "product", String(id), { name: result.rows[0].name });
    return result.rows[0] ? NextResponse.json(result.rows[0]) : NextResponse.json({ error: "Product not found." }, { status: 404 });
  } catch (error) { return NextResponse.json({ error: error.message === "Unauthorized" ? "Unauthorized" : "Could not update product." }, { status: error.message === "Unauthorized" ? 401 : 500 }); }
}

export async function DELETE(request, { params }) {
  try { const context = await requireAdmin(); const id = Number((await params).id); await db.execute(sql`DELETE FROM products WHERE id=${id}`); await recordAdminAction(context.session.user.id, "deleted_product", "product", String(id)); return NextResponse.json({ success: true }); }
  catch (error) { return NextResponse.json({ error: error.message === "Unauthorized" ? "Unauthorized" : "Could not delete product." }, { status: error.message === "Unauthorized" ? 401 : 500 }); }
}
