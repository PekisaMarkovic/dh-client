"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import MainButton from "@/components/core/buttons/MainButton";
import MainLink from "@/components/core/buttons/MainLink";
import SiteImage from "@/components/core/SiteImage";
import Paragraph from "@/components/core/typography/Paragraph";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { IImage } from "@/interfaces";

type Props = {
  // the address the map shows
  address: string;
  // the address in Google Maps, for the link
  mapsHref: string;
  // the picture of the map uploaded in the dashboard; without it a drawn map is shown
  image: IImage | null;
};

/**
 * The Google map of the shop. Google sets its cookies as soon as the map loads, so it loads only after the visitor
 * accepted the cookies or clicked "Prikaži mapu"; until then the picture of the map from the dashboard (or a drawn one) with the button is shown.
 */
const MapEmbed = ({ address, mapsHref, image }: Props) => {
  const { t } = useTranslation("g");
  const { consent } = useCookieConsent();
  const [isShown, setIsShown] = useState(false);

  if (consent === "accepted" || isShown) {
    return (
      <iframe
        title={address}
        src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-72 w-full rounded-md border-0 bg-stone-800"
      />
    );
  }

  // an uploaded picture is a screenshot of the Google map: it stays clear, looks like the real map and the whole picture opens Google Maps
  if (image) {
    return (
      <a
        href={mapsHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("cookies.openMaps")}
        className="relative block h-72 w-full overflow-hidden rounded-md bg-stone-200"
      >
        <SiteImage image={image} fallbackAlt={address} sizes="(min-width: 768px) 560px, 100vw" />
        {/* the card in the corner, like on the Google map */}
        <div className="absolute left-2 top-2 max-w-[260px] rounded-sm bg-white p-3 shadow-md">
          <Paragraph text={address} size="sm" color="dark" weight="medium" />
        </div>
      </a>
    );
  }

  return (
    <div className="relative h-72 w-full overflow-hidden rounded-md bg-stone-800">
      {/* a drawn map (not of a real place) when no picture was uploaded: nothing of Google loads */}
      <Image src="/images/map-placeholder.svg" alt="" fill className="object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-brand-dark/40 p-4 text-center">
        <MainButton text={t("cookies.showMap")} variant="contained" size="medium" onClick={() => setIsShown(true)} />
        <Paragraph text={t("cookies.mapNote")} size="xs" color="white" align="center" className="max-w-xs" />
        <MainLink href={mapsHref} isExternal text={t("cookies.openMaps")} variant="text" size="small" />
      </div>
    </div>
  );
};

export default MapEmbed;
