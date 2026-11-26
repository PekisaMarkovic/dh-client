import { ICON_SVG_PROPS, IconProps } from "@/icons/svg-props";

const SearchIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...ICON_SVG_PROPS} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export default SearchIcon;
