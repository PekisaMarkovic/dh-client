import type { Metadata } from "next";
import { Archivo_Black, Geist, Geist_Mono } from "next/font/google";
import SiteShell from "@/components/layout/SiteShell";
import { isMaintenance } from "@/lib/site";
import { homeSeo, pageMetadata, siteIcons, siteUrl } from "@/lib/seo";
import { connection } from "next/server";
import { Suspense } from "react";
import { APP_ROOT_ID } from "@/components/core/modal/Modal";
import { getSiteOrFallback } from "@/services/site-service";
import Providers from "@/providers/Providers";
import { DEFAULT_LANGUAGE, HTML_LANG } from "@/translations/config";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

// heavy display font for the headings (latin-ext has the Serbian letters č ć š ž đ)
const display = Archivo_Black({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Everything Google and the social networks read comes from the database (the dashboard, tab SEO), the translations are only the fallback.
// A draft site is hidden from Google until it is published.
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteOrFallback();
  const { title, description } = homeSeo(site);

  return {
    metadataBase: new URL(siteUrl),
    applicationName: site.name,
    ...pageMetadata(site, { title, description, path: "/" }),
    icons: siteIcons(site),
    robots: isMaintenance(site) ? { index: false, follow: false } : { index: true, follow: true },
  };
}

// A marker for Next: the title and the canonical address of the pages of the drinks menu depend on ?page= (runtime data),
// so they stream in after the page on purpose. The page itself is still prerendered. Without it the build fails.
async function Connection() {
  await connection();

  return null;
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={HTML_LANG[DEFAULT_LANGUAGE]} className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full">
        <Providers>
          <div id={APP_ROOT_ID} className="flex min-h-screen flex-col">
            <Suspense fallback={null}>
              <SiteShell>{children}</SiteShell>
            </Suspense>
            <Suspense>
              <Connection />
            </Suspense>
          </div>
        </Providers>
      </body>
    </html>
  );
}
