// light fields on the dark page, so they are easy to see
export const inputStyle = ({ error, disabled }: { error?: boolean; disabled?: boolean }) =>
  `block w-full rounded-md border bg-white px-4 text-sm text-stone-900 placeholder:text-stone-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/40 ${
    error ? "border-red-500" : "border-stone-300"
  } ${disabled ? "cursor-not-allowed opacity-60" : ""}`;
