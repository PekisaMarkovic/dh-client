import { inputStyle } from "@/components/core/input/style";

type Props = {
  action: string;
  value: string;
  label: string;
  placeholder: string;
  // the filters the search keeps (the category, the page size), sent as hidden fields
  keep: Record<string, string>;
};

/** Search of the menu: a plain GET form, so it works without JavaScript and the address can be shared */
const DrinkSearch = ({ action, value, label, placeholder, keep }: Props) => (
  <form action={action} role="search" className="relative w-full sm:max-w-xs">
    {Object.entries(keep).map(([name, v]) => (
      <input key={name} type="hidden" name={name} value={v} />
    ))}
    <input type="search" name="pretraga" defaultValue={value} maxLength={100} aria-label={label} placeholder={placeholder} className={`${inputStyle({})} h-10 pr-11`} />
    <button type="submit" aria-label={label} className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-stone-500 hover:text-brand">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    </button>
  </form>
);

export default DrinkSearch;
