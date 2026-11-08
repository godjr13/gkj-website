import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const maxBytes = 5 * 1024 * 1024;

export async function POST(request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Choose an image first." }, { status: 400 });
    if (!allowedTypes.has(file.type)) return NextResponse.json({ error: "Use a JPG, PNG, WEBP, or GIF image." }, { status: 400 });
    if (file.size > maxBytes) return NextResponse.json({ error: "Images must be 5MB or smaller." }, { status: 400 });

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const blob = await put(`products/${Date.now()}-${safeName}`, file, { access: "public", addRandomSuffix: true });
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("[v0] Product image upload failed:", error);
    return NextResponse.json({ error: "Image upload failed." }, { status: 500 });
  }
}
