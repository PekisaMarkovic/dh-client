import Link from "next/link";

type Props = {
  size: number;
  href: string;
  isCurrent: boolean;
  className: string;
};

// one page size of PageSize
const PageSizeLink = ({ size, href, isCurrent, className }: Props) => (
  <li>
    {/* nofollow: the same drinks in another page size are not new pages for Google */}
    <Link href={href} rel="nofollow" aria-current={isCurrent ? "true" : undefined} className={className}>
      {size}
    </Link>
  </li>
);

export default PageSizeLink;
