"use client";

import { useSyncExternalStore } from "react";

/** accepted: the third-party content (the Google map, later analytics) loads; rejected: it does not; null: not chosen yet */
export type CookieConsent = "accepted" | "rejected" | null;

const KEY = "dh-cookie-consent";
const EVENT = "dh-cookie-consent";

const read = (): CookieConsent => {
  const value = localStorage.getItem(KEY);

  return value === "accepted" || value === "rejected" ? value : null;
};

const subscribe = (onChange: () => void) => {
  window.addEventListener(EVENT, onChange);
  // another tab changed it
  window.addEventListener("storage", onChange);

  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
};

const save = (value: CookieConsent) => {
  if (value) localStorage.setItem(KEY, value);
  else localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVENT));
};

/**
 * The choice of the visitor about the cookies of other sites, kept in the browser (localStorage, no cookie of our own).
 * On the server and before the browser has read it the choice is "unknown", so nothing of another site loads before the visitor chose.
 */
export const useCookieConsent = () => {
  const consent = useSyncExternalStore<CookieConsent | "unknown">(subscribe, read, () => "unknown");

  return {
    consent,
    // the banner shows only in the browser, when there is no choice yet
    isAsking: consent === null,
    accept: () => save("accepted"),
    reject: () => save("rejected"),
    // asks again (the link in the footer)
    reset: () => save(null),
  };
};
