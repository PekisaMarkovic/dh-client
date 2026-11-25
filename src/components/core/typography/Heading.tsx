import { ReactNode } from "react";

type Props = {
  text: string;
  // the html tag: h1 is one per page (SEO)
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "sm" | "base" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  color?: "black" | "white" | "brand" | "accent" | "grey";
  align?: "left" | "center";
  className?: string;
  leftIcon?: ReactNode;
};

const SIZE = {
  sm: "text-sm",
  base: "text-base",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-2xl sm:text-3xl",
  "4xl": "text-3xl sm:text-4xl",
  "5xl": "text-4xl sm:text-6xl",
  "6xl": "text-5xl sm:text-7xl",
};
// the text is light on the dark theme ("black" = the main text color)
const COLOR = { black: "text-foreground", white: "text-white", brand: "text-brand", accent: "text-accent", grey: "text-stone-400" };
const ALIGN = { left: "text-left", center: "text-center" };

// the display font is heavy by itself, so there is no weight
const Heading = ({ text, as: Tag = "h2", size = "3xl", color = "black", align = "left", className = "", leftIcon }: Props) => (
  <Tag className={`font-display font-normal leading-tight ${SIZE[size]} ${COLOR[color]} ${ALIGN[align]} ${className}`}>
    {leftIcon}
    {text}
  </Tag>
);

export default Heading;
