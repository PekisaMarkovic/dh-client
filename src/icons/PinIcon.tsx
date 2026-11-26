import { ICON_SVG_PROPS, IconProps } from "@/icons/svg-props";

const PinIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg {...ICON_SVG_PROPS} className={className}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export default PinIcon;
