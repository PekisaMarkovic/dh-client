import Contact from "@/components/home/Contact";
import ContactForm from "@/components/home/ContactForm";
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
      {/* the contact (with the map) on the left, the contact form on the right */}
      <section id="contact" className="bg-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2">
          <Contact site={site} />
          <ContactForm />
        </div>
      </section>
    </>
  );
};

export default Home;
