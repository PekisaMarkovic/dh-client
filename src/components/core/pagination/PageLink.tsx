import Link from "next/link";
import { t } from "@/translations/translate";

type Props = {
  page: number;
  href: string;
  isCurrent: boolean;
  // pages are left out before this one: dots in front of it
  hasGap: boolean;
  className: string;
};

// one numbered page of the Pagination
const PageLink = ({ page, href, isCurrent, hasGap, className }: Props) => (
  <li className="flex items-center gap-2">
    {hasGap && (
      <span aria-hidden="true" className="px-1 text-stone-500">
        …
      </span>
    )}
    <Link href={href} aria-label={t("g:pagination.page", { page })} aria-current={isCurrent ? "page" : undefined} className={className}>
      {page}
    </Link>
  </li>
);

export default PageLink;
