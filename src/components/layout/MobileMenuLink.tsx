import Link from "next/link";

type Props = {
  href: string;
  title: string;
  // the page that is open: gold
  isActive: boolean;
  onClick: () => void;
};

// a page in the burger menu: a big row with an arrow, the open page is gold
const MobileMenuLink = ({ href, title, isActive, onClick }: Props) => (
  <li>
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`flex items-center justify-between border-b border-white/10 py-3.5 text-xl font-semibold transition hover:text-brand ${
        isActive ? "text-brand" : "text-white"
      }`}
    >
      {title}
      <span aria-hidden="true" className="text-2xl text-stone-500">
        ›
      </span>
    </Link>
  </li>
);

export default MobileMenuLink;
