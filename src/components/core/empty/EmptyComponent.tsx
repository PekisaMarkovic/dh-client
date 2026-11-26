import BottleIcon from "@/icons/BottleIcon";
import { ReactNode } from "react";
import Paragraph from "@/components/core/typography/Paragraph";

type Props = {
  text: string;
  hint?: string;
  action?: ReactNode;
};

// nothing to show (an empty list, a failed request)
const EmptyComponent = ({ text, hint, action }: Props) => (
  <div className="flex flex-col items-center justify-center gap-2 p-10 text-center">
    <BottleIcon className="h-16 w-16 text-stone-600" />
    <Paragraph text={text} size="lg" color="black" weight="medium" align="center" />
    {hint && <Paragraph text={hint} size="sm" align="center" />}
    {action}
  </div>
);

export default EmptyComponent;
