import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const safeEqual = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

/**
 * The api calls this after the admin changes the site in the dashboard, so the change is visible right away
 * (without it the site shows the change after a minute, when its cache runs out).
 * It needs the shared secret (REVALIDATE_SECRET) in the `x-revalidate-secret` header.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET?.trim();
  const sent = request.headers.get("x-revalidate-secret") ?? "";

  if (!secret || !safeEqual(sent, secret)) {
    return NextResponse.json({ statusCode: 401, message: "Unauthorized" }, { status: 401 });
  }

  // expire: 0 = the next visit loads the new content (no stale content is shown)
  revalidateTag("site", { expire: 0 });
  revalidateTag("drinks", { expire: 0 });

  return NextResponse.json({ revalidated: true });
}
