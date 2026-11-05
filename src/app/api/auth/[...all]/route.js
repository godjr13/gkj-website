import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

export const GET = handler.GET;

export async function POST(request) {
  const pathname = new URL(request.url).pathname;

  if (pathname.endsWith("/sign-up/email")) {
    return Response.json(
      { error: "Public account creation is disabled." },
      { status: 403 },
    );
  }

  return handler.POST(request);
}
