import PageSizeLink from "@/components/core/pagination/PageSizeLink";

type Props = {
  label: string;
  value: number;
  options: readonly number[];
  // the address of the first page with this many items per page
  buildHref: (size: number) => string;
};

const ITEM = "flex h-9 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-medium transition";
const IDLE = "border-stone-700 bg-surface text-foreground hover:border-brand hover:text-brand";
const ACTIVE = "border-brand bg-brand text-brand-dark";

/** How many items a page shows, as links (works without JavaScript, in server components) */
const PageSize = ({ label, value, options, buildHref }: Props) => (
  <nav aria-label={label} className="flex flex-wrap items-center justify-end gap-2">
    <span className="text-sm text-stone-400">{label}</span>
    <ul className="flex flex-wrap items-center gap-2">
      {options.map((size) => (
        <PageSizeLink key={size} size={size} href={buildHref(size)} isCurrent={size === value} className={`${ITEM} ${size === value ? ACTIVE : IDLE}`} />
      ))}
    </ul>
  </nav>
);

export default PageSize;
