"use client";

import { PropsWithChildren, ReactNode, useEffect, useId, useRef } from "react";

type Props = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  // the edge of the screen it slides in from
  side: "left" | "right";
  // what the top of the panel shows (a text or the logo)
  title: ReactNode;
  // the name of the panel for screen readers
  label: string;
  closeLabel: string;
}>;

/**
 * A panel that slides in from the side over a dark overlay (the cart, the menu on a phone).
 * While it is open: Escape and a click on the overlay close it, the page behind does not scroll,
 * the focus is in the panel. While it is closed nothing in it can be focused or read (inert).
 */
const SidePanel = ({ isOpen, onClose, side, title, label, closeLabel, children }: Props) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const overflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();

    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const position = side === "right" ? "right-0 border-l" : "left-0 border-r";
  const hidden = side === "right" ? "translate-x-full" : "-translate-x-full";

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`} inert={!isOpen}>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        aria-describedby={titleId}
        tabIndex={-1}
        className={`absolute top-0 ${position} flex h-full w-full max-w-md flex-col gap-5 border-stone-800 bg-surface p-6 shadow-2xl outline-none transition-transform duration-300 motion-reduce:transition-none ${
          isOpen ? "translate-x-0" : hidden
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div id={titleId}>{title}</div>
          <button type="button" onClick={onClose} aria-label={closeLabel} className="text-2xl text-stone-400 transition hover:text-brand">
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default SidePanel;
