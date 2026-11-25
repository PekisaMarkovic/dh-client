import Contact from "@/components/home/Contact";
import ContactForm from "@/components/home/ContactForm";
import DrinksTeaser from "@/components/home/DrinksTeaser";
import Hero from "@/components/home/Hero";
import Promo from "@/components/home/Promo";
import Story from "@/components/home/Story";
import { jsonLdString, localBusinessJsonLd } from "@/lib/seo";
import { getSiteOrFallback } from "@/services/site-service";

export default async function Home() {
  const site = await getSiteOrFallback();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(localBusinessJsonLd(site)) }} />
      <Hero site={site} />
      <Story site={site} />
      <DrinksTeaser site={site} />
      <Promo site={site} />
      {/* the contact (with the map) on the left, the contact form on the right */}
      <section id="contact" className="bg-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2">
          <Contact site={site} />
          <ContactForm />
        </div>
      </section>
    </>
  );
}
