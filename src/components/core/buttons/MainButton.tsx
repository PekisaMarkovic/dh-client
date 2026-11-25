import { ReactNode } from "react";
import { ButtonSize, ButtonVariant, buttonStyle } from "@/components/core/buttons/style";

type Props = {
  text: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  htmlType?: "button" | "submit" | "reset";
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  // shows "..." instead of the text while something is saving, the button can not be clicked
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const MainButton = ({ text, variant = "contained", size = "medium", htmlType = "button", className = "", leftIcon, rightIcon, isLoading, disabled, onClick }: Props) => (
  <button
    type={htmlType}
    onClick={onClick}
    disabled={disabled || isLoading}
    aria-busy={isLoading || undefined}
    className={`${buttonStyle({ variant, size, disabled: disabled || isLoading })} ${className}`}
  >
    {leftIcon}
    {isLoading ? "..." : text}
    {rightIcon}
  </button>
);

export default MainButton;
