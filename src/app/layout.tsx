import type { Metadata, Viewport } from "next";
import { Archivo_Black, Geist, Geist_Mono } from "next/font/google";
import RuntimeMarker from "@/components/layout/RuntimeMarker";
import SiteShell from "@/components/layout/SiteShell";
import { isMaintenance } from "@/lib/site";
import { homeSeo, pageMetadata, siteIcons, siteUrl } from "@/lib/seo";
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

// maximumScale stops iOS auto-zoom on input focus; iOS still allows pinch-zoom.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

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
              <RuntimeMarker />
            </Suspense>
          </div>
        </Providers>
      </body>
    </html>
  );
}
