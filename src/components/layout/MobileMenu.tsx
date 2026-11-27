"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SidePanel from "@/components/core/SidePanel";
import SiteLogo from "@/components/layout/SiteLogo";
import InstagramIcon from "@/icons/InstagramIcon";
import MenuIcon from "@/icons/MenuIcon";
import PhoneIcon from "@/icons/PhoneIcon";
import PinIcon from "@/icons/PinIcon";
import { ISite } from "@/interfaces";
import { fullAddress, mapsUrl, navPages, pageHref, phoneHref } from "@/lib/site";

const LINK = "flex items-center gap-3 rounded-lg p-3 text-lg font-semibold text-brand transition hover:bg-brand-dark hover:text-amber-300";

/**
 * The burger in the header on a phone: a panel from the left (the cart comes from the right)
 * with the logo, the pages of the site, the address, the phone and the Instagram of the shop.
 */
const MobileMenu = ({ site }: { site: ISite }) => {
  const { t } = useTranslation("g");
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const address = fullAddress(site);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={t("nav.openMenu")}
        aria-expanded={isOpen}
        className="flex h-11 w-11 items-center justify-center rounded-full text-brand transition hover:bg-white/5"
      >
        <MenuIcon className="h-7 w-7" />
      </button>

      <SidePanel
        isOpen={isOpen}
        onClose={close}
        side="left"
        label={site.name}
        closeLabel={t("nav.closeMenu")}
        title={
          <Link href="/" onClick={close} aria-label={t("nav.home")}>
            <SiteLogo site={site} size="medium" />
          </Link>
        }
      >
        <nav aria-label={t("nav.main")} className="flex flex-col gap-1">
          {navPages(site).map((page) => (
            <Link key={page.slug} href={pageHref(page)} onClick={close} className={LINK}>
              {page.title}
            </Link>
          ))}
          {address && (
            <a href={mapsUrl(site)} target="_blank" rel="noopener noreferrer" className={LINK}>
              <PinIcon className="h-7 w-7 shrink-0" />
              <span className="flex flex-col leading-tight">
                {site.address && <span>{site.address}</span>}
                {site.city && <span className="text-base font-normal text-stone-300">{site.city}</span>}
              </span>
            </a>
          )}
          {site.phone && (
            <a href={phoneHref(site.phone)} className={LINK}>
              <PhoneIcon className="h-7 w-7 shrink-0" />
              {site.phone}
            </a>
          )}
          {site.instagram && (
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className={LINK}>
              <InstagramIcon className="h-7 w-7 shrink-0" />
              {t("button.instagram")}
            </a>
          )}
        </nav>
      </SidePanel>
    </>
  );
};

export default MobileMenu;
