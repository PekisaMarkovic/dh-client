import { ICON_SVG_PROPS, IconProps } from "@/icons/svg-props";

// a delivery van seen from the side, going to the right (the speed lines behind it are drawn by DeliveryButton)
const DeliveryVanIcon = ({ className = "h-6 w-6" }: IconProps) => (
  <svg {...ICON_SVG_PROPS} className={className}>
    <path d="M2 6h11v10H2z" />
    <path d="M13 9h4l3 3.5V16h-7z" />
    <circle cx="6" cy="17.5" r="1.75" fill="currentColor" />
    <circle cx="16.5" cy="17.5" r="1.75" fill="currentColor" />
  </svg>
);

export default DeliveryVanIcon;
