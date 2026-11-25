import { PropsWithChildren } from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Maintenance from "@/components/layout/Maintenance";
import { isMaintenance } from "@/lib/site";
import { getSiteOrFallback } from "@/services/site-service";

/**
 * The frame of every page: the header, the footer and the content of the site from the database (cached).
 * While the site is a draft the "coming soon" page is shown instead of everything.
 */
const SiteShell = async ({ children }: PropsWithChildren) => {
  const site = await getSiteOrFallback();

  if (isMaintenance(site)) return <Maintenance />;

  return (
    <>
      <Header site={site} />
      <main className="flex-1">{children}</main>
      <Footer site={site} />
    </>
  );
};

export default SiteShell;
