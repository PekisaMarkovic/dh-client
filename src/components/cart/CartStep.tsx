type Props = {
  number: number;
  label: string;
  isActive: boolean;
  isDone: boolean;
  // not the first step: a short line before it
  hasPrevious: boolean;
};

// one step of the order: its number in a circle (gold when it is the current one or done) and its name
const CartStep = ({ number, label, isActive, isDone, hasPrevious }: Props) => (
  <li aria-current={isActive ? "step" : undefined} className="flex items-center gap-2">
    {hasPrevious && <span aria-hidden="true" className="h-px w-6 bg-stone-700" />}
    <span
      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
        isActive || isDone ? "bg-brand text-brand-dark" : "border border-stone-600 text-stone-400"
      }`}
    >
      {number}
    </span>
    <span className={isActive ? "font-semibold text-foreground" : "text-stone-400"}>{label}</span>
  </li>
);

export default CartStep;
