"use client";

import { PropsWithChildren, useEffect, useRef } from "react";

/**
 * Keeps the header at the top while the page scrolls. Its height is put in --header-height (it changes with the
 * width of the screen and the logo), so what sticks under it and the jumps to #contact are not hidden behind it.
 * Rounded down: a pixel more would make the top of a new page look hidden to Next.js (see globals.css).
 */
const StickyHeader = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = ref.current;

    if (!header) return;

    const observer = new ResizeObserver(([entry]) =>
      document.documentElement.style.setProperty("--header-height", `${Math.floor(entry.borderBoxSize[0].blockSize)}px`),
    );

    observer.observe(header);

    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref} className="sticky top-0 z-40 border-b border-white/10 bg-brand-dark/95 backdrop-blur">
      {children}
    </header>
  );
};

export default StickyHeader;
