import InstagramIcon from "@/icons/InstagramIcon";
import PhoneIcon from "@/icons/PhoneIcon";
import PinIcon from "@/icons/PinIcon";
import { ISite } from "@/interfaces";
import Link from "next/link";
import { footerPages, fullAddress, mapsUrl, pageHref, phoneHref, text } from "@/lib/site";
import { t } from "@/translations/translate";

const Footer = ({ site }: { site: ISite }) => (
  <footer className="border-t border-white/10 bg-brand-dark">
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 text-center md:grid-cols-3">
      <div className="flex flex-col items-center gap-3">
        <h2 className="font-display text-xl text-white">{t("g:footer.contact")}</h2>
        {fullAddress(site) && (
          <a href={mapsUrl(site)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-stone-300 hover:text-brand">
            <PinIcon className="h-4 w-4" />
            {fullAddress(site)}
          </a>
        )}
        {site.phone && (
          <a href={phoneHref(site.phone)} className="flex items-center gap-2 font-semibold text-white hover:text-brand">
            <PhoneIcon className="h-4 w-4" />
            {site.phone}
          </a>
        )}
      </div>
      <div className="flex flex-col items-center gap-3">
        <h2 className="font-display text-xl text-white">{t("g:button.instagram")}</h2>
        {site.instagram && (
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("g:button.instagram")}
            className="text-brand hover:text-amber-300"
          >
            <InstagramIcon className="h-10 w-10" />
          </a>
        )}
      </div>
      <div className="flex flex-col items-center gap-3">
        <h2 className="font-display text-xl text-white">{t("g:footer.hours")}</h2>
        <p className="whitespace-pre-line text-stone-300">{text(site.workingHours)}</p>
      </div>
    </div>
    {footerPages(site).length > 0 && (
      <nav aria-label={t("g:footer.pages")} className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/10 px-4 py-4">
        {footerPages(site).map((page) => (
          <Link key={page.slug} href={pageHref(page)} className="text-sm text-stone-300 hover:text-brand">
            {page.title}
          </Link>
        ))}
      </nav>
    )}
    <p className="border-t border-white/10 py-4 text-center text-xs text-stone-500">© 2026 {site.name}</p>
  </footer>
);

export default Footer;
