import { ICON_SVG_PROPS, IconProps } from "@/icons/svg-props";

// a drink without an image, an empty list
const BottleIcon = ({ className = "h-24 w-24" }: IconProps) => (
  <svg {...ICON_SVG_PROPS} viewBox="0 0 48 48" className={className}>
    <path d="M20 4h8v8l3 5c.6 1 1 2.1 1 3.2V42a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2V20.2c0-1.1.4-2.2 1-3.2l3-5V4Z" />
    <path d="M16 26h16M16 36h16" />
  </svg>
);

export default BottleIcon;
