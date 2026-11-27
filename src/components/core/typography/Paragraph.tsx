import { ReactNode } from "react";

type Props = {
  className?: string;
  size?: "xs" | "sm" | "base" | "lg";
  // dark and link: on a white background (e.g. the card over the map)
  color?: "black" | "white" | "grey" | "brand" | "red" | "green" | "dark" | "link";
  weight?: "normal" | "medium" | "bold";
  align?: "left" | "center";
  noWrap?: boolean;
} & ({ text: string; children?: never } | { text?: never; children: ReactNode });

const SIZE = { xs: "text-xs", sm: "text-sm", base: "text-base", lg: "text-lg" };
const COLOR = {
  black: "text-foreground",
  white: "text-white",
  grey: "text-stone-300",
  brand: "text-brand",
  red: "text-red-400",
  green: "text-green-400",
  dark: "text-stone-800",
  link: "text-blue-600 hover:underline",
};
const WEIGHT = { normal: "font-normal", medium: "font-medium", bold: "font-bold" };
const ALIGN = { left: "text-left", center: "text-center" };

const Paragraph = ({ text, children, className = "", size = "base", color = "grey", weight = "normal", align = "left", noWrap }: Props) => (
  <p className={`${SIZE[size]} ${COLOR[color]} ${WEIGHT[weight]} ${ALIGN[align]} ${noWrap ? "truncate" : ""} ${className}`}>
    {text}
    {children}
  </p>
);

export default Paragraph;
