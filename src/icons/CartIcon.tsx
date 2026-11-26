import { ICON_SVG_PROPS, IconProps } from "@/icons/svg-props";

const CartIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg {...ICON_SVG_PROPS} className={className}>
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
    <path d="M2.5 3h2.6l2.4 11.6a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L21.5 7H6" />
  </svg>
);

export default CartIcon;
