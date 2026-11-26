import Link from "next/link";
import DeliveryButton from "@/components/cart/DeliveryButton";
import MobileMenu from "@/components/layout/MobileMenu";
import SiteLogo from "@/components/layout/SiteLogo";
import StickyHeader from "@/components/layout/StickyHeader";
import PhoneIcon from "@/icons/PhoneIcon";
import PinIcon from "@/icons/PinIcon";
import { ISite } from "@/interfaces";
import { fullAddress, mapsUrl, phoneHref } from "@/lib/site";
import { t } from "@/translations/translate";

/**
 * The header stays at the top.
 * A phone: one low bar, the menu (burger) on the left, a small logo in the middle, the cart (the van) on the right.
 * A wide screen: the address on the left, the logo in the middle, the phone and the cart on the right.
 */
const Header = ({ site }: { site: ISite }) => (
  <StickyHeader>
    {/* the sides take the same width, so the logo is in the middle also without the cart */}
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-3 py-2 md:hidden">
      <div className="justify-self-start">
        <MobileMenu site={site} />
      </div>
      <Link href="/" aria-label={t("g:nav.home")}>
        <SiteLogo site={site} size="small" />
      </Link>
      <div className="justify-self-end">
        <DeliveryButton />
      </div>
    </div>

    <div className="mx-auto hidden max-w-6xl grid-cols-3 items-center gap-6 px-4 py-4 md:grid">
      <div className="flex justify-start">
        {fullAddress(site) && (
          <a
            href={mapsUrl(site)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 font-semibold text-brand hover:text-amber-300"
          >
            <PinIcon className="h-8 w-8 shrink-0" />
            {/* the street on the first line, the city under it */}
            <span className="flex flex-col text-left leading-tight">
              {site.address && <span className="text-xl">{site.address}</span>}
              {site.city && <span className="text-lg">{site.city}</span>}
            </span>
          </a>
        )}
      </div>

      <Link href="/" aria-label={t("g:nav.home")} className="flex justify-center">
        <SiteLogo site={site} size="large" />
      </Link>

      {/* the phone and, when the site lets the visitors order, the cart (the van) */}
      <div className="flex flex-wrap items-center justify-end gap-4">
        {site.phone && (
          <a href={phoneHref(site.phone)} className="flex items-center gap-3 text-2xl font-bold text-brand hover:text-amber-300">
            <PhoneIcon className="h-8 w-8 shrink-0" />
            <span>{site.phone}</span>
          </a>
        )}
        <DeliveryButton />
      </div>
    </div>
  </StickyHeader>
);

export default Header;
