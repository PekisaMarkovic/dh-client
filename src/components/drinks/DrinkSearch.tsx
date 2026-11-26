"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { inputStyle } from "@/components/core/input/style";

type Props = {
  action: string;
  value: string;
  label: string;
  placeholder: string;
  // the filters the search keeps (the page size), sent as hidden fields
  keep: Record<string, string>;
};

// the search starts when the typing stops for this long
const DEBOUNCE_MS = 400;

/**
 * Search of the menu: it searches by itself after a pause in typing. It is still a plain GET form,
 * so Enter works and it works without JavaScript too; the address can be shared.
 */
const DrinkSearch = ({ action, value, label, placeholder, keep }: Props) => {
  const router = useRouter();
  const [text, setText] = useState(value);
  // true while a search of this field is loading
  const [isSearching, startSearch] = useTransition();
  // the search that is in the address, so the same text is not sent again
  const sent = useRef(value);

  // the address changed without typing (a category, "clear the search"): the field shows it.
  // Not while a search of the field loads, then the address is behind the text that is still being typed
  useEffect(() => {
    if (!isSearching && value !== sent.current) {
      sent.current = value;
      setText(value);
    }
  }, [value, isSearching]);

  // replace: every letter is not a step of the back button; a new search starts on the first page
  const searchNow = (search: string) => {
    sent.current = search;
    const query = new URLSearchParams({ ...keep, ...(search ? { pretraga: search } : {}) });

    startSearch(() => router.replace(query.size ? `${action}?${query}` : action, { scroll: false }));
  };

  useEffect(() => {
    const search = text.trim();

    if (search === sent.current) return;

    const timer = setTimeout(() => searchNow(search), DEBOUNCE_MS);

    return () => clearTimeout(timer);
  });

  return (
    <form
      action={action}
      role="search"
      className="relative w-full sm:max-w-xs"
      // Enter searches at once, without loading the whole page again (without JavaScript the form does it)
      onSubmit={(event) => {
        event.preventDefault();
        if (text.trim() !== sent.current) searchNow(text.trim());
      }}
    >
      {Object.entries(keep).map(([name, v]) => (
        <input key={name} type="hidden" name={name} value={v} />
      ))}
      <input
        type="search"
        name="pretraga"
        value={text}
        onChange={(event) => setText(event.target.value)}
        maxLength={100}
        aria-label={label}
        placeholder={placeholder}
        className={`${inputStyle({})} h-10 pr-11`}
      />
      <button type="submit" aria-label={label} className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-stone-500 hover:text-brand">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>
    </form>
  );
};

export default DrinkSearch;
