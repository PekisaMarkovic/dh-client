import { ReactNode } from "react";

type Props = {
  href: string;
  // the icon in a gold circle
  icon: ReactNode;
  // the first line, the second one is smaller (e.g. the city)
  title: string;
  subtitle?: string | null;
  // opens in a new tab (maps, Instagram)
  isExternal?: boolean;
};

// a way to reach the shop in the burger menu: the address, the phone, Instagram
const MobileMenuContact = ({ href, icon, title, subtitle, isExternal }: Props) => (
  <li>
    <a
      href={href}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-white/5"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">{icon}</span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="font-semibold text-white">{title}</span>
        {subtitle && <span className="text-sm text-stone-400">{subtitle}</span>}
      </span>
    </a>
  </li>
);

export default MobileMenuContact;
