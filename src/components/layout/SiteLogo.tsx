import Image from "next/image";
import { ISite } from "@/interfaces";

type Props = {
  site: ISite;
  // large: the header on a wide screen; medium: the menu on a phone; small: the bar on a phone
  size: "large" | "medium" | "small";
};

/** The logo of the site, or its name (and city) while it has no logo */
const SiteLogo = ({ site, size }: Props) => {
  const isLarge = size === "large";
  const imageHeight = { large: "h-32", medium: "h-20", small: "h-11" }[size];
  const nameSize = { large: "text-4xl", medium: "text-3xl", small: "text-xl" }[size];

  if (site.logo) {
    return (
      <Image
        src={site.logo.url}
        alt={site.logo.altText || site.name}
        width={site.logo.width}
        height={site.logo.height}
        priority
        className={`${imageHeight} w-auto`}
      />
    );
  }

  return (
    <span className="flex flex-col items-center leading-none">
      <span className={`font-display uppercase tracking-wide text-brand ${nameSize}`}>{site.name}</span>
      {isLarge && site.city && <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/70">{site.city}</span>}
    </span>
  );
};

export default SiteLogo;
