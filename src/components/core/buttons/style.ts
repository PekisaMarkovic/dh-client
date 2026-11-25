export type ButtonVariant = "contained" | "outlined" | "alternative" | "text";
export type ButtonSize = "small" | "medium" | "large" | "full";

const SIZE: Record<ButtonSize, string> = {
  small: "px-4 py-1.5 text-sm",
  medium: "px-6 py-2.5 text-sm",
  large: "px-8 py-3 text-base",
  full: "w-full px-6 py-3 text-base",
};

// the main button has a thick darker bottom edge, like a key
const VARIANT: Record<ButtonVariant, string> = {
  contained: "bg-gradient-to-b from-amber-300 to-amber-500 text-brand-dark border-transparent border-b-4 border-b-orange-600 hover:brightness-110",
  outlined: "bg-transparent text-brand border-brand hover:bg-brand hover:text-brand-dark",
  alternative: "bg-white/10 text-white border-white/20 hover:bg-white/20",
  text: "bg-transparent text-foreground border-transparent hover:text-brand",
};

// literal classes, so that Tailwind finds them
export const buttonStyle = ({ variant, size, disabled }: { variant: ButtonVariant; size: ButtonSize; disabled?: boolean }) =>
  `inline-flex items-center justify-center gap-x-2 rounded-md border font-semibold transition ${SIZE[size]} ${VARIANT[variant]} ${
    disabled ? "cursor-not-allowed opacity-60" : ""
  }`;
