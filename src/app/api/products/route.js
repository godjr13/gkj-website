import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");
}

export async function GET() {
  const result = await db.execute(sql`SELECT id, name, slug, description, price, image_url, category, inventory, featured, created_at, updated_at FROM products ORDER BY created_at DESC`);
  return NextResponse.json(result.rows);
}

export async function POST(request) {
  try {
    await requireAdmin();
    const product = await request.json();
    const name = String(product.name || "").trim();
    if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
    const slug = String(product.slug || name).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const result = await db.execute(sql`INSERT INTO products (name, slug, description, price, image_url, category, inventory, featured) VALUES (${name}, ${slug}, ${String(product.description || "")}, ${Math.max(0, Math.round(Number(product.price) || 0))}, ${product.image_url || null}, ${String(product.category || "General")}, ${Math.max(0, Math.round(Number(product.inventory) || 0))}, ${Boolean(product.featured)}) RETURNING *`);
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message === "Unauthorized" ? "Unauthorized" : "Could not create product." }, { status: error.message === "Unauthorized" ? 401 : 500 });
  }
}
