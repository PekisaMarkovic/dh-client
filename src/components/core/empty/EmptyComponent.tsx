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
    <svg viewBox="0 0 48 48" className="h-16 w-16 text-stone-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 4h8v8l3 5c.6 1 1 2.1 1 3.2V42a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2V20.2c0-1.1.4-2.2 1-3.2l3-5V4Z" />
      <path d="M16 26h16M16 36h16" />
    </svg>
    <Paragraph text={text} size="lg" color="black" weight="medium" align="center" />
    {hint && <Paragraph text={hint} size="sm" align="center" />}
    {action}
  </div>
);

export default EmptyComponent;
