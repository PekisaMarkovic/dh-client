import Image from "next/image";
import Link from "next/link";
import { PhoneIcon, PinIcon } from "@/components/core/icons";
import { ISite } from "@/interfaces";
import { fullAddress, mapsUrl, phoneHref } from "@/lib/site";
import { t } from "@/translations/translate";

// the address on the left, the logo (or the name) in the middle, the phone on the right
const Header = ({ site }: { site: ISite }) => (
  <header className="border-b border-white/10 bg-brand-dark">
    <div className="mx-auto grid max-w-6xl items-center gap-x-6 gap-y-3 px-4 py-4 md:grid-cols-3">
      <div className="order-2 flex justify-center md:order-none md:justify-start">
        {fullAddress(site) && (
          <a href={mapsUrl(site)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-brand hover:text-amber-300">
            <PinIcon />
            <span>{fullAddress(site)}</span>
          </a>
        )}
      </div>

      <div className="order-1 flex flex-col items-center md:order-none">
        <Link href="/" aria-label={t("g:nav.home")} className="flex flex-col items-center leading-none">
          {site.logo ? (
            <Image src={site.logo.url} alt={site.logo.altText || site.name} width={site.logo.width} height={site.logo.height} priority className="h-24 w-auto sm:h-32" />
          ) : (
            <>
              <span className="font-display text-3xl uppercase tracking-wide text-brand sm:text-4xl">{site.name}</span>
              {site.city && <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/70">{site.city}</span>}
            </>
          )}
        </Link>
      </div>

      <div className="order-3 flex justify-center md:order-none md:justify-end">
        {site.phone && (
          <a href={phoneHref(site.phone)} className="flex items-center gap-2 text-lg font-bold text-brand hover:text-amber-300">
            <PhoneIcon />
            <span>{site.phone}</span>
          </a>
        )}
      </div>
    </div>
  </header>
);

export default Header;
