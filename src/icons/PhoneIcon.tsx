import { ICON_SVG_PROPS, IconProps } from "@/icons/svg-props";

const PhoneIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg {...ICON_SVG_PROPS} className={className}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export default PhoneIcon;
