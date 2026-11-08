import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const imageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const pdfType = "application/pdf";
const imageMaxBytes = 5 * 1024 * 1024;
const pdfMaxBytes = 10 * 1024 * 1024;

export async function POST(request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const kind = formData.get("kind") === "datasheet" ? "datasheets" : "products";
    if (!(file instanceof File)) return NextResponse.json({ error: kind === "datasheets" ? "Choose a PDF first." : "Choose an image first." }, { status: 400 });
    if (kind === "datasheets" && file.type !== pdfType) return NextResponse.json({ error: "Datasheets must be PDF files." }, { status: 400 });
    if (kind === "products" && !imageTypes.has(file.type)) return NextResponse.json({ error: "Use a JPG, PNG, WEBP, or GIF image." }, { status: 400 });
    if (file.size > (kind === "datasheets" ? pdfMaxBytes : imageMaxBytes)) return NextResponse.json({ error: kind === "datasheets" ? "PDFs must be 10MB or smaller." : "Images must be 5MB or smaller." }, { status: 400 });

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const blob = await put(`${kind}/${Date.now()}-${safeName}`, file, { access: "public", addRandomSuffix: true });
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("[v0] Product image upload failed:", error);
    return NextResponse.json({ error: "Image upload failed." }, { status: 500 });
  }
}
