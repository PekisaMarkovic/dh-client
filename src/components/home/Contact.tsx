import InstagramIcon from "@/icons/InstagramIcon";
import PhoneIcon from "@/icons/PhoneIcon";
import Paragraph from "@/components/core/typography/Paragraph";
import SectionTitle from "@/components/core/typography/SectionTitle";
import { ISite } from "@/interfaces";
import { fullAddress, phoneHref } from "@/lib/site";
import { t } from "@/translations/translate";

// the left column of the contact section: title, phone, social, map
const Contact = ({ site }: { site: ISite }) => {
  const address = fullAddress(site);

  return (
    <div className="flex flex-col gap-6">
      <SectionTitle text={t("home:contact.title")} line="below" />
      {site.phone && (
        <a href={phoneHref(site.phone)} className="flex items-center gap-2 font-display text-xl text-brand hover:text-amber-300">
          <PhoneIcon />
          {t("g:button.callUs", { phone: site.phone })}
        </a>
      )}
      <Paragraph text={t("home:contact.text")} />
      {site.instagram && (
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-2 font-display text-xl text-brand hover:text-amber-300"
        >
          <InstagramIcon className="h-6 w-6" />
          {t("g:button.instagram")}
        </a>
      )}
      {address && (
        <iframe
          title={address}
          src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-72 w-full rounded-md border-0 bg-stone-800"
        />
      )}
    </div>
  );
};

export default Contact;
