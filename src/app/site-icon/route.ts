import sharp from "sharp";
import { getSiteOrFallback } from "@/services/site-service";

// Google shows only a square icon (a multiple of 48 px) from the site's own address, the logo is neither
const SIZE = 192;

/** The logo of the site as a square PNG on a transparent background: the icon of the tab and of Google results */
export async function GET(request: Request) {
  const site = await getSiteOrFallback();
  const logo = site.logo ? await fetch(site.logo.url) : null;

  if (!logo?.ok) return Response.redirect(new URL("/favicon.ico", request.url));

  const png = await sharp(Buffer.from(await logo.arrayBuffer()))
    .resize(SIZE, SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400" },
  });
}
