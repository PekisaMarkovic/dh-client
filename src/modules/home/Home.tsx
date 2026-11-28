import ContactSection from "@/components/sections/ContactSection";
import PageSections from "@/components/sections/PageSections";
import { findPage, HOME_SLUG } from "@/lib/site";
import { jsonLdString, localBusinessJsonLd } from "@/lib/seo";
import { getSiteOrFallback } from "@/services/site-service";

/** The landing page: its sections in the order set in the dashboard, then the contact */
const Home = async () => {
  const site = await getSiteOrFallback();
  const home = findPage(site, HOME_SLUG);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(localBusinessJsonLd(site)) }} />
      {home && <PageSections page={home} site={site} />}
      {/* the home page always ends with the contact, unless the admin already put it in its sections */}
      {!home?.sections.some((section) => section.type === "contact") && <ContactSection site={site} />}
    </>
  );
};

export default Home;
