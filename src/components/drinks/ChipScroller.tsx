"use client";

import { PropsWithChildren, useEffect, useRef } from "react";

type Props = PropsWithChildren<{
  label: string;
  className: string;
  // changes with the picked chip, so a new pick is scrolled into view too
  activeKey: string;
}>;

/**
 * A row of chips that scrolls sideways on a phone. After every page load (and every new pick) the picked chip
 * (aria-current="page") is moved to the middle, so it never ends up hidden past the edge of the screen.
 */
const ChipScroller = ({ label, className, activeKey, children }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    const row = ref.current;
    const active = row?.querySelector<HTMLElement>('[aria-current="page"]');
    const behavior = isFirst.current ? "instant" : "smooth";

    isFirst.current = false;

    // on a wide screen the chips are a list in the sidebar, nothing scrolls sideways
    if (!row || !active || row.scrollWidth <= row.clientWidth) return;

    row.scrollTo({ left: active.offsetLeft - (row.clientWidth - active.offsetWidth) / 2, behavior });
  }, [activeKey]);

  return (
    // relative: the offsetLeft of the chips is measured from this row
    <nav ref={ref} aria-label={label} className={`relative ${className}`}>
      {children}
    </nav>
  );
};

export default ChipScroller;
