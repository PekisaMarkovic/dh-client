import { ICON_SVG_PROPS, IconProps } from "@/icons/svg-props";

const InstagramIcon = ({ className = "h-8 w-8" }: IconProps) => (
  <svg {...ICON_SVG_PROPS} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

export default InstagramIcon;
