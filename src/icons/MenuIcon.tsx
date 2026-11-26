import { ICON_SVG_PROPS, IconProps } from "@/icons/svg-props";

// three lines, the "burger" that opens the menu on a phone
const MenuIcon = ({ className = "h-6 w-6" }: IconProps) => (
  <svg {...ICON_SVG_PROPS} className={className}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export default MenuIcon;
