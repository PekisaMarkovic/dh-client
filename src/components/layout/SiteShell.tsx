import { PropsWithChildren } from "react";
import CartDrawer from "@/components/cart/CartDrawer";
import CookieBanner from "@/components/cookies/CookieBanner";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Maintenance from "@/components/layout/Maintenance";
import { PRIVACY_SLUG, findPage, isMaintenance, pageHref } from "@/lib/site";
import CartProvider from "@/providers/CartProvider";
import { getSiteOrFallback } from "@/services/site-service";

/**
 * The frame of every page: the header, the footer and the content of the site from the database (cached).
 * While the site is a draft the "coming soon" page is shown instead of everything.
 * The cart (its side panel, opened by the van in the header) is on every page when the site lets the visitors order.
 */
const SiteShell = async ({ children }: PropsWithChildren) => {
  const site = await getSiteOrFallback();

  if (isMaintenance(site)) return <Maintenance />;

  const privacyPage = findPage(site, PRIVACY_SLUG);

  return (
    // the cart is on every page, it shows only when the site lets the visitors order
    <CartProvider isEnabled={site.isOrderingAllowed}>
      <Header site={site} />
      <main className="flex-1">{children}</main>
      <Footer site={site} />
      <CartDrawer />
      <CookieBanner privacyHref={privacyPage && pageHref(privacyPage)} />
    </CartProvider>
  );
};

export default SiteShell;
