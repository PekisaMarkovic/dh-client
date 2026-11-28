import Contact from "@/components/home/Contact";
import ContactForm from "@/components/home/ContactForm";
import { ISite } from "@/interfaces";

// "contact": the contact (with the map) on the left, the contact form on the right; also the end of the home page
const ContactSection = ({ site }: { site: ISite }) => (
  <section id="contact" className="bg-background">
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2">
      <Contact site={site} />
      <ContactForm />
    </div>
  </section>
);

export default ContactSection;
