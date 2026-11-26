import { ICON_SVG_PROPS, IconProps } from "@/icons/svg-props";

const CalendarIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg {...ICON_SVG_PROPS} className={className}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

export default CalendarIcon;
