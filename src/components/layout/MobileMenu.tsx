"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SidePanel from "@/components/core/SidePanel";
import Overline from "@/components/core/typography/Overline";
import Paragraph from "@/components/core/typography/Paragraph";
import MobileMenuContact from "@/components/layout/MobileMenuContact";
import MobileMenuLink from "@/components/layout/MobileMenuLink";
import SiteLogo from "@/components/layout/SiteLogo";
import InstagramIcon from "@/icons/InstagramIcon";
import MenuIcon from "@/icons/MenuIcon";
import PhoneIcon from "@/icons/PhoneIcon";
import PinIcon from "@/icons/PinIcon";
import { ISite } from "@/interfaces";
import { fullAddress, mapsUrl, navPages, pageHref, phoneHref, text } from "@/lib/site";

/**
 * The burger in the header on a phone: a panel from the left (the cart comes from the right)
 * with the logo, the menu of the site, the ways to reach the shop and the working hours, each group under its own label.
 */
const MobileMenu = ({ site }: { site: ISite }) => {
  const { t } = useTranslation("g");
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
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
        <div className="flex flex-col gap-8">
          <nav aria-label={t("nav.main")}>
            <Overline text={t("nav.menuTitle")} />
            <ul className="mt-2">
              <MobileMenuLink href="/" title={t("nav.home")} isActive={pathname === "/"} onClick={close} />
              {navPages(site).map((page) => (
                <MobileMenuLink key={page.slug} href={pageHref(page)} title={page.title} isActive={pathname.startsWith(pageHref(page))} onClick={close} />
              ))}
            </ul>
          </nav>

          <div>
            <Overline text={t("footer.contact")} />
            <ul className="mt-2 flex flex-col gap-1">
              {address && (
                <MobileMenuContact href={mapsUrl(site)} isExternal icon={<PinIcon className="h-5 w-5" />} title={site.address || address} subtitle={site.address ? site.city : null} />
              )}
              {site.phone && <MobileMenuContact href={phoneHref(site.phone)} icon={<PhoneIcon className="h-5 w-5" />} title={site.phone} />}
              {site.instagram && (
                <MobileMenuContact href={site.instagram} isExternal icon={<InstagramIcon className="h-5 w-5" />} title={t("button.instagram")} />
              )}
            </ul>
          </div>

          {text(site.workingHours) && (
            <div>
              <Overline text={t("footer.hours")} />
              <Paragraph text={text(site.workingHours)} size="sm" className="mt-2 whitespace-pre-line" />
            </div>
          )}
        </div>
      </SidePanel>
    </>
  );
};

export default MobileMenu;
