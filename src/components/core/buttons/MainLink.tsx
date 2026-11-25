import Link from "next/link";
import { ReactNode } from "react";
import { ButtonSize, ButtonVariant, buttonStyle } from "@/components/core/buttons/style";

type Props = {
  text: string;
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  // opens in a new tab (outside links: maps, social networks)
  isExternal?: boolean;
};

// a link that looks like a button, internal links are Next links (prefetched)
const MainLink = ({ text, href, variant = "contained", size = "medium", className = "", leftIcon, rightIcon, isExternal }: Props) => {
  const classes = `${buttonStyle({ variant, size })} ${className}`;
  const content = (
    <>
      {leftIcon}
      {text}
      {rightIcon}
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return href.startsWith("/") && !href.startsWith("//") ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <a href={href} className={classes}>
      {content}
    </a>
  );
};

export default MainLink;
