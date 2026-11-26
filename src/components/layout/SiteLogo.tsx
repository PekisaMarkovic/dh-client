import Image from "next/image";
import { ISite } from "@/interfaces";

type Props = {
  site: ISite;
  // large: the header on a wide screen; small: the bar and the menu on a phone
  size: "large" | "small";
};

/** The logo of the site, or its name (and city) while it has no logo */
const SiteLogo = ({ site, size }: Props) => {
  const isLarge = size === "large";

  if (site.logo) {
    return (
      <Image
        src={site.logo.url}
        alt={site.logo.altText || site.name}
        width={site.logo.width}
        height={site.logo.height}
        priority
        className={isLarge ? "h-32 w-auto" : "h-11 w-auto"}
      />
    );
  }

  return (
    <span className="flex flex-col items-center leading-none">
      <span className={`font-display uppercase tracking-wide text-brand ${isLarge ? "text-4xl" : "text-xl"}`}>{site.name}</span>
      {isLarge && site.city && <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/70">{site.city}</span>}
    </span>
  );
};

export default SiteLogo;
