import Link from "next/link";
import PageLink from "@/components/core/pagination/PageLink";
import { t } from "@/translations/translate";

type Props = {
  page: number;
  totalPages: number;
  // the address of a page, e.g. (p) => `/karta-pica?page=${p}`. Real links, so Google follows them
  buildHref: (page: number) => string;
};

const ITEM = "flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-medium transition";
const IDLE = "border-stone-700 bg-surface text-foreground hover:border-brand hover:text-brand";
const ACTIVE = "border-brand bg-brand text-brand-dark";
const OFF = "pointer-events-none border-stone-800 text-stone-600";

// the first, the current (with its neighbours) and the last page, dots where pages are left out
const visiblePages = (page: number, totalPages: number) => {
  const pages = new Set([1, page - 1, page, page + 1, totalPages]);

  return [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
};

/** Page links under a list, nothing is shown when everything fits on one page. Works in server components. */
const Pagination = ({ page, totalPages, buildHref }: Props) => {
  if (totalPages <= 1) return null;

  const pages = visiblePages(page, totalPages);

  return (
    <nav aria-label={t("g:pagination.label")} className="flex justify-center pt-8">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          {page > 1 ? (
            <Link href={buildHref(page - 1)} rel="prev" aria-label={t("g:pagination.previous")} className={`${ITEM} ${IDLE}`}>
              ‹
            </Link>
          ) : (
            <span aria-hidden="true" className={`${ITEM} ${OFF}`}>
              ‹
            </span>
          )}
        </li>

        {pages.map((p, index) => (
          <PageLink
            key={p}
            page={p}
            href={buildHref(p)}
            isCurrent={p === page}
            hasGap={index > 0 && p - pages[index - 1] > 1}
            className={`${ITEM} ${p === page ? ACTIVE : IDLE}`}
          />
        ))}

        <li>
          {page < totalPages ? (
            <Link href={buildHref(page + 1)} rel="next" aria-label={t("g:pagination.next")} className={`${ITEM} ${IDLE}`}>
              ›
            </Link>
          ) : (
            <span aria-hidden="true" className={`${ITEM} ${OFF}`}>
              ›
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
