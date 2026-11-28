import { inputStyle } from "@/components/core/input/style";
import Label from "@/components/core/typography/Label";
import CalendarIcon from "@/icons/CalendarIcon";

type Props = {
  id: string;
  label: string;
  isRequired?: boolean;
  // the picked day as "26.11.2026", null shows the label in grey
  text: string | null;
  hasError?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
};

/** The closed date field (label, the day, the calendar icon), without the calendar library: also its placeholder while it loads */
const DateFieldButton = ({ id, label, isRequired, text, hasError = false, isOpen = false, onClick }: Props) => (
  <>
    <Label htmlFor={id} label={label} isRequired={isRequired} />
    <button
      id={id}
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      className={`${inputStyle({ error: hasError })} flex h-11 items-center justify-between gap-2 text-left`}
    >
      <span className={text ? "" : "text-stone-400"}>{text ?? label}</span>
      <CalendarIcon className="h-5 w-5 shrink-0 text-stone-500" />
    </button>
  </>
);

export default DateFieldButton;
